async function fetchSource() {
    const urlInput = document.getElementById('urlInput').value;
    const outputArea = document.getElementById('resultOutput');
    const loadingText = document.getElementById('loading');

    if (!urlInput) {
        alert("Masukkan URL terlebih dahulu!");
        return;
    }

    loadingText.classList.remove('hidden');
    outputArea.value = "";

    // Menggunakan CORS proxy gratis untuk menghindari blokir browser
    const proxyUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(urlInput)}`;

    try {
        const response = await fetch(proxyUrl);
        const data = await response.json();

        if (data.contents) {
            outputArea.value = data.contents;
        } else {
            outputArea.value = "Gagal mengambil konten dari URL tersebut.";
        }
    } catch (error) {
        outputArea.value = "Terjadi kesalahan: " + error.message;
    } finally {
        loadingText.classList.add('hidden');
    }
}
