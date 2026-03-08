import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import OrganizacionManualService from '../services/OrganizacionManual';

const createOrganizacionManual = async (req: Request, res: Response, next: NextFunction) => {
    const { name } = req.body;

    try {
        const organizacion = await OrganizacionManualService.createOrganizacionManual(name);
        return res.status(201).json(organizacion);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getAllOrganizacionesManual = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const organizaciones = await OrganizacionManualService.getAllOrganizacionesManual();
        return res.status(200).json(organizaciones);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getOrganizacionManual = async (req: Request, res: Response, next: NextFunction) => {
    const { organizacionId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(organizacionId)) {
            return res.status(404).json({ message: 'not found' });
        }

        const organizacion = await OrganizacionManualService.getOrganizacionManualById(organizacionId);

        return organizacion
            ? res.status(200).json(organizacion)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const getUsuariosByOrganizacionManual = async (req: Request, res: Response, next: NextFunction) => {
    const { organizacionId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(organizacionId)) {
            return res.status(404).json({ message: 'not found' });
        }

        const usuarios = await OrganizacionManualService.getUsuariosByOrganizacionManual(organizacionId);

        return usuarios
            ? res.status(200).json(usuarios)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateOrganizacionManual = async (req: Request, res: Response, next: NextFunction) => {
    const organizacionId = req.params.organizacionId;

    try {
        const organizacion = await OrganizacionManualService.updateOrganizacionManual(organizacionId, req.body);
        return organizacion ? res.status(200).json(organizacion) : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};


const deleteOrganizacionManual = async (req: Request, res: Response, next: NextFunction) => {
    const { organizacionId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(organizacionId)) {
            return res.status(404).json({ message: 'not found' });
        }

        const organizacion = await OrganizacionManualService.deleteOrganizacionManual(organizacionId);

        return organizacion
            ? res.status(200).json({
                  message: 'Organizacion deleted successfully',
                  organizacion
              })
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default {createOrganizacionManual, getAllOrganizacionesManual, getOrganizacionManual, getUsuariosByOrganizacionManual, updateOrganizacionManual, deleteOrganizacionManual
};