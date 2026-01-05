// Meeting data - Update this with your actual meeting information
const meetingData = {
    nextMeeting: {
        date: "January 2026",
        book: "Heated Rivalry",
        bookNote: "The Gay Hockey Romance Book",
        location: "TBD"
    },
    pastMeetings: [
        {
            date: "October 2025",
            book: "Magpie Murders by Anthony Horowitz",
            location: "Drea and Eric's"
        },
        {
            date: "July 2025",
            book: "The Wisteria Society of Lady Scoundrels by India Holton",
            location: "Cancelled"
        },
        {
            date: "June 2025",
            book: "Going Postal by Terry Pratchett",
            location: "Cale's"
        },
        {
            date: "May 2025",
            book: "Red Rising",
            location: "Cale's"
        }
    ]
};

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    displayNextMeeting();
    displayMeetingHistory();
    setupEmailForm();
});

// Display next meeting information
function displayNextMeeting() {
    const next = meetingData.nextMeeting;
    document.getElementById('nextMeetingDate').textContent = next.date;
    
    // Display book title and note
    const bookElement = document.getElementById('nextMeetingBook');
    if (next.bookNote) {
        bookElement.innerHTML = `<strong>${next.book}</strong><br><span class="book-note">${next.bookNote}</span>`;
    } else {
        bookElement.textContent = next.book;
    }
    
    document.getElementById('nextMeetingLocation').textContent = next.location;
}

// Display meeting history
function displayMeetingHistory() {
    const historyContainer = document.getElementById('meetingHistory');
    
    if (meetingData.pastMeetings.length === 0) {
        historyContainer.innerHTML = '<p class="empty-history">No past meetings to display yet.</p>';
        return;
    }

    historyContainer.innerHTML = meetingData.pastMeetings.map(meeting => {
        const isCancelled = meeting.location.toLowerCase() === 'cancelled';
        const locationClass = isCancelled ? 'history-location cancelled' : 'history-location';
        const locationIcon = isCancelled ? '❌' : '📍';
        return `
        <div class="history-item ${isCancelled ? 'cancelled-meeting' : ''}">
            <h3>${meeting.book}</h3>
            <div class="history-date">${meeting.date}</div>
            <div class="${locationClass}">${locationIcon} ${meeting.location}</div>
        </div>
    `;
    }).join('');
}

// Setup email form submission
function setupEmailForm() {
    const form = document.getElementById('emailForm');
    const messageDiv = document.getElementById('formMessage');
    
    form.addEventListener('submit', async function(e) {
        e.preventDefault();
        
        const emailInput = document.getElementById('emailInput');
        const email = emailInput.value.trim();
        
        if (!email) {
            showMessage('Please enter a valid email address.', 'error');
            return;
        }

        // Show loading state
        const submitButton = form.querySelector('button[type="submit"]');
        const originalButtonText = submitButton.textContent;
        submitButton.textContent = 'Signing Up...';
        submitButton.disabled = true;

        try {
            // Option 1: Using Formspree (free service for static sites)
            // Replace 'YOUR_FORMSPREE_ID' with your actual Formspree form ID
            // Get one at https://formspree.io/
            const formspreeEndpoint = 'https://formspree.io/f/mvgdolbr';
            
            // Check if Formspree ID is still placeholder
            if (formspreeEndpoint.includes('YOUR_FORMSPREE_ID')) {
                throw new Error('Formspree form ID not configured. Please update script.js with your Formspree form ID.');
            }
            
            console.log('Submitting to Formspree:', formspreeEndpoint);
            console.log('Current domain:', window.location.hostname);
            
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json'
                },
                body: JSON.stringify({
                    email: email,
                    _subject: 'New Book Club Signup',
                })
            });

            console.log('Response status:', response.status);
            console.log('Response ok:', response.ok);

            // Parse response to check for Formspree errors
            let responseData;
            try {
                responseData = await response.json();
                console.log('Response data:', responseData);
            } catch (parseError) {
                console.error('Failed to parse response:', parseError);
                const text = await response.text();
                console.log('Response text:', text);
                throw new Error('Invalid response from Formspree. Check console for details.');
            }
            
            if (response.ok) {
                console.log('Form submission successful!');
                showMessage('Thank you! You\'ve been successfully added to our mailing list.', 'success');
                emailInput.value = '';
            } else {
                // Handle Formspree-specific errors
                const errorMsg = responseData.error || responseData.errors?.[0]?.message || responseData.message || 'Submission failed. Please try again.';
                console.error('Formspree error:', errorMsg, responseData);
                throw new Error(errorMsg);
            }
        } catch (error) {
            // Log error for debugging
            console.error('Form submission error:', error);
            console.error('Error details:', {
                message: error.message,
                stack: error.stack,
                hostname: window.location.hostname,
                origin: window.location.origin
            });
            
            // Show user-friendly error message
            if (error.message.includes('Formspree form ID not configured')) {
                showMessage('Form is not configured. Please contact the site administrator.', 'error');
            } else if (error.message.includes('CORS') || error.message.includes('Failed to fetch') || error.message.includes('NetworkError')) {
                // Check if we're on localhost
                const isLocalhost = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1';
                if (isLocalhost) {
                    showMessage('CORS error: Make sure you\'ve added "localhost" and "127.0.0.1" to Formspree\'s allowed domains in Settings → Security.', 'error');
                } else {
                    showMessage('CORS/Network error: Make sure "' + window.location.hostname + '" is added to Formspree\'s allowed domains. Check browser console (F12) for details.', 'error');
                }
            } else if (error.message.includes('domain') || error.message.includes('not allowed') || error.message.includes('restricted')) {
                showMessage('Domain not allowed: Make sure "' + window.location.hostname + '" is added to Formspree\'s allowed domains in Settings → Security.', 'error');
            } else {
                showMessage(error.message || 'Unable to submit form. Please try again later. Check console (F12) for details.', 'error');
            }
            
            // Fallback: Store in localStorage (for demo purposes)
            // In production, you should use a proper email service
            console.log('Email to add (fallback):', email);
            
            // Store locally as fallback
            let emails = JSON.parse(localStorage.getItem('bookClubEmails') || '[]');
            if (!emails.includes(email)) {
                emails.push(email);
                localStorage.setItem('bookClubEmails', JSON.stringify(emails));
            }
        } finally {
            submitButton.textContent = originalButtonText;
            submitButton.disabled = false;
        }
    });
}

// Show form message
function showMessage(message, type) {
    const messageDiv = document.getElementById('formMessage');
    messageDiv.textContent = message;
    messageDiv.className = `form-message ${type}`;
    
    // Scroll to message
    messageDiv.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
}

