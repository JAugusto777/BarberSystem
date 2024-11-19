@echo off
echo Iniciando instalacao de dependencias...

:: Executa npm install na pasta raiz
echo Instalando dependencias na raiz...
npm install

:: Navega para a pasta Back e executa npm install
echo Instalando dependencias na pasta Back...
cd Back
npm install
cd ..

:: Navega para a pasta Front e executa npm install
echo Instalando dependencias na pasta Front...
cd Front
npm install
cd ..

echo Instalacao concluida!
pause
