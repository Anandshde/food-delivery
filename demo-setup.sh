#!/bin/bash

echo "🍕 Food Delivery App - Demo Setup Script"
echo "========================================"

# Check if Node.js is installed
if ! command -v node &> /dev/null
then
    echo "❌ Node.js is not installed. Please install Node.js 18+ first."
    exit 1
fi

# Check if npm is installed
if ! command -v npm &> /dev/null
then
    echo "❌ npm is not installed. Please install npm first."
    exit 1
fi

echo "✅ Node.js and npm are installed"

# Install backend dependencies
echo "📦 Installing backend dependencies..."
cd BE-food-delivery
npm install

# Build backend
echo "🔨 Building backend..."
npm run build

# Check if .env exists, if not copy from example
if [ ! -f .env ]; then
    echo "📝 Creating backend .env file from example..."
    cp .env.example .env
    echo "⚠️  Please update the .env file with your actual credentials:"
    echo "   - MongoDB URI"
    echo "   - JWT Secret"
    echo "   - Cloudinary credentials"
    echo "   - Email credentials"
fi

cd ..

# Install frontend dependencies
echo "📦 Installing frontend dependencies..."
cd fe-food-delivery
npm install

# Check if .env.local exists, if not copy from example
if [ ! -f .env.local ]; then
    echo "📝 Creating frontend .env.local file from example..."
    cp .env.example .env.local
fi

# Build frontend
echo "🔨 Building frontend..."
npm run build

cd ..

echo ""
echo "🎉 Setup complete!"
echo ""
echo "📝 Next steps:"
echo "1. Update BE-food-delivery/.env with your actual credentials"
echo "2. Update fe-food-delivery/.env.local if needed"
echo "3. Start the backend: cd BE-food-delivery && npm start"
echo "4. Start the frontend: cd fe-food-delivery && npm start"
echo ""
echo "🌍 Access the application:"
echo "- Frontend: http://localhost:3000"
echo "- Backend: http://localhost:8000"
echo ""
echo "📚 For deployment instructions, see DEPLOYMENT_README.md"
echo "📁 For portfolio entry, see PORTFOLIO_ENTRY.md"