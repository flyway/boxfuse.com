@echo off
start /b jekyll serve -w
timeout 10 > nul
browser-sync start --proxy localhost:4000 --files _site/**/*