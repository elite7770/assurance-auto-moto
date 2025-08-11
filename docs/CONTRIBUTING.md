# Contributing

Thanks for your interest in improving this project!

## Workflow
1. Create a feature branch from `main`
2. Keep edits focused and cohesive
3. Run the app locally to verify (`npm start`)
4. Add/update docs under `docs/` if behavior changes
5. Open a Pull Request with a clear description

## Code Style
- Prefer clear names and small components
- Use theme variables from `src/index.css`
- Place shared UI in `src/components/`, pages in `src/pages/`
- Keep CSS in `src/styles/` and avoid inlined styles

## Testing
- Use CRA test runner for unit tests where appropriate (`npm test`)

## Security
- Never commit secrets. Use environment variables if needed.
