document.addEventListener('DOMContentLoaded', function() {
    // Fungsi untuk smooth scrolling (jika perlu, bisa juga dihandle murni dengan CSS)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Mengambil elemen formulir dan div pesan dari HTML
    // PASTIKAN ID INI COCOK DENGAN YANG ADA DI index.html
    const form = document.getElementById('contactForm'); // ID dari tag <form>
    const formMessage = document.getElementById('formMessage'); // ID dari div pesan

    // Mendapatkan parameter dari URL setelah redirect dari server (misalnya ?status=success&message=...)
    let queryString = '';
// Memeriksa apakah bagian hash URL mengandung tanda tanya (?)
if (window.location.hash.includes('?')) {
    // Jika ya, pisahkan hash berdasarkan '?' dan ambil bagian kedua (parameter)
    queryString = window.location.hash.split('?')[1];
}
// Buat objek URLSearchParams dari queryString yang diekstrak
const urlParams = new URLSearchParams(queryString);
const message = urlParams.get('message'); // Mengambil nilai parameter 'message'
const status = urlParams.get('status');   // Mengambil nilai parameter 'status'
    console.log('--- DEBUGGING PESAN FORM ---');
    console.log('URL Saat Ini:', window.location.href);
    console.log('URL Parameters - status:', status, '| message:', message);
    console.log('Elemen Form Ditemukan (contactForm):', form);
    console.log('Elemen Pesan Ditemukan (formMessage):', formMessage);

    // Jika ada parameter 'message' di URL (artinya ada feedback dari server)
    if (message) {
        formMessage.textContent = decodeURIComponent(message); // Menampilkan teks pesan
        formMessage.classList.remove('hidden'); // Menghapus kelas 'hidden' agar div pesan terlihat

        // Mengatur gaya (warna latar belakang dan teks) berdasarkan status
        if (status === 'success') {
            formMessage.classList.add('bg-green-100', 'text-green-800'); // Gaya sukses (hijau)
            formMessage.classList.remove('bg-red-100', 'text-red-800'); // Menghapus gaya error jika ada
            if (form) { // Pastikan elemen form ditemukan sebelum direset
                form.reset(); // Mengosongkan semua input di formulir jika pengiriman sukses
            }
        } else { // Jika statusnya bukan 'success' (berarti 'error')
            formMessage.classList.add('bg-red-100', 'text-red-800'); // Gaya error (merah)
            formMessage.classList.remove('bg-green-100', 'text-green-800'); // Menghapus gaya sukses jika ada
        }

        // Menyembunyikan pesan setelah 5 detik dan membersihkan URL
        setTimeout(() => {
            formMessage.classList.add('hidden'); // Menambahkan kembali kelas 'hidden' untuk menyembunyikan pesan
            // Menghapus kelas-kelas warna untuk membersihkan gaya
            formMessage.classList.remove('bg-green-100', 'text-green-800', 'bg-red-100', 'text-red-800');
            // Menghapus parameter URL agar pesan tidak muncul lagi saat refresh manual
            window.history.replaceState({}, document.title, window.location.pathname + window.location.hash);
        }, 5000); // Waktu tunda 5000 milidetik (5 detik)
    }

    // Event listener untuk pengiriman formulir (tidak menggunakan preventDefault)
    // Server.js akan melakukan redirect setelah memproses, jadi kita biarkan submit normal
    if (form) { // Pastikan elemen form ditemukan sebelum menambahkan event listener
        form.addEventListener('submit', function(event) {
            // Tidak ada logika khusus di sini karena backend (server.js) yang akan menangani
            // pengiriman dan redirect-nya. JavaScript frontend hanya membaca hasil redirect.
        });
    }
});