#!/bin/bash

if [ ! -f /etc/nginx/ssl/default.crt ]; then
    openssl genrsa -out "/etc/nginx/ssl/default.key" 2048
    openssl req -new -key "/etc/nginx/ssl/default.key" -out "/etc/nginx/ssl/default.csr" -subj "/CN=default/O=default/C=UK"
    openssl x509 -req -days 365 -in "/etc/nginx/ssl/default.csr" -signkey "/etc/nginx/ssl/default.key" -out "/etc/nginx/ssl/default.crt"
fi

if [ ! -f /etc/nginx/ssl/nuwwe.pp.crt ]; then
    openssl genrsa -out "/etc/nginx/ssl/nuwwe.pp.key" 2048
    openssl req -new -key "/etc/nginx/ssl/nuwwe.pp.key" -out "/etc/nginx/ssl/nuwwe.pp.csr" -subj "/ST=None/L=NB/CN=nuwwe.pp/O=gexnova/C=UK/subjectAltName=DNS.1=nuwwe.pp" -sha256
    openssl x509 -req -days 365 -in "/etc/nginx/ssl/nuwwe.pp.csr" -signkey "/etc/nginx/ssl/nuwwe.pp.key" -out "/etc/nginx/ssl/nuwwe.pp.crt" -extfile "/etc/config_ssl/nuwwe_v3.ext"
fi

# Start crond in background
crond -l 2 -b

# Start nginx in foreground
nginx
