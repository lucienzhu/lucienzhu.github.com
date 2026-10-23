---
title: "Spatial Persona 与共享空间交互"
date: "2024-04-03 00:00:00 +0800"
date_precision: month
author: Xiaolong Zhu
tags: [blog]
original_url: /updates/2024/04/spatial-personas-and-shared-interaction/
permalink: /zh/updates/2024/04/spatial-personas-and-shared-interaction/
update_id: spatial-personas-and-shared-interaction
summary: "人脸、手与共享内容：当人们可以在空间里一起做事，空间计算才变得有趣。"
last_modified_at: "2026-10-24 00:00:00 +0800"
---

一起做事时，一句“看这里”需要的不只是视频连接。对方要能辨认同一个对象，理解手势，并看见接下来发生的变化。空间交互可以把这些参照直接放进界面。

Vision Pro 在 [2024 年 4 月上线 Spatial Persona 测试版](https://9to5mac.com/2024/04/02/apple-vision-pro-spatial-persona-launch-beta/)，把人脸与双手带进共享活动。远程参与者在内容旁边有了自己的位置，手势也因此能参与交流。

{% include article-image.html src="/img/blog/spatial-personas/shared-workspace.png" alt="苹果演示中，Spatial Persona 与共享数字工作区并列出现" width="1500" height="834" caption="苹果的 Spatial Persona 演示：远程参与者出现在共享内容旁边。" %}

此前[关于桌子与空间计算的文章](/zh/updates/2024/01/tables-and-spatial-computing/)提出，共同表面可以成为这类活动的锚点。Spatial Persona 补上了另一个关键部分：一个能用动作指向桌面内容的人。

## 围绕任务安排人的位置

[苹果的空间 SharePlay 设计分享](https://developer.apple.com/videos/play/wwdc2023/10075/)介绍了共同观看、交流，以及围绕内容展开活动的布局。每种布局，都在组织人与共享对象之间的不同关系。

观看屏幕，需要共同的朝向；讨论模型，可能需要同时看见对方和同一个组件；游戏则可能需要围桌而坐，保留不同座位的视角。

应用仍然需要同步内容与交互。空间布局为协作提供场所，产品还要定义：一个人的动作，怎样改变大家共享的状态。

## 桌游让要求变得直观

Resolution Games 将 [Game Room 带到 Vision Pro](https://www.webwire.com/ViewPressRel.asp?aId=317258)，提供熟悉的棋类和纸牌游戏。这些活动本来就有聚在一起的理由、共同对象，以及改变对象的规则。

{% include article-image.html src="/img/blog/spatial-personas/game-room-chess.png" alt="Game Room 在混合现实中将国际象棋棋盘放到实体桌面上" width="1650" height="928" caption="Resolution Games 的 Game Room：放在实体桌面上的国际象棋棋盘。" %}

一张棋盘，足以显露几个设计要求。玩家需要对棋子位置有共同认识，一次移动需要能从其他座位看见，指向某个格子的手势也应该让每个人理解为同一个位置。反应与交谈，则与棋局状态一起构成体验。

检查模型或共同规划时，也有类似要求，只是尺度与视角可能不同。共享空间需要保留足够一致的参照，人们才能配合。

## 先让少量交互可靠

指向、放置、传递、转动，都是熟悉的动作，软件仍要定义它们怎样作用于数字对象。谁可以操作？两个人同时动手怎么办？一个人怎样察觉并撤销修改？

可靠的规则，让参与者把注意力留给正在做的事，也为 AI 提供了有用的位置。一次创建或修改内容的口头请求，可以在共享工作区里产生结果，供所有人检查和回应。

在我们的 [Vision Pro × DnD](/zh/projects/vision-pro-dnd/)原型中，LLM 对话用于生成沉浸式对战周围的内容。这是语言连接空间内容的一种方式。更普遍的设计难题是，让每次生成的变化，都能在共同活动中被理解。

空间临场感的价值，体现在参与者能否配合：认出同一件东西，对它采取行动，理解彼此的回应。人脸与双手，也通过共同的工作或游戏获得了用途。
