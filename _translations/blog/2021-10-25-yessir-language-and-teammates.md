---
title: "YesSir：用语言指挥 AI 队友"
date: "2021-10-25 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
tags: [blog]
update_id: yessir-language-and-teammates
summary: "把玩家的一句话转成子目标，再由学到的策略处理沿途的移动与决策。"
original_url: /updates/2021/10/yessir-language-and-teammates/
permalink: /zh/updates/2021/10/yessir-language-and-teammates/
---

*整理自团队 2021 年 10 月的 YesSir 设计记录，当时我参与了方案整理。2026 年 10 月编辑，文中例子描述的是所探索的交互与架构。*

“2 号，快来救救我。”

玩团队游戏的人，听到的并不只是一个移动命令。这句话指定了队友，表达了意图，也指向当前局面。一个 AI 队友，要怎样才能作出有用的响应？

这是 YesSir 背后的问题之一。我们当时探索一个虚拟游戏助手，希望语言能够成为与游戏 AI 配合的一种有效方式。

## 找到适合开口的时刻

持续用语音控制，可能会让人疲劳。快速、精确的操作，也可能更适合玩家已经熟悉的控制方式。更有意思的机会，是偶尔用一句话表达较大的意图：增派支援、掩护一条路线，或者帮助队友。

玩家可以继续操控自己的角色，同时给 AI 同伴安排任务。这就有机会把直接操作与更大范围的团队策略结合起来。

笔记里还考虑过攻略查询、设置修改、玩法指导和闲聊。这些属于不同的交互，人们对它们也有不同的预期。一个好用的助手，需要让玩家知道自己此时扮演什么角色。

## 从一句话，到一个子目标

以 FPS 为例，我们把语言理解与实时控制分开。

语音识别先把声音变成文字；意图识别与槽位提取，判断玩家想做什么、正在对谁说话；再通过游戏状态，把“我”解析成说话玩家的当前位置。系统由此给选中的 AI 分配子目标。

{% include article-image.html src="/img/blog/yessir/language-to-subgoal.png" alt="YesSir 从语音识别、意图和槽位解析，到生成子目标并交给强化学习控制的流程" width="681" height="238" caption="原设计记录中的 FPS 流程：语言识别任务，游戏上下文确定目标，再由 RL 策略控制响应。" %}

“2 号，救我”可以被拆成：选择 2 号 AI、识别救援意图，再把玩家位置作为目的地。学到的策略负责移动，以及沿途的局部决策。

这种分工有用的地方，是让玩家表达目的，而不用逐步交代操作。控制策略仍然要根据游戏里实际发生的情况作出响应。

## 服从与个性，会带来不同的游戏

笔记中区分了两类交互。一类希望 AI 尽可能可靠地执行命令；另一类，则让命令与角色的处境或个性共同影响行为。

战术助手需要可预测的响应。一个虚构同伴，则可能犹豫、提出异议，或者优先处理别的事情。两者都可以有趣，但玩家需要知道，游戏提供的是哪一种关系。

针对 MOBA，我们还考虑过把编码后的对话及其历史，与游戏特征一起送入策略模型，让交流更直接地影响决策。这个方向属于设计提案，策略能否稳定响应语言，还需要评估。

## 交互，本身就是游戏设计

让我感兴趣的，是能否围绕与 AI 同伴交流，设计新的游戏。玩家直接操纵一个角色，同时用语言协调小队；或者下达策略，再看队伍怎样执行。

技术链路只是体验的一部分。游戏如何反馈、行为能否被理解，以及玩家有没有值得开口的理由，同样重要。

相关笔记：[Neural Function](/zh/updates/2021/10/neural-function/) · [游戏 AI：从模型到系统](/zh/updates/2021/08/game-ai-from-models-to-systems/)。

## 原笔记收集的参考案例

以下链接保留了当时设计探索中的参考材料：

- [不要停下来！八分音符酱](https://www.bilibili.com/video/BV1P54y1d7gx/) · [言出法随](https://www.bilibili.com/video/BV1Sf4y1r7sV/)。
- [汤姆克兰西：终结战争](https://www.bilibili.com/video/BV12s411D7tq/) · [吟诵者](https://www.bilibili.com/video/BV1Bs411v7Zn/) · [Lifeline](https://www.bilibili.com/video/BV1aW411H7HZ/)。
- [为 FIFA 创建语音助手的教程](https://towardsdatascience.com/creating-voice-assistant-for-games-tutorial-for-fifa-71cfbe428bd1) · [Fridai](http://Fridai.ai)。
