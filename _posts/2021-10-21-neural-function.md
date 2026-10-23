---
layout: post
title: "Neural Function: Learned Skills as Callable APIs"
date: "2021-10-21 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
show_url: true
tags: [blog]
update_id: neural-function
summary: "A 2021 idea for composing goal-conditioned skills, extended in 2023 from target positions to desired states."
permalink: /updates/2021/10/neural-function/
---

*Based on my October 2021 NeuralFunction notes, with a July 2023 follow-up. Edited for this website in October 2026.*

In 2021, work on game AI led me to a software interface question: could a learned skill be called as naturally as an ordinary function?

Our FPS work provided a concrete example. A goal-conditioned controller could receive the current game features and a destination, then choose the next movement or combat action. The upper layer could say where to go while the controller handled what happened along the way.

I called the building block a **Neural Function**. Its basic shape was simple: `action, info = skill(obs, goal)`.

## A skill that runs inside the game loop

Consider reaching a destination. A path gives us a route, but moving through a live game also involves obstacles, enemies, teammates and changing priorities.

The interface I had in mind would be called repeatedly. Each call would use the latest observation and goal to produce the next action. The game would advance, a new observation would arrive, and the caller could keep the goal or replace it.

{% include article-image.html src="/img/blog/neural-function/skill-interface.svg" alt="Observation and goal enter a learned skill, which returns an action and diagnostics; the environment supplies the next observation" width="960" height="360" caption="The Neural Function interface, redrawn from the 2021 design notes. The caller can update the goal as the environment changes." %}

That organization makes interruption and resumption an explicit part of the surrounding system. A fixed network can also make the work per inference more predictable, although actual latency still depends on the model, hardware and runtime.

The `info` output could include value estimates, progress signals or auxiliary predictions. These would give the caller something useful to inspect. Their meaning and reliability would need to be checked against actual behavior.

## Compose intentions above the controller

Once the goal is exposed through an interface, different callers can use the same skill. A programmer can invoke it from code. A designer can connect tasks in a behavior tree or node graph. A language interface can turn “cover me” into a target and a set of conditions.

For a larger task, the upper layer would select and schedule smaller objectives. The learned skill would handle the local response. The useful abstraction is the boundary between the intention and the actions that realize it.

This connects to earlier goal-conditioned learning research. [Universal Value Function Approximators](https://proceedings.mlr.press/v37/schaul15.html), for example, model value as a function of both state and goal. My focus in these notes was how to expose learned capabilities in a game development workflow.

A common calling convention would still need game-specific observation and action adapters, training and evaluation. The library would grow through concrete cases, with reusable abstractions emerging from what worked.

## July 2023: a goal can be more than a position

In 2023, I returned to the question of what a goal should contain. A coordinate describes a destination, but a task such as rescuing a teammate also concerns the teammate's condition and what should be true afterward.

The follow-up, which I called NeuralFunction++, explored conditioning on a **desired state**. A goal could describe a useful future configuration: a teammate nearby and alive, resources collected, or a formation preserved.

Work such as [ViNT](https://arxiv.org/abs/2306.14846), which uses visual goals for robot navigation, made alternative goal representations especially interesting. I also sketched combining goal-state conditioning with [Decision Transformer](https://arxiv.org/abs/2106.01345) and predicting subsequent states alongside actions.

These were research proposals. A goal-conditioned policy can act toward a target without explicitly simulating the future. Adding state prediction would create another learning objective; whether it improved planning, robustness or exploration would require experiments.

## The part that still interests me

The enduring idea is making a learned capability useful to its caller: give it a goal, let it respond to the current situation, observe the result and decide what to do next.

That can connect a trained controller to a designer's tool or a player's words. It is a small interface with an interesting consequence: people can begin composing behavior from skills they did not have to program action by action.

Related notes: [Game AI: From Models to Systems](/updates/2021/08/game-ai-from-models-to-systems/) · [YesSir](/updates/2021/10/yessir-language-and-teammates/).

Further reading from the original notes: [Perceiver IO](https://arxiv.org/abs/2107.14795), on flexible structured inputs and outputs.
