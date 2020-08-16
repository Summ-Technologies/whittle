#!/usr/bin/env bash
if [[ -z "$API_URL" ]]; then
    echo "API_URL environment variable needs to be present."
    exit 1
fi
echo "window.appConfig={}" > /usr/share/nginx/html/config.js
echo "window.appConfig.server_base_url=\"$API_URL\"" >> /usr/share/nginx/html/config.js
