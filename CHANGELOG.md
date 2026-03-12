# Changelog

All notable changes to this project will be documented in this file.

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
