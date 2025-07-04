// Memuat variabel lingkungan dari file .env (misalnya EMAIL_USER, EMAIL_PASS)
require('dotenv').config();

// Mengimpor pustaka yang diperlukan
const express = require('express'); // Framework web untuk membangun API dan server
const nodemailer = require('nodemailer'); // Pustaka untuk mengirim email
const path = require('path'); // Modul bawaan Node.js untuk bekerja dengan jalur file

// Membuat instance aplikasi Express
const app = express();

// Menentukan port di mana server akan berjalan.
// Menggunakan process.env.PORT untuk deployment (misalnya di hosting), atau 3000 jika dijalankan lokal.
const PORT = process.env.PORT || 3000;

// ==========================================================
// MIDDLEWARE
// Middleware adalah fungsi yang dijalankan sebelum rute handler
// ==========================================================

// Middleware untuk mem-parsing body permintaan dalam format JSON
// Diperlukan untuk membaca data yang dikirim dari form JavaScript/AJAX
app.use(express.json());

// Middleware untuk mem-parsing body permintaan dalam format URL-encoded
// Diperlukan untuk membaca data yang dikirim dari form HTML biasa
app.use(express.urlencoded({ extended: true }));

// Middleware untuk menyajikan file statis (HTML, CSS, JavaScript frontend)
// '__dirname' adalah variabel global Node.js yang menyimpan jalur direktori file saat ini (tempat server.js berada)
// Ini berarti semua file di folder yang sama dengan server.js (termasuk index.html, folder js/) akan dapat diakses oleh browser
app.use(express.static(__dirname));

// ==========================================================
// ROUTES
// Rute mendefinisikan bagaimana server merespons permintaan klien
// ==========================================================

// Rute untuk Halaman Utama (Root URL: http://localhost:3000/)
app.get('/', (req, res) => {
    // Mengirimkan file index.html sebagai respons ketika root URL diakses
    // path.join() digunakan untuk membangun jalur file yang aman dan benar di berbagai OS
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Konfigurasi Nodemailer untuk mengirim email
// Menggunakan layanan Gmail dan kredensial dari file .env
const transporter = nodemailer.createTransport({
    service: 'gmail', // Menentukan layanan email yang digunakan
    auth: {
        user: process.env.EMAIL_USER, // Alamat email pengirim (dari .env)
        pass: process.env.EMAIL_PASS // App Password email pengirim (dari .env)
    }
});

// Rute untuk menangani pengiriman formulir kontak (metode POST ke /send-email)
app.post('/send-email', (req, res) => {
    // Mengambil data yang dikirim dari formulir (nama, email, pesan) dari body permintaan
    const { name, email, message } = req.body;

    // ==========================================================
    // VALIDASI (Opsional tapi Direkomendasikan)
    // ==========================================================
    // Validasi dasar: Memastikan semua kolom wajib (nama, email, pesan) tidak kosong
    if (!name || !email || !message) {
        // Jika ada kolom yang kosong, server akan mengarahkan ulang (redirect) kembali
        // ke halaman kontak dan menambahkan parameter 'status=error' dan 'message' di URL
        // encodeURIComponent() memastikan teks pesan aman untuk URL
        return res.redirect('/#contact?status=error&message=' + encodeURIComponent('Semua kolom harus diisi.'));
    }

    // ==========================================================
    // OPSI EMAIL
    // Mendefinisikan detail email yang akan dikirim
    // ==========================================================
    const mailOptions = {
        from: process.env.EMAIL_USER, // Alamat email dari siapa email dikirim
        to: process.env.EMAIL_USER, // Alamat email tujuan (Anda bisa ganti ke email MBC Lab resmi jika ada)
                                    // Untuk testing, gunakan email Anda sendiri agar mudah memverifikasi
        subject: `Pesan dari Landing Page MBC Lab: ${name}`, // Subjek email
        html: `
            <p><strong>Nama:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Pesan:</strong><br>${message}</p>
        ` // Isi email dalam format HTML
    };

    // ==========================================================
    // PENGIRIMAN EMAIL
    // Menggunakan Nodemailer untuk mengirim email
    // ==========================================================
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error); // Log error di terminal server jika pengiriman gagal
            // Jika ada error saat mengirim email, redirect kembali dengan pesan error
            return res.redirect('/#contact?status=error&message=' + encodeURIComponent('Terjadi kesalahan saat mengirim pesan. Silakan coba lagi.'));
        } else {
            console.log('Email sent:', info.response); // Log sukses di terminal server jika pengiriman berhasil
            // Jika email berhasil dikirim, redirect kembali dengan pesan sukses
            return res.redirect('/#contact?status=success&message=' + encodeURIComponent('Pesan Anda berhasil terkirim!'));
        }
    });
});

// ==========================================================
// MEMULAI SERVER
// Server mulai mendengarkan permintaan masuk
// ==========================================================
app.listen(PORT, () => {
    // Menampilkan pesan di konsol (terminal) saat server berhasil dimulai
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log('Akses landing page Anda di browser.');
});