const ReporteRapido = require('../models/ReporteRapido');

// Obtener todos los reportes
const getAllReportes = async (req, res) => {
    try {
        const reportes = await ReporteRapido.getAll();
        res.status(200).json({
            success: true,
            data: reportes,
            message: 'Reportes obtenidos exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener reporte por ID
const getReporteById = async (req, res) => {
    try {
        const { id } = req.params;
        const reporte = await ReporteRapido.getById(parseInt(id));
        
        if (!reporte) {
            return res.status(404).json({
                success: false,
                message: 'Reporte no encontrado'
            });
        }
        
        res.status(200).json({
            success: true,
            data: reporte,
            message: 'Reporte obtenido exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Crear nuevo reporte
const createReporte = async (req, res) => {
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
        } = req.body;
        
        // Validaciones básicas
        if (!usuario_id || !extension || !condiciones_clima || !apoyo_externo) {
            return res.status(400).json({
                success: false,
                message: 'Los campos usuario_id, extensión, condiciones_clima y apoyo_externo son requeridos'
            });
        }
        
        if (controlado === undefined || controlado === null) {
            return res.status(400).json({
                success: false,
                message: 'El campo controlado es requerido'
            });
        }
        
        const newReporte = await ReporteRapido.create(req.body);
        
        res.status(201).json({
            success: true,
            data: newReporte,
            message: 'Reporte creado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Actualizar reporte
const updateReporte = async (req, res) => {
    try {
        const { id } = req.params;
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
        } = req.body;
        
        // Validaciones básicas
        if (!usuario_id || !extension || !condiciones_clima || !apoyo_externo) {
            return res.status(400).json({
                success: false,
                message: 'Los campos usuario_id, extensión, condiciones_clima y apoyo_externo son requeridos'
            });
        }
        
        if (controlado === undefined || controlado === null) {
            return res.status(400).json({
                success: false,
                message: 'El campo controlado es requerido'
            });
        }
        
        const updatedReporte = await ReporteRapido.update(parseInt(id), req.body);
        
        if (!updatedReporte) {
            return res.status(404).json({
                success: false,
                message: 'Reporte no encontrado'
            });
        }
        
        res.status(200).json({
            success: true,
            data: updatedReporte,
            message: 'Reporte actualizado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Eliminar reporte
const deleteReporte = async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await ReporteRapido.delete(parseInt(id));
        
        if (!deleted) {
            return res.status(404).json({
                success: false,
                message: 'Reporte no encontrado'
            });
        }
        
        res.status(200).json({
            success: true,
            message: 'Reporte eliminado exitosamente'
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener reportes por usuario
const getReportesByUsuario = async (req, res) => {
    try {
        const { usuario_id } = req.params;
        const reportes = await ReporteRapido.getByUsuario(usuario_id);
        
        res.status(200).json({
            success: true,
            data: reportes,
            message: `Reportes del usuario "${usuario_id}" obtenidos exitosamente`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

// Obtener reportes por estado de control
const getReportesByControlado = async (req, res) => {
    try {
        const { controlado } = req.params;
        const isControlado = controlado === 'true' || controlado === '1';
        const reportes = await ReporteRapido.getByControlado(isControlado);
        
        res.status(200).json({
            success: true,
            data: reportes,
            message: `Reportes ${isControlado ? 'controlados' : 'no controlados'} obtenidos exitosamente`
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            message: error.message
        });
    }
};

module.exports = {
    getAllReportes,
    getReporteById,
    createReporte,
    updateReporte,
    deleteReporte,
    getReportesByUsuario,
    getReportesByControlado
}; 