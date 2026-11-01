---
layout: "royale-article"
title: "深圳花牌：一副牌，两个人，三张牌，打出花。"
date: "2026-10-24 00:00:00 +0800"
author: "Xiaolong Zhu"
show_url: true
tags: ["blog"]
lang: "zh-CN"
summary: "从一副牌的双人对战、三角梅与绿色电路板，到神经网络基线与开放 AI 天梯。"
permalink: "/zh/updates/2026/10/3card-royale/"
alternate_url: "/updates/2026/10/3card-royale/"
article_url: "https://lucienzhu.github.io/zh/updates/2026/10/3card-royale/"
article_image: "/img/blog/3card-royale/cover.png"
extra_css: ["/css/royale-article.css?v=policy-audit-20261102"]
update_id: "3card-royale"
release_tag: "v1.1.0"
last_modified_at: "2026-11-01 00:00:00 +0800"
original_url: "/updates/2026/10/3card-royale/"
---

{% include royale-figure.html src="/img/blog/3card-royale/cover.svg" width="1200" height="640" alt="三张金牌与绿色电路板" caption="一副牌，两个人，三张牌，打出花。" %}

我想用一副普通扑克牌，做一个耐玩的双人对战游戏。

两个人，一副普通扑克牌，能很快开始；玩过几局之后，依然会遇到值得想一想的选择。运气带来变化，判断影响结果，对手的每一步都会改变自己的下一步。

这个想法慢慢变成了**深圳花牌（3Card Royale，aka Shenzhen Flower Cards）**：一个围绕三张牌展开的 1v1 游戏。进攻造成伤害，防守赢得换牌机会，受伤后留下的牌也能重新参与战斗。两个人从 2 级一路打到 A，最后赢下自己的 A 局，就算“开花”。

如今，它有了网页试玩、完整规则、深圳主题的视觉设计、可复现的神经网络基线，以及开放的 AI 天梯。可以来挑战一个策略，也可以提交自己的打法。

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

## 4. 强化学习：一个环境，不同策略
{: #rl}

隐蔽信息、随机发牌，以及攻守之间的资源取舍，让这副牌也适合研究策略。固定发牌、替换策略、重复对战，就能比较不同决策带来的结果。

GameCore 独立于界面与策略。JavaScript、Python、Rust、C++ 各有原生实现，使用共同回放检查一致性。网页与自对弈采集使用 JavaScript；Gymnasium 使用 Python 核心，PyTorch 从保存的样本训练。

{% include royale-figure.html src="/img/blog/3card-royale/system-architecture.svg" width="560" height="884" diagram=true alt="四种原生核心通过回放校验，策略只接收可见观察，网页与训练分别接入同一套规则。" caption="图 11 · 一套规则，共同接口。Godlike 使用单独标明的明牌接口。" %}

### 策略能看到什么

神经网络接收己方手牌、双方公开伤牌、弃牌、当前出牌与局面信息。**六个牌区各占 52 位**，按固定顺序标记每张牌是否存在；再加 **6 位阶段 + 18 项状态**，得到 **336 维观察**。两个模型都不读取对手暗牌、牌堆顺序或历史序列。

{% include royale-figure.html src="/img/blog/3card-royale/observation-state.svg" width="560" height="2434" diagram=true alt="实际换牌样本：六个 52 位牌区、六位阶段、其余 18 项状态，以及原值、入模值与归一化公式。" caption="图 12 · 完整的观察编码。牌区是 multi-hot，阶段是 one-hot；本例牌堆 29 张，编码为 29 / 52。" %}

### 含义固定，合法性随选择变化

所有策略都通过 **actions-v2** 提交一个完整动作。实体牌 ID 固定：按黑、红、梅、方排列，每种花色从 2 到 A。Token 0–51 对应这 52 张牌；52–54 是 `PLAY_3`、`PLAY_4`、`PLAY_5`；55–64 表示换牌、目标与流程操作。`PAD = 65` 只用于补齐序列。

三个 A 的出牌编码为 `PLAY_3 → A♠ → A♥ → A♣`。同一张牌不能重复，出牌统一按 ID 升序，点击顺序不影响表示。四张、五张须构成合法炸弹。换牌指定来源与去向；去向是可见牌区时，再指定目标牌。`SKIP` 用掉本次机会，`STOP` 放弃剩余机会。

**65 位条件 mask** 标记哪些 token 仍能组成完整合法动作。它随局面与已选前缀变化，token 的含义不变。Gym 接受补齐为六位的完整动作 `MultiDiscrete([66] × 6)`，每个完整动作只推进一次游戏。[动作协议与 Gym 用法](https://github.com/lucienzhu/3card-royale/blob/unify-action-space/docs/ACTIONS.md)。

{% include royale-figure.html src="/img/blog/3card-royale/structured-actions.svg" width="1000" height="650" alt="固定 token 编成三张牌或换牌动作；每步通过条件 mask 过滤，最终一次性提交完整动作。" caption="图 13 · 纯代码、整手评分、自回归，共用一个动作协议。" %}

### 两种决策建模

**整手评分**先枚举合法动作。共享 MLP 对每个「336 维状态 + 72 维动作特征」评分，取最高分。候选列表的位置可以变化，提交时转换为固定牌 ID。

**自回归**先决定操作，再逐个预测 token。共享 MLP 接收相同状态与 396 维前缀编码，输出 65 个 token 分数，经 mask 过滤，最多六次调用完成一个动作。

| 策略 | 网络 | 参数 | ONNX |
| --- | --- | ---: | ---: |
| 整手评分 | 408 → 256 → 128 → 1 | 137,729 | 0.55 MB |
| 自回归 | 732 → 256 → 128 → 65 | 228,929 | 0.92 MB |

协议规定合法动作，不规定策略如何学习或搜索。两个模型目前都通过**行为克隆学习 SDK Code AI**；它是固定训练教师，与网页困难档 Code AI 不同。两者都还没有用奖励训练。整手评分还使用人工牌型特征，因此这不是只改变网络结构的对照实验。

### 训练与复现

两套配方各采集 **10,000 小局** SDK 自对弈，按完整小局划分为 **8,000 训练 / 1,000 验证 / 1,000 测试**。整手评分有 252,859 条决策；自回归有 252,906 条决策、988,571 个目标 token。配方与种子不同，样本数也不同。

整手评分在合法完整动作之间计算交叉熵；自回归使用带 mask 的 teacher forcing，每个完整决策总权重相同。PyTorch 训练，TensorBoard 记录 train/val 曲线。按验证损失选择 checkpoint：整手评分第 **5** 个 epoch，自回归第 **16** 个。

{% include royale-figure.html src="/img/blog/3card-royale/structured-training.svg" width="1000" height="420" alt="自回归训练 40 个 epoch 的训练与验证损失，验证损失最低点为第 16 个 epoch。" caption="图 14 · 自回归训练曲线。按验证损失选模型，不用对战结果选模。" %}

整手评分在测试集上有 **89.36% 的整手动作一致率**；自回归的 **teacher-forced token 准确率为 90.44%**。两者不是同一种指标：给定正确前缀后预测 token，不等于独立生成完整动作。自回归的教师也没有提供 `SKIP`、`STOP` 的正例。

{% include royale-figure.html src="/img/blog/3card-royale/training-pipeline.svg" width="560" height="936" diagram=true alt="SDK Code AI 自对弈、按局切分、整手评分或自回归训练、验证选模，最后导出 ONNX 在浏览器运行。" caption="图 15 · 两种训练配方，通过同一动作协议接入评测与试玩。" %}

数据超过仓库 10 MB 的预算，因此保存确定性生成配方与哈希，不直接提交数据集。最佳 ONNX、训练记录、运行环境与评测结果均已保存。评估新训练的权重时，先注册新的不可变策略 ID 并本地验证；现成的基线评估命令读取的是仓库中的 checkpoint。[整手评分配方](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/training) · [自回归配方](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/training/structured)。

### 基线评估

下表每格 **1,000 小局**：同一组 500 个种子，交换座位、平衡先攻，从 2 级开始。**Code AI** 是网页困难档；**SDK Code AI** 是训练教师。共 **19,000 小局**，全部完成，无非法动作或截断。

{% include royale-figure.html src="/img/blog/3card-royale/win-rates.svg" width="864" height="576" alt="八种公开信息策略，在相同 500 个配对种子下对战网页 Code AI 与 SDK Code AI 的胜率。" caption="图 16 · 相同发牌，两个对手。每条柱为 1,000 局，横轴保留完整的 0–100%。" %}

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

延迟是各对手批次中最高的完整决策 p95，环境为 **Apple M1 / Node 22 / 单线程 WASM**。包含编码和全部推理调用，不含初始化与线程间通信，不代表手机表现。ONNX 大小只计权重；纯代码策略没有 ONNX 文件。[原始记录、哈希与复现](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/docs/experiments/complete-baseline)。

整手评分对困难档胜率 **42.6%**，自回归为 **23.9%**；直接对战中，自回归胜率 **28.8%**。统一协议让策略可以互换，不保证某种模型更强。不同评分网络之间的小幅差异不足以确定强弱。Godlike 可见对手手牌，不参与公开信息天梯。

另有 [11,000 局神经网络对照](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/docs/experiments/neural-baselines)，覆盖 Easy、Random 与已注册的 NN512 整手评分模型。它与上表重合 4,000 局，两套评测合计 **26,000 个不同对局**，不是 30,000。

接下来可以学习多个好动作的分布，或从现有 checkpoint 出发，用胜负奖励继续训练。Gym 支持小局与从 2 到 A 的整场任务；当前基线训练的是小局，奖励驱动的强化学习仍待实验。

## 5. 竞技场：带一个策略来打天梯
{: #arena}

一个游戏有趣，也因为不同的人会带来不同的打法。**Arena** 把这件事开放给代码：提交一个策略，获得基准 Elo，再让玩家在浏览器里挑战同一份策略。可以从几条判断规则开始，也可以训练一个网络。

[竞技场](https://lucienzhu.github.io/3card-royale/arena.html?lang=zh-CN) 把天梯、RL 环境和基线放在了一起。在榜单点「挑战」，或进入 **设置 → 偏好 → AI 对手 → 竞技场 AI**，就能挑选策略。每个条目都带作者的 GitHub handle。竞技场现有七个策略，包括代码策略、整手评分与自回归模型。

### 一个目录，两种策略

投稿放在 `policies/entries/your-policy-v1/`：版本声明、代码或权重、README，以及本地验证生成的回执。再把策略和 GitHub handle 加入注册表。修改策略时使用新 ID，让每个分数都对应实际评估过的那一版。

| 格式 | 接口 |
| --- | --- |
| JavaScript | `createPolicy → act(observation) → 完整结构化动作` |
| ONNX · `scoring-v2` | `state [B,336] + candidates [B,N,72] → 动作分数 [B,N]` |
| ONNX · `structured-v2` | `state [B,336] + prefix [B,396] → token 分数 [B,65]` |

两种 ONNX 模型和 JS 均声明 `royale-policy-v2` 与 `actions-v2`。各自的模型输出先映射成同一种完整语义动作，再统一校验。两种神经网络分别注册、独立评分；整手评分 256 → 128 保持为固定 Elo 基准。

两种策略都只能获得当前座位的信息：自己的手牌和公开牌，看不到对手暗牌或牌堆顺序。JS 可以在一小局内记忆公开观察；当前 ONNX 接口没有循环状态。**明牌 Godlike 不进天梯。**

纯代码策略无需训练。Python 等语言的策略可以先用 Codex 或 Claude Code 转成 JS，再用保存的观察样本核对动作一致性。单个策略文件不超过 5 MB。GitHub Pages 提供审核后的文件，浏览器 Worker 在玩家设备上执行；网页加载已注册的策略，不接受任意文件上传。

### 先验证，再在发版时评分

1. **本地：**运行 `npm run arena:validate`，再运行 `npm run arena:submit -- --policy your-policy-v1`。与 Code AI 打四小局，覆盖两个座位和先攻，把生成的 `validation.json` 一起提交。
2. **PR：**CI 重放这四局，核对结果、合法动作和运行时限。这里只验证能否对战，不算 Elo。
3. **发布：**审核合并后先显示「暂未评分」。发布 GitHub Release，或手动运行 **Publish Arena**，才为待评分策略打分、提交结果并重建 Pages，榜单随之自动更新。

{% include royale-figure.html src="/img/blog/3card-royale/arena-flow.svg" width="560" height="690" diagram=true alt="JS 或 ONNX 策略：本地四局验证，PR 重放检查，发布时六十局评分，自动更新天梯并供网页挑战。" caption="图 17 · 同一份策略用于本地评估和网页试玩；PR 验证与发布评分分开进行。" %}

每个新策略分别与三个固定基准 **Easy、NN256、Code AI 各打 20 小局**，共 60 局，从 2 级开始，交换座位并平衡先攻。加上重新验证的四局，每次发布是 **每个待评分策略 64 局**，不随已有策略数量增加。已有评分复用；玩家在网页上的胜负不影响 Elo。

三个基准固定在 **1387、1440、1500**。评估器用 Elo 胜率公式，一次拟合 60 局的结果；加入已声明的先验，避免全胜、全败产生无穷分数。这是**暂定的基准 Elo**，不使用逐局 K 值更新，也不受对局顺序影响。小分差不代表强弱已定；固定对手和公开种子也可能被针对优化。[完整算法与限制](https://github.com/lucienzhu/3card-royale/blob/main/arena/README.md)。

整手评分 **512 → 256** 获得暂定 Elo **1443**（30/60 胜）；自回归 **256 → 128** 为 **1237**（14/60 胜）。二者按同一固定基准面板评分；这 60 局天梯成绩与上面的 1,000 局基线评测分别统计。[评分记录](https://github.com/lucienzhu/3card-royale/tree/unify-action-space/arena/results/reference-elo-v1)。

[实时天梯](https://lucienzhu.github.io/3card-royale/arena.html?lang=zh-CN#ladder) · [接口与模板](https://github.com/lucienzhu/3card-royale/tree/main/policies) · [投稿指南](https://github.com/lucienzhu/3card-royale/blob/main/policies/README.zh-CN.md)

## 6. 体验：打开网页，先打几局
{: #play}

规则本身可以用实体扑克进行双人对战。当前网页试玩提供的是人机对局，免费，无需注册，手机和桌面都可以打开。

新玩家默认 **Easy AI**。在 **设置 → 偏好 → AI 对手** 中可以选择 Easy、NN、困难 Code、明牌 Godlike，或选择 **竞技场 AI** 体验已注册策略。NN AI 使用自回归模型；整手评分模型可在竞技场 AI 中选择。

第一次先练一小段：**8 张牌 → 三个 A 进攻 → 结算 → 同花防守 → 受 1 伤**，用受伤图标显示结果。正式首局再通过气泡提示，介绍伤牌也能出、换牌怎么选。

浏览器会记住完成状态。「新手引导」可以关闭，也能点「再练一次」。手机上可以划过多张牌进行选择；攻防结算后自动进入下一步，换牌等选择仍由你决定。

一小局结束后，可以从三个角度回看：**本局回顾**按顺序看完全部攻防，**决胜现场**看最后一手和最终伤势差，**高光一手**找出最大伤害或最大的牌型。喜欢哪一段，就分享对应的 PNG。

{% include royale-figure.html src="/img/blog/3card-royale/share-recap-preview.svg" width="1080" height="1440" alt="本局回顾" caption="图 18 · 本局回顾。种子 19，13 次攻防。此处展示长图顶部，点开查看完整过程。" full="/img/blog/3card-royale/share-recap.svg" %}

{% include royale-figure.html src="/img/blog/3card-royale/share-finish.svg" width="1080" height="1440" alt="决胜现场" caption="图 19 · 决胜现场。种子 19，13 次攻防。" full="/img/blog/3card-royale/share-finish.svg" %}

{% include royale-figure.html src="/img/blog/3card-royale/share-highlight.svg" width="1080" height="1440" alt="高光一手" caption="图 20 · 高光一手。种子 19，13 次攻防。" full="/img/blog/3card-royale/share-highlight.svg" %}

项目的源码、规则、设计规范、环境和模型资料都已经开放。可以来玩，也可以带着自己的策略、模型或者规则想法继续尝试。

我希望深圳花牌最后能成为这样一个游戏：两个人随时可以开始，几局之后，对彼此的打法多一点了解；结束时，还记得其中一手牌。

**一副牌，两个人，三张牌，打出花。**

[开始玩](https://lucienzhu.github.io/3card-royale/?lang=zh-CN) · [AI 天梯](https://lucienzhu.github.io/3card-royale/arena.html?lang=zh-CN) · [GitHub](https://github.com/lucienzhu/3card-royale)
