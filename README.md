# FairyTale To-Do🧚🏻‍♀️⭐️

Kullanıcı bazlı (üye ol / giriş yap) görev yönetim uygulaması.
Her kullanıcı sadece kendi görevlerini görür.
Görevler Supabase'de saklandığı için telefondan ve bilgisayardan aynı hesapla veri kaybı olmadan kullanılabilir.

## Özellikler

- Üyelik ve giriş (Supabase Auth)
- Kullanıcıya özel görevler (RLS ile izole)
- Görev CRUD (ekle, düzenle, sil, tamamla)
- Görünümler: Tüm Görevler, Bugün, Yaklaşan, Tamamlanan, Geciken, Takvim
- Gelişmiş istatistik paneli: streak, 7 günlük trend, odak saati
- Arama, filtreleme, sıralama
- localStorage önbellek + bulut kalıcılığı
- Sentry hata izleme (opsiyonel)
- Web Vitals performans ölçümü (dev console)
- Vitest ile utility testleri
- Mobil ve masaüstü uyumlu

## 1) Supabase Kurulumu

Supabase SQL Editor'a aşağıdakini çalıştır:

```sql
create table if not exists public.tasks (
  id text primary key,
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  description text,
  category text,
  priority text not null check (priority in ('low', 'medium', 'high')),
  due_date text,
  due_time text,
  created_at text not null,
  updated_at text not null,
  completed boolean not null default false
);

create index if not exists tasks_user_id_idx on public.tasks(user_id);

alter table public.tasks enable row level security;

drop policy if exists "tasks_select_own" on public.tasks;
drop policy if exists "tasks_insert_own" on public.tasks;
drop policy if exists "tasks_update_own" on public.tasks;
drop policy if exists "tasks_delete_own" on public.tasks;

create policy "tasks_select_own"
on public.tasks for select
using (auth.uid() = user_id);

create policy "tasks_insert_own"
on public.tasks for insert
with check (auth.uid() = user_id);

create policy "tasks_update_own"
on public.tasks for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

create policy "tasks_delete_own"
on public.tasks for delete
using (auth.uid() = user_id);
```

## 2) Environment Ayarları

Proje kökünde `.env` oluştur:

```bash
VITE_SUPABASE_URL=https://YOUR_PROJECT_ID.supabase.co
VITE_SUPABASE_ANON_KEY=YOUR_SUPABASE_ANON_KEY
VITE_SUPABASE_TASKS_TABLE=tasks
```

Opsiyonel Sentry:

```bash
VITE_SENTRY_DSN=YOUR_SENTRY_DSN
```

## 3) Lokal Çalıştırma

```bash
npm install
npm run dev
```

Telefondan aynı ağda test için:

```bash
npm run dev:network
```

## 4) Test ve Build

```bash
npm run test
npm run build
```

## 5) Yayına Alma (Vercel)

1. Kodu GitHub'a yükle.
2. Vercel'de "Add New Project" ile repo'yu seç.
3. Build command: `npm run build`
4. Output: `dist`
5. Environment Variables olarak `.env` içindeki değerleri Vercel'e ekle.
6. Deploy et.

## Proje Yapısı

- `src/components`: UI bileşenleri
- `src/hooks`: `useAuth`, `useTasks`
- `src/utils`: görev/date helper'ları ve Supabase istemcisi
- `src/monitoring`: Sentry + Web Vitals
- `src/types`: TypeScript tipleri
