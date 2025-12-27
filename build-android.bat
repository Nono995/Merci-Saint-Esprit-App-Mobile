@echo off
echo ========================================
echo   Build Android APK - Merci Saint-Esprit
echo ========================================
echo.

echo Verification de EAS CLI...
call eas --version >nul 2>&1
if errorlevel 1 (
    echo EAS CLI n'est pas installe. Installation...
    call npm install -g eas-cli
)

echo.
echo Connexion a Expo...
call eas whoami >nul 2>&1
if errorlevel 1 (
    echo Vous devez vous connecter:
    call eas login
)

echo.
echo ========================================
echo   Choisissez le type de build:
echo ========================================
echo   1. Preview (Prototype - APK direct)
echo   2. Production (Version finale)
echo   3. Annuler
echo ========================================
echo.

set /p choice="Votre choix (1-3): "

if "%choice%"=="1" (
    echo.
    echo Building Preview APK...
    call eas build --platform android --profile preview
) else if "%choice%"=="2" (
    echo.
    echo Building Production APK...
    call eas build --platform android --profile production
) else (
    echo Build annule.
    exit /b
)

echo.
echo ========================================
echo   Build termine!
echo ========================================
echo.
echo Le lien de telechargement sera affiche ci-dessus.
echo Vous pouvez aussi le retrouver sur: https://expo.dev
echo.
pause
