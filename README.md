# Windows NT Server Interactive Portfolio (High-Fidelity)

A professional, high-fidelity Windows NT Server 4.0 inspired interactive resume built with React. This is a highly automated, portable portfolio designed for IT professionals and systems administrators who appreciate the classic "server room" aesthetic.

## 🚀 Local Setup (Mandatory)

This project is designed to be fully portable, but requires an **interactive setup** to generate your personal configuration before deployment.

1.  **Install Dependencies**:
    ```bash
    npm install
    ```
2.  **Run Interactive Setup**:
    ```bash
    npm run setup
    ```

**What happens?** The `setup` script will connect to your **Europass Shared Profile URL**, scrape your data, and prompt you for your preferred name, nickname, and profile links (LinkedIn, Credly). This generates `src/config.js`, which serves as the data source for the entire site. 

**Important**: You must **commit and push** the generated `src/config.js` to your repository for the site to work in production.

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

Since the setup is interactive, it **cannot** be run during the build process on Cloudflare. You must run the setup locally and commit the result.

### Build Settings:
- **Framework preset**: `Vite`
- **Build command**: `npm run build`
- **Build output directory**: `dist`
