const Recurso = require('../models/Recurso');

// Obtener todos los recursos
const getAllRecursos = async (req, res) => {
    try {
        const recursos = await Recurso.getAll();
        res.status(200).json({
            success: true,
            data: recursos,
            message: 'Recursos obtenidos exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener recurso por ID
const getRecursoById = async (req, res) => {
    try {
        const { id } = req.params;
        const recurso = await Recurso.getById(parseInt(id));
        
        if (!recurso) {
            return res.status(404).json({
                success: false,
                message: 'Recurso no encontrado'
            });
        }
        
        res.status(200).json({
            success: true,
            data: recurso,
            message: 'Recurso obtenido exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Crear nuevo recurso
const createRecurso = async (req, res) => {
    try {
        const { nombre, cantidad } = req.body;
        
        // Validaciones básicas
        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre es requerido'
            });
        }
        
        if (cantidad === undefined || cantidad === null) {
            return res.status(400).json({
                success: false,
                message: 'La cantidad es requerida'
            });
        }
        
        const newRecurso = await Recurso.create(req.body);
        
        res.status(201).json({
            success: true,
            data: newRecurso,
            message: 'Recurso creado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Actualizar recurso
const updateRecurso = async (req, res) => {
    try {
        const { id } = req.params;
        const { nombre, cantidad } = req.body;
        
        // Validaciones básicas
        if (!nombre) {
            return res.status(400).json({
                success: false,
                message: 'El nombre es requerido'
            });
        }
        
        if (cantidad === undefined || cantidad === null) {
            return res.status(400).json({
                success: false,
                message: 'La cantidad es requerida'
            });
        }
        
        const updatedRecurso = await Recurso.update(parseInt(id), req.body);
        
        if (!updatedRecurso) {
            return res.status(404).json({
                success: false,
                message: 'Recurso no encontrado'
            });
        }
        
        res.status(200).json({
            success: true,
            data: updatedRecurso,
            message: 'Recurso actualizado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Eliminar recurso
const deleteRecurso = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Recurso.delete(parseInt(id));
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Recurso no encontrado'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Recurso eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Buscar recursos por nombre
const getRecursosByNombre = async (req, res) => {
    try {
        const { nombre } = req.params;
        const recursos = await Recurso.getByNombre(nombre);
        
        res.status(200).json({
            success: true,
            data: recursos,
            message: `Recursos con nombre similar a "${nombre}" obtenidos exitosamente`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllRecursos,
    getRecursoById,
    createRecurso,
    updateRecurso,
    deleteRecurso,
    getRecursosByNombre
}; 