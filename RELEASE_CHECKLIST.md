# Production Release Checklist

Bu listeyi her değişiklik sonrası uygula.

## 1) Kod doğrulama
- `npm run verify`
- Test ve build hatasız geçmeli.

## 2) Git doğrulama
- `git status` temiz olmalı.
- Değişiklikler anlamlı commit mesajı ile commitlenmiş olmalı.
- Branch `main` olmalı.

## 3) Yayın push (tek komut)
- `npm run release:prod`

Bu komut otomatik olarak:
- test+build çalıştırır,
- `origin/main`e push eder,
- `vercel/main`e push eder.

## 4) Vercel kontrol
- Deployment `Ready` olmalı.
- Canlı linkte hard refresh (`Cmd+Shift+R`) yap.
- Giriş, görev ekleme, yenile senaryosu test et.

## 5) Zorunlu hatırlatma
- Bu projede deployment öncesi `npm run release:prod` dışına çıkma.
- Bu akış git adımlarını unutmayı engeller.
