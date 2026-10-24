---
layout: post
title: "Group Chat and Human–AI Co-Alignment"
date: "2025-09-06 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
show_url: true
tags: [blog]
update_id: group-chat-and-co-alignment
summary: "How a group chat agent can use shared context, respect different responsibilities and learn from corrections."
permalink: /updates/2025/09/group-chat-and-co-alignment/
last_modified_at: "2026-10-24 00:00:00 +0800"
---

A marketing lead asks for a livelier launch announcement. An engineer corrects a product claim. The person approving the release asks to postpone it. All three messages belong to the same task, but they mean different things for an AI agent helping the group.

Group chat makes alignment a practical product problem. An agent has to understand a shared goal, distinguish preferences from factual corrections and recognize who is responsible for a decision. Counting positive reactions would lose much of that information.

We developed [SuperIntern](/projects/super-intern/), a group chat AI agent for work and marketing tasks. That setting makes the interaction between shared context, individual preferences and useful action especially clear.

## Keep the task inside the conversation

A work group already accumulates relevant context: drafts, examples, decisions and explanations of why something changed. An agent can use that history to move a task forward without asking everyone to repeat it.

For a launch announcement, the audience discussion informs the tone, an engineer's correction constrains the claims, and the approval decision determines whether the draft is ready. Retrieving isolated messages is insufficient if the agent loses those relationships.

The same context also helps determine when to act. A suggestion, a request for a draft and approval to publish are different stages of work. The agent should preserve those distinctions as conversation turns into tool use.

## Preserve disagreement in the feedback

Shared context rarely means identical preferences. A playful suggestion can be popular and still contain an error. A brief correction from the responsible person can matter more than a long discussion.

Useful feedback therefore needs to remain attached to its author, subject and role in the task. The group may need to resolve a tradeoff before the agent can proceed. Flattening that disagreement into a single score hides the decision that people still need to make.

This also changes evaluation. A response can be fluent and well received while failing to respect an agreed constraint. Task success depends on whether the work advances in a way the responsible participants can accept.

## Separate model training from contextual adaptation

Our SuperIntern development included supervised fine-tuning of Stable Diffusion and applying DPO. These are concrete model-development methods; deciding what behavior the product should reward remains a separate design and data problem.

[Direct Preference Optimization](https://arxiv.org/abs/2305.18290) describes fine-tuning language models from preference pairs without fitting a separate reward model. The method still depends on which pairs are collected and whose preferences they represent.

A proposed learning loop for group chat would collect feedback around tasks, examine disagreements and evaluate changes before applying them. Better context and clearer instructions can improve interaction without changing model weights. Continuous online training requires its own implementation and validation; it cannot be inferred from an agent remembering a correction in a conversation.

## People learn how to collaborate too

An agent joining a group also changes how people work. Participants learn which requests it handles well, what context to supply and which outputs need checking. They may become better at separating a draft request from a decision, or at explaining why a result missed the goal.

Human–AI co-alignment describes this mutual adjustment: the agent, the participants and their shared activity become better matched. Product design can support it through visible proposed actions, understandable results and effective ways to correct a mistake.

A useful test is what happens after the group says “that is wrong.” Can the agent identify what needs changing? Can people see that the correction was understood? Can the task continue without reopening every earlier decision? Those moments determine whether an agent becomes a dependable participant in the group.
