#!/usr/bin/env node
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

const project = values.project || 'mentoring-users-app';
const title = values.title || 'Короткий заголовок обновления';
const timezone = process.env.UPDATEDESK_TIMEZONE || Intl.DateTimeFormat().resolvedOptions().timeZone || 'Asia/Bishkek';
const today = new Intl.DateTimeFormat('sv-SE', { timeZone: timezone, year: 'numeric', month: '2-digit', day: '2-digit' }).format(new Date());
const slug = safeSlug(`${project}-${title}`).slice(0, 72) || 'release-card';
const dir = join(process.cwd(), '.updatedesk', 'releases');
const path = join(dir, `${today}-${slug}.md`);
const content = `---
project: ${project}
public: ${values.public === false ? 'false' : 'true'}
type: ${values.type || 'feature'}
audience: ${values.audience || 'users'}
title: ${title}
summary: ${values.summary || 'Опишите, что изменилось для пользователя.'}
user_impact:
  - Опишите первый конкретный эффект.
  - Опишите второй конкретный эффект.
screenshots:
  - artifacts/screens/example-desktop.png
checks:
  - npm test
deploy_url: ${values.deployUrl || 'https://...'}
---

Notes for editor:
- What changed:
- Where to verify:
- Risks:
`;
await mkdir(dir, { recursive: true });
await writeFile(path, content, { flag: 'wx' });
console.log(path);
function safeSlug(value) {
  return value.toLowerCase().replace(/[^a-z0-9а-яё]+/gi, '-').replace(/^-+|-+$/g, '');
}
