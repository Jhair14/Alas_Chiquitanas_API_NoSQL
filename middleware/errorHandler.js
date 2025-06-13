const errorHandler = (err, req, res, next) => {
    console.error('❌ ============= ERROR COMPLETO =============');
    console.error('Timestamp:', new Date().toISOString());
    console.error('Método HTTP:', req.method);
    console.error('URL:', req.originalUrl);
    console.error('Body:', JSON.stringify(req.body, null, 2));
    console.error('Query:', JSON.stringify(req.query, null, 2));
    console.error('Params:', JSON.stringify(req.params, null, 2));
    console.error('Headers:', JSON.stringify(req.headers, null, 2));
    console.error('-------------------------------------------');
    console.error('Tipo de error:', err.name);
    console.error('Mensaje:', err.message);
    console.error('Código:', err.code);
    console.error('Stack trace:', err.stack);
    
    // Si es un error de SQL Server, mostrar detalles adicionales
    if (err.originalError) {
        console.error('------- Error Original de SQL Server -------');
        console.error('Info:', err.originalError.info);
        console.error('Mensaje original:', err.originalError.message);
    }
    
    if (err.precedingErrors && err.precedingErrors.length > 0) {
        console.error('------- Errores Precedentes -------');
        err.precedingErrors.forEach((e, index) => {
            console.error(`Error ${index + 1}:`, e.message);
        });
    }
    
    console.error('❌ =========================================');
    
    // Error de SQL Server - Login
    if (err.code === 'ELOGIN') {
        return res.status(500).json({
            success: false,
            message: 'Error de autenticación con la base de datos',
            details: process.env.NODE_ENV === 'development' ? {
                server: process.env.DB_SERVER,
                database: process.env.DB_DATABASE,
                user: process.env.DB_USER,
                error: err.message
            } : undefined
        });
    }
    
    // Error de SQL Server - Conexión
    if (err.code === 'ESOCKET' || err.code === 'ECONNREFUSED') {
        return res.status(500).json({
            success: false,
            message: 'No se puede conectar al servidor SQL Server',
            details: process.env.NODE_ENV === 'development' ? {
                server: process.env.DB_SERVER,
                port: process.env.DB_PORT,
                error: err.message
            } : undefined
        });
    }
    
    // Error de SQL Server - Timeout
    if (err.code === 'ETIMEOUT') {
        return res.status(500).json({
            success: false,
            message: 'Timeout de conexión con la base de datos',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
    
    // Error de SQL Server - Query
    if (err.code === 'EREQUEST') {
        return res.status(400).json({
            success: false,
            message: 'Error en la consulta SQL',
            details: process.env.NODE_ENV === 'development' ? err.message : undefined
        });
    }
    
    // Error de validación
    if (err.name === 'ValidationError') {
        return res.status(400).json({
            success: false,
            message: err.message
        });
    }
    
    // Error genérico del servidor
    res.status(500).json({
        success: false,
        message: 'Error interno del servidor',
        error: process.env.NODE_ENV === 'development' ? {
            message: err.message,
            stack: err.stack,
            code: err.code
        } : undefined
    });
};

// Middleware para rutas no encontradas
const notFound = (req, res, next) => {
    console.log('⚠️ Ruta no encontrada:', req.originalUrl);
    res.status(404).json({
        success: false,
        message: `Ruta ${req.originalUrl} no encontrada`
    });
};

// Captura de errores no manejados
process.on('unhandledRejection', (reason, promise) => {
    console.error('❌ UNHANDLED REJECTION at:', promise);
    console.error('Reason:', reason);
    console.error('Stack:', reason.stack || 'No stack trace available');
});

process.on('uncaughtException', (error) => {
    console.error('❌ UNCAUGHT EXCEPTION:');
    console.error('Error:', error);
    console.error('Stack:', error.stack);
    // Dar tiempo para que se registre el error antes de cerrar
    setTimeout(() => {
        process.exit(1);
    }, 1000);
});

module.exports = {
    errorHandler,
    notFound
}; 