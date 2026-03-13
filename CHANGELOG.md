# Changelog

All notable changes to this project will be documented in this file.

## [1.4.0] - 2026-03-13

### Added
- **Interactive Europass Scraper**: Replaced the static PDF parser with a robust, interactive `setup.js` powered by `cheerio`.
- **Smart Setup**: The configuration script now remembers previous settings (Name, Nickname, LinkedIn, Credly) and uses them as defaults.
- **Enhanced UI Integration**: Direct links to **Europass Profile**, **LinkedIn**, and **Credly** are now rendered in the `ResumeDoc` header.
- **Dynamic Content Support**: Improved extraction of work experience bullets and professional summaries directly from the Europass HTML structure.
- **Conditional Rendering**: UI elements (emails, certification links) now hide automatically if the data is not provided in `config.js`.

### Changed
- **Setup Workflow**: Moved from a PDF-based approach to a URL-based scraping method for better data consistency and lower user friction.
- **Deployment Process**: Simplified Cloudflare Pages build command to `npm run build`, emphasizing the importance of local setup before deployment.

## [1.3.0] - 2026-03-12

### Added
- **Visual Identity**: Replaced default Vite favicon with an authentic 4-color Windows logo SVG to match the Start button.

## [1.2.0] - 2026-03-12

### Changed
- **UX Polish**: Custom CV download filename for better professional identification (`Matias_Carlos_Siri_Brenta_CV-EUROPASS.pdf`).
- **Performance**: Optimized boot sequence speed (reduced from 3.5s to 2s) for faster access while maintaining the retro aesthetic.

## [1.1.0] - 2026-03-12

### Added
- **High-Fidelity Windows NT 4.0 UI**: Enhanced visual resolution and fidelity.
- **Classic Windows Logo**: Authentic 4-color Microsoft Windows logo on the Start button.
- **Tahoma Typography**: Replaced pixelated fonts with crisp, anti-aliased Tahoma for a professional "NT Workstation/Server" look.
- **High-Color Title Bars**: Reintroduced smooth gradients in active window title bars (True Color 24-bit style).
- **Refined 3D Borders**: Improved 2px beveled borders for all windows and UI elements for better definition on modern displays.
- **Custom Scrollbars**: Classic Windows-style scrollbars implemented via CSS.
- **Dynamic Active States**: Windows now visually reflect their focus state (active/inactive) via title bar color shifts.

### Changed
- **Performance**: Removed modern "framer-motion" animations in favor of instant, snappy UI responses characteristic of the 90s.
- **Visual Polish**: Updated desktop selection box and icon labels for better contrast and accuracy.

## [1.0.0] - 2026-03-12

### Added
- **Windows NT Server Theme**: Complete visual overhaul from the original Windows 98 aesthetic to a professional NT Server look.
- **Magic Setup (`setup.js`)**: Automated parser for Europass CV PDFs using `pdf-parse`.
- **Dynamic Configuration**: Automatic generation of `src/config.js` based on PDF extraction.
- **Structured Resume Window**: New `ResumeDoc` component for high-fidelity rendering of professional experience.
- **Certifications Window**: Dedicated UI for displaying professional badges and credentials.
- **Local Assets**: All dependencies (icons, PDFs) are now served locally, removing external cloud requirements (Cloudflare R2).

### Changed
- **Architecture**: Refactored the project to be fully static and portable.
- **Build Process**: Integrated `npm run setup` into the deployment workflow for Cloudflare Pages.

### Fixed
- Improved Regex patterns for more accurate extraction of LinkedIn profiles and emails from PDFs.
