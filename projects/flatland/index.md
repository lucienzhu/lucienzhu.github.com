---
layout: project-story
title: Flatland · Multi-agent railway coordination
period: "2022"
section: projects
extra_css:
- /css/project-detail.css
---

Co-authored *Multi-Agent Path Finding via Tree LSTM*, a reinforcement learning approach to coordinating trains on a shared rail network. Each train must reach its destination while sharing tracks and junctions with other trains; conflicting decisions can cause congestion and irreversible deadlocks.

The solution combines tree-structured observations encoded by Tree LSTM, phased training, reward shaping and centralized control. The archived demonstrations below show an early policy and a later policy on the same test scenario.

<div class="project-demo-pair">
  {% include project-video.html id="demo" src="/media/projects/flatland-early.mp4" poster="/img/projects/flatland-early.jpg" width="754" height="880" label="Early policy: trains encounter conflicts and deadlocks." %}
  {% include project-video.html id="trained-policy" src="/media/projects/flatland-trained.mp4" poster="/img/projects/flatland-trained.jpg" width="754" height="880" label="After phased training: more trains reach their destinations in the same scenario." %}
</div>

These are historical experiment recordings. Individual examples illustrate behavior; their arrival rates are not aggregate benchmark results.

[Paper](https://arxiv.org/abs/2210.12933) · [Code](https://github.com/RoboEden/flatland-marl)
