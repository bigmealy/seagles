# Seagles Website

Public-facing website for Seagles, an Eagles tribute band based in north-east Scotland. Full requirements live in `docs/product-spec.md` (features/content) and `docs/technical-spec.md` (stack/architecture) — read those before making product or technical decisions here.

## Status

No application code yet. The repo currently contains only the two spec docs — Astro/Tailwind scaffolding per `docs/technical-spec.md` has not been started.

## Git / GitHub

- Remote: https://github.com/bigmealy/seagles (public)
- This is a **personal** project — use the `bigmealy` GitHub account, not a work account, for commits and `gh` operations. If `gh auth status` ever shows a different active account, switch with `gh auth switch -h github.com -u bigmealy` (or `gh auth login` if it isn't stored at all) before pushing or creating PRs/issues.
- Default branch: `main`. No CI/CD configured yet — the technical spec calls for Azure Static Web Apps' GitHub Actions integration once there's a site to deploy.
- **Never run `git commit` or `git push` in this repo without explicit go-ahead from the user for that specific change.** Make/stage changes and describe what would be committed, then wait for confirmation before committing or pushing.
