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
last_modified_at: "2026-10-24 00:00:00 +0800"
---

A model can play a game well and still be difficult to build a game around. A designer needs to change an encounter, interrupt a task or understand why a character failed. A policy that returns actions provides only part of that control.

In game AI integrations, I repeatedly encountered this gap between a capable model and a usable system. A useful starting point is to separate the decision about what to do from the skill that carries it out.

## Give intentions an interface

Consider a teammate sent to rescue a player. The decision layer selects the task, the player and its priority. A movement or combat skill handles the actions needed along the way. The caller expresses a goal such as reaching a position while staying alive; it does not have to specify every turn and step.

The skill can use pathfinding, a learned controller or a combination of both. What matters to its caller is a clear contract: what information it needs, what it can do, and how the system can tell whether the task is progressing.

{% include article-image.html src="/img/blog/game-ai-systems/architecture-notes.png" alt="Handwritten game AI architecture notes separating decision logic, functional APIs and primitive actions" width="1810" height="1922" caption="Game AI architecture sketch, August 2021: decisions, skill interfaces and primitive actions." %}

This separates two kinds of change. A designer can change when rescue should take priority without retraining locomotion. A controller can improve its handling of obstacles while preserving the interface used by the decision layer. The separation earns its place when those changes can actually be made independently.

## Decide when decisions happen

Game systems run at different rhythms. A player issues an occasional command, a controller updates throughout a fight, and a turn-based game asks for a decision at a particular event.

A reusable skill interface therefore needs a lifecycle. The surrounding system must know when a skill starts, whether it is still active, how success or failure is reported, and what happens when a higher-priority task interrupts it. Without that information, composing several capable skills produces unpredictable behavior.

The decision layer can also take several forms. A behavior tree exposes conditions and task sequences; a state machine organizes longer activities; a learned policy handles decisions that depend on many interacting observations. Hybrid designs let developers choose where explicit control is valuable and where a trained response is more practical.

## Split tasks where the split helps

A larger skill library is not automatically a better architecture. Choosing a destination and navigating there may be a useful division in a survival game. Splitting a tightly coupled fight into many independently trained pieces can make coordination and debugging harder.

The practical test is whether a boundary helps someone change or understand the system. Can the designer tune a local encounter? Can the developer distinguish an unreachable goal from a poor controller? Can the same skill handle a new target without a new integration?

Tools matter as much as interfaces. Programmers need inspectable calls and diagnostics. Designers need ways to arrange tasks and review their outcomes. Players may need a much smaller interface, such as a command menu or a sentence.

## Composable behavior creates design options

Once behavior can be selected and arranged, it can become part of play. Players might prepare a team, assign roles or revise a strategy after watching a match. The same interface that helps developers construct a character can give players something meaningful to control.

This is also a useful way to approach agents beyond games: define the goal, expose a manageable set of capabilities, observe execution and make the next decision. Games make the engineering requirements especially visible. The environment keeps changing, interruptions are common, and a failure has to be understandable enough for someone to fix it.

Related articles: [Neural Function](/updates/2021/10/neural-function/) · [YesSir: Giving AI Teammates Instructions](/updates/2021/10/yessir-language-and-teammates/).
