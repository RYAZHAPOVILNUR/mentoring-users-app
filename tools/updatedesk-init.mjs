#!/usr/bin/env node
import { mkdir, readFile, writeFile } from 'fs/promises';
import { basename, join, resolve } from 'path';
import { fileURLToPath } from 'url';
import { parseArgs } from 'util';

const { values } = parseArgs({
  options: {
    project: { type: 'string', short: 'p' },
    repo: { type: 'string', short: 'r' },
    cwd: { type: 'string' },
    webhook: { type: 'string' },
    force: { type: 'boolean' },
  },
});

const cwd = resolve(values.cwd || process.cwd());
const project = values.project || safeSlug(basename(cwd)) || 'project-slug';
const repository = values.repo || 'NurTechKSA/repository-name';
const webhook = values.webhook || 'https://updates.nurtech.dev/api/webhooks/github';

await mkdir(join(cwd, '.updatedesk', 'releases'), { recursive: true });
await mkdir(join(cwd, 'tools'), { recursive: true });
await writeIfMissing(join(cwd, '.updatedesk', 'releases', '.gitkeep'), '\n');
await writeFile(join(cwd, '.updatedesk', 'README.md'), readmeContent());
await writeFile(join(cwd, 'tools', 'updatedesk-init.mjs'), await initScript(), { mode: 0o755 });
await writeFile(join(cwd, 'tools', 'updatedesk-note.mjs'), noteScript(), { mode: 0o755 });
await upsertPackageScripts(join(cwd, 'package.json'));
await upsertAgents(join(cwd, 'AGENTS.md'));

console.log(`UpdateDesk initialized for ${project}`);
console.log(`Repository: ${repository}`);
console.log(`Webhook: ${webhook}`);
console.log('');
console.log('Next steps:');
console.log('1. Add this GitHub webhook to the repository:');
console.log(`   ${webhook}`);
console.log('2. Select events: push, pull_request, release, deployment, deployment_status.');
console.log('3. Set Content type: application/json.');
console.log('4. Use the same secret as GITHUB_WEBHOOK_SECRET on updates.nurtech.dev.');
console.log('5. Create cards with:');
console.log(`   npm run updatedesk:note -- --project ${project} --title "Что изменилось"`);

async function writeIfMissing(path, content) {
  if (!values.force) {
    try {
      await readFile(path, 'utf8');
      return;
    } catch {
      // create below
    }
  }
  await writeFile(path, content);
}

async function upsertPackageScripts(path) {
  let pkg;
  try {
    pkg = JSON.parse(await readFile(path, 'utf8'));
  } catch {
    pkg = { scripts: {} };
  }
  pkg.scripts = {
    ...(pkg.scripts || {}),
    'updatedesk:init': 'node tools/updatedesk-init.mjs',
    'updatedesk:note': 'node tools/updatedesk-note.mjs',
  };
  await writeFile(path, `${JSON.stringify(pkg, null, 2)}\n`);
}

async function upsertAgents(path) {
  const block = agentsBlock();
  let content = '';
  try {
    content = await readFile(path, 'utf8');
  } catch {
    // create below
  }
  if (content.includes('## UpdateDesk Release Cards')) {
    if (content.includes('Required flow:')) {
      return;
    }
    const start = content.indexOf('## UpdateDesk Release Cards');
    const nextHeading = content.indexOf('\n## ', start + 1);
    const before = content.slice(0, start).trimEnd();
    const after = nextHeading === -1 ? '' : content.slice(nextHeading).trimStart();
    const sections = [before, block, after].filter(Boolean);
    await writeFile(path, `${sections.join('\n\n')}\n`);
    return;
  }
  const next = content.trim() ? `${content.trim()}\n\n${block}\n` : `# AGENTS.md\n\n${block}\n`;
  await writeFile(path, next);
}

function readmeContent() {
  return `# UpdateDesk Release Cards

This repository is connected to UpdateDesk.

## How To Work

1. Make the product change.
2. Run relevant checks and keep the command names.
3. Capture screenshots when UI changed.
4. Create a release card in \`.updatedesk/releases/\`.
5. Commit the release card together with the code change.
6. Mention the release card path in the commit body when possible.
7. Push the branch. UpdateDesk will also receive GitHub webhook events.
8. Review the generated draft in UpdateDesk and publish it to the linked Telegram channel.

After every user-visible change, Claude/Codex should create a release card:

\`\`\`txt
.updatedesk/releases/YYYY-MM-DD-project-short-title.md
\`\`\`

Create a card:

\`\`\`bash
npm run updatedesk:note -- --project ${project} --title "Что изменилось"
\`\`\`

GitHub webhook:

\`\`\`txt
${webhook}
\`\`\`

Repository in UpdateDesk:

\`\`\`txt
${repository}
\`\`\`

## GitHub Webhook

Add this webhook in GitHub repository settings:

- Payload URL: \`${webhook}\`
- Content type: \`application/json\`
- Secret: the same value as \`GITHUB_WEBHOOK_SECRET\` on \`updates.nurtech.dev\`
- Events: \`push\`, \`pull_request\`, \`release\`, \`deployment\`, \`deployment_status\`

## Commit Body Marker

\`\`\`txt
UpdateDesk:
release-card: .updatedesk/releases/YYYY-MM-DD-project-short-title.md
public: true
\`\`\`

## Card Format

\`\`\`md
---
project: ${project}
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
\`\`\`

## Fields

- \`project\`: UpdateDesk project slug.
- \`public\`: \`true\` for Telegram-ready updates, \`false\` for internal work.
- \`type\`: \`feature\`, \`fix\`, \`design\`, \`performance\`, \`release\`, \`docs\`, or \`internal\`.
- \`audience\`: \`users\`, \`admins\`, \`team\`, or a custom segment.
- \`title\`: short public title.
- \`summary\`: clear user-facing summary.
- \`user_impact\`: concrete effects for the user.
- \`screenshots\`: local paths or public URLs when UI changed.
- \`checks\`: commands or manual checks that passed.
- \`deploy_url\`: where the result can be verified.
`;
}

function agentsBlock() {
  return `## UpdateDesk Release Cards

After every user-visible product change, Claude/Codex must create a release card for UpdateDesk.

Required flow:

1. Finish the code change.
2. Run the relevant checks.
3. Capture screenshots when UI changed.
4. Create a release card in \`.updatedesk/releases/\`.
5. Commit the release card together with the code when possible.
6. Mention the release card path in the commit body.

Card path:

\`\`\`txt
.updatedesk/releases/YYYY-MM-DD-project-short-title.md
\`\`\`

Use the helper when possible:

\`\`\`bash
npm run updatedesk:note -- --project <project-slug> --title "<public title>"
\`\`\`

Required fields:

- \`project\`: UpdateDesk project slug.
- \`public\`: \`true\` for Telegram-ready updates, \`false\` for internal work.
- \`type\`: \`feature\`, \`fix\`, \`design\`, \`performance\`, \`release\`, \`docs\`, or \`internal\`.
- \`audience\`: \`users\`, \`admins\`, \`team\`, or a custom segment.
- \`title\`: short public title.
- \`summary\`: clear user-facing summary.
- \`user_impact\`: concrete effects for the user.
- \`screenshots\`: local paths or public URLs when UI changed.
- \`checks\`: commands or manual checks that passed.
- \`deploy_url\`: where the result can be verified.

When committing, mention the card path in the commit body:

\`\`\`txt
UpdateDesk:
release-card: .updatedesk/releases/YYYY-MM-DD-project-short-title.md
public: true
\`\`\`

Git diffs and commit messages are fallback signals. The release card is the primary source for Telegram posts.`;
}

function noteScript() {
  return `#!/usr/bin/env node
import { mkdir, writeFile } from 'fs/promises';
import { join } from 'path';
import { parseArgs } from 'util';

const { values } = parseArgs({
  options: {
    project: { type: 'string', short: 'p' },
    title: { type: 'string', short: 't' },
    type: { type: 'string' },
    audience: { type: 'string' },
    public: { type: 'boolean' },
    summary: { type: 'string', short: 's' },
    deployUrl: { type: 'string' },
  },
});

const project = values.project || '${project}';
const title = values.title || 'Короткий заголовок обновления';
const timezone = process.env.UPDATEDESK_TIMEZONE || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Bishkek';
const today = new Intl.DateTimeFormat('sv-SE', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const slug = safeSlug(\`\${project}-\${title}\`).slice(0, 72) || 'release-card';
const dir = join(process.cwd(), '.updatedesk', 'releases');
const path = join(dir, \`\${today}-\${slug}.md\`);
const content = \`---
project: \${project}
public: \${values.public === false ? 'false' : 'true'}
type: \${values.type || 'feature'}
audience: \${values.audience || 'users'}
title: \${title}
summary: \${values.summary || 'Опишите, что изменилось для пользователя.'}
user_impact:
  - Опишите первый конкретный эффект.
  - Опишите второй конкретный эффект.
screenshots:
  - artifacts/screens/example-desktop.png
checks:
  - npm test
deploy_url: \${values.deployUrl || 'https://...'}
---

Notes for editor:
- What changed:
- Where to verify:
- Risks:
\`;
await mkdir(dir, { recursive: true });
await writeFile(path, content, { flag: 'wx' });
console.log(path);
function safeSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9а-яё]+/gi, '-').replace(/^-+|-+$/g, '');
}
`;
}

async function initScript() {
  return readFile(fileURLToPath(import.meta.url), 'utf8');
}

function safeSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9а-яё]+/gi, '-').replace(/^-+|-+$/g, '');
}
