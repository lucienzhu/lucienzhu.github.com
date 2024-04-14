```
# step 1: instal bundler
gem install bundler

# step 2: install jeykll
bundle install

# step 3: run site
bundle exec jekyll serve
```

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