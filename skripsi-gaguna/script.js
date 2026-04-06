/**
 * Fungsi untuk navigasi antar halaman (screen)
 * @param {string} targetId - ID dari elemen div yang ingin ditampilkan
 */
function showScreen(targetId) {
    // 1. Ambil semua elemen dengan class 'screen'
    const screens = document.querySelectorAll('.screen');
    
    // 2. Sembunyikan semua screen dengan menghapus class 'active'
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    // 3. Tampilkan screen yang dituju dengan menambahkan class 'active'
    const targetScreen = document.getElementById(targetId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    } else {
        console.error("Screen dengan ID " + targetId + " tidak ditemukan!");
    }
}