# Testing Locally

Here are several ways to test your book club website locally:

## Method 1: Simple - Open in Browser (Quick Test)

1. Navigate to your project folder
2. Double-click `index.html` to open it in your default browser

**Note:** This works for viewing, but the email form may not work properly due to browser security restrictions. Use Method 2 or 3 for full functionality.

## Method 2: Python HTTP Server (Recommended)

If you have Python installed:

1. Open PowerShell or Command Prompt in your project folder
2. Run one of these commands:

**Python 3:**
```bash
python -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

3. Open your browser and go to: `http://localhost:8000`

4. Press `Ctrl+C` to stop the server when done

## Method 3: Node.js http-server

If you have Node.js installed:

1. Install http-server globally (one time):
```bash
npm install -g http-server
```

2. In your project folder, run:
```bash
http-server
```

3. Open your browser and go to the URL shown (usually `http://localhost:8080`)

## Method 4: VS Code Live Server Extension

1. Install the "Live Server" extension in VS Code/Cursor
2. Right-click on `index.html`
3. Select "Open with Live Server"
4. Your browser will open automatically with auto-reload

## Quick Test Script

You can also use the `start-server.bat` file (Windows) or `start-server.sh` (Mac/Linux) included in this project.

