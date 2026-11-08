---
layout: "royale-article"
title: "3Card Royale: One Deck, Two Players, Three Cards in Bloom"
date: "2026-10-24 00:00:00 +0800"
author: "Xiaolong Zhu"
show_url: true
tags: ["blog"]
lang: "en"
summary: "One deck, two players: Shenzhen-inspired design, a neural baseline and an open AI Arena."
permalink: "/updates/2026/10/3card-royale/"
alternate_url: "/zh/updates/2026/10/3card-royale/"
article_url: "https://lucienzhu.github.io/updates/2026/10/3card-royale/"
article_image: "/img/blog/3card-royale/cover-en.png"
extra_css: ["/css/royale-article.css", "/css/royale-experiments.css", "/css/royale-native.css"]
extra_js_bottom: ["/js/royale-article/actions.js", "/js/royale-article/experiments.js", "/js/royale-article/native.js"]
update_id: "3card-royale"
release_tag: "v1.2.0"
last_modified_at: "2026-11-02 00:00:00 +0800"
---

{% include royale-native.html kind="cover" src="/img/blog/3card-royale/cover-en.svg" caption="One deck. Two players. Three cards. Make them bloom." %}

I wanted to make a replayable two-player game using a single ordinary deck of cards.

Two people and an ordinary deck should be enough to get started. After a few games, there should still be choices worth thinking about. Luck brings variety; judgment changes the outcome; an opponent's move changes what I want to do next.

That idea became **3Card Royale**, aka **Shenzhen Flower Cards** (深圳花牌): a 1v1 game built around three-card combinations. Attacks deal wounds, successful defenses earn opportunities to swap cards, and the cards received as wounds can re-enter play. Both players climb from 2 to Ace. Win your own Ace challenge, and you bloom.

The project now includes a browser playtest, a complete rulebook, a Shenzhen-inspired visual identity, a reproducible neural baseline and an open AI Arena. Play against a policy, or submit one of your own.

## 1. The starting point: a replayable duel with one deck
{: #origin}

I wanted familiar cards to make the basic actions easy to understand: choose, compare, attack and defend. The rules should fit into a few sentences, while the interesting decisions emerge through play.

**Easy to begin, with choices that keep developing: that is what matters most to me.**

An ordinary deck provides a shared vocabulary. Ranks, suits, pairs, straights and flushes are already familiar. That leaves more room to learn the mechanisms that give this particular game its character.

The game draws inspiration from [Hanafuda](https://en.wikipedia.org/wiki/Hanafuda), [Zha Jin Hua](https://baike.sogou.com/m/v7421269.htm "Sogou Baike · Chinese"), [Guandan](https://en.wikipedia.org/wiki/Guandan) and [Balatro](https://en.wikipedia.org/wiki/Balatro): the connection between flowers and cards, the immediacy of three-card combinations, the variation introduced by ranks and wild cards, and the pleasure of rearranging familiar hands.

I eventually put the emphasis on the relationship between attack and defense. An attack should deal damage, but it also spends cards I may need to defend. The defender sees the attack before responding and can decide whether to beat it or preserve a more valuable combination while accepting some damage. A successful defense can then change the next encounter through a swap.

{% include royale-figure.html src="/img/blog/3card-royale/table-light-en.jpg" width="1000" height="900" alt="The live table, with the rival above, the player below and the current encounter in the middle." caption="Figure 1. The browser playtest in English. The rival has played a flush; the player is choosing a defense. The rival&#x27;s private hand remains face down." %}

{% include royale-native.html kind="card-zones" src="/img/blog/3card-royale/card-zones-en.svg?v=boxes1" caption="Figure 2. Card zones. Hands are private; wounds are public and can also be played." %}

The same three cards can become an attack, a defense or the beginning of a better combination next round. Their value depends on the position.

I hope a player finishes a game remembering a particular decision: was that flush played too early, should that wound card have been saved, was the swap worth taking? Wanting to try again with that question in mind is the result I am looking for.

## 2. The design: bougainvillea on a green circuit board
{: #design}

The Chinese name gives the game a home in Shenzhen.

Bougainvillea is [Shenzhen's city flower](https://www.sz.gov.cn/ztfw/gysy/wyw_183970/ywzsk_184570/content/post_12660964.html). Its three-part form connects naturally with the game's three cards, while the city's skyline also finds its way into the interface.

The mark is a flat gold card: a gold surface and border, a red flower in the center and small gold stamens. The same image runs through the logo, card backs and wild-card indicator.

{% include royale-native.html kind="identity" src="/img/blog/3card-royale/identity-en.svg" caption="Figure 3. The current production flower and card mark, with the green circuit board that supports them." %}

**The flower is the focal point. The green circuit board is the foundation.**

The green surface carries the cards and a little of Shenzhen's hardware character. Light and dark themes are two expressions of that same circuit-board green. Red and gold flowers sit on top of it.

Color also identifies the players. You are the red flower; your rival is gold. That distinction stays consistent across the table, progress track and shared images.

{% include royale-native.html kind="design-system" src="/img/blog/3card-royale/design-system-en.svg" caption="Figure 4. Production colors and artwork. Both green themes come from the circuit-board idea." %}

There is a circuit-board mode in Settings too. Card zones become chips, traces connect the playing areas, and points of light move with the action. The green foundation takes part in the game.

{% include royale-figure.html src="/img/blog/3card-royale/table-pcb-en.jpg" width="1000" height="900" alt="The same game in circuit-board mode, with chip pins and traces around the playing areas." caption="Figure 5. The same position with Settings → Preferences → Circuit board enabled." %}

The skyline brings the city into the ending. Buildings appear in light linework; flowers can settle into corners of the city while the architecture remains in the background.

The fullest expression is the bloom at the end of a match. After the winner clears their own Ace challenge, the animation starts with the cards they actually played. For a four- or five-card hand, it takes the first three. The cards turn over in motion, gather into a flower, blossom and drift down into the city. As space opens above, the message appears:

> You bloomed.

The animation grows out of the game that just happened. The final play becomes the beginning of the victory image.

{% include royale-native.html kind="finale" src="/img/blog/3card-royale/finale-en.svg" caption="Figure 6. A diagram of the recorded seed-0 result: 11 games, 7 : 4, 58 rounds." %}

Winning a single game gets a lighter celebration. A good game deserves recognition; completing the journey from 2 through Ace deserves a fuller bloom. The visuals give those two achievements different weight.

## 3. The game: attack for wounds, defend for swaps
{: #rules}

Three lines summarize the rhythm:

1. **Eight cards in hand. Take turns attacking and defending.**
2. **Attacks deal wounds. Defenses earn swaps.**
3. **Climb from 2 to Ace, then clear your own Ace challenge.**

Two players share an ordinary 52-card deck without jokers. Each starts with eight cards and level 2. Hands are private; wound cards are public.

The attacker reveals a play, and the defender responds after seeing it. Most plays use three cards; four of a kind uses four, and five of a kind uses five. The two sides need not use the same number of cards, suit or hand type.

{% include royale-hands.html %}

Five of a kind requires all four natural cards of a rank plus the game's wild card. Hand scores are compared first, then ranks within the same hand type. Suits do not break ties.

For example, attack with the flush `4♦, 8♦, Q♦` against the pair `6♣, 6♠, J♥`. A flush scores 3 and a pair scores 1: the attack wins and the defender receives **two wound cards**.

If the defender answers a flush with three of a kind, the defender earns **two swap opportunities**. A win decided by ranks within the same hand type yields one wound or one swap opportunity. An exact tie yields neither.

{% include royale-experiment.html kind="combat" src="/img/blog/3card-royale/attack-defense-en.svg" width="1200" height="496" alt="A flush attack beats a pair for two wounds; three of a kind defends against a flush for two swap opportunities." caption="Figure 8. Attacking advances the game toward its end; defending improves the next position. These examples use ♥2 as the wild card." %}

### Wounds are playable cards

Cards received as wounds are placed face up in the wound area. They still belong to you and can be combined with cards from your hand. A used wound card is replaced in its original slot with a new face-up card, keeping the wound count unchanged.

Being wounded brings you closer to losing, but also gives you new cards to work with. Both players can see them and consider the combinations they make possible. A wound might offer a counterattack that your opponent can also see coming.

{% include royale-native.html kind="wounds" src="/img/blog/3card-royale/wounds-en.svg" caption="Figure 9. Playing a wound card does not heal it. K♦ is an example refill; the replacement comes from the deck." %}

### A swap is an opportunity, not an obligation

A successful defense lets you exchange one of your own hand or wound cards with an eligible target: a random card in the rival's hand, a specified public wound, your other card area or the deck. The permitted targets depend on the source area. Swapping changes the cards, not the wound count.

Each opportunity can be skipped independently. With two opportunities, you can use one and skip the other, or keep everything unchanged. Having that choice is itself a benefit of defense.

Refills give the round its rhythm. A round finishes after both players have attacked once. Hands are not refilled between those two encounters. At the end of the round, unused cards are kept and hands refill to eight. The first play therefore needs to leave something for the second encounter.

{% include royale-native.html kind="round-flow" src="/img/blog/3card-royale/round-flow-en.svg" caption="Figure 10. Two encounters per round, with no hand refill between them. Either resolution can end the game at five wounds." %}

### Reach Ace, then win once more

A game ends when a player reaches five or more wounds. The winner advances by the full difference between the final wound counts. If the rival finishes with seven wounds and you have two, you advance five ranks. Damage is not capped at five for this calculation.

Advancement stops at Ace, but reaching it is not enough. **You must win an Ace game in which you are the challenger to win the match.** Losing your own Ace challenge three times resets you to level 2; the rival keeps their level.

Each game also has one shared wild card. The first game uses `♥2`; later games use the heart card matching the previous winner's new level. If the winner advances to 7, the next game uses `♥7` for both players. It remains fixed throughout that game.

Private hands, public wounds, a shared wild card and decisions that carry between attack and defense create the game's variety.

[Full rules](https://lucienzhu.github.io/3card-royale/rules.html?lang=en) · [A4 rules card](https://lucienzhu.github.io/3card-royale/docs/shenzhen-flower-rules-a4.en.pdf)

## 4. Reinforcement learning: one environment, different policies
{: #rl}

The game combines hidden information, random deals and connected decisions about attack, defense and resources. A reproducible environment makes those decisions testable: fix the deals, change the policy, and compare outcomes.

GameCore is separate from the interface and strategy. JavaScript, Python, Rust and C++ have independent implementations checked against shared replay sequences. The browser and self-play collector use JavaScript; Gymnasium uses the native Python core, and PyTorch trains on saved examples.

{% include royale-native.html kind="system-architecture" src="/img/blog/3card-royale/system-architecture-en.svg" caption="Figure 11. Ordinary policies receive only their own hand and public information. Complete moves return to the engine for validation and execution." %}

### What a policy can see

The neural policies receive their own hand, both public wound areas, discards, current played cards and position metadata. Each of the **six card zones** uses 52 presence bits in fixed card order. Another **6 phase bits + 18 values** give a **336-dimensional observation**. Neither network receives the rival's private hand, deck order or a history sequence.

{% include royale-experiment.html kind="observation" src="/img/blog/3card-royale/observation-state-en.svg" width="560" height="2434" diagram=true alt="A saved swap observation: all six 52-card zones, six phase bits, and 18 metadata values, with their raw values and normalization." caption="Figure 12. Every observation feature. Card zones are multi-hot; phase is one-hot. This example has 29 cards in the deck, encoded as 29 / 52." %}

### Stable meanings, conditional choices

All policies submit the same complete action through **actions-v2**. Physical card IDs stay fixed: suits ♠, ♥, ♣, ♦, each ordered 2 through Ace. Token IDs 0–51 identify those cards; 52–54 mean `PLAY_3`, `PLAY_4`, `PLAY_5`; 55–64 cover swaps, destinations and progression. `PAD = 65` fills unused sequence positions.

For three Aces, the sequence is `PLAY_3 → A♠ → A♥ → A♣`. Selected cards cannot repeat. Ascending card IDs give every play a unique representation, regardless of click order. Four- and five-card plays must form valid bombs. A swap names its source and destination, plus a target card for a visible card area. `SKIP` uses one opportunity; `STOP` ends the remaining opportunities.

The **65-bit conditional mask** marks tokens that can still complete a legal move. Its values change with the state and selected prefix; token meanings do not. Gym accepts the completed move as six padded tokens, `MultiDiscrete([66] × 6)`, and advances the game once. [Action contract and Gym usage](https://github.com/lucienzhu/3card-royale/blob/unify-action-space/docs/ACTIONS.md).

{% include royale-experiment.html kind="action" src="/img/blog/3card-royale/structured-actions-en.svg" width="1000" height="650" alt="Fixed token IDs form a three-card play or swap. A conditional mask filters each continuation before the complete move is submitted." caption="Figure 13. One action protocol for code, whole-move scoring and autoregressive policies." %}

### Two ways to model a decision

**Whole-move scoring** enumerates legal moves. A shared MLP scores each `336-value state + 72-value move descriptor`; the highest-scoring move is submitted. Its internal list position may change, but the selected move is converted to stable card IDs.

**Autoregressive generation** starts with an operation and predicts one token at a time. A shared MLP receives the same state plus a 396-value prefix encoding, then outputs 65 token scores. Masked decoding takes at most six calls to build one move.

| Policy | Network | Parameters | ONNX |
| --- | --- | ---: | ---: |
| Whole-move scoring | 408 → 256 → 128 → 1 | 137,729 | 0.55 MB |
| Autoregressive | 732 → 256 → 128 → 65 | 228,929 | 0.92 MB |

The protocol constrains valid actions, not how a policy learns or searches. Both models currently use **behavior cloning from SDK Code AI**, a frozen teacher distinct from browser Hard Code AI. Neither has been trained from rewards. The scorer also uses handcrafted hand features, so this comparison does not isolate architecture alone.

### Training and reproduction

Each recipe generates **10,000 SDK self-play games**, split by whole game into **8,000 training / 1,000 validation / 1,000 test**. The scorer has 252,859 decision samples; the autoregressive dataset has 252,906 decisions and 988,571 target tokens. Separate recipes and seeds account for the different counts.

The scorer uses cross-entropy over legal complete moves. The generator uses masked, teacher-forced token cross-entropy, weighting each complete decision equally. PyTorch trains both; TensorBoard records train/validation curves. Validation loss selects epoch **5** for the scorer and **16** for the generator.

{% include royale-native.html kind="structured-training" src="/img/blog/3card-royale/structured-training-en.svg" caption="Figure 14. Autoregressive training. Checkpoint selection uses validation loss, not playing results." %}

The scorer matches the teacher's **whole move 89.36%** of the time on its test split. The generator reaches **90.44% teacher-forced token accuracy**. These are different metrics: correct tokens under a supplied prefix do not guarantee a correct free-running move. The generator's teacher also supplies no positive `SKIP` or `STOP` examples.

{% include royale-native.html kind="training-pipeline" src="/img/blog/3card-royale/training-pipeline-en.svg" caption="Figure 15. Separate datasets and checkpoints; one action protocol. Each train/validation/test split is made by whole game." %}

Data exceeds the repository's 10 MB budget, so deterministic generation recipes and hashes replace dataset downloads. The best ONNX weights, histories, runtime versions and evaluation records are checked in. To evaluate newly trained weights, register a new immutable policy ID and validate it; the supplied baseline evaluation command loads the checked-in entries. [Scoring recipe](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/training) · [Autoregressive recipe](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/training/structured).

### Baseline evaluation

Each cell below uses **1,000 individual games**, with the same 500 seeds, swapped seats, balanced first attackers and level-2 starts. **Code AI** is the browser's Hard opponent; **SDK Code AI** is the training teacher. All **19,000 games** completed with no illegal actions or truncations.

{% include royale-experiment.html kind="evaluation" src="/img/blog/3card-royale/win-rates-en.svg" width="864" height="576" alt="Win rates for eight public-information policies against browser Code AI and SDK Code AI, on the same 500 paired seeds." caption="Figure 16. Same deals, two opponents. Each bar covers 1,000 games; the full 0–100% axis keeps differences in perspective." %}

| Policy | ONNX | Latency p95 | vs Code AI | vs SDK Code AI |
| --- | ---: | ---: | ---: | ---: |
| Random | — | 0.21 ms | 0.0% | 0.0% |
| Easy · 64 | — | 0.59 ms | 34.1% | 35.6% |
| SDK Code AI | — | 0.66 ms | 48.0% | Self |
| Scoring · 64 → 32 | 0.11 MB | 0.73 ms | 41.9% | 47.8% |
| Scoring · 128 → 64 | 0.24 MB | 0.88 ms | 42.5% | 44.4% |
| Scoring · 256 → 128 | 0.55 MB | 1.32 ms | 42.6% | 45.5% |
| Scoring · 256 → 512 | 0.95 MB | 2.54 ms | 43.6% | 44.7% |
| Scoring · 512 → 256 | 1.37 MB | 2.71 ms | 40.3% | 45.8% |
| Autoregressive · 256 → 128 | 0.92 MB | 0.87 ms | 23.9% | 26.6% |
| Godlike · open hand | — | 18.12 ms | 67.0% | 67.5% |
{: .royale-policy-results }

Latency is the highest opponent-batch p95 for a complete policy decision on **Apple M1 / Node 22 / single-thread WASM**. It includes encoding and all inference calls, excluding initial loading and inter-thread messaging. It is not a mobile benchmark. ONNX sizes cover weights; code policies have no ONNX artifact. [Reports, hashes and reproduction](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/docs/experiments/complete-baseline).

The scorer wins **42.6%** against Hard, while the autoregressive checkpoint wins **23.9%**. In their direct matchup, the generator wins **28.8%**. A fixed protocol makes policies interoperable; it does not make one model stronger. Small differences between scoring widths do not establish a strength ranking. Godlike sees the rival's hand and is excluded from the public-information ladder.

An [11,000-game neural comparison](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/docs/experiments/neural-baselines) also covers Easy, Random and the registered NN512 scorer. It shares 4,000 games with the table above: together these reports contain **26,000 distinct games**, not 30,000.

A next experiment is to learn from several good moves or continue from these checkpoints using win/loss rewards. Gym supports both individual games and full matches through the Ace challenge; the current baselines train on individual games. Reward-driven RL remains future work.

## 5. Arena: bring a policy to the table
{: #arena}

A game becomes more interesting when other people bring different ways to play it. **Arena** makes that possible for code: submit a strategy, earn a reference Elo, and let players challenge the same policy in their browsers. You can start with a few rules or a trained network.

[The Arena](https://lucienzhu.github.io/3card-royale/arena.html?lang=en) brings the leaderboard, RL environment and baseline together.

### One folder, two ways to play

A submission lives in `policies/entries/your-policy-v1/`, with a manifest, source or weights, a README and a generated validation receipt. Add it to the registry with your GitHub handle. Use a new ID for each revision so a score always refers to the exact evaluated policy.

| Format | Interface |
| --- | --- |
| JavaScript | `createPolicy → act(observation) → complete semantic action` |
| ONNX · `scoring-v2` | `state [B,336] + candidates [B,N,72] → move scores [B,N]` |
| ONNX · `structured-v2` | `state [B,336] + prefix [B,396] → token scores [B,65]` |

Both ONNX profiles and JS declare `royale-policy-v2` and `actions-v2`. Model-specific outputs map to the same complete semantic action before validation. The neural policies are separate rated entries; the 256 → 128 scorer remains a fixed Elo reference.

Both receive the acting player's information: their own hand and public cards, without the rival's hidden hand or deck order. JS strategies may remember public observations within a game. The current ONNX contract has no recurrent state. **Godlike is excluded from the ladder.**

No training is required for a JS policy. If your strategy is in Python or another language, port it with Codex or Claude Code and compare actions on saved observations before submitting. Each policy artifact is limited to 5 MB. GitHub Pages serves the reviewed files; a browser Worker runs the policy locally. The site loads registered submissions, not arbitrary uploads.

### Validate first, rate at release

1. **Local:** run `npm run arena:validate`, then `npm run arena:submit -- --policy your-policy-v1`. This plays four games against Code AI, covering both seats and first movers. Commit the resulting `validation.json`.
2. **PR:** CI replays those games and checks matching results, legal actions and time limits. It checks playability; it does not award Elo.
3. **Publication:** after review and merge, the policy appears as **Unrated**. A GitHub Release or a manual **Publish Arena** run evaluates pending policies, commits the results and rebuilds Pages. The leaderboard updates automatically.

{% include royale-native.html kind="arena-flow" src="/img/blog/3card-royale/arena-flow-en.svg" caption="Figure 17. PR checks validate play; release evaluation fits Elo from 60 games. Releases also repeat the four validation games." %}

Each new entry plays **20 games against each of three frozen references: Easy, NN 256 and Code AI**. That is 60 rated individual games, starting at level 2, with paired seats and balanced first attackers. Including fresh validation, publication costs **64 games per pending policy**, independent of the number already on the board. Unchanged scores are reused; browser games never change ratings.

The references stay at **1387, 1440 and 1500**. The evaluator fits one rating to the 60 outcomes using the Elo win-probability curve, with a declared prior that keeps all-win or all-loss results finite. This is a **provisional reference Elo**, without a K-factor update or game-order effect. Small gaps do not establish strength; a fixed panel and public seeds can also be overfit. [Exact calculation and limits](https://github.com/lucienzhu/3card-royale/blob/main/arena/README.md).

Whole-move scoring **512 → 256** has provisional Elo **1443** (30/60 wins); autoregressive **256 → 128** has **1237** (14/60). Both use the same frozen reference panel. These 60-game ratings are separate from the 1,000-game baseline evaluation above. [Rating records](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/arena/results/reference-elo-v1).

### The ladder: pick an AI to play
{: #ladder}

Pick an opponent and play directly in your browser. These games do not change the ratings.

{% include royale-ladder.html %}

[Policy format and templates](https://github.com/lucienzhu/3card-royale/tree/main/policies) · [Submission guide](https://github.com/lucienzhu/3card-royale/blob/main/policies/README.md)

## 6. Try it: open the page and play a few games
{: #play}

The rules work for two people with a physical deck. The current browser playtest is human versus AI, free and available on mobile and desktop without registration.

New players start on **Easy AI**. Choose another opponent under **Settings → Preferences → AI opponent**: Easy, NN AI, Hard · Code AI, Godlike, or **Arena AI** for registered policies. NN AI uses the autoregressive model; whole-move scorers are available under Arena AI.

The first visit begins with a short practice: **8 cards → attack with three Aces → resolve → defend with a flush → take 1 wound**. Wound icons show what happened. The first real game then introduces playable wound cards and swapping with contextual hints.

The browser remembers completion. **Quick start** in Settings lets you disable hints or **Practice again**. On mobile, swipe across cards to select them. Resolved encounters advance automatically to the next attack or defense; choices such as swapping remain yours.

After a game, there are three ways to look back: **Game recap** shows every encounter in order; **Final hand** shows the last play and final wound difference; **Best play** picks out the largest hit or strongest hand. Choose the moment you like and share its PNG.

{% include royale-native.html kind="sharing" src="sharing.svg" caption="Figures 18–20. Game 1, seed 19: the recap, final hand and biggest hit." %}


The source, rules, design system, environment and model materials are open. Come and play, or try your own policy, model or rule idea.

I hope this becomes a game that two people can begin at any time, learn something about each other's decisions over a few games, and finish with a particular hand still in mind.

**One deck. Two players. Three cards. Make them bloom.**

[Play](https://lucienzhu.github.io/3card-royale/?lang=en) · [AI Arena](https://lucienzhu.github.io/3card-royale/arena.html?lang=en) · [GitHub](https://github.com/lucienzhu/3card-royale)
