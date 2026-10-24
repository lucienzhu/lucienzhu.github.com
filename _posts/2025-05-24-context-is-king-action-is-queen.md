---
layout: post
title: "AI’s Second Half: Context Is King, Action Is Queen"
date: 2025-05-24 00:00:00 +0800
author: Xiaolong Zhu
lang: en
section: updates
show_url: true
tags: ["blog", "ai", "agents"]
summary: "How relevant context and a well-designed action space turn model capability into dependable work."
permalink: /updates/2025/05/24/context-is-king-action-is-queen/
last_modified_at: "2026-10-24 00:00:00 +0800"
---

Two agents using the same model can produce very different results. One repeatedly asks for information the user has already supplied. Another understands the task but cannot take the action needed to complete it.

Both failures point to product work beyond model selection. **Context determines what the agent understands; its action space determines what it can deliver.** The quality of the connection between them shapes whether an agent becomes useful in everyday work.

## Help the user get started

A blank page is often an obstacle. An agent can produce a first draft, assemble relevant material or turn an ambiguous request into a plan that someone can inspect. That creates value before the entire task is automated.

The environment matters. Booking travel involves a browser and booking services. Building a website involves files, an editor and a preview. The agent needs feedback from that environment to know whether its action had the intended effect.

{% include article-image.html src="/img/blog/context-is-king-action-is-queen/human-agent-environment.png" alt="How humans and agents interact with their environment" width="1348" height="1198" caption="The task loop connects a person, an agent and the environment in which actions take effect." %}

A useful product makes this loop visible: the user's intention, the proposed action and the observed result. People need enough information to decide whether to continue or correct the course.

## Context is king

“Prepare a launch announcement” leaves many decisions unstated. Who is the audience? Which claims are approved? What tone fits the organization? Where will the announcement appear?

Relevant context can answer those questions without another round of explanation. It may come from the current conversation, working documents, previous decisions or explicit feedback. The product must retrieve the right parts and keep corrections from being overridden by stale assumptions.

The advantage accumulates when repeated use genuinely improves the work. A knowledge base full of irrelevant material adds little. A remembered preference applied to the wrong task can make the result worse. Context quality depends on relevance, accuracy and the user's ability to update it.

{% include article-image.html src="/img/blog/context-is-king-action-is-queen/product-growth.png" alt="Time taken by different products to reach one million users, from the original article" width="1214" height="498" caption="The adoption-speed comparison included in the May 2025 essay. Adoption and continued usefulness measure different things." %}

A product's rate of adoption and its lasting usefulness also need separate evaluation. Repeated tasks offer a better test of accumulated context: does the user explain less, make fewer corrections and get a result that fits their needs?

Continuity can make a product valuable enough to keep using. That value rests on effective service and trust, including understandable access boundaries and control over remembered information.

## Action is queen

Context becomes productive when the agent can do something appropriate with it. A marketing assistant may need to create a draft and prepare channel-specific assets. A coding assistant may need to edit files, run checks and inspect the rendered result.

The action space is a design decision. Low-level controls offer flexibility but leave more execution steps to the agent. A well-designed higher-level tool can package domain knowledge and return feedback that helps determine whether the task succeeded.

Useful tools also expose consequential distinctions. Saving a draft and publishing it have different effects. Editing a file and verifying the change are separate operations. The agent needs ways to recognize failure, recover where possible and involve a person when a decision requires them.

Domain expertise helps define these actions and their completion criteria. A larger collection of tools helps only if the agent can choose and use them effectively.

## Evaluate the completed loop

Context and action should be tested together on real tasks. Did the agent use the agreed constraints? Did its changes produce the intended result? How much review and repair did the person need to do?

Those answers also inform business models. Charging for outcomes requires a clear definition of the outcome and a way to attribute delivery. A convincing demonstration or a long sequence of tool calls does not establish that value on its own.

The strongest product experience reduces the effort between a person's intention and a result they can accept. Understanding the person and providing dependable actions are the two connected pieces of that work.
