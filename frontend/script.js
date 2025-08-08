document.addEventListener('DOMContentLoaded', () => {
    const screens = document.querySelectorAll('.screen');
    const applyLoanBtn = document.getElementById('apply-loan-btn');
    const scanCompleteBtn = document.getElementById('scan-complete-btn');
    const backToWelcomeBtn = document.getElementById('back-to-welcome-btn');
    const acceptOfferBtn = document.getElementById('accept-offer-btn');
    const declineOfferBtn = document.getElementById('decline-offer-btn');

    // Function to switch between screens
    function showScreen(screenId) {
        screens.forEach(screen => {
            screen.classList.remove('active');
        });
        const activeScreen = document.getElementById(screenId);
        if (activeScreen) {
            activeScreen.classList.add('active');
        }
    }

    // Event Listeners for navigation
    if (applyLoanBtn) {
        applyLoanBtn.addEventListener('click', () => {
            showScreen('scan-screen');
        });
    }

    if (scanCompleteBtn) {
        scanCompleteBtn.addEventListener('click', () => {
            showScreen('offer-screen');
        });
    }

    if (backToWelcomeBtn) {
        backToWelcomeBtn.addEventListener('click', () => {
            showScreen('welcome-screen');
        });
    }

    if (acceptOfferBtn) {
        acceptOfferBtn.addEventListener('click', () => {
            alert('Loan offer accepted! Thank you for using our service.');
            showScreen('welcome-screen');
        });
    }

    if (declineOfferBtn) {
        declineOfferBtn.addEventListener('click', () => {
            alert('Loan offer declined. We hope to serve you again in the future.');
            showScreen('welcome-screen');
        });
    }

    // Initialize to show the welcome screen first, which is the default in HTML.
    // If no screen has 'active' class by default, uncomment the line below.
    // showScreen('welcome-screen');
});
