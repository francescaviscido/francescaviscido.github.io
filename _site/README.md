# DEV

❯ export JEKYLL_VERSION=4.0
❯ docker run --rm -p 4000:4000 --volume="$PWD:/srv/jekyll"  -it jekyll/jekyll:$JEKYLL_VERSION jekyll serve