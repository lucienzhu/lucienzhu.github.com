---
layout: post
title: "YesSir: Giving AI Teammates Instructions"
date: "2021-10-25 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
show_url: true
tags: [blog]
update_id: yessir-language-and-teammates
summary: "Turning a player's words into subgoals, with learned policies handling the actions along the way."
permalink: /updates/2021/10/yessir-language-and-teammates/
---

*Adapted from our team's October 2021 YesSir design notes, which I helped collate. Edited for this website in October 2026; the examples describe the proposed interactions and architecture.*

“Number two, come and help me.”

People playing a team game understand that sentence as more than a request to move. It names a teammate, gives an intention and refers to the current situation. What would it take for an AI teammate to respond usefully?

That was one of the questions behind YesSir, our exploration of a virtual game assistant. We wanted language to become a useful way to coordinate with game AI.

## Choose the moments when speech helps

Continuous voice control can be tiring. Fast, precise actions may also be easier with the controls a player already knows. The more interesting opportunity was a less frequent instruction that expressed a larger intention: send support, cover a route or help a teammate.

The player could keep controlling their own character while giving AI companions a task. This suggested a way to combine direct control with a wider team strategy.

The notes also considered looking up game information, changing settings, offering guidance and casual conversation. Those are different interactions, with different expectations. A helpful assistant would need to make its role clear in each one.

## From words to a subgoal

For an FPS example, we divided language understanding from moment-to-moment control.

Speech recognition would turn audio into text. Intent detection and slot filling would identify what the player wanted and whom they were addressing. Game state would resolve a phrase such as “me” to the speaker's current position. The system could then give the selected AI a subgoal.

{% include article-image.html src="/img/blog/yessir/language-to-subgoal.png" alt="YesSir design pipeline from speech recognition through intent and slot parsing to a subgoal for reinforcement learning control" width="681" height="238" caption="The FPS pipeline from our original design notes: language identifies a task; game context resolves its target; an RL policy controls the response." %}

For “number two, help me,” that would mean selecting the second AI, identifying the rescue intention and supplying the player's location as a destination. A learned policy would handle movement and the local decisions along the route.

It is a useful division because the player can express the purpose without spelling out every step. The control policy still needs to react to what happens in the game.

## Obedience and personality create different games

The notes distinguished two forms of interaction. In one, the AI is expected to follow the command as reliably as it can. In the other, the instruction influences behavior alongside the character's circumstances or personality.

A tactical assistant needs predictable responses. A fictional companion might sometimes disagree, hesitate or prioritize something else. Both can be interesting, but the player should understand which relationship the game is offering.

For MOBA games, we also considered feeding encoded dialogue and its history into the policy alongside game features. That was a proposal for letting conversation influence decisions more directly, with evaluation still needed to understand how reliably the policy would respond.

## The interaction is part of the game design

What interested me was the possibility of designing games around communication with AI companions. A player could control one character directly while coordinating a squad through language, or give a strategy and watch a team carry it out.

The technical pipeline would be one part of that experience. Feedback to the player, understandable behavior and a good reason to speak would matter just as much.

Related notes: [Neural Function](/updates/2021/10/neural-function/) · [Game AI: From Models to Systems](/updates/2021/08/game-ai-from-models-to-systems/).

## Examples collected in the original notes

These were reference material for the design exploration:

- [Don't Stop! Eighth Note](https://www.bilibili.com/video/BV1P54y1d7gx/) · [Voice-cast spells](https://www.bilibili.com/video/BV1Sf4y1r7sV/).
- [Tom Clancy's EndWar](https://www.bilibili.com/video/BV12s411D7tq/) · [Voice-magic example](https://www.bilibili.com/video/BV1Bs411v7Zn/) · [Lifeline](https://www.bilibili.com/video/BV1aW411H7HZ/).
- [Creating a voice assistant for FIFA](https://towardsdatascience.com/creating-voice-assistant-for-games-tutorial-for-fifa-71cfbe428bd1) · [Fridai](http://Fridai.ai).
