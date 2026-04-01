#!/bin/bash

# ShopHub E-Commerce Quick Setup & Test Guide

echo "========================================"
echo "🛒 ShopHub - E-Commerce Setup Guide"
echo "========================================"
echo ""

# Check if node_modules exists
if [ ! -d "node_modules" ]; then
    echo "📦 Installing dependencies..."
    npm install
    echo "✅ Dependencies installed!"
else
    echo "✅ Dependencies already installed"
fi

echo ""
echo "========================================"
echo "🚀 Starting Development Server..."
echo "========================================"
echo ""
echo "Next steps:"
echo "1. Visit: http://localhost:3000"
echo "2. Add products to cart"
echo "3. Go to /cart"
echo "4. Click 'Buy Now with Razorpay'"
echo "5. Use test card: 4111 1111 1111 1111"
echo ""
echo "=============== Test Mode Active ✅ ==============="
echo "Using Razorpay test key for development"
echo "No real payments will be processed"
echo ""

npm run dev
