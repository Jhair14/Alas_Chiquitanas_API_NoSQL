// Script de prueba de conexión a SQL Server
console.log('🔧 === SCRIPT DE PRUEBA DE CONEXIÓN ===');
console.log('');

// Verificar si existe el archivo .env
const fs = require('fs');
const path = require('path');

const envPath = path.join(__dirname, '.env');
const envExists = fs.existsSync(envPath);

if (!envExists) {
    console.log('⚠️ No se encontró archivo .env');
    console.log('💡 Copia el contenido de env.txt a un nuevo archivo llamado .env');
    console.log('');
} else {
    console.log('✅ Archivo .env encontrado');
}

// Cargar variables de entorno
require('dotenv').config();

console.log('📋 Variables de entorno cargadas:');
console.log('   DB_SERVER:', process.env.DB_SERVER || '❌ NO DEFINIDO');
console.log('   DB_DATABASE:', process.env.DB_DATABASE || '❌ NO DEFINIDO');
console.log('   DB_USER:', process.env.DB_USER || '❌ NO DEFINIDO');
console.log('   DB_PASSWORD:', process.env.DB_PASSWORD ? '✅ Definido' : '❌ NO DEFINIDO');
console.log('   DB_PORT:', process.env.DB_PORT || '❌ NO DEFINIDO');
console.log('');

// Intentar conectar a la base de datos
async function testConnection() {
    try {
        console.log('🔄 Intentando conectar a SQL Server...');
        const { getConnection } = require('./config/database');
        const pool = await getConnection();
        
        console.log('✅ Conexión exitosa!');
        console.log('');
        
        // Probar una consulta simple
        console.log('🔍 Probando consultas...');
        
        try {
            const result = await pool.request().query('SELECT @@VERSION as version');
            console.log('✅ SQL Server Version:', result.recordset[0].version.split('\n')[0]);
        } catch (error) {
            console.error('❌ Error al obtener versión:', error.message);
        }
        
        // Verificar si las tablas existen
        console.log('');
        console.log('🔍 Verificando tablas...');
        
        const tablesQuery = `
            SELECT TABLE_NAME 
            FROM INFORMATION_SCHEMA.TABLES 
            WHERE TABLE_TYPE = 'BASE TABLE' 
            AND TABLE_NAME IN ('Recursos', 'ReporteRapido')
        `;
        
        try {
            const tablesResult = await pool.request().query(tablesQuery);
            const tables = tablesResult.recordset.map(r => r.TABLE_NAME);
            
            console.log('📊 Tablas encontradas:', tables.length > 0 ? tables.join(', ') : 'NINGUNA');
            
            if (!tables.includes('Recursos')) {
                console.log('❌ Tabla "Recursos" NO EXISTE');
            } else {
                console.log('✅ Tabla "Recursos" existe');
            }
            
            if (!tables.includes('ReporteRapido')) {
                console.log('❌ Tabla "ReporteRapido" NO EXISTE');
            } else {
                console.log('✅ Tabla "ReporteRapido" existe');
            }
            
            if (tables.length < 2) {
                console.log('');
                console.log('💡 Ejecuta el script database/setup.sql en SQL Server para crear las tablas');
            }
            
        } catch (error) {
            console.error('❌ Error al verificar tablas:', error.message);
        }
        
        // Contar registros si las tablas existen
        console.log('');
        console.log('📊 Contando registros...');
        
        try {
            const recursosCount = await pool.request().query('SELECT COUNT(*) as count FROM Recursos');
            console.log(`   Recursos: ${recursosCount.recordset[0].count} registros`);
        } catch (error) {
            console.log('   Recursos: ❌ Error -', error.message);
        }
        
        try {
            const reportesCount = await pool.request().query('SELECT COUNT(*) as count FROM ReporteRapido');
            console.log(`   ReporteRapido: ${reportesCount.recordset[0].count} registros`);
        } catch (error) {
            console.log('   ReporteRapido: ❌ Error -', error.message);
        }
        
        console.log('');
        console.log('✅ === PRUEBA COMPLETADA ===');
        console.log('');
        console.log('🚀 Si todo está correcto, ejecuta: npm start');
        
        process.exit(0);
        
    } catch (error) {
        console.error('');
        console.error('❌ === ERROR DE CONEXIÓN ===');
        console.error('Tipo:', error.name);
        console.error('Código:', error.code);
        console.error('Mensaje:', error.message);
        
        if (error.originalError) {
            console.error('Error Original:', error.originalError.message);
        }
        
        console.error('');
        console.error('🔧 POSIBLES SOLUCIONES:');
        
        if (error.code === 'ELOGIN') {
            console.error('1. Verifica el usuario y contraseña en el archivo .env');
            console.error('2. Asegúrate de que el usuario tenga permisos en SQL Server');
        } else if (error.code === 'ESOCKET' || error.code === 'ECONNREFUSED') {
            console.error('1. Verifica que SQL Server esté ejecutándose');
            console.error('2. Confirma el nombre del servidor y puerto en .env');
            console.error('3. Verifica que SQL Server acepte conexiones TCP/IP');
        } else if (error.code === 'ETIMEOUT') {
            console.error('1. Verifica la conectividad de red');
            console.error('2. Confirma que el firewall permite la conexión');
        }
        
        console.error('');
        console.error('📋 Configuración actual:');
        console.error('   Servidor:', process.env.DB_SERVER);
        console.error('   Puerto:', process.env.DB_PORT);
        console.error('   Base de datos:', process.env.DB_DATABASE);
        console.error('   Usuario:', process.env.DB_USER);
        
        process.exit(1);
    }
}

// Ejecutar prueba
testConnection(); 