---
layout: "royale-article"
title: "3Card Royale: One Deck, Two Players, Three Cards in Bloom"
date: "2026-10-24 00:00:00 +0800"
author: "Xiaolong Zhu"
show_url: true
tags: ["blog"]
lang: "en"
summary: "From a replayable two-player card game to bougainvillea, green circuit boards and a neural policy in the browser."
permalink: "/updates/2026/10/3card-royale/"
alternate_url: "/zh/updates/2026/10/3card-royale/"
article_url: "https://lucienzhu.github.io/updates/2026/10/3card-royale/"
article_image: "/img/blog/3card-royale/cover-en.png"
extra_css: ["/css/royale-article.css?v=random-baseline1"]
update_id: "3card-royale"
release_tag: "v1.0.0"
---

{% include royale-figure.html src="/img/blog/3card-royale/cover-en.svg" width="1200" height="640" alt="Three gold flower cards on a green circuit board" caption="One deck. Two players. Three cards. Make them bloom." %}

I wanted to make a replayable two-player game using a single ordinary deck of cards.

Two people and an ordinary deck should be enough to get started. After a few games, there should still be choices worth thinking about. Luck brings variety; judgment changes the outcome; an opponent's move changes what I want to do next.

That idea became **3Card Royale**, or **深圳花牌** in Chinese: a 1v1 game built around three-card combinations. Attacks deal wounds, successful defenses earn opportunities to swap cards, and the cards received as wounds can re-enter play. Both players climb from 2 to Ace. Win your own Ace challenge, and you bloom.

The project now includes a browser playtest, a complete rulebook, a Shenzhen-inspired visual identity, a reproducible neural policy baseline and a reinforcement-learning environment.

## 1. The starting point: a replayable duel with one deck
{: #origin}

I wanted familiar cards to make the basic actions easy to understand: choose, compare, attack and defend. The rules should fit into a few sentences, while the interesting decisions emerge through play.

**Easy to begin, with choices that keep developing: that is what matters most to me.**

An ordinary deck provides a shared vocabulary. Ranks, suits, pairs, straights and flushes are already familiar. That leaves more room to learn the mechanisms that give this particular game its character.

The game draws inspiration from [Hanafuda](https://en.wikipedia.org/wiki/Hanafuda), [Zha Jin Hua](https://baike.sogou.com/m/v7421269.htm "Sogou Baike · Chinese"), [Guandan](https://en.wikipedia.org/wiki/Guandan) and [Balatro](https://en.wikipedia.org/wiki/Balatro): the connection between flowers and cards, the immediacy of three-card combinations, the variation introduced by ranks and wild cards, and the pleasure of rearranging familiar hands.

I eventually put the emphasis on the relationship between attack and defense. An attack should deal damage, but it also spends cards I may need to defend. The defender sees the attack before responding and can decide whether to beat it or preserve a more valuable combination while accepting some damage. A successful defense can then change the next encounter through a swap.

{% include royale-figure.html src="/img/blog/3card-royale/table-light-en.jpg" width="1000" height="900" alt="The live table, with the rival above, the player below and the current encounter in the middle." caption="Figure 1. The browser playtest in English. The rival has played a flush; the player is choosing a defense. The rival&#x27;s private hand remains face down." %}

{% include royale-figure.html src="/img/blog/3card-royale/card-zones-en.svg?v=boxes1" width="560" height="868" diagram=true alt="Eight outlined card zones: rival hand and public wounds above; attack, draw pile, discard pile and defense in the middle; your public wounds and hand below." caption="Figure 2. Card zones. Hands are private; wounds are public and can also be played." %}

The same three cards can become an attack, a defense or the beginning of a better combination next round. Their value depends on the position.

I hope a player finishes a game remembering a particular decision: was that flush played too early, should that wound card have been saved, was the swap worth taking? Wanting to try again with that question in mind is the result I am looking for.

## 2. The design: bougainvillea on a green circuit board
{: #design}

The Chinese name gives the game a home in Shenzhen.

Bougainvillea is [Shenzhen's city flower](https://www.sz.gov.cn/ztfw/gysy/wyw_183970/ywzsk_184570/content/post_12660964.html). Its three-part form connects naturally with the game's three cards, while the city's skyline also finds its way into the interface.

The mark is a flat gold card: a gold surface and border, a red flower in the center and small gold stamens. The same image runs through the logo, card backs and wild-card indicator.

{% include royale-figure.html src="/img/blog/3card-royale/identity-en.svg" width="1200" height="400" alt="Three visual elements: a red bougainvillea, a gold card and a green circuit board." caption="Figure 3. The current production flower and card mark, with the green circuit board that supports them." %}

**The flower is the focal point. The green circuit board is the foundation.**

The green surface carries the cards and a little of Shenzhen's hardware character. Light and dark themes are two expressions of that same circuit-board green. Red and gold flowers sit on top of it.

Color also identifies the players. You are the red flower; your rival is gold. That distinction stays consistent across the table, progress track and shared images.

{% include royale-figure.html src="/img/blog/3card-royale/design-system-en.svg" width="560" height="712" diagram=true alt="The same flat gold logo, card back and wild card on light and dark green themes; red identifies you and gold the rival." caption="Figure 4. Production colors and artwork. Both green themes come from the circuit-board idea." %}

There is a circuit-board mode in Settings too. Card zones become chips, traces connect the playing areas, and points of light move with the action. The green foundation takes part in the game.

{% include royale-figure.html src="/img/blog/3card-royale/table-pcb-en.jpg" width="1000" height="900" alt="The same game in circuit-board mode, with chip pins and traces around the playing areas." caption="Figure 5. The same position with Settings → Preferences → Circuit board enabled." %}

The skyline brings the city into the ending. Buildings appear in light linework; flowers can settle into corners of the city while the architecture remains in the background.

The fullest expression is the bloom at the end of a match. After the winner clears their own Ace challenge, the animation starts with the cards they actually played. For a four- or five-card hand, it takes the first three. The cards turn over in motion, gather into a flower, blossom and drift down into the city. As space opens above, the message appears:

> You bloomed.

The animation grows out of the game that just happened. The final play becomes the beginning of the victory image.

{% include royale-figure.html src="/img/blog/3card-royale/finale-en.svg" width="1080" height="1440" alt="The final match poster combines flowers, egrets, the Shenzhen skyline and a rank progression track." caption="Figure 6. A completed match generated with seed 0, rendered by the production sharing component. The winner and progression come from the recorded game." %}

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

{% include royale-figure.html src="/img/blog/3card-royale/attack-defense-en.svg" width="1200" height="496" alt="A flush attack beats a pair for two wounds; three of a kind defends against a flush for two swap opportunities." caption="Figure 8. Attacking advances the game toward its end; defending improves the next position. These examples use ♥2 as the wild card." %}

### Wounds are playable cards

Cards received as wounds are placed face up in the wound area. They still belong to you and can be combined with cards from your hand. A used wound card is replaced in its original slot with a new face-up card, keeping the wound count unchanged.

Being wounded brings you closer to losing, but also gives you new cards to work with. Both players can see them and consider the combinations they make possible. A wound might offer a counterattack that your opponent can also see coming.

{% include royale-figure.html src="/img/blog/3card-royale/wounds-en.svg" width="1200" height="420" alt="The public wound card 8♥ joins 6♠ and 7♣ from the hand to make a straight, then its wound slot is refilled." caption="Figure 9. Playing a wound card does not heal it. K♦ is an example refill; the replacement comes from the deck." %}

### A swap is an opportunity, not an obligation

A successful defense lets you exchange one of your own hand or wound cards with an eligible target: a random card in the rival's hand, a specified public wound, your other card area or the deck. The permitted targets depend on the source area. Swapping changes the cards, not the wound count.

Each opportunity can be skipped independently. With two opportunities, you can use one and skip the other, or keep everything unchanged. Having that choice is itself a benefit of defense.

Refills give the round its rhythm. A round finishes after both players have attacked once. Hands are not refilled between those two encounters. At the end of the round, unused cards are kept and hands refill to eight. The first play therefore needs to leave something for the second encounter.

{% include royale-figure.html src="/img/blog/3card-royale/round-flow-en.svg" width="560" height="1000" diagram=true alt="Attack, defend, resolve; reaching five wounds ends the game. Otherwise switch roles for a second encounter, then refill both hands to eight." caption="Figure 10. One round contains two encounters. A terminal result stops the loop immediately." %}

### Reach Ace, then win once more

A game ends when a player reaches five or more wounds. The winner advances by the full difference between the final wound counts. If the rival finishes with seven wounds and you have two, you advance five ranks. Damage is not capped at five for this calculation.

Advancement stops at Ace, but reaching it is not enough. **You must win an Ace game in which you are the challenger to win the match.** Losing your own Ace challenge three times resets you to level 2; the rival keeps their level.

Each game also has one shared wild card. The first game uses `♥2`; later games use the heart card matching the previous winner's new level. If the winner advances to 7, the next game uses `♥7` for both players. It remains fixed throughout that game.

Private hands, public wounds, a shared wild card and decisions that carry between attack and defense create the game's variety.

[Full rules](https://lucienzhu.github.io/3card-royale/rules.html?lang=en) · [A4 rules card](https://lucienzhu.github.io/3card-royale/docs/shenzhen-flower-rules-a4.en.pdf)

## 4. Reinforcement learning: begin with a small baseline
{: #rl}

Once the rules were playable, I wanted to see how a model would learn the game.

It has hidden information, random deals and connected decisions about attack, defense and resources. Spending a card changes the current comparison, the following defense and the combinations available next round. A reproducible environment lets us run these decisions repeatedly, fix the seeds and compare policies.

The project provides a Gymnasium environment and a shared observation/action interface for training, evaluation and deployment.

The rules core is separate from the interface and strategy. JavaScript, Python, Rust and C++ have independent implementations checked against the same replay sequences. The browser uses JavaScript; Gym and training use the native Python core.

{% include royale-figure.html src="/img/blog/3card-royale/system-architecture-en.svg" width="560" height="884" diagram=true alt="Standard 1.0 has four native cores checked for replay parity. Policies receive only visible observations and legal actions. The browser uses JavaScript and ONNX; experiments use Python, Gymnasium and PyTorch." caption="Figure 11. System boundaries: full state belongs to the host; each policy sees only its player observation." %}

The browser's current **NN AI is a behavior-cloning baseline**. It learns to imitate SDK Code AI's choices. Training through rewards is the next direction to explore from this starting point.

### What the policy observes and how it acts

The policy receives only information available to the acting player: their hand, both public wound areas, discards, the current played cards, and state such as the phase, levels, wild card and card counts. It cannot see the rival's private hand or the deck order.

Each of the six card zones records presence as 0 or 1 in a fixed 52-card order. Add 6 phase bits and 18 position values or flags for a **336-dimensional current observation**. There is no recurrent memory or full-history input.

{% include royale-figure.html src="/img/blog/3card-royale/observation-state-en.svg?v=values1" width="560" height="2434" diagram=true alt="An actual swap observation: six 52-card sets, all six phase bits, and all 18 remaining features with raw values, encoded values and normalization formulas. You are seat 1; the rival is seat 0." caption="Figure 12. Every state feature, using the same saved swap decision. Card zones are multi-hot; the phase is one-hot. The remaining values are normalized numbers or binary flags." %}

In this sample, it is game 1, round 4, and you are seat 1 with two swap chances left. Seat 0/1 levels and Ace-loss counts use fixed seat order; roles and wound counts are relative to you. For example, 29 cards in the deck becomes `29 / 52 ≈ 0.557692`; “your turn to act” becomes `1`. The task is one game, so the full-match flag is `0`. Indices and formulas in the figure follow the [actual encoder](https://github.com/lucienzhu/3card-royale/blob/428df779a6335c5c1d7bf350637646324c6fda8b/sdk/features.js).

Legal actions vary with the cards and phase. The environment generates candidates for the current decision, encoding each with **72 features**. The Gym interface has up to 512 candidate slots; an action mask excludes unused slots.

The policy scores the legal candidates and chooses the highest score. Its two hidden layers have 256 and 128 units, with ReLU activations. Every candidate uses the same network. The 512 slots are a candidate capacity: an action index refers to the current candidate table, which is regenerated at the next decision.

{% include royale-figure.html src="/img/blog/3card-royale/policy-en.svg" width="1100" height="488" alt="A 336-feature observation and a 72-feature candidate action feed a shared MLP with 256 and 128 hidden units and one output score." caption="Figure 13. The deployed policy scores current legal candidates without access to hidden opponent information." %}

### Start with 10,000 games of SDK Code AI self-play

Two SDK Code AI players completed **10,000 individual games**, producing **252,859 decisions**.

The data is split by whole games: 8,000 for training, 1,000 for validation and 1,000 for testing. Decisions from both seats of the same game stay in the same split, avoiding leakage between closely related positions.

Training uses PyTorch. TensorBoard records training and validation loss, action agreement and other metrics. Checkpoint selection uses validation loss.

{% include royale-figure.html src="/img/blog/3card-royale/training-loss.svg" width="708" height="319" alt="Training and validation cross-entropy over ten epochs; validation loss is lowest at epoch five." caption="Figure 14. Ten recorded training epochs. Epoch 5 has the lowest validation loss and supplies the deployed checkpoint. Further reductions in training loss did not improve validation loss." %}

The deployed model has **137,729 parameters** and about **0.55 MB** of ONNX weights. Its agreement with SDK Code AI on the held-out test set is **89.36%**. Agreement measures imitation; winning requires a separate evaluation.

### How well does it play against SDK Code AI?

Five models use the same training dataset. I also evaluate an untrained random policy and Easy AI, which compares up to 64 candidate plays. All seven play SDK Code AI on the same 500 evaluation seeds, with both seats and balanced first attackers: 1,000 individual games per policy, starting at level 2.

{% include royale-figure.html src="/img/blog/3card-royale/win-rates-en.svg?v=sdk-baseline1" width="677" height="425" alt="Against SDK Code AI, Random wins 0.1%, Easy with 64 candidates 36.1%, and the five models 45.0% to 46.5%, including 46.2% for the deployed model." caption="Figure 15. Same opponent and seeds, 1,000 games per policy. The axis spans 0–100%. Small differences among the five models do not establish a strength ranking." %}

| Policy | ONNX size | Latency p95 | Win rate vs SDK Code AI |
| --- | ---: | ---: | ---: |
| Random | — | — | 0.1% |
| Easy · 64 | — | — | 36.1% |
| 64 → 32 | 0.11 MB | 0.3 ms | 45.2% |
| 128 → 64 | 0.24 MB | 1.9 ms | 46.0% |
| **256 → 128** | **0.55 MB** | **1.1 ms** | **46.2%** |
| 256 → 512 | 0.95 MB | 1.8 ms | 46.5% |
| 512 → 256 | 1.37 MB | 2.0 ms | 45.0% |
{: .royale-policy-results }

Random chooses uniformly from legal candidate actions, including swaps and declines. It won **1/1,000 games**, with no truncations or illegal actions; two full runs produced identical records. It has no ONNX model or measured neural inference latency. [Experiment and reproduction](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/training/README.md#uniform-random-baseline) · [Raw results](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/docs/experiments/nn-policy-v1/random-baseline.json).

Easy’s 64 is a limit on candidate plays, not a neural-network width. It has no ONNX file; heuristic latency has not been measured here.

Latency for the neural models: scoring 220 candidates in Chrome on Mac, single-threaded WASM, FP32; 100 runs after 3 warmups. Inference only, excluding download, feature extraction and UI delay. Timings vary with browser/system load; phones are not yet measured. [Raw benchmark](https://github.com/lucienzhu/3card-royale/blob/5f1b0fa79de4cdd1d9500d41cc3d53bc2190ca48/docs/experiments/nn-policy-v1/browser-profile.json).

The highest result, 46.5%, differs from the deployed model by just three wins. That is not enough to conclude it is stronger. This experiment also does not show a consistent relationship between greater model size and higher win rate. Data, objectives and the decision representation matter alongside parameter count.

Balancing size, measured latency and playing results, I chose `256 → 128` for the browser.

After training, the model is exported to ONNX and runs through JavaScript in a browser Worker. The 0.55 MB figure covers weights; the WASM runtime is cached separately. If loading or inference fails, the game falls back to Easy AI with a visible notice so play can continue.

{% include royale-figure.html src="/img/blog/3card-royale/training-pipeline-en.svg" width="560" height="936" diagram=true alt="10,000 SDK Code AI self-play games produce 252,859 decisions, split by whole games into 8,000 training, 1,000 validation and 1,000 test games. PyTorch trains the 256/128 policy, epoch 5 is selected by validation loss, and ONNX runs in a browser Worker." caption="Figure 16. The shipped pipeline uses imitation labels. Reward-based RL remains the next experiment." %}

### Three difficulties to play against

The browser now offers three choices:

| Difficulty | Policy | How it chooses |
| --- | --- | --- |
| Easy | Easy AI | Up to 64 candidate plays; deck redraws |
| Medium | NN AI | The deployed 256 → 128 MLP |
| Hard | Code AI | Original table policy; preserves combinations and evaluates swaps |

Hard uses the original table Code AI. It compares attacking hands, minimizes damage when defending and seeks swap opportunities, while considering useful combinations left in hand. It evaluates swap gains, including blind rival-hand swaps, visible wound swaps and deck redraws. It sees only information available to its seat and does not search future turns.

Easy uses the SDK baseline comparison on a sample of at most **64** plays. Before sampling defenses, it removes immediately losing responses if a safe one exists. Each swap opportunity redraws from the deck. It can recognize a useful hand while missing a stronger combination.

There are two distinct policies: **SDK Code AI** is the frozen training teacher and experimental baseline; **browser Hard Code AI** is the original table policy. NN integration had accidentally routed Hard to the SDK policy; that regression is now fixed. The seven-policy results above retain their original opponent for reproducibility.

Against restored Hard, using the actual browser engine, the same 500 seeds, paired seats and balanced first attackers, each policy plays 1,000 individual games:

| Policy | Win rate vs Hard Code AI |
| --- | ---: |
| Easy · 64 | **31.5%** (315 / 1,000) |
| NN · 256 → 128 | **41.2%** (412 / 1,000) |
| SDK Code AI baseline | **45.3%** (453 / 1,000) |

An additional NN/SDK control reproduces every earlier outcome: 462 wins (46.2%). All 4,000 games complete without illegal actions. [Browser-policy evaluation records](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/docs/experiments/difficulty-v1/table-code-evaluation.json).

Easy still wins **44.1%** against NN; its historical 36.1% against SDK Code is unchanged. The earlier 48-candidate version won 39.0% and 30.4%, respectively, on the same seeds. We chose 64 after this comparison, so these seeds are not an untouched test of that choice. The labels do not measure human difficulty.

[Policy and reproduction](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/docs/DIFFICULTY.md) · [SDK baseline results](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/docs/experiments/difficulty-v1/evaluation.json) · [48-candidate archive](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/docs/experiments/difficulty-v1/evaluation-48.json)

### Next, let rewards guide learning

This baseline connects the environment, data generation, training, evaluation and browser deployment. It provides a concrete point of comparison.

A next step is to initialize from these behavior-cloning weights and continue learning from win/loss rewards. The environment distinguishes individual-game and full-match tasks: the former ends after one game, while the latter continues through the Ace challenge. The deployed model was trained for the individual-game setting; a reward-driven RL trainer has not yet been implemented.

Those objectives may favor different choices. Can a defense improve the next position? Is it worth taking a risk for a larger final wound difference? How should resource allocation change against different opponents? These are questions for further experiments.

Reproducibility is part of the baseline. The compressed training dataset is about 112.5 MB, so the repository stores fixed seeds, generation instructions, dependencies, checksums and reports, then regenerates the data through SDK Code AI self-play. The best ONNX model is version-controlled for the browser. In the recorded environment, both the dataset and deployed model have been reproduced byte for byte.

[RL overview and checkpoint](https://lucienzhu.github.io/3card-royale/rl.html?lang=en) · [Experiment reports](https://github.com/lucienzhu/3card-royale/tree/v1.0.0/docs/experiments/nn-policy-v1) · [Training and reproduction](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/training/README.md)

## 5. Try it: open the page and play a few games
{: #play}

The rules work for two people with a physical deck. The current browser playtest is human versus AI, free and available on mobile and desktop without registration.

New players start on **Easy AI**. Change the difficulty or try the neural policy here:

> Settings → Preferences → Difficulty → Easy / Medium · NN AI / Hard

For a first game, follow the tutorial and watch where cards come from and where they go after use. Then start including public wound cards in combinations. As the rules become familiar, allocating cards between attack and defense becomes the more interesting problem.

After a game, there are three ways to look back: **Game recap** shows every encounter in order; **Final hand** shows the last play and final wound difference; **Best play** picks out the largest hit or strongest hand. Choose the moment you like and share its PNG.

{% include royale-figure.html src="/img/blog/3card-royale/share-recap-preview-en.svg" width="1080" height="1440" alt="Game recap" caption="Figure 17. Game recap. Seed 19, 13 encounters. The preview shows the top of the recap; open it for the complete sequence." full="/img/blog/3card-royale/share-recap-en.svg" %}

{% include royale-figure.html src="/img/blog/3card-royale/share-finish-en.svg" width="1080" height="1440" alt="Final hand" caption="Figure 18. Final hand. Seed 19, 13 encounters. " full="/img/blog/3card-royale/share-finish-en.svg" %}

{% include royale-figure.html src="/img/blog/3card-royale/share-highlight-en.svg" width="1080" height="1440" alt="Best play" caption="Figure 19. Best play. Seed 19, 13 encounters. " full="/img/blog/3card-royale/share-highlight-en.svg" %}

The source, rules, design system, environment and model materials are open. Come and play, or try your own policy, model or rule idea.

I hope this becomes a game that two people can begin at any time, learn something about each other's decisions over a few games, and finish with a particular hand still in mind.

**One deck. Two players. Three cards. Make them bloom.**

[Play](https://lucienzhu.github.io/3card-royale/?lang=en) · [RL and policy baseline](https://lucienzhu.github.io/3card-royale/rl.html?lang=en) · [GitHub](https://github.com/lucienzhu/3card-royale)
