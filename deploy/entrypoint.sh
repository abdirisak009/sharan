#!/bin/sh
set -e
# Create tables (and the first admin if there are no users), then start the site.
node --disable-warning=MODULE_TYPELESS_PACKAGE_JSON scripts/db-setup.mjs
exec node server.js
