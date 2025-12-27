@echo off
echo ========================================
echo   Generateur APK - Merci Saint-Esprit
echo ========================================
echo.

echo Quelle methode voulez-vous essayer?
echo.
echo 1. EAS Build avec config simplifiee (Recommande)
echo 2. Expo Classic Build (Ancien systeme)
echo 3. EAS Build avec config minimale
echo 4. Annuler
echo.

set /p choice="Votre choix (1-4): "

if "%choice%"=="1" (
    echo.
    echo === Methode 1: EAS Build Simplifie ===
    echo.
    echo Sauvegarde de app.config.js...
    if exist app.config.js ren app.config.js app.config.js.backup
    
    echo Utilisation de app.json simplifie...
    if exist app.json.simple (
        copy app.json.simple app.json
        echo ✓ Configuration simplifiee activee
    ) else (
        echo ❌ Fichier app.json.simple introuvable
        pause
        exit /b 1
    )
    
    echo.
    echo Lancement du build...
    call eas build --platform android --profile preview --clear-cache
    
) else if "%choice%"=="2" (
    echo.
    echo === Methode 2: Expo Classic Build ===
    echo.
    echo ATTENTION: Cette methode est deprecie mais plus stable
    echo.
    call expo build:android -t apk
    
) else if "%choice%"=="3" (
    echo.
    echo === Methode 3: EAS Build Minimal ===
    echo.
    echo Sauvegarde de eas.json...
    if exist eas.json ren eas.json eas.json.backup
    
    echo Utilisation de eas.json minimal...
    if exist eas.json.minimal (
        copy eas.json.minimal eas.json
        echo ✓ Configuration minimale activee
    ) else (
        echo ❌ Fichier eas.json.minimal introuvable
        pause
        exit /b 1
    )
    
    echo Sauvegarde de app.config.js...
    if exist app.config.js ren app.config.js app.config.js.backup
    
    echo Utilisation de app.json simplifie...
    if exist app.json.simple (
        copy app.json.simple app.json
        echo ✓ Configuration simplifiee activee
    ) else (
        echo ❌ Fichier app.json.simple introuvable
        pause
        exit /b 1
    )
    
    echo.
    echo Lancement du build...
    call eas build --platform android --profile preview --clear-cache
    
) else (
    echo Operation annulee.
    exit /b
)

echo.
echo ========================================
echo   Build termine ou echoue
echo ========================================
echo.
echo Si le build a reussi, vous recevrez un lien de telechargement.
echo Si le build a echoue, consultez les logs sur:
echo https://expo.dev/accounts/nono995/projects/church-app/builds
echo.
pause
