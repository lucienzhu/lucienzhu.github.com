---
layout: "royale-article"
title: "深圳花牌：一副牌，两个人，三张牌，打出花。"
date: "2026-10-24 00:00:00 +0800"
author: "Xiaolong Zhu"
show_url: true
tags: ["blog"]
lang: "zh-CN"
summary: "从耐玩的双人对战，到三角梅与绿色电路板，再到浏览器里的神经网络策略。"
permalink: "/zh/updates/2026/10/3card-royale/"
alternate_url: "/updates/2026/10/3card-royale/"
article_url: "https://lucienzhu.github.io/zh/updates/2026/10/3card-royale/"
article_image: "/img/blog/3card-royale/cover.png"
extra_css: ["/css/royale-article.css?v=random-baseline1"]
update_id: "3card-royale"
release_tag: "v1.0.0"
last_modified_at: "2026-10-25 00:00:00 +0800"
original_url: "/updates/2026/10/3card-royale/"
---

{% include royale-figure.html src="/img/blog/3card-royale/cover.svg" width="1200" height="640" alt="三张金牌与绿色电路板" caption="一副牌，两个人，三张牌，打出花。" %}

我想用一副普通扑克牌，做一个耐玩的双人对战游戏。

两个人，一副普通扑克牌，能很快开始；玩过几局之后，依然会遇到值得想一想的选择。运气带来变化，判断影响结果，对手的每一步都会改变自己的下一步。

这个想法慢慢变成了**深圳花牌，3Card Royale**：一个围绕三张牌展开的 1v1 游戏。进攻造成伤害，防守赢得换牌机会，受伤后留下的牌也能重新参与战斗。两个人从 2 级一路打到 A，最后赢下自己的 A 局，就算“开花”。

如今，它有了可以直接打开的网页试玩、完整规则、深圳主题的视觉设计，也有了一套可复现的神经网络策略基线和强化学习环境。

## 1. 起心动念：用一副扑克牌，做一个耐玩的双人对战游戏
{: #origin}

我希望第一次接触的人，可以借助熟悉的扑克牌迅速理解基本动作：选牌、比较、进攻、防守。规则最好能用几句话讲清楚，而值得琢磨的东西，留在实际对局里慢慢发现。

**容易开始，又能持续产生选择，是我最在意的部分。**

一副普通扑克很适合作为起点。点数和花色已经是一种共同语言，对子、顺子、同花也不陌生。用这些熟悉的元素，可以把学习成本留给真正有意思的新机制。

深圳花牌吸收了[花札](https://zh.wikipedia.org/wiki/%E8%8A%B1%E6%9C%AD)、[炸金花](https://baike.sogou.com/m/v7421269.htm "搜狗百科：三张牌")、[掼蛋](https://zh.wikipedia.org/wiki/%E6%8E%BC%E8%9B%8B)和《[小丑牌](https://zh.wikipedia.org/wiki/%E5%B0%8F%E4%B8%91%E7%89%8C_%28%E7%94%B5%E5%AD%90%E6%B8%B8%E6%88%8F%29)》的灵感：花与牌的联系、三张牌组合的直接感、升级和百搭牌带来的变化，以及重新组织熟悉牌型的乐趣。

最后，我把游戏的重心放在了攻守之间。

进攻时，要考虑怎样打出伤害，也要考虑用掉这些牌后，还剩什么来防守。防守时，已经看到了对方出牌，可以选择认真接住，也可以保留更有价值的组合，接受一次有限的损失。防守获胜之后，还能通过换牌改变下一次交锋的条件。

{% include royale-figure.html src="/img/blog/3card-royale/table-light.jpg" width="1000" height="900" alt="浅色牌桌：对手在上、玩家在下，中间展示当前攻防。" caption="图 1 · 实际试玩画面。对手已亮出同花，轮到你防守；暗手牌始终只显示牌背。" %}

{% include royale-figure.html src="/img/blog/3card-royale/card-zones.svg?v=boxes1" width="560" height="868" diagram=true alt="用边框标出八个牌区：上方是对手手牌和公开伤牌；中间是进攻牌、牌堆、弃牌和防守牌；下方是你的公开伤牌和手牌。" caption="图 2 · 牌区示意。手牌保密；伤牌公开，也能出牌。" %}

一手牌的价值会随着局面变化。同样三张牌，在不同的时候，可能是一次进攻、一道防线，也可能是下一轮更好组合的基础。

我希望玩家在一局结束后，能想起某个具体选择：那手同花是不是出早了，那张伤牌是不是该留下，刚才的换牌机会是不是值得用。愿意带着这个问题再来一局，就是这个设计想争取的东西。

## 2. 设计理念：三角梅与绿色电路板
{: #design}

“深圳花牌”这个名字，让游戏有了一个具体的地方。

三角梅（簕杜鹃）是[深圳的市花](https://www.sz.gov.cn/ztfw/gysy/wyw_183970/ywzsk_184570/content/post_12660964.html)。三张牌与它展开的花形自然呼应，深圳的天际线也融入了界面。

标志是一张平涂的金色牌：金底、金边，中央是一朵红花，带着小小的金蕊。这个形象贯穿标志、牌背和花牌提示，让它们属于同一个游戏。

{% include royale-figure.html src="/img/blog/3card-royale/identity.svg" width="1200" height="400" alt="红花代表三角梅与玩家，金牌统一标志牌背与花牌，绿色来自电路板。" caption="图 3 · 三个视觉元素：红花、金牌、绿色电路板。花形和牌标复用游戏当前的正式素材。" %}

**花是主角，绿色的电路板是底盘。**

我用电路板的绿色承托整副牌，也把深圳的硬件气质放进游戏里。浅色与暗色主题，是这块绿色底盘的两种明暗表达，红花和金花始终落在它上面。

颜色也承担着识别任务。玩家是红花，对手是金花；无论在牌桌、进度轨道还是分享图里，身份都保持一致。

{% include royale-figure.html src="/img/blog/3card-royale/design-system.svg" width="560" height="712" diagram=true alt="明暗主题共用平涂金牌标志、牌背与花牌；红花是你，金花是对手。" caption="图 4 · 正式配色与素材。明暗两种绿底，都来自电路板。" %}

设置里还藏着一个电路板模式：牌区化作芯片，走线连接攻守，亮点随着行动流动。绿色底盘于是也参与了对局。

{% include royale-figure.html src="/img/blog/3card-royale/table-pcb.jpg" width="1000" height="900" alt="同一局牌在电路板模式下，牌区周围出现芯片引脚和连通的走线。" caption="图 5 · 同一牌局，打开「设置 → 偏好 → 电路板」后的实际画面。" %}

天际线把城市带进了游戏的结尾。建筑以较轻的线条出现，花可以停在城市的角落，城市也能安静地留在背景里。

最完整的表达，是整场胜利时的“开花”。赢下自己的 A 局后，动画会取出赢家最后实际打出的牌；如果是四张或五张，就取前三张。牌在运动中翻到统一的牌背，收拢成花，随后绽放、飘落，落到城市各处。上方逐渐空出来时，才出现那句话：

> 你，开花了。

这段动画与刚才的对局相连。最后出手的牌，成了胜利画面的起点。

{% include royale-figure.html src="/img/blog/3card-royale/finale.svg" width="1080" height="1440" alt="完整对局结束后的开花海报，花群、白鹭、深圳天际线与升级轨道组成终局画面。" caption="图 6 · 用种子 0 完成整场对局后，由正式分享组件生成的结算图。每次对局的赢家和历程都来自真实记录。" %}

单局胜利保留更轻的反馈。一小局打得漂亮，值得高兴；从 2 打到 A、完成整场挑战，值得一次更完整的绽放。两种胜利有不同的分量，画面也应该表达出来。

## 3. 规则与对局：进攻掉血，防守换牌
{: #rules}

开始之前，记住三句话就够了：

1. **8 张手牌，一攻一守。**
2. **进攻掉血，防守换牌。**
3. **从 2 到 A，过关开花。**

两人共用一副去掉大小王的 52 张扑克，各拿 8 张手牌，从 2 级开始。手牌保密，伤牌公开。

每次攻防，由进攻者先亮牌，防守者看到之后再回应。通常出三张，也可以出四张的“四炸”或五张的“五炸”。攻守双方不必出相同张数，也不必跟相同花色或牌型。

{% include royale-hands.html %}

这里的“三炸”就是三张同点牌，四炸是四张同点牌；五炸需要四张自然同点牌，再加本局花牌。先比较牌型分数，同牌型再比较点数。花色没有大小之分。

例如，你用 `4♦、8♦、Q♦` 的同花进攻，对手用 `6♣、6♠、J♥` 的对子防守。同花 3 分，对子 1 分，你赢下进攻，对手增加 **2 张伤牌**。

如果防守者用三炸接住同花，就获得 **2 次换牌机会**。同牌型只靠点数获胜时，按 1 伤或 1 次换牌机会结算；完全相同则没有收益。

{% include royale-figure.html src="/img/blog/3card-royale/attack-defense.svg" width="1200" height="496" alt="两个规则示例：同花进攻赢对子造成 2 伤，三炸防守赢同花获得 2 次换牌机会。" caption="图 8 · 进攻推动小局结束，防守改善接下来的牌。示例牌中，本局花牌为 ♥2。" %}

### 伤牌，也是可用的牌

受到伤害后，新增的牌会公开放在伤牌区。这些牌依然属于你，也可以和手牌混合出牌。用掉伤牌后，原位置会补上一张新的公开牌，伤势数量保持不变。

所以，受伤会让你更接近败局，同时也会带来新的可用牌。它们公开可见，双方都能据此判断后续组合。你可能从伤牌里找到一次反击，对手也可能提前看见这个机会。

{% include royale-figure.html src="/img/blog/3card-royale/wounds.svg" width="1200" height="420" alt="将公开伤牌 8♥ 与手牌 6♠、7♣ 组成顺子；出牌后原位置补入一张新伤牌，仍为 1 伤。" caption="图 9 · 伤牌参与出牌的流程示意。K♦ 仅为补牌示例；补牌来自牌堆，出伤牌不会回血。" %}

### 换牌机会，可以选择不用

防守获得的换牌，进一步改变了资源关系。你可以交出自己的一张手牌或伤牌，与对手的随机手牌、指定公开伤牌、自己的另一牌区或牌库交换，具体目标取决于来源牌区。换牌改变牌的内容，不改变伤势。

每次机会都可以独立跳过。拿到两次机会，可以换一次、跳过一次，也可以两次都保留原状。拥有选择，本身就是防守的收益。

补牌的节奏同样重要。双方各进攻一次，才算完成一轮；两次攻防之间不补手牌，轮末保留未用牌，再补到 8 张。因此，第一次出手时，就需要想着第二次交锋。

{% include royale-figure.html src="/img/blog/3card-royale/round-flow.svg" width="560" height="1000" diagram=true alt="进攻、回应、结算；达到 5 伤立即结束小局。否则交换攻守，再做一次攻防，轮末双方补到 8 张。" caption="图 10 · 一轮包含两次攻防；出现终局条件时立即停止。" %}

### 从 2 到 A，最后再赢一次

小局在一方达到 5 伤或以上时结束。赢家按照双方完整的终局伤势差升级。例如，对手最终 7 伤、你 2 伤，你就升 5 级；伤害不会在 5 截断。

升级最高到 A，但到 A 还要完成最后一次挑战：**由自己作为打级方，赢下自己的 A 局，才赢下整场。**打自己的 A 局累计失败三次，会回到 2 级；对手的等级保留。

每小局还有一张双方共用的花牌，也就是百搭牌。首局是 `♥2`，之后根据上一局赢家升级后的等级确定。例如赢家升到 7，下局双方都使用 `♥7`。花牌一局内固定，双方可以围绕同一个关键资源展开争夺。

隐藏的手牌、公开的伤牌、共同的花牌，以及攻守之间连续的资源选择，共同构成了深圳花牌的变化。

[完整规则](https://lucienzhu.github.io/3card-royale/rules.html?lang=zh-CN) · [A4 规则卡](https://lucienzhu.github.io/3card-royale/docs/shenzhen-flower-rules-a4.zh-CN.pdf)

## 4. 强化学习：从一个小基线开始
{: #rl}

做出可以玩的规则之后，我也想看看：一个模型会怎样学习这套游戏？

深圳花牌有隐藏信息，有随机发牌，也有连续的攻守和资源调整。一张牌现在打出去，影响的不只是这次比较，还有稍后的防守和下一轮组合。这些问题很适合放进一个可以反复运行、固定种子、比较策略的环境里。

项目提供了 Gymnasium 环境，也保留了可以训练、评估和部署的统一观察与动作接口。

规则核心与界面、策略分开。JavaScript、Python、Rust 和 C++ 各有独立实现，通过同一套回放校验；网页使用 JavaScript，Gym 与训练使用原生 Python 核心。

{% include royale-figure.html src="/img/blog/3card-royale/system-architecture.svg?v=godlike-scope1" width="560" height="884" diagram=true alt="标准规则对应四种原生核心，通过回放对齐；SDK／NN 策略只接收可见观察与合法动作。网页连接 JavaScript 与 ONNX，实验连接 Python、Gymnasium 与 PyTorch。" caption="图 11 · SDK／NN 的信息边界。Godlike 使用独立的明牌接口。" %}

目前网页里的 **NN AI 是行为克隆基线**：它学习 SDK Code AI 的动作选择。奖励驱动的强化学习训练，是在这份基线上继续探索的方向。

### 模型能看到什么，怎样选动作

NN 策略只能使用当前玩家有权知道的信息：自己的手牌、双方公开伤牌、弃牌、当前已出牌，以及阶段、等级、花牌和牌数等状态。它看不到对手暗手牌，也看不到牌堆顺序。

六个牌区，各按固定的 52 张牌顺序记 0/1。再加 6 维阶段编码和 18 维局面数值或标记，得到 **336 维当前状态**。没有循环记忆，也不输入整段对局历史。

{% include royale-figure.html src="/img/blog/3card-royale/observation-state.svg?v=values1" width="560" height="2434" diagram=true alt="真实换牌观察的完整编码：六组 52 维牌区、全部六个阶段位，以及其余 18 项状态的原始值、入模值和归一化公式。你是席位 1，对手是席位 0。" caption="图 12 · 同一份真实换牌样本的全部状态。牌区可有多个 1（multi-hot）；阶段只有一个 1（one-hot）；其余为归一化数值或 0/1 标记。" %}

本例是第 1 局第 4 轮，你是席位 1，还剩 2 次换牌机会。等级和冲 A 失败数按固定席位 0/1 排列；身份与伤牌数则相对于“你”。例如，牌堆剩 29 张编码为 `29 / 52 ≈ 0.557692`，“轮到你行动”编码为 `1`；当前任务是小局，所以“整场任务”为 `0`。图中的序号和公式与[实际编码器](https://github.com/lucienzhu/3card-royale/blob/428df779a6335c5c1d7bf350637646324c6fda8b/sdk/features.js)一致。

合法动作会随着牌和阶段变化。环境为当前决策生成候选动作，每个候选用 **72 维特征**表示。Gym 接口最多提供 512 个候选槽位，并用合法动作掩码排除空槽。

模型为每个合法候选评分，选择最高分。两层隐藏层分别为 256 和 128，使用 ReLU；所有候选共享同一个网络。512 是候选容量，动作索引的含义由当次候选表决定，下一次决策会重新生成。

{% include royale-figure.html src="/img/blog/3card-royale/policy.svg" width="1100" height="488" alt="当前状态 336 维加候选动作 72 维，经过 256 和 128 两层隐藏层，得到一个动作分数。" caption="图 13 · 上线策略的结构。模型只给当前合法候选评分，不使用对手的隐藏信息。" %}

### 先让 SDK Code AI 对弈 10,000 局

训练的第一步，是让两席 SDK Code AI 完成 **10,000 个小局**，记录双方的决策，得到 **252,859 条样本**。

数据按完整小局划分为 8,000 局训练、1,000 局验证和 1,000 局测试。同一局的双方决策始终放在同一个集合，避免把高度相关的局面拆到训练和测试两边。

模型用 PyTorch 训练，TensorBoard 记录训练与验证的损失、动作一致率等曲线，按验证集损失选择 checkpoint。

{% include royale-figure.html src="/img/blog/3card-royale/training-loss.svg" width="708" height="319" alt="256 到 128 模型的训练与验证交叉熵曲线，验证损失在第 5 个 epoch 最低。" caption="图 14 · 已保存的十轮训练记录。第 5 个 epoch 的验证损失最低，因此保留这一 checkpoint。继续降低训练损失，没有继续改善验证损失。" %}

最终上线模型有 **137,729 个参数**，ONNX 权重约 **0.55 MB**。留出测试集上，与 SDK Code AI 的动作一致率为 **89.36%**。动作一致率说明模仿得有多接近；实际能赢多少，还需要单独对战。

### 和 SDK Code AI 打，结果如何

五个模型使用同一批训练数据，另加无需训练的随机策略，以及最多比较 64 个候选的 Easy AI。七种策略都使用相同的 500 个评估种子与 SDK Code AI 对战，交换席位并平衡先攻，从 2 级开始，每种评估 1,000 小局。

{% include royale-figure.html src="/img/blog/3card-royale/win-rates.svg?v=sdk-baseline1" width="677" height="425" alt="对 SDK Code AI，随机策略胜率 0.1%，64 候选的 Easy 为 36.1%，五个模型为 45.0% 至 46.5%，上线模型为 46.2%。" caption="图 15 · 同一对手、相同种子，每种策略 1,000 局，横轴为 0–100%。五个模型间的小幅差异不足以证明强弱。" %}

| 策略 | ONNX 大小 | 延迟 p95 | 对 SDK Code AI 胜率 |
| --- | ---: | ---: | ---: |
| 随机策略 | — | — | 0.1% |
| Easy · 64 | — | — | 36.1% |
| 64 → 32 | 0.11 MB | 0.3 ms | 45.2% |
| 128 → 64 | 0.24 MB | 1.9 ms | 46.0% |
| **256 → 128** | **0.55 MB** | **1.1 ms** | **46.2%** |
| 256 → 512 | 0.95 MB | 1.8 ms | 46.5% |
| 512 → 256 | 1.37 MB | 2.0 ms | 45.0% |
{: .royale-policy-results }

随机策略从合法候选中均匀抽取，包括换牌和跳过，最终 **1 胜、999 负**，无截断、无非法动作；两次完整运行的记录一致。它无需 ONNX，神经网络推理延迟不适用。[实验与复现](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/training/README.md#uniform-random-baseline) · [原始记录](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/docs/experiments/nn-policy-v1/random-baseline.json)。

Easy 的 64 指候选出牌上限，不是网络层宽度。它无需 ONNX；此处尚未测量规则策略耗时。

神经模型延迟：Mac Chrome、单线程 WASM、FP32，对 220 个候选评分；预热 3 次后测量 100 次。仅计推理，不含下载、特征提取和界面等待。结果受浏览器与系统负载影响，手机端尚未实测。[原始记录](https://github.com/lucienzhu/3card-royale/blob/5f1b0fa79de4cdd1d9500d41cc3d53bc2190ca48/docs/experiments/nn-policy-v1/browser-profile.json)。

最高的 46.5% 与上线模型的 46.2%，在这次评估里只相差三局，不能据此认定前者更强。这次实验也没有显示出“模型越大，胜率就越高”的稳定趋势。数据、目标和决策方式，都值得和参数量一起考虑。

综合模型大小、实测延迟和对战表现，网页采用了 `256 → 128`。

训练完成后，模型导出为 ONNX，通过 JavaScript 在浏览器的 Worker 中运行。0.55 MB 指模型权重，另有单独缓存的 WASM 运行时。加载或推理失败时，游戏会回退到 Easy AI 并显示提示，让对局可以继续。

{% include royale-figure.html src="/img/blog/3card-royale/training-pipeline.svg" width="560" height="936" diagram=true alt="SDK Code AI 自对弈一万小局产生 252859 条决策；按整局划分训练、验证、测试，经 PyTorch 训练，以验证损失选择第 5 轮权重，导出 ONNX 进入浏览器 Worker。" caption="图 16 · 当前流程学习 SDK Code AI 的动作标签；胜负奖励驱动的 RL 是后续实验。" %}

### 四档难度，四种对手

前三档只看己方可见信息；超凡额外看到你的手牌：

| 难度 | 策略 | 选牌方式 |
| --- | --- | --- |
| 简单 | Easy AI | 最多看 64 个出牌候选；从牌堆换牌 |
| 中等 | NN AI | 上线的 256 → 128 MLP |
| 困难 | Code AI | 原牌桌策略，保留组合并评估换牌收益 |
| 超凡 | Godlike AI | 看当前双方手牌；不记已出牌 |

困难档使用原牌桌 Code AI：进攻比较牌力，防守优先少受伤、争取换牌机会，并考虑剩余牌能否组成好牌。换牌比较组合收益，可以盲换对手手牌、交换公开伤牌，也可以从牌堆抽牌。它只读取己方可见信息，不知道对手暗牌，也不向后搜索。

Easy 使用 SDK 基线的比较方式，但只抽取最多 **64** 个组合。防守时，如果存在不会立即输局的应对，就先排除致命选择；每次换牌机会都从牌堆抽牌。它会正常选牌，也会漏掉更好的组合。

这里需要区分两个策略：**SDK Code AI** 是固定的训练教师与实验基线；**网页困难档 Code AI** 是原牌桌策略。接入 NN 时曾误用 SDK 策略，现已修复。上方七种策略的历史结果仍保留原基线，方便复现。

恢复后的困难档，使用实际网页引擎、相同 500 个种子、交换席位并平衡先攻，各评估 1,000 小局：

| 策略 | 对困难档 Code AI 胜率 |
| --- | ---: |
| Easy · 64 | **31.5%**（315 / 1,000） |
| NN · 256 → 128 | **41.2%**（412 / 1,000） |
| SDK Code AI 基线 | **45.3%**（453 / 1,000） |

另保留 NN 对 SDK 的对照组，逐局复现此前的 462 胜（46.2%）。以上 4,000 局全部正常结束、无非法动作。[网页策略评估记录](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/docs/experiments/difficulty-v1/table-code-evaluation.json)。

Easy 对 NN 仍为 **44.1%**；此前对 SDK 的 36.1% 也没有改写。48 候选版本在同一批种子上分别为 39.0% 和 30.4%。64 是比较后选定的，因此这组种子不再是未参与选型的独立测试集。难度名称不代表实测真人难度。

[策略与复现](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/docs/DIFFICULTY.zh-CN.md) · [SDK 基线结果](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/docs/experiments/difficulty-v1/evaluation.json) · [48 候选历史结果](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/docs/experiments/difficulty-v1/evaluation-48.json)

### 明牌挑战：Godlike AI

Godlike 是另一个可选实验：它能看到你的当前手牌，但不读取弃牌历史或牌堆顺序。进攻时枚举自己的出牌和对方回应，选最坏应对下评分最好的一手；防守遍历合法出牌；换牌比较预期组合收益。它只优化当前步骤的启发式评分，不保证整局最优，盲换仍由规则随机抽牌。

对网页困难档 Code AI，Godlike **650 胜 / 1,000 小局，胜率 65.0%**。使用另一组 500 个独立种子，交换席位、平衡先攻，从 2 级开局。它有额外手牌信息，种子协议也不同，因此不与上面的 NN 基线作等信息比较。

Apple M1 / Node 24 上，决策 p95 为 **进攻 13.1 ms、防守 8.2 ms、换牌 30.1 ms**；这不是手机或浏览器延迟。网页在独立 Worker 中运行，失败时显示提示并回退到困难档 Code AI。

[策略与复现](https://github.com/lucienzhu/3card-royale/blob/1887d08e29e4e6cb88e646b43308f18e1b9a57d2/docs/DIFFICULTY.zh-CN.md) · [1,000 局原始记录](https://github.com/lucienzhu/3card-royale/blob/1887d08e29e4e6cb88e646b43308f18e1b9a57d2/docs/experiments/godlike-v1/evaluation.json)

### 下一步，让奖励指导学习

这份基线打通了从环境、数据、训练、评估到网页部署的流程，也留下了一个可比较的起点。

接下来可以从行为克隆权重出发，让策略通过胜负奖励继续学习。环境已经区分“小局”和“整场”任务：前者以一小局的胜负为目标，后者推进到冲 A 结束。当前上线模型按小局任务训练，尚未实现奖励驱动的 RL 训练器。

这两种目标可能带来不同的策略。某次防守能否改善后续局面？是否值得冒险追求更大的终局伤势差？面对不同对手，怎样调整资源分配？这些都值得通过实验继续回答。

复现也属于这个起点的一部分。训练数据压缩后约 112.5 MB，因此仓库保存固定种子、生成配方、依赖、校验值和实验报告，数据由 SDK Code AI 自对弈重新生成；最佳 ONNX 则直接进入版本控制，供网页使用。在记录的环境中，数据和上线模型已经完成逐字节一致的复现。

[RL 页面与 checkpoint](https://lucienzhu.github.io/3card-royale/rl.html?lang=zh-CN) · [实验记录](https://github.com/lucienzhu/3card-royale/tree/v1.0.0/docs/experiments/nn-policy-v1) · [训练与复现](https://github.com/lucienzhu/3card-royale/blob/v1.0.0/training/README.md)

## 5. 体验：打开网页，先打几局
{: #play}

规则本身可以用实体扑克进行双人对战。当前网页试玩提供的是人机对局，免费，无需注册，手机和桌面都可以打开。

新玩家默认 **Easy AI**。切换难度或体验神经网络模型，可以进入：

> 设置 → 偏好 → 难度 → 简单 / 中等 · NN AI / 困难 / 超凡 · Godlike AI（明牌）

首次进入会显示一页引导：**起手 8 张，从手牌和公开伤牌中混选 3 张，进攻一次、防守一次；5 伤输局。** 图中用两张手牌和一张伤牌组成一手，让第一次选牌就有方向。

同一浏览器记住已看状态，下次不再自动弹出；在 **设置 → 偏好 → 新手引导** 中可以重看或关闭。完整规则和进阶教学仍在「规则」里。

一小局结束后，可以从三个角度回看：**本局回顾**按顺序看完全部攻防，**决胜现场**看最后一手和最终伤势差，**高光一手**找出最大伤害或最大的牌型。喜欢哪一段，就分享对应的 PNG。

{% include royale-figure.html src="/img/blog/3card-royale/share-recap-preview.svg" width="1080" height="1440" alt="本局回顾" caption="图 17 · 本局回顾。种子 19，13 次攻防。此处展示长图顶部，点开查看完整过程。" full="/img/blog/3card-royale/share-recap.svg" %}

{% include royale-figure.html src="/img/blog/3card-royale/share-finish.svg" width="1080" height="1440" alt="决胜现场" caption="图 18 · 决胜现场。种子 19，13 次攻防。" full="/img/blog/3card-royale/share-finish.svg" %}

{% include royale-figure.html src="/img/blog/3card-royale/share-highlight.svg" width="1080" height="1440" alt="高光一手" caption="图 19 · 高光一手。种子 19，13 次攻防。" full="/img/blog/3card-royale/share-highlight.svg" %}

项目的源码、规则、设计规范、环境和模型资料都已经开放。可以来玩，也可以带着自己的策略、模型或者规则想法继续尝试。

我希望深圳花牌最后能成为这样一个游戏：两个人随时可以开始，几局之后，对彼此的打法多一点了解；结束时，还记得其中一手牌。

**一副牌，两个人，三张牌，打出花。**

[开始玩](https://lucienzhu.github.io/3card-royale/?lang=zh-CN) · [RL 与策略基线](https://lucienzhu.github.io/3card-royale/rl.html?lang=zh-CN) · [GitHub](https://github.com/lucienzhu/3card-royale)
