# Linux Server Deployment Guide

Complete guide for deploying your portfolio on a Linux server via SSH.

## Prerequisites

- Linux server with SSH access
- Docker and Docker Compose installed (recommended)
- OR Node.js 18+ and npm
- Git installed
- GitHub account

---

## Part 1: GitHub Repository Setup

### Repository Information

This project is hosted on GitHub as a **public repository**:
- **Repository**: https://github.com/gerryisrad/portfolio-website
- **No authentication required** for cloning
- `.env.local` with credentials is excluded from Git (in `.gitignore`)

> [!NOTE]
> The repository is public to make deployment easier and showcase your engineering work. Your admin credentials in `.env.local` are never committed to Git.

---

## Part 2: Server Setup

### Option A: Docker Deployment (Recommended)

Docker is recommended since you already have it running on your server.

#### 1. SSH into your server

```bash
ssh your-user@your-server-ip
```

#### 2. Clone the repository

```bash
cd ~
git clone https://github.com/gerryisrad/portfolio-website.git
cd portfolio-website
```

#### 3. Create environment file

```bash
nano .env.local
```

Add:
```
ADMIN_USERNAME=admin
ADMIN_PASSWORD=your_secure_password_here
```

Save with `Ctrl+X`, then `Y`, then `Enter`.

#### 4. Deploy with Docker Compose

```bash
# Build and start the container
docker compose up -d

# Check if it's running
docker compose ps

# View logs
docker compose logs -f
```

Your site is now running on port 3000!

#### 5. Access the site

- From server: `http://localhost:3000`
- From network: `http://YOUR_SERVER_IP:3000`

---

### Option B: PM2 Deployment (Alternative)

If you prefer not to use Docker:

#### 1. SSH and clone (same as above)

```bash
ssh your-user@your-server-ip
cd ~
git clone https://github.com/gerryisrad/portfolio-website.git
cd portfolio-website
```

#### 2. Install dependencies

```bash
npm install
```

#### 3. Create environment file

```bash
nano .env.local
```

Add your credentials (same as Docker option).

#### 4. Make deployment script executable

```bash
chmod +x deploy.sh
```

#### 5. Deploy

```bash
./deploy.sh
```

This will install PM2 if needed, build the site, and start it.

---

## Part 3: Firewall Configuration

Allow port 3000 through the firewall:

### Ubuntu/Debian (ufw)
```bash
sudo ufw allow 3000/tcp
sudo ufw reload
```

### CentOS/RHEL (firewalld)
```bash
sudo firewall-cmd --permanent --add-port=3000/tcp
sudo firewall-cmd --reload
```

---

## Part 4: Auto-Start on Reboot

### For Docker:
Docker Compose is already set with `restart: unless-stopped`, so it will auto-start.

### For PM2:
```bash
# Set PM2 to start on boot
pm2 startup

# Follow the instructions it provides (usually need to run a command with sudo)

# Save current processes
pm2 save
```

---

## Managing Your Deployment

### Docker Commands

```bash
# View status
docker compose ps

# View logs
docker compose logs -f portfolio

# Restart
docker compose restart

# Stop
docker compose down

# Update after code changes
git pull
docker compose up -d --build
```

### PM2 Commands

```bash
# View status
pm2 status

# View logs
pm2 logs portfolio

# Restart
pm2 restart portfolio

# Stop
pm2 stop portfolio
```

---

## Updating Your Site

When you make changes locally:

### 1. On Windows (local):
```powershell
git add .
git commit -m "Description of changes"
git push
```

### 2. On Linux server:
```bash
cd ~/portfolio-website
git pull

# For Docker:
docker compose up -d --build

# For PM2:
./deploy.sh
```

---

## Using a Custom Domain (Optional)

### 1. Point your domain to server IP

Add an A record in your domain DNS settings:
```
Type: A
Name: @ (or subdomain like 'portfolio')
Value: YOUR_SERVER_IP
TTL: 3600
```

### 2. Set up Nginx reverse proxy

Install Nginx:
```bash
sudo apt install nginx  # Ubuntu/Debian
sudo yum install nginx  # CentOS/RHEL
```

Create config:
```bash
sudo nano /etc/nginx/sites-available/portfolio
```

Add:
```nginx
server {
    listen 80;
    server_name yourdomain.com www.yourdomain.com;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Enable and restart:
```bash
sudo ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
sudo nginx -t
sudo systemctl restart nginx
```

### 3. Add SSL with Let's Encrypt

```bash
sudo apt install certbot python3-certbot-nginx
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

---

## Troubleshooting

### Port 3000 already in use
```bash
# Find what's using port 3000
sudo lsof -i :3000

# Kill the process (replace PID)
kill -9 PID
```

### Permission denied errors
```bash
# For content directory
sudo chown -R $USER:$USER ~/portfolio-website/content
chmod -R 755 ~/portfolio-website/content
```

### Docker build fails
```bash
# Clean up and rebuild
docker compose down
docker system prune -a
docker compose up -d --build
```

### Can't access from outside
1. Check firewall (see Firewall Configuration section)
2. Check if router needs port forwarding
3. Verify server IP is correct

---

## Security Best Practices

1. **Change default admin password** in `.env.local`
2. **Use strong passwords** (16+ characters, mixed case, numbers, symbols)
3. **Keep server updated**: `sudo apt update && sudo apt upgrade`
4. **Use SSH keys** instead of passwords for SSH access
5. **Set up fail2ban** to prevent brute force attacks
6. **Use HTTPS** with Let's Encrypt for production (see Custom Domain section)

---

## Quick Reference

### First-time setup:
```bash
git clone https://github.com/gerryisrad/portfolio-website.git
cd portfolio-website
nano .env.local  # Add credentials
docker compose up -d  # Deploy
```

### Updates:
```bash
git pull
docker compose up -d --build
```

### Check status:
```bash
docker compose ps
docker compose logs -f
```

---

Need help? Check the main [README.md](./README.md) or open an issue on GitHub!
