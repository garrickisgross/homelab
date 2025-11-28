// Basic service config: name, URL, group, description, icon.
const SERVICES = [
  {
    name: "Jellyfin",
    url: "https://jellyfin.gross-home-lab.com",
    group: "Media",
    description: "Stream movies and TV from your local library.",
    icon: "🎬"
  },
  {
    name: "Jellyseerr",
    url: "https://jellyseerr.gross-home-lab.com",
    group: "Media",
    description: "Manage and approve media requests for Jellyfin.",
    icon: "📥"
  },
  {
    name: "qBittorrent",
    url: "https://torrent.gross-home-lab.com",
    group: "Downloads",
    description: "BitTorrent client running behind VPN.",
    icon: "⬇️"
  },
  {
    name: "Prowlarr",
    url: "https://indexers.gross-home-lab.com",
    group: "Downloads",
    description: "Indexer manager feeding *arr applications.",
    icon: "🧭"
  },
  {
    name: "Sonarr",
    url: "https://sonarr.gross-home-lab.com",
    group: "Downloads",
    description: "Automated TV show management.",
    icon: "📺"
  },
  {
    name: "Radarr",
    url: "https://radarr.gross-home-lab.com",
    group: "Downloads",
    description: "Automated movie management.",
    icon: "🎞️"
  },
  {
    name: "LazyLibrarian",
    url: "https://lazy-librarian.gross-home-lab.com",
    group: "Books",
    description: "Automation for ebooks and audiobooks.",
    icon: "📚"
  },
  {
    name: "Kavita",
    url: "https://kavita.gross-home-lab.com",
    group: "Books",
    description: "Reader for ebooks, manga, and comics.",
    icon: "📖"
  },
  {
    name: "Audiobookshelf",
    url: "https://audiobookshelf.gross-home-lab.com",
    group: "Books",
    description: "Stream audiobooks with rich progress tracking.",
    icon: "🎧"
  },
  {
    name: "OpenWebUI",
    url: "https://chat.gross-home-lab.com",
    group: "Tools",
    description: "Web UI for local and remote AI models.",
    icon: "🤖"
  },
  {
    name: "Homelab Host",
    url: "https://home.gross-home-lab.com",
    group: "Infra",
    description: "This dashboard and base entrypoint.",
    icon: "💻"
  }
];

// Render cards

function renderCards() {
  const grid = document.getElementById("services-grid");
  if (!grid) return;

  SERVICES.forEach((svc) => {
    const card = document.createElement("article");
    card.className = "card";
    card.onclick = () => {
      window.open(svc.url, "_blank", "noopener");
    };

    card.innerHTML = `
      <div class="card-header">
        <div class="card-title-row">
          <div class="card-icon">${svc.icon}</div>
          <h3 class="card-title">${svc.name}</h3>
        </div>
        <div class="card-badge">${svc.group}</div>
      </div>
      <div class="card-body">
        ${svc.description}
      </div>
      <div class="card-meta-row">
        <div class="card-group">
          <span>${new URL(svc.url).hostname}</span>
        </div>
        <div class="card-actions">
          <button class="card-button" type="button">
            <span>Open</span> ↗
          </button>
        </div>
      </div>
    `;

    grid.appendChild(card);
  });
}

// Simple local time in header

function startClock() {
  const el = document.getElementById("local-time");
  if (!el) return;

  function tick() {
    const now = new Date();
    const time = now.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit", second: "2-digit" });
    el.textContent = time;
  }

  tick();
  setInterval(tick, 1000);
}

// Footer year

function setFooterYear() {
  const el = document.getElementById("footer-year");
  if (!el) return;
  const year = new Date().getFullYear();
  el.textContent = `© ${year}`;
}

document.addEventListener("DOMContentLoaded", () => {
  renderCards();
  startClock();
  setFooterYear();

  // Optional: set host name label dynamically from location host
  const hostEl = document.getElementById("host-name");
  if (hostEl) {
    hostEl.textContent = window.location.hostname || "homelab";
  }
});
