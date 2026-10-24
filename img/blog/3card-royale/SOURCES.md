# 3Card Royale article figures

Article published 2026-10-24. Game source: https://github.com/lucienzhu/3card-royale at `5f1b0fa79de4cdd1d9500d41cc3d53bc2190ca48`.

The cover and explanatory SVG diagrams reuse the game's current flat gold card, bougainvillea and suit artwork from `app/bloom-assets.js`, `app/card-face.js` and `brand-mark.svg`. Green represents the circuit board, as confirmed by the author.

The two game screenshots show the same fresh local game at 1000 × 900, in the light theme and PCB mode. No existing player save is used. Diagram hands and wound replacement cards are labeled explanatory examples.

`finale*.svg` and `share-*.svg` use the production sharing component and actual deterministic Code AI games under Standard Rules 1.0.0, first player 0. Match seed 0 completes in 11 games; individual-game seed 19 has 13 encounters. The recap originals remain complete; `share-recap-preview*.svg` changes only the SVG viewport to show the top in the article. English posters use the production English locale.

Training and win-rate charts use the committed `docs/experiments/nn-policy-v1/mlp-256-history.json` and `evaluation.json` reports. They introduce no new measurements. All five models use the same 1,000-game evaluation protocol; the win-rate axis spans 0–100%. Epoch 5 is selected by validation loss.
