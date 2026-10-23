---
layout: post
title: "Sora Is Here. How Far Away Are AI Beings?"
date: "2024-02-22 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
show_url: true
tags: [blog]
update_id: video-generation-world-models-and-ai-beings
summary: "From generating a plausible future to choosing an action: why world models interest me as a game AI builder."
permalink: /updates/2024/02/video-generation-world-models-and-ai-beings/
---

*Adapted from my essay dated February 2024. Edited and technically revised for this website in October 2026; the product possibilities retain the original essay's perspective.*

When Sora appeared in February 2024, the phrase that caught my attention was the title of its technical report: [Video generation models as world simulators](https://openai.com/index/video-generation-models-as-world-simulators/).

As someone who builds game AI, I read that title as a question about agents. Could a model that generates what happens next help an agent decide what to do now?

## Why an agent needs a model of what happens next

When playing chess, I can choose a move from familiar patterns. I can also consider several continuations: if I move this piece, how might the opponent respond? That second process depends on a model of how the game works.

Games with explicit rules give us a convenient simulator. Real environments are harder. An agent has partial observations, uncertain dynamics and limited opportunities to try an action safely.

A learned world model offers a way to predict useful consequences from experience. The predictions might describe observations, rewards or a compact internal state that helps choose actions.

The question that interests me is how those predictions can improve a decision.

## Generating video and supporting decisions

Sora's report explored video generation as a route toward broader simulation, while also documenting limitations in physical interactions and consistency. That combination mattered: convincing appearance and reliable action consequences are different things to evaluate.

For an agent, I would want to ask more specific questions. Can we condition on the action it might take? Do important objects and task states persist over time? Can it compare several possible actions and notice when its prediction becomes unreliable?

Imagine a character choosing between crossing a bridge and taking a longer route. A beautiful continuation is useful for planning only if the model preserves the consequences that make one route better than the other.

## Games make the connection tangible

[World Models](https://worldmodels.github.io/), by David Ha and Jürgen Schmidhuber, explored learning compact models of environments and training a controller in a generated dream environment. [MuZero](https://arxiv.org/abs/1911.08265) used learned dynamics with search, predicting quantities relevant to planning rather than requiring a reconstruction of every pixel.

These approaches make an important design choice visible: what does the agent need its model to predict?

For navigation, the useful information might concern reaching a destination. For a team game, it might include what happens to teammates and shared resources. A more visually detailed prediction is valuable when that detail affects the task.

That connects to my earlier [Neural Function notes](/updates/2021/10/neural-function/): what if a goal described a desired state, and the system could reason about how to reach it?

## From a generator to an AI being

In the original essay, I used “AI being” to imagine a system that perceives, acts, communicates and learns through interaction. It was a product metaphor for an agent with a continuing role in its environment.

That opens up forms I find interesting: game companions, characters inhabiting a persistent world, or robots that work alongside people. The hard part is connecting useful perception and prediction to actions, feedback and an experience people understand.

{% include article-image.html src="/img/blog/ai-beings/concept.png" alt="Concept illustration of researchers looking toward an imagined silicon-based AI being in space" width="1792" height="1024" caption="A concept illustration from the original essay, imagining a future AI being." %}

The longer-term possibility is what excites me about generative models. They could become components in systems that do interesting things with people and respond to the world around them.

For me, the next question is a practical one: what would we let such an agent do, and how would we know that it was getting better at it?

## Links retained from the original notebook

- [Game Emulation via Neural Network](https://madebyoll.in/posts/game_emulation_via_dnn/): an interactive Pokémon overworld experiment.
- [Runway: Introducing General World Models](https://research.runwayml.com/introducing-general-world-models).
- [World Models](https://worldmodels.github.io/) · [Sora's original technical report](https://openai.com/index/video-generation-models-as-world-simulators/).
