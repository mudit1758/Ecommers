@echo off
cd /d "%~dp0"
echo Installing dependencies...
call npm install
echo.
echo Installation complete! Run "npm run dev" to start the development server.
pause
