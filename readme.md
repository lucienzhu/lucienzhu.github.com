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

Projects 中的 Linux Foundation 经历链接到 2018 年官方报道；标志使用[官方品牌资源](https://www.linuxfoundation.org/brand-guidelines)，其名称和标志属于 The Linux Foundation。

Projects 的经历、日期、个人角色和中英文文案集中在 `_data/projects.json`，按 `sort_key` 倒序维护为一个带图列表，不再按主题分组。`sort_key` 使用结束或发表年月（YYYYMM），只有年份时月份为 00；同年且月份不明的条目保留原有顺序。每项使用稳定 `id`，新增缩略图的原始资料链接记录在 `image_source`。论文按正式会议年份标注，工作经历按实际任职期间标注，赛事年份与报告发表年份分别说明。新增内容应附公开的论文、代码或赛事链接，团队项目须明确个人角色。

外部项目有中英文版本时，可用 `external_urls.en` 与 `external_urls.zh` 指向对应语言，未设置时继续使用 `external_url`。

TurtleBot「小圆墩」按 2015 年的机器人原型研发经历维护，自主乘梯功能由本人确认，并结合当年的导航、地图切换和楼层识别记录描述。配图使用 US11242219B2 专利原始图 1（机器人乘梯场景示意），不作为原型实拍。楼层监测专利的中国首次申请日为 2016 年 5 月 5 日，中国授权号 CN107344688B（2019 年），美国授权号 US11242219B2（2022 年）；两种语言均保留两项专利链接，个人角色标为共同发明人，专利年份与原型研发年份分开。

GAEA 配图使用超参数官网《活的长安城》演示视频第 10 秒的原始画面，保留字幕和原画面标记；来源视频、产品页与时间点记录在该项目的 `image_source`、`image_source_page` 和 `image_time_seconds`。Projects 中保留原发布链接，并附官方演示和技术讲解入口。

「游戏 AI 与多智能体系统」作为 2019–2024 年超参数整体经历维护，保留创始成员、后任副总裁的角色，涵盖早期强化学习基础设施及后续商业落地。数千万元营收的表述依据本人确认，指相关商业落地支撑的营收规模，不扩写成年度收入、利润或独立个人业绩；英文对应 tens of millions of RMB in revenue。2020 年《轮到你了揭秘篇》和 2021 年 Delta／MOBA AI 的个人角色经本人确认为“深度参与”，不写成独立主导。游戏玩法与 AI 特点参考公司公开发布的技术介绍和 ChinaJoy 主办方访谈；配图分别为官方游戏界面和 2021 年 ChinaJoy 游戏 AI 展台照片，后者不作为 MOBA 游戏界面或 Delta 控制台截图。图片原始链接及发布页记录在对应条目的 `image_source`、`image_source_page`。参与度较低的 Elo／PPO 格斗游戏论文已从项目列表移除。

AI 江湖录（2021）、Ultra（2021–2022）和 AI Economics（2022）沿用同一项目时间线格式，详情分别位于 `/projects/ai-jianghu/`、`/projects/ultra/` 和 `/projects/ai-economics/`，并提供对应中文页。AI 江湖录缩略图取自档案演示视频第 16.8 秒，Ultra 取自 2022 年 1 月概念视频第 29.56 秒；图片链接和时间点记录在项目数据中。网页视频保留原画面及字幕、移除音轨，分别为 28.68 秒完整演示和 70 秒概念片段，使用原生播放控件、`preload="none"`，不自动播放。视频和示意图详情宽度上限为 560px。

AI Economics 经本人确认为独立且已可运行的资源交换原型。独立原型的视频未收录，不使用 Neural MMO 的交易视频替代。配图为根据环境设计绘制的机制示意，并在详情页明确标注。描述区分可运行原型、环境设计与研究目标，不把参考论文中的涌现结论作为本项目结果。Ultra AI 电竞活动单列为 Updates，举办事实由本人确认，年份按项目记录标为 2022 年，具体日期不明；概念视频保持概念演示的标注，不称为赛事录像。

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
