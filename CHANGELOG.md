# Changelog

Bu projedeki önemli değişiklikler bu dosyada tutulur.

## [1.0.0] - 2026-03-08
### Eklendi
- Supabase Auth ile `Üye ol / Giriş yap` akışı
- Kullanıcıya özel görev verisi (RLS politikaları ile izolasyon)
- Bulutta kalıcı görev CRUD (ekle, düzenle, sil, tamamla)
- Vercel ile canlı yayın altyapısı
- Telefon ve bilgisayardan aynı hesapla erişim desteği

### Değiştirildi
- Uygulama başlığı `FairyTale To-Do🧚🏻‍♀️⭐️` olarak güncellendi
- Dashboard sadece `Tüm Görevler` görünümünde gösterilecek şekilde düzenlendi
- Tema modern nötr palete taşındı

### Düzeltildi
- `.env` içindeki Supabase URL format hatası giderildi
- Canlı ortamda env eksikliği kaynaklı giriş engeli çözüldü
