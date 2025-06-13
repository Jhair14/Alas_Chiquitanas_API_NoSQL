# 🔍 Guía de Solución de Errores Comunes

## 📌 Índice
1. [Errores de SQL Server](#errores-de-sql-server)
2. [Errores de Node.js y npm](#errores-de-nodejs-y-npm)
3. [Errores de Configuración](#errores-de-configuración)
4. [Errores de Red](#errores-de-red)
5. [Errores de la API](#errores-de-la-api)

## Errores de SQL Server

### 🔴 Error: "Login failed for user..."
```
Error: Login failed for user 'usuario'
```

**Causas posibles:**
1. Credenciales incorrectas
2. Usuario no existe
3. Permisos insuficientes

**Soluciones:**
1. Verificar usuario y contraseña en `.env`
2. En SSMS, ejecutar:
   ```sql
   CREATE LOGIN [usuario] WITH PASSWORD = 'contraseña'
   CREATE USER [usuario] FOR LOGIN [usuario]
   GRANT CONNECT TO [usuario]
   ```
3. Asignar permisos:
   ```sql
   GRANT SELECT, INSERT, UPDATE, DELETE ON [Alas_Chiquitanas].[dbo].[Recursos] TO [usuario]
   GRANT SELECT, INSERT, UPDATE, DELETE ON [Alas_Chiquitanas].[dbo].[ReporteRapido] TO [usuario]
   GRANT SELECT, INSERT, UPDATE, DELETE ON [Alas_Chiquitanas].[dbo].[ReporteRecurso] TO [usuario]
   ```

### 🔴 Error: "Cannot connect to server"
```
Error: Failed to connect to DESKTOP-XXX\SQLEXPRESS
```

**Causas posibles:**
1. Servicio SQL Server detenido
2. Puerto bloqueado
3. Protocolo TCP/IP deshabilitado

**Soluciones:**
1. Iniciar servicio:
   ```powershell
   net start MSSQLSERVER
   ```
2. Verificar puerto:
   ```powershell
   netstat -an | findstr 1433
   ```
3. En SQL Server Configuration Manager:
   - Habilitar TCP/IP
   - Configurar puerto estático
   - Reiniciar servicio

## Errores de Node.js y npm

### 🔴 Error: "npm command not found"
```
'npm' no se reconoce como un comando interno o externo
```

**Soluciones:**
1. Reinstalar Node.js
2. Agregar a PATH:
   ```
   C:\Program Files\nodejs\
   %AppData%\npm
   ```
3. Ejecutar como administrador:
   ```powershell
   Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```

### 🔴 Error: "node_modules not found"
```
Cannot find module 'express'
```

**Soluciones:**
1. Reinstalar módulos:
   ```bash
   rm -rf node_modules package-lock.json
   npm cache clean --force
   npm install
   ```
2. Verificar `package.json`
3. Usar versión correcta de Node.js

## Errores de Configuración

### 🔴 Error: "No .env file found"
```
Error: Cannot find module '../config/.env'
```

**Soluciones:**
1. Copiar template:
   ```bash
   cp env.txt .env
   ```
2. Verificar variables requeridas:
   ```env
   PORT=5000
   DB_SERVER=
   DB_DATABASE=
   DB_USER=
   DB_PASSWORD=
   ```

### 🔴 Error: "Invalid configuration"
```
TypeError: Cannot read property 'server' of undefined
```

**Soluciones:**
1. Verificar sintaxis en `.env`
2. Comprobar nombres de variables
3. Reiniciar aplicación

## Errores de Red

### 🔴 Error: "EADDRINUSE"
```
Error: listen EADDRINUSE: address already in use :::5000
```

**Soluciones:**
1. Cambiar puerto en `.env`
2. Liberar puerto:
   ```powershell
   netstat -ano | findstr :5000
   taskkill /PID <PID> /F
   ```

### 🔴 Error: "CORS"
```
Access to fetch at 'http://localhost:5000' from origin 'http://localhost:3000' has been blocked by CORS policy
```

**Soluciones:**
1. Configurar CORS en `.env`:
   ```env
   CORS_ORIGIN=http://localhost:3000
   ```
2. Verificar origen en solicitudes
3. Usar middleware correcto

## Errores de la API

### 🔴 Error: "Validation Error"
```
Error: Invalid request body
```

**Soluciones:**
1. Verificar formato JSON
2. Comprobar campos requeridos
3. Validar tipos de datos

### 🔴 Error: "Database Error"
```
Error: Violation of PRIMARY KEY constraint
```

**Soluciones:**
1. Verificar IDs únicos
2. Comprobar relaciones
3. Validar restricciones

## 🛠️ Herramientas de Diagnóstico

1. **Test de Conexión**
   ```bash
   node test-connection.js
   ```

2. **Logs del Servidor**
   - Revisar consola de Node.js
   - Verificar SQL Server Logs
   - Usar SQL Profiler

3. **Verificación de Red**
   ```powershell
   Test-NetConnection -ComputerName localhost -Port 5000
   Test-NetConnection -ComputerName localhost -Port 1433
   ```

## 📞 Soporte Adicional

Si los problemas persisten:

1. Verificar versiones:
   ```bash
   node --version
   npm --version
   sqlcmd -?
   ```

2. Actualizar dependencias:
   ```bash
   npm update
   ```

3. Limpiar caché:
   ```bash
   npm cache clean --force
   ```

4. Reiniciar servicios:
   ```powershell
   net stop MSSQLSERVER && net start MSSQLSERVER
   ```

## 🔄 Proceso de Recuperación

1. Hacer backup de `.env`
2. Eliminar instalación actual
3. Clonar repositorio nuevo
4. Seguir guía de instalación
5. Restaurar configuración

## 📝 Notas Finales

- Mantener respaldos regulares
- Documentar cambios de configuración
- Monitorear logs periódicamente
- Actualizar dependencias con frecuencia 