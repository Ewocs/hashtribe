#!/bin/bash

# HashTribe Quick Setup Script
# This script automates the initial setup process

set -e

echo "🔷 HashTribe Setup Script"
echo "=========================="
echo ""

# Check prerequisites
echo "📋 Checking prerequisites..."

if ! command -v node &> /dev/null; then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

if ! command -v pnpm &> /dev/null; then
    echo "❌ pnpm is not installed. Installing pnpm..."
    npm install -g pnpm
fi

if ! command -v supabase &> /dev/null; then
    echo "⚠️  Supabase CLI is not installed."
    echo "   Install it with: brew install supabase/tap/supabase (macOS)"
    echo "   Or visit: https://supabase.com/docs/guides/cli"
    exit 1
fi

echo "✅ All prerequisites are installed"
echo ""

# Install dependencies
echo "📦 Installing dependencies..."
pnpm install
echo "✅ Dependencies installed"
echo ""

# Setup environment
if [ ! -f .env ]; then
    echo "🔧 Creating .env file..."
    cp .env.example .env
    echo "✅ .env file created"
    echo "⚠️  Please edit .env and add your Supabase credentials"
else
    echo "✅ .env file already exists"
fi
echo ""

# Start Supabase
echo "🚀 Starting Supabase..."
echo "   This will start a local Supabase instance with Docker"
echo ""
pnpm supabase:start

echo ""
echo "✅ Setup complete!"
echo ""
echo "📝 Next steps:"
echo "   1. Copy the Supabase credentials from above"
echo "   2. Edit .env and paste your credentials"
echo "   3. Configure GitHub OAuth (see README.md)"
echo "   4. Run: pnpm dev"
echo ""
echo "🎉 Happy coding!"
