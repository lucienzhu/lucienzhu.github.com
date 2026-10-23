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
---

*Adapted from my September and December 2021 product notes, edited in October 2026. The Ultra image below illustrates subsequent prototype work; the other game concepts are presented as design ideas.*

Working on game bots made me interested in a larger design question: what games would we make if the behavior of AI agents became something players could shape, share and play with?

An AI player can fill a missing seat, provide an opponent or help a match continue when someone leaves. Those are useful roles. I was especially curious about what would happen when players could influence the agent's goals, style and relationships with other characters.

## Give the player something to direct

A capable AI becomes a different design material when someone can give it a task. The player might select a destination, arrange a sequence of goals or ask a teammate to provide cover.

That connects to the [Neural Function](/updates/2021/10/neural-function/) and [YesSir](/updates/2021/10/yessir-language-and-teammates/) ideas we were exploring: expose a skill through an interface, then give a programmer, designer or player a way to call it.

The activity could involve training a team, choosing among different styles or adapting instructions after watching a match. The player's decisions would concern how the agents behave and how well they work together.

For that to be enjoyable, the behavior needs to be understandable enough to form expectations. Players should be able to recognize the effect of their decisions and have something interesting to change next time.

## A population can change the experience

My September notes used the phrase “GPU for GameCore” to ask what more computation could do for a game's logic and simulation. The interesting design question was the world that computation might support.

With many agents, an encounter can depend on relationships, resources and activity elsewhere in the world. Different populations or strategies can give a familiar environment a different rhythm.

[Neural MMO](https://www.aicrowd.com/challenges/the-neural-mmo-challenge) provided a concrete research setting for questions about survival, competition and teamwork among many agents. I was interested in what the same ingredients could offer a human player: a world with activity to join, respond to and influence.

Our subsequent work on [Ultra](/projects/ultra/) explored humans and AI sharing a multiplayer world of gathering, survival and combat. We also organized an AI esports event around the prototype.

{% include article-image.html src="/img/projects/ultra.jpg" alt="Ultra prototype characters sharing a real-time world of combat and exploration" width="1280" height="720" caption="Ultra, from subsequent 2022 prototype material: humans and AI participating in the same game world." %}

## A social role for your AI

One possibility in the December notes was an AI that could join friends when its player was absent. The group could have a shared experience that the absent person would hear about later.

That raises enjoyable design questions. Would friends recognize your AI's style? Could they help it improve? Would a story about what it did give everyone a reason to talk the next day?

The concept would need a clear relationship between the person and their agent. What can the player teach it, what can it do independently, and how does the group understand its participation?

That was a product idea in the notes, rather than a claim that we had completed an asynchronous social game.

## AI, building blocks and social play

Another idea was a kit of parts whose assembled bodies could learn to move or manipulate objects. Players could build, train, compare designs and exchange what they learned. A physical version might let them bring those creations to the same table.

Research such as [Evolution Gym](https://evolutiongym.github.io/), on jointly optimizing robot design and control, offered related inspiration. A research benchmark and a playable construction toy have different requirements, but the combination of a body and learned behavior is a rich material for design.

The appeal was the loop: make something, see what it can do, change it and show someone else. Learning could become visible through the thing the player had made.

## Begin with the activity people enjoy

The test I would apply to these concepts is practical. What does the player decide? What feedback makes the decision understandable? Why would they invite a friend or want another round?

The answers could lead to different kinds of games: directing a squad, preparing a team for a competition, inhabiting a lively world or teaching an assembled creature to move.

Those were the possibilities I wanted to explore. AI behavior could give players another material to create with, and another reason to play together.

References retained from the original notes: [The Neural-MMO Challenge](https://www.aicrowd.com/challenges/the-neural-mmo-challenge) · [Evolution Gym coverage collected at the time](https://mp.weixin.qq.com/s/P1_-aYUcQstbH4tlOUhbcg) · [Evolution Gym project](https://evolutiongym.github.io/).
