---
layout: project-story
title: Flatland：多列车协同调度与路径规划
period: "2022 年"
section: projects
extra_css:
- /css/project-detail.css
---

作为论文《Multi-Agent Path Finding via Tree LSTM》的共同作者，参与研究共享铁路网络中的多列车强化学习调度。每列车需要在共用轨道和道岔的情况下到达目的地，局部决策冲突可能造成拥堵，甚至形成无法自行解除的死锁。

方案结合 Tree LSTM 编码的树结构观测、分阶段训练、奖励塑形与集中控制。下面两段历史演示展示同一测试场景中的早期策略与后期策略。

<div class="project-demo-pair">
  {% include project-video.html id="demo" src="/media/projects/flatland-early.mp4" poster="/img/projects/flatland-early.jpg" width="754" height="880" label="早期策略：列车出现冲突和死锁。" %}
  {% include project-video.html id="trained-policy" src="/media/projects/flatland-trained.mp4" poster="/img/projects/flatland-trained.jpg" width="754" height="880" label="分阶段训练后：同一场景中有更多列车完成到站。" %}
</div>

视频为历史实验记录，单个案例用于展示行为差异，其中的到站率不代表整体基准成绩。

[论文](https://arxiv.org/abs/2210.12933) · [代码](https://github.com/RoboEden/flatland-marl)
