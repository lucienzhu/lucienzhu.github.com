// Data integrity checks for the interactive article. Run with Node 18+.
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');
const actions = require('./actions.js');
const examples = require('./examples.json');
let moves = 0;
for (const {observation, expectedState} of examples) {
  const actual = actions.state(observation);
  assert.equal(actual.length, 336);
  assert.equal(expectedState.length, 336);
  actual.forEach((value, i) => assert.ok(Math.abs(value - expectedState[i]) < 1e-6, `State ${i}`));
  const grammar = actions.build(observation);
  const prefixes = new Map([['[]', []]]);
  for (const row of grammar.rows) {
    assert.deepEqual(grammar.validate(row.action).action, row.action);
    assert.deepEqual(grammar.resolve([...row.tokens, ...Array(6 - row.tokens.length).fill(65)]).action, row.action);
    for (let i = 0; i <= row.tokens.length; i++) {
      const prefix = row.tokens.slice(0, i);
      prefixes.set(JSON.stringify(prefix), prefix);
    }
    moves++;
  }
  for (const prefix of prefixes.values()) {
    const matches = grammar.rows.filter(row => prefix.every((id, i) => row.tokens[i] === id));
    const {mask, complete} = grammar.next(prefix);
    assert.equal(mask.length, 65);
    assert.equal(complete, matches.some(row => row.tokens.length === prefix.length));
    for (let token = 0; token < 65; token++) {
      assert.equal(mask[token], Number(matches.some(row => row.tokens[prefix.length] === token)));
    }
  }
}

// Catch drift between the chart and the existing bilingual measurements tables.
const source = fs.readFileSync(path.join(__dirname, 'experiments.js'), 'utf8');
const results = vm.runInNewContext(source.match(/const results = (\[[\s\S]*?\n  \]);/)[1]);
for (const file of ['_posts/2026-10-24-3card-royale.md', '_translations/blog/2026-10-24-3card-royale.md']) {
  const article = fs.readFileSync(path.resolve(__dirname, '../..', file), 'utf8');
  const table = article.split('{: .royale-policy-results }')[0].split('\n\n').at(-1);
  const rows = table.split('\n').filter(line => line.startsWith('|')).slice(2);
  assert.equal(rows.length, results.length, file);
  rows.forEach((line, i) => {
    const cells = line.split('|').slice(1, -1).map(cell => cell.trim());
    const [, size, latency, hard, sdk] = results[i];
    assert.equal(cells[1], size === null ? '—' : `${size.toFixed(2)} MB`);
    assert.equal(cells[2], `${latency.toFixed(2)} ms`);
    assert.equal(cells[3], `${(hard / 10).toFixed(1)}%`);
    if (sdk !== null) assert.equal(cells[4], `${(sdk / 10).toFixed(1)}%`);
  });
}
console.log(`Verified ${examples.length} state fixtures, ${moves} legal moves, all prefix masks, and both evaluation tables.`);
