#!/bin/sh

SCRIPT=$(readlink -f $0)
SCRIPTPATH=`dirname $SCRIPT`

cd $SCRIPTPATH && git pull && chown -R $(stat -c '%U:%G' .) . && sassc css/scss/frama.scss css/frama.css
