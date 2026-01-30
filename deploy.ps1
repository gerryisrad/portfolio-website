# Portfolio Deployment Script
# This script builds and deploys your portfolio using PM2

Write-Host "🚀 Starting deployment..." -ForegroundColor Cyan

# Check if PM2 is installed
Write-Host "`n📦 Checking for PM2..." -ForegroundColor Yellow
if (-not (Get-Command pm2 -ErrorAction SilentlyContinue)) {
    Write-Host "PM2 not found. Installing PM2..." -ForegroundColor Yellow
    npm install -g pm2
    if ($LASTEXITCODE -ne 0) {
        Write-Host "❌ Failed to install PM2" -ForegroundColor Red
        exit 1
    }
}

# Stop existing process
Write-Host "`n🛑 Stopping existing portfolio process..." -ForegroundColor Yellow
pm2 stop portfolio 2>$null
pm2 delete portfolio 2>$null

# Build the project
Write-Host "`n🔨 Building production version..." -ForegroundColor Yellow
npm run build
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Build failed" -ForegroundColor Red
    exit 1
}

# Create logs directory if it doesn't exist
if (-not (Test-Path "logs")) {
    New-Item -ItemType Directory -Path "logs" | Out-Null
}

# Start with PM2
Write-Host "`n▶️  Starting portfolio with PM2..." -ForegroundColor Yellow
pm2 start ecosystem.config.js
if ($LASTEXITCODE -ne 0) {
    Write-Host "❌ Failed to start with PM2" -ForegroundColor Red
    exit 1
}

# Save PM2 process list
pm2 save

Write-Host "`n✅ Deployment complete!" -ForegroundColor Green
Write-Host "`n📊 Portfolio status:" -ForegroundColor Cyan
pm2 status

# Get local IP address
$localIP = (Get-NetIPAddress -AddressFamily IPv4 | Where-Object { $_.InterfaceAlias -notlike "*Loopback*" -and $_.PrefixOrigin -eq "Dhcp" }).IPAddress | Select-Object -First 1

Write-Host "`n🌐 Access your portfolio at:" -ForegroundColor Cyan
Write-Host "   Local:   http://localhost:3000" -ForegroundColor White
if ($localIP) {
    Write-Host "   Network: http://$($localIP):3000" -ForegroundColor White
}

Write-Host "`n💡 Useful commands:" -ForegroundColor Cyan
Write-Host "   pm2 status           - Check status" -ForegroundColor White
Write-Host "   pm2 logs portfolio   - View logs" -ForegroundColor White
Write-Host "   pm2 restart portfolio - Restart server" -ForegroundColor White
Write-Host "   pm2 stop portfolio   - Stop server" -ForegroundColor White
