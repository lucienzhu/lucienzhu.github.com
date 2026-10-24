'use strict';
// Usage: node _tools/3card-blog-figures.cjs /path/to/3card-royale
// Uses the actual artwork, theme tokens and Standard 1.0 evaluator; no network.
const fs = require('node:fs'), path = require('node:path'), vm = require('node:vm');
const game = path.resolve(process.argv[2] || '../3card-royale');
const out = path.resolve(__dirname, '../img/blog/3card-royale');
const ctx = {window: {}};
for (const name of ['bloom-assets', 'card-face', 'theme-tokens']) {
  vm.runInNewContext(fs.readFileSync(path.join(game, 'app', name + '.js'), 'utf8'), ctx);
}
const A = ctx.window.SZBloomAssets, suits = ctx.window.SZSuit;
const GK = require(path.join(game, 'gamecore.js'));
const tokens = ctx.window.SZThemeTokens;
const C = {...tokens.light, gold:tokens.card.back, goldEdge:tokens.card.backEdge, rival:tokens.light.gold, dark:tokens.dark.paper, darkTable:tokens.dark.table, darkInk:tokens.dark.ink};
const esc = s => String(s).replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('"','&quot;');
const inside = s => s.replace(/^<svg\b[^>]*>/,'').replace(/<\/svg>\s*$/,'');
const t = (x,y,s,size=28,color=C.ink,weight=500,anchor='start') => `<text x="${x}" y="${y}" font-size="${size}" fill="${color}" font-weight="${weight}" text-anchor="${anchor}">${esc(s)}</text>`;
const box = (x,y,w,h,fill=C.panel,stroke=C.line,r=12) => `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="${r}" fill="${fill}" stroke="${stroke}"/>`;
const line = (x1,y1,x2,y2,color=C.line) => `<path d="M${x1} ${y1}L${x2} ${y2}" stroke="${color}" stroke-width="2" fill="none"/>`;
const down = (x,y,length=28) => `<path d="M${x} ${y}v${length}m-6-7 6 7 6-7" stroke="${C.muted}" stroke-width="2" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
const flower = (x,y,w=32,color=C.red) => `<svg x="${x}" y="${y}" width="${w}" height="${w}" viewBox="8 12 48 48">${inside(A.cardFlower).replaceAll('#C5416B',color)}</svg>`;
const logo = (x,y,w=52) => `<svg x="${x}" y="${y}" width="${w}" height="${w}" viewBox="0 0 64 64">${inside(A.brand)}</svg>`;
function card(x,y,rank,suit,w=62,wild=false) {
  const ink = suits.isRed(suit) ? C.redText : C.ink, shape = inside(suits.svg(suit));
  return `<g transform="translate(${x} ${y})">${box(0,0,w,w*1.4,wild?'#FFF9E7':'#FFFEFA',wild?C.goldEdge:'#CBD9D0',6)}${t(w*.12,w*.42,rank,w*.44,ink,800)}<svg x="${w*.12}" y="${w*.5}" width="${w*.25}" height="${w*.25}" viewBox="0 0 24 24" fill="${ink}">${shape}</svg><svg x="${w*.43}" y="${w*.84}" width="${w*.43}" height="${w*.43}" viewBox="0 0 24 24" fill="${ink}" opacity=".09">${shape}</svg>${wild?t(w*.14,w*1.25,'★',w*.21,'#866300',700):''}</g>`;
}
function back(x,y,w=62) {
  return box(x,y,w,w*1.4,C.gold,C.goldEdge,8)+box(x+5,y+5,w-10,w*1.4-10,'none',C.goldEdge,5)+flower(x+w*.2,y+w*.4,w*.6);
}
function save(name,height,title,body,lang) {
  const suffix = lang === 'en' ? '-en' : '';
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="560" height="${height}" viewBox="0 0 560 ${height}" role="img" aria-labelledby="title desc" xml:lang="${lang}"><title id="title">${esc(title)}</title><desc id="desc">${esc(title)}. ${lang==='en'?'Explanatory figure for the 3Card Royale article.':'深圳花牌文章图解。'}</desc><style>text{font-family:Arial,'PingFang SC','Microsoft YaHei',sans-serif}</style><rect width="560" height="${height}" fill="${C.paper}"/>${body}</svg>\n`;
  fs.writeFileSync(path.join(out,name+suffix+'.svg'), svg);
}
const hands = [
  ['高牌','High card',[['2','s'],['5','h'],['9','d']]],
  ['对子','Pair',[['7','s'],['7','c'],['J','d']]],
  ['顺子','Straight',[['6','s'],['7','h'],['8','d']]],
  ['同花','Flush',[['4','d'],['8','d'],['Q','d']]],
  ['同花顺','Straight flush',[['6','s'],['7','s'],['8','s']]],
  ['三炸','Three of a kind',[['9','s'],['9','h'],['9','c']]],
  ['四炸','Four of a kind',[['7','s'],['7','h'],['7','c'],['7','d']]],
  ['五炸','Five of a kind',[['7','s'],['7','h'],['7','c'],['7','d'],['2','h']]],
];
hands.forEach(([zh,en,cards],score)=>{
  const ids = cards.map(([r,s])=>'shcd'.indexOf(s)*13+({J:11,Q:12,K:13,A:14}[r]||Number(r))-2);
  const value = GK.evaluate(ids,2,'1.0.0');
  if(value.score!==score) throw Error(`${en}: expected ${score}, got ${value.score}`);
});
// Compact, language-neutral card strips for the bilingual comparison table.
const handSlugs = ['high-card','pair','straight','flush','straight-flush','three-kind','four-kind','five-kind'];
const suitNames = {s:['黑桃','spades'],h:['红桃','hearts'],c:['梅花','clubs'],d:['方块','diamonds']};
const handRows = hands.map(([zh,en,cards],score)=>{
  const slug=handSlugs[score], width=cards.length*60-4, height=78;
  const alt_zh=cards.map(([r,s])=>suitNames[s][0]+r).join('、')+(score===7?'；红桃2为花牌，代替7。':'');
  const alt_en=cards.map(([r,s])=>`${r} of ${suitNames[s][1]}`).join(', ')+(score===7?'; the heart 2 is wild and counts as a 7.':'');
  const art=cards.map(([r,s],i)=>card(2+i*60,2,r,s,52,score===7&&i===4)).join('');
  fs.writeFileSync(path.join(out,`hand-${slug}.svg`),`<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><style>text{font-family:Arial,sans-serif}</style>${art}</svg>\n`);
  return {slug,zh,en,score,count:cards.length,width,height,alt_zh,alt_en};
});
fs.mkdirSync(path.resolve(__dirname,'../_data'),{recursive:true});
fs.writeFileSync(path.resolve(__dirname,'../_data/royale_hands.json'),JSON.stringify(handRows,null,2)+'\n');
// The observation figure is an actual saved swap decision, encoded by the
// production JS encoder and checked against the Python-generated fixture.
const observationFixture=JSON.parse(fs.readFileSync(path.join(game,'tests/fixtures/nn-observations.json'),'utf8'))[9];
const observationState=require(path.join(game,'sdk/features.js')).encode(observationFixture.observation).state;
if(observationState.length!==336 || observationState.some((v,i)=>Math.abs(v-observationFixture.state[i])>1e-7)) throw Error('Observation fixture encoding mismatch');
if(observationFixture.observation.phase!=='refresh') throw Error('Expected a swap decision for the observation figure');
for (const lang of ['zh-CN','en']) {
  const en = lang==='en', tr = (zh,english)=>en?english:zh;
  // The same flat mark and identity colors in the two actual game themes.
  let s=t(24,48,tr('一套视觉，两种明暗','One identity, two themes'),32,C.ink,700);
  for (const [x,dark] of [[24,false],[292,true]]) {
    s+=box(x,76,244,232,dark?C.dark:C.table,'none',12);
    s+=t(x+20,114,tr(dark?'夜间':'日间',dark?'Dark':'Light'),28,dark?C.darkInk:C.ink,700);
    s+=logo(x+14,139,64)+t(x+88,178,'3Card',27,dark?C.darkInk:C.ink,700)+t(x+88,211,'Royale',27,dark?C.darkInk:C.ink,700);
    s+=flower(x+20,250,28)+flower(x+64,250,28,C.rival)+t(x+108,274,tr('你 / 对手','You / Rival'),22,dark?'#9DB5A8':C.muted);
  }
  const swatches=[['红花','Flower',C.red],['金牌','Card',C.gold],['绿底','Board',C.dark],['电路板绿','Circuit-board',C.green]];
  swatches.forEach(([zh,eng,color],i)=>{const x=24+i*134;s+=box(x,340,110,48,color,'none',4);if(en&&i===3)s+=t(x,416,eng,18,C.ink,600)+t(x,440,'green',18,C.ink,600);else s+=t(x,420,en?eng:zh,24,C.ink,600);s+=t(x,468,color,20,C.muted);});
  s+=line(24,478,536,478)+t(24,520,tr('相同的牌与身份','Shared cards and identities'),28,C.ink,700);
  s+=back(28,548,72)+card(124,548,'2','h',72,true)+flower(254,558,34)+t(302,585,tr('你','You'),28,C.redText,700)+flower(254,618,34,C.rival)+t(302,645,tr('对手','Rival'),28,'#866300',700);
  s+=t(28,682,tr('牌背','Back'),24,C.muted)+t(124,682,tr('花牌','Wild'),24,C.muted);
  save('design-system',712,tr('视觉系统：电路板绿底、金牌与红金花身份','Visual system: circuit-board greens, gold cards and player identities'),s,lang);
  // Schematic of the actual table order: rival hand/wounds, combat and piles,
  // then your wounds/hand. Card values illustrate areas, not a recorded state.
  s=t(24,48,tr('牌区一览','Card zones'),32,C.ink,700);
  s+=box(24,76,512,720,C.table,'none',20);
  s+=flower(44,96,26,C.rival)+t(82,119,tr('对手','Rival'),27,'#866300',700);
  s+=t(516,119,tr('手牌 · 保密','Hand · private'),24,C.muted,500,'end');
  for(let i=0;i<5;i++)s+=back(154+i*48,140,60);
  const woundRow=(y,values)=>{
    let row=box(44,y,472,94,C.panel,C.line,12);
    row+=t(60,y+37,tr('伤牌','Wounds'),25,C.ink,700);
    row+=t(60,y+69,tr('双方可见','Public'),23,C.muted);
    values.forEach(([rank,suit],i)=>row+=card(350+i*58,y+13,rank,suit,48));
    return row;
  };
  s+=woundRow(244,[['K','d'],['3','c']]);
  s+=line(44,360,516,360);
  const columns=[[106,'进攻牌','Attack'],[236,'牌堆','Draw'],[324,'弃牌','Discard'],[448,'防守牌','Defense']];
  columns.forEach(([x,zh,eng])=>s+=t(x,394,tr(zh,eng),23,C.ink,600,'middle'));
  [['2','s'],['4','s'],['A','s']].forEach(([rank,suit],i)=>s+=card(44+i*43,414,rank,suit,38));
  s+=back(219,420,42)+back(216,417,42)+back(213,414,42);
  s+=box(307,420,42,59,C.paper,C.line,6)+box(304,417,42,59,C.paper,C.line,6)+box(301,414,42,59,C.panel,C.line,6);
  s+=t(322,454,'↘',25,C.muted,500,'middle');
  [['6','c'],['6','s'],['J','h']].forEach(([rank,suit],i)=>s+=card(386+i*43,414,rank,suit,38));
  s+=t(280,510,tr('出牌区：进攻与防守公开比较','Played cards: attack vs defense'),23,C.muted,500,'middle');
  s+=line(44,532,516,532);
  s+=woundRow(552,[['8','h'],['K','c']]);
  s+=flower(44,670,26)+t(82,693,tr('你','You'),27,C.redText,700);
  s+=t(516,693,tr('手牌 · 保密','Hand · private'),24,C.muted,500,'end');
  [['5','s'],['9','s'],['3','h'],['Q','h'],['8','c'],['3','d'],['5','d'],['10','d']].forEach(([rank,suit],i)=>s+=card(92+i*48,712,rank,suit,42));
  s+=t(280,838,tr('手牌、伤牌，都能出牌。','Play from your hand or wounds.'),25,C.ink,600,'middle');
  save('card-zones',868,tr('牌区示意：对手在上，你在下；手牌保密，伤牌公开','Card zones: rival above, you below; private hands and public wounds'),s,lang);
  for (const part of [0,1]) {
    s=t(24,48,tr('牌型与分数','Hands and scores'),32,C.ink,700)+t(536,48,part?'4—7':'0—3',28,C.redText,700,'end');
    hands.slice(part*4,part*4+4).forEach(([zh,eng,cards],i)=>{
      const y=84+i*150,score=part*4+i;
      s+=line(24,y,536,y)+t(24,y+39,en?eng:zh,28,C.ink,700)+t(536,y+39,tr(`${score} 分`,`${score} ${score===1?'pt':'pts'}`),28,C.redText,700,'end');
      cards.forEach(([r,suit],j)=>s+=card(24+j*70,y+52,r,suit,60,score===7&&j===4));
      if(score===7)s+=t(392,y+107,'♥2 → 7',24,'#866300',600);
    });
    s+=t(24,726,part?tr('★ 本局花牌：♥2','★ Shared wild card: ♥2'):tr('先比分数，同牌型再比点数','Compare score, then card ranks'),24,C.muted);
    save(part?'hands-strong':'hands-basic',756,tr('标准规则 1.0：','Standard Rules 1.0: ')+(part?'4–7':'0–3'),s,lang);
  }
  // Sequential combat, with its two kinds of reward and the terminal guard.
  s=t(24,48,tr('一轮，两次攻防','One round, two encounters'),32,C.ink,700);
  const step=(y,n,title,detail)=>box(24,y,512,100)+t(48,y+44,n,28,C.redText,700)+t(104,y+43,title,28,C.ink,700)+t(104,y+79,detail,24,C.muted);
  s+=step(80,'01',tr('进攻者亮牌','Attacker plays'),tr('三张 / 四炸 / 五炸','Three cards / four / five of a kind'))+down(280,180,26);
  s+=step(220,'02',tr('防守者回应','Defender responds'),tr('看见进攻牌，再决定','Choose after seeing the attack'))+down(280,320,26);
  s+=box(24,360,512,196)+t(48,402,tr('03  比较与结算','03  Compare and resolve'),28,C.ink,700);
  s+=t(48,448,tr('攻赢 → 对手加伤','Attack wins → wounds'),27,C.redText,600)+t(48,489,tr('守赢 → 可选换牌','Defense wins → optional swaps'),27,'#866300',600)+t(48,530,tr('完全平手 → 无收益','Exact tie → no gain'),24,C.muted);
  s+=down(280,556,24)+box(24,594,512,72,'#F6E0E7','none')+t(280,638,tr('达到 5 伤 → 本局结束','5+ wounds → game ends'),28,C.redText,700,'middle');
  s+=t(280,708,tr('否则继续 ↓','Otherwise ↓'),24,C.muted,500,'middle');
  s+=step(738,'04',tr('交换攻守','Switch roles'),tr('再做 01—03，中间不补手牌','Repeat 01–03; no hand refill'))+down(280,838,24);
  s+=step(876,'05',tr('轮末补到 8 张','Refill to 8 at round end'),tr('保留未用牌，开始下一轮','Keep unused cards; next round'));
  save('round-flow',1000,tr('攻防循环与本局终止条件','The combat loop and game termination'),s,lang);
  // Core implementations are independent ports; do not imply one JS binary runs all hosts.
  s=t(24,48,tr('一套规则，独立核心','One ruleset, native cores'),32,C.ink,700);
  s+=box(24,80,512,96,C.dark,'none')+t(280,120,'Standard Rules 1.0',30,C.darkInk,700,'middle')+t(280,154,tr('规则 · 状态 · 合法动作','Rules · state · legal actions'),24,'#9DB5A8',500,'middle')+down(280,176,26);
  s+=box(24,216,512,124)+t(280,258,'JavaScript · Python',30,C.ink,700,'middle')+t(280,298,'Rust · C++',30,C.ink,700,'middle')+t(280,329,tr('独立实现，共同回放校验','Independent ports · replay parity'),23,C.muted,500,'middle')+down(280,340,26);
  s+=box(24,380,512,132,C.table,'none')+t(48,422,tr('策略只收可见信息','Policies receive visible information'),27,C.ink,700)+t(48,464,tr('observation + legal actions','observation + legal actions'),26,C.green,600)+t(48,497,tr('对手暗手牌、牌堆顺序不可见','No rival hand or deck order'),23,C.muted);
  s+=`<path d="M280 512v20H12v218h12M12 610h12" fill="none" stroke="${C.muted}" stroke-width="2"/>`;
  s+=box(24,552,512,116)+t(48,594,tr('网页 · JavaScript 核心','Browser · JavaScript core'),28,C.ink,700)+t(48,635,'Code AI / ONNX Worker',27,C.muted);
  s+=box(24,692,512,116)+t(48,734,tr('实验 · Python 核心','Experiments · Python core'),28,C.ink,700)+t(48,775,'Gymnasium / PyTorch',27,C.muted);
  s+=t(24,856,tr('全状态留在宿主，用于存档与校验','Full state stays with the host'),23,C.muted);
  save('system-architecture',884,tr('系统架构：四种核心、可见观察、网页与实验宿主','System architecture: four native cores, public observations and two hosts'),s,lang);
  // Six multi-hot card sets, followed by one-hot phase and 18 meta features.
  s=t(24,48,tr('336 维，模型看到了什么','Inside the 336-value state'),31,C.ink,700);
  s+=t(24,82,tr('换牌阶段示例 · 当前玩家视角','Swap example · acting player’s view'),23,C.muted);
  s+=box(24,108,512,464,C.panel,C.line,16);
  s+=t(44,150,tr('六个牌区 × 52','Six card zones × 52'),27,C.ink,700)+t(516,150,'312',32,C.green,800,'end');
  const cardGroups=[['你的手牌','Your hand'],['你的伤牌','Your wounds'],['对手伤牌','Rival wounds'],['弃牌','Discards'],['你的已出牌','Your played cards'],['对手已出牌','Rival played cards']];
  for(let suit=0;suit<4;suit++){
    const x=218+suit*72, ink=suit===1||suit===3?C.redText:C.ink;
    s+=`<svg x="${x}" y="172" width="18" height="18" viewBox="0 0 24 24" fill="${ink}">${inside(suits.svg('shcd'[suit]))}</svg>`;
    s+=t(x+24,189,'2–A',18,C.muted);
  }
  cardGroups.forEach(([zh,eng],row)=>{
    const y=216+row*50;
    s+=t(44,y+20,tr(zh,eng),en?20:24,C.ink,600);
    for(let c=0;c<52;c++){
      const x=218+Math.floor(c/13)*72+(c%13)*5;
      s+=box(x,y,4,22,observationState[row*52+c]?C.green:C.paper,'none',1);
    }
  });
  s+=box(44,520,14,14,C.green,'none',2)+t(68,534,tr('1 有牌','1 present'),22,C.muted);
  s+=box(232,520,14,14,C.paper,C.line,2)+t(256,534,tr('0 无牌 · 空区全 0','0 absent · empty = all 0'),22,C.muted);
  s+=box(24,596,512,216,C.panel,C.line,16);
  s+=t(44,638,tr('局面信息','Position features'),27,C.ink,700)+t(516,638,'24',32,C.green,800,'end');
  s+=box(44,658,140,130,C.table,'none',10)+t(60,690,tr('阶段','Phase'),25,C.ink,700);
  for(let i=0;i<6;i++)s+=box(60+i*17,710,13,20,observationState[312+i]?C.green:C.paper,'none',2);
  s+=t(60,768,tr('6 维 · 选一','6 · one-hot'),21,C.muted);
  s+=box(200,658,316,130,C.table,'none',10)+t(216,690,tr('其余状态','Other state'),25,C.ink,700)+t(500,690,'18',26,C.green,700,'end');
  s+=t(216,727,tr('等级 · 花牌 · 牌数','Levels · wild · counts'),22,C.muted);
  s+=t(216,766,tr('身份 · 局轮 · 任务等','Roles · rounds · task…'),22,C.muted);
  s+=down(280,824,26);
  s+=box(24,866,512,110,C.dark,'none',16)+t(280,914,'312 + 24 = 336',36,C.darkInk,800,'middle');
  s+=t(280,952,tr('当前状态 → 与候选动作一起评分','Current state + candidate → score'),23,C.darkInk,500,'middle');
  s+=t(280,1014,tr('不含对手暗牌、牌堆顺序或历史。','No rival hand, deck order or history.'),23,C.muted,500,'middle');
  save('observation-state',1040,tr('336 维状态编码：六组 52 维牌区，加 6 维阶段和 18 维局面信息','336-value state: six 52-card sets, six phase bits and 18 position features'),s,lang);
  const node=(y,n,title,details)=>box(24,y,512,112)+t(48,y+45,n,28,C.redText,700)+t(104,y+44,title,28,C.ink,700)+t(104,y+84,details,24,C.muted);
  s=t(24,48,tr('从自对弈到浏览器','From self-play to the browser'),31,C.ink,700);
  s+=node(80,'01','Code AI × Code AI',tr('10,000 小局 · 252,859 决策','10,000 games · 252,859 decisions'))+down(280,192,24);
  s+=node(230,'02',tr('按完整小局切分','Split by whole game'),tr('训练 8,000 / 验证 1,000 / 测试 1,000','8,000 train / 1,000 val / 1,000 test'))+down(280,342,24);
  s+=node(380,'03','PyTorch + TensorBoard',tr('行为克隆 · 336 + 72 → 256 → 128 → 1','Imitation · 408 → 256 → 128 → 1'))+down(280,492,24);
  s+=node(530,'04',tr('按验证损失选 checkpoint','Select by validation loss'),tr('第 5 轮 · 再用留出集与对战评估','Epoch 5 · then test and play evaluation'))+down(280,642,24);
  s+=node(680,'05','ONNX → Web Worker',tr('0.55 MB 权重 · 浏览器本地推理','0.55 MB weights · local inference'));
  s+=box(24,822,512,88,C.table,'none')+t(48,859,tr('已上线：学习 Code AI 的选择','Released: learns Code AI actions'),25,C.ink,600)+t(48,893,tr('下一步：用胜负奖励做强化学习','Next: RL from win/loss rewards'),24,C.muted);
  save('training-pipeline',936,tr('行为克隆基线的训练与部署流程','Training and deployment of the behavior-cloning baseline'),s,lang);
}
console.log('Generated 16 bilingual figures and 8 hand strips. All 8 hands pass Standard 1.0 evaluation.');
