---
layout: "royale-article"
title: "3Card Royale: One Deck, Two Players, Three Cards in Bloom"
date: "2026-10-24 00:00:00 +0800"
author: "Xiaolong Zhu"
show_url: true
tags: ["blog"]
lang: "en"
summary: "A two-player game for an ordinary deck: quick tactical encounters, a race to Ace, and an open arena for new opponents."
permalink: "/updates/2026/10/3card-royale/"
alternate_url: "/zh/updates/2026/10/3card-royale/"
article_url: "https://lucienzhu.github.io/updates/2026/10/3card-royale/"
article_image: "/img/blog/3card-royale/cover-en.png"
extra_css: ["/css/royale-article.css", "/css/royale-experiments.css", "/css/royale-native.css"]
extra_js_bottom: ["/js/royale-article/actions.js", "/js/royale-article/experiments.js", "/js/royale-article/native.js"]
update_id: "3card-royale"
release_tag: "v1.2.0"
last_modified_at: "2026-11-08 00:00:00 +0800"
---

{% include royale-native.html kind="cover" src="/img/blog/3card-royale/cover-en.svg" caption="One deck. Two players. Three cards. Make them bloom." %}

I wanted a game that two people could reach for during a break: one ordinary deck, a quick start, and enough decisions to make the next game worth playing.

**3Card Royale**, also called **Shenzhen Flower Cards** (深圳花牌), grew out of that idea. Each short game turns on attack and defense. Across a match, both players climb from 2 to Ace. A single good hand can win an encounter; reaching the finish takes several games.

## 1. A short game, a longer goal
{: #origin}

An ordinary deck gives us a shared vocabulary: pairs, straights, flushes. The interesting part is deciding **when to spend them**.

Suppose I have a strong flush. Playing it now might hurt my opponent, but those cards will be gone when I need to defend. My opponent sees the attack before responding. They can beat it, or accept some damage to keep a better combination for their own attack. Both players attack once before their hands refill, so each choice carries into the next encounter.

{% include royale-figure.html src="/img/blog/3card-royale/table-light-en.jpg" width="1000" height="900" alt="The rival has played a flush. Your hand is below, with the defense still to choose." caption="Figure 1. A flush is on the table. Spend cards to beat it, or save them for your attack?" %}

<details class="royale-depth" markdown="1">
<summary>The card zones</summary>

{% include royale-native.html kind="card-zones" src="/img/blog/3card-royale/card-zones-en.svg?v=boxes1" caption="Figure 2. Hands are private; wounds are public and playable. A separate example position." %}

</details>

At five wounds, the game ends. The winner moves up the rank track, and the next game begins with fresh hands. That gives a short game its own payoff without ending the contest. **The match has a destination: reach Ace, then win your own Ace challenge.**

[Hanafuda](https://en.wikipedia.org/wiki/Hanafuda), [Zha Jin Hua](https://baike.sogou.com/m/v7421269.htm "Sogou Baike · Chinese"), [Guandan](https://en.wikipedia.org/wiki/Guandan) and [Balatro](https://en.wikipedia.org/wiki/Balatro) were inspirations: flowers as an identity, three-card combinations, ranks and wild cards, and the pleasure of finding new uses for familiar hands. Here, those ideas serve a duel between two people.

[Try a game →](https://lucienzhu.github.io/3card-royale/?lang=en)

## 2. A flower from Shenzhen
{: #design}

Bougainvillea grows across Shenzhen and is the [city's official flower](https://www.sz.gov.cn/ztfw/gysy/wyw_183970/ywzsk_184570/content/post_12660964.html). Its three coloured bracts suggested a natural companion for a game built around three cards.

Under the flower sits **circuit-board green**. Shenzhen is a city of hardware and fast iteration; I wanted the game to carry that character, with room to slow down and play with a friend.

{% include royale-native.html kind="identity" src="/img/blog/3card-royale/identity-en.svg" caption="Figure 3. Bougainvillea, a gold card and circuit-board green." %}

The gold card, red flower and gold centers form the mark. On the table, red identifies you and gold identifies your rival. Those roles stay the same in both light and dark themes.

{% include royale-native.html kind="design-system" src="/img/blog/3card-royale/design-system-en.svg" caption="Figure 4. Day and night. You remain red; your rival remains gold." %}

<details class="royale-depth" markdown="1">
<summary>A circuit board you can play on</summary>

Circuit-board mode in Settings gives the playing areas chip pins and connects them with animated traces.

{% include royale-figure.html src="/img/blog/3card-royale/table-pcb-en.jpg" width="1000" height="900" alt="The same game in circuit-board mode, with chip pins and traces around the playing areas." caption="Figure 5. Circuit-board mode on the same table." %}

</details>

The city returns at the end of a match. The winning cards turn over, gather into a flower, bloom, then scatter towards the skyline. Above them appears **“You bloomed.”** The celebration begins with the hand that earned it.

{% include royale-native.html kind="finale" src="/img/blog/3card-royale/finale-en.svg" caption="Figure 6. The match ends in bloom. Recorded result: 11 games, 7 : 4, 58 rounds." %}

A single-game victory gets a quieter ending. The full bloom belongs to the journey through Ace.

## 3. Attack for wounds. Defend for swaps.
{: #rules}

Start with a standard **52-card deck, no jokers**. Each player has **eight cards** and begins at level 2. The attacker reveals a play; the defender sees it before choosing a response.

Most plays use three cards. Four or five cards are allowed only for four or five of a kind. The two players do not need to play the same number of cards. Each game designates one heart as the **wild card**, which can stand for any rank and suit.

{% include royale-hands.html %}

Compare hand type first, then ranks within that type. Suits do not break ties. Five of a kind uses all four natural cards of a rank plus the wild card.

A flush scores 3; a pair scores 1. If the attacker wins that comparison, the defender takes **3 − 1 = 2 wounds**. If the defender beats a flush with three of a kind, they earn **5 − 3 = 2 swap opportunities**. A win within the same hand type gives one wound or swap; an exact tie gives neither.

{% include royale-experiment.html kind="combat" src="/img/blog/3card-royale/attack-defense-en.svg" width="1200" height="496" alt="A flush attack beats a pair for two wounds; three of a kind defends against a flush for two swap opportunities." caption="Figure 8. The score gap becomes wounds when attacking, or swaps when defending." %}

### A wound can become an answer

Wounds are cards placed face up in front of you. You can play them together with your hand. Each used wound is replaced from the deck, so **playing it does not reduce your wound count**.

This makes damage a visible resource as well as a threat. A new wound might complete a strong hand—but your opponent can see that possibility too.

{% include royale-native.html kind="wounds" src="/img/blog/3card-royale/wounds-en.svg" caption="Figure 9. The wound helps make a straight, then its slot refills. The wound count stays at one; K♦ is an example draw." %}

### Defense changes the next encounter

Each swap opportunity exchanges one of your cards with an eligible target: the deck, a random rival hand card, a public wound card, or your other card area. The source area determines which targets are allowed. Wound counts stay unchanged, and **each opportunity can be skipped**.

A round contains two encounters, with each player attacking once. There is no hand refill between them. At the round's end, keep unused cards and refill to eight. Winning the first encounter can leave you poorly equipped for the second.

{% include royale-native.html kind="round-flow" src="/img/blog/3card-royale/round-flow-en.svg" caption="Figure 10. Each player attacks once before hands refill. Either encounter can end the game." %}

### From one game to a match

A player loses the game at five or more wounds. The winner advances by the **full difference in wound counts**: seven against two means five ranks. Advancement stops at Ace.

Reaching Ace opens the final challenge. Win a game in which you are the Ace challenger to win the match. Fail your own Ace challenge three times and you return to level 2; your opponent keeps their level.

The shared wild card follows that journey. It is `♥2` in the first game, then the heart matching the previous winner's new level. After a win that takes someone to 7, both players use `♥7` as the wild card for the next game.

[Full rules](https://lucienzhu.github.io/3card-royale/rules.html?lang=en) · [A4 rules card](https://lucienzhu.github.io/3card-royale/docs/shenzhen-flower-rules-a4.en.pdf)

## 4. Policy experiments: which decisions win more games?
{: #rl}

Designing the game raised another question: **what kinds of decisions actually win?** I built a reproducible environment so I could hold the deals fixed, change the policy, and compare outcomes. It also lets other people test ideas without building a game engine first.

These experiments measure policy performance. They do not, by themselves, establish that the rules are balanced or that people will enjoy them. They can expose weak strategies and suggest questions to take back to human playtests.

GameCore runs the rules; a policy chooses moves. Ordinary policies see their own hand and public information, never the rival's hidden cards or deck order.

{% include royale-native.html kind="system-architecture" src="/img/blog/3card-royale/system-architecture-en.svg" caption="Figure 11. A policy chooses from its own information; GameCore validates the move." %}

### Two approaches to the same decision

A **whole-move scorer** compares all legal plays and chooses the highest-scoring one. An **autoregressive policy** builds a move token by token: choose an operation, then cards or a swap target. Both return the same complete action to the engine.

I trained models of both kinds to imitate a frozen rule-based teacher, **SDK Code AI**. These are behavior-cloning baselines, not models trained from game rewards. The environment supports reinforcement learning as a next step.

<details class="royale-depth" markdown="1">
<summary>Inside a decision: observation, action and networks</summary>

The observation has **336 values**: six card zones × 52 presence bits, six phase bits and 18 position values. It contains the player's hand, both public wound areas, discards and both currently played hands. Neither neural model receives a history sequence.

{% include royale-experiment.html kind="observation" src="/img/blog/3card-royale/observation-state-en.svg" width="560" height="2434" diagram=true alt="A saved swap observation: all six 52-card zones, six phase bits, and 18 metadata values, with their raw values and normalization." caption="Figure 12. One saved position, 336 values. Card zones are multi-hot; phase is one-hot. The deck count is 29 / 52." %}

Card IDs stay fixed: ♠, ♥, ♣, ♦, each ordered 2 through Ace. IDs 0–51 identify physical cards; 52–54 mean `PLAY_3`, `PLAY_4`, `PLAY_5`; 55–64 cover swaps, destinations and progression. `PAD = 65` fills unused positions.

For three Aces, the action is `PLAY_3 → A♠ → A♥ → A♣`. Ascending card IDs give the play one representation regardless of click order. Cards cannot repeat; four- and five-card plays must form valid bombs. A swap specifies its source and destination, including the target card when it is visible.

The **65-bit mask** marks which next tokens can complete a legal move. The mask changes as cards are selected; the meaning of each token stays fixed. Gym accepts a completed move as six padded tokens, `MultiDiscrete([66] × 6)`, and executes it once.

{% include royale-experiment.html kind="action" src="/img/blog/3card-royale/structured-actions-en.svg" width="1000" height="650" alt="Fixed token IDs form a three-card play or swap. A conditional mask filters each continuation before the complete move is submitted." caption="Figure 13. Fixed card IDs and operations encode a complete move. The mask restricts the next choice." %}

| Policy | Network | Parameters | ONNX |
| --- | --- | ---: | ---: |
| Whole-move scoring | 408 → 256 → 128 → 1 | 137,729 | 0.55 MB |
| Autoregressive | 732 → 256 → 128 → 65 | 228,929 | 0.92 MB |

The scorer takes a 336-value state and a 72-value move descriptor, with handcrafted hand features. The generator takes the same state and a 396-value prefix encoding, making up to six inference calls per move. Different inputs and decoding procedures mean this is not an isolated test of architecture.

The browser and self-play collector use the JavaScript core; Gymnasium uses a native Python core. JavaScript, Python, Rust and C++ implementations are checked against shared replay sequences.

[Action contract and Gym usage](https://github.com/lucienzhu/3card-royale/blob/unify-action-space/docs/ACTIONS.md)

</details>

<details class="royale-depth" markdown="1">
<summary>Training recipes and validation</summary>

Each model's recipe generates **10,000 SDK self-play games**, split by whole game into **8,000 training / 1,000 validation / 1,000 test**. The scorer has 252,859 decisions; the autoregressive dataset has 252,906 decisions and 988,571 target tokens. The recipes use separate seeds.

PyTorch trains both models. The scorer uses cross-entropy over legal complete moves; the generator uses masked, teacher-forced token cross-entropy, with equal weight per complete decision. TensorBoard records the curves. Validation loss selects epoch **5** for the scorer and **16** for the generator.

{% include royale-native.html kind="structured-training" src="/img/blog/3card-royale/structured-training-en.svg" caption="Figure 14. Autoregressive loss: training keeps improving while validation is best at epoch 16." %}

Test accuracy is **89.36% for the scorer's complete move** and **90.44% for the generator's teacher-forced token**. These metrics cannot be compared directly: predicting a token under a supplied prefix is a different task from producing a whole move independently. The generator's teacher supplies no positive `SKIP` or `STOP` examples.

{% include royale-native.html kind="training-pipeline" src="/img/blog/3card-royale/training-pipeline-en.svg" caption="Figure 15. Separate self-play datasets; splits by whole game; checkpoints selected by validation loss." %}

The repository includes deterministic data-generation recipes, hashes, checkpoints, training curves and runtime versions. Evaluate newly trained weights under a separate policy ID to keep their results distinct from the supplied baselines.

[Scoring recipe](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/training) · [Autoregressive recipe](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/training/structured)

</details>

### What the experiments show

Against the browser's Hard opponent, the 256 → 128 scorer wins **42.6%** of games; the autoregressive model wins **23.9%**. Each result uses 1,000 games with the same 500 seeds, swapped seats, balanced first attackers and level-2 starts.

{% include royale-experiment.html kind="evaluation" src="/img/blog/3card-royale/win-rates-en.svg" width="864" height="576" alt="Win rates for public-information policies against browser Code AI and SDK Code AI, on the same 500 paired seeds." caption="Figure 16. Win rates on the same deals. Each bar represents 1,000 games; the axis spans 0–100%." %}

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

Whole-move scoring performs better here. This compares these training recipes, not the limits of autoregressive policies. The effects of inputs, supervision and decoding need separate tests. Small differences among scorer widths do not establish a strength ranking.

<details class="royale-depth" markdown="1">
<summary>Evaluation conditions and complete records</summary>

**Code AI** is the browser's Hard policy; **SDK Code AI** is the frozen training teacher. Every reported matchup uses 1,000 individual games. All **19,000 games** in the baseline report completed without illegal actions or truncation. **Godlike** sees the rival's hand and is excluded from the public-information ladder.

Latency is the highest opponent-batch p95 for a complete decision on **Apple M1 / Node 22 / single-thread WASM**. It includes encoding and all inference calls, excluding initial loading and inter-thread messaging. It is not a mobile benchmark. ONNX sizes cover model weights.

In a direct matchup, the autoregressive model wins **28.8%** against the 256 → 128 scorer. The additional neural report also covers Easy, Random and the registered NN512 scorer. Its 11,000 games overlap the baseline report by 4,000: the two reports contain **26,000 distinct games**.

[Baseline report and reproduction](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/docs/experiments/complete-baseline) · [Additional neural matchups](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/docs/experiments/neural-baselines)

</details>

The next question is whether learning several good alternatives—or optimizing wins rather than agreement with a teacher—produces better decisions. Gym supports individual games and full matches through Ace; the current training recipes use individual games.

## 5. An open table for new opponents
{: #arena}

A few well-chosen rules can make a policy; a neural network is optional. **Arena** gives both a place to compete. Submit an opponent, have it evaluated, then let people play against the same strategy in their browser.

### From a PR to the ladder

Put the strategy and its manifest in a policy folder, add your GitHub handle, and run local validation. Submit a PR with the generated receipt. CI checks that it can play legally; at publication, evaluation assigns a provisional reference Elo and updates the ladder.

{% include royale-native.html kind="arena-flow" src="/img/blog/3card-royale/arena-flow-en.svg" caption="Figure 17. Validate a submission, rate it at publication, then make it playable. Publication also repeats validation." %}

<details class="royale-depth" markdown="1">
<summary>Submission format and rating method</summary>

A submission lives in `policies/entries/your-policy-v1/`, with a manifest, source or weights, README and `validation.json`. Add it to the registry. Each revision gets a new immutable ID, so its score identifies the evaluated files.

| Format | Interface |
| --- | --- |
| JavaScript | `createPolicy → act(observation) → complete semantic action` |
| ONNX · `scoring-v2` | `state [B,336] + candidates [B,N,72] → scores [B,N]` |
| ONNX · `structured-v2` | `state [B,336] + prefix [B,396] → scores [B,65]` |

All declare `royale-policy-v2` and `actions-v2`. JS policies may remember public observations within a game; the current ONNX contract has no recurrent state. A strategy written in another language must be ported to JS or exported to a supported ONNX profile, then checked against saved observations. Artifacts are limited to 5 MB. GitHub Pages serves reviewed registry entries, and a browser Worker runs them locally.

Run `npm run arena:validate`, then `npm run arena:submit -- --policy your-policy-v1`. The submission check plays four games against Code AI, covering both seats and first movers. PR CI repeats the check. A merged entry is **Unrated** until a GitHub Release or **Publish Arena** run scores it, commits the results and rebuilds Pages.

Each new policy plays **20 games against each of three fixed references**: Easy (1387), NN 256 (1440) and Code AI (1500). Paired seats and balanced first movers give 60 rated individual games. Including validation, that is **64 games per pending policy**, independent of ladder size; unchanged results are reused.

The evaluator fits one rating to the outcomes using the Elo win-probability curve and a declared prior. There is no K-factor update or game-order effect. With only 60 games, ratings are provisional; small gaps are not evidence of strength. The fixed panel and public seeds can also be overfit. These ratings are separate from the 1,000-game baseline results.

[Policy format and templates](https://github.com/lucienzhu/3card-royale/tree/main/policies) · [Submission guide](https://github.com/lucienzhu/3card-royale/blob/main/policies/README.md) · [Rating calculation](https://github.com/lucienzhu/3card-royale/blob/main/arena/README.md)

</details>

### Pick an AI. Play a game.
{: #ladder}

The ladder is also an opponent list. Choose **Play** to challenge a policy directly in the browser. Your games do not change its rating.

{% include royale-ladder.html %}

## 6. Bring a deck—or open the page
{: #play}

For two people, an ordinary deck and the [A4 rules card](https://lucienzhu.github.io/3card-royale/docs/shenzhen-flower-rules-a4.en.pdf) are enough. For a quick solo game, the browser version has AI opponents, works on mobile and desktop, and needs no account.

A short first-visit practice takes you through an attack and a defense. The first real game introduces wound cards and swapping as they arise. Start on Easy, then choose another opponent in Settings; **Arena AI** opens the submitted policies. On mobile, swipe across cards to select a hand.

After a game, keep the moment that mattered: the full recap, the final hand, or the biggest hit. Each can be shared as a PNG.

{% include royale-native.html kind="sharing" src="sharing.svg" caption="Figures 18–20. Three views of the same game: the full recap, final hand and biggest hit. Seed 19, game 1." %}

Try a few games with someone. I would love to hear which hand made you want a rematch—and which decision never felt worth taking. Both are useful feedback for the next iteration.

**One deck. Two players. Three cards. Make them bloom.**

[Play →](https://lucienzhu.github.io/3card-royale/?lang=en) · [AI Arena](https://lucienzhu.github.io/3card-royale/arena.html?lang=en) · [Source and rules](https://github.com/lucienzhu/3card-royale)
