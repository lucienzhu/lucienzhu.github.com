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
last_modified_at: "2026-10-24 00:00:00 +0800"
---

“2 号，快来救救我。”

队友听到这句话，会识别谁在求助，再结合局面决定怎么支援。AI 同样需要把语言与游戏世界连接起来，一句话才能变成有用的行为。

YesSir 是团队在 2021 年探索的游戏助手方案，我参与了架构整理。它尝试把偶尔下达的语音指令，转成 AI 队友能够执行的任务。

## 给玩家值得开口的理由

语言适合表达较大的意图：增派支援、掩护路线、救援队友。持续口述细小动作容易疲劳，熟悉的控制器也已经能很好地处理这些操作。

一种值得尝试的组合，是玩家直接操纵一个角色，同时用偶尔的语音命令协调 AI 同伴。玩家既能参与眼前的战斗，也能安排更大范围的小队策略。

助手还可以解释玩法、修改设置或回答问题。每类交互都需要明确的角色与反馈：战术命令需要看得见的行为结果，信息查询则需要尽量少打断游戏的回答。

## 把语言落到游戏状态上

在 FPS 方案里，我们把语言理解与实时控制分开。语音识别先把声音转成文字，意图与槽位解析识别请求和接收者，再用游戏状态把“我”解析成实际的玩家及其位置。

{% include article-image.html src="/img/blog/yessir/language-to-subgoal.png" alt="YesSir 从语音识别、意图和槽位解析，到生成子目标并交给强化学习控制的流程" width="681" height="238" caption="YesSir 的 FPS 方案：识别请求，从游戏状态确定目标，再交给 RL 策略控制。" %}

“2 号，救我”由此变成：选中的 AI、救援意图，以及根据说话者状态确定的目的地。学到的策略负责移动和沿途的局部决策。

这种划分也有助于定位失败。选错队友，是理解环节出了问题；找对了玩家却走不过去，是控制问题。两者都会破坏体验，但需要不同的修正方法。

## 先定义关系，再赋予个性

战术助手需要可预测的服从；虚构同伴则可能犹豫、反对，或者有自己的优先事项。这些行为服务于不同的游戏，也会让玩家形成不同预期。

如果 AI 接受了命令却无法完成，游戏需要让失败原因可以理解。如果角色有意拒绝，玩家也需要足够的线索，把它理解为角色性格。交流包含命令、回应，以及随后发生的事。

针对 MOBA，方案还提出把编码后的对话及其历史，与游戏特征一起送入策略模型。评估这条路线，需要测试语言变化能否在不同局面中，稳定地引起预期的行为变化。

## 反馈与命令同样需要设计

一个语音界面值得使用，是因为玩家能提出有意义的要求，辨认系统理解了什么，再看到小队作出响应。仅仅增加一些可识别词汇，还不足以形成这样的循环。

设计机会在于让协调本身有分量：玩家作出战术选择，同伴执行，新的局面又带来下一次选择。当底层目标与技能足够可靠时，语言能让这种配合变得直接。

相关文章：[Neural Function](/zh/updates/2021/10/neural-function/) · [游戏 AI：从模型到系统](/zh/updates/2021/08/game-ai-from-models-to-systems/)。

## 参考案例

- [不要停下来！八分音符酱](https://www.bilibili.com/video/BV1P54y1d7gx/) · [言出法随](https://www.bilibili.com/video/BV1Sf4y1r7sV/)。
- [汤姆克兰西：终结战争](https://www.bilibili.com/video/BV12s411D7tq/) · [吟诵者](https://www.bilibili.com/video/BV1Bs411v7Zn/) · [Lifeline](https://www.bilibili.com/video/BV1aW411H7HZ/)。
- [为 FIFA 创建语音助手的教程](https://towardsdatascience.com/creating-voice-assistant-for-games-tutorial-for-fifa-71cfbe428bd1) · [Fridai](http://Fridai.ai)。
