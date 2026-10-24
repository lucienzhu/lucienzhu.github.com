---
layout: post
title: "Lux: How Collective Strategies Emerge"
date: "2022-12-31 00:00:00 +0800"
date_precision: year
date_label: "2022"
date_label_short: "2022"
author: Xiaolong Zhu
show_url: true
tags: [blog]
update_id: collective-intelligence-in-lux
summary: "How a shared policy learned resource preservation, territorial control and coordinated formations through self-play."
permalink: /updates/2022/collective-intelligence-in-lux/
last_modified_at: "2026-10-24 00:00:00 +0800"
---

A line of units divides the map. One runs out of fuel; another fills the gap. Elsewhere, workers leave regenerating wood unharvested until it is needed. Neither behavior was a rule we wrote for them.

These were observations from our Lux research, [Emergent collective intelligence from massive-agent cooperation and competition](https://arxiv.org/abs/2301.01609), which I co-authored. The work appeared at the NeurIPS 2022 Deep RL Workshop, with a preprint released in January 2023. It investigates how training toward a shared outcome can produce useful structures across many units.

## A world that makes cooperation matter

[Lux AI 2021](https://www.kaggle.com/competitions/lux-ai-2021/overview) is a turn-based game in which two teams collect resources, build cities and survive the night. A city needs fuel. Expanding too quickly can create a large settlement that disappears when darkness arrives.

The number of units and city tiles changes throughout a game. Building a city makes more units possible; losing fuel can remove many pieces at once. Decisions about gathering, movement, research and construction therefore affect both the present team and the team that will exist later.

Those relationships make the game interesting for collective intelligence. A worker's useful action depends on where other workers are going, which resources the team can use and whether its cities will survive.

## One map, many actions

We used a centralized policy that observes the map and outputs actions across its cells. The representation resembles an image: channels describe resources, units, cities and other state. The network produces actions for the pieces occupying each cell.

This follows the pixel-to-pixel approach discussed in [Toad Brigade's competition solution](https://www.kaggle.com/competitions/lux-ai-2021/discussion/294993) and [Grid-Wise Control](https://proceedings.mlr.press/v97/han19a.html). It lets one policy work with a changing population of pieces.

The policy was trained through self-play using [PPO](https://arxiv.org/abs/1707.06347) and [generalized advantage estimation](https://arxiv.org/abs/1506.02438). Our distributed training framework ran environments, collected trajectories and updated the policy in a continuing loop.

{% include article-image.html src="/img/blog/lux-collective-intelligence/training-framework.png" alt="Distributed training loop with runners, policy storage, sample storage and learners" width="7600" height="4989" size="medium" caption="The distributed training loop: environment runners collect trajectories for policy updates." %}

Centralized control matters to the interpretation: the units share a team policy. We did not give them a hand-written instruction to form a wall or protect a particular forest.

## A curriculum for learning to win

Training began with dense rewards for useful basic behavior. That helped agents acquire skills such as gathering resources and constructing cities.

We then shifted the learning signal toward the result of the game. An intermediate phase used the final difference in city tiles to make progress easier to learn from. The final phase used the win or loss itself.

We observed several behavioral stages along the way. These were patterns in the training runs, rather than a fixed sequence every agent must follow.

**Basic skills.** Early policies learned to collect, build, transfer fuel and research. They could perform useful actions while still making costly decisions about the team as a whole.

**Sustainable expansion.** Later policies balanced construction and fuel more effectively. In one self-play game, both sides filled almost their entire half of the map.

{% include article-image.html src="/img/blog/lux-collective-intelligence/peaceful-expansion.jpg" alt="A Lux self-play game with the two teams occupying most of their respective halves of the map" width="1920" height="929" caption="A self-play example from the sustainable-expansion stage." %}

**Competition for space.** As training continued, the agents became more assertive about key resources, routes and the opponent's ability to expand.

**Coordinated strategies.** We began seeing formations that were useful at team scale, including diagonal blockades and units taking over positions when others disappeared.

## Three behaviors worth watching

The first was how the agents used cities and units to control space. Early construction was often scattered. Later, connected rows and blocks appeared, followed by layouts that could constrain an opponent's movement.

In one recurring pattern, units stood along a diagonal line that divided the opponent's territory. When a unit ran out of fuel, another could fill the gap. The line was maintained through a sequence of actions.

{% include article-image.html src="/img/blog/lux-collective-intelligence/diagonal-blockade.png" alt="Blue units arranged diagonally across a Lux map to restrict the opposing team" width="1898" height="907" caption="A diagonal blockade observed during training." %}

The second behavior involved trees. Early policies harvested available wood quickly. Later games showed agents preserving regenerating wood inside protected areas, contesting forests in the middle of the map and harvesting reserved resources near the end.

The third was the relationship between growth and survival. At first, building more cities often led to a fuel shortage. With further training, a similar early expansion could support more workers and faster research, helping the team reach resources that sustained later growth.

An action that looked wasteful in an early policy could become useful once the surrounding behavior improved. That was a useful reminder to examine the whole strategy when interpreting a decision.

<figure class="article-figure">
  <video controls preload="none" playsinline width="560" height="315" aria-label="Lux research replay against the Toad Brigade baseline">
    <source src="/video/blog/lux-collective-intelligence/stage-four-vs-baseline.mp4" type="video/mp4">
    <a href="/video/blog/lux-collective-intelligence/stage-four-vs-baseline.mp4">Watch the replay</a>.
  </video>
  <figcaption>Example replay: our policy in yellow, the Toad Brigade baseline in blue.</figcaption>
</figure>

## Interpret behavior at the scale of the team

These observations describe behavior in a particular game and training setup. They do not by themselves tell us which internal representations the network learned. Quantitative evaluation and ablations belong alongside the examples; they are available in the paper and [research code](https://github.com/hanmochen/lux-open).

A forest left standing may support future fuel needs; a unit standing still may maintain a blockade. The value of either action depends on the rest of the team and on what happens later. Evaluating each worker in isolation would miss that structure.

This suggests a practical lesson for analyzing learned strategies: inspect how actions support one another over time. Replays reveal candidate explanations; controlled comparisons are needed to establish which behaviors contribute to success.

## References and materials

- [Research paper](https://arxiv.org/abs/2301.01609) · [NeurIPS 2022 workshop paper](https://openreview.net/pdf?id=KCWm-HV0PQT) · [Code](https://github.com/hanmochen/lux-open).
- [Lux AI 2021 competition](https://www.kaggle.com/competitions/lux-ai-2021/overview) · [Environment and rules](https://github.com/Lux-AI-Challenge/Lux-Design-2021) · [Toad Brigade solution](https://www.kaggle.com/competitions/lux-ai-2021/discussion/294993).
- [Grid-Wise Control for Multi-Agent Reinforcement Learning in Video Game AI](https://proceedings.mlr.press/v97/han19a.html), ICML 2019.
- [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347), 2017.
- [High-Dimensional Continuous Control Using Generalized Advantage Estimation](https://arxiv.org/abs/1506.02438), ICLR 2016.
- [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385), CVPR 2016; the original network uses a ResNet-style backbone.
