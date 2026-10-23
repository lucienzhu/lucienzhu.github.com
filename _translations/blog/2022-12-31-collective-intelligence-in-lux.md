---
title: "Lux：群体策略是怎样涌现的"
date: "2022-12-31 00:00:00 +0800"
date_precision: year
date_label: "2022 年"
date_label_short: "2022"
author: Xiaolong Zhu
tags: [blog]
original_url: /updates/2022/collective-intelligence-in-lux/
permalink: /zh/updates/2022/collective-intelligence-in-lux/
update_id: collective-intelligence-in-lux
summary: "共享策略如何在自博弈中学会保留资源、控制空间和维持协作阵形。"
last_modified_at: "2026-10-24 00:00:00 +0800"
---

一排单位沿对角线分割地图。一个耗尽燃料，另一个补上缺口。另一处，工人把能够再生的木头留在原地，等需要时再采集。这些行为，都没有被我们写成规则交给它们。

这些观察来自我参与的 Lux 研究[《Emergent collective intelligence from massive-agent cooperation and competition》](https://arxiv.org/abs/2301.01609)。论文发表于 NeurIPS 2022 Deep RL Workshop，预印本于 2023 年 1 月公开。研究关心的是：围绕共同结果训练，怎样在大量单位之间产生有用的行为结构。

## 一个让合作有意义的世界

[Lux AI 2021](https://www.kaggle.com/competitions/lux-ai-2021/overview) 是一个回合制游戏。两队采集资源、建造城市，并努力熬过黑夜。城市需要燃料，扩张太快，可能让一大片建筑在夜里消失。

一局中的单位与城市数量一直在变化。建造城市让更多单位成为可能，燃料耗尽又可能让许多棋子同时退出。采集、移动、研究与建造的决策，既影响当前队伍，也影响之后会出现怎样的队伍。

这种联系让它很适合研究群体智能。一个工人做什么才有用，要看其他工人去哪里、团队能使用哪些资源，以及自己的城市能否活下来。

## 一张地图，很多个动作

我们采用集中式策略：观察整张地图，再对各个格子输出动作。输入像一张多通道图像，分别描述资源、单位、城市等状态；网络输出该格子上单位可以执行的动作。

这种 pixel-to-pixel 建模，参考了 [Toad Brigade 的比赛方案](https://www.kaggle.com/competitions/lux-ai-2021/discussion/294993)与 [Grid-Wise Control](https://proceedings.mlr.press/v97/han19a.html)，让同一个策略能够处理数量不断变化的单位。

训练使用自博弈、[PPO](https://arxiv.org/abs/1707.06347) 和 [GAE](https://arxiv.org/abs/1506.02438)。分布式框架不断运行环境、采集轨迹，再用数据更新策略，形成循环。

{% include article-image.html src="/img/blog/lux-collective-intelligence/training-framework.png" alt="包含环境运行、策略存储、样本存储与学习器的分布式训练循环" width="7600" height="4989" size="medium" caption="分布式训练循环：环境运行器采集轨迹，学习器据此更新策略。" %}

这里的集中式控制很重要：这些单位共享团队策略。我们没有给它们手写“排成一道墙”或“保护某片树林”的协作指令。

## 从学会动作，到学会赢

训练先用较密集的奖励，引导智能体掌握采集、建城等基本技能。

随后，学习信号逐步转向最终胜负。中间阶段利用双方最终城市数量的差异，让训练更容易看到进步；最后再只根据输赢提供奖励。

训练过程中，我们观察到了几个行为阶段。这些是实验中的变化，并不意味着所有智能体都会固定按同一条路线成长。

**基础技能。** 早期策略开始学会采集、建造、运送燃料与研究。它已经能做出局部有用的动作，但在团队整体上仍可能犯很贵的错误。

**可持续扩张。** 后来的策略能更好地平衡建设与燃料。一场自博弈中，双方几乎各自填满了一半地图。

{% include article-image.html src="/img/blog/lux-collective-intelligence/peaceful-expansion.jpg" alt="Lux 自博弈中两队分别占据大部分各自半场的局面" width="1920" height="929" caption="可持续扩张阶段的一场自博弈示例。" %}

**争夺空间。** 随着训练继续，智能体开始更积极地争夺关键资源、道路，以及对手继续发展的空间。

**群体策略。** 我们逐渐看到对整个团队有用的阵形，包括对角线封锁，以及单位消失后由队友补位。

## 三种值得细看的行为

第一种，是城市与单位如何控制空间。早期建城比较零散，后来出现了相连的行、列与块状结构，再往后，布局开始限制对手的移动。

一个反复出现的例子是，单位沿对角线站位，把对方的活动区域切开。某个单位燃料耗尽，另一个单位又补上空位。这条线通过连续的动作被维持下来。

{% include article-image.html src="/img/blog/lux-collective-intelligence/diagonal-blockade.png" alt="蓝色单位沿 Lux 地图对角线排列，限制对方的活动范围" width="1898" height="907" caption="训练中观察到的对角线封锁。" %}

第二种，是对树木的处理。早期策略看到木头就尽快采集；后来的对局中，智能体会在受保护的区域保留能够再生的木头，争夺地图中间的树林，并在终局前收取预留资源。

第三种，是扩张与生存之间的关系。最初多建城市经常导致燃料短缺；继续训练后，类似的早期扩张却能带来更多工人和更快的研究，帮助队伍接触到支持后续发展的资源。

在早期策略中看起来浪费的动作，可能随着其他行为成熟，变成有用的一环。这也提醒我们，解释一个动作时，需要看完整策略。

<figure class="article-figure">
  <video controls preload="none" playsinline width="560" height="315" aria-label="Lux 研究策略与 Toad Brigade 基线对战录像">
    <source src="/video/blog/lux-collective-intelligence/stage-four-vs-baseline.mp4" type="video/mp4">
    <a href="/video/blog/lux-collective-intelligence/stage-four-vs-baseline.mp4">观看对局录像</a>。
  </video>
  <figcaption>示例对局：黄色为我们训练的策略，蓝色为 Toad Brigade 基线。</figcaption>
</figure>

## 在团队尺度上理解行为

这些观察描述的是特定游戏与训练配置中的行为，本身不能证明网络内部学到了哪种表示。对局示例需要与量化评估、消融实验一起看，细节可以参考论文和[研究代码](https://github.com/hanmochen/lux-open)。

一片没有被采集的树林，可能支持之后的燃料需求；一个原地不动的单位，可能正在维持封锁线。这些动作的价值，取决于其他队友和后续局面。孤立地评价每个工人，就会漏掉其中的结构。

分析学到的策略，可以从动作如何在时间上互相支持入手。录像帮助我们提出解释，受控比较则用来确认，哪些行为真正有助于获胜。

## 参考与材料

- [研究论文](https://arxiv.org/abs/2301.01609) · [NeurIPS 2022 Workshop 论文](https://openreview.net/pdf?id=KCWm-HV0PQT) · [代码](https://github.com/hanmochen/lux-open)。
- [Lux AI 2021 比赛](https://www.kaggle.com/competitions/lux-ai-2021/overview) · [环境与规则](https://github.com/Lux-AI-Challenge/Lux-Design-2021) · [Toad Brigade 方案](https://www.kaggle.com/competitions/lux-ai-2021/discussion/294993)。
- [Grid-Wise Control for Multi-Agent Reinforcement Learning in Video Game AI](https://proceedings.mlr.press/v97/han19a.html)，ICML 2019。
- [Proximal Policy Optimization Algorithms](https://arxiv.org/abs/1707.06347)，2017。
- [High-Dimensional Continuous Control Using Generalized Advantage Estimation](https://arxiv.org/abs/1506.02438)，ICLR 2016。
- [Deep Residual Learning for Image Recognition](https://arxiv.org/abs/1512.03385)，CVPR 2016；原方案采用 ResNet 风格的骨干网络。
