const sql = require('mssql');
const db = require('../config/database');

class ReporteRecurso {
    constructor(reporte_id, recurso_id) {
        this.reporte_id = reporte_id;
        this.recurso_id = recurso_id;
    }

    static async create(reporte_id, recurso_id) {
        try {
            const pool = await db.getConnection();
            const result = await pool.request()
                .input('reporte_id', sql.Int, reporte_id)
                .input('recurso_id', sql.Int, recurso_id)
                .query(`
                    INSERT INTO ReporteRecurso (reporte_id, recurso_id)
                    VALUES (@reporte_id, @recurso_id)
                `);
            
            console.log(`✅ Relación creada entre reporte ${reporte_id} y recurso ${recurso_id}`);
            return { reporte_id, recurso_id };
        } catch (error) {
            console.error(`❌ Error al crear relación ReporteRecurso: ${error.message}`);
            throw error;
        }
    }

    static async getByReporteId(reporte_id) {
        try {
            const pool = await db.getConnection();
            const result = await pool.request()
                .input('reporte_id', sql.Int, reporte_id)
                .query(`
                    SELECT r.* 
                    FROM Recursos r
                    INNER JOIN ReporteRecurso rr ON r.recurso_id = rr.recurso_id
                    WHERE rr.reporte_id = @reporte_id
                `);
            
            console.log(`📋 Recursos obtenidos para el reporte ${reporte_id}`);
            return result.recordset;
        } catch (error) {
            console.error(`❌ Error al obtener recursos del reporte: ${error.message}`);
            throw error;
        }
    }

    static async getByRecursoId(recurso_id) {
        try {
            const pool = await db.getConnection();
            const result = await pool.request()
                .input('recurso_id', sql.Int, recurso_id)
                .query(`
                    SELECT rr.* 
                    FROM ReporteRapido rr
                    INNER JOIN ReporteRecurso rrec ON rr.reporte_id = rrec.reporte_id
                    WHERE rrec.recurso_id = @recurso_id
                `);
            
            console.log(`📋 Reportes obtenidos para el recurso ${recurso_id}`);
            return result.recordset;
        } catch (error) {
            console.error(`❌ Error al obtener reportes del recurso: ${error.message}`);
            throw error;
        }
    }

    static async delete(reporte_id, recurso_id) {
        try {
            const pool = await db.getConnection();
            const result = await pool.request()
                .input('reporte_id', sql.Int, reporte_id)
                .input('recurso_id', sql.Int, recurso_id)
                .query(`
                    DELETE FROM ReporteRecurso 
                    WHERE reporte_id = @reporte_id AND recurso_id = @recurso_id
                `);
            
            console.log(`🗑️ Relación eliminada entre reporte ${reporte_id} y recurso ${recurso_id}`);
            return result.rowsAffected[0] > 0;
        } catch (error) {
            console.error(`❌ Error al eliminar relación ReporteRecurso: ${error.message}`);
            throw error;
        }
    }

    static async deleteAllByReporteId(reporte_id) {
        try {
            const pool = await db.getConnection();
            const result = await pool.request()
                .input('reporte_id', sql.Int, reporte_id)
                .query(`
                    DELETE FROM ReporteRecurso 
                    WHERE reporte_id = @reporte_id
                `);
            
            console.log(`🗑️ Todas las relaciones eliminadas para el reporte ${reporte_id}`);
            return result.rowsAffected[0];
        } catch (error) {
            console.error(`❌ Error al eliminar relaciones del reporte: ${error.message}`);
            throw error;
        }
    }
}

module.exports = ReporteRecurso; 