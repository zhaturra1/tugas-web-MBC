// Memuat variabel lingkungan dari file .env (misalnya EMAIL_USER, EMAIL_PASS)
require('dotenv').config();

// Mengimpor pustaka yang diperlukan
const express = require('express'); // Framework web untuk membangun API dan server
const nodemailer = require('nodemailer'); // Pustaka untuk mengirim email
const path = require('path'); // Modul bawaan Node.js untuk bekerja dengan jalur file

// Membuat instance aplikasi Express
const app = express();

const PORT = process.env.PORT || 3000;

app.use(express.json());


// Diperlukan untuk membaca data yang dikirim dari form HTML biasa
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));


app.get('/', (req, res) => {
    
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

    
    if (!name || !email || !message) {
        // encodeURIComponent() memastikan teks pesan aman untuk URL
        return res.redirect('/#contact?status=error&message=' + encodeURIComponent('Semua kolom harus diisi.'));
    }

    // ==========================================================
    // OPSI EMAIL

    const mailOptions = {
        from: process.env.EMAIL_USER, // Alamat email dari siapa email dikirim
        to: process.env.EMAIL_USER, // Alamat email tujuan (Anda bisa ganti ke email MBC Lab resmi jika ada)
                        
        subject: `Pesan dari Landing Page MBC Lab: ${name}`, // Subjek email
        html: `
            <p><strong>Nama:</strong> ${name}</p>
            <p><strong>Email:</strong> ${email}</p>
            <p><strong>Pesan:</strong><br>${message}</p>
        ` // Isi email dalam format HTML
    };

    
    // PENGIRIMAN EMAIL
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


app.listen(PORT, () => {
    // Menampilkan pesan di konsol (terminal) saat server berhasil dimulai
    console.log(`Server berjalan di http://localhost:${PORT}`);
    console.log('Akses landing page Anda di browser.');
});
