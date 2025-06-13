const express = require('express');
const router = express.Router();
const reporteRecursoController = require('../controllers/reporteRecursoController');

// Asignar un recurso a un reporte
router.post('/', reporteRecursoController.asignarRecurso);

// Obtener todos los recursos de un reporte
router.get('/reporte/:reporte_id', reporteRecursoController.obtenerRecursosDeReporte);

// Obtener todos los reportes que usan un recurso
router.get('/recurso/:recurso_id', reporteRecursoController.obtenerReportesDeRecurso);

// Eliminar una relación específica
router.delete('/:reporte_id/:recurso_id', reporteRecursoController.eliminarRelacion);

// Eliminar todas las relaciones de un reporte
router.delete('/reporte/:reporte_id', reporteRecursoController.eliminarRelacionesDeReporte);

module.exports = router; 