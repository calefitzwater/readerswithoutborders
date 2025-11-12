@echo off
echo Starting local web server for Readers Book Club...
echo.
echo Testing your website locally...
echo.

REM Try Python 3 first
python --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python to start server...
    echo Open your browser to: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python -m http.server 8000
    goto :end
)

REM Try Python 2
python2 --version >nul 2>&1
if %errorlevel% == 0 (
    echo Using Python 2 to start server...
    echo Open your browser to: http://localhost:8000
    echo Press Ctrl+C to stop the server
    echo.
    python2 -m SimpleHTTPServer 8000
    goto :end
)

REM Try Node.js http-server
where http-server >nul 2>&1
if %errorlevel% == 0 (
    echo Using Node.js http-server...
    echo Open your browser to: http://localhost:8080
    echo Press Ctrl+C to stop the server
    echo.
    http-server
    goto :end
)

echo.
echo ERROR: No web server found!
echo.
echo Please install one of the following:
echo   1. Python (https://www.python.org/downloads/)
echo   2. Node.js (https://nodejs.org/)
echo.
echo Or simply double-click index.html to view in browser
echo (though the form may not work without a server)
echo.
pause

:end

