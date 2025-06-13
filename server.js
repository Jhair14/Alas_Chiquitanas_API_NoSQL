// Captura temprana de errores de módulos
const logModuleError = (moduleName, error) => {
    console.error(`❌ ERROR AL CARGAR MÓDULO '${moduleName}':`);
    console.error('Mensaje:', error.message);
    console.error('Código:', error.code);
    if (error.code === 'MODULE_NOT_FOUND') {
        console.error('💡 Solución: Ejecuta "npm install" para instalar las dependencias');
    }
    console.error('Stack:', error.stack);
    process.exit(1);
};

// Carga de módulos con manejo de errores
let express, cors, helmet, bodyParser;

try {
    express = require('express');
} catch (error) {
    logModuleError('express', error);
}

try {
    cors = require('cors');
} catch (error) {
    logModuleError('cors', error);
}

try {
    helmet = require('helmet');
} catch (error) {
    logModuleError('helmet', error);
}

try {
    bodyParser = require('body-parser');
} catch (error) {
    logModuleError('body-parser', error);
}

try {
    require('dotenv').config();
    console.log('✅ Variables de entorno cargadas');
    console.log('Puerto configurado:', process.env.PORT || 5000);
} catch (error) {
    console.warn('⚠️ No se pudo cargar el archivo .env:', error.message);
    console.log('Usando configuración por defecto');
}

// Importar rutas con manejo de errores
let recursosRoutes, reportesRoutes, reporteRecursoRoutes;

try {
    recursosRoutes = require('./routes/recursos');
} catch (error) {
    console.error('❌ Error cargando rutas de recursos:', error);
    logModuleError('./routes/recursos', error);
}

try {
    reportesRoutes = require('./routes/reportes');
} catch (error) {
    console.error('❌ Error cargando rutas de reportes:', error);
    logModuleError('./routes/reportes', error);
}

try {
    reporteRecursoRoutes = require('./routes/reporteRecurso');
} catch (error) {
    console.error('❌ Error cargando rutas de reporte-recurso:', error);
    logModuleError('./routes/reporteRecurso', error);
}

// Importar middleware con manejo de errores
let errorHandler, notFound;

try {
    const middleware = require('./middleware/errorHandler');
    errorHandler = middleware.errorHandler;
    notFound = middleware.notFound;
} catch (error) {
    console.error('❌ Error cargando middleware de errores:', error);
    logModuleError('./middleware/errorHandler', error);
}

// Importar configuración de base de datos
let getConnection, closeConnection;

try {
    const database = require('./config/database');
    getConnection = database.getConnection;
    closeConnection = database.closeConnection;
} catch (error) {
    console.error('❌ Error cargando configuración de base de datos:', error);
    logModuleError('./config/database', error);
}

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware de seguridad
app.use(helmet());

// Middleware de CORS
app.use(cors({
    origin: process.env.CORS_ORIGIN || '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Middleware para parsing de JSON
app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true, limit: '10mb' }));

// Middleware de logging mejorado
app.use((req, res, next) => {
    console.log(`📥 ${new Date().toISOString()} - ${req.method} ${req.path}`);
    if (Object.keys(req.body).length > 0) {
        console.log('Body:', JSON.stringify(req.body, null, 2));
    }
    if (Object.keys(req.query).length > 0) {
        console.log('Query:', req.query);
    }
    next();
});

// Ruta de salud de la API
app.get('/health', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'API Alas Chiquitanas funcionando correctamente',
        timestamp: new Date().toISOString(),
        version: '1.0.0',
        environment: process.env.NODE_ENV || 'development',
        port: PORT
    });
});

// Ruta raíz
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: 'Bienvenido a la API REST de Alas Chiquitanas',
        endpoints: {
            recursos: '/api/recursos',
            reportes: '/api/reportes',
            reporteRecurso: '/api/reporte-recurso',
            health: '/health'
        },
        documentation: {
            recursos: {
                'GET /api/recursos': 'Obtener todos los recursos',
                'GET /api/recursos/:id': 'Obtener recurso por ID',
                'POST /api/recursos': 'Crear nuevo recurso',
                'PUT /api/recursos/:id': 'Actualizar recurso',
                'DELETE /api/recursos/:id': 'Eliminar recurso',
                'GET /api/recursos/buscar/:nombre': 'Buscar recursos por nombre'
            },
            reportes: {
                'GET /api/reportes': 'Obtener todos los reportes',
                'GET /api/reportes/:id': 'Obtener reporte por ID',
                'POST /api/reportes': 'Crear nuevo reporte',
                'PUT /api/reportes/:id': 'Actualizar reporte',
                'DELETE /api/reportes/:id': 'Eliminar reporte',
                'GET /api/reportes/usuario/:usuario_id': 'Obtener reportes por usuario',
                'GET /api/reportes/controlado/:controlado': 'Obtener reportes por estado'
            },
            reporteRecurso: {
                'POST /api/reporte-recurso': 'Asignar un recurso a un reporte',
                'GET /api/reporte-recurso/reporte/:reporte_id': 'Obtener recursos de un reporte',
                'GET /api/reporte-recurso/recurso/:recurso_id': 'Obtener reportes que usan un recurso',
                'DELETE /api/reporte-recurso/:reporte_id/:recurso_id': 'Eliminar una relación específica',
                'DELETE /api/reporte-recurso/reporte/:reporte_id': 'Eliminar todas las relaciones de un reporte'
            }
        }
    });
});

// Configurar rutas de la API con manejo de errores
try {
    app.use('/api/recursos', recursosRoutes);
    console.log('✅ Rutas de recursos configuradas');
} catch (error) {
    console.error('❌ Error configurando rutas de recursos:', error);
}

try {
    app.use('/api/reportes', reportesRoutes);
    console.log('✅ Rutas de reportes configuradas');
} catch (error) {
    console.error('❌ Error configurando rutas de reportes:', error);
}

try {
    app.use('/api/reporte-recurso', reporteRecursoRoutes);
    console.log('✅ Rutas de reporte-recurso configuradas');
} catch (error) {
    console.error('❌ Error configurando rutas de reporte-recurso:', error);
}

// Middleware para rutas no encontradas
app.use(notFound);

// Middleware de manejo de errores
app.use(errorHandler);

// Función para inicializar la conexión a la base de datos
const initializeDatabase = async () => {
    try {
        console.log('🔄 Iniciando conexión a la base de datos...');
        await getConnection();
        console.log('✅ Conexión a SQL Server establecida exitosamente');
    } catch (error) {
        console.error('❌ ERROR CRÍTICO AL CONECTAR A LA BASE DE DATOS:');
        console.error('Tipo:', error.name);
        console.error('Código:', error.code);
        console.error('Mensaje:', error.message);
        console.error('Stack:', error.stack);
        console.error('');
        console.error('🔧 POSIBLES SOLUCIONES:');
        console.error('1. Verifica que SQL Server esté ejecutándose');
        console.error('2. Confirma las credenciales en el archivo .env o env.txt');
        console.error('3. Verifica el nombre del servidor y puerto');
        console.error('4. Asegúrate de que el usuario tenga permisos para la base de datos');
        console.error('5. Verifica que la base de datos "Alas_Chiquitanas" exista');
        console.error('');
        process.exit(1);
    }
};

// Iniciar servidor
const startServer = async () => {
    try {
        await initializeDatabase();
        
        const server = app.listen(PORT, () => {
            console.log('');
            console.log('🚀 ===== SERVIDOR INICIADO EXITOSAMENTE =====');
            console.log(`📋 API disponible en: http://localhost:${PORT}`);
            console.log(`🔗 Documentación en: http://localhost:${PORT}/`);
            console.log(`💊 Health check en: http://localhost:${PORT}/health`);
            console.log(`🌍 Ambiente: ${process.env.NODE_ENV || 'development'}`);
            console.log('============================================');
            console.log('');
        });

        server.on('error', (error) => {
            console.error('❌ ERROR AL INICIAR EL SERVIDOR:');
            console.error('Tipo:', error.code);
            console.error('Mensaje:', error.message);
            if (error.code === 'EADDRINUSE') {
                console.error(`💡 El puerto ${PORT} ya está en uso. Intenta con otro puerto.`);
            }
            process.exit(1);
        });

    } catch (error) {
        console.error('❌ ERROR DURANTE EL INICIO DEL SERVIDOR:', error);
        process.exit(1);
    }
};

// Manejo de cierre graceful
process.on('SIGINT', async () => {
    console.log('');
    console.log('🛑 Señal SIGINT recibida. Cerrando servidor...');
    try {
        await closeConnection();
        console.log('✅ Conexión a base de datos cerrada');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al cerrar:', error);
        process.exit(1);
    }
});

process.on('SIGTERM', async () => {
    console.log('');
    console.log('🛑 Señal SIGTERM recibida. Cerrando servidor...');
    try {
        await closeConnection();
        console.log('✅ Conexión a base de datos cerrada');
        process.exit(0);
    } catch (error) {
        console.error('❌ Error al cerrar:', error);
        process.exit(1);
    }
});

// Captura de errores no manejados a nivel de aplicación
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ UNHANDLED REJECTION en server.js:', promise);
    console.error('Razón:', reason);
});

// Iniciar la aplicación
console.log('🚀 Iniciando API REST Alas Chiquitanas...');
console.log('📁 Directorio de trabajo:', process.cwd());
console.log('🔧 Node.js versión:', process.version);
console.log('');

startServer().catch(error => {
    console.error('❌ ERROR FATAL AL INICIAR LA APLICACIÓN:');
    console.error(error);
    process.exit(1);
});

module.exports = app; 