document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const screens = document.querySelectorAll('.screen');
    const loadingSpinner = document.getElementById('loading-spinner');

    // Buttons
    const applyLoanBtn = document.getElementById('apply-loan-btn');
    const scanCompleteBtn = document.getElementById('scan-complete-btn');
    const backToWelcomeBtn = document.getElementById('back-to-welcome-btn');
    const acceptOfferBtn = document.getElementById('accept-offer-btn');
    const declineOfferBtn = document.getElementById('decline-offer-btn');

    // Offer Details Elements to be populated dynamically
    const offerLoanAmount = document.querySelector('#offer-screen .offer-details .offer-item:nth-child(1) .value');
    const offerTenure = document.querySelector('#offer-screen .offer-details .offer-item:nth-child(2) .value');
    const offerEMI = document.querySelector('#offer-screen .offer-details .offer-item:nth-child(3) .value');
    const offerClarityNote = document.querySelector('#offer-screen .clarity-note');

    const API_BASE_URL = 'http://127.0.0.1:5001';

    // --- Helper Functions ---
    function showScreen(screenId) {
        screens.forEach(screen => screen.classList.remove('active'));
        const activeScreen = document.getElementById(screenId);
        if (activeScreen) {
            activeScreen.classList.add('active');
        }
    }

    function showLoader() {
        if (loadingSpinner) loadingSpinner.classList.add('active');
    }

    function hideLoader() {
        if (loadingSpinner) loadingSpinner.classList.remove('active');
    }

    async function fetchOffer() {
        showLoader();
        try {
            const response = await fetch(`${API_BASE_URL}/api/offer`);
            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }
            const data = await response.json();

            // Populate the offer screen with data from the API
            if (offerLoanAmount) offerLoanAmount.textContent = data.loanAmount;
            if (offerTenure) offerTenure.textContent = data.tenure;
            if (offerEMI) offerEMI.textContent = data.monthlyPayment;
            if (offerClarityNote) offerClarityNote.textContent = data.clarityNote;

            showScreen('offer-screen');
        } catch (error) {
            console.error("Failed to fetch loan offer:", error);
            alert("Sorry, we couldn't retrieve your loan offer. Please try again later.");
            showScreen('welcome-screen'); // Go back to home on error
        } finally {
            hideLoader();
        }
    }

    // --- Event Listeners ---
    if (applyLoanBtn) {
        applyLoanBtn.addEventListener('click', async () => {
            // This is a simple transition in the mock, but we can still show a loader for effect
            showLoader();
            try {
                // In a real app, you might send initial data here
                const response = await fetch(`${API_BASE_URL}/api/apply`, { method: 'POST' });
                if (!response.ok) throw new Error('Apply API call failed');

                // On success, move to the next screen
                showScreen('scan-screen');
            } catch (error) {
                console.error("Failed to start application:", error);
                alert("Sorry, there was an error starting your application.");
            } finally {
                // Hide loader quickly as this step is fast
                setTimeout(hideLoader, 200);
            }
        });
    }

    if (scanCompleteBtn) {
        scanCompleteBtn.addEventListener('click', () => {
            // After "scanning", we fetch the actual offer
            fetchOffer();
        });
    }

    if (backToWelcomeBtn) {
        backToWelcomeBtn.addEventListener('click', () => showScreen('welcome-screen'));
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
});
