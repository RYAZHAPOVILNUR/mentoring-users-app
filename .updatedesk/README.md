# UpdateDesk Release Cards

This repository is connected to UpdateDesk.

## How To Work

1. Make the product change.
2. Run relevant checks and keep the command names.
3. Capture screenshots when UI changed.
4. Create a release card in `.updatedesk/releases/`.
5. Commit the release card together with the code change.
6. Mention the release card path in the commit body when possible.
7. Push the branch. UpdateDesk will also receive GitHub webhook events.
8. Review the generated draft in UpdateDesk and publish it to the linked Telegram channel.

After every user-visible change, Claude/Codex should create a release card:

```txt
.updatedesk/releases/YYYY-MM-DD-project-short-title.md
```

Create a card:

```bash
npm run updatedesk:note -- --project mentoring-users-app --title "Что изменилось"
```

GitHub webhook:

```txt
https://updates.nurtech.dev/api/webhooks/github
```

Repository in UpdateDesk:

```txt
RYAZHAPOVILNUR/mentoring-users-app
```

## GitHub Webhook

Add this webhook in GitHub repository settings:

- Payload URL: `https://updates.nurtech.dev/api/webhooks/github`
- Content type: `application/json`
- Secret: the same value as `GITHUB_WEBHOOK_SECRET` on `updates.nurtech.dev`
- Events: `push`, `pull_request`, `release`, `deployment`, `deployment_status`

## Commit Body Marker

```txt
UpdateDesk:
release-card: .updatedesk/releases/YYYY-MM-DD-project-short-title.md
public: true
```

## Card Format

```md
---
project: mentoring-users-app
public: true
type: feature
audience: users
title: Короткий заголовок обновления
summary: Одно-два предложения о результате для пользователя.
user_impact:
  - Конкретный эффект для пользователя.
screenshots:
  - artifacts/screens/example-desktop.png
checks:
  - npm test
deploy_url: https://...
---

Notes for editor:
- What changed:
- Where to verify:
- Risks:
```

## Fields

- `project`: UpdateDesk project slug.
- `public`: `true` for Telegram-ready updates, `false` for internal work.
- `type`: `feature`, `fix`, `design`, `performance`, `release`, `docs`, or `internal`.
- `audience`: `users`, `admins`, `team`, or a custom segment.
- `title`: short public title.
- `summary`: clear user-facing summary.
- `user_impact`: concrete effects for the user.
- `screenshots`: local paths or public URLs when UI changed.
- `checks`: commands or manual checks that passed.
- `deploy_url`: where the result can be verified.
