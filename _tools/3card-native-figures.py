#!/usr/bin/env python3
"""Build bilingual, semantic article figures from checked-in assets and measurements.
No screenshot text is reproduced as a bitmap. Run from any working directory.
"""
from pathlib import Path
from html import escape
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
city = next(e for e in root.iter() if e.attrib.get('data-composition') == 'city37')
for attr in ['x','y','width','height']:
    city.attrib.pop(attr, None)
assert not any(e.tag.endswith('text') for e in city.iter()), 'Skyline must contain no text'
city.set('role','img')
ET.ElementTree(city).write(ROOT/'js/royale-article/skyline.svg', encoding='unicode')

(ROOT / 'js/royale-article/flower-gold.svg').write_text((ROOT / 'js/royale-article/flower.svg').read_text().replace('#C5416B', '#D6A41C'))

for LANG in ('en','zh'):
    def L(zh,en): return zh if LANG == 'zh' else en

    # Decorative SVG has no typography; the heading remains normal selectable text.
    traces = ''.join(f'<path d="M0 {100+i*22} H120 L200 {180+i*12} H280 M800 {100+i*22} H680 L600 {180+i*12} H520"/>' for i in range(6))
    save('cover',f'''<div class="rn-cover"><svg class="rn-traces" viewBox="0 0 800 400" aria-hidden="true">{traces}</svg>
      <span class="rn-label">3CARD ROYALE</span><div class="rn-cover-cards">{card()}{card()}{card()}</div>
      <p class="rn-tagline">{L('一副牌，两个人。<br>三张牌，打出花。','One deck. Two players.<br>Three cards. Make them bloom.')}</p>
      <p>{L('从双人对战，到策略学习。','From a two-player duel to policy learning.')}</p></div>''')

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
    save('card-zones',f'<div class="rn-zone-map">{label("牌桌示意", "The table")}{title("每张牌都有位置", "A place for every card")}<div class="rn-zone-grid">{zones}</div></div>')

    save('identity',f'''<div class="rn-three rn-identity">
      {box('红花','Red flower',flower()+f'<p>{L("三角梅，深圳市花。<br>三瓣的形态，呼应三张牌。","Bougainvillea, Shenzhen’s city flower.<br>A three-part form for a three-card game.")}</p>')}
      {box('金牌','Gold card',card()+f'<p>{L("同一个标志。<br>贯穿牌背与花牌。","One mark.<br>On the card back and wild card.")}</p>')}
      {box('电路板绿','Circuit-board green','<div class="rn-pcb" aria-hidden="true"><i></i><i></i><i></i></div>'+f'<p>{L("深圳的硬件底色。<br>承托红花与金牌。","Shenzhen’s hardware character.<br>A foundation for red and gold.")}</p>')}
    </div>''')

    save('design-system',f'''<div data-native="theme" class="rn-theme" data-tone="light">
      <div class="rn-toolbar">{title('同一套颜色，两种光线','One palette. Two lights.')}<div class="rn-controls" hidden><button type="button" data-tone="light" aria-pressed="true">{L('日间','Light')}</button><button type="button" data-tone="dark" aria-pressed="false">{L('夜间','Dark')}</button></div></div>
      <div class="rn-theme-stage"><div class="rn-lockup">{card()}<div><strong>{L('深圳花牌','3Card Royale')}</strong><span>{L('3Card Royale','Shenzhen Flower Cards')}</span></div></div>
      <div class="rn-theme-players"><span>{flower()} {L('你 · 红花','You · red')}</span><span>{flower('rn-gold')} {L('对手 · 金花','Rival · gold')}</span></div>
      {cards([4,18,45])}<p class="rn-theme-wild">{L('花牌','Wild card')} <b>2 ♥</b></p></div>
      <div class="rn-swatches">{''.join(f'<div><i style="background:{c}"></i><span>{L(z,e)}</span><code>{c}</code></div>' for c,z,e in [('#C5416B','红花','Flower'),('#ECCE80','金牌','Card'),('#16765F','电路板绿','Circuit board'),('#0C2118','夜间','Night')])}</div>
    </div>''')

    save('finale',f'''<div class="rn-finale">
      <div class="rn-lockup rn-compact">{card()}<strong>{L('深圳花牌','3Card Royale')}</strong></div>
      <p class="rn-bloom-title">{L('你，开花了。','You bloomed.')}</p>
      <div class="rn-stats"><span><b>11</b>{L('局','games')}</span><span><b>7 : 4</b>{L('你 : 对手','you : rival')}</span><span><b>58</b>{L('轮攻防','rounds')}</span></div>
      <div class="rn-bloom-art">{flower()}<img src="/js/royale-article/skyline.svg" alt="{L('深圳天际线','Shenzhen skyline')}" width="640" height="250" loading="lazy"></div>
      <ol class="rn-ranks" aria-label="{L('胜者等级进程','Winner’s rank progression')}">{''.join(f'<li>{r}</li>' for r in ['2','3','5','7','8','9','10','J','A'])}</ol>
    </div>''')

    wounds = [
      ('一起出牌','Play them together',f'<div class="rn-two"><div>{label("手牌", "Hand")}{cards([4,31])}</div><div>{label("公开伤牌", "Public wound")}{cards([19])}</div></div>','6♠ + 7♣ + 8♥','顺子 · 2 分','Straight · 2 points'),
      ('用过后补牌','Refill the wound slot',f'<div class="rn-replace">{card(19)}<span aria-hidden="true">→</span>{card(50)}</div>','8♥ → K♦','伤害仍是 1；补入的牌来自牌堆。','Still 1 wound. The replacement comes from the deck.')]
    save('wounds','<div class="rn-two rn-wounds">'+''.join(box(z,e,art+f'<p class="rn-equation">{eq}</p><p>{L(a,b)}</p>') for z,e,art,eq,a,b in wounds)+'</div>')

    steps=[('01','你进攻','You attack','选 3 张，或 4 / 5 张炸弹。','Choose three cards, or a four- / five-card bomb.'),('02','对手防守','Rival defends','看过你的牌，再出牌应对。','They see your play before responding.'),('03','结算','Resolve','进攻赢：造成伤害。防守赢：获得换牌机会。','Attack wins: deal wounds. Defense wins: earn swaps.'),('04','交换攻守','Switch roles','对手进攻，你来防守。此时不补手牌。','Your rival attacks; you defend. No hand refill yet.'),('05','轮末补牌','Refill after the round','保留未用的牌，双方手牌补至 8 张。','Keep unused cards; both hands refill to eight.')]
    save('round-flow',f'<div class="rn-flow-figure">{title("一轮，两次攻防", "One round. Two encounters.")}<ol class="rn-flow">'+''.join(f'<li><span class="rn-step-num">{n}</span><div><strong>{L(z,e)}</strong><p>{L(a,b)}</p></div></li>' for n,z,e,a,b in steps)+f'</ol><p class="rn-callout">{L("任何一次结算达到 5 伤，立即结束小局。", "A player reaching 5 wounds ends the game immediately.")}</p></div>')

    save('system-architecture',f'''<div class="rn-system">{title('共同的规则，独立的实现','Shared rules. Independent implementations.')}
      <div class="rn-system-root"><strong>{L('标准规则 1.0','Standard rules 1.0')}</strong><span>{L('共享回放校验','Shared replay checks')}</span></div>
      <div class="rn-core-row">{''.join(f'<span>{n}</span>' for n in ['JavaScript','Python','Rust','C++'])}</div>
      <div class="rn-contract"><strong>{L('公开观察 → 策略 → 完整合法动作','Public observation → policy → complete legal action')}</strong><code>actions-v2</code></div>
      <div class="rn-two">{box('浏览器','Browser','<p>JavaScript GameCore</p><p>Code AI · ONNX · Web Worker</p>')}{box('训练','Training','<p>Python GameCore · Gymnasium</p><p>PyTorch · TensorBoard</p>')}</div>
      <p class="rn-note">{L('完整状态由环境持有；普通策略看不到对手暗牌与牌堆顺序。','The environment holds the full state; ordinary policies cannot see the rival’s hand or deck order.')}</p>
    </div>''')

    # Responsive curves: geometry scales; all chart type stays HTML at article size.
    def coord(record,key): return (record['epoch']-1)/39*800, 220-record[key]['loss']/.6*220
    polylines=''.join('<polyline class="rn-line-'+key+'" points="'+' '.join(f'{x:.3f},{y:.3f}' for x,y in [coord(r,key) for r in HISTORY])+'"/>' for key in ['train','val'])
    initial=HISTORY[15]
    save('structured-training',f'''<div class="rn-training" data-native="training">
      <div class="rn-toolbar">{title('自回归训练','Autoregressive training')}<span class="rn-label">40 {L('轮','epochs')}</span></div>
      <div class="rn-curve-legend"><span class="rn-train-key">{L('训练损失','Training loss')}</span><span class="rn-val-key">{L('验证损失','Validation loss')}</span></div>
      <div class="rn-plot"><div class="rn-y-labels"><span>0.6</span><span>0.3</span><span>0</span></div><div class="rn-plot-inner"><svg viewBox="0 0 800 220" preserveAspectRatio="none" role="img" aria-label="{L('训练损失持续降低；验证损失在第 16 轮最低。','Training loss falls; validation loss reaches its minimum at epoch 16.')}"><path class="rn-gridline" d="M0 0H800 M0 110H800 M0 220H800"/>{polylines}<line class="rn-epoch-line" x1="{15/39*800:.3f}" x2="{15/39*800:.3f}" y1="0" y2="220"/></svg><div class="rn-x-labels"><span style="left:0%">1</span><span style="left:23.077%">10</span><span style="left:48.718%">20</span><span style="left:74.359%">30</span><span style="left:100%">40</span></div></div></div>
      <div class="rn-controls" hidden><label for="rn-epoch">{L('训练轮数','Epoch')} <output id="rn-epoch-value">16</output></label><input id="rn-epoch" type="range" min="1" max="40" value="16" step="1"></div>
      <div class="rn-readout" aria-live="polite"><span>{L('训练损失','Training loss')} <b data-loss="train">{initial['train']['loss']:.4f}</b></span><span>{L('验证损失','Validation loss')} <b data-loss="val">{initial['val']['loss']:.4f}</b></span><span class="rn-checkpoint">{L('保存第 16 轮','Checkpoint: epoch 16')}</span></div>
      <details class="rn-data"><summary>{L('40 轮实测数据','All 40 measured epochs')}</summary><table><thead><tr><th>{L('轮数','Epoch')}</th><th>{L('训练损失','Training loss')}</th><th>{L('验证损失','Validation loss')}</th></tr></thead><tbody>{''.join(f"<tr><th scope='row'>{r['epoch']}</th><td>{r['train']['loss']:.6f}</td><td>{r['val']['loss']:.6f}</td></tr>" for r in HISTORY)}</tbody></table></details>
    </div>''')

    save('training-pipeline',f'''<div class="rn-pipeline">{title('从自对弈，到浏览器','From self-play to the browser')}
      <div class="rn-system-root"><strong>10,000 {L('小局','games')}</strong><span>SDK Code AI × SDK Code AI</span></div>
      <div class="rn-split"><span><b>8,000</b>{L('训练','Train')}</span><span><b>1,000</b>{L('验证','Validation')}</span><span><b>1,000</b>{L('测试','Test')}</span></div>
      <div class="rn-two">{box('整手评分','Whole-move scoring',f'<p><strong>252,859</strong> {L("决策样本","decisions")}</p><p>{L("对合法整手做交叉熵训练。","Cross-entropy over legal moves.")}</p><p class="rn-note">{L("验证集选择第 5 轮。","Validation selects epoch 5.")}</p>')}{box('自回归','Autoregressive',f'<p><strong>988,571</strong> {L("目标 token","target tokens")}</p><p>{L("按 token 训练，按决策加权。","Token loss, weighted by decision.")}</p><p class="rn-note">{L("验证集选择第 16 轮。","Validation selects epoch 16.")}</p>')}</div>
      <div class="rn-contract"><span>PyTorch → ONNX → Web Worker</span><strong>actions-v2</strong></div>
    </div>''')

    flow=[('01','本地验证','Validate locally','JS / ONNX · 4 局 · validation.json','JS / ONNX · 4 games · validation.json'),('02','提交 PR','Open a PR','CI 校验可运行、合法性与结果一致。','CI checks playability, legality and reproducibility.'),('03','发布评分','Rate at release','3 个固定基准 × 20 局，另加 4 局验证。','3 frozen references × 20 games, plus 4 validation games.'),('04','上榜与试玩','Rank and play','记录入库，Pages 自动更新。','Records are committed; Pages updates automatically.')]
    save('arena-flow',f'<div class="rn-flow-figure">{title("同一份策略，从提交到试玩", "One policy, from submission to play")}<ol class="rn-flow">'+''.join(f'<li><span class="rn-step-num">{n}</span><div><strong>{L(z,e)}</strong><p>{L(a,b)}</p></div></li>' for n,z,e,a,b in flow)+f'</ol><p class="rn-callout">{L("每个新策略 60 个评分小局。固定基准 Elo，暂定评分。","60 rated games per new policy. Provisional Elo against frozen references.")}</p></div>')

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
