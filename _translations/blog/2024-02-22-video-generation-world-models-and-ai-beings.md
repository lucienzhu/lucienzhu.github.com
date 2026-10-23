---
title: "Sora 来了，AI Being 还远吗？"
date: "2024-02-22 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
tags: [blog]
update_id: video-generation-world-models-and-ai-beings
summary: "视频生成模型需要保留哪些信息，才能让预测帮助智能体规划与行动。"
original_url: /updates/2024/02/video-generation-world-models-and-ai-beings/
permalink: /zh/updates/2024/02/video-generation-world-models-and-ai-beings/
last_modified_at: "2026-10-24 00:00:00 +0800"
---

一个角色走到受损的桥前。过桥更快，绕路可能更安全。如果模型能够预测接下来会发生什么，就有机会帮助它选择，前提是预测保留了不同动作的实际后果。

这也是 Sora 在 2024 年 2 月发布的报告[《Video generation models as world simulators》](https://openai.com/index/video-generation-models-as-world-simulators/)与游戏 AI 之间的联系。生成可信的后续画面，已经是一项出色能力；利用它选择动作，又提出了另一组要求。

## 预测对任务有用的后果

规则明确的游戏，提供了方便的模拟器。智能体可以比较落子，检查后果。真实环境里，观察不完整，动态变化不确定，试错还可能付出很高代价。

学到的世界模型，提供了从经验中预测的方式。预测对象可以是未来观察、奖励，或者有助于选择动作的紧凑内部状态。

对于过桥任务，规划模型需要保留：角色能否通过、过桥有什么代价，以及绕路怎样影响任务。视觉细节承载了与这些后果有关的信息时，才对决策产生相应价值。

## 让预测与动作连接

Sora 的报告探索了通过视频生成实现更广泛模拟的可能，也记录了物理交互与一致性方面的局限。对智能体来说，小误差也可能改变哪个动作更好。

其中三个要求尤其重要：预测能否响应智能体可能采取的动作，关键对象与任务状态能否跨时间保持，以及系统能否在比较未来时判断预测的不确定性。

桥在帧间变形，会影响视频质量；桥的预测承载能力任意变化，则会使计划失效。评估需要检查那些真正决定动作选择的特征。

## 世界模型可以有不同形式

David Ha 与 Jürgen Schmidhuber 的 [World Models](https://worldmodels.github.io/)，探索了紧凑的环境模型，以及在生成的“梦境”环境中训练控制器。[MuZero](https://arxiv.org/abs/1911.08265)将学到的动态模型与搜索结合，预测对规划有用的量，无需重建每一个像素。

这些工作展示了一个核心设计选择：模型需要为具体任务预测什么？导航智能体可能关心可达性与移动代价，团队游戏还可能需要队友和共享资源的后续变化。

[Neural Function](/zh/updates/2021/10/neural-function/)提出的期望状态接口，也带来相关问题。当目标可以描述一种未来配置，模型就可能帮助比较通向它的路线。这个组件的贡献，需要通过约束条件下更好的决策来验证。

## 给 AI Being 一个持续的角色

这里的 AI Being 是产品层面的比喻：一个在环境中感知、行动、交流，并拥有持续角色的智能体。游戏同伴、持续世界中的角色、与人一起工作的机器人，需要的连续性各不相同。

{% include article-image.html src="/img/blog/ai-beings/concept.png" alt="研究者望向太空中想象的硅基 AI 生命的概念插画" width="1792" height="1024" caption="想象未来 AI Being 的概念插画。" %}

对于同伴，连续性可能意味着记住共同目标，并在局面变化时作出连贯回应；对于机器人，预测需要连接到动作的物理效果。两种情况，都依赖感知、控制与反馈的配合。

一个实际的推进方式，是先选择边界明确的任务，衡量预测是否改善了行动：路线失败更少，资源使用更好，或者配合更可靠。生成模型可以通过这样的结果，在人们使用的系统里找到位置。

## 延伸阅读

- [Game Emulation via Neural Network](https://madebyoll.in/posts/game_emulation_via_dnn/)，一个可交互的 Pokémon 世界实验。
- [Runway：Introducing General World Models](https://research.runwayml.com/introducing-general-world-models)。
- [World Models](https://worldmodels.github.io/) · [Sora 在 2024 年 2 月的技术报告](https://openai.com/index/video-generation-models-as-world-simulators/)。
