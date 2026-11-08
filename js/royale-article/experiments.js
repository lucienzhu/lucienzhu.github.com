/* Progressive, bilingual explanations for the 3Card Royale article. */
(() => {
  'use strict';
  const article = document.querySelector('.royale-article');
  if (!article || !window.RoyaleActions) return;
  const zh = article.lang === 'zh-CN';
  const t = (en, cn) => zh ? cn : en;
  const esc = value => String(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const suits = ['♠', '♥', '♣', '♦'];
  const ranks = ['2','3','4','5','6','7','8','9','10','J','Q','K','A'];
  const cardName = id => ranks[id % 13] + suits[Math.floor(id / 13)];
  const tokenName = id => id < 52 ? cardName(id) : id === 65 ? 'PAD' : Object.keys(RoyaleActions.T).find(k => RoyaleActions.T[k] === id);
  const actionJSON = action => JSON.stringify(action, null, 2).replace(/\[\s+([\d,\s]+)\s+\]/g, (_, values) => '[' + values.trim().split(/,\s*/).join(', ') + ']');
  const root = new URL('.', document.currentScript.src);
  const flower = new URL('flower.svg', root).href;
  const phases = [t('Attack','进攻'),t('Defend','防守'),t('Swap','换牌'),t('Resolved','结算'),t('Game end','小局结束'),t('Match end','整场结束')];
  const zones = [t('Your hand','你的手牌'),t('Your wounds','你的伤牌'),t('Rival wounds','对手伤牌'),t('Discards','弃牌'),t('Your played cards','你的出牌'),t('Rival played cards','对手出牌')];
  const tabs = (items, selected, attr, label) => `<div class="rx-tabs" role="group" aria-label="${esc(label)}">${items.map((x,i) => `<button type="button" ${attr}="${i}" data-focus="${attr}-${i}" aria-pressed="${selected === i}">${esc(x)}</button>`).join('')}</div>`;
  const heading = (number, title, controls = '') => `<div class="rx-heading"><div class="rx-kicker">${t('Figure','图')} ${number} · ${t('Explore','交互图')}</div><h3>${title}</h3>${controls}</div>`;
  function card(id, options = {}) {
    if (id === null) return `<span class="rx-card back" aria-label="${t('Hidden card','暗牌')}"><img src="${flower}" alt=""></span>`;
    const s = Math.floor(id / 13), tag = options.button ? 'button' : 'span';
    return `<${tag} class="rx-card ${s % 2 ? 'red' : ''} ${options.wild ? 'wild' : ''} ${options.active ? 'is-active' : ''}" data-suit="${suits[s]}" ${options.button ? `type="button" data-card="${id}" data-zone="${options.zone}" data-focus="card-${options.zone}-${id}" aria-pressed="${!!options.active}"` : ''} aria-label="${cardName(id)}${options.wild ? t(' · wild card',' · 花牌') : ''}">${ranks[id % 13]}<small>${suits[s]}</small></${tag}>`;
  }
  const cards = (ids, options = {}) => `<div class="rx-cards">${ids.map(id => card(id, options)).join('')}</div>`;
  function mount(host, render, onClick) {
    const live = host.querySelector('.rx-live');
    const redraw = () => {
      const focused = live.contains(document.activeElement) ? document.activeElement.dataset.focus : null;
      live.innerHTML = render();
      if (focused) live.querySelector(`[data-focus="${focused}"]`)?.focus({preventScroll:true});
    };
    redraw();
    live.hidden = false;
    host.classList.add('is-enhanced');
    host.querySelector('.rx-static').open = false;
    // Keep existing article deep links pointed at the visible explanation.
    const staticFigure = host.querySelector('figure[id]');
    if (staticFigure) {
      host.id = staticFigure.id;
      staticFigure.removeAttribute('id');
      if (location.hash === `#${host.id}`) requestAnimationFrame(() => host.scrollIntoView());
    }
    live.addEventListener('click', e => onClick(e, redraw));
    return redraw;
  }

  function combat(host) {
    let choice = 0;
    const cases = [
      {hand:[30,4,22],kind:t('Pair · 1 point','对子 · 1 分'),result:t('The defender takes 2 wounds','防守方受到 2 伤'),math:'3 − 1 = 2',glyph:'<i class="rx-wound"></i><i class="rx-wound"></i>'},
      {hand:[15,19,24],kind:t('Higher flush · 3 points','更大的同花 · 3 分'),result:t('The defender earns 1 swap','防守方获得 1 次换牌'),math:t('Same type; K beats Q','同牌型，比点数：K 大于 Q'),glyph:'⇄'},
      {hand:[7,20,33],kind:t('Three of a kind · 5 points','三炸 · 5 分'),result:t('The defender earns 2 swaps','防守方获得 2 次换牌'),math:'5 − 3 = 2',glyph:'⇄ ⇄'}
    ];
    mount(host, () => {
      const c = cases[choice];
      return heading('08',t('One attack. Three different answers.','同一次进攻，三种应对。'),tabs([t('Pair','对子'),t('Higher flush','更大的同花'),t('Three of a kind','三炸')],choice,'data-defense',t('Defense','防守'))) +
        `<div class="rx-fight"><div class="rx-side"><b>${t('Attack','进攻')}</b>${cards([41,45,49])}<span class="rx-score">${t('Flush · 3 points','同花 · 3 分')}</span></div><span class="rx-arrow" aria-hidden="true">→</span><div class="rx-side"><b>${t('Defense','防守')}</b>${cards(c.hand)}<span class="rx-score">${c.kind}</span></div></div><div class="rx-result" role="status"><div><strong>${c.result}</strong><small>${c.math}</small></div><span class="rx-result-glyph" aria-hidden="true">${c.glyph}</span></div><div class="rx-note">${t('Win the attack to deal wounds. Win the defense to earn optional swaps.','进攻赢，打伤害；防守赢，获得可选的换牌机会。')}</div>`;
    }, (e, redraw) => {
      const b = e.target.closest('[data-defense]');
      if (b) { choice = Number(b.dataset.defense); redraw(); }
    });
  }

  let example = 0;
  const exampleTabs = () => tabs(phases.slice(0,3),example,'data-example',t('Saved position','已保存局面'));
  const useExample = i => {example = i; document.dispatchEvent(new CustomEvent('royale-example'));};
  const zoneCards = o => [o.hand,o.wounds,o.enemy_wounds,o.discard,o.active[o.player]?.cards || [],o.active[1-o.player]?.cards || []];
  function observation(host, examples) {
    let zone = 0, selected = examples[0].observation.hand[0];
    const redraw = mount(host, () => {
      const o = examples[example].observation, state = RoyaleActions.state(o), all = zoneCards(o);
      const boardZone = z => `<div class="rx-zone ${all[z].length ? '' : 'is-empty'} ${zone === z ? 'is-zone' : ''}"><button type="button" class="rx-zone-label" data-board-zone="${z}" data-focus="zone-${z}">${z+1} · ${zones[z]}</button><div class="rx-cards">${all[z].length ? all[z].map(id => card(id,{button:true,zone:z,active:zone === z && selected === id,wild:id === 13 + o.flower_level - 2})).join('') : '<span class="rx-empty">—</span>'}</div></div>`;
      const present = state[zone * 52 + selected] === 1;
      const raw = [o.levels[0],o.levels[1],o.flower_level,o.wounds.length,o.enemy_wounds.length,o.enemy_hand_count,o.deck_count,o.discard.length,o.a_losses[0],o.a_losses[1],+(o.first===o.player),+(o.attacker===o.player),o.battle_index,o.pending?.remaining || 0,+(o.actor===o.player),o.round,o.game,0];
      const names = [t('Seat 0 level','席位 0 等级'),t('Seat 1 level','席位 1 等级'),t('Wild rank','花牌点数'),t('Your wound count','你的伤牌数'),t('Rival wound count','对手伤牌数'),t('Rival hand count','对手手牌数'),t('Deck count','牌堆张数'),t('Discard count','弃牌张数'),t('Seat 0 Ace losses','席位 0 冲 A 失败'),t('Seat 1 Ace losses','席位 1 冲 A 失败'),t('You go first','你先攻'),t('You are attacking','你进攻'),t('Encounter index','攻防序号'),t('Swaps remaining','剩余换牌'),t('Your turn','轮到你'),t('Round','轮次'),t('Game','局数'),t('Match episode','整场模式')];
      return heading('12',t('A card on the table. A bit in the state.','牌面上的牌，状态里的值。'), exampleTabs()) +
        `<div class="rx-observation"><div class="rx-board"><div class="rx-board-head"><b>${phases[example]}</b><span>${t('Round','第')} ${o.round}${t('',' 轮')} · ${o.deck_count} ${t('in deck','张牌堆')}</span></div><div class="rx-zone"><span class="rx-zone-label">${t('Rival hand · hidden','对手手牌 · 隐藏')}</span>${cards(Array(o.enemy_hand_count).fill(null))}</div>${[2,5,3,4,1,0].map(boardZone).join('')}</div><div class="rx-encoder"><div class="rx-subhead">${t('6 card zones × 52 bits','6 个牌区 × 52 位')}</div>${tabs(zones,zone,'data-zone-tab',t('Card zone','牌区'))}<div class="rx-matrix"><span></span>${ranks.map(x=>`<span class="rx-rank">${x}</span>`).join('')}${suits.map((s,si)=>`<span class="rx-suit ${si%2?'red':''}">${s}</span>${ranks.map((_,r)=>{const id=si*13+r,value=state[zone*52+id];return `<button type="button" class="rx-bit ${value?'on':''} ${selected===id?'selected':''}" data-bit="${id}" data-focus="bit-${id}" aria-label="${cardName(id)} · ${zones[zone]} · ${value}" aria-pressed="${selected===id}">${value}</button>`;}).join('')}`).join('')}</div><div class="rx-bit-readout" role="status"><strong>${cardName(selected)}</strong> · ${present ? t('present','有牌') : t('absent','无牌')}<br><code>state[${zone*52+selected}] = ${present ? 1 : 0}</code></div><div class="rx-legend"><span><i class="rx-mini-bit on"></i>1 · ${t('present','有牌')}</span><span><i class="rx-mini-bit"></i>0 · ${t('absent','无牌')}</span></div><div class="rx-subhead">${t('6 phase bits','6 位阶段编码')}</div><div class="rx-phase">${phases.map((p,i)=>`<div class="${state[312+i]?'on':''}">${p}<strong>${state[312+i]}</strong></div>`).join('')}</div><details class="rx-meta"><summary>${t('18 position values','18 项局面数值')} · 312 + 6 + 18 = 336</summary><table><thead><tr><th>${t('Feature','状态')}</th><th>${t('Raw','原值')}</th><th>${t('Encoded','入模值')}</th></tr></thead><tbody>${names.map((name,i)=>`<tr><td><code>[${318+i}]</code> ${name}</td><td>${raw[i]}</td><td>${Number(state[318+i].toFixed(5))}</td></tr>`).join('')}</tbody></table></details></div></div><div class="rx-note">${t('Select a card or a bit to follow the same value. The rival’s private hand is never encoded.','点击牌或格子，对照同一个值。对手的暗牌不进入编码。')}</div>`;
    }, (e, draw) => {
      const tab = e.target.closest('[data-example]');
      if (tab) {useExample(Number(tab.dataset.example)); return;}
      const z = e.target.closest('[data-zone-tab],[data-board-zone]');
      const c = e.target.closest('[data-card]');
      const bit = e.target.closest('[data-bit]');
      if (z) {zone=Number(z.dataset.zoneTab ?? z.dataset.boardZone); selected=zoneCards(examples[example].observation)[zone][0] ?? 0; draw();}
      if (c) {zone=Number(c.dataset.zone);selected=Number(c.dataset.card);draw();}
      if (bit) {selected=Number(bit.dataset.bit);draw();}
    });
    document.addEventListener('royale-example', () => {zone=0;selected=examples[example].observation.hand[0];redraw();});
  }

  function action(host, examples) {
    let step = 1;
    const choices = [52,21,65]; // Recorded teacher choices in the three source observations.
    const redraw = mount(host, () => {
      const o=examples[example].observation, grammar=RoyaleActions.build(o), row=grammar.rows[choices[example]], seq=row.tokens;
      step=Math.min(step,seq.length);
      const prefix=seq.slice(0,step), {mask,complete}=grammar.next(prefix), allowed=Array.from(mask).flatMap((v,i)=>v?[i]:[]);
      const selectedCards=row.action.type==='play' ? row.action.cards : [row.action.source,row.action.target.card].filter(x=>x!==undefined);
      const padded=[...seq,...Array(6-seq.length).fill(65)];
      const meaning=row.action.type==='play' ? t('Play','出牌') : t('Your wound → rival wound','你的伤牌 → 对手伤牌');
      return heading('13',t('Fixed tokens. A legal next step.','固定的 token，合法的下一步。'),exampleTabs()) +
        `<div class="rx-stepper"><div class="rx-board-head"><b>${meaning}</b><span>${t('Recorded legal move','记录中的合法动作')}</span></div>${cards(selectedCards)}<div class="rx-tokens">${padded.map((id,i)=>`<div class="rx-token ${i<step?'selected':''} ${id===65?'pad':''}"><small>${tokenName(id)}</small><b>${id}</b></div>`).join('')}</div><div class="rx-step-controls"><code>${t('Prefix','当前前缀')} [${prefix.join(', ')}]</code><div class="rx-step-buttons"><button type="button" data-step="-1" data-focus="step-back" ${step===0?'disabled':''} aria-label="${t('Previous step','上一步')}">←</button><button type="button" data-step="1" data-focus="step-next" ${complete?'disabled':''}>${t('Next','下一步')} →</button></div></div><p class="rx-mask-text" role="status">${complete ? `<strong>${t('Complete. Submit one move.','动作完成，执行一次。')}</strong>` : `<strong>${allowed.length} ${t('legal next tokens','个合法的下一步')}</strong> · ${t('mask = 1','mask = 1')}`}</p><div class="rx-token-mask">${allowed.map(id=>`<span>${tokenName(id)} <small>[${id}]</small></span>`).join('')}</div><details class="rx-full-mask"><summary>${t('All 65 mask values','完整 65 位 mask')}</summary><div class="rx-fixed-mask">${Array.from(mask,(v,i)=>`<span class="${v?'on':''}" title="${tokenName(i)}"><small>${i<52?tokenName(i):esc(tokenName(i).replace('RIVAL_','R.').replace('OWN_','O.'))}</small><b>${v}</b><small>[${i}]</small></span>`).join('')}</div></details><pre class="rx-json">${esc(actionJSON(row.action))}</pre></div><div class="rx-note">${t('IDs never change. The mask changes with the prefix. PAD (65) fills unused slots and is not a selectable token.','ID 始终不变；mask 随前缀变化。PAD（65）只补齐空位，不参与选择。')}</div>`;
    }, (e, draw) => {
      const tab=e.target.closest('[data-example]'), b=e.target.closest('[data-step]');
      if (tab) useExample(Number(tab.dataset.example));
      if (b) {step+=Number(b.dataset.step);draw();}
    });
    document.addEventListener('royale-example',()=>{step=1;redraw();});
  }

  const results = [
    ['Random',null,.21,0,0,'code'],['Easy · 64',null,.59,341,356,'code'],['SDK Code AI',null,.66,480,null,'code'],
    ['64 → 32',.11,.73,419,478,'scorer'],['128 → 64',.24,.88,425,444,'scorer'],['256 → 128',.55,1.32,426,455,'scorer'],['256 → 512',.95,2.54,436,447,'scorer'],['512 → 256',1.37,2.71,403,458,'scorer'],
    ['256 → 128',.92,.87,239,266,'ar'],['Godlike',null,18.12,670,675,'open']
  ];
  const family = k => ({code:t('Code policy','代码策略'),scorer:t('Whole-move scoring','整手评分'),ar:t('Autoregressive','自回归'),open:t('Open hand · extra information','明牌 · 额外信息')})[k];
  function evaluation(host) {
    let opponent=0, selected=5;
    mount(host,()=>{
      const row=results[selected],wins=row[3+opponent];
      return heading('16',t('Does a bigger model play better?','模型越大，就越强吗？'),tabs(['Code AI','SDK Code AI'],opponent,'data-opponent',t('Evaluation opponent','评测对手'))) +
        `<div class="rx-chart"><div class="rx-axis"><span>${t('Win rate against','对手')} ${opponent?'SDK Code AI':'Code AI'}</span><span class="rx-ticks"><span>0%</span><span>50%</span><span>100%</span></span><span></span></div>${results.map((r,i)=>`${i===9?`<div class="rx-bar-section">${t('Different information setting','不同信息条件')}</div>`:''}<button type="button" class="rx-bar-row" data-policy="${i}" data-focus="policy-${i}" aria-pressed="${i===selected}" aria-label="${esc(r[0])}, ${family(r[5])}, ${r[3+opponent]===null?t('self-play not evaluated','未评测自身对战'):r[3+opponent]/10+'%'}"><span class="rx-bar-label">${esc(r[0])}<small>${family(r[5])}</small></span><span class="rx-bar-track"><span class="rx-bar" style="--value:${(r[3+opponent]??0)/10}%"></span></span><span class="rx-bar-value">${r[3+opponent]===null?'—':(r[3+opponent]/10).toFixed(1)+'%'}</span></button>`).join('')}<div class="rx-model-detail" role="status"><strong class="rx-model-title">${esc(row[0])} · ${family(row[5])}</strong><div class="rx-model-metrics"><span><b>${wins===null?'—':wins.toLocaleString()+' / 1,000'}</b><small>${t('wins','胜局')}</small></span><span><b>${row[1]===null?'—':row[1].toFixed(2)+' MB'}</b><small>${t('ONNX weights','ONNX 权重')}</small></span><span><b>${row[2].toFixed(2)} ms</b><small>${t('complete decision · p95','完整决策 · p95')}</small></span></div><p>${row[5]==='scorer'?t('One network scores every legal move; submit the highest-scoring move.','同一个网络为合法出牌评分，提交最高分动作。'):row[5]==='ar'?t('Predict a token, update the mask, repeat until the move is complete.','预测一个 token，更新 mask，直到动作完整。'):row[5]==='open'?t('Sees the rival’s hand. Excluded from the public-information ladder.','可见对手手牌，不参与公开信息天梯。'):t('A JavaScript strategy; no neural weights.','JavaScript 策略，无神经网络权重。')}</p></div></div><div class="rx-note">${t('1,000 games per matchup · paired seats · same 500 seeds. Small differences do not establish a strength ranking. p95: highest opponent-batch value on Apple M1 / Node 22 / single-thread WASM; not a mobile benchmark.','每组 1,000 局 · 交换座位 · 同一组 500 个种子。小幅差异不足以判断强弱。p95 取对手批次中的最大值：Apple M1 / Node 22 / 单线程 WASM，非手机延迟。')}</div>`;
    },(e,draw)=>{
      const op=e.target.closest('[data-opponent]'), p=e.target.closest('[data-policy]');
      if(op){opponent=Number(op.dataset.opponent);draw();}
      if(p){selected=Number(p.dataset.policy);draw();}
    });
    const table=article.querySelector('.royale-policy-results');
    if(table){const details=document.createElement('details');details.className='rx-raw-table';const summary=document.createElement('summary');summary.textContent=t('All measurements · data table','全部测量值 · 数据表');details.append(summary);table.before(details);details.append(table);}
  }

  // Each figure enhances independently; the original remains usable on failure.
  for(const [kind, init] of [['combat',combat],['evaluation',evaluation]]){
    const host=article.querySelector(`[data-experiment="${kind}"]`);
    if(host) try{init(host);}catch(error){console.error(`Figure ${kind}:`,error);}
  }
  fetch(new URL('examples.json',root)).then(r=>{if(!r.ok)throw Error('Observation data unavailable');return r.json();}).then(examples=>{
    for(const [kind,init] of [['observation',observation],['action',action]]){
      const host=article.querySelector(`[data-experiment="${kind}"]`);
      if(host)try{init(host,examples);}catch(error){console.error(`Figure ${kind}:`,error);}
    }
  }).catch(error=>console.error('Interactive observations:',error));
  const forPrint=()=>{document.querySelectorAll('.rx-static,.rx-raw-table').forEach(d=>{d.dataset.printOpen=String(d.open);d.open=true;});};
  window.addEventListener('beforeprint',forPrint);
  window.addEventListener('afterprint',()=>{document.querySelectorAll('[data-print-open]').forEach(d=>{d.open=d.dataset.printOpen==='true';delete d.dataset.printOpen;});});
})();
