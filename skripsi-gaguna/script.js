/**
 * Fungsi untuk navigasi antar halaman (screen)
 */
function showScreen(targetId) {
    const screens = document.querySelectorAll('.screen');
    screens.forEach(screen => {
        screen.classList.remove('active');
    });

    const targetScreen = document.getElementById(targetId);
    if (targetScreen) {
        targetScreen.classList.add('active');
    } else {
        console.error("Screen dengan ID " + targetId + " tidak ditemukan!");
    }
}

// ==========================================
// FITUR AUTO-SCALE FULLSCREEN APLIKASI
// ==========================================
function resizeApp() {
    const app = document.getElementById('app-container');
    const windowWidth = window.innerWidth;
    const windowHeight = window.innerHeight;
    
    // Resolusi dasar aplikasi (16:9)
    const appWidth = 960;
    const appHeight = 540;

    // Hitung skala rasio terkecil agar selalu pas (fit to screen)
    const scale = Math.min(windowWidth / appWidth, windowHeight / appHeight);
    
    // Terapkan scaling lewat CSS Transform
    app.style.transform = `scale(${scale})`;
}

// Jalankan ketika halaman dimuat dan ketika ukuran browser diubah
window.addEventListener('DOMContentLoaded', resizeApp);
window.addEventListener('resize', resizeApp);

// ==========================================
// FITUR TOMBOL BROWSER FULLSCREEN API
// ==========================================
function toggleFullScreen() {
    if (!document.fullscreenElement) {
        // Masuk ke mode Fullscreen
        document.documentElement.requestFullscreen().catch(err => {
            console.log(`Error attempting to enable fullscreen: ${err.message}`);
        });
    } else {
        // Keluar dari mode Fullscreen
        if (document.exitFullscreen) {
            document.exitFullscreen();
        }
    }
}

// ==========================================
// LOGIKA GAME KUIS PILIHAN GANDA
// ==========================================
let currentScore = 0;
let questionsAnswered = 0;

/**
 * Fungsi memvalidasi jawaban Benar/Salah pada Kuis Game
 */
function checkAnswer(element, isCorrect, nextScreenId) {
    // Kunci semua opsi agar tidak bisa diklik dobel
    const allOptions = element.parentElement.parentElement.querySelectorAll('.label-wood');
    allOptions.forEach(opt => opt.style.pointerEvents = 'none');

    // Beri warna berdasarkan jawaban
    if (isCorrect) {
        element.style.backgroundColor = '#a8e6cf'; // Hijau (Benar)
        element.style.borderColor = '#3b8b71';
        currentScore++;
    } else {
        element.style.backgroundColor = '#ffb3ba'; // Merah (Salah)
        element.style.borderColor = '#b33939';
    }
    
    questionsAnswered++;

    // Jeda 1 detik lalu pindah ke halaman berikutnya
    setTimeout(() => {
        showScreen(nextScreenId);
        
        // Update halaman skor jika telah mencapai akhir game
        if (nextScreenId === 'screen-game-score') {
            updateScoreUI();
        }
    }, 1000);
}

/**
 * Fungsi memperbarui Lingkaran Kuning dan Teks Skor
 */
function updateScoreUI() {
    const circles = document.querySelectorAll('.score-circle');
    
    // Menyalakan lingkaran kuning sesuai skor benar
    circles.forEach((circle, index) => {
        if (index < currentScore) {
            circle.style.backgroundColor = '#fed64f'; 
            circle.style.borderColor = '#d4a362';
        } else {
            circle.style.backgroundColor = 'transparent';
            circle.style.borderColor = '#222';
        }
    });

    // Mengganti teks jumlah Benar & Salah
    const scoreText = document.getElementById('score-text');
    const wrongAnswers = 5 - currentScore; // Total ada 5 soal
    scoreText.innerHTML = `Jawaban Benar: ${currentScore} &nbsp;|&nbsp; Jawaban Salah: ${wrongAnswers}`;
}

/**
 * Fungsi mengatur ulang (Reset) state game dari awal
 */
function resetGame() {
    currentScore = 0;
    questionsAnswered = 0;
    
    // Kembalikan warna dan buka kembali akses klik opsi
    const allOptions = document.querySelectorAll('.label-wood');
    allOptions.forEach(opt => {
        opt.style.backgroundColor = '#fcf1d5';
        opt.style.borderColor = '#d4a362';
        opt.style.pointerEvents = 'auto';
    });
}