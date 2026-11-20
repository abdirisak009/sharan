# Production image for the SHARAN website (Next.js standalone output).
FROM node:24-alpine AS deps
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci

FROM node:24-alpine AS build
WORKDIR /app
COPY --from=deps /app/node_modules ./node_modules
COPY . .
ENV NEXT_TELEMETRY_DISABLED=1
# No database during the build: pages are prerendered with the default
# content and refresh from PostgreSQL a few minutes after the site starts.
RUN npm run build

FROM node:24-alpine AS run
WORKDIR /app
ENV NODE_ENV=production NEXT_TELEMETRY_DISABLED=1 PORT=3000 HOSTNAME=0.0.0.0
RUN addgroup -S app && adduser -S app -G app
COPY --from=build --chown=app:app /app/.next/standalone ./
COPY --from=build --chown=app:app /app/.next/static ./.next/static
COPY --from=build --chown=app:app /app/public ./public
# Database setup script (runs on every start; it is idempotent). The pg driver
# it uses is already in the standalone node_modules.
COPY --from=build /app/db ./db
COPY --from=build /app/scripts/db-setup.mjs ./scripts/db-setup.mjs
COPY --from=build /app/src/lib/auth/password.ts ./src/lib/auth/password.ts
COPY --from=build /app/src/lib/news/defaults.ts ./src/lib/news/defaults.ts
COPY deploy/entrypoint.sh /entrypoint.sh
USER app
EXPOSE 3000
ENTRYPOINT ["/bin/sh", "/entrypoint.sh"]
