#!/bin/sh

SCRIPT=$(readlink -f $0)
SCRIPTPATH=`dirname $SCRIPT`

cd $SCRIPTPATH && git pull | grep -v "Already up-to-date." | mail -E -s "$SCRIPTPATH" tech-logs@framalistes.org
chown -R $(stat -c '%U:%G' .) .
