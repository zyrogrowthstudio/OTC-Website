#!/usr/bin/env bash
# Squashes index.html + styles.css + script.js into single files.
# Normal hosting does NOT need this - just upload the folder as it is.
#
#   demo.html      standalone page you can email or open from a USB stick
#   artifact.html  same page minus the <html>/<head>/<body> wrapper,
#                  used only for the Claude preview link
#
# Both land next to this script, in code/. They inline the CSS and JS
# but NOT the photos, so once images/ has real files in it, demo.html
# still needs the images folder sitting beside it to show them.
#
# Run with:  bash code/build.sh   (from anywhere - it finds its own way)

set -e
cd "$(dirname "$0")/.."          # the project root, whatever folder you ran this from

awk '
  /<link rel="stylesheet" href="code\/styles.css">/ {
    print "<style>"; while ((getline l < "code/styles.css") > 0) print l; print "</style>"; next
  }
  /<script src="code\/script.js">/ {
    print "<script>"; while ((getline l < "code/script.js") > 0) print l; print "</" "script>"; next
  }
  { print }
' index.html > code/demo.html

# strip the page wrapper for the Claude artifact
sed -e '/<!doctype html>/d' -e '/^<html/d' -e '/^<head>/d' -e '/^<meta charset/d' \
    -e '/name="viewport"/d' -e '/^<\/head>/d' -e '/^<body>/d' \
    -e '/^<\/body>/d' -e '/^<\/html>/d' code/demo.html > code/artifact.html

echo "code/demo.html and code/artifact.html written"
