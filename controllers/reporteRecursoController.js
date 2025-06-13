const ReporteRecurso = require('../models/ReporteRecurso');

const reporteRecursoController = {
    // Asignar un recurso a un reporte
    async asignarRecurso(req, res, next) {
        try {
            const { reporte_id, recurso_id } = req.body;
            
            if (!reporte_id || !recurso_id) {
                return res.status(400).json({
                    success: false,
                    message: '❌ Se requieren reporte_id y recurso_id'
                });
            }

            const relacion = await ReporteRecurso.create(reporte_id, recurso_id);
            res.json({
                success: true,
                message: '✅ Recurso asignado al reporte exitosamente',
                data: relacion
            });
        } catch (error) {
            next(error);
        }
    },

    // Obtener todos los recursos de un reporte
    async obtenerRecursosDeReporte(req, res, next) {
        try {
            const { reporte_id } = req.params;
            const recursos = await ReporteRecurso.getByReporteId(reporte_id);
            res.json({
                success: true,
                message: '📋 Recursos obtenidos exitosamente',
                data: recursos
            });
        } catch (error) {
            next(error);
        }
    },

    // Obtener todos los reportes que usan un recurso
    async obtenerReportesDeRecurso(req, res, next) {
        try {
            const { recurso_id } = req.params;
            const reportes = await ReporteRecurso.getByRecursoId(recurso_id);
            res.json({
                success: true,
                message: '📋 Reportes obtenidos exitosamente',
                data: reportes
            });
        } catch (error) {
            next(error);
        }
    },

    // Eliminar una relación específica
    async eliminarRelacion(req, res, next) {
        try {
            const { reporte_id, recurso_id } = req.params;
            const eliminado = await ReporteRecurso.delete(reporte_id, recurso_id);
            
            if (eliminado) {
                res.json({
                    success: true,
                    message: '🗑️ Relación eliminada exitosamente'
                });
            } else {
                res.status(404).json({
                    success: false,
                    message: '❌ No se encontró la relación especificada'
                });
            }
        } catch (error) {
            next(error);
        }
    },

    // Eliminar todas las relaciones de un reporte
    async eliminarRelacionesDeReporte(req, res, next) {
        try {
            const { reporte_id } = req.params;
            const cantidad = await ReporteRecurso.deleteAllByReporteId(reporte_id);
            res.json({
                success: true,
                message: `🗑️ Se eliminaron ${cantidad} relaciones del reporte`,
                data: { relaciones_eliminadas: cantidad }
            });
        } catch (error) {
            next(error);
        }
    }
};

module.exports = reporteRecursoController; 