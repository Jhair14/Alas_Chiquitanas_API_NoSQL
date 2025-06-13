const { getConnection, sql } = require('../config/database');

class Recurso {
    constructor(recurso_id, nombre, cantidad) {
        this.recurso_id = recurso_id;
        this.nombre = nombre;
        this.cantidad = cantidad;
    }

    // Obtener todos los recursos
    static async getAll() {
        try {
            console.log('📊 Ejecutando query: SELECT * FROM Recursos');
            const pool = await getConnection();
            const result = await pool.request().query('SELECT * FROM Recursos ORDER BY recurso_id');
            console.log(`✅ Query exitoso: ${result.recordset.length} recursos encontrados`);
            return result.recordset;
        } catch (error) {
            console.error('❌ ERROR EN MODELO Recurso.getAll():');
            console.error('Query:', 'SELECT * FROM Recursos ORDER BY recurso_id');
            console.error('Detalles del error:', error);
            throw new Error(`Error obteniendo recursos: ${error.message}`);
        }
    }

    // Obtener recurso por ID
    static async getById(id) {
        try {
            console.log(`📊 Ejecutando query: SELECT * FROM Recursos WHERE recurso_id = ${id}`);
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM Recursos WHERE recurso_id = @id');
            
            console.log(`✅ Query exitoso: ${result.recordset.length > 0 ? 'Recurso encontrado' : 'Recurso no encontrado'}`);
            return result.recordset[0] || null;
        } catch (error) {
            console.error('❌ ERROR EN MODELO Recurso.getById():');
            console.error('ID buscado:', id);
            console.error('Detalles del error:', error);
            throw new Error(`Error obteniendo recurso: ${error.message}`);
        }
    }

    // Crear nuevo recurso
    static async create(recursoData) {
        try {
            const { nombre, cantidad } = recursoData;
            console.log('📊 Ejecutando INSERT en Recursos:', { nombre, cantidad });
            
            const pool = await getConnection();
            
            const result = await pool.request()
                .input('nombre', sql.VarChar(100), nombre)
                .input('cantidad', sql.Int, cantidad || 0)
                .query(`
                    INSERT INTO Recursos (nombre, cantidad)
                    OUTPUT INSERTED.recurso_id
                    VALUES (@nombre, @cantidad)
                `);
            
            const newId = result.recordset[0].recurso_id;
            console.log(`✅ Recurso creado exitosamente con ID: ${newId}`);
            return await this.getById(newId);
        } catch (error) {
            console.error('❌ ERROR EN MODELO Recurso.create():');
            console.error('Datos intentados:', recursoData);
            console.error('Detalles del error:', error);
            if (error.number) {
                console.error('Número de error SQL:', error.number);
                console.error('Estado SQL:', error.state);
            }
            throw new Error(`Error creando recurso: ${error.message}`);
        }
    }

    // Actualizar recurso
    static async update(id, recursoData) {
        try {
            const { nombre, cantidad } = recursoData;
            console.log(`📊 Ejecutando UPDATE en Recursos para ID ${id}:`, { nombre, cantidad });
            
            const pool = await getConnection();
            
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('nombre', sql.VarChar(100), nombre)
                .input('cantidad', sql.Int, cantidad)
                .query(`
                    UPDATE Recursos 
                    SET nombre = @nombre, cantidad = @cantidad
                    WHERE recurso_id = @id
                `);
            
            if (result.rowsAffected[0] === 0) {
                console.log(`⚠️ No se encontró recurso con ID: ${id}`);
                return null;
            }
            
            console.log(`✅ Recurso actualizado exitosamente`);
            return await this.getById(id);
        } catch (error) {
            console.error('❌ ERROR EN MODELO Recurso.update():');
            console.error('ID:', id);
            console.error('Datos intentados:', recursoData);
            console.error('Detalles del error:', error);
            throw new Error(`Error actualizando recurso: ${error.message}`);
        }
    }

    // Eliminar recurso
    static async delete(id) {
        try {
            console.log(`📊 Ejecutando DELETE en Recursos para ID: ${id}`);
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM Recursos WHERE recurso_id = @id');
            
            const deleted = result.rowsAffected[0] > 0;
            console.log(deleted ? `✅ Recurso eliminado exitosamente` : `⚠️ No se encontró recurso con ID: ${id}`);
            return deleted;
        } catch (error) {
            console.error('❌ ERROR EN MODELO Recurso.delete():');
            console.error('ID:', id);
            console.error('Detalles del error:', error);
            throw new Error(`Error eliminando recurso: ${error.message}`);
        }
    }

    // Buscar recursos por nombre
    static async getByNombre(nombre) {
        try {
            console.log(`📊 Ejecutando búsqueda de recursos con nombre similar a: "${nombre}"`);
            const pool = await getConnection();
            const result = await pool.request()
                .input('nombre', sql.VarChar(100), `%${nombre}%`)
                .query('SELECT * FROM Recursos WHERE nombre LIKE @nombre ORDER BY nombre');
            
            console.log(`✅ Query exitoso: ${result.recordset.length} recursos encontrados`);
            return result.recordset;
        } catch (error) {
            console.error('❌ ERROR EN MODELO Recurso.getByNombre():');
            console.error('Nombre buscado:', nombre);
            console.error('Detalles del error:', error);
            throw new Error(`Error obteniendo recursos por nombre: ${error.message}`);
        }
    }
}

module.exports = Recurso; 