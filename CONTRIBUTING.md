# Contributing to Chalo Ghume

Thanks for your interest in contributing! This document covers how to fork, branch, make changes, test, and submit pull requests to this project.

## Forking

1. Click **Fork** at the top right of the [repository page](https://github.com/[YOUR ORG]/Chalo-Ghume) to create your own copy under your GitHub account.
2. Clone your fork locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/Chalo-Ghume.git
   cd Chalo-Ghume
   ```
3. Add the original repository as an upstream remote, so you can pull in future updates:
   ```bash
   git remote add upstream https://github.com/[YOUR ORG]/Chalo-Ghume.git
   ```

## Branching

This project was built directly on `main` during the course timeline, without a formal branching workflow. Going forward, new contributors should **not** commit directly to `main` — instead, create a branch for each change:

- `feature/short-description` — new functionality
- `bugfix/short-description` — bug fixes
- `docs/short-description` — documentation-only changes

```bash
git checkout -b feature/your-feature-name
```

Keep branches focused on a single change where possible. This keeps `main` stable and makes changes easier to review than the all-on-main approach used during initial development.

## Making Changes

- Follow the existing project structure: page components live in `src/Pages`, shared UI in `src/Components`, and Redux logic in `src/Redux/<FeatureName>` with separate `action.js`, `actionType.js`, and `reducer.js` files.
- Match existing naming conventions (PascalCase for components, `camelCase` for functions/variables).
- Run the linter before committing — this project uses the default Create React App ESLint config:
  ```bash
  npm run build
  ```
  (react-scripts surfaces lint warnings during build; there is no separate `npm run lint` script currently.)
- Keep commits small and write clear commit messages describing *what* changed and *why*.

## Testing

There is currently **no meaningful automated test suite** in this project — the only existing test file is the default Create React App smoke test, which does not reflect this application. Until a real test suite is added:

- Manually verify your change in the browser against the flows it affects (login/register, search, booking, cart, checkout, or admin panel as relevant).
- If you add a new feature, adding a basic test alongside it (using `@testing-library/react`, already a dependency) is strongly encouraged.
- Note any manual testing you performed in your pull request description.

## Pull Requests

Changes during initial development were pushed directly to `main` without a pull request process. For future contributions, please use the process below instead:

1. Push your branch and open a pull request against `main`.
2. Give the PR a clear, descriptive title and fill in what changed and why.
3. Link any related issue.
4. Include screenshots or a short clip for any UI changes.
5. Request at least one review from a teammate before merging.
6. Resolve merge conflicts locally before requesting review.

## Coding Expectations

- Keep components small and focused; extract shared logic into its own component or hook rather than duplicating it.
- Prefer functional components with hooks (the existing codebase does not use class components).
- Keep Redux action/actionType/reducer files organized per feature, matching the existing `src/Redux/<FeatureName>` pattern.
- Avoid introducing new UI libraries without team discussion — this project already uses Chakra UI, Emotion, and styled-components together, and adding more increases bundle size and inconsistency.
- Comment non-obvious logic, especially around the Firebase phone-auth flow and the two-backend setup (Firebase for auth, `json-server` for data).

## Environment Variables — Do Not Commit `.env`

This project uses a `.env` file to store Firebase configuration values. **Never commit your `.env` file.**

- Copy `.env.example` to `.env` locally and fill in your own Firebase project's values (see [README.md → Firebase Setup](./README.md#firebase-setup)).
- Confirm `.env` is listed in `.gitignore` before committing — the default Create React App `.gitignore` only excludes `.env.local` and its variants, **not** a plain `.env` file, so this needs to be added explicitly.
- If you accidentally commit real credentials, rotate/regenerate them in the Firebase console immediately and notify the team — don't rely on a follow-up commit to "remove" them, since they remain in git history.

## Questions?

Open an issue or reach out to [TEAM CONTACT / TEAM LEAD] before starting significant work, to avoid duplicated effort.