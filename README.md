# API REST Alas Chiquitanas 🚁

API REST para la gestión de recursos y reportes rápidos de emergencias, con soporte para SQL Server.

## 📋 Requisitos Previos

1. **Node.js y npm**
   - Instalar Node.js versión 14.x o superior desde [nodejs.org](https://nodejs.org/)
   - Verificar la instalación:
     ```bash
     node --version
     npm --version
     ```

2. **SQL Server**
   - Instalar SQL Server Express o Developer Edition
   - Instalar SQL Server Management Studio (SSMS)
   - Habilitar autenticación mixta (Windows y SQL Server)
   - Configurar el puerto TCP/IP (por defecto 1433)
   - Habilitar el protocolo TCP/IP en SQL Server Configuration Manager

3. **Git** (opcional)
   - Instalar desde [git-scm.com](https://git-scm.com/)

## 🚀 Instalación

1. **Clonar o Descargar el Repositorio**
   ```bash
   git clone <url-del-repositorio>
   # O descargar y descomprimir el ZIP
   ```

2. **Instalar Dependencias**
   ```bash
   cd api_sql
   npm install
   ```

3. **Configurar la Base de Datos**
   - Abrir SQL Server Management Studio
   - Conectar al servidor SQL Server
   - Ejecutar el script `database/setup.sql`
   - Verificar que se crearon las tablas:
     - Recursos
     - ReporteRapido
     - ReporteRecurso

4. **Configurar Variables de Entorno**
   - Copiar `env.txt` a `.env`
   - Editar `.env` con tus credenciales:
     ```env
     PORT=5000
     DB_SERVER=tu_servidor\\instancia
     DB_DATABASE=alas_chiquitanas
     DB_USER=tu_usuario
     DB_PASSWORD=tu_contraseña
     DB_PORT=1433
     DB_ENCRYPT=true
     DB_TRUST_SERVER_CERTIFICATE=true
     ```

## 🏃‍♂️ Ejecución

1. **Modo Desarrollo**
   ```bash
   npm run dev
   ```

2. **Modo Producción**
   ```bash
   npm start
   ```

3. **Scripts de Ayuda**
   - `run.bat`: Inicia el servidor con configuración predeterminada
   - `test.bat`: Prueba la conexión a la base de datos

## 🌐 Endpoints Disponibles

### Recursos
- `GET /api/recursos`: Listar todos los recursos
- `GET /api/recursos/:id`: Obtener un recurso
- `POST /api/recursos`: Crear recurso
- `PUT /api/recursos/:id`: Actualizar recurso
- `DELETE /api/recursos/:id`: Eliminar recurso
- `GET /api/recursos/buscar/:nombre`: Buscar por nombre

### Reportes
- `GET /api/reportes`: Listar todos los reportes
- `GET /api/reportes/:id`: Obtener un reporte
- `POST /api/reportes`: Crear reporte
- `PUT /api/reportes/:id`: Actualizar reporte
- `DELETE /api/reportes/:id`: Eliminar reporte
- `GET /api/reportes/usuario/:usuario_id`: Filtrar por usuario
- `GET /api/reportes/controlado/:controlado`: Filtrar por estado

### Relación Reporte-Recurso
- `POST /api/reporte-recurso`: Asignar recurso a reporte
- `GET /api/reporte-recurso/reporte/:reporte_id`: Ver recursos de un reporte
- `GET /api/reporte-recurso/recurso/:recurso_id`: Ver reportes que usan un recurso
- `DELETE /api/reporte-recurso/:reporte_id/:recurso_id`: Eliminar una relación
- `DELETE /api/reporte-recurso/reporte/:reporte_id`: Eliminar todas las relaciones

## ⚠️ Solución de Problemas Comunes

### 1. Error de Conexión a SQL Server

**Síntoma**: Error "Failed to connect to SQL Server"

**Soluciones**:
- Verificar que SQL Server está ejecutándose
- Comprobar credenciales en `.env`
- Verificar que el puerto está abierto
- Habilitar TCP/IP en SQL Server Configuration Manager
- Verificar el nombre de instancia SQL Server

### 2. Error de Permisos en PowerShell

**Síntoma**: "npm no se reconoce como un comando interno o externo"

**Soluciones**:
- Ejecutar PowerShell como administrador
- Establecer política de ejecución:
  ```powershell
  Set-ExecutionPolicy RemoteSigned -Scope CurrentUser
  ```
- Reinstalar Node.js con la opción "Add to PATH"

### 3. Error EADDRINUSE

**Síntoma**: "Error: listen EADDRINUSE: address already in use :::5000"

**Soluciones**:
- Cambiar el puerto en `.env`
- Cerrar otras aplicaciones usando el puerto
- Matar el proceso:
  ```bash
  netstat -ano | findstr :5000
  taskkill /PID <PID> /F
  ```

### 4. Errores de CORS

**Síntoma**: "Access-Control-Allow-Origin" error en el navegador

**Soluciones**:
- Verificar la configuración CORS en `server.js`
- Agregar el origen en `.env`:
  ```env
  CORS_ORIGIN=http://tu-frontend.com
  ```

### 5. Error de Módulos

**Síntoma**: "Cannot find module..."

**Soluciones**:
- Eliminar `node_modules` y `package-lock.json`
- Ejecutar `npm install` nuevamente
- Verificar que todas las dependencias están en `package.json`

## 📝 Notas Importantes

1. **Seguridad**
   - No compartir el archivo `.env`
   - Usar contraseñas fuertes
   - Mantener SQL Server actualizado
   - Limitar accesos de red

2. **Rendimiento**
   - La API usa connection pooling
   - Implementa manejo de errores robusto
   - Incluye logging detallado
   - Soporta validaciones de datos

3. **Mantenimiento**
   - Revisar logs periódicamente
   - Hacer backups de la base de datos
   - Monitorear el uso de recursos
   - Actualizar dependencias regularmente

## 🆘 Soporte

Para problemas adicionales, consultar:
- `ERRORES_COMUNES.md`
- Ejecutar `test-connection.js`
- Verificar logs del servidor
- Consultar la documentación de SQL Server

## 📦 Versiones Compatibles

- Node.js: ≥ 14.x
- SQL Server: ≥ 2016
- npm: ≥ 6.x
- Windows: 10/11
- SQL Server Management Studio: ≥ 18.x 