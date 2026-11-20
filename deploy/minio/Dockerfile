# MinIO no longer publishes Docker images, so build the official release from
# source (github.com/minio/minio, AGPL-3.0).
FROM golang:1.24-alpine AS build
RUN apk add --no-cache git
ARG MINIO_RELEASE=RELEASE.2025-10-15T17-29-55Z
RUN git clone --depth 1 --branch "$MINIO_RELEASE" https://github.com/minio/minio.git /src
WORKDIR /src
RUN CGO_ENABLED=0 go build -trimpath -ldflags "-s -w" -o /minio .

FROM alpine:3.22
RUN apk add --no-cache ca-certificates curl && adduser -S -H minio && mkdir /data && chown minio /data
COPY --from=build /minio /usr/bin/minio
USER minio
EXPOSE 9000 9001
ENTRYPOINT ["minio"]
