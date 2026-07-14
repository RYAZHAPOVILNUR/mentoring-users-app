# AGENTS.md

## UpdateDesk Release Cards

After every user-visible product change, Claude/Codex must create a release card for UpdateDesk.

Required flow:

1. Finish the code change.
2. Run the relevant checks.
3. Capture screenshots when UI changed.
4. Create a release card in `.updatedesk/releases/`.
5. Commit the release card together with the code when possible.
6. Mention the release card path in the commit body.

Card path:

```txt
.updatedesk/releases/YYYY-MM-DD-project-short-title.md
```

Use the helper when possible:

```bash
npm run updatedesk:note -- --project <project-slug> --title "<public title>"
```

Required fields:

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

When committing, mention the card path in the commit body:

```txt
UpdateDesk:
release-card: .updatedesk/releases/YYYY-MM-DD-project-short-title.md
public: true
```

Git diffs and commit messages are fallback signals. The release card is the primary source for Telegram posts.
