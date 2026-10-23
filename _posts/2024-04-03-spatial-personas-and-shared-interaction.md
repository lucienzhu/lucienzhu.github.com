---
layout: post
title: "Spatial Personas and Shared Spatial Interaction"
date: "2024-04-03 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
show_url: true
tags: [blog]
update_id: spatial-personas-and-shared-interaction
summary: "Faces, hands and shared content: why spatial computing becomes interesting when people do something together."
permalink: /updates/2024/04/spatial-personas-and-shared-interaction/
last_modified_at: "2026-10-24 00:00:00 +0800"
---

In a shared task, “look here” depends on more than a video connection. The other person needs to identify the same object, understand the gesture and see what changes next. Spatial interaction can make those references part of the interface.

The [April 2024 launch of spatial Personas in beta](https://9to5mac.com/2024/04/02/apple-vision-pro-spatial-persona-launch-beta/) on Vision Pro brought faces and hands into shared activities. A remote participant could have a position beside the content, giving gestures a place in the conversation.

{% include article-image.html src="/img/blog/spatial-personas/shared-workspace.png" alt="Apple demonstration of a spatial Persona beside a shared digital workspace" width="1500" height="834" caption="Apple's spatial Persona demonstration: a remote participant beside shared content." %}

My earlier article on [tables and spatial computing](/updates/2024/01/tables-and-spatial-computing/) argued that a common surface could anchor this kind of activity. Spatial Personas add the other essential element: a person whose actions can refer to the things on that surface.

## Arrange people around the task

[Apple's spatial SharePlay design session](https://developer.apple.com/videos/play/wwdc2023/10075/) describes layouts for watching together, conversation and gathering around content. Each arrangement supports a different relationship between people and the shared object.

Watching a screen calls for a common viewing direction. Discussing a model may require everyone to see one another and the same component. A game might need seats around a board, with meaningful differences between each player's view.

The application still has to synchronize its content and interactions. Spatial placement provides a setting for collaboration; the product must decide how a person's action changes the state everyone shares.

## Board games make the requirements visible

Resolution Games brought [Game Room to Vision Pro](https://www.webwire.com/ViewPressRel.asp?aId=317258) with familiar board and card games. These activities already provide a reason to gather, a common object and clear rules for changing it.

{% include article-image.html src="/img/blog/spatial-personas/game-room-chess.png" alt="Game Room chess board positioned on a physical table in mixed reality" width="1650" height="928" caption="Game Room by Resolution Games: a chess board placed on a physical table." %}

A board makes several design requirements easy to see. Players need to agree on where the pieces are. A move needs to be visible from other seats. A gesture toward a square should identify the same square for everyone. Reactions and conversation belong alongside the game state.

The same requirements appear in model review or joint planning, although the appropriate scale and viewpoint may differ. A shared space has to preserve enough common reference for people to coordinate.

## Make a small interaction vocabulary dependable

Pointing, placing, passing and turning are familiar actions, but software must define how they work with digital objects. Who can manipulate an object? What happens if two people act together? How does someone notice and undo a change?

Dependable answers let people focus on their activity. They also give AI a useful place to participate. A spoken request to create or modify content can produce something in the shared workspace, where everyone can inspect the result and respond.

In our [Vision Pro × DnD](/projects/vision-pro-dnd/) prototype, LLM conversations generated content around an immersive combat experience. This is one way to connect language with spatial content. The broader design challenge is to make each generated change understandable in the activity people already share.

Spatial presence earns its value when it helps participants coordinate: identify the same thing, act on it and understand one another's response. A face and a pair of hands become useful through that shared work or play.
