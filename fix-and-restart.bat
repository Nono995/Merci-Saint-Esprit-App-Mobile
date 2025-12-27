@echo off
echo ========================================
echo Nettoyage complet et redemarrage
echo ========================================
echo.

echo Etape 1: Suppression du cache Expo...
if exist .expo rmdir /s /q .expo
echo Cache Expo supprime.
echo.

echo Etape 2: Suppression du cache Metro...
if exist node_modules\.cache rmdir /s /q node_modules\.cache
echo Cache Metro supprime.
echo.

echo Etape 3: Demarrage avec cache nettoye...
echo.
npx expo start --clear

pause
