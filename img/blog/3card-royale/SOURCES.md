# 3Card Royale article figures

Article published 2026-10-24. Game source: https://github.com/lucienzhu/3card-royale at `5f1b0fa79de4cdd1d9500d41cc3d53bc2190ca48`.

The cover and explanatory SVG diagrams reuse the game's current flat gold card, bougainvillea and suit artwork from `app/bloom-assets.js`, `app/card-face.js` and `brand-mark.svg`. Green represents the circuit board, as confirmed by the author.

Each language has its own pair of game screenshots at 1000 × 900, in the light
theme and PCB mode. Within each pair, the position is unchanged. The English pair
was captured from the actual English interface, not overlaid with translated
labels. No existing player save is used. Diagram hands and wound replacement
cards are labeled explanatory examples. The English article also has its own
cover SVG and PNG sharing image.

`finale*.svg` and `share-*.svg` use the production sharing component and actual deterministic Code AI games under Standard Rules 1.0.0, first player 0. Match seed 0 completes in 11 games; individual-game seed 19 has 13 encounters. The recap originals remain complete; `share-recap-preview*.svg` changes only the SVG viewport to show the top in the article. English posters use the production English locale.

Training and win-rate charts use the committed `docs/experiments/nn-policy-v1/mlp-256-history.json` and `evaluation.json` reports. They introduce no new measurements. All five models use the same 1,000-game evaluation protocol; the win-rate axis spans 0–100%. Epoch 5 is selected by validation loss.

## Additional explanatory figures

Seven new figures per language illustrate the design system, interface hierarchy,
eight hand types (two panels), round flow, software architecture, and training /
deployment. Each has an English `-en.svg` counterpart and descriptive article alt
text. They are diagrams, not screenshots or new experimental measurements.

Rebuild from this repository with the game checked out at the revision above:

```sh
node _tools/3card-blog-figures.cjs /path/to/3card-royale
```

The generator reads the current theme tokens and flat logo / flower / suit assets.
It checks all eight hand examples through `gamecore.js` under Standard 1.0.0 and
uses ♥2 as the shared wildcard. The five-of-a-kind illustration keeps the physical
♥2 face visible and marks its substitution for a seven.

System diagrams follow `docs/SDK.md`, `docs/RL.md`, `docs/MODEL.md` and
`training/README.md`. The four cores are independent implementations with replay
conformance, not one shared executable. Policies receive their player's visible
observation; private full state remains with the host. The released model uses
behavior cloning; reward-trained RL is explicitly future work. UI schematics
follow `app/drawer.js` and the current game/match settlement components.

The in-article hand table uses eight compact `hand-*.svg` strips generated from
the same card renderer and validated hand examples. `_data/royale_hands.json`
provides bilingual names and alt text. The final row shows the physical ♥2
with the shared wildcard highlight; it is not a fifth natural seven.

## Stable release audit · 2026-10-25

The article's experiment and source links are pinned to
[`v1.0.0`](https://github.com/lucienzhu/3card-royale/releases/tag/v1.0.0).
The historical figure source revision above is retained. Rebuilding the current
bilingual diagrams, eight hand strips and hand table data against the release
source produced 25 byte-identical files. Observations and all 18 metadata values
are checked against the saved fixture by the generator.

The NN/SDK study and the restored browser Hard comparisons remain separate;
no old win rate is relabeled as a result against Hard. The audit did not retrain
models or invent new latency measurements. See the game repository's
`docs/releases/v1.0.0.md` for the full release checks and scope.

## 2026-10-25 · Current-hand AI and quick start

The architecture diagrams explicitly label the SDK / NN observation boundary; Godlike uses its own allowlisted current-hand interface. The article keeps historical experiment links pinned to `v1.0.0` and cites Godlike policy/results at `1887d08e29e4e6cb88e646b43308f18e1b9a57d2`. The first-visit guide description follows `51cfd7bdc3b57833ca2db93fc80c21f8b9ba57d3`: hand and public wound cards can be selected together. No experimental measurements were rerun or changed for this documentation update.
