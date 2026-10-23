---
layout: post
title: "When AI Becomes the Game"
date: "2021-12-22 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
show_url: true
tags: [blog]
update_id: ai-as-gameplay
summary: "From AI teammates to trainable game pieces, designing play around the behavior of agents."
permalink: /updates/2021/12/ai-as-gameplay/
last_modified_at: "2026-10-24 00:00:00 +0800"
---

An AI opponent can keep a match running. Let players shape its behavior, and it becomes something they can play with: a team to train, a companion to direct or a creature to teach.

That changes the central design question. What decisions does the player make about the AI, and what feedback makes those decisions interesting? A stronger agent gives a game more possibilities only when people have meaningful ways to influence and understand it.

## Build a loop around behavior

Consider a game in which players prepare a squad, watch it compete and change their instructions for the next match. The decisions might concern roles, destinations or responses to an opponent. A satisfying loop lets players form a hypothesis, see what happened and make a useful adjustment.

The interfaces explored in [Neural Function](/updates/2021/10/neural-function/) and [YesSir](/updates/2021/10/yessir-language-and-teammates/) provide possible building blocks: expose a skill, give it a goal and observe its execution. A game can then put those controls in players' hands.

Readable behavior is essential. If the team wins for reasons the player cannot see, there is little to learn from changing a strategy. If every instruction dictates a fixed outcome, there is little left to discover. The design has to leave room for surprises while making the consequences of a choice recognizable.

## Give a population something to do

A larger population can make a familiar map behave differently. Agents compete over resources, occupy routes and alter the conditions that other participants encounter. Their activity gives players situations to join and decisions that matter beyond a single fight.

[Neural MMO](https://www.aicrowd.com/challenges/the-neural-mmo-challenge) provides a research environment for studying survival, competition and cooperation at that scale. Turning such activity into a game for people adds another requirement: players need to understand what they can influence and why they should care.

Our later [Ultra](/projects/ultra/) work explored a multiplayer world where people and AI shared gathering, survival and combat. The team also organized an AI esports event around the prototype.

{% include article-image.html src="/img/projects/ultra.jpg" alt="Ultra prototype characters sharing a real-time world of combat and exploration" width="1280" height="720" caption="Ultra prototype, 2022: humans and AI sharing a world of gathering, survival and combat." %}

Additional simulation is useful when it creates encounters, relationships or changing conditions that players can notice. The number of agents or amount of computation is a poor substitute for that experience.

## Give an agent a social role

One possible design is an AI that joins a friend's game while its player is absent. Its behavior could carry a recognizable style, and the session could produce a story to share afterward.

For that idea to work, the game would need to define what the absent player has delegated. Which choices belong to the agent? Can friends teach or help it? What consequences should carry back to its owner? These rules shape the relationship as much as the controller does.

The appeal lies in having something that connects one person's choices to another person's play. A character's presence alone does not establish that connection.

## Let players build something that learns

Another design direction combines modular bodies with learned behavior. Players assemble a creature, train it to move or manipulate an object, then compare and revise their designs.

Research such as [Evolution Gym](https://evolutiongym.github.io/) explores the joint design of morphology and control. A playable construction toy would need its own accessible feedback: show which part of a body or training setup helped, and make the next experiment easy to try.

The resulting loop is tangible: build, observe, adjust and share. Learning becomes visible through something the player made. A physical version could also give people a reason to bring their creations to the same table.

## Start with the player's next decision

These directions lead to different games, but share a practical test. After watching the AI act, can the player identify a choice worth making next? Can they explain that choice to a friend, try it and see a consequence?

Those moments give AI behavior a place in the game loop. They turn a technical capability into a material for strategy, creation and social play.

References: [Neural-MMO Challenge](https://www.aicrowd.com/challenges/the-neural-mmo-challenge) · [Evolution Gym coverage](https://mp.weixin.qq.com/s/P1_-aYUcQstbH4tlOUhbcg) · [Evolution Gym project](https://evolutiongym.github.io/).
