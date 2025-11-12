# Readers Book Club Website

A simple, modern website for your book club hosted on GitHub Pages.

## Features

- **Homepage** with welcoming introduction
- **Email Signup Form** to join the mailing list
- **Next Meeting Information** display
- **Meeting History** showing past months' books and dates

## Setup Instructions

### 1. Update Meeting Information

Edit `script.js` and update the `meetingData` object with your actual meeting information:

```javascript
const meetingData = {
    nextMeeting: {
        date: "Your next meeting date",
        book: "Your next book title",
        location: "Meeting location"
    },
    pastMeetings: [
        // Add your past meetings here
    ]
};
```

### 2. Set Up Email Collection

The website uses Formspree for email collection (free for up to 50 submissions/month). 

**📖 See [FORMSPREE_SETUP.md](FORMSPREE_SETUP.md) for detailed step-by-step instructions.**

Quick setup:
1. Go to [Formspree.io](https://formspree.io/) and create a free account
2. Create a new form and copy your form ID
3. In `script.js` (line 100), replace `'YOUR_FORMSPREE_ID'` with your actual Formspree form ID

**Alternative Email Services:**
- **EmailJS** - Free tier available
- **Netlify Forms** - If you migrate to Netlify
- **Google Forms** - Simple alternative
- **Mailchimp** - For more advanced email marketing

### 3. Deploy to GitHub Pages

1. Create a new repository on GitHub (or use an existing one)
2. Push all files to the repository
3. Go to Settings → Pages
4. Select the branch (usually `main` or `master`)
5. Select the folder (usually `/root`)
6. Click Save
7. Your site will be live at `https://yourusername.github.io/repository-name/`

### 4. Customize the Design

- Edit `styles.css` to change colors, fonts, and styling
- The color scheme uses CSS variables defined at the top of `styles.css`
- Modify `index.html` to add or remove sections

## File Structure

```
readers/
├── index.html      # Main homepage
├── styles.css      # Styling
├── script.js       # JavaScript functionality
└── README.md       # This file
```

## Customization

### Changing Colors

Edit the CSS variables in `styles.css`:

```css
:root {
    --primary-color: #4a5568;
    --secondary-color: #2d3748;
    --accent-color: #667eea;
    /* ... */
}
```

### Adding More Sections

Simply add new sections to `index.html` following the existing pattern, and style them in `styles.css`.

## Support

For issues or questions, please open an issue in the repository.

