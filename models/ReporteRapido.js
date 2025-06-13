const { getConnection, sql } = require('../config/database');

class ReporteRapido {
    constructor(reporte_id, usuario_id, nombre_incidente, controlado, extension, condiciones_clima, numero_bomberos, necesita_mas_bomberos, apoyo_externo, comentario_adicional, fecha_reporte) {
        this.reporte_id = reporte_id;
        this.usuario_id = usuario_id;
        this.nombre_incidente = nombre_incidente;
        this.controlado = controlado;
        this.extension = extension;
        this.condiciones_clima = condiciones_clima;
        this.numero_bomberos = numero_bomberos;
        this.necesita_mas_bomberos = necesita_mas_bomberos;
        this.apoyo_externo = apoyo_externo;
        this.comentario_adicional = comentario_adicional;
        this.fecha_reporte = fecha_reporte;
    }

    // Obtener todos los reportes
    static async getAll() {
        try {
            const pool = await getConnection();
            const result = await pool.request().query('SELECT * FROM ReporteRapido ORDER BY fecha_reporte DESC');
            return result.recordset;
        } catch (error) {
            throw new Error(`Error obteniendo reportes: ${error.message}`);
        }
    }

    // Obtener reporte por ID
    static async getById(id) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('SELECT * FROM ReporteRapido WHERE reporte_id = @id');
            
            return result.recordset[0] || null;
        } catch (error) {
            throw new Error(`Error obteniendo reporte: ${error.message}`);
        }
    }

    // Crear nuevo reporte
    static async create(reporteData) {
        try {
            const { 
                usuario_id, 
                nombre_incidente, 
                controlado, 
                extension, 
                condiciones_clima, 
                numero_bomberos, 
                necesita_mas_bomberos, 
                apoyo_externo, 
                comentario_adicional 
            } = reporteData;
            
            const pool = await getConnection();
            
            const result = await pool.request()
                .input('usuario_id', sql.VarChar(100), usuario_id)
                .input('nombre_incidente', sql.VarChar(100), nombre_incidente)
                .input('controlado', sql.Bit, controlado)
                .input('extension', sql.VarChar(50), extension)
                .input('condiciones_clima', sql.VarChar(100), condiciones_clima)
                .input('numero_bomberos', sql.Int, numero_bomberos)
                .input('necesita_mas_bomberos', sql.Bit, necesita_mas_bomberos || false)
                .input('apoyo_externo', sql.VarChar(100), apoyo_externo)
                .input('comentario_adicional', sql.VarChar(500), comentario_adicional)
                .query(`
                    INSERT INTO ReporteRapido (
                        usuario_id, nombre_incidente, controlado, extension, 
                        condiciones_clima, numero_bomberos, necesita_mas_bomberos, 
                        apoyo_externo, comentario_adicional
                    )
                    OUTPUT INSERTED.reporte_id
                    VALUES (
                        @usuario_id, @nombre_incidente, @controlado, @extension,
                        @condiciones_clima, @numero_bomberos, @necesita_mas_bomberos,
                        @apoyo_externo, @comentario_adicional
                    )
                `);
            
            const newId = result.recordset[0].reporte_id;
            return await this.getById(newId);
        } catch (error) {
            throw new Error(`Error creando reporte: ${error.message}`);
        }
    }

    // Actualizar reporte
    static async update(id, reporteData) {
        try {
            const { 
                usuario_id, 
                nombre_incidente, 
                controlado, 
                extension, 
                condiciones_clima, 
                numero_bomberos, 
                necesita_mas_bomberos, 
                apoyo_externo, 
                comentario_adicional 
            } = reporteData;
            
            const pool = await getConnection();
            
            const result = await pool.request()
                .input('id', sql.Int, id)
                .input('usuario_id', sql.VarChar(100), usuario_id)
                .input('nombre_incidente', sql.VarChar(100), nombre_incidente)
                .input('controlado', sql.Bit, controlado)
                .input('extension', sql.VarChar(50), extension)
                .input('condiciones_clima', sql.VarChar(100), condiciones_clima)
                .input('numero_bomberos', sql.Int, numero_bomberos)
                .input('necesita_mas_bomberos', sql.Bit, necesita_mas_bomberos)
                .input('apoyo_externo', sql.VarChar(100), apoyo_externo)
                .input('comentario_adicional', sql.VarChar(500), comentario_adicional)
                .query(`
                    UPDATE ReporteRapido 
                    SET usuario_id = @usuario_id, nombre_incidente = @nombre_incidente, 
                        controlado = @controlado, extension = @extension,
                        condiciones_clima = @condiciones_clima, numero_bomberos = @numero_bomberos,
                        necesita_mas_bomberos = @necesita_mas_bomberos, apoyo_externo = @apoyo_externo,
                        comentario_adicional = @comentario_adicional
                    WHERE reporte_id = @id
                `);
            
            if (result.rowsAffected[0] === 0) {
                return null;
            }
            
            return await this.getById(id);
        } catch (error) {
            throw new Error(`Error actualizando reporte: ${error.message}`);
        }
    }

    // Eliminar reporte
    static async delete(id) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('id', sql.Int, id)
                .query('DELETE FROM ReporteRapido WHERE reporte_id = @id');
            
            return result.rowsAffected[0] > 0;
        } catch (error) {
            throw new Error(`Error eliminando reporte: ${error.message}`);
        }
    }

    // Obtener reportes por usuario
    static async getByUsuario(usuario_id) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('usuario_id', sql.VarChar(100), usuario_id)
                .query('SELECT * FROM ReporteRapido WHERE usuario_id = @usuario_id ORDER BY fecha_reporte DESC');
            
            return result.recordset;
        } catch (error) {
            throw new Error(`Error obteniendo reportes por usuario: ${error.message}`);
        }
    }

    // Obtener reportes por estado de control
    static async getByControlado(controlado) {
        try {
            const pool = await getConnection();
            const result = await pool.request()
                .input('controlado', sql.Bit, controlado)
                .query('SELECT * FROM ReporteRapido WHERE controlado = @controlado ORDER BY fecha_reporte DESC');
            
            return result.recordset;
        } catch (error) {
            throw new Error(`Error obteniendo reportes por estado: ${error.message}`);
        }
    }
}

module.exports = ReporteRapido; 