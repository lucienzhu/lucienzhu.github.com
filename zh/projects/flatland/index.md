---
layout: project-story
title: Flatland：多列车协同调度与路径规划
period: "2022 年"
section: projects
extra_css:
- /css/project-detail.css
---

铁路调度与多智能体路径规划是典型的运筹学与组合优化问题：列车需要在共享轨道、道岔和时刻约束下协调通行，避免冲突与死锁。传统路线通常依赖规划、搜索与重规划。

作为论文《Multi-Agent Path Finding via Tree LSTM》的共同作者，参与了 Flatland 场景中较早的强化学习替代方案探索，让 AI 从仿真交互中学习调度策略。创新点在于将 Tree LSTM 用于编码轨道分支形成的树结构观测，并结合奖励设计、分阶段训练与集中协同，学习多列车之间的协调决策。

论文报告，方案在 Flatland3 评测中取得 **125.3 分**，对照 2021 年竞赛最优强化学习方案的 **27.9 分**，得分介于论文对照表中第二名与第三名的运筹方案之间。这展示了学习型 AI 在经典调度问题上与领先运筹方法竞争的潜力，为传统求解提供另一条技术路线。

下面两段历史演示展示同一测试场景中的早期策略与后期策略。

<div class="project-demo-pair">
  {% include project-video.html id="demo" src="/media/projects/flatland-early.mp4" poster="/img/projects/flatland-early.jpg" width="754" height="880" label="早期策略：列车出现冲突和死锁。" %}
  {% include project-video.html id="trained-policy" src="/media/projects/flatland-trained.mp4" poster="/img/projects/flatland-trained.jpg" width="754" height="880" label="分阶段训练后：同一场景中有更多列车完成到站。" %}
</div>

视频为历史实验记录，单个案例用于展示行为差异，其中的到站率不代表整体基准成绩。

[论文](https://arxiv.org/abs/2210.12933) · [代码](https://github.com/RoboEden/flatland-marl)
