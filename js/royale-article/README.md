# Interactive article figures

Native figures and interactive explanations for the English and Chinese 3Card Royale article. Diagram labels, card ranks, captions and chart axes use live text with the article's typography, rather than text embedded in images.

Four interactive explanations:

- Attack/defense counterfactuals with the actual score rules.
- Three recorded positions, linked to their 336-dimensional observation encoding.
- A recorded legal move decoded through the production action grammar and prefix mask.
- Measured win rates, model sizes and complete-decision latency, with an opponent selector.

Twelve native figure types cover the opening, card zones, visual identity, design system, finale, wounds, round flow, system architecture, autoregressive training, data pipeline, Arena workflow and sharing. The design-system figure switches between day and night; the training curve exposes all 40 recorded epochs; sharing has three switchable views. The hand-score table also uses native cards. The two actual gameplay screenshots remain photographs of the interface.

Native figures remain readable without JavaScript. The four interactive explanations retain their original image fallbacks without JavaScript; printing uses their live figures when enhanced. All three sharing views are included in print output. The complete measurements table remains in the article. No policy inference or fabricated model scores run in these figures.

Run `python3 _tools/3card-native-figures.py` to regenerate the bilingual HTML partials in `_includes/royale-native/`. Styling lives in `css/royale-native.css`; the small interactive layer is `native.js`.

## Visual grammar

Text uses the article type scale while cards and diagrams reflow independently. Sequence uses arrows, alternative outcomes branch, and parallel recipes align in separate lanes. The round diagram includes early termination and hand-refill timing; the architecture shows the actual information boundary. The data pipeline keeps the two separately generated datasets distinct. Methods and provenance belong in captions or the article, rather than inside decorative boxes. Only theme comparison, sharing views and the four experiments need interaction.

## Sources

- `actions.js`: [3Card Royale SDK](https://github.com/lucienzhu/3card-royale/blob/main/sdk/actions.js), Git blob `d28fe4ff64e2d07c0e4dfcac02c7826828b9381b` (MIT). The attribution line is added locally.
- `examples.json`: records 0, 1 and 9 from [nn-observations.json](https://github.com/lucienzhu/3card-royale/blob/main/tests/fixtures/nn-observations.json), Git blob `56d9ccd104b848526db9fe23929efc0bf75d0275`. Recorded teacher candidate indices: 52, 21 and 65. Candidate indices identify these source records only; the displayed action protocol uses stable tokens.
- Evaluation values: the article's complete-baseline table, backed by [raw experiment records](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/docs/experiments/complete-baseline). Keep the interactive chart and both language tables in sync when updating results.
- `flower.svg`: extracted from this site's `img/blog/3card-royale/identity-en.svg`, preserving its paths and colors.
- `flower-gold.svg`: the same geometry, using the established opponent-gold color.
- `skyline.svg`: the city illustration extracted from `img/blog/3card-royale/finale-en.svg`, without its labels.
- `finale-bloom.svg` and `finale-vine.svg`: the same recorded finale's complete artwork, including the central bloom, 40 scattered flowers, egrets, skyline and rank markers. Canopy flowers use the approved `flower.svg` geometry. All title, statistics and rank text remains HTML, sized independently of the artwork.
- `training-history.json`: all 40 epochs from [the autoregressive training run](https://github.com/lucienzhu/3card-royale/blob/unify-action-space/models/structured-policy/history.json). Epoch 16 has the lowest recorded validation loss. The chart marks that minimum directly, compares it with the last epoch, and provides the full table. It does not retrain or interpolate measurements.
- Sharing examples: the existing seed-19 recap, final-hand and best-play posters in `img/blog/3card-royale/`; each view links to its source poster.

## Validation

Run `node js/royale-article/verify.cjs` from the repository root. This checks all fixture state values, each legal action and every allowed prefix against the pinned SDK, plus the chart's numbers against both article tables.

Build and preview using the site's normal Jekyll workflow. The scripts are loaded only by the two article pages, via `extra_js_bottom`. Browser checks cover English/Chinese at 320, 390, 768 and 1440 pixels; card/bit linking; prefix steps; opponent selection; day/night switching; sharing views; recorded epoch values; keyboard focus; no-JavaScript fallback; and print output.
