@echo off
echo ========================================
echo   Fix Dependencies and Build APK
echo ========================================
echo.

echo Etape 1: Nettoyage...
echo Suppression de node_modules...
if exist node_modules rmdir /s /q node_modules
echo Suppression de package-lock.json...
if exist package-lock.json del /f package-lock.json
echo ✓ Nettoyage termine!
echo.

echo Etape 2: Installation des dependances...
echo Cela peut prendre 3-5 minutes...
call npm install
if errorlevel 1 (
    echo.
    echo ❌ Erreur lors de l'installation!
    echo Essayez: npm install --legacy-peer-deps
    pause
    exit /b 1
)
echo ✓ Installation terminee!
echo.

echo Etape 3: Verification...
call npx expo --version
echo.

echo ========================================
echo   Voulez-vous builder maintenant?
echo ========================================
echo   1. Oui, builder l'APK (20 min)
echo   2. Non, juste tester sur Expo Go
echo   3. Annuler
echo ========================================
echo.

set /p choice="Votre choix (1-3): "

if "%choice%"=="1" (
    echo.
    echo Building APK...
    call eas build --platform android --profile preview
) else if "%choice%"=="2" (
    echo.
    echo Lancement de Expo...
    call npx expo start --tunnel
) else (
    echo Operation annulee.
)

echo.
pause
