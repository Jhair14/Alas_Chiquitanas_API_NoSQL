const sql = require('mssql');
require('dotenv').config();

const config = {
    server: 'alas_chiquitanas.mssql.somee.com',
    database: 'alas_chiquitanas',
    user: 'jhair15_SQLLogin_1',
    password: 'dc1frfgvwb',
    port: 51832,
    options: {
        encrypt: process.env.DB_ENCRYPT === 'true',
        trustServerCertificate: process.env.DB_TRUST_SERVER_CERTIFICATE === 'true',
        enableArithAbort: true
    },
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    }
};

let pool = null;

const getConnection = async () => {
    try {
        if (!pool) {
            console.log('=== INTENTANDO CONECTAR A SQL SERVER ===');
            console.log('Configuración de conexión:');
            console.log({
                server: config.server,
                database: config.database,
                user: config.user,
                port: config.port,
                encrypt: config.options.encrypt,
                trustServerCertificate: config.options.trustServerCertificate
            });
            
            pool = await sql.connect(config);
            console.log('✅ Conectado a SQL Server exitosamente');
        }
        return pool;
    } catch (error) {
        console.error('❌ ERROR COMPLETO AL CONECTAR A LA BASE DE DATOS:');
        console.error('Tipo de error:', error.name);
        console.error('Código de error:', error.code);
        console.error('Mensaje:', error.message);
        console.error('Stack trace completo:', error.stack);
        
        if (error.originalError) {
            console.error('Error original:', error.originalError);
        }
        
        // Información adicional de depuración
        console.error('=== INFORMACIÓN DE DEPURACIÓN ===');
        console.error('Variables de entorno DB:');
        console.error('DB_SERVER:', process.env.DB_SERVER);
        console.error('DB_DATABASE:', process.env.DB_DATABASE);
        console.error('DB_USER:', process.env.DB_USER);
        console.error('DB_PORT:', process.env.DB_PORT);
        console.error('================================');
        
        throw error;
    }
};

const closeConnection = async () => {
    try {
        if (pool) {
            await pool.close();
            pool = null;
            console.log('Conexión a SQL Server cerrada');
        }
    } catch (error) {
        console.error('❌ ERROR AL CERRAR LA CONEXIÓN:');
        console.error('Detalles completos:', error);
    }
};

// Manejador global de errores de SQL
sql.on('error', err => {
    console.error('❌ ERROR GLOBAL DE SQL SERVER:');
    console.error('Detalles completos:', err);
});

module.exports = {
    getConnection,
    closeConnection,
    sql
}; 
