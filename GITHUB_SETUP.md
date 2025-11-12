# Setting Up GitHub Repository

Follow these steps to set up your book club website on GitHub and deploy it to GitHub Pages.

## Prerequisites

1. **Install Git** (if not already installed):
   - Download from: [https://git-scm.com/download/win](https://git-scm.com/download/win)
   - Install with default settings
   - Restart your terminal/command prompt after installation

2. **Create a GitHub account** (if you don't have one):
   - Go to [https://github.com](https://github.com)
   - Sign up for a free account

## Step 1: Initialize Git Repository (Local)

Open PowerShell or Command Prompt in your project folder and run:

```bash
# Initialize git repository
git init

# Add all files
git add .

# Make your first commit
git commit -m "Initial commit: Readers Without Borders book club website"
```

## Step 2: Create Repository on GitHub

1. Go to [https://github.com](https://github.com) and sign in
2. Click the **"+"** icon in the top right corner
3. Select **"New repository"**
4. Fill in the repository details:
   - **Repository name**: `readers-without-borders` (or your preferred name)
   - **Description**: "Website for Readers Without Borders book club"
   - **Visibility**: Choose **Public** (required for free GitHub Pages)
   - **DO NOT** initialize with README, .gitignore, or license (we already have files)
5. Click **"Create repository"**

## Step 3: Connect Local Repository to GitHub

After creating the repository, GitHub will show you commands. Use these (replace `YOUR_USERNAME` with your GitHub username):

```bash
# Add the remote repository (replace YOUR_USERNAME and REPO_NAME)
git remote add origin https://github.com/YOUR_USERNAME/readers-without-borders.git

# Rename branch to main (if needed)
git branch -M main

# Push your code to GitHub
git push -u origin main
```

**Example:**
If your username is `johndoe` and repo name is `readers-without-borders`:
```bash
git remote add origin https://github.com/johndoe/readers-without-borders.git
git branch -M main
git push -u origin main
```

You'll be prompted for your GitHub username and password (or personal access token).

## Step 4: Enable GitHub Pages

1. Go to your repository on GitHub
2. Click **Settings** (top menu)
3. Scroll down to **Pages** (left sidebar)
4. Under **Source**, select:
   - **Branch**: `main`
   - **Folder**: `/ (root)`
5. Click **Save**
6. Wait a minute or two, then visit: `https://YOUR_USERNAME.github.io/readers-without-borders/`

Your site should be live!

## Step 5: Configure Formspree (Important!)

Before your form will work, you need to:

1. Set up Formspree (see [FORMSPREE_SETUP.md](FORMSPREE_SETUP.md))
2. Update `script.js` with your Formspree form ID
3. Add your GitHub Pages domain to Formspree's allowed domains:
   - In Formspree dashboard → Settings → Security
   - Add: `YOUR_USERNAME.github.io`

## Step 6: Future Updates

Whenever you make changes to your website:

```bash
# Check what files changed
git status

# Add changed files
git add .

# Commit changes
git commit -m "Description of your changes"

# Push to GitHub
git push
```

Your GitHub Pages site will automatically update within a few minutes!

## Troubleshooting

### Git Not Found
- Make sure Git is installed and you've restarted your terminal
- Try: `where git` (Windows) to check if it's in your PATH

### Authentication Issues
- GitHub no longer accepts passwords for Git operations
- You'll need a **Personal Access Token**:
  1. GitHub → Settings → Developer settings → Personal access tokens → Tokens (classic)
  2. Generate new token with `repo` permissions
  3. Use the token as your password when pushing

### Pages Not Updating
- Wait 1-2 minutes after pushing
- Check the Actions tab in your GitHub repo for build status
- Clear your browser cache

### Custom Domain (Optional)
If you have your own domain:
1. Add a `CNAME` file to your repo with your domain name
2. Configure DNS settings with your domain provider
3. Update Formspree allowed domains to include your custom domain

## Need Help?

- Git documentation: [https://git-scm.com/doc](https://git-scm.com/doc)
- GitHub Pages docs: [https://docs.github.com/en/pages](https://docs.github.com/en/pages)
- GitHub Help: [https://docs.github.com](https://docs.github.com)

