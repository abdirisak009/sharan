#!/bin/sh
# Nightly backups of the database and uploaded photos, run by the "backup"
# service in compose.yaml. Files land in deploy/backups/ on the server.
#
# These backups sit on the same disk as the live data: copy them to another
# machine or to cloud storage regularly, or a disk failure still loses both.
#
# Restore the database:  docker compose exec -T db pg_restore -U sharan -d sharan --clean < backups/db-<date>.dump
# Restore photos:        stop minio, extract media-<date>.tar.gz into the miniodata volume, start minio.
set -eu
KEEP_DAYS="${KEEP_DAYS:-14}"

while true; do
  day=$(date +%F)
  echo "[backup] $day: starting"
  pg_dump -h db -U sharan -d sharan -Fc > "/backups/db-$day.dump.tmp" && mv "/backups/db-$day.dump.tmp" "/backups/db-$day.dump"
  tar -czf "/backups/media-$day.tar.gz.tmp" -C /minio . && mv "/backups/media-$day.tar.gz.tmp" "/backups/media-$day.tar.gz"
  find /backups -type f -mtime +"$KEEP_DAYS" -delete
  echo "[backup] $day: done; keeping $KEEP_DAYS days"
  sleep 86400
done
