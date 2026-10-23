---
layout: post
title: "Group Chat and Human–AI Co-Alignment"
date: "2025-09-06 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
show_url: true
tags: [blog]
update_id: group-chat-and-co-alignment
summary: "What shared context, different preferences and mutual adaptation mean for a group chat AI agent."
permalink: /updates/2025/09/group-chat-and-co-alignment/
---

*Based on an outline from September 2025. Edited for this website in October 2026; the group-learning ideas below are a design direction.*

I co-developed [SuperIntern](/projects/super-intern/), a group chat AI agent that helps people handle work and marketing tasks directly in conversation. Building it brought me back to a question from game AI: what should an agent learn from interacting with people?

In a game, the rules and the result give us something concrete to optimize. In a group conversation, success is harder to specify. A useful response depends on the task, the people involved, what they have already agreed on, and what they expect to happen next.

That makes group chat an interesting setting for alignment.

## A group gives the agent a shared context

A work group usually has a reason to exist: preparing a campaign, coordinating a project, or helping a community. Its conversation contains decisions, examples and corrections that explain what matters to the participants.

Suppose a team is preparing a launch. A draft announcement, a discussion of the audience and a correction to a product claim are all part of the same task. An agent with access to that context could help turn the discussion into a useful next step.

Language also gives people a practical way to direct the agent. They can describe a goal, ask for a revision or explain why an action was wrong. Connected to tools, that conversation can lead to work getting done.

The design problem is deciding which context matters, when to act, and when to ask the group to resolve an ambiguity.

## A group also contains different preferences

Shared context does not guarantee agreement. One person may prefer a playful campaign, another may care most about technical precision, and someone else may be responsible for approving the final copy.

“The group liked it” would be too coarse a feedback signal. I would want to know who gave the feedback, what they were judging, and which decision they had the authority to make. A popular suggestion can still be factually wrong. A quiet correction can be the most useful contribution in the conversation.

This suggests a richer picture of an agent's environment: people, relationships, responsibilities and a changing shared task. Learning from that environment requires more care than adding up reactions.

## Model alignment and product behavior

Our work on SuperIntern included supervised fine-tuning of Stable Diffusion and applying DPO. These experiences made model behavior and human preference concrete engineering concerns.

[Direct Preference Optimization](https://arxiv.org/abs/2305.18290), for example, describes a way to fine-tune language models from preference pairs without fitting a separate reward model. It gives us a useful training method; choosing whose preferences to represent remains a product and data question.

For a group chat agent, tool use, task scheduling and the way results return to the conversation also shape whether people can work with it. A sensible workflow should make the proposed action understandable and give people a useful opportunity to correct it.

The group-learning loop I am interested in would collect feedback around concrete tasks, examine disagreements and evaluate changes before applying them. A conversation can improve through better context and clearer instructions without changing model weights. Continuous online training would be a separate system to build and validate.

## People adapt too

As an agent becomes part of a group, people learn how to work with it. They discover which requests it handles well, what context it needs and where they should check its output. Their expectations and working habits change along the way.

I think of this as human–AI co-alignment: improving the fit between the agent, the people and the activity they share. The agent should become more useful, while people become better at expressing goals, judging results and coordinating with it.

Group chat gives this idea a familiar place to begin. There are already people trying to do something together. The interesting challenge is helping an AI participate in a way that makes that shared activity work better.

Related project: [SuperIntern · Group chat AI agent](/projects/super-intern/).
