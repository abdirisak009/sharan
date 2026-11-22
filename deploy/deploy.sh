#!/usr/bin/env bash
# Deploys this folder to the SHARAN server and rebuilds the website.
#
#   ./deploy/deploy.sh                              # uses ~/.ssh/sharan_deploy
#   SSH_KEY=/path/to/sharan_deploy ./deploy/deploy.sh
#
# Uploads the code with rsync (files deleted here are deleted on the server
# too), keeps the server's deploy/.env with its passwords and the nightly
# backups in deploy/backups/, then runs
# `docker compose up -d --build`. The database, uploaded photos and HTTPS
# certificates live in Docker volumes and are not touched.
set -euo pipefail

SERVER="${SERVER:-deploy@13.140.146.169}"
SSH_KEY="${SSH_KEY:-$HOME/.ssh/sharan_deploy}"
REMOTE_DIR="/opt/sharan"
SSH=(ssh -i "$SSH_KEY" -o IdentitiesOnly=yes)

cd "$(dirname "$0")/.."
[ -f "$SSH_KEY" ] || { echo "SSH key not found: $SSH_KEY (set SSH_KEY=...)" >&2; exit 1; }

echo "→ Uploading code to $SERVER:$REMOTE_DIR"
rsync -az --delete -e "${SSH[*]}" \
  --exclude ".git/" --exclude "node_modules/" --exclude ".next/" --exclude "*.tsbuildinfo" \
  --exclude ".env" --exclude ".env.local" --exclude "deploy/.env" --exclude "deploy/build.log" --exclude "deploy/backups/" \
  ./ "$SERVER:$REMOTE_DIR/"

echo "→ Rebuilding and restarting (takes a few minutes)"
"${SSH[@]}" "$SERVER" "cd $REMOTE_DIR/deploy && docker compose up -d --build --remove-orphans"

echo "→ Checking the website"
for _ in $(seq 30); do
  if "${SSH[@]}" "$SERVER" "docker compose -f $REMOTE_DIR/deploy/compose.yaml exec -T web wget -q -O /dev/null http://127.0.0.1:3000/" 2>/dev/null; then
    echo "✓ Deployed. The website is up."
    exit 0
  fi
  sleep 5
done
echo "✗ The website did not respond after deploying. Check: ssh $SERVER 'cd $REMOTE_DIR/deploy && docker compose logs web --tail 50'" >&2
exit 1
