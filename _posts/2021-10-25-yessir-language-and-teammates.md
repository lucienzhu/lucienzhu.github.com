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
last_modified_at: "2026-10-24 00:00:00 +0800"
---

“Number two, come help me.”

A teammate hears a request, identifies who is speaking and interprets it against the current game. An AI needs the same connection between words and the world before the sentence can become useful behavior.

YesSir was a team design exploration in 2021, with which I helped organize the architecture. It considered a game assistant that could turn occasional spoken instructions into tasks for AI teammates.

## Give players a reason to speak

Speech is well suited to a larger intention: send reinforcements, cover a route or rescue a teammate. Constantly narrating small movements is tiring, especially when a familiar controller already handles them well.

A promising arrangement lets the player control one character directly while coordinating AI companions through occasional commands. The player can think about the squad without giving up immediate control of their own actions.

An assistant might also explain a mechanic, change a setting or answer a question. Each interaction needs a clear role and response. A tactical command requires a visible behavioral result; a request for information needs an answer that does not interrupt play unnecessarily.

## Ground language in the game state

For the FPS design, we separated language interpretation from real-time control. Speech recognition produces text; intent and slot parsing identify the request and addressee; game state resolves references such as “me” into an actual player and position.

{% include article-image.html src="/img/blog/yessir/language-to-subgoal.png" alt="YesSir design pipeline from speech recognition through intent and slot parsing to a subgoal for reinforcement learning control" width="681" height="238" caption="YesSir FPS design: interpret the request, resolve its target in game state, then use an RL policy for control." %}

“Number two, rescue me” becomes a selected AI, a rescue intention and a destination derived from the speaker's state. A learned policy then handles movement and local decisions on the way.

The separation makes failures easier to locate. Selecting the wrong teammate is an interpretation problem. Moving toward the right player but failing to navigate is a control problem. Both affect the experience, but they need different remedies.

## Define the relationship before adding personality

A tactical assistant needs predictable compliance. A fictional companion may hesitate, disagree or have competing priorities. Those behaviors support different games and create different expectations.

If a command is acknowledged but cannot be completed, the game should make the reason legible. If a character deliberately refuses, players need enough context to read that as characterization rather than a broken controller. Communication includes the response and its consequences.

For MOBA, a further proposal was to feed encoded dialogue and its history into a policy alongside game features. Evaluating that approach would require testing whether changes in language reliably change the intended behavior across game situations.

## Design the feedback as carefully as the command

A voice interface becomes worthwhile when the player can give a meaningful instruction, recognize its interpretation and see the squad respond. Vocabulary alone does not produce that loop.

The design opportunity is a game in which coordination matters: the player makes a tactical choice, companions carry it out, and the resulting situation invites another choice. Language can make that coordination feel direct when the underlying goals and skills are dependable.

Related articles: [Neural Function](/updates/2021/10/neural-function/) · [Game AI: From Models to Systems](/updates/2021/08/game-ai-from-models-to-systems/).

## Reference examples

- [Don't Stop! Eighth Note](https://www.bilibili.com/video/BV1P54y1d7gx/) · [Voice-controlled play](https://www.bilibili.com/video/BV1Sf4y1r7sV/).
- [Tom Clancy's EndWar](https://www.bilibili.com/video/BV12s411D7tq/) · [In Verbis Virtus](https://www.bilibili.com/video/BV1Bs411v7Zn/) · [Lifeline](https://www.bilibili.com/video/BV1aW411H7HZ/).
- [Creating a voice assistant for FIFA](https://towardsdatascience.com/creating-voice-assistant-for-games-tutorial-for-fifa-71cfbe428bd1) · [Fridai](http://Fridai.ai).
