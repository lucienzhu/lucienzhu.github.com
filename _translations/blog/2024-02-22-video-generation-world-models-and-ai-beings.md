---
title: "Sora 来了，AI Being 还远吗？"
date: "2024-02-22 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
tags: [blog]
update_id: video-generation-world-models-and-ai-beings
summary: "从生成一个可信的未来，到选择下一步动作：以游戏 AI 的视角，思考世界模型的价值。"
original_url: /updates/2024/02/video-generation-world-models-and-ai-beings/
permalink: /zh/updates/2024/02/video-generation-world-models-and-ai-beings/
---

*整理自署于 2024 年 2 月的原文，2026 年 10 月编辑并校订技术表述。文中的产品想象，保留原文视角。*

2024 年 2 月 Sora 出现时，最吸引我的，是技术报告的标题：[Video generation models as world simulators](https://openai.com/index/video-generation-models-as-world-simulators/)，视频生成模型作为世界模拟器。

作为一个做游戏 AI 的人，我看到这个标题，想到的是智能体：一个能够生成接下来会发生什么的模型，能不能帮助 AI 决定现在应该做什么？

## 智能体为什么需要预测接下来会发生什么

下棋时，我可以凭熟悉的模式选择一步，也可以向后多想几步：这颗棋子这样走，对手可能怎样回应？后一种过程，依赖于对游戏运转方式的理解。

规则明确的游戏，给了我们方便的模拟器。真实环境则更难：观察不完整，动态变化不确定，也没有那么多可以安全试错的机会。

学到的世界模型，提供了从经验中预测有用后果的一种方式。预测可以是接下来的观察、奖励，或者有助于选择动作的紧凑内部状态。

我感兴趣的问题，是这些预测怎样帮助智能体作出更好的决定。

## 生成视频，与支持决策

Sora 的报告探索了通过视频生成走向更广泛模拟的可能性，也记录了物理交互和一致性方面的局限。这两部分放在一起很有意义：画面是否可信，与动作后果是否可靠，需要分别评估。

面对一个智能体，我会想问得更具体：能不能以它可能采取的动作作为条件？重要对象与任务状态，能否跨时间保持？能不能比较几种动作，并发现自己的预测什么时候不再可靠？

比如，一个角色需要选择过桥，还是绕远路。要让生成的未来帮助规划，模型就需要保留那些决定哪条路线更好的后果。

## 游戏，让这个联系更具体

David Ha 与 Jürgen Schmidhuber 的 [World Models](https://worldmodels.github.io/)，探索了学习紧凑的环境模型，并在生成的“梦境”环境中训练控制器。[MuZero](https://arxiv.org/abs/1911.08265)则将学到的动态模型与搜索结合，预测与规划有关的量，无需重建每一个像素。

这些工作，让一个设计选择变得清楚：智能体究竟需要模型预测什么？

导航任务，可能关心能否到达目的地；团队游戏，则可能需要考虑队友和共享资源会发生什么。更丰富的视觉细节，在它影响任务时，才有相应的价值。

这也接上了我早期的 [Neural Function 笔记](/zh/updates/2021/10/neural-function/)：如果目标描述的是一种期望状态，系统能否进一步推演，怎样到达那里？

## 从生成器，到 AI Being

原文中，我用 AI Being 想象一种能够感知、行动、交流，并在交互中学习的系统。这是一个产品层面的比喻：智能体在环境里拥有持续的角色。

它可以有许多我感兴趣的形态：游戏同伴、生活在持续世界中的角色，或者与人一起工作的机器人。难点在于，把有用的感知与预测，连接到动作、反馈，以及人们能够理解的体验上。

{% include article-image.html src="/img/blog/ai-beings/concept.png" alt="研究者望向太空中想象的硅基 AI 生命的概念插画" width="1792" height="1024" caption="原文中的概念插画，想象未来 AI Being 的一种形态。" %}

这也是生成模型的长期可能性让我兴奋的原因。它们可以成为系统中的组件，让 AI 与人一起做有趣的事情，并对周围世界作出响应。

对我来说，接下来更实际的问题是：我们想让这样的智能体做什么，又怎样知道它正在变得更好？

## 保留自原笔记的延伸阅读

- [Game Emulation via Neural Network](https://madebyoll.in/posts/game_emulation_via_dnn/)，一个可交互的 Pokémon 世界实验。
- [Runway：Introducing General World Models](https://research.runwayml.com/introducing-general-world-models)。
- [World Models](https://worldmodels.github.io/) · [Sora 最初的技术报告](https://openai.com/index/video-generation-models-as-world-simulators/)。
