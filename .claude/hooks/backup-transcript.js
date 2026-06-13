#!/usr/bin/env node
'use strict';

/**
 * PreCompact hook — бэкапит транскрипт перед компактификацией контекста.
 * Читает JSON из stdin (поле transcript_path), копирует файл в
 * .claude/backups/pre-compact-<timestamp>.jsonl. Всегда exit 0.
 */

const fs = require('fs');
const path = require('path');

function readStdin() {
  try {
    // fd 0 = stdin; синхронное чтение работает кроссплатформенно
    return fs.readFileSync(0, 'utf8');
  } catch (err) {
    return '';
  }
}

function main() {
  const raw = readStdin();

  let payload = {};
  try {
    payload = JSON.parse(raw || '{}');
  } catch (err) {
    return; // невалидный JSON — тихо выходим
  }

  const transcriptPath = payload && payload.transcript_path;
  if (!transcriptPath) return;

  try {
    if (!fs.existsSync(transcriptPath)) return;

    const backupsDir = path.join(process.cwd(), '.claude', 'backups');
    fs.mkdirSync(backupsDir, { recursive: true });

    const ts = new Date().toISOString().replace(/[:.]/g, '-');
    const dest = path.join(backupsDir, 'pre-compact-' + ts + '.jsonl');

    fs.copyFileSync(transcriptPath, dest);
  } catch (err) {
    // не удалось скопировать — не критично, не падаем
  }
}

main();
process.exit(0);
