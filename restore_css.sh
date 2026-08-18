#!/bin/bash
echo '@import "tailwindcss";' > app/globals.css
awk '/<style>/, /<\/style>/' omenai-info-light.html | grep -v '<style>' | grep -v '</style>' >> app/globals.css
