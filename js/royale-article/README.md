# Interactive article figures

Four progressive enhancements for the English and Chinese 3Card Royale article:

- Attack/defense counterfactuals with the actual score rules.
- Three recorded positions, linked to their 336-dimensional observation encoding.
- A recorded legal move decoded through the production action grammar and prefix mask.
- Measured win rates, model sizes and complete-decision latency, with an opponent selector.

The original figures remain available without JavaScript and for printing. The complete measurements table remains in the article. No policy inference or fabricated model scores run in these figures.

## Sources

- `actions.js`: [3Card Royale SDK](https://github.com/lucienzhu/3card-royale/blob/main/sdk/actions.js), Git blob `d28fe4ff64e2d07c0e4dfcac02c7826828b9381b` (MIT). The attribution line is added locally.
- `examples.json`: records 0, 1 and 9 from [nn-observations.json](https://github.com/lucienzhu/3card-royale/blob/main/tests/fixtures/nn-observations.json), Git blob `56d9ccd104b848526db9fe23929efc0bf75d0275`. Recorded teacher candidate indices: 52, 21 and 65. Candidate indices identify these source records only; the displayed action protocol uses stable tokens.
- Evaluation values: the article's complete-baseline table, backed by [raw experiment records](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/docs/experiments/complete-baseline). Keep the interactive chart and both language tables in sync when updating results.
- `flower.svg`: extracted from this site's `img/blog/3card-royale/identity-en.svg`, preserving its paths and colors.

## Validation

Run `node js/royale-article/verify.cjs` from the repository root. This checks all fixture state values, each legal action and every allowed prefix against the pinned SDK, plus the chart's numbers against both article tables.

Build and preview using the site's normal Jekyll workflow. The scripts are loaded only by the two article pages, via `extra_js_bottom`. Browser checks should cover English/Chinese, narrow/wide layouts, card/bit linking, prefix steps, opponent selection, keyboard focus, no-JavaScript fallback and print output.
