---
layout: project-story
title: Flatland · Multi-agent railway coordination
period: "2022"
section: projects
extra_css:
- /css/project-detail.css
---

Railway scheduling and multi-agent path finding are classic operations research and combinatorial optimization problems. Trains must share tracks and junctions under timetable constraints, avoiding conflicts and deadlocks. Planning, search and replanning are established approaches to these problems.

Co-authored *Multi-Agent Path Finding via Tree LSTM*, an early exploration of learned policies as an alternative in Flatland. The key innovation was applying Tree LSTM to branching rail observations, combined with reward shaping, phased training and centralized coordination, so agents could learn cooperative scheduling through simulation.

The paper reports a Flatland3 score of **125.3**, compared with **27.9** for the best reinforcement learning entry in the 2021 challenge. This placed the method between the second- and third-ranked operations research entries in the paper’s comparison, demonstrating a competitive learning-based route to a classical scheduling problem.

The archived demonstrations below show an early policy and a later policy on the same test scenario.

<div class="project-demo-pair">
  {% include project-video.html id="demo" src="/media/projects/flatland-early.mp4" poster="/img/projects/flatland-early.jpg" width="754" height="880" label="Early policy: trains encounter conflicts and deadlocks." %}
  {% include project-video.html id="trained-policy" src="/media/projects/flatland-trained.mp4" poster="/img/projects/flatland-trained.jpg" width="754" height="880" label="After phased training: more trains reach their destinations in the same scenario." %}
</div>

These are historical experiment recordings. Individual examples illustrate behavior; their arrival rates are not aggregate benchmark results.

[Paper](https://arxiv.org/abs/2210.12933) · [Code](https://github.com/RoboEden/flatland-marl)
