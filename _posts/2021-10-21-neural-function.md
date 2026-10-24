---
layout: post
title: "Neural Function: Learned Skills as Callable APIs"
date: "2021-10-21 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
show_url: true
tags: [blog]
update_id: neural-function
summary: "A callable interface for goal-conditioned skills: inputs, feedback and the limits of composing learned behavior."
permalink: /updates/2021/10/neural-function/
last_modified_at: "2026-10-24 00:00:00 +0800"
---

A game character may know how to move and fight, yet offer a designer no convenient way to ask for a particular outcome. Exposing a learned skill through a small interface makes that capability easier to use: give it an observation and a goal, then receive the next action.

I called this abstraction **Neural Function** while working on game AI in 2021. A goal-conditioned FPS controller provided a concrete starting point: the upper layer chose a destination, while the controller handled movement and combat along the way.

The proposed interface is `action, info = skill(obs, goal)`.

## A skill runs inside a feedback loop

Reaching a destination takes more than following a static route. Obstacles move, enemies appear and a teammate may suddenly need help. The skill is called repeatedly with the latest observation. Each call supplies an action; the environment advances; the caller can keep or replace the goal.

{% include article-image.html src="/img/blog/neural-function/skill-interface.svg" alt="Observation and goal enter a learned skill, which returns an action and diagnostics; the environment supplies the next observation" width="960" height="360" caption="The Neural Function interface: update the observation and goal, receive an action and inspect the result." %}

The surrounding system manages interruption, resumption and task priority. A fixed network makes the work per inference easier to estimate, although actual latency still depends on the model, hardware and runtime.

The `info` output can contain a value estimate, a progress signal or an auxiliary prediction. These outputs help inspection when their meaning has been tested against behavior. A plausible number alone is a poor basis for deciding that a task is going well.

## Compose goals above the controller

A common call format lets several interfaces use the same capability. Code can invoke it directly. A behavior tree can arrange tasks. A language interface can translate “cover me” into a target and relevant constraints.

This connects to goal-conditioned learning, including [Universal Value Function Approximators](https://proceedings.mlr.press/v37/schaul15.html), which condition values on both state and goal. The software question is how to make such capabilities available to a game production workflow.

The contract still needs game-specific observation and action adapters, training and evaluation. Reuse begins with concrete skills that work; a shared function signature by itself does not supply transferable behavior.

## Beyond coordinates: desired states

A destination is a limited description of success. “Rescue a teammate” also depends on whether the teammate survives and reaches a useful position. In a July 2023 follow-up, NeuralFunction++, I proposed conditioning skills on desired states rather than only target positions.

Visual-goal navigation work such as [ViNT](https://arxiv.org/abs/2306.14846) illustrates the value of considering different goal representations. The proposal also considered [Decision Transformer](https://arxiv.org/abs/2106.01345) and predicting subsequent states alongside actions. [Perceiver IO](https://arxiv.org/abs/2107.14795) offers related work on flexible structured inputs and outputs.

These choices introduce different learning problems. A goal-conditioned policy can act toward a target without explicitly simulating the future. Adding state prediction introduces another objective whose contribution to planning or robustness has to be established experimentally.

## Judge the interface by what it enables

A useful skill contract lets a caller specify an achievable goal, observe meaningful progress and change course when circumstances demand it. That is the test for Neural Function as a system abstraction.

For developers, it offers a way to combine trained behavior with authored decisions. For players, it could put a capable controller behind a compact command. The important gain is control over intentions at a level people can understand.

Related articles: [Game AI: From Models to Systems](/updates/2021/08/game-ai-from-models-to-systems/) · [YesSir](/updates/2021/10/yessir-language-and-teammates/).
