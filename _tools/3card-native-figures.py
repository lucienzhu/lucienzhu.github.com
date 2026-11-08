#!/usr/bin/env python3
"""Build bilingual, semantic article figures from checked-in assets and measurements.
No screenshot text is reproduced as a bitmap. Run from any working directory.
"""
from pathlib import Path
from html import escape
from copy import deepcopy
import json
import xml.etree.ElementTree as ET

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / '_includes/royale-native'
OUT.mkdir(exist_ok=True)
ASSETS = ROOT / 'img/blog/3card-royale'
FLOWER = '/js/royale-article/flower.svg'
SUITS = '♠♥♣♦'
RANKS = list('23456789') + ['10','J','Q','K','A']
HISTORY = json.loads((ROOT / 'js/royale-article/training-history.json').read_text())

def flower(cls=''):
    src = FLOWER.replace('flower.svg', 'flower-gold.svg') if cls == 'rn-gold' else FLOWER
    return f'<img class="rn-flower {cls}" src="{src}" alt="" width="48" height="48">'

def card(value=None, wild=False):
    if value is None:
        return f'<span class="rn-card rn-back" aria-label="{L("牌背", "Face-down card")}">{flower()}</span>'
    rank, suit = RANKS[value % 13], SUITS[value // 13]
    return f'<span class="rn-card {"rn-red" if suit in "♥♦" else ""} {"rn-wild" if wild else ""}" aria-label="{rank}{suit}{L(" 花牌", " wild") if wild else ""}"><b>{rank}</b><span>{suit}</span><i aria-hidden="true">{suit}</i>{"<em>★</em>" if wild else ""}</span>'

def cards(values, wild=None):
    return '<div class="rn-cards">' + ''.join(card(i, i == wild if wild is not None else False) for i in values) + '</div>'

def label(zh,en):
    return f'<span class="rn-label">{L(zh,en)}</span>'

def title(zh,en):
    return f'<h3>{L(zh,en)}</h3>'

def box(zh,en,body,cls=''):
    return f'<div class="rn-box {cls}">{title(zh,en)}{body}</div>'

def save(name,body):
    (OUT/f'{name}-{LANG}.html').write_text(body+'\n')

# Skyline artwork only: all poster typography is rendered as HTML below.
ET.register_namespace('', 'http://www.w3.org/2000/svg')
root = ET.parse(ASSETS/'finale-en.svg').getroot()
city = deepcopy(next(e for e in root.iter() if e.attrib.get('data-composition') == 'city37'))
for attr in ['x','y','width','height']:
    city.attrib.pop(attr, None)
assert not any(e.tag.endswith('text') for e in city.iter()), 'Skyline must contain no text'
poster_style = root.find('{http://www.w3.org/2000/svg}style')
assert poster_style is not None and poster_style.text, 'Preserve skyline line-art styles'
city.insert(0, deepcopy(poster_style))
city.set('role','img')
ET.ElementTree(city).write(ROOT/'js/royale-article/skyline.svg', encoding='unicode')

# Preserve the finale's complete composition, rather than isolating the skyline.
# Only artwork scales; the heading, statistics and rank labels remain HTML.
ET.register_namespace('xlink', 'http://www.w3.org/1999/xlink')
SVG = '{http://www.w3.org/2000/svg}'
poster = list(root)
vine_start = next(i for i,e in enumerate(poster) if e.get('d', '').startswith('M162 1194'))
footer_start = next(i for i,e in enumerate(poster) if e.get('d') == 'M80 1262H1000')
bloom = ET.Element(SVG+'svg', {'viewBox':'0 340 1080 825', 'width':'1080', 'height':'825'})
for e in poster[:vine_start]:
    if e.tag not in (SVG+'text', SVG+'rect'):
        bloom.append(deepcopy(e))
assert len(bloom.findall(SVG+'use')) == 41, 'Keep the hero and all 40 canopy flowers'
# Fit the glow inside the artwork crop so it fades before meeting the HTML header.
next(e for e in bloom if e.get('fill') == 'url(#szglow)').set('r', '225')

# The exported composition predates the approved enlarged flower centers.
# Reuse today's mark without altering the recorded positions, sizes or colors.
approved_flower = ET.parse(ROOT/'js/royale-article/flower.svg').getroot()
for i,tone in enumerate(('#962C4F','#C5416B','#E38BA6')):
    symbol = next(e for e in bloom.iter() if e.get('id') == f'szf{i}')
    for e in list(symbol):
        symbol.remove(e)
    centered = ET.SubElement(symbol, SVG+'g', {'transform':'translate(-32 -36)'})
    for e in approved_flower:
        part = deepcopy(e)
        for node in part.iter():
            if node.get('fill') == '#C5416B':
                node.set('fill',tone)
        centered.append(part)

vine = ET.Element(SVG+'svg', {'viewBox':'130 1140 830 108', 'width':'830', 'height':'108'})
for e in poster[vine_start:footer_start]:
    if e.tag not in (SVG+'text', SVG+'rect'):
        vine.append(deepcopy(e))
for name,art in [('finale-bloom',bloom),('finale-vine',vine)]:
    assert not any(e.tag == SVG+'text' for e in art.iter()), 'Finale typography must remain native'
    ET.ElementTree(art).write(ROOT/f'js/royale-article/{name}.svg', encoding='unicode')

(ROOT / 'js/royale-article/flower-gold.svg').write_text((ROOT / 'js/royale-article/flower.svg').read_text().replace('#C5416B', '#D6A41C'))

for LANG in ('en','zh'):
    def L(zh,en): return zh if LANG == 'zh' else en

    # Decorative SVG has no typography; the heading remains normal selectable text.
    traces = ''.join(f'<path d="M0 {100+i*22} H120 L200 {180+i*12} H280 M800 {100+i*22} H680 L600 {180+i*12} H520"/>' for i in range(6))
    save('cover',f'''<div class="rn-cover"><svg class="rn-traces" viewBox="0 0 800 400" aria-hidden="true">{traces}</svg>
      <span class="rn-label">3CARD ROYALE</span><div class="rn-cover-cards">{card()}{card()}{card()}</div>
      <p class="rn-tagline">{L('一副牌，两个人。<br>三张牌，打出花。','One deck. Two players.<br>Three cards. Make them bloom.')}</p>
</div>''')

    zone_data = [
      ('rival-hand','对手手牌','Rival hand',cards([None]*5),'暗牌，只有对手知道。','Private: only your rival knows these cards.'),
      ('rival-wounds','对手伤牌','Rival wounds',cards([50,27]),'公开；对手也可以将它们打出。','Public; your rival can play these too.'),
      ('attack','进攻','Attack',cards([0,2,12]),'本次攻防中已经亮出的进攻牌。','Cards revealed by the attacker in this encounter.'),
      ('deck','牌堆','Draw pile',cards([None]),'摸牌、补牌与换牌的来源。','Supplies draws, refills and deck swaps.'),
      ('discards','弃牌','Discards', '<span class="rn-empty">—</span>','已经离开手牌与伤牌区的公开牌。','Public cards no longer held in hands or wound areas.'),
      ('defense','防守','Defense',cards([30,4,22]),'防守方看过进攻牌后作出应对。','The defender responds after seeing the attack.'),
      ('your-wounds','你的伤牌','Your wounds',cards([19,37]),'可与手牌一起出；用掉后原位补牌，伤害不减少。','Playable with your hand. Refilled after use; wound count stays the same.'),
      ('your-hand','你的手牌','Your hand',cards([3,7,14,23,32,40,42,47]),'开局 8 张，轮末补至 8 张。','Start with eight; refill to eight at the end of a round.')]
    zones=''
    for key,zh,en,art,desc_zh,desc_en in zone_data:
        zones+=f'<div class="rn-zone rn-zone-{key}"><details><summary>{L(zh,en)}</summary><p>{L(desc_zh,desc_en)}</p></details>{art}</div>'
    save('card-zones',f'<div class="rn-zone-map">{label("牌桌示意", "The table")}{title("牌区与信息", "Card zones and visibility")}<div class="rn-zone-grid">{zones}</div></div>')

    save('identity',f'''<div class="rn-three rn-identity">
      {box('红花','Red flower',flower()+f'<p>{L("三角梅，深圳市花。<br>三片彩色苞片，呼应三张牌。","Bougainvillea, Shenzhen’s city flower.<br>Three coloured bracts, three cards.")}</p>')}
      {box('金牌','Gold card',card()+f'<p>{L("牌背与花牌的共同标志。","The mark on card backs and wild cards.")}</p>')}
      {box('电路板绿','Circuit-board green','<div class="rn-pcb" aria-hidden="true"><i></i><i></i><i></i></div>'+f'<p>{L("深圳的硬件底色。<br>承托红花与金牌。","Shenzhen’s hardware character.<br>A foundation for red and gold.")}</p>')}
    </div>''')

    save('design-system',f'''<div data-native="theme" class="rn-theme" data-tone="light">
      <div class="rn-toolbar">{title('日间与夜间','Day and night')}<div class="rn-controls" hidden><button type="button" data-tone="light" aria-pressed="true">{L('日间','Light')}</button><button type="button" data-tone="dark" aria-pressed="false">{L('夜间','Dark')}</button></div></div>
      <div class="rn-theme-stage"><div class="rn-lockup">{card()}<div><strong>{L('深圳花牌','3Card Royale')}</strong><span>{L('3Card Royale','Shenzhen Flower Cards')}</span></div></div>
      <div class="rn-theme-players"><span>{flower()} {L('你 · 红花','You · red')}</span><span>{flower('rn-gold')} {L('对手 · 金花','Rival · gold')}</span></div>
      {cards([4,18,45])}<p class="rn-theme-wild">{L('花牌','Wild card')} <b>2 ♥</b></p></div>
      <div class="rn-swatches">{''.join(f'<div><i style="background:{c}"></i><span>{L(z,e)}</span><code>{c}</code></div>' for c,z,e in [('#C5416B','红花','Flower'),('#ECCE80','金牌','Card'),('#16765F','电路板绿','Circuit board'),('#0C2118','夜间','Night')])}</div>
    </div>''')

    save('finale',f'''<div class="rn-finale">
      <div class="rn-lockup rn-compact">{card()}<strong>{L('深圳花牌','3Card Royale')}</strong></div>
      <p class="rn-bloom-title">{L('你，开花了。','You bloomed.')}</p>
      <div class="rn-stats"><span><b>11</b>{L('局','games')}</span><span><b>7 : 4</b>{L('你 : 对手','you : rival')}</span><span><b>58</b>{L('轮攻防','rounds')}</span></div>
      <div class="rn-bloom-art"><img src="/js/royale-article/finale-bloom.svg" alt="{L('主花绽放，红花随白鹭散落到深圳天际线。','A central bloom, scattered flowers and egrets above Shenzhen’s flower-lined skyline.')}" width="1080" height="825" loading="lazy"></div>
      <div class="rn-finale-vine"><img src="/js/royale-article/finale-vine.svg" alt="" width="830" height="108" loading="lazy">
      <ol class="rn-ranks" aria-label="{L('胜者等级进程，A 级通关','Winner’s rank progression, Ace completed')}">{''.join(f'<li style="left:{(float(e.get("x"))-130)/830*100:.4f}%">{e.text}</li>' for e in poster[vine_start:footer_start] if e.tag == SVG+'text' and e.text != 'A')}<li class="rn-rank-complete" style="left:86.5320%">A</li></ol></div>
    </div>''')

    save('wounds',f'''<div class="rn-wounds">{title('用伤牌出牌，伤害不变','Play a wound. Keep the wound count.')}
      <div class="rn-wound-process"><div class="rn-wound-step"><div class="rn-play-union"><div>{label('手牌','Hand')}{cards([4,31])}</div><span class="rn-plus" aria-hidden="true">+</span><div>{label('伤牌','Wound')}{cards([19])}</div></div><div class="rn-bracket"></div><strong>{L('顺子 · 2 分','Straight · 2 points')}</strong></div>
      <div class="rn-flow-link" aria-hidden="true">→</div>
      <div class="rn-wound-step">{label('原伤牌位补牌','Refill the same wound slot')}<div class="rn-refill-slot">{card(50)}</div><strong>{L('仍是 1 伤','Still 1 wound')}</strong></div></div>
    </div>''')

    encounters=[]
    for n in (1,2):
        attacker = L('你','You') if n == 1 else L('对手','Rival')
        defender = L('对手','Rival') if n == 1 else L('你','You')
        attacker_flower = flower() if n == 1 else flower('rn-gold')
        defender_flower = flower('rn-gold') if n == 1 else flower()
        encounters.append(f'''<div class="rn-encounter"><span class="rn-encounter-number">0{n}</span><div class="rn-encounter-chain"><div class="rn-stage"><span class="rn-person">{attacker_flower}{attacker}</span><strong>{L('进攻','Attack')}</strong></div><span class="rn-arrow" aria-hidden="true">→</span><div class="rn-stage"><span class="rn-person">{defender_flower}{defender}</span><strong>{L('防守','Respond')}</strong></div><span class="rn-arrow" aria-hidden="true">→</span><div class="rn-stage rn-resolve"><strong>{L('结算','Resolve')}</strong><span>{L('伤害 / 换牌','Wounds / swaps')}</span></div></div><div class="rn-exit"><span>{L('任一方 ≥ 5 伤','Either player ≥ 5 wounds')}</span><strong>{L('结束小局','Game over')}</strong></div></div>''')
    save('round-flow',f'''<div class="rn-round">{title('一轮，两次攻防','One round. Two encounters.')}
      {encounters[0]}<div class="rn-round-link"><span class="rn-down" aria-hidden="true">↓</span><span>{L('均 < 5 伤 · 交换攻守','Both < 5 wounds · switch roles')}<b>{L('不补手牌','No hand refill')}</b></span></div>
      {encounters[1]}<div class="rn-round-link"><span class="rn-down" aria-hidden="true">↓</span><span>{L('均 < 5 伤','Both < 5 wounds')}</span></div>
      <div class="rn-round-end"><strong>{L('双方手牌补至 8 张','Both hands refill to 8')}</strong><span>{L('下一轮','Next round')} →</span></div>
    </div>''')

    save('system-architecture',f'''<div class="rn-system">{title('策略的信息边界','What a policy can see')}
      <div class="rn-boundary-flow"><div class="rn-engine"><strong>GameCore</strong><span>{L('完整状态','Full state')}</span><div class="rn-visible-state">{L('己方手牌 + 公开信息','Own hand + public information')}</div><div class="rn-private-state">{L('对手手牌','Rival hand')}<br>{L('牌堆顺序','Deck order')}</div></div>
      <div class="rn-info-bridge"><strong>{L('玩家观察','Player observation')}</strong><span class="rn-line-arrow" aria-hidden="true"></span><span>336 {L('维','values')}</span></div>
      <div class="rn-policy"><strong>{L('普通策略','Ordinary policy')}</strong><span>{L('代码 / 整手评分 / 自回归','Code / scoring / autoregressive')}</span></div>
      <div class="rn-action-bridge"><strong>actions-v2</strong><span class="rn-line-arrow rn-reverse" aria-hidden="true"></span><span>{L('完整动作 → 校验并执行','Complete move → validate & execute')}</span></div></div>
      <div class="rn-godlike"><span>{L('对手当前手牌','Current rival hand')}</span><span class="rn-line-arrow" aria-hidden="true"></span><strong>Godlike</strong><small>{L('额外可见 · 不参与普通天梯','Extra access · outside the public-information ladder')}</small></div>
    </div>''')

    # Responsive curves: geometry scales; all chart type stays HTML at article size.
    def coord(record,key): return (record['epoch']-1)/39*800, 220-record[key]['loss']/.6*220
    polylines=''.join('<polyline class="rn-line-'+key+'" points="'+' '.join(f'{x:.3f},{y:.3f}' for x,y in [coord(r,key) for r in HISTORY])+'"/>' for key in ['train','val'])
    best_epoch=min(HISTORY, key=lambda r:r['val']['loss'])
    final_epoch=HISTORY[-1]
    best_x,best_y=coord(best_epoch,'val')
    comparison=''.join(f'''<div class="rn-loss-pair {'rn-selected-checkpoint' if r == best_epoch else ''}"><span>{L('第','Epoch ')}{r['epoch']}{L('轮','')}{' · '+L('保存','saved') if r == best_epoch else ''}</span><div><span class="rn-train-key">{L('训练','Train')}<b>{r['train']['loss']:.4f}</b></span><span class="rn-val-key">{L('验证','Validation')}<b>{r['val']['loss']:.4f}</b></span></div></div>''' for r in [best_epoch,final_epoch])
    save('structured-training',f'''<div class="rn-training">
      <div class="rn-toolbar">{title('训练与验证损失','Training and validation loss')}{label('交叉熵损失','Cross-entropy loss')}</div>
      <div class="rn-curve-legend"><span class="rn-train-key">{L('训练','Training')}</span><span class="rn-val-key">{L('验证','Validation')}</span></div>
      <div class="rn-plot"><div class="rn-y-labels"><span>0.6</span><span>0.3</span><span>0</span></div><div class="rn-plot-inner"><svg viewBox="0 0 800 220" preserveAspectRatio="none" role="img" aria-label="{L('训练损失持续降低；验证损失在第 16 轮最低，之后升高。','Training loss keeps falling. Validation loss is lowest at epoch 16, then rises.')}"><path class="rn-gridline" d="M0 0H800 M0 110H800 M0 220H800"/>{polylines}<line class="rn-epoch-line" x1="{best_x:.3f}" x2="{best_x:.3f}" y1="0" y2="220"/></svg><div class="rn-minimum" style="left:{best_x/8:.3f}%;top:{best_y:.3f}px"><i></i><span>{L('第 16 轮 · 验证最低','Epoch 16 · validation minimum')}<b>→ checkpoint</b></span></div><div class="rn-x-labels"><span style="left:0%">1</span><span style="left:23.077%">10</span><span style="left:48.718%">20</span><span style="left:74.359%">30</span><span style="left:100%">40</span></div></div></div>
      <p class="rn-axis-title">{L('训练轮数','Epoch')}</p><div class="rn-loss-comparison">{comparison}</div>
      <details class="rn-data"><summary>{L('40 轮实测数据','All 40 measured epochs')}</summary><table><thead><tr><th>{L('轮数','Epoch')}</th><th>{L('训练损失','Training loss')}</th><th>{L('验证损失','Validation loss')}</th></tr></thead><tbody>{''.join(f"<tr><th scope='row'>{r['epoch']}</th><td>{r['train']['loss']:.6f}</td><td>{r['val']['loss']:.6f}</td></tr>" for r in HISTORY)}</tbody></table></details>
    </div>''')

    recipes=[]
    for zh,en,decisions,epoch,loss_zh,loss_en in [('整手评分','Whole-move scoring','252,859',5,'合法整手交叉熵','Cross-entropy over legal moves'),('自回归','Autoregressive','252,906',16,'逐 token 交叉熵','Token cross-entropy')]:
        recipes.append(f'''<div class="rn-recipe"><h4>{L(zh,en)}</h4><div class="rn-pipeline-node"><strong>10,000 {L('小局','games')}</strong><span>{decisions} {L('决策','decisions')}</span></div><span class="rn-down" aria-hidden="true">↓</span><div class="rn-split"><span><b>8,000</b>{L('训练','Train')}</span><span><b>1,000</b>{L('验证','Validation')}</span><span><b>1,000</b>{L('测试','Test')}</span></div><span class="rn-down" aria-hidden="true">↓</span><div class="rn-pipeline-node"><strong>{L(loss_zh,loss_en)}</strong><span>256 → 128</span></div><span class="rn-down" aria-hidden="true">↓</span><div class="rn-checkpoint-node"><strong>{L('验证集选模','Validation selection')}</strong><span>{L('第','Epoch ')}{epoch}{L('轮','')} → ONNX</span></div></div>''')
    save('training-pipeline',f'''<div class="rn-pipeline">{title('两套训练，一套动作协议','Two training recipes. One action protocol.')}
      <p class="rn-pipeline-origin">SDK Code AI × SDK Code AI <span>{L('分别生成 · 种子不同','Generated separately · different seeds')}</span></p>
      <div class="rn-recipe-pair">{''.join(recipes)}</div><div class="rn-merge-lines" aria-hidden="true"></div><div class="rn-protocol-node"><strong>actions-v2</strong><span>{L('浏览器对战 / 统一评估','Browser play / shared evaluation')}</span></div>
    </div>''')

    save('arena-flow',f'''<div class="rn-arena-flow">{title('从策略到对手','From policy to opponent')}
      <div class="rn-submission-chain"><div class="rn-pipeline-node"><strong>{L('本地验证','Local validation')}</strong><span>4 {L('局','games')}</span><code>validation.json</code></div><span class="rn-arrow" aria-hidden="true">→</span><div class="rn-pipeline-node"><strong>PR · CI</strong><span>{L('合法且可运行','Legal & runnable')}</span></div><span class="rn-arrow" aria-hidden="true">→</span><div class="rn-pipeline-node"><strong>{L('发布评分','Release evaluation')}</strong><span>3 {L('固定基准','frozen references')} × 20 {L('局','games')}</span></div></div>
      <div class="rn-publication"><span class="rn-down" aria-hidden="true">↓</span><strong>{L('60 局 → 暂定 Elo → 榜单与试玩','60 games → provisional Elo → leaderboard & play')}</strong></div>
    </div>''')

    # Recorded seed-19 outcomes; keep the entire recap in text rather than cropping a poster.
    outcomes=[(1,1,'对手换牌 ×1','Rival: 1 swap'),(2,1,'你 +2 伤 · 共 2 伤','You +2 wounds · 2 total'),(3,2,'你换牌 ×2','You: 2 swaps'),(4,2,'对手 +1 伤 · 共 1 伤','Rival +1 wound · 1 total'),(5,3,'对手 +1 伤 · 共 2 伤','Rival +1 wound · 2 total'),(6,3,'你 +1 伤 · 共 3 伤','You +1 wound · 3 total'),(7,4,'你 +1 伤 · 共 4 伤','You +1 wound · 4 total'),(8,4,'对手换牌 ×1','Rival: 1 swap'),(9,5,'对手换牌 ×3','Rival: 3 swaps'),(10,5,'你换牌 ×2','You: 2 swaps'),(11,6,'你换牌 ×2','You: 2 swaps'),(12,6,'对手 +2 伤 · 共 4 伤','Rival +2 wounds · 4 total'),(13,7,'对手 +1 伤 · 共 5 伤','Rival +1 wound · 5 total')]
    panels=[]
    recap=f'<div class="rn-two"><div>{label("进攻 · 你", "Attack · you")}{cards([9,2,12])}<p>{L("同花 · 3 分","Flush · 3 points")}</p></div><div>{label("防守 · 对手", "Defense · rival")}{cards([21,20,22])}<p>{L("同花顺 · 4 分","Straight flush · 4 points")}</p></div></div><p class="rn-callout">{L("第 1 次攻防：对手获得 1 次换牌机会。","Encounter 1: your rival earns one swap.")}</p><details class="rn-data"><summary>{L("全部 13 次结果","All 13 outcomes")}</summary><ol class="rn-recap">'+''.join(f'<li><span>{n:02d} · {L("第", "Round ")}{r}{L("轮", "")}</span><strong>{L(z,e)}</strong></li>' for n,r,z,e in outcomes)+'</ol></details>'
    finish=f'<div class="rn-share-side"><b>{flower("rn-gold")}{L("对手 · 防守", "Rival · defense")}</b>{cards([42,16,3])}<p>{L("三炸 · 5 分", "Three of a kind · 5 points")}</p><div class="rn-wound-row"><span>{L("5 伤", "5 wounds")}</span>{cards([28,17,32,47,1])}</div></div><p class="rn-callout">{L("你打出 1 伤，以 1 伤之差获胜。", "You deal 1 wound and win by 1 wound.")}</p><div class="rn-share-side"><b>{flower()}{L("你 · 进攻", "You · attack")}</b>{cards([31,18,5])}<p>{L("三炸 · 5 分", "Three of a kind · 5 points")}</p><div class="rn-wound-row"><span>{L("4 伤", "4 wounds")}</span>{cards([22,29,48,11])}</div></div>'
    best=f'<div class="rn-share-side"><b>{flower("rn-gold")}{L("对手 · 防守", "Rival · defense")}</b>{cards([21,17,15])}<p>{L("同花 · 3 分", "Flush · 3 points")}</p></div><p class="rn-callout">{L("三炸对同花，你打出 2 伤。", "Three of a kind against a flush: you deal 2 wounds.")}</p><div class="rn-share-side"><b>{flower()}{L("你 · 进攻", "You · attack")}</b>{cards([20,7,33])}<p>{L("三炸 · 5 分", "Three of a kind · 5 points")}</p></div>'
    for key,zh,en,body,n in [('recap','本局回顾','Game recap',recap,18),('finish','决胜现场','Final hand',finish,19),('highlight','高光一手','Best play',best,20)]:
        suffix='' if LANG=='zh' else '-en'
        panels.append(f'<section class="rn-share-panel" data-share="{key}" id="figure-share-{key}{"-preview" if key == "recap" else ""}{suffix}"><h4>{L(zh,en)}</h4>{body}<p class="rn-note">{L("图", "Figure ")} {n} · {L("种子 19 · 第 1 局 · 等级 2 → 3", "Seed 19 · Game 1 · Level 2 → 3")} · <a href="/img/blog/3card-royale/share-{key}{suffix}.svg">{L("原版海报 ↗", "Original poster ↗")}</a></p></section>')
    save('sharing',f'<div data-native="sharing" class="rn-sharing">{title("值得留下的那一手", "A play worth keeping")}<div class="rn-controls rn-share-tabs" hidden>'+''.join(f'<button type="button" data-share="{key}" aria-pressed="{str(i==0).lower()}">{L(z,e)}</button>' for i,(key,z,e) in enumerate([('recap','本局回顾','Game recap'),('finish','决胜现场','Final hand'),('highlight','高光一手','Best play')]))+'</div>'+''.join(panels)+'</div>')

# Native card data for the hand table. The SVG export tool also emits these fields.
hand_ids=[[0,16,46],[5,31,48],[4,18,45],[41,45,49],[4,5,6],[7,20,33],[5,18,31,44],[5,18,31,44,13]]
path=ROOT/'_data/royale_hands.json'
rows=json.loads(path.read_text())
for row,ids in zip(rows,hand_ids):
    row['cards']=[{'rank':RANKS[i%13],'suit':SUITS[i//13],'red':i//13 in [1,3],'wild':row['score']==7 and i==13} for i in ids]
path.write_text(json.dumps(rows,ensure_ascii=False,indent=2)+'\n')
print('Generated 24 bilingual native figures, skyline artwork and hand data.')
