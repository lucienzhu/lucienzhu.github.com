// Vendored from lucienzhu/3card-royale sdk/actions.js (MIT).
/* actions-v2: physical card IDs and typed, atomic actions. No candidate indices. */
(function(root, factory) {
  if (typeof module === 'object' && module.exports) module.exports = factory();
  else root.RoyaleActions = factory();
})(typeof globalThis !== 'undefined' ? globalThis : this, function() {
  'use strict';
  const VERSION='actions-v2', VOCAB=65, PAD=65, LENGTH=6;
  const names=['PLAY_3','PLAY_4','PLAY_5','SWAP','SKIP','STOP','ADVANCE','NEXT_GAME','DECK','BLIND','OWN_HAND','OWN_WOUNDS','RIVAL_WOUNDS'];
  const T=Object.freeze(Object.fromEntries(names.map((x,i)=>[x,52+i])));
  const targets=['deck','blind','own_hand','own_wounds','rival_wounds'];
  function fail(){throw Error('Illegal structured action / prefix');}
  function fromLegacy(o,a){
    if(a.type!=='swap')return JSON.parse(JSON.stringify(a));
    const z=a.target, target={zone:z.zone==='deck'||z.zone==='blind'?z.zone:z.who===o.player?'own_'+z.zone:'rival_wounds'};
    if(!['deck','blind'].includes(z.zone))target.card=z.who===o.player?o[z.zone][z.index]:o.enemy_wounds[z.index];
    return {type:'swap',source:o[a.source.zone][a.source.index],target};
  }
  function tokens(a){
    if(a.type==='play'){
      if(!Array.isArray(a.cards)||![3,4,5].includes(a.cards.length)||a.cards.some((c,i)=>!Number.isInteger(c)||c<0||c>=52||(i&&c<=a.cards[i-1])))fail();
      return [T['PLAY_'+a.cards.length],...a.cards];
    }
    if(a.type==='swap'){
      const z=targets.indexOf(a.target?.zone),c=a.source;
      if(z<0||!Number.isInteger(c)||c<0||c>=52)fail();
      if(z<2){if(Object.keys(a.target).length!==1)fail();return [T.SWAP,c,60+z];}
      const d=a.target.card;if(!Number.isInteger(d)||d<0||d>=52)fail();
      return [T.SWAP,c,60+z,d];
    }
    const id={skip_swap:T.SKIP,stop_swaps:T.STOP,advance:T.ADVANCE,next_game:T.NEXT_GAME}[a.type];
    if(id===undefined)fail();return [id];
  }
  function same(a,b){
    const normalize=x=>Array.isArray(x)?x.map(normalize):x&&typeof x==='object'?Object.fromEntries(Object.keys(x).sort().map(k=>[k,normalize(x[k])])):x;
    return JSON.stringify(normalize(a))===JSON.stringify(normalize(b));
  }
  function build(o){
    const rows=o.legal_actions.map((a,i)=>{const action=o.action_schema===VERSION?a:fromLegacy(o,a);return {action,legacy:a,index:i,tokens:tokens(action)};});
    const starts=(seq,p)=>p.length<=seq.length&&p.every((t,i)=>t===seq[i]);
    function next(prefix=[]){
      if(!Array.isArray(prefix)||prefix.length>LENGTH||prefix.some(t=>!Number.isInteger(t)||t<0||t>=VOCAB))fail();
      const matches=rows.filter(r=>starts(r.tokens,prefix)),mask=new Uint8Array(VOCAB);
      if(prefix.length&&!matches.length)fail();
      const complete=matches.some(r=>r.tokens.length===prefix.length);
      for(const r of matches)if(r.tokens.length>prefix.length)mask[r.tokens[prefix.length]]=1;
      return {mask,complete};
    }
    function resolve(sequence){
      if(!Array.isArray(sequence)||!sequence.length||sequence.length>LENGTH)fail();
      const firstPad=sequence.indexOf(PAD),end=firstPad<0?sequence.length:firstPad;
      if(sequence.slice(end).some(t=>t!==PAD))fail();
      const seq=sequence.slice(0,end);next(seq);
      const row=rows.find(r=>same(r.tokens,seq));if(!row)fail();return row;
    }
    function validate(action){const row=resolve(tokens(action));if(!same(row.action,action))fail();return row;}
    return {rows,next,resolve,validate};
  }
  function state(o,episode='game'){
    const who=o.player,out=new Float32Array(336);
    [o.hand,o.wounds,o.enemy_wounds,o.discard,o.active[who]?.cards||[],o.active[1-who]?.cards||[]].forEach((cs,i)=>cs.forEach(c=>{if(c!==null)out[i*52+c]=1;}));
    out[312+['attack','defend','refresh','resolved','game_over','match_over'].indexOf(o.phase)]=1;
    out.set([o.levels[0]/14,o.levels[1]/14,o.flower_level/14,Math.min(o.wounds.length,10)/10,Math.min(o.enemy_wounds.length,10)/10,o.enemy_hand_count/8,o.deck_count/52,o.discard.length/52,o.a_losses[0]/3,o.a_losses[1]/3,+(o.first===who),+(o.attacker===who),o.battle_index,(o.pending?.remaining||0)/7,+(o.actor===who),Math.min(o.round,1024)/1024,Math.min(o.game,1024)/1024,+(episode==='match')],318);
    return out;
  }
  function prefixFeatures(prefix){
    if(!Array.isArray(prefix)||prefix.length>=LENGTH||prefix.some(t=>!Number.isInteger(t)||t<0||t>=VOCAB))fail();const out=new Float32Array(LENGTH*(VOCAB+1));
    for(let i=0;i<LENGTH;i++)out[i*(VOCAB+1)+(i<prefix.length?prefix[i]:PAD)]=1;
    return out;
  }
  function best(logits,mask){
    if(logits.length!==VOCAB)throw Error('Expected 65 token logits');let result=-1;
    for(let i=0;i<VOCAB;i++)if(mask[i]){if(!Number.isFinite(logits[i]))throw Error('Non-finite legal logit');if(result<0||logits[i]>logits[result])result=i;}
    if(result<0)fail();return result;
  }
  async function decode(o,predict){
    const grammar=build(o),prefix=[],s=state(o);
    while(!grammar.next(prefix).complete){const {mask}=grammar.next(prefix);prefix.push(best(await predict(s,prefixFeatures(prefix)),mask));}
    return grammar.resolve(prefix);
  }
  function observation(o){const {legal_actions,...publicState}=o;return {...publicState,action_schema:VERSION,legal_actions:build(o).rows.map(r=>r.action)};}
  return {VERSION,VOCAB,PAD,LENGTH,T,fromLegacy,tokens,build,state,prefixFeatures,best,decode,observation};
});
