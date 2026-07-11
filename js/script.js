function showWarning(){

document.getElementById("popup").style.display="flex";

}

function closeWarning(){

document.getElementById("popup").style.display="none";

}

function cekQuiz(){

let nilai=0;

for(let i=1;i<=10;i++){

let jawaban=document.querySelector('input[name="q'+i+'"]:checked');

if(jawaban){

nilai+=parseInt(jawaban.value);

}

}

let skor=nilai*10;

let pesan="";

if(skor>=90){

pesan="🏆 Sangat Baik! Pemahaman Anda tentang keamanan digital sangat baik.";

}

else if(skor>=70){

pesan="👍 Baik. Anda sudah memahami dasar keamanan digital.";

}

else{

pesan="📚 Anda perlu mempelajari kembali materi Cyber Security.";

}

document.getElementById("hasil").innerHTML=

"Nilai Anda : <strong>"+skor+"/100</strong><br><br>"+pesan;

}

const menuToggle = document.querySelector(".menu-toggle");
const navMenu = document.querySelector(".nav-menu");

if (menuToggle && navMenu) {

    menuToggle.addEventListener("click", () => {

        navMenu.classList.toggle("active");

    });

}

/* ==========================================================================
   INTERACTIVE PHISHING SIMULATION ENGINE (PURE JS)
   ========================================================================== */

// Global state tracking
let hasInteractedEmail = false;
let hasDoneQuiz = false;
let hasInteractedLogin = false;

/**
 * Updates the global Awareness Score metrics and UI progress bar fill
 */
function updateAwarenessScore() {
    let score = 0;
    if (hasInteractedEmail) score += 30;
    if (hasDoneQuiz) score += 35;
    if (hasInteractedLogin) score += 35;

    const scoreEl = document.getElementById('awareness-score');
    const progressEl = document.getElementById('score-progress');
    const statusEl = document.getElementById('score-status');

    if (scoreEl && progressEl && statusEl) {
        scoreEl.innerText = score + '%';
        progressEl.style.width = score + '%';

        // Dynamic visual thresholds
        if (score < 40) {
            scoreEl.style.color = '#ef4444';
            progressEl.style.background = '#ef4444';
            statusEl.innerText = 'Rentan Serangan';
            statusEl.style.color = '#ef4444';
        } else if (score < 100) {
            scoreEl.style.color = '#f59e0b';
            progressEl.style.background = '#f59e0b';
            statusEl.innerText = 'Waspada Parsial';
            statusEl.style.color = '#f59e0b';
        } else {
            scoreEl.style.color = '#22c55e';
            progressEl.style.background = '#22c55e';
            statusEl.innerText = 'Edukasi Sempurna';
            statusEl.style.color = '#22c55e';
        }
    }
}

/**
 * Handles the 1-second delay loading state for Email "Klaim Hadiah" Simulation
 */
function triggerEmailSimulation() {
    const claimBtn = document.getElementById('btn-claim-gift');
    const loadingPlaceholder = document.getElementById('email-loading');
    const alertCard = document.getElementById('phishing-alert-card');

    if (claimBtn && loadingPlaceholder && alertCard) {
        claimBtn.style.display = 'none';
        loadingPlaceholder.style.display = 'inline-block';

        setTimeout(() => {
            loadingPlaceholder.style.display = 'none';
            alertCard.style.display = 'block';
            
            // Auto smooth scroll to result card
            alertCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
            
            hasInteractedEmail = true;
            updateAwarenessScore();
        }, 1000);
    }
}

/**
 * Evaluates Mini Quiz Form answers and alters color dynamically
 */
function evaluatePhishQuiz(selectedAnswer) {
    const feedbackBox = document.getElementById('quiz-feedback');
    const optA = document.getElementById('quiz-opt-a');
    const optB = document.getElementById('quiz-opt-b');

    if (!feedbackBox || !optA || !optB) return;

    feedbackBox.style.display = 'block';
    hasDoneQuiz = true;

    if (selectedAnswer === 'phishing') {
        // Correct answer styling
        feedbackBox.style.background = '#f0fdf4';
        feedbackBox.style.borderLeft = '4px solid #22c55e';
        feedbackBox.style.color = '#14532d';
        feedbackBox.innerHTML = '<i class="fa-solid fa-circle-check"></i> <strong>Benar!</strong> Anda jeli melihat anomali sistem. Email tersebut memenuhi seluruh indikator rekayasa sosial jahat.';
        
        optB.style.border = '1px solid #22c55e';
        optB.style.background = '#f0fdf4';
        optA.style.border = '1px solid transparent';
        optA.style.background = '#f5f7fa';
    } else {
        // Incorrect answer styling
        feedbackBox.style.background = '#fff1f2';
        feedbackBox.style.borderLeft = '4px solid #ef4444';
        feedbackBox.style.color = '#9f1239';
        feedbackBox.innerHTML = '<i class="fa-solid fa-circle-xmark"></i> <strong>Kurang Tepat!</strong> Nama tampilan luar bisa dipalsukan dengan mudah menggunakan teknik spoofing. Selalu periksa domain asli pengirim.';
        
        optA.style.border = '1px solid #ef4444';
        optA.style.background = '#fff1f2';
        optB.style.border = '1px solid transparent';
        optB.style.background = '#f5f7fa';
    }
    updateAwarenessScore();
}

/**
 * Handles validation of fake login credential forms and opens popup warning
 */
function handleFakeLogin(event) {
    event.preventDefault(); // Stop page refreshing
    const modal = document.getElementById('popup');
    if (modal) {
        modal.style.display = 'flex';
        hasInteractedLogin = true;
        updateAwarenessScore();
    }
}

/**
 * Closes the simulation warning popup modal and resets the form input
 */
function closeWarning() {
    const modal = document.getElementById('popup');
    const fakeForm = document.getElementById('fake-login-form');
    
    if (modal) {
        modal.style.display = 'none';
    }
    if (fakeForm) {
        fakeForm.reset();
    }
}