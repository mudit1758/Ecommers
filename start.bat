@echo off
REM ShopHub E-Commerce Quick Setup & Test Guide

cls
echo.
echo ========================================
echo   ShopHub - E-Commerce Setup Guide
echo ========================================
echo.

REM Check if node_modules exists
if not exist "node_modules" (
    echo 1/3 Installing dependencies...
    call npm install
    echo.
    echo OK: Dependencies installed!
    echo.
) else (
    echo OK: Dependencies already installed
    echo.
)

echo ========================================
echo   Starting Development Server...
echo ========================================
echo.
echo Next steps:
echo   1. Visit http://localhost:3000
echo   2. Add products to cart
echo   3. Go to /cart
echo   4. Click 'Buy Now with Razorpay'
echo   5. Use test card data:
echo      Card: 4111 1111 1111 1111
echo      Expiry: Any future date
echo      CVV: Any 3 digits
echo.
echo =============== Test Mode Active OK ===============
echo Using Razorpay test key for development
echo No real payments will be processed
echo.
echo Press Ctrl+C to stop the server
echo.

call npm run dev

pause
