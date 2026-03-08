# Türkçe Commit Standartları

Commit mesajları şu formatta yazılır:

`tip: kısa açıklama`

## Tipler
- `özellik:` yeni özellik eklendiğinde
- `düzeltme:` hata giderildiğinde
- `arayüz:` görsel/UI değişikliklerinde
- `refaktör:` davranışı değiştirmeyen kod düzenlemelerinde
- `dokümantasyon:` README, CHANGELOG vb. güncellemelerde
- `altyapı:` deploy, build, env, CI/CD ayarlarında

## Örnekler
- `özellik: kullanıcı girişi ve kayıt akışı eklendi`
- `özellik: görevler kullanıcı bazlı Supabase tablosuna taşındı`
- `düzeltme: canlı ortamda env okuma sorunu giderildi`
- `arayüz: üst navigasyon ve giriş kartı sadeleştirildi`
- `dokümantasyon: yayın adımları README dosyasına eklendi`
- `altyapı: vercel environment değişkenleri güncellendi`

## Kısa Kurallar
- Mesajı küçük harfle başlat.
- 1 commit = 1 mantıklı değişiklik grubu.
- Çok genel ifadelerden kaçın (`güncelleme yapıldı` gibi).
