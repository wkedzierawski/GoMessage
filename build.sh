#!/bin/bash

# Sprawdź, czy yarn jest zainstalowany
if ! command -v yarn &> /dev/null; then
  echo "Yarn nie jest zainstalowany. Zainstaluj go, aby kontynuować."
  exit 1
fi

# Budowanie aplikacji React
echo "Budowanie aplikacji React za pomocą 'yarn build'..."
if ! yarn build; then
  echo "Błąd podczas budowania aplikacji. Sprawdź logi."
  exit 1
fi

BUILD_FOLER="dist"

# Sprawdzenie, czy folder build istnieje
if [ ! -d "$BUILD_FOLER" ]; then
  echo "Folder '$BUILD_FOLER' nie został znaleziony. Budowanie mogło się nie powieść."
  exit 1
fi

# Ścieżka docelowa
TARGET_DIR="../server/app_build"

# Usuń istniejący folder docelowy, jeśli istnieje
if [ -d "$TARGET_DIR" ]; then
  echo "Usuwanie istniejącego folderu '$TARGET_DIR'..."
  rm -rf "$TARGET_DIR"
fi

# Przeniesienie folderu build
echo "Przenoszenie folderu $BUILD_FOLER do '$TARGET_DIR'..."
if mv dist "$TARGET_DIR"; then
  echo "Folder $BUILD_FOLER został pomyślnie przeniesiony do '$TARGET_DIR'."
else
  echo "Błąd podczas przenoszenia folderu."
  exit 1
fi

echo "Operacja zakończona pomyślnie!"
