const express = require('express');
const router = express.Router();
const {
    getAllReportes,
    getReporteById,
    createReporte,
    updateReporte,
    deleteReporte,
    getReportesByUsuario,
    getReportesByControlado
} = require('../controllers/reporteRapidoController');

// Rutas para reportes rápidos
router.get('/', getAllReportes);                        // GET /api/reportes
router.get('/:id', getReporteById);                     // GET /api/reportes/:id
router.post('/', createReporte);                        // POST /api/reportes
router.put('/:id', updateReporte);                      // PUT /api/reportes/:id
router.delete('/:id', deleteReporte);                   // DELETE /api/reportes/:id
router.get('/usuario/:usuario_id', getReportesByUsuario); // GET /api/reportes/usuario/:usuario_id
router.get('/controlado/:controlado', getReportesByControlado); // GET /api/reportes/controlado/:controlado

module.exports = router; 