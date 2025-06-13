// Ejemplo de configuración - Copiar como config.js y ajustar valores

module.exports = {
    PORT: 3000,
    
    // Configuración de SQL Server
    DB_CONFIG: {
        server: 'DESKTOP-329U4KG\JHAIR',
        database: 'alas_chiquitanas',
        user: 'jhair',
        password: '12345678',
        port: 51832,
        options: {
            encrypt: true,
            trustServerCertificate: true,
            enableArithAbort: true
        }
    },
    
    // CORS
    CORS_ORIGIN: '*',
    
    // Ambiente
    NODE_ENV: 'development'
}; 