#!/bin/sh

PREFIX="[RACING]"
RESOURCE="npwd_qb_racing"

echo "$PREFIX Creating release"

## Create temporary folder and move files into it. Keeping same structure according to fxmanifest.lua
mkdir -p ./temp

cp README.md fxmanifest.lua ./temp
cp -r ./web ./temp
cp -r ./dist ./temp/dist # Copy files


echo "$PREFIX Zipping it up: $RESOURCE.zip"

zip -r $RESOURCE.zip ./temp