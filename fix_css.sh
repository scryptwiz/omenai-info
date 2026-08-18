#!/bin/bash
sed -i '' 's/.hero-webgl-canvas {/.hero-webgl-canvas { z-index: 0;/' app/globals.css
sed -i '' 's/.outro-webgl-canvas {/.outro-webgl-canvas { z-index: 0;/' app/globals.css
sed -i '' 's/.hero-img-frame::after {/.hero-img-frame::after { background: linear-gradient(90deg, rgba(13,11,9,0.92) 0%, rgba(13,11,9,0.72) 38%, rgba(13,11,9,0.28) 62%, rgba(13,11,9,0) 80%), linear-gradient(180deg, rgba(13,11,9,0.32) 0%, rgba(13,11,9,0) 25%, rgba(13,11,9,0) 72%, rgba(13,11,9,0.55) 100%); z-index: 1; /' app/globals.css
sed -i '' 's/.hero-title {/.hero-title { text-shadow: 0 2px 40px rgba(13,11,9,0.45), 0 0 80px rgba(13,11,9,0.25); /' app/globals.css
sed -i '' 's/.hero-desc {/.hero-desc { text-shadow: 0 1px 20px rgba(13,11,9,0.6); color: rgba(255,255,255,0.88); /' app/globals.css
sed -i '' 's/.hero-eyebrow {/.hero-eyebrow { text-shadow: 0 1px 12px rgba(13,11,9,0.5); /' app/globals.css
sed -i '' 's/.does-image-wrap {/.does-image-wrap { position: relative; /' app/globals.css
sed -i '' 's/.payment-img {/.payment-img { position: relative; /' app/globals.css
sed -i '' 's/.ship-img-frame {/.ship-img-frame { position: relative; /' app/globals.css
