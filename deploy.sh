#!/bin/bash

# Portfolio Deployment Script for Linux
# This script deploys your portfolio using PM2

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Check if PM2 is installed
echo ""
echo "📦 Checking for PM2..."
if ! command -v pm2 &> /dev/null; then
    echo "PM2 not found. Installing PM2..."
    npm install -g pm2
fi

# Stop existing process
echo ""
echo "🛑 Stopping existing portfolio process..."
pm2 stop portfolio 2>/dev/null || true
pm2 delete portfolio 2>/dev/null || true

# Build the project
echo ""
echo "🔨 Building production version..."
npm run build

# Create logs directory if it doesn't exist
mkdir -p logs

# Start with PM2
echo ""
echo "▶️  Starting portfolio with PM2..."
pm2 start ecosystem.config.js

# Save PM2 process list
pm2 save

echo ""
echo "✅ Deployment complete!"
echo ""
echo "📊 Portfolio status:"
pm2 status

# Get local IP address
LOCAL_IP=$(hostname -I | awk '{print $1}')

echo ""
echo "🌐 Access your portfolio at:"
echo "   Local:   http://localhost:3000"
if [ -n "$LOCAL_IP" ]; then
    echo "   Network: http://$LOCAL_IP:3000"
fi

echo ""
echo "💡 Useful commands:"
echo "   pm2 status           - Check status"
echo "   pm2 logs portfolio   - View logs"
echo "   pm2 restart portfolio - Restart server"
echo "   pm2 stop portfolio   - Stop server"
