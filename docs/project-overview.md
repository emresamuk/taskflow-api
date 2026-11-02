# Taskflow – Proje Tanıtımı

## Projenin amacı

Taskflow, ekiplerin görevlerini oluşturup takip edebilmesi için geliştirilen sade bir REST API'dir. Uygulama, görev yaşam döngüsünü JSON tabanlı dosya üzerinde kalıcı olarak saklar ve herhangi bir istemcinin HTTP üzerinden görev yönetmesine olanak tanır.

## Senaryo

Bir ekip üyesi yeni bir görev oluşturur, göreve öncelik ve sorumlu atar. Görev `pending` durumundan `in-progress` durumuna, tamamlandığında `completed` durumuna geçirilir. Ekip üyeleri görev listesini görüntüleyebilir, detay okuyabilir, güncelleyebilir veya tamamlanmayan görevleri silebilir.

## Temel sistem özellikleri

- Görev oluşturma, listeleme, detay görüntüleme, güncelleme ve silme
- `low`, `medium`, `high` öncelik değerleri
- `pending`, `in-progress`, `completed` durumları
- JSON dosyasında kalıcı veri yönetimi
- Her isteği tarih/saat, HTTP metodu ve path bilgisiyle loglama
- Tutarlı JSON cevapları ve merkezi hata yönetimi

## Veri modeli

Her görev `id`, `title`, `description`, `priority`, `assignee`, `status`, `createdAt` ve `updatedAt` alanlarını içerir. `title` zorunludur. Varsayılan öncelik `medium`, varsayılan durum `pending` değeridir. Tarihler ISO 8601 formatında tutulur.

## Endpoint özeti

| Metot | Endpoint | Açıklama |
|---|---|---|
| POST | `/tasks` | Yeni görev oluşturur |
| GET | `/tasks` | Tüm görevleri listeler |
| GET | `/tasks/:id` | Tek görev getirir |
| PUT | `/tasks/:id` | Görevi günceller |
| DELETE | `/tasks/:id` | Görevi siler |
