# Taskflow – Görev ve Proje Yönetim Sistemi API

Taskflow, görevlerin REST API üzerinden oluşturulup yönetildiği, Node.js ve Express.js ile hazırlanmış JSON tabanlı bir backend projesidir.

## Teknolojiler ve gereksinimler

- Node.js 18 veya üzeri
- Express.js
- dotenv
- CommonJS
- JSON dosyası ile kalıcı veri saklama

## Kurulum ve çalıştırma

```bash
npm install
```

`.env.example` dosyasını `.env` olarak kopyalayın ve portu ayarlayın:

```env
PORT=3000
```

Sunucuyu başlatın:

```bash
npm start
```

Geliştirme modunda:

```bash
npm run dev
```

Testleri çalıştırmak için:

```bash
npm test
```

## API endpoint'leri

Base URL: `http://localhost:3000`

| Metot | Endpoint | Başarı kodu | Açıklama |
|---|---|---:|---|
| POST | `/tasks` | 201 | Görev oluşturur |
| GET | `/tasks` | 200 | Tüm görevleri listeler |
| GET | `/tasks/:id` | 200 | ID ile görev getirir |
| PUT | `/tasks/:id` | 200 | Mevcut görevi günceller |
| DELETE | `/tasks/:id` | 200 | Görevi siler |
| GET | `/health` | 200 | Servis durumunu kontrol eder |

### POST /tasks

İstek:

```json
{
  "title": "Release hazırlığı",
  "description": "Dokümantasyonu tamamla",
  "priority": "high",
  "assignee": "Emre",
  "status": "pending"
}
```

`title` zorunludur. `priority` yalnızca `low`, `medium`, `high`; `status` yalnızca `pending`, `in-progress`, `completed` olabilir. Varsayılanlar sırasıyla `medium` ve `pending` değerleridir.

Cevap (`201 Created`):

```json
{
  "success": true,
  "data": {
    "id": "generated-uuid",
    "title": "Release hazırlığı",
    "description": "Dokümantasyonu tamamla",
    "priority": "high",
    "assignee": "Emre",
    "status": "pending",
    "createdAt": "2026-10-31T10:00:00.000Z",
    "updatedAt": "2026-10-31T10:00:00.000Z"
  }
}
```

### GET /tasks

```json
{ "success": true, "data": [{ "id": "generated-uuid", "title": "Release hazırlığı" }] }
```

### GET /tasks/:id

```json
{ "success": true, "data": { "id": "generated-uuid", "title": "Release hazırlığı" } }
```

### PUT /tasks/:id

İstek gövdesi kısmi güncellenebilir:

```json
{ "status": "completed", "priority": "medium" }
```

Cevap: `200 OK` ve `{ "success": true, "data": { ... } }`.

### DELETE /tasks/:id

Cevap (`200 OK`):

```json
{ "success": true, "message": "Task deleted successfully.", "data": { "id": "generated-uuid" } }
```

## HTTP durum kodları ve hata formatı

- `200 OK`: Listeleme, getirme, güncelleme veya silme başarılı
- `201 Created`: Görev başarıyla oluşturuldu
- `400 Bad Request`: Eksik ya da hatalı veri
- `404 Not Found`: Görev veya route bulunamadı
- `500 Internal Server Error`: Beklenmeyen sunucu hatası

Hatalar `{ "success": false, "error": "Açıklama" }` formatındadır.

## Postman

Sunucuyu çalıştırın ve Postman'de `postman/taskflow-api.postman_collection.json` dosyasını **Import** seçeneğiyle içe aktarın. Collection değişkenlerinden `baseUrl` değerini gerekirse güncelleyin. Önce `Create task` isteğini çalıştırıp dönen `id` değerini `taskId` değişkenine koyun; ardından diğer CRUD isteklerini çalıştırın. `Invalid ID` ve `Missing title (400)` istekleri hata senaryolarını test eder.

## Proje klasör yapısı

```text
src/
├── controllers/       HTTP isteklerini yönetir
├── middleware/        logger, 404 ve merkezi hata yönetimi
├── routes/            task route tanımları
├── services/          JSON veri erişimi ve iş mantığı
├── utils/             doğrulama yardımcıları
├── app.js             Express uygulaması
└── server.js          uygulama başlangıcı
data/tasks.json        kalıcı görev verisi
postman/               Postman collection
docs/                  proje tanıtım dokümanı
test/                  otomatik API testleri
```

## Logger

Her istek konsola ISO tarih/saat, HTTP metodu ve endpoint path bilgisiyle yazılır. `.env`, `node_modules` ve log/geçici dosyalar `.gitignore` ile Git dışında tutulur.
