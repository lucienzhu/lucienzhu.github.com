---
layout: post
title: "Game AI: From Models to Systems"
date: "2021-08-20 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
show_url: true
tags: [blog]
update_id: game-ai-from-models-to-systems
summary: "Separating decisions from skills, and giving game developers useful ways to compose AI behavior."
permalink: /updates/2021/08/game-ai-from-models-to-systems/
---

*Adapted from my April and August 2021 notes. Edited for this website in October 2026; the architecture below describes the design direction at the time.*

After working on several game AI integrations, I kept encountering the same difficulty: a model could play a game well, yet making its behavior useful to a game developer required a great deal of additional work.

Different games exposed different observations, actions, timing and design constraints. A unified platform would have to find abstractions that survived those differences. Simply putting several trained models behind one service would leave much of the integration problem unsolved.

The useful starting point, I thought, was to separate decisions from the skills that carry them out.

## Decide what to do, then call a skill

The decision layer chooses a task: move toward a destination, rescue a teammate, collect a resource or defend a position. The functional layer provides the operations needed to carry it out.

Those operations can exist at different levels. A basic action might specify a movement direction. A higher-level function might mean “reach this position,” using a pathfinding algorithm or a learned controller underneath.

The interface is valuable because it lets the caller express an intention without managing every movement. Its parameters might include a destination, a target or a condition such as staying alive along the way.

{% include article-image.html src="/img/blog/game-ai-systems/architecture-notes.png" alt="Handwritten game AI architecture notes separating decision logic, functional APIs and primitive actions" width="1810" height="1922" caption="My August 2021 architecture sketch. Open the original image to read the annotations." %}

## Different games need different schedules

A decision does not always happen on the same clock. A player can issue a command through language or an input device. A real-time controller can update repeatedly. A turn-based game can call its AI when a turn or event arrives.

This matters when designing a reusable interface. The surrounding game must know when a skill starts, whether it is still running and what happens when another task takes priority.

The decision layer can also take different forms. A behavior tree can express a clear sequence of conditions and tasks. A neural policy can handle decisions involving many interacting observations. A state machine can organize longer activities while a learned policy handles local control.

The choice should follow the behavior we need and the degree of control a designer wants over it.

## Composition has to earn its place

Task decomposition is useful when the pieces remain meaningful. In a survival game, selecting a destination and handling movement along the way may form a useful division. In tightly coupled combat, an end-to-end policy may be easier to train and preserve than an artificial collection of tiny skills.

The questions I wrote down were practical ones. Can a designer change one part of the experience? Can we inspect why a task failed? Can a skill be reused under a different goal? Where do interfaces make the system easier to understand, and where do they get in the way?

A library of functions would need tools around it: code for programmers, a node graph for designers and perhaps language for players. Each interface would give a different person a way to compose behavior.

## The platform can become part of the game

My April notes also explored a product possibility. If a platform lets people train, select and arrange AI characters, those activities could become content themselves. People could compete through their agents, play alongside them or watch their strategies develop.

That made the engineering problem more interesting. A well-defined skill interface could support both game production and new ways of playing.

The connection to today's agents is easy to see when revisiting these notes: someone expresses a goal, a decision process selects a capability, and the system executes it while observing what happens. Games gave us a concrete place to explore that loop.

Related notes: [Neural Function](/updates/2021/10/neural-function/) · [YesSir: Giving AI Teammates Instructions](/updates/2021/10/yessir-language-and-teammates/).
