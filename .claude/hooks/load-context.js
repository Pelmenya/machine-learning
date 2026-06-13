#!/usr/bin/env node
'use strict';

/**
 * SessionStart hook — загружает контекст прошлой сессии в начало новой.
 * Читает .claude/state/HANDOFF.md + краткий git-статус.
 * Кроссплатформенно (только Node API + execSync). Всегда exit 0.
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const root = process.cwd();
const lines = [];

// ── Контекст прошлой сессии ──────────────────────────────────
lines.push('## Контекст прошлой сессии');
lines.push('');
const handoffPath = path.join(root, '.claude', 'state', 'HANDOFF.md');
try {
  if (fs.existsSync(handoffPath)) {
    const content = fs.readFileSync(handoffPath, 'utf8').trim();
    lines.push(content || '(handoff пуст)');
  } else {
    lines.push('(handoff отсутствует — первая сессия)');
  }
} catch (err) {
  lines.push('(не удалось прочитать handoff: ' + err.message + ')');
}

// ── Git ──────────────────────────────────────────────────────
lines.push('');
lines.push('## Git');
lines.push('');

function git(args) {
  return execSync('git ' + args, {
    cwd: root,
    encoding: 'utf8',
    stdio: ['ignore', 'pipe', 'ignore'],
  }).trim();
}

try {
  const status = git('status --short');
  lines.push('### status --short');
  lines.push(status || '(рабочее дерево чистое)');
  lines.push('');
  const log = git('log --oneline -5');
  lines.push('### log --oneline -5');
  lines.push(log || '(коммитов пока нет)');
} catch (err) {
  lines.push('(git недоступен — не git-репозиторий или git не установлен)');
}

try {
  process.stdout.write(lines.join('\n') + '\n');
} catch (err) {
  // даже если запись не удалась — не падаем
}

process.exit(0);
