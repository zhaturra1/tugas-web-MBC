# Landing Page MBC Laboratory

## Deskripsi Proyek
Proyek ini adalah sebuah landing page interaktif yang dirancang untuk MBC Laboratory, sebuah pusat riset teknologi dan konsultan yang berfokus pada pengembangan solusi di bidang Cybersecurity, Big Data Analytics, Game Technology, dan Geographic Information Systems (GIS). Landing page ini bertujuan untuk menampilkan profil lembaga, layanan, dan kompetensinya kepada publik dan mitra potensial secara informatif dan menarik.

## Fitur Utama
* **Halaman Utama (Home):** Menyajikan pengenalan singkat tentang MBC Laboratory, termasuk visi dan misi lembaga.
* **Divisi & Layanan:** Menampilkan informasi detail mengenai empat bidang utama MBC Laboratory (Cybersecurity, Big Data Analytics, Game Technology, dan GIS), lengkap dengan penjelasan cakupan layanan dan potensi aplikasinya.
* **Halaman Kontak:** Menyediakan informasi kontak perusahaan (alamat, telepon, email) dan sebuah formulir kontak interaktif.
* **Fungsionalitas Pengiriman Email:** Formulir kontak terhubung langsung ke backend Node.js yang menggunakan Nodemailer untuk mengirimkan pesan dari pengunjung ke email MBC Laboratory. Pengiriman email telah terverifikasi berfungsi.
* **Feedback Formulir:** Pengguna akan menerima feedback berupa pesan sukses atau gagal yang tampil di halaman website setelah mengirimkan formulir.
* **Halaman Developer:** Menyajikan informasi singkat tentang pengembang atau tim yang membangun landing page ini.
* **Desain Responsif:** Seluruh tampilan website dioptimalkan untuk berbagai ukuran perangkat, dari desktop hingga mobile, menggunakan TailwindCSS.

## Spesifikasi Teknis
Proyek ini dikembangkan sesuai dengan spesifikasi teknis yang telah ditentukan:
* **Frontend:** Dibangun menggunakan HTML5, CSS3 (melalui framework TailwindCSS), dan JavaScript murni untuk interaktivitas di sisi klien.
* **Backend:** Dikembangkan dengan Node.js dan framework Express.js, yang berfungsi sebagai server untuk melayani aset statis dan memproses permintaan pengiriman email dari formulir kontak.
* **Variabel Lingkungan:** Kredensial sensitif untuk pengiriman email (seperti username dan password aplikasi) disimpan secara aman menggunakan file `.env` di lingkungan lokal dan Environment Variables di platform deployment.
* **Integrasi Email:** Menggunakan pustaka Nodemailer untuk memfasilitasi pengiriman email dari formulir kontak.

## Instalasi Lokal (Cara Menjalankan Proyek di Komputer Anda)
Ikuti langkah-langkah di bawah ini untuk menginstal dan menjalankan proyek secara lokal:

### Prasyarat
Pastikan Anda sudah menginstal perangkat lunak berikut di komputer Anda:
* **Node.js** (disarankan versi [LTS](https://nodejs.org/en/download/))
* **npm** (Node Package Manager, otomatis terinstal bersama Node.js)
* **Git** (untuk mengkloning repositori)

### Langkah-langkah Instalasi
1.  **Kloning Repositori Proyek:**
    Buka Terminal atau Command Prompt (di VS Code, gunakan `Terminal > New Terminal`), lalu jalankan perintah berikut:
    ```bash
    git clone [URL_REPOSITORI_ANDA_DI_GITHUB]
    ```
    *Ganti `[URL_REPOSITORI_ANDA_DI_GITHUB]` dengan URL repositori GitHub proyek Anda (contoh: `https://github.com/zhaturra1/tugas-web-mbc.git`).*

2.  **Masuk ke Direktori Proyek:**
    Navigasi ke folder proyek yang baru saja Anda kloning:
    ```bash
    cd tugas-web-mbc
    ```

3.  **Inisialisasi Proyek Node.js (jika `package.json` belum ada):**
    ```bash
    npm init -y
    ```
    *Ini akan membuat file `package.json` yang diperlukan.*

4.  **Instal Dependensi Proyek:**
    Unduh dan instal semua pustaka Node.js yang dibutuhkan (Express, Nodemailer, Dotenv):
    ```bash
    npm install express nodemailer dotenv
    ```
    *Perintah ini akan membuat folder `node_modules/` dan file `package-lock.json`.*

5.  **Konfigurasi Variabel Lingkungan (`.env`):**
    * Buat file baru bernama `.env` di **root folder proyek** (`tugas-web-mbc`).
    * Isi file `.env` dengan kredensial email Anda:
        ```
        EMAIL_USER=alamat_email_gmail_anda@gmail.com
        EMAIL_PASS=kata_sandi_aplikasi_gmail_anda_16_karakter
        ```
    * **Penting: Cara Mendapatkan Kata Sandi Aplikasi (App Password) dari Gmail:**
        1.  Pastikan akun Gmail Anda sudah mengaktifkan **Verifikasi 2 Langkah**.
        2.  Kunjungi [Pengaturan Keamanan Akun Google Anda](https://myaccount.google.com/security).
        3.  Di bagian "Cara Anda login ke Google", cari dan klik **"Kata sandi aplikasi"** (App passwords).
        4.  Ikuti instruksi untuk membuat kata sandi aplikasi baru. Pilih "Mail" sebagai aplikasi dan "Other" atau "Custom name" untuk perangkat, lalu berikan nama (misal: "NodeMailer").
        5.  Google akan menghasilkan kata sandi 16 karakter. Gunakan kata sandi ini sebagai `EMAIL_PASS` di file `.env` Anda. **Jangan pernah mengunggah file `.env` ke repositori publik.**

6.  **Jalankan Server Lokal:**
    ```bash
    npm start
    ```
    *Server akan berjalan dan Anda akan melihat pesan `Server berjalan di http://localhost:3000` di terminal.*

7.  **Akses Landing Page di Browser:**
    Buka browser web Anda dan kunjungi:
    ```
    http://localhost:3000
    ```

## Deployment & Konfigurasi SSL (HTTPS)
Proyek ini telah di-deploy ke platform cloud Vercel untuk mendapatkan URL public dan mengaktifkan HTTPS.
* **URL Public Landing Page:** [URL_PUBLIC_VERCEL_ANDA] (Contoh: `https://tugas-web-mbc.vercel.app`)
* **Konfigurasi SSL (HTTPS):** HTTPS secara otomatis disediakan oleh Vercel untuk URL public yang di-deploy. Ini memastikan koneksi aman antara browser pengguna dan server.
* **Proses Deployment ke Vercel:** Proyek ini terintegrasi dengan GitHub, sehingga setiap kali perubahan di-push ke branch `main`, Vercel akan secara otomatis memulai proses deployment baru. Variabel lingkungan (`EMAIL_USER`, `EMAIL_PASS`) dikonfigurasi langsung di pengaturan proyek Vercel.

## Konfigurasi Backend
Backend proyek ini menggunakan Node.js dengan Express.js. File `server.js` berfungsi sebagai titik masuk utama. Ia melayani aset statis (seperti `index.html`, `main.js`) dan menangani permintaan POST ke `/send-email` dari formulir kontak. Modul `nodemailer` digunakan untuk mengirim email ke alamat tujuan menggunakan kredensial yang diatur dalam variabel lingkungan.

## IDS (Intrusion Detection System)
Fitur simulasi atau integrasi IDS (seperti Snort atau Wazuh) tidak diimplementasikan dalam proyek ini karena spesifikasinya bersifat opsional dan fokus pengembangan diarahkan pada fungsionalitas inti landing page serta keterbatasan waktu.

## Responsivitas
Desain website mengadopsi prinsip desain adaptif dan responsif. Penggunaan TailwindCSS memungkinkan tata letak dan elemen visual untuk menyesuaikan diri dengan berbagai ukuran layar, dari perangkat desktop hingga tablet dan ponsel, memastikan pengalaman pengguna yang optimal.

## Pengembang
* [Fathurrahman alfarizi] - [Telkom University]
