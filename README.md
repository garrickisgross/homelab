# Homelab Stack

## Overview
This repository defines a Docker Compose-based homelab stack. The top-level `compose.yaml` includes service-specific compose files from these folders:

- `cloudflare/`: Cloudflare Tunnel (`cloudflared`) for remote access.
- `db/`: PostgreSQL database used by multiple services.
- `images/`: Immich (photo management) and its dependencies.
- `media/`: Media apps like qBittorrent, Sonarr, Radarr, Prowlarr, Jellyfin, and Jellyseerr.
- `obsidian/`: CouchDB for Obsidian LiveSync.
- `vpn/`: Gluetun VPN container that other services route through.

If a folder contains its own README (for example, `media/README.md`), read it for service-specific setup details.

## Prerequisites
- Linux host (recommended) with Docker installed.
- Docker Engine **24+** and Docker Compose **v2.20+** (required for the `include:` feature in `compose.yaml`).
- Basic CLI tools: `bash`, `cp`, and `mkdir` (standard on most Linux distros).

## Environment variables
Create a `.env` file at the repository root. These keys are referenced by the Compose files:

**Required**
- `PUID`: User ID for container file permissions.
- `PGID`: Group ID for container file permissions.
- `TZ`: Timezone (e.g., `America/Chicago`).
- `CLOUDFLARE_TOKEN`: Cloudflare Tunnel token.
- `VPN_SERVICE_PROVIDER`: VPN provider name (used by Gluetun).
- `VPN_TYPE`: VPN type (e.g., `wireguard`).
- `NORDVPN_PRIVATE_KEY`: WireGuard private key (used when `VPN_TYPE=wireguard`).
- `SERVER_REGIONS`: VPN server region selector.
- `DB_USERNAME`: Postgres user.
- `DB_PASSWORD`: Postgres password.
- `DB_DATABASE_NAME`: Postgres database name.
- `DB_DATA_LOCATION`: Host path for Immich Postgres data storage.
- `UPLOAD_LOCATION`: Host path where Immich stores uploads.
- `COUCHDB_PASS`: CouchDB admin password for Obsidian LiveSync.

**Optional**
- `IMMICH_VERSION`: Immich image tag (defaults to `release`).

> Note: `images/compose.yaml` references `/home/homelab/homelab/.env`. If you clone this repo elsewhere, update that path or create a symlink so the containers can load your `.env` file.

## Quick start
Run these commands from the repo root:

```bash
cp .env.example .env
# Edit .env with your values
nano .env

# Create the external network required by vpn/compose.yaml
docker network create proxy

# Start the stack
docker compose up -d
```

## Verification
Use these commands to confirm everything is running:

```bash
docker compose ps
```

Common service URLs (adjust host/IP if needed):

- Jellyfin: `http://localhost:8096`
- Jellyseerr: `http://localhost:5055`
- Immich: `http://localhost:2283`
- CouchDB (Obsidian LiveSync): `http://localhost:5984`
- PostgreSQL: `localhost:5432`

Services routed through the VPN container are bound to the host IP defined in `vpn/compose.yaml` (currently `192.168.0.246`):

- qBittorrent UI: `http://192.168.0.246:8080`
- Sonarr: `http://192.168.0.246:8989`
- Radarr: `http://192.168.0.246:7878`
- Prowlarr: `http://192.168.0.246:9696`

## Troubleshooting
- **`include:` not recognized**: Upgrade Docker Compose to v2.20+.
- **`proxy` network missing**: Run `docker network create proxy` before `docker compose up -d`.
- **Containers can’t read `.env`**: Update the `env_file` path in `images/compose.yaml` or create a symlink to `/home/homelab/homelab/.env`.
- **Permission errors on mounted volumes**: Ensure `PUID` and `PGID` match your user/group IDs (`id -u`, `id -g`).
- **VPN services not reachable**: Confirm the host IP in `vpn/compose.yaml` matches your LAN IP and that the VPN credentials are correct.
