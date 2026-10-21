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

Projects 的分组、经历、日期、个人角色和中英文文案集中在 `_data/projects.json`。分组使用稳定 `id` 生成页内导航；`layout: text` 用于不需要配图的研究、竞赛和分享记录。论文按正式会议年份标注，工作经历按实际任职期间标注，赛事年份与赛事报告发表年份分别说明。新增内容应附公开的论文、代码、赛事或活动链接，团队项目须明确个人角色。

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
