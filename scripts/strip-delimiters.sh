#!/bin/sh
# Strip all lines before the line containing "RUNTIME_DATA_START"
sed -n '/RUNTIME_DATA_START$/,$ {
    /RUNTIME_DATA_START$/d
    p
}'