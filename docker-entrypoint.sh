#!/bin/bash
set -e

case "$@" in
*)
    exec yarn start:pm2
    ;;
esac
