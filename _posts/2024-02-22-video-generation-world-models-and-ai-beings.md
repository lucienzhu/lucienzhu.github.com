---
layout: post
title: "Sora Is Here. How Far Away Are AI Beings?"
date: "2024-02-22 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
show_url: true
tags: [blog]
update_id: video-generation-world-models-and-ai-beings
summary: "What a video generator must preserve before its predictions can help an agent plan and act."
permalink: /updates/2024/02/video-generation-world-models-and-ai-beings/
last_modified_at: "2026-10-24 00:00:00 +0800"
---

A character reaches a damaged bridge. Crossing is faster; taking a detour may be safer. A model that imagines what happens next could help make this decision, provided its predictions preserve the consequences of each action.

That is the connection between video generation and game AI raised by Sora's February 2024 report, [Video generation models as world simulators](https://openai.com/index/video-generation-models-as-world-simulators/). Generating a plausible continuation is an impressive capability. Using one to choose an action adds a different set of requirements.

## Predict the consequences that matter

Games with explicit rules provide convenient simulators. An agent can compare moves and examine their consequences. In a real environment, observations are partial, dynamics are uncertain and trial and error may be costly.

A learned world model offers predictions from experience. Those predictions can concern future observations, rewards or compact internal states that help choose actions.

For the bridge decision, a planning model needs to preserve whether the character can cross, what crossing costs and how the alternative changes the task. Extra visual detail helps when it carries information relevant to those consequences.

## Connect predictions to actions

Sora's report explored broader simulation through video generation and documented limitations in physical interaction and consistency. Those limitations matter to agents because small errors can change which action is preferable.

Three requirements become especially important. Predictions need to respond to the actions the agent could take. Relevant objects and task states need to persist across time. The system needs a way to assess uncertainty when comparing possible continuations.

A bridge that changes shape between frames can spoil a video. A bridge whose predicted strength changes arbitrarily can invalidate a plan. Evaluation must test the features on which the decision depends.

## A world model can take different forms

[World Models](https://worldmodels.github.io/), by David Ha and Jürgen Schmidhuber, explored compact learned environment models and training a controller in a generated dream environment. [MuZero](https://arxiv.org/abs/1911.08265) combined learned dynamics with search, predicting quantities useful for planning without reconstructing every pixel.

These approaches illustrate a central design choice: what must the model predict for a particular task? A navigation agent may need reachability and travel cost. A team-game agent may also need consequences for teammates and shared resources.

The desired-state interface proposed in [Neural Function](/updates/2021/10/neural-function/) raises a related question. Once a goal can describe a future configuration, a model could help compare routes toward it. The contribution has to be demonstrated through better decisions under the task's constraints.

## Give an AI being a continuing role

“AI being” is a product metaphor here: an agent that perceives, acts and communicates while maintaining a continuing role in an environment. A game companion, a character in a persistent world or a robot working alongside people would each need a different version of that continuity.

{% include article-image.html src="/img/blog/ai-beings/concept.png" alt="Concept illustration of researchers looking toward an imagined silicon-based AI being in space" width="1792" height="1024" caption="Concept illustration of a future AI being." %}

For a companion, it may mean remembering a shared objective and responding coherently as the situation changes. For a robot, predictions have to connect to the physical effects of its actions. In both cases, useful behavior depends on perception, control and feedback working together.

A practical next step is to choose a bounded task and measure whether prediction improves action: fewer failed routes, better use of resources or more reliable coordination. That is how a generative component can earn a place in a system people interact with.

## Further reading

- [Game Emulation via Neural Network](https://madebyoll.in/posts/game_emulation_via_dnn/): an interactive Pokémon overworld experiment.
- [Runway: Introducing General World Models](https://research.runwayml.com/introducing-general-world-models).
- [World Models](https://worldmodels.github.io/) · [Sora's February 2024 technical report](https://openai.com/index/video-generation-models-as-world-simulators/).
