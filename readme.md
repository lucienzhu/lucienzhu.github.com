```
# step 1: instal bundler
gem install bundler

# step 2: install jeykll
bundle install

# step 3: run site
bundle exec jekyll serve
```

## 中英文内容维护

英文版保留原有网址，中文版使用 `/zh/` 前缀。两种语言共用布局，界面文案放在 `_data/locales.yml`，项目列表放在 `_data/projects.json`。

主导航为 Home、Projects、Updates。个人介绍合并在 Home，原 `/about/` 和 `/zh/about/` 地址分别跳转到对应语言的首页。

Projects 中的 Linux Foundation 经历链接到 2018 年官方报道，并保留新闻与 Angel 代码入口。[2018 年 8 月 27 日官方新闻](https://www.linuxfoundation.org/press/press-release/lf-deep-learning-adds-two-new-framework-projects-to-expand-community-and-ecosystem)明确以腾讯高级 AI 研究员及 LFDL TAC 成员身份引用 Xiaolong Zhu 的发言，可作为个人角色的公开出处，不据此追加 Angel 创始人或核心算法作者身份。当天的动态沿用原 `angel-lfdl.html` 网址，标题使用现可访问的官方新闻入口，旧新闻地址继续保留在中英文正文，另附开源代码，不新增重复动态。项目日期继续按 2018 年展示，与新闻的具体发布日期分开。标志使用[官方品牌资源](https://www.linuxfoundation.org/brand-guidelines)，其名称和标志属于 The Linux Foundation。

Projects 的经历、日期、个人角色和中英文文案集中在 `_data/projects.json`，按 `sort_key` 倒序维护为一个带图列表，不再按主题分组。`sort_key` 使用结束或发表年月（YYYYMM），只有年份时月份为 00；同年且月份不明的条目保留原有顺序。每项使用稳定 `id`，新增缩略图的原始资料链接记录在 `image_source`。论文按正式会议年份标注，工作经历按实际任职期间标注，赛事年份与报告发表年份分别说明。新增内容应附公开的论文、代码或赛事链接，团队项目须明确个人角色。

外部项目有中英文版本时，可用 `external_urls.en` 与 `external_urls.zh` 指向对应语言，未设置时继续使用 `external_url`。

Projects 顶部及条目内提供纯文字标签筛选，标签定义与译名集中在 `_data/project_tags.yml`，项目使用 `tags` 数组，可同时属于多类。当前五类为强化学习（`rl`）、多智能体（`multi-agent`）、产品（`product`）、机器人（`robotics`）和游戏（`games`）。依据已有项目内容分类，暂不匹配这五类的研究与社区经历留在全部列表。标签不改变原有时间顺序、项目网址或资料链接；`?tag=标签ID` 可直接访问、分享，并随语言切换和浏览器前进／后退保留。样式沿用无边框、无圆角、无下划线的文字链接，选中项以字重及颜色区分。

FeatherCNN 条目描述个人参与的 FeatherCNN 及配套移动端推理适配工程，300 多款机型、高通／联发科平台、Cortex-A55／A72、Adreno／Mali 和 Metal 的范围由本人确认。Cortex-A53、A72 和 Qualcomm Kryo 同时有[官方历史基准](https://github.com/Tencent/FeatherCNN/wiki/Benchmarks)作为参考；OpenCL 与 NEON 路径结合 Feather 档案及开源资料维护。项目列表按本人要求精简为短标题、一句机型与平台覆盖说明，以及 NEON / OpenCL / Metal 技术摘要；具体 CPU / GPU 型号留在此处维护，不再逐行罗列：Arm Cortex-A53 / A55 / A72、Qualcomm Kryo、Qualcomm Adreno、Arm Mali。使用正确拼写 Adreno；Metal 作为 Apple 的 GPU 计算 API，不列为 GPU 型号。此处为移动端落地工程范围，不把内部 GPU 方案或 300 款机型数字写成开源仓库的公开验证矩阵；不从第三方 AI-Bench 表推定本项目实测机型，也不补写未确认的 Adreno、Mali 子型号。原有开源链接保留。

手机 QQ 姿态估计条目的“首创”依据本人确认，限定为落地「高能舞室」的移动端实时骨架追踪与动作识别方案；英文对应 pioneered，不扩写为人体姿态估计领域的全球首次。保留 2017 年 12 月日期、2014 年以来上市的 iOS／Android 手机适配范围与原配图。

绝艺条目中的算法研究、训练角色及《从零开始学围棋》演讲内容依据本人档案《0104-0315，绝艺演讲》的讲者介绍与摘要，演讲经历同时见简历。分享归档继续使用原 `2018/03/15/2nd-ailab-academic-forum.html` 及对应中文网址，不新增动态；原日期保留，正文只按已核实的 2018 年 3 月描述论坛，不推定具体演讲时段。论坛活动信息可见[腾讯研究院报道](https://cloud.tencent.com/developer/news/146200)，该报道不作为个人演讲全文或录像。原论坛地址 `https://ai.tencent.com/ailab/academicforum.html` 在本次检查中已返回腾讯元宝页面，继续作为历史链接保留在正文；Updates 标题和 Projects 中的演讲入口改指站内恢复的摘要。没有找到幻灯片或演讲录像，不补写为已收录。原 FineArt 项目链接和强化学习／游戏标签保留。

实时视频风格迁移条目的“首创”依据本人确认，限定为在手机 QQ 落地的移动端实时视频风格迁移方案；英文对应 pioneered，不扩写为风格迁移领域的全球首次。保留 2017 年 3 月日期、iOS／Android 平台、原配图及 CVPR 2017 论文链接，不据此追加论文作者身份。

新春祝福 H5 条目按本人确认突出人像抠图与首创方案，标题补充技术名称，英文对应 portrait cutout 与 pioneered。描述限于该项目的人像与背景分离及新春场景替换，不扩写为人像分割领域的全球首次，也不添加未确认的实时性能或设备范围；保留 2017 年 1 月日期、原配图和腾讯 TEG 归属。

神经网络风格化照片滤镜条目的“首创”依据本人确认，英文对应 pioneered；范围为该项目的毫秒级神经网络照片风格化滤镜，不扩写为神经风格迁移领域的全球首次。保留 2016 年 3 月日期、原配图、毫秒级处理表述和腾讯 TEG × PTu 归属，不添加未确认的设备范围或具体耗时。

TurtleBot「小圆墩」按 2015 年的机器人原型研发经历维护，自主乘梯功能由本人确认，并结合当年的导航、地图切换和楼层识别记录描述。配图使用 US11242219B2 专利原始图 1（机器人乘梯场景示意），不作为原型实拍。楼层监测专利的中国首次申请日为 2016 年 5 月 5 日，中国授权号 CN107344688B（2019 年），美国授权号 US11242219B2（2022 年）；两种语言均保留两项专利链接，个人角色标为共同发明人，专利年份与原型研发年份分开。

GAEA 配图使用超参数官网《活的长安城》演示视频第 10 秒的原始画面，保留字幕和原画面标记；来源视频、产品页与时间点记录在该项目的 `image_source`、`image_source_page` 和 `image_time_seconds`。Projects 中保留原发布链接，并附官方演示和技术讲解入口。

Vision Pro × DnD 按本人于 2026-10-23 确认的 2023 年可运行原型维护，放入 Projects 时间线，标签为产品与游戏；中英文详情分别位于 `/projects/vision-pro-dnd/` 和 `/zh/projects/vision-pro-dnd/`。前期 Quest Pro、空间锚点、NPC 交互与「大厅—地图—副本」设计依据《项目 XR + AI：DnD 跑团》2023 年 4–7 月记录；Quest Pro 前期方案与后来 Vision Pro 原型分别描述，不将方案中的全部设想写成已实现功能。配图为本站绘制的空间桌面机制示意，详情页明确标为非实机截图。笔记所附 Spatial Ops 视频是参考作品，不作为本项目演示；未找到独立原型实机素材，不补造视频、公开发布或商业上线记录。

「游戏 AI 与多智能体系统」作为 2019–2024 年超参数整体经历维护，保留创始成员、后任副总裁的角色，涵盖早期强化学习基础设施及后续商业落地。数千万元营收的表述依据本人确认，指相关商业落地支撑的营收规模，不扩写成年度收入、利润或独立个人业绩；英文对应 tens of millions of RMB in revenue。2020 年《轮到你了揭秘篇》和 2021 年 Delta／MOBA AI 的个人角色经本人确认为“深度参与”，不写成独立主导。游戏玩法与 AI 特点参考公司公开发布的技术介绍和 ChinaJoy 主办方访谈；配图分别为官方游戏界面和 2021 年 ChinaJoy 游戏 AI 展台照片，后者不作为 MOBA 游戏界面或 Delta 控制台截图。图片原始链接及发布页记录在对应条目的 `image_source`、`image_source_page`。参与度较低的 Elo／PPO 格斗游戏论文已从项目列表移除。

AI 江湖录（2021）、Ultra（2021–2022）和 AI Economics（2022）沿用同一项目时间线格式，详情分别位于 `/projects/ai-jianghu/`、`/projects/ultra/` 和 `/projects/ai-economics/`，并提供对应中文页。AI 江湖录缩略图取自档案演示视频第 16.8 秒，Ultra 取自 2022 年 1 月概念视频第 29.56 秒；图片链接和时间点记录在项目数据中。网页视频保留原画面及字幕、移除音轨，分别为 28.68 秒完整演示和 70 秒概念片段，使用原生播放控件、`preload="none"`，不自动播放。视频和示意图详情宽度上限为 560px。

AI Economics 经本人确认为独立且已可运行的资源交换原型，不使用 Neural MMO 的交易视频替代。2026-10-23 补查找到超参数官网的 [Simulation Agent 案例页](https://www.chaocanshu.cn/product/simulation_agent)，该页将与北大的经济学社会模拟单独列为「AI 交易行为的诞生与演化」，并提供[中文官方视频](https://guanwang-dev.obs.cn-south-1.myhuaweicloud.com/static-video/agent-cn.mp4)和[英文官方视频](https://guanwang-dev.obs.cn-south-1.myhuaweicloud.com/static-video/agent-en.mp4)。两条视频链接均返回 HTTP 200；原文件分别约 569 MB、554 MB，项目页提供外链，不下载、重托管或预加载。B 站官方账号的公开检索结果也收录同名 6 分 45 秒视频（2025-01-20），但尚未找回视频号原分享链接，因此不标为已核实的视频号发布。官网材料标为后续公开介绍，不将其结果倒填成 2022 年的个人成果。配图继续使用根据环境设计绘制、明确标注的机制示意。描述区分可运行原型、环境设计与研究目标，不把参考论文中的涌现结论作为本项目结果。Ultra AI 电竞活动单列为 Updates，举办事实由本人确认，年份按项目记录标为 2022 年，具体日期不明；概念视频保持概念演示的标注，不称为赛事录像。

《遗迹守护者》对应 Normandy 非对称项目，按 2020–2021 年维护，个人角色为参与研发，不把团队各成员的算法或关卡设计改写成独立个人成果。非对称玩法、道具协作、双模型、课程训练和自博弈依据项目需求、2020 年 11–12 月及 2021 年 6–7 月周会记录；不把 League 多策略计划或尚未验证的涌现写成完成结果。ChinaJoy 2021 展示依据[公司官方回顾](https://www.36kr.com/p/1398066247517828)。详情位于 `/projects/ruin-guardians/` 及对应中文页；视频取自《精彩回顾》的 `2021-03-08-11-48-31_109_w_ex.mp4`，保留完整 63.6 秒及原始开发界面，无音轨，以约 5.4 MB 的 480×284 网页版本呈现。配图为原视频第 5 秒画面，不称为 ChinaJoy 最终版本；播放器沿用宽 560px、高 384px 上限，不自动播放。英文 Ruin Guardians 为本站译名。

Neural MMO 原项目补充 AAMAS 2023 相关基准研究中的鲁棒性与泛化问题，角色区分赛事联合筹办与论文共同作者，保留原有各届竞赛和论文链接。Flatland 原条目突出铁路调度的运筹学与组合优化背景、早期强化学习替代路线以及 Tree LSTM 适配轨道拓扑的创新，详情为 `/projects/flatland/` 及对应中文页。125.3 与 27.9 的得分对照来自论文表 7，指论文评测方案与 2021 年竞赛最优 RL 方案的比较，不作为官方比赛获奖名次或到站率。两段视频取自档案文章《Flatland2021: Immediate rail planning with reinforcement learning》的 `video_speed_3.mp4` 与 `video_speed_3 6.mp4`，分别对应早期策略与最终阶段同一测试场景。保留完整的 47.334 秒原视频，均无音轨，封面取第 25 秒；逐案例表现不作为整体基准成绩。播放器宽度上限 560px、高度上限 384px，不自动播放。原论文和代码链接保留。

演讲、奖项和里程碑统一进入 Updates。已有记录直接补充原动态，保留旧网址；中英文的 `summary` 用于列表中的简短说明。新奖项只有年份或半年时，`date` 仅作为 Jekyll 排序锚点，`date_precision` 记录精度，页面显示 `date_label`（列表可使用 `date_label_short`），不展示虚构的具体日期。时间不明的微创新奖在腾讯获奖记录中注明任职期间背景，不单独编造时间点。

2010 年中国 RoboCup 救援仿真组三等奖依据本人简历，不扩写未知的个人分工或算法贡献；日期仅作年份排序锚点。2023 年《海量智能体的算法及应用》演讲以简历确认标题，结合机器之心Pro 活动回顾确认人工智能论坛为 1 月 11 日，回顾报道发布日为 1 月 13 日。

36氪纪录片补充在原 `game-ai-documentary.html` 动态中，保留 2022 年 10 月 24 日日期及原始 `https://36kr.com/p/1966900832160644` 链接。片名为《我教 AI 打电竞》，《1000 个教 AI 打电竞的人》为含视频的配套报道，两者不混为同一标题。个人角色按出镜采访介绍，不写成独立制片或导演；配图使用报道提供的 600×400 官方封面，来源记录在英文动态元数据中。两种语言均保留原文观看入口。

清华授课经历沿用原 `present-in-thusigs.html` 网址，只展示年份。2021、2022 年课程教学及 2021 年 9 月至 2024 年 8 月校外导师经历依据本人简历；不推定原动态日期就是授课日期。2022 年秋季人工智能实践课的结题答辩实际发生于 2023 年 3 月 7 日，按清华 3 月 9 日的官方报道另记为动态，个人角色为答辩评委。详情配图保留官方原图，来源记录在该动态的 `image_source`、`image_source_page` 中。

英文动态与长文保留在 `_posts/` 和 `life/_posts/`。对应的中文内容放在 `_translations/`，通过 `original_url` 对应英文网址，并设置 `permalink: /zh/原英文路径`。译文使用独立集合，不会重复计入动态数量。

新增页面时也要添加对应的 `/zh/` 页面。语言切换自动指向同一页面的另一个版本，并保留 Updates 的筛选条件。正文配图使用 `_includes/article-image.html`，继续共用尺寸限制。

全站排版集中维护在 `css/typography.css`，字号只使用 14、16、24、32px 四档（以默认根字号计算）。中英文共用系统无衬线字体栈，代码使用等宽字体；页面自己的 CSS 只处理布局，避免再定义额外字号。

翻译和排版时必须保留原文链接，包括标题中的内嵌链接、正文引用、论文、数据集、邮箱和下载入口。译文只翻译链接文字；站内链接指向对应语言页面，外部链接保留原目标。旧下载地址也应继续可用，不能通过删掉链接来处理失效地址。

链接统一不加下划线，悬停时用颜色反馈；当前导航和筛选项通过字重表示选中状态。此设计同时适用于中英文页面，不能为了突出链接再添加下划线。

Install via proxy on new mbp
```shell
# gem version 3.2.3
sudo gem update --system 3.2.3 -V --http-proxy http://127.0.0.1:8118

sudo gem install bundler -n /usr/local/bin -V --http-proxy http://127.0.0.1:8118

# by default, the path is /usr/bin
bundle config path /usr/local/bin
# Export proxy and run
sudo bundle install -V


# Run
bundle exec jekyll serve
```

sudo gem install racc -n /usr/local/bin -V --http-proxy http://127.0.0.1:8118

# install after osx update

```shell
https://jekyllrb.com/docs/installation/macos/

# Step 1: Install Homebrew
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Step 2: Install chruby and the latest Ruby with ruby-install
brew install chruby ruby-install xz

ruby-install ruby 3.1.3

echo "source $(brew --prefix)/opt/chruby/share/chruby/chruby.sh" >> ~/.zshrc
echo "source $(brew --prefix)/opt/chruby/share/chruby/auto.sh" >> ~/.zshrc
echo "chruby ruby-3.1.3" >> ~/.zshrc # run 'chruby' to see actual version

# Step 3: Install Jekyll bundler
sudo gem install bundler jekyll -n /usr/local/bin

# Step 4: install related packages
sudo bundle install
bundle exec jekyll serve
```
