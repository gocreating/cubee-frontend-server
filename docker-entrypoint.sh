#!/bin/bash
set -e

case "$@" in
*)
    exec yarn start:prod
    ;;
esac
