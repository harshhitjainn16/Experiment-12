# Deployment Guide

## Why Netlify Won't Work

Netlify is designed for **static sites only** (HTML, CSS, JavaScript files). Your chat app needs:
- A **running Node.js server** (Express)
- **WebSocket connections** (Socket.io)
- **Persistent server process**

These features require a backend hosting platform, not a static host.

## Recommended: Deploy to Render (Free)

### Steps:

1. **Push your code to GitHub** (if not already)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git remote add origin YOUR_GITHUB_REPO_URL
   git push -u origin main
   ```

2. **Go to [Render.com](https://render.com)** and sign up

3. **Create New Web Service**
   - Click "New +" → "Web Service"
   - Connect your GitHub repository
   - Render will auto-detect the settings from `render.yaml`

4. **Deploy!**
   - Click "Create Web Service"
   - Wait for deployment (2-3 minutes)
   - Your app will be live at: `https://your-app-name.onrender.com`

### Settings (Auto-detected from render.yaml):
- **Build Command:** `npm install`
- **Start Command:** `npm start`
- **Environment:** Node

## Alternative Platforms

### Railway.app (Free Tier)
1. Go to [Railway.app](https://railway.app)
2. "New Project" → "Deploy from GitHub"
3. Select your repo → Automatic deployment

### Glitch (Instant, No Git Required)
1. Go to [Glitch.com](https://glitch.com)
2. "New Project" → "Import from GitHub"
3. Or manually upload your files

### Heroku (Requires Credit Card)
1. Create `Procfile` with: `web: node server.js`
2. Deploy via Heroku CLI or GitHub integration

## Important Notes

- **Free tier limitations:** 
  - Render: May sleep after inactivity (wakes on request)
  - Railway: 500 hours/month free
  - Glitch: Always awake but limited resources

- **Environment Variables:** None needed for basic setup

- **Port:** The code uses `process.env.PORT || 3000` - platforms auto-assign PORT

## Testing Multiple Users

After deployment, open multiple browser tabs/windows with your deployed URL to test the real-time chat functionality!
