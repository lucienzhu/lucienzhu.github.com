'use strict';
// node _tools/3card-arena-figure.cjs — bilingual, repository-native SVG.
const fs = require('node:fs'), path = require('node:path');
const esc = s => s.replaceAll('&','&amp;').replaceAll('<','&lt;');
const text = (x,y,s,size=20,color='#122820',weight=500) => `<text x="${x}" y="${y}" font-size="${size}" font-weight="${weight}" fill="${color}">${esc(s)}</text>`;
for (const en of [false,true]) {
 const title=en?'From a policy to a playable opponent':'从一份策略，到一个可挑战的对手';
 const steps=en?[
  ['01','Build & validate','JavaScript or ONNX · new policy ID','4 games vs Code AI → validation.json'],
  ['02','Submit a PR','CI replays the four validation games','Checks playability; no Elo yet'],
  ['03','Publish & rate','After merge: release or manual run','3 fixed references × 20 games = 60'],
  ['04','Leaderboard & play','Results committed → Pages rebuilt','Challenge the same policy in the browser']
 ]:[
  ['01','编写与验证','JavaScript 或 ONNX · 新策略 ID','对 Code AI 打 4 局 → validation.json'],
  ['02','提交 PR','CI 重放四局验证，核对结果','检查能否对战；此时不评分'],
  ['03','发布与评分','合并后：发布版本或手动运行','3 个固定基准 × 20 局 = 60 局'],
  ['04','天梯与试玩','提交结果 → 重建 Pages','玩家挑战的，是同一份策略']
 ];
 let body=text(28,43,'AI ARENA / 1.1',14,'#B2365A',700)+text(28,82,title,24,'#122820',700);
 steps.forEach((a,i)=>{
  const y=108+i*130;
  body+=`<rect x="28" y="${y}" width="504" height="110" rx="14" fill="${i===3?'#E2ECE5':'#F7FBF8'}" stroke="#C3D5CB"/>`;
  body+=text(46,y+31,a[0],16,'#B2365A',700)+text(87,y+32,a[1],22,'#122820',700)+text(87,y+62,a[2],18,'#50695C')+text(87,y+87,a[3],18,'#50695C');
  if(i<3)body+=`<path d="M280 ${y+113}v12m-5-5 5 5 5-5" fill="none" stroke="#8EAA9B" stroke-width="2"/>`;
 });
 body+=text(28,656,en?'Public information · Individual games · Provisional Elo':'公开信息 · 小局胜负 · 暂定基准 Elo',17,'#50695C');
 const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="560" height="690" viewBox="0 0 560 690" role="img" aria-labelledby="title" xml:lang="${en?'en':'zh-CN'}"><title id="title">${title}</title><style>text{font-family:Arial,'PingFang SC','Microsoft YaHei',sans-serif}</style><rect width="560" height="690" fill="#EDF4EF"/>${body}</svg>\n`;
 fs.writeFileSync(path.join(__dirname,'../img/blog/3card-royale/arena-flow'+(en?'-en':'')+'.svg'),svg);
}
