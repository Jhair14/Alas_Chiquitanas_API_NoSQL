const express = require('express');
const router = express.Router();
const {
    getAllRecursos,
    getRecursoById,
    createRecurso,
    updateRecurso,
    deleteRecurso,
    getRecursosByNombre
} = require('../controllers/recursoController');

// Rutas para recursos
router.get('/', getAllRecursos);                        // GET /api/recursos
router.get('/buscar/:nombre', getRecursosByNombre);     // GET /api/recursos/buscar/:nombre
router.get('/:id', getRecursoById);                     // GET /api/recursos/:id
router.post('/', createRecurso);                        // POST /api/recursos
router.put('/:id', updateRecurso);                      // PUT /api/recursos/:id
router.delete('/:id', deleteRecurso);                   // DELETE /api/recursos/:id

module.exports = router; 