// Meeting data - Update this with your actual meeting information
const meetingData = {
    nextMeeting: {
        date: "December 2024",
        book: "Reader's Choice",
        bookNote: "Choose any book you'd like! Just prepare a fun 5-minute presentation about it.",
        location: "TBD"
    },
    pastMeetings: [
        {
            date: "October 2024",
            book: "Magpie Murders by Anthony Horowitz",
            location: "Drea and Eric's"
        },
        {
            date: "July 2024",
            book: "The Wisteria Society of Lady Scoundrels by India Holton",
            location: "Cancelled"
        },
        {
            date: "June 2024",
            book: "Going Postal by Terry Pratchett",
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
            const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORMSPREE_ID';
            
            const response = await fetch(formspreeEndpoint, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: email,
                    _subject: 'New Book Club Signup',
                })
            });

            if (response.ok) {
                showMessage('Thank you! You\'ve been successfully added to our mailing list.', 'success');
                emailInput.value = '';
            } else {
                throw new Error('Submission failed');
            }
        } catch (error) {
            // Fallback: Store in localStorage (for demo purposes)
            // In production, you should use a proper email service
            console.log('Form submission error:', error);
            console.log('Email to add:', email);
            
            // Store locally as fallback
            let emails = JSON.parse(localStorage.getItem('bookClubEmails') || '[]');
            if (!emails.includes(email)) {
                emails.push(email);
                localStorage.setItem('bookClubEmails', JSON.stringify(emails));
            }
            
            showMessage('Thank you! You\'ve been added to our list. (Note: Configure Formspree for production use)', 'success');
            emailInput.value = '';
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

