# Setting Up Formspree for GitHub Pages

This guide will walk you through configuring Formspree to collect email signups on your GitHub Pages site.

## Step 1: Create a Formspree Account

1. Go to [https://formspree.io/](https://formspree.io/)
2. Click **"Get Started"** or **"Sign Up"**
3. Sign up with your email address (free account is sufficient)
4. Verify your email address when prompted

## Step 2: Create a New Form

1. Once logged in, you'll see your dashboard
2. Click **"New Form"** or the **"+"** button
3. Give your form a name (e.g., "Readers Without Borders Signup")
4. Click **"Create Form"**

## Step 3: Get Your Form Endpoint

After creating the form, you'll see your form details:

1. Look for the **"Endpoint"** or **"Form URL"** - it will look like:
   ```
   https://formspree.io/f/YOUR_FORM_ID
   ```
   or
   ```
   https://formspree.io/f/YOUR_FORM_ID_HERE
   ```

2. Copy the **form ID** (the part after `/f/`). For example:
   - If your endpoint is `https://formspree.io/f/xjvqkzpn`
   - Your form ID is: `xjvqkzpn`

## Step 4: Update Your Website Code

1. Open `script.js` in your project
2. Find this line (around line 100):
   ```javascript
   const formspreeEndpoint = 'https://formspree.io/f/YOUR_FORMSPREE_ID';
   ```
3. Replace `YOUR_FORMSPREE_ID` with your actual form ID:
   ```javascript
   const formspreeEndpoint = 'https://formspree.io/f/xjvqkzpn';
   ```
   (Use your actual form ID, not this example!)

## Step 5: Configure Formspree Settings (Optional but Recommended)

In your Formspree dashboard:

1. **Email Notifications**: 
   - Go to your form settings
   - Add the email address where you want to receive signups
   - You'll get an email each time someone signs up

2. **Allowed Domains** (IMPORTANT for local testing and GitHub Pages):
   - Go to Settings → Security
   - Add your GitHub Pages domain: `yourusername.github.io`
   - **For local testing**, also add: `localhost` and `127.0.0.1`
   - This prevents others from using your form endpoint
   - **Note**: Without adding localhost, the form will NOT work when testing locally!

3. **Customize Email Subject**:
   - In form settings, you can customize the email subject line
   - The current code sends: "New Book Club Signup"

## Step 6: Test Your Form

1. **Test Locally** (before deploying):
   - **IMPORTANT**: Make sure you've added `localhost` and `127.0.0.1` to Formspree's allowed domains (Settings → Security)
   - Use a local server (don't open `index.html` directly with `file://` - it won't work)
   - If you have `start-server.bat` or `start-server.ps1`, run it to start a local server
   - Or use Python: `python -m http.server 8000` then visit `http://localhost:8000`
   - Try submitting the form with a test email
   - Check your Formspree dashboard for the submission
   - Check your email inbox for the notification

2. **Test on GitHub Pages** (after deploying):
   - Visit your live site
   - Submit the form again
   - Verify it works on the live site

## Step 7: Deploy to GitHub Pages

1. Push your updated `script.js` file to your GitHub repository
2. Your form will automatically work on GitHub Pages
3. No additional configuration needed!

## Troubleshooting

### Form Not Working?

1. **Check the form ID**: Make sure you copied the correct form ID (not the placeholder `YOUR_FORMSPREE_ID`)
2. **Check browser console**: Open Developer Tools (F12) and look for errors
3. **Check Formspree dashboard**: See if submissions are appearing there
4. **CORS errors**: 
   - For local testing: Make sure you've added `localhost` and `127.0.0.1` to Formspree's allowed domains
   - For GitHub Pages: Make sure you've added `yourusername.github.io` to Formspree's allowed domains
   - Don't open HTML files directly with `file://` - use a local server instead
5. **Form ID not configured**: If you see "Form is not configured" error, update `script.js` line 100 with your actual Formspree form ID

### Not Receiving Emails?

1. Check your spam folder
2. Verify your email in Formspree settings
3. Check Formspree dashboard - submissions should appear there even if emails fail

### Form Works But Shows Error Message?

The code has a fallback that stores emails in browser localStorage. If Formspree fails, check:
- Your form ID is correct
- Your Formspree account is active
- You haven't exceeded the free tier limit (50 submissions/month)

## Formspree Free Tier Limits

- **50 submissions per month** (free tier)
- Unlimited forms
- Email notifications
- Basic spam protection

If you need more submissions, Formspree offers paid plans starting at $19/month.

## Alternative: Using Formspree's HTML Form Method

If you prefer, you can also use Formspree's traditional HTML form method instead of JavaScript fetch. However, the current JavaScript method provides better user experience with instant feedback.

## Security Note

For production use, consider:
1. Adding your domain to Formspree's allowed domains list
2. Enabling reCAPTCHA in Formspree settings (available on paid plans)
3. Monitoring your Formspree dashboard for spam submissions

---

**Need Help?** Check Formspree's documentation: [https://help.formspree.io/](https://help.formspree.io/)

