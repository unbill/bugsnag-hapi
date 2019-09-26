#!/bin/bash
export NODE_ENV=test

if [ "$1" = "watch" ]; then
  jest --watchAll
elif [ "$1" = "wip" ]; then
  jest -t WIP
else
  jest
fi

