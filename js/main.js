document.addEventListener('DOMContentLoaded', function() {
   
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });


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
        formMessage.classList.remove('hidden'); 
        
        if (status === 'success') {
            formMessage.classList.add('bg-green-100', 'text-green-800'); 
            formMessage.classList.remove('bg-red-100', 'text-red-800'); 
            if (form) { 
                form.reset(); 
            }
        } else { // Jika statusnya bukan 'success' (berarti 'error')
            formMessage.classList.add('bg-red-100', 'text-red-800'); 
            formMessage.classList.remove('bg-green-100', 'text-green-800'); 
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


    if (form) { 
        form.addEventListener('submit', function(event) {
        });
    }
});
