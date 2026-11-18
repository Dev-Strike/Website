async function fetchSource() {
    let urlInput = document.getElementById('uri').value.trim();
    const outputArea = document.getElementById('code-block');
    const loadingText = document.getElementById('loading');

    if (!urlInput) {
        alert("Masukkan URL terlebih dahulu!");
        return;
    }

    // Otomatis tambahkan https:// jika pengguna lupa mengetiknya
    if (!urlInput.startsWith('http://') && !urlInput.startsWith('https://')) {
        urlInput = 'https://' + urlInput;
    }

    loadingText.classList.remove('hidden');
    outputArea.value = "";

    // Menggunakan CORS Proxy publik agar tidak diblokir browser
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(urlInput)}`;

    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (data.contents) {
            outputArea.value = data.contents;
        } else {
            outputArea.value = "Gagal mengambil konten. Website tersebut mungkin melarang akses dari luar.";
        }
    } catch (error) {
        outputArea.value = "Terjadi kesalahan koneksi: " + error.message;
    } finally {
        loadingText.classList.add('hidden');
    }
}
