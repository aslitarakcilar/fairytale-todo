#!/usr/bin/env bash
set -euo pipefail

if [[ "$(git rev-parse --abbrev-ref HEAD)" != "main" ]]; then
  echo "Hata: release sadece main branch'ten yapılır."
  exit 1
fi

if [[ -n "$(git status --porcelain)" ]]; then
  echo "Hata: commitlenmemiş değişiklik var. Önce commit/push hazırlığını tamamla."
  git status --short
  exit 1
fi

if ! git remote get-url origin >/dev/null 2>&1; then
  echo "Hata: origin remote bulunamadı."
  exit 1
fi

if ! git remote get-url vercel >/dev/null 2>&1; then
  echo "Hata: vercel remote bulunamadı."
  exit 1
fi

echo "[1/3] test + build doğrulaması"
npm run verify

echo "[2/3] origin'e push"
git push origin main

echo "[3/3] vercel remote'a push"
git push vercel main

echo "Tamam: kod hem origin hem vercel remote'una gönderildi."
