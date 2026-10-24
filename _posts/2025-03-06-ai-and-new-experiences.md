---
layout: post
title: "What New Experiences Can AI Create?"
date: "2025-03-06 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
show_url: true
tags: [blog]
update_id: ai-and-new-experiences
summary: "How AI-assisted creation can turn ideas into playable experiments, shared activities and physical products."
permalink: /updates/2025/03/ai-and-new-experiences/
last_modified_at: "2026-10-24 00:00:00 +0800"
---

An AI that can use software can shorten the path from an intention to a result. It can also shorten the path from an idea to something other people can experience: a game to join, a shared scene to explore or a physical object with a useful behavior.

The discussion around [Manus](https://manus.im/) in March 2025 made the first opportunity especially visible. The second deserves equal attention. AI products can help people create activities they want to take part in, alongside helping them complete existing work.

## Interfaces decide what becomes possible

In 2019, I worked on a cloud-native distributed reinforcement learning system. Games supplied a loop of observation, action and feedback. The interface defined what an agent could perceive and attempt.

[AndroidEnv, published in 2021](https://arxiv.org/abs/2105.13231), extended that idea to Android applications through a touchscreen interface. Giving an agent access to a new environment opens a range of tasks, each with its own requirements for learning and evaluation.

{% include article-image.html src="/img/blog/ai-and-new-experiences/androidenv.png" alt="AndroidEnv paper examples showing Android applications including maps, a calendar, a browser and a clock" width="1266" height="466" caption="Android applications exposed through AndroidEnv. Source: the 2021 research paper." %}

An interface is therefore a product choice. The information available to the model, its possible actions and the way people direct it must fit the task. Personalization can help when it preserves useful preferences and working context, reducing repeated explanation.

The same principle applies to creation tools. They need to make the user's next experiment easy to express and its result easy to inspect.

## Shorten the route to a playable experiment

[levels.io](http://levels.io)'s [browser flight game](https://fly.pieter.com/) offers a concrete example of an experiment made with AI coding tools. An idea becomes something people can enter and play, making feedback possible while the concept is still small.

{% include article-image.html src="/img/blog/ai-and-new-experiences/browser-flight-game.png" alt="The fly.pieter.com browser flight game entry screen, March 2025" width="2148" height="1202" caption="The browser flight game at fly.pieter.com, March 2025." %}

For a game team, faster implementation can expand the set of combinations worth testing: a mechanic with several visual treatments, an unusual control scheme or a different way for players to cooperate. The useful gain is more opportunities to discover what works.

A working prototype still needs playtesting. If players cannot understand a goal, a polished asset will not resolve it. If a rule creates an enjoyable decision, a rough version may already reveal that. Speed matters when the team uses it to learn about the experience.

## Move from content to activities

Content, experiences and physical things suggest three connected levels of product design.

Content gives people material: an image, a scene, music or a character. An experience organizes material into an activity with choices and feedback. A shared spatial game, for example, needs rules for how people affect the scene and how it responds.

Physical products add a body and an environment. Perception, planning and control let an object behave, while design determines how that behavior fits the people around it. Movement, timing and feedback become part of the experience.

Moving between these levels adds requirements. A generated scene needs interaction to become a game. A simulated behavior needs dependable physical control to become part of a robot. Each transition should be tested in the setting where people will use it.

## Make the next test about the experience

A promising demonstration gives someone a reason to try it. A useful test observes what happens afterward: can they understand what to do, affect the result and find a reason to return or invite another person?

Those questions help distinguish a moment of novelty from an activity with lasting value. Faster creation is most valuable when it gives teams more chances to answer them.

Related work: [When AI Becomes the Game](/updates/2021/12/ai-as-gameplay/) · [Vision Pro × DnD](/projects/vision-pro-dnd/).
