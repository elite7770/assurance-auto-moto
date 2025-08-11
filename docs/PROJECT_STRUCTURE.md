# Project Structure

```
src/
  components/        # Reusable UI blocks (Header, Footer, forms, widgets)
  pages/             # Route-level pages (Home, Contact, Dashboard, etc.)
  styles/            # Feature-specific CSS files and global helpers
  context/           # React contexts for app-wide state (e.g., Auth)
  App.js             # Router and common layout
  index.js           # App bootstrap
  index.css          # Global CSS + theme variables
public/               # CRA public assets
```

## Conventions
- Page-level UI under `src/pages/`
- Reusable pieces under `src/components/`
- Styles colocated under `src/styles/` with clear names: `FeatureName.css`
- Global theme variables: `src/index.css`
- Cross-cutting state in `src/context/`

## Notable Components
- `Header`, `Footer`
- `ScrollToTop`
- `LoginForm`, `RegisterForm`
- `ProtectedRoute`
- `LiveChatWidget`, `FAQSection`, `EnhancedContactForm`, `AppointmentBooking`
- `Dashboard` (page)
