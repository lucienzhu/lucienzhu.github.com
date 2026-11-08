---
layout: "royale-article"
title: "深圳花牌：一副牌，两个人，三张牌，打出花。"
date: "2026-10-24 00:00:00 +0800"
author: "Xiaolong Zhu"
show_url: true
tags: ["blog"]
lang: "zh-CN"
summary: "一副普通扑克，两个人：短局里的攻防取舍，整场从 2 到 A 的目标，还有开放的新对手。"
permalink: "/zh/updates/2026/10/3card-royale/"
alternate_url: "/updates/2026/10/3card-royale/"
article_url: "https://lucienzhu.github.io/zh/updates/2026/10/3card-royale/"
article_image: "/img/blog/3card-royale/cover.png"
extra_css: ["/css/royale-article.css", "/css/royale-experiments.css", "/css/royale-native.css"]
extra_js_bottom: ["/js/royale-article/actions.js", "/js/royale-article/experiments.js", "/js/royale-article/native.js"]
update_id: "3card-royale"
release_tag: "v1.2.0"
last_modified_at: "2026-11-08 00:00:00 +0800"
original_url: "/updates/2026/10/3card-royale/"
---

{% include royale-native.html kind="cover" src="/img/blog/3card-royale/cover.svg" caption="一副牌，两个人，三张牌，打出花。" %}

我想做一个闲下来就能和伙伴开玩的双人游戏：一副普通扑克牌，容易上手，打过几局之后，仍然有值得琢磨的选择。

这就是**深圳花牌（3Card Royale）**的起点。小局里，两个人交替攻防，争取打好眼前这一手；整场里，双方从 2 向 A 升级。一手好牌能赢下一次攻防，要走到终点，还得赢下几局。

## 1. 短局有快乐，整场有目标
{: #origin}

扑克牌已经提供了一套熟悉的语言：对子、顺子、同花。我想把有趣的选择放在**什么时候用掉这些牌**上。

比如，我有一手同花。现在打出去，可能让对手受伤；但轮到防守时，这几张牌就不在了。对手看过我的进攻，可以选择压过它，也可以受一点伤，留下更好的组合准备反攻。双方各进攻一次后才补手牌，因此眼前的选择会影响下一次应对。

{% include royale-figure.html src="/img/blog/3card-royale/table-light.jpg" width="1000" height="900" alt="浅色牌桌：对手在上、玩家在下，中间展示当前攻防。" caption="图 1 · 对手已经打出同花。用强牌防住它，还是留牌准备反攻？" %}

<details class="royale-depth" markdown="1">
<summary>牌桌上的几个区域</summary>

{% include royale-native.html kind="card-zones" src="/img/blog/3card-royale/card-zones.svg?v=boxes1" caption="图 2 · 手牌保密，伤牌公开且可以打出。这是另一组示例局面。" %}

</details>

有人达到 5 伤，小局就结束。胜者升级，双方换一手新牌再来。这样，一局有输赢、有回报，整场又保留着更远的目标：**升到 A，再赢下自己的冲 A 局，才算开花。**

玩法受到[花札](https://zh.wikipedia.org/wiki/%E8%8A%B1%E6%9C%AD)、[炸金花](https://baike.sogou.com/m/v7421269.htm "搜狗百科")、[掼蛋](https://zh.wikipedia.org/wiki/%E6%8E%BC%E8%9B%8B)和 [Balatro](https://zh.wikipedia.org/wiki/%E5%B0%8F%E4%B8%91%E7%89%8C_%28%E7%94%B5%E5%AD%90%E6%B8%B8%E6%88%8F%29) 的启发：花与牌的联系、三张牌的直接较量、等级和百搭牌带来的变化，以及重新组合熟悉牌型的乐趣。这些想法最终落在两个人之间的攻防取舍上。

[先打几局 →](https://lucienzhu.github.io/3card-royale/?lang=zh-CN)

## 2. 一朵来自深圳的花
{: #design}

三角梅开遍深圳，也是[深圳的市花](https://www.sz.gov.cn/ztfw/gysy/wyw_183970/ywzsk_184570/content/post_12660964.html)。三片彩色苞片围成一朵花，自然呼应了三张牌的玩法。

花的下面，是**电路板绿**。深圳有硬件、有快速迭代，也应该有和伙伴慢下来打一局的闲暇。我希望这副牌带着这座城市的性格。

{% include royale-native.html kind="identity" src="/img/blog/3card-royale/identity.svg" caption="图 3 · 三角梅、金牌与电路板绿。" %}

金色牌底、红花、金花心组成标志。到了牌桌上，红花代表你，金花代表对手；日间和夜间都沿用这套识别方式。

{% include royale-native.html kind="design-system" src="/img/blog/3card-royale/design-system.svg" caption="图 4 · 日间与夜间：你是红花，对手是金花。" %}

<details class="royale-depth" markdown="1">
<summary>把牌桌变成电路板</summary>

设置里的「电路板」模式，为牌区添上芯片引脚，用动态走线连接各个区域。

{% include royale-figure.html src="/img/blog/3card-royale/table-pcb.jpg" width="1000" height="900" alt="同一局牌在电路板模式下，牌区周围出现芯片引脚和连通的走线。" caption="图 5 · 同一个牌桌的电路板模式。" %}

</details>

城市也出现在整场的终点。赢下冲 A 局的牌翻过来，聚成花、绽放，再散落到天际线的角落。上方浮现一句**「你，开花了。」**胜利画面从刚刚打出的那一手开始。

{% include royale-native.html kind="finale" src="/img/blog/3card-royale/finale.svg" caption="图 6 · 整场的终点，是绽放。实录结果：11 局，7 : 4，58 轮。" %}

单局胜利的结算更轻。完整的绽放，留给从 2 走到 A 的这一程。

## 3. 进攻打伤害，防守换牌
{: #rules}

一副 **52 张普通扑克牌，不用大小王**。双方各摸 **8 张**，从 2 级开始。进攻方先亮牌，防守方看过后再应对。

通常出三张牌。四张、五张只用于四炸、五炸，双方不必出相同张数。每局指定一张红桃为**花牌**，可以代替任意点数和花色。

{% include royale-hands.html %}

先比牌型，再比同牌型内的点数，花色不分大小。五炸需要四张同点数牌加一张花牌。

同花 3 分，对子 1 分。如果进攻赢了，防守方受到 **3 − 1 = 2 伤**；如果用三炸防住同花，就获得 **5 − 3 = 2 次换牌机会**。同牌型靠点数获胜，效果是 1 伤或 1 次换牌；完全相同则没有伤害或换牌。

{% include royale-experiment.html kind="combat" src="/img/blog/3card-royale/attack-defense.svg" width="1200" height="496" alt="两个规则示例：同花进攻赢对子造成 2 伤，三炸防守赢同花获得 2 次换牌机会。" caption="图 8 · 分差在进攻时变成伤害，在防守时变成换牌机会。" %}

### 受伤，也可能带来一手反击

伤害以牌的形式正面放在面前。**伤牌可以和手牌一起出**；用掉后从牌堆原位补一张，所以出伤牌不会减少伤害。

伤牌让你更接近输局，也增加了可用的组合。它可能恰好补成一手强牌，而对手也能看到这个威胁。

{% include royale-native.html kind="wounds" src="/img/blog/3card-royale/wounds.svg" caption="图 9 · 伤牌参与组成顺子，再原位补牌，仍然是 1 伤。K♦ 为示例补牌。" %}

### 防守改变下一次攻防

每次换牌机会，可以用己方一张手牌或伤牌，与一个合法目标交换：牌堆、对手随机暗牌、公开伤牌，或己方另一个牌区。可选目标由来源牌区决定。换牌不改变伤牌数量，**每次机会都可以单独放弃**。

双方各进攻一次，才算一轮。两次攻防之间不补手牌；轮末保留剩余牌，再补至 8 张。第一手赢得漂亮，也可能让第二手难以应对。

{% include royale-native.html kind="round-flow" src="/img/blog/3card-royale/round-flow.svg" caption="图 10 · 双方各进攻一次，再补手牌；任一次攻防都可能结束小局。" %}

### 从赢下一局，到走完整场

一方达到 5 伤或以上，小局结束。胜者按**最终伤牌差**升级：对手 7 伤、你 2 伤，就升 5 级，最多到 A。计算时不会把伤害截成 5。

到 A 后，还要赢下由自己冲 A 的一局，才能赢得整场。自己的冲 A 局累计失败三次，就回到 2；对手的等级保留。

花牌也跟着升级变化。第一局是 `♥2`，之后是上一局胜者新等级对应的红桃。如果胜者升到 7，下一局双方共用的花牌就是 `♥7`，整局不变。

[完整规则](https://lucienzhu.github.io/3card-royale/rules.html?lang=zh-CN) · [A4 规则卡](https://lucienzhu.github.io/3card-royale/docs/shenzhen-flower-rules-a4.zh-CN.pdf)

## 4. 附笔：把策略放进实验里
{: #rl}

设计玩法之后，我还想知道：**什么样的决策更容易赢？**于是我做了一个可复现的环境，固定发牌、替换策略，再比较结果。别人也可以直接实验，不必先重写游戏引擎。

这些实验衡量的是策略表现，不能单独证明规则平衡或游戏好玩。它们能暴露策略的弱点，也能提出值得拿回真人试玩中检验的问题。

GameCore 负责规则，策略负责选动作。普通策略只能看到自己的手牌和公开信息，不能读取对手暗牌或牌堆顺序。

{% include royale-native.html kind="system-architecture" src="/img/blog/3card-royale/system-architecture.svg" caption="图 11 · 策略根据自己可见的信息选择动作，GameCore 校验并执行。" %}

### 同一个决策，两种建模方式

**整手评分**先列出合法动作，给每一手打分，再选最高分。**自回归**则逐步构造动作：先选操作，再选牌或换牌目标。两者最终交给引擎的，都是同一种完整动作。

我训练了这两类模型，模仿固定的规则策略 **SDK Code AI**。它们目前是行为克隆基线，还没有根据输赢奖励做强化学习；环境为后续 RL 实验保留了入口。

<details class="royale-depth" markdown="1">
<summary>一个决策的内部：观察、动作与网络</summary>

观察共 **336 维**：六个牌区各 52 个有无标记，加上 6 个阶段标记和 18 项局面值。六个牌区是己方手牌、双方公开伤牌、弃牌、双方当前出牌。两个网络都没有输入历史序列。

{% include royale-experiment.html kind="observation" src="/img/blog/3card-royale/observation-state.svg" width="560" height="2434" diagram=true alt="实际换牌样本：六个 52 位牌区、六位阶段、其余 18 项状态，以及原值、入模值与归一化公式。" caption="图 12 · 一个实录局面，336 个值。牌区是 multi-hot，阶段是 one-hot；牌堆余量编码为 29 / 52。" %}

实体牌 ID 固定按 ♠、♥、♣、♦，每种花色从 2 到 A 排列。0–51 表示牌；52–54 是 `PLAY_3`、`PLAY_4`、`PLAY_5`；55–64 表示换牌、目标区和流程操作。`PAD = 65` 用于补齐。

三个 A 的动作是 `PLAY_3 → A♠ → A♥ → A♣`。出牌按 ID 升序排列，不管点击顺序如何，同一手只有一种表示。牌不能重复，四张、五张必须组成合法炸弹。换牌指定来源和目标；目标可见时，还要指定目标牌。

**65 位 mask** 标记下一步哪些 token 仍能组成合法动作。选牌时 mask 会变，token 的含义不变。Gym 接收补齐后的六个 token，即 `MultiDiscrete([66] × 6)`，一次执行完整动作。

{% include royale-experiment.html kind="action" src="/img/blog/3card-royale/structured-actions.svg" width="1000" height="650" alt="固定 token 编成三张牌或换牌动作；每步通过条件 mask 过滤，最终一次性提交完整动作。" caption="图 13 · 固定牌 ID 与操作组成完整动作，mask 限定下一步的合法选择。" %}

| 策略 | 网络 | 参数量 | ONNX |
| --- | --- | ---: | ---: |
| 整手评分 | 408 → 256 → 128 → 1 | 137,729 | 0.55 MB |
| 自回归 | 732 → 256 → 128 → 65 | 228,929 | 0.92 MB |

整手评分输入 336 维状态和 72 维动作描述，其中包含人工定义的牌型特征。自回归输入同一状态和 396 维前缀编码，每个动作最多调用网络六次。输入信息与解码方式不同，因此这不是单独比较网络结构的实验。

浏览器和自对弈采集使用 JavaScript 核心，Gymnasium 使用原生 Python 核心。JavaScript、Python、Rust、C++ 实现通过共享回放序列校验。

[动作协议与 Gym 用法](https://github.com/lucienzhu/3card-royale/blob/unify-action-space/docs/ACTIONS.md)

</details>

<details class="royale-depth" markdown="1">
<summary>训练配方与验证</summary>

两个配方分别生成 **10,000 局 SDK 自对弈**，按整局划分为 **8,000 训练 / 1,000 验证 / 1,000 测试**。整手评分有 252,859 次决策；自回归有 252,906 次决策、988,571 个目标 token。两份数据使用不同种子。

两者都用 PyTorch 训练。整手评分在合法动作之间计算交叉熵；自回归使用带 mask 的 teacher forcing，计算逐 token 交叉熵，每次完整决策权重相同。TensorBoard 记录曲线，以验证损失选出整手评分的第 **5** 轮、自回归的第 **16** 轮。

{% include royale-native.html kind="structured-training" src="/img/blog/3card-royale/structured-training.svg" caption="图 14 · 自回归训练损失持续下降，验证损失在第 16 轮最低。" %}

测试集上，整手评分的**完整动作一致率为 89.36%**，自回归的 **teacher-forced token 准确率为 90.44%**。这不是同一种指标：给定正确前缀预测下一个 token，不等于独立生成一整手正确动作。自回归的老师也没有提供 `SKIP`、`STOP` 正例。

{% include royale-native.html kind="training-pipeline" src="/img/blog/3card-royale/training-pipeline.svg" caption="图 15 · 分别生成自对弈数据，按整局划分，以验证损失选模。" %}

仓库提供确定性数据生成配方、哈希、checkpoint、训练曲线和运行时版本。新训练的权重使用独立策略 ID 评测，避免与已有基线混淆。

[整手评分配方](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/training) · [自回归配方](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/training/structured)

</details>

### 实验告诉了我们什么

对网页困难档 Code AI，256 → 128 整手评分模型的胜率是 **42.6%**，自回归模型是 **23.9%**。每组打 1,000 小局，使用同一批 500 个种子，交换座位、平衡先攻，从 2 级开始。

{% include royale-experiment.html kind="evaluation" src="/img/blog/3card-royale/win-rates.svg" width="864" height="576" alt="公开信息策略，在相同 500 个配对种子下对战网页 Code AI 与 SDK Code AI 的胜率。" caption="图 16 · 同一批发牌下的胜率。每条对应 1,000 局，横轴为完整的 0–100%。" %}

| 策略 | ONNX | 延迟 p95 | 对 Code AI | 对 SDK Code AI |
| --- | ---: | ---: | ---: | ---: |
| 随机策略 | — | 0.21 ms | 0.0% | 0.0% |
| Easy · 64 | — | 0.59 ms | 34.1% | 35.6% |
| SDK Code AI | — | 0.66 ms | 48.0% | 自身 |
| 整手评分 · 64 → 32 | 0.11 MB | 0.73 ms | 41.9% | 47.8% |
| 整手评分 · 128 → 64 | 0.24 MB | 0.88 ms | 42.5% | 44.4% |
| 整手评分 · 256 → 128 | 0.55 MB | 1.32 ms | 42.6% | 45.5% |
| 整手评分 · 256 → 512 | 0.95 MB | 2.54 ms | 43.6% | 44.7% |
| 整手评分 · 512 → 256 | 1.37 MB | 2.71 ms | 40.3% | 45.8% |
| 自回归 · 256 → 128 | 0.92 MB | 0.87 ms | 23.9% | 26.6% |
| Godlike · 明牌 | — | 18.12 ms | 67.0% | 67.5% |
{: .royale-policy-results }

整手评分在这次实验中表现更好。这比较的是两套训练方案，不能据此判定自回归方法的上限。输入、监督方式和解码各自的影响，还需要单独验证。不同宽度评分网络之间的小幅差异，也不足以确定强弱排序。

<details class="royale-depth" markdown="1">
<summary>评测条件与完整记录</summary>

**Code AI** 是网页困难档，**SDK Code AI** 是固定的训练老师。表中每组对战 1,000 小局，基线报告共 **19,000 局**，均正常结束，无非法动作或截断。**Godlike** 可以看到对手手牌，不参与普通信息天梯。

延迟取各对手批次中最高的整次决策 p95，环境为 **Apple M1 / Node 22 / 单线程 WASM**。包含编码和所有推理调用，不含首次加载、线程间通信；这不是手机延迟。ONNX 大小只计模型权重。

两个模型直接对战时，自回归对 256 → 128 整手评分的胜率为 **28.8%**。另外的神经策略报告覆盖 Easy、Random 和已登记的 NN512，共 11,000 局；其中 4,000 局与基线报告重叠，两份报告合计 **26,000 个不同对局**。

[基线报告与复现](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/docs/experiments/complete-baseline) · [其他神经策略对战](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/docs/experiments/neural-baselines)

</details>

接下来值得试的是：学习多个好选择，而不只模仿老师的首选；或者直接优化输赢奖励。Gym 支持小局和从 2 到 A 的整场，当前训练配方使用小局。

## 5. 给新对手留一张椅子
{: #arena}

几条规则就可以是一种策略，不一定要训练神经网络。**竞技场**让两者都能参与：提交自己的对手，接受评测，再让玩家直接在浏览器里挑战同一份策略。

### 从 PR 到天梯

把策略和声明文件放进独立目录，填上 GitHub handle，跑通本地验证，带着生成的记录提交 PR。CI 检查它能否合法对战；发布时再评估暂定基准 Elo，自动更新天梯。

{% include royale-native.html kind="arena-flow" src="/img/blog/3card-royale/arena-flow.svg" caption="图 17 · 提交时验证，发布时评分，随后开放试玩；发布也会重复验证。" %}

<details class="royale-depth" markdown="1">
<summary>投稿格式与评分方法</summary>

策略放在 `policies/entries/your-policy-v1/`，包含 manifest、源码或权重、README 和 `validation.json`，并登记到 registry。每次修改使用新的不可变 ID，让分数对应到实际评测的文件。

| 格式 | 接口 |
| --- | --- |
| JavaScript | `createPolicy → act(observation) → 完整语义动作` |
| ONNX · `scoring-v2` | `state [B,336] + candidates [B,N,72] → scores [B,N]` |
| ONNX · `structured-v2` | `state [B,336] + prefix [B,396] → scores [B,65]` |

统一声明 `royale-policy-v2` 和 `actions-v2`。JS 策略可以在一局内记住公开观察；当前 ONNX 接口没有循环状态。其他语言的策略需要移植为 JS，或导出为支持的 ONNX 格式，再用保存的观察样本核对。每份策略产物限制为 5 MB，由 GitHub Pages 加载审核后的注册文件，在浏览器 Worker 中运行。

先运行 `npm run arena:validate`，再运行 `npm run arena:submit -- --policy your-policy-v1`。提交检查会与 Code AI 打四局，覆盖双方座位和先攻。PR CI 重复验证；合并后标为**未评分**，直到 GitHub Release 或 **Publish Arena** 流程完成评分、提交结果并构建 Pages。

每个新策略对三个固定基准各打 **20 局**：Easy（1387）、NN 256（1440）、Code AI（1500）。交换座位、平衡先攻，共 60 个评分小局；加上验证是**每个待评策略 64 局**，不随榜单人数增加。未修改策略复用已有结果。

评分使用 Elo 胜率曲线和声明的先验，根据结果拟合一个分数，不使用逐局 K 值更新，也不受对局顺序影响。60 局只能给出暂定评分，小差距不能证明强弱；固定基准和公开种子也可能被过拟合。天梯成绩与前面每组 1,000 局的基线评测分别统计。

[接口与模板](https://github.com/lucienzhu/3card-royale/tree/main/policies) · [投稿指南](https://github.com/lucienzhu/3card-royale/blob/main/policies/README.md) · [评分计算](https://github.com/lucienzhu/3card-royale/blob/main/arena/README.md)

</details>

### 挑一个 AI，打一局
{: #ladder}

天梯也是一份对手名单。点「挑战」，就能在浏览器里与对应策略对战。试玩不会改变评分。

{% include royale-ladder.html %}

## 6. 带一副牌，或者打开网页
{: #play}

两个人玩，有一副普通扑克和 [A4 规则卡](https://lucienzhu.github.io/3card-royale/docs/shenzhen-flower-rules-a4.zh-CN.pdf) 就够了。一个人想试试，可以打开网页版和 AI 对战，手机、桌面都能玩，无需注册。

首次进入会练习一次进攻和一次防守，正式第一局再按场景介绍伤牌和换牌。从简单档开始，之后可以在设置里更换对手；「竞技场 AI」可以选择投稿策略。手机上划过牌面，就能连选一手。

打完之后，留下值得记住的片段：本局全部攻防、决胜的最后一手，或者打出最多伤害的高光。三种回顾都可以生成 PNG 分享。

{% include royale-native.html kind="sharing" src="sharing.svg" caption="图 18–20 · 同一局的三种回顾：全部攻防、最后一手、最大伤害。种子 19，第 1 局。" %}

找个伙伴打几局。我想听听哪一手让你想再来一次，也想知道哪些选择始终不值得做。它们都会成为下一次迭代的依据。

**一副牌，两个人，三张牌，打出花。**

[开始玩 →](https://lucienzhu.github.io/3card-royale/?lang=zh-CN) · [AI 竞技场](https://lucienzhu.github.io/3card-royale/arena.html?lang=zh-CN) · [源码与规则](https://github.com/lucienzhu/3card-royale)
