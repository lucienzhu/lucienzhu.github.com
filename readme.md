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

GAEA 配图使用超参数官网《活的长安城》演示视频第 10 秒的原始画面，保留字幕和原画面标记；来源视频、产品页与时间点记录在该项目的 `image_source`、`image_source_page` 和 `image_time_seconds`。Projects 中保留原发布链接，并附官方演示和技术讲解入口。

2019 年的超参数条目聚焦早期强化学习基础设施，年份指该项目阶段；创始成员和后来的副总裁为任职背景。2020 年《轮到你了揭秘篇》和 2021 年 Delta／MOBA AI 的个人角色经本人确认为“深度参与”，不写成独立主导。游戏玩法与 AI 特点参考公司公开发布的技术介绍和 ChinaJoy 主办方访谈；配图分别为官方游戏界面和 2021 年 ChinaJoy 游戏 AI 展台照片，后者不作为 MOBA 游戏界面或 Delta 控制台截图。图片原始链接及发布页记录在对应条目的 `image_source`、`image_source_page`。参与度较低的 Elo／PPO 格斗游戏论文已从项目列表移除。

演讲、奖项和里程碑统一进入 Updates。已有记录直接补充原动态，保留旧网址；中英文的 `summary` 用于列表中的简短说明。新奖项只有年份或半年时，`date` 仅作为 Jekyll 排序锚点，`date_precision` 记录精度，页面显示 `date_label`（列表可使用 `date_label_short`），不展示虚构的具体日期。时间不明的微创新奖在腾讯获奖记录中注明任职期间背景，不单独编造时间点。

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
