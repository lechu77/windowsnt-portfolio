# Windows NT Server Interactive Portfolio (High-Fidelity)

A professional, high-fidelity Windows NT Server 4.0 inspired interactive resume built with React. This is a highly automated, portable portfolio designed for IT professionals and systems administrators who appreciate the classic "server room" aesthetic.

## 🚀 Magic Setup (The 2-Step Deployment)

This project is designed to be fully portable. You don't need to edit complex JSON files manually.

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Interactive Setup**:
    ```bash
    npm run setup
    ```

**What happens next?** Our "Magic Setup" script (powered by `cheerio`) will connect to your **Europass Shared Profile URL**, automatically scrape your experience, skills, and certifications, and configure the entire portfolio for you. The script is interactive and will ask for your preferred name, nickname, and profile links (LinkedIn, Credly).

## Credits

This project is a customized, highly automated fork of [matumenar84's win98-portfolio](https://github.com/matumenar84/win98-portfolio), re-engineered for a high-fidelity **Windows NT Server 4.0** aesthetic.

## Features

- **High-Fidelity NT 4.0 Interface**: Professional "High-Color" UI with Tahoma typography, 3D beveled borders, and smooth gradients.
- **Authentic Start Menu**: Featuring the classic 4-color Windows logo and NT-style vertical branding.
- **Universal Europass Scraper**: Automated data extraction from shared Europass Profile URLs.
- **Interactive Configuration**: Smart setup script that remembers your previous settings.
- **Structured Resume Window**: A crisp "Resume.doc" experience with integrated links to LinkedIn, Credly, and your original Europass profile.
- **Certification Badges**: Automated extraction and display of your professional credentials with verification support.
- **Retro Boot Experience**: Authentic Windows NT Server 4.0 boot sequence.
- **Fully Static**: Zero external cloud dependencies, optimized for Cloudflare Pages.

## Local Development

```bash
npm run dev
```

## ☁️ Deployment (Cloudflare Pages)

This portfolio is built with Vite and is ready to be hosted on **Cloudflare Pages**.

### Build Settings:
- **Framework preset**: `Vite`
- **Build command**: `npm run setup && npm run build`
- **Build output directory**: `dist`
