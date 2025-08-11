# Theme & Design Tokens

Theme variables are declared in `src/index.css` under `:root`.

## Colors
- `--color-primary`: primary brand blue
- `--color-primary-700`: lighter primary for hovers
- `--color-accent`, `--color-accent-2`: accent colors
- `--color-dark`, `--color-light`, `--color-text`
- `--color-surface`, `--color-surface-2`, `--color-border`
- `--color-success`, `--color-danger`

## Shadows
- `--shadow-sm`, `--shadow-md`, `--shadow-lg`

## Gradients
- `--gradient-primary`: primary gradient used in headers/buttons

## Usage Example
```css
.button-primary {
  background: var(--gradient-primary);
  color: var(--color-light);
  box-shadow: var(--shadow-sm);
}
```
