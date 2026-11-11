# Panduan Isolasi Backend Pribadi (Firebase RTDB & Google Drive)

Folder `backend/` ini disiapkan terpisah penuh dari proyek **Musada** agar data pribadi, permohonan akses `Lampiran.pdf`, dan file Drive tidak pernah tercampur.

## 1. Setup Firebase Realtime Database Pribadi
1. Buat project baru di Firebase Console (misal: `lukman-hakim-personal`).
2. Aktifkan **Authentication -> Sign-in method -> Email/Password**, lalu daftarkan akun admin (`lukmanlooker00@gmail.com`).
3. Aktifkan **Realtime Database**, lalu salin aturan dari `backend/database.rules.json` ke tab **Rules**.
4. Salin konfigurasi Web App ke `assets/js/config/backend-config.js` pada bagian `firebase`.

## 2. Setup Google Apps Script & Google Drive (`Lampiran.pdf`)
1. Unggah `Lampiran.pdf` ke Google Drive akun pribadi (status akses: **Restricted / Terbatas**, jangan Public).
2. Catat **File ID** Google Drive tersebut (`https://drive.google.com/file/d/<FILE_ID>/view`).
3. Buka [script.google.com](https://script.google.com), buat project baru, lalu tempel isi `backend/google-apps-script.gs`.
4. Isi `LAMPIRAN_FILE_ID` dengan File ID Anda.
5. **Deploy -> New deployment -> Web app** (Execute as: `Me`, Who has access: `Anyone`).
6. Salin Web App URL ke `assets/js/config/backend-config.js` pada bagian `driveBridge.appsScriptUrl`.

## 3. Mode Simulasi Sebelum Kredensial Diisi
Selama nilai di `backend-config.js` masih berupa placeholder (`PASTE_...` / `YOUR_PERSONAL_PROJECT`), halaman `/kolaborasi/index.html` dan `/admin/index.html` otomatis berjalan dalam **Mode Simulasi Lokal (localStorage browser)** dengan keterangan jujur agar alur pengajuan email dan persetujuan admin dapat langsung diuji tanpa mencampuri RTDB/Drive milik Musada.

