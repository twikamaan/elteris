# Elteriş — Web Hosting Kurulum Rehberi

## 1. Dosyaları Yükleme
Bu klasördeki tüm dosyaları (`server.js`, `package.json`, `public/`, `data/`) hosting paneline (Node.js destekli bot/web hosting) yükle.

## 2. Bağımlılıkları Kurma ve Başlatma
Hosting terminalinde şu iki komutu çalıştır:
```bash
npm install
npm start
```
Varsayılan port `3000`'dir (`process.env.PORT` otomatik okunur).

## 3. Erişim Adresleri
- **Ana Oyun:** `https://SENIN-ALAN-ADIN/` (`public/index.html`)
- **Harici Birlik Stat Editörü:** `https://SENIN-ALAN-ADIN/stat-editoru.html`
- **Sunucu Sağlık Kontrolü:** `https://SENIN-ALAN-ADIN/api/health`

## 4. Sonraki Adımlar (Canlı Ödeme & Google Play)
- **Gerçek Para ile Elmas Satışı:** `server.js` içindeki `/api/payment/webhook` ucuna PayTR veya iyzico mağaza anahtarlarını bağlayabiliriz.
- **Google Play (Android):** Aynı `public/` klasörünü Capacitor (`npx cap add android`) ile Android `.aab` paketine çevirebiliriz.
