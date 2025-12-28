# Agent Notes

- The root `compose.yaml` aggregates per-domain stacks using Compose `include:`.
- `vpn/compose.yaml` defines the external `proxy` network and routes media services through the VPN container.
- `media/compose.yaml` mounts storage under `media/storage/` and relies on `PUID/PGID` for permissions.
- `images/compose.yaml` uses an absolute `env_file` path; if the repo moves, update it or add a symlink.
