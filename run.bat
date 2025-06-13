@echo off
echo ========================================
echo   API REST ALAS CHIQUITANAS
echo ========================================
echo.

REM Verificar si npm está instalado
where npm >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ERROR: npm no está instalado o no está en el PATH
    echo Por favor instala Node.js desde https://nodejs.org/
    pause
    exit /b 1
)

REM Verificar si existe node_modules
if not exist "node_modules\" (
    echo No se encontró la carpeta node_modules
    echo Instalando dependencias...
    echo.
    call npm install
    if %ERRORLEVEL% NEQ 0 (
        echo.
        echo ERROR: No se pudieron instalar las dependencias
        pause
        exit /b 1
    )
    echo.
    echo Dependencias instaladas exitosamente!
    echo.
)

REM Verificar si existe .env
if not exist ".env" (
    echo ADVERTENCIA: No se encontró archivo .env
    echo Por favor copia el contenido de env.txt a un nuevo archivo llamado .env
    echo.
)

REM Iniciar la aplicación
echo Iniciando servidor...
echo.
call npm start

REM Si el servidor se detiene, pausar para ver los errores
pause 