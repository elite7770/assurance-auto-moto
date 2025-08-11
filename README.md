# AssurMobility — Assurance Auto & Moto

A modern single-page application for auto & moto insurance quotes, customer area, and support. Built with React and React Router, featuring authentication, a client dashboard, and advanced contact & support tools (live chat, FAQ, contact form with file upload, and appointment booking).

## Quick Start

```bash
npm install
npm start
```

- Runs at `http://localhost:3000`
- Build for production: `npm run build`
- Tests (CRA default): `npm test`

## Tech Stack
- React (Create React App)
- React Router
- CSS modules by feature folders

## Project Structure
```
assurance-auto-moto/
  public/
  src/
    components/
    pages/
    styles/
    context/
    App.js
    index.js
    index.css
  docs/
  package.json
```

See `docs/PROJECT_STRUCTURE.md` for a detailed breakdown.

## Key Features
- Authentication: login, registration, protected routes
- Client Dashboard: policies, claims, documents, profile
- Contact & Support: live chat, searchable FAQ, enhanced contact form (file upload), appointment booking
- Smooth navigation: scroll-to-top on route change
- Theming via CSS variables

Details in `docs/FEATURES.md`.

## Routes
- `/` Accueil
- `/assurance-auto` Assurance Auto
- `/assurance-moto` Assurance Moto
- `/devis` Devis
- `/a-propos` À propos
- `/contact` Contact & Support (Chat, FAQ, Contact, RDV)
- `/espace-client` Espace Client (Login / Register)
- `/dashboard` Tableau de bord (protégé)
- `/confirmation` Confirmation

More in `docs/ROUTES.md`.

## Theming
Global CSS variables live in `src/index.css` and power colors, gradients, and shadows across the app.
See `docs/THEME.md` for the variable list and usage examples.

## Contributing
- Use meaningful names and keep code readable
- Keep styles consistent with theme variables
- Place UI in `components/`, page-level in `pages/`, cross-cutting in `context/`

Read `docs/CONTRIBUTING.md` before opening a PR.

## License
This project is licensed under the terms in `LICENSE`.
