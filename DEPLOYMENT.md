# Self-Hosting Deployment Guide

This guide will help you deploy and run your portfolio website on a local machine for 24/7 self-hosting.

## Prerequisites

- Node.js installed (you already have this)
- Windows machine that will stay on continuously
- Admin access to install PM2

## Quick Start

### 1. Deploy the Site

Run the deployment script in PowerShell:

```powershell
powershell -ExecutionPolicy Bypass -File .\deploy.ps1
```

This script will:
- Install PM2 if not already installed
- Build your site for production
- Start the server with PM2
- Configure auto-restart on crashes

### 2. Access Your Site

After deployment, access your portfolio at:

- **Local machine**: http://localhost:3000
- **Other devices on your network**: http://YOUR_IP:3000
  - The deploy script will show your IP address
  - Example: http://192.168.1.180:3000

## Managing Your Site

### Check Status
```powershell
pm2 status
```

### View Logs
```powershell
pm2 logs portfolio
```

### Restart Server
```powershell
pm2 restart portfolio
```

### Stop Server
```powershell
pm2 stop portfolio
```

### Start Server (if stopped)
```powershell
pm2 start portfolio
```

## Auto-Start on Boot

To make the site start automatically when your computer boots:

```powershell
# Set PM2 to start on system boot
pm2 startup
# Follow the instructions it provides

# Save current process list
pm2 save
```

## Accessing from Other Devices

### On Your Local Network

1. Find your local IP address (shown in deploy script output)
2. On any device connected to your WiFi, visit: `http://YOUR_IP:3000`
3. Make sure Windows Firewall allows port 3000 (see Firewall Setup below)

### From the Internet (Optional)

To access from anywhere in the world:

1. **Port Forwarding**: Set up port forwarding on your router
   - Forward external port (e.g., 8080) to your local IP port 3000
   - Every router is different - check your router's manual

2. **Dynamic DNS** (recommended): Your home IP changes periodically
   - Sign up for a free DDNS service (No-IP, DuckDNS, etc.)
   - Configure your router to update the DDNS service

3. **Security**: Consider adding HTTPS and stronger authentication

## Firewall Setup

Allow Node.js through Windows Firewall:

```powershell
# Run as Administrator
New-NetFirewallRule -DisplayName "Portfolio Website" -Direction Inbound -Protocol TCP -LocalPort 3000 -Action Allow
```

Or manually:
1. Open Windows Defender Firewall
2. Advanced Settings → Inbound Rules → New Rule
3. Port → TCP → Specific local port: 3000
4. Allow the connection

## Admin Panel Access

Access the admin panel to edit projects:

- URL: http://localhost:3000/admin
- Credentials: In your `.env.local` file
  - Username: `admin`
  - Password: Check `ADMIN_PASSWORD` in `.env.local`

## Logs

Logs are stored in `./logs/`:
- `err.log` - Error logs
- `out.log` - Standard output logs
- `combined.log` - Combined logs

## Updating Your Site

When you make changes to your code:

1. Make your code changes
2. Run the deploy script again:
   ```powershell
   powershell -ExecutionPolicy Bypass -File .\deploy.ps1
   ```

The script will rebuild and restart automatically.

## Troubleshooting

### Port 3000 already in use
```powershell
# Find what's using port 3000
netstat -ano | findstr :3000

# Kill the process (replace PID with actual process ID)
taskkill /F /PID <PID>
```

### Site not accessible from other devices
1. Check Windows Firewall (see Firewall Setup above)
2. Verify your local IP hasn't changed
3. Ensure both devices are on the same network

### PM2 commands not found
Install PM2 globally:
```powershell
npm install -g pm2
```

### Build fails
1. Delete `.next` folder
2. Delete `node_modules` folder
3. Run `npm install`
4. Try deployment again

## Production Optimization

Your site is already optimized for production with:
- ✅ Minified JavaScript and CSS
- ✅ Image optimization
- ✅ Code splitting
- ✅ Auto-restart on crashes
- ✅ Log rotation via PM2

## Need Help?

Common PM2 commands:
```powershell
pm2 status           # Check all processes
pm2 logs portfolio   # View real-time logs
pm2 monit           # Live monitoring dashboard
pm2 restart portfolio # Restart the server
pm2 stop portfolio   # Stop the server
pm2 delete portfolio # Remove from PM2
```
