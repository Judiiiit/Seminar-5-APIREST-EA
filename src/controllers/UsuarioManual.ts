import { NextFunction, Request, Response } from 'express';
import mongoose from 'mongoose';
import UsuarioManualService from '../services/UsuarioManual';

const createUsuarioManual = async (req: Request, res: Response, next: NextFunction) => {
    const { name, organization } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(organization)) {
            return res.status(404).json({ message: 'organization not found' });
        }

        const usuario = await UsuarioManualService.createUsuarioManual(name, organization);

        return usuario
            ? res.status(201).json(usuario)
            : res.status(404).json({ message: 'organization not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readUsuariosManual = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const usuarios = await UsuarioManualService.readUsuariosManual();
        return res.status(200).json(usuarios);
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const readUsuarioManual = async (req: Request, res: Response, next: NextFunction) => {
    const { usuarioId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
            return res.status(404).json({ message: 'not found' });
        }

        const usuario = await UsuarioManualService.readUsuarioManualById(usuarioId);

        return usuario
            ? res.status(200).json(usuario)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const updateUsuarioManual = async (req: Request, res: Response, next: NextFunction) => {
    const { usuarioId } = req.params;
    const { name, organization } = req.body;

    try {
        if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
            return res.status(404).json({ message: 'not found' });
        }

        if (organization && !mongoose.Types.ObjectId.isValid(organization)) {
            return res.status(404).json({ message: 'organization not found' });
        }

        const usuario = await UsuarioManualService.updateUsuarioManual(usuarioId, name, organization);

        return usuario
            ? res.status(200).json(usuario)
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

const deleteUsuarioManual = async (req: Request, res: Response, next: NextFunction) => {
    const { usuarioId } = req.params;

    try {
        if (!mongoose.Types.ObjectId.isValid(usuarioId)) {
            return res.status(404).json({ message: 'not found' });
        }

        const usuario = await UsuarioManualService.deleteUsuarioManual(usuarioId);

        return usuario
            ? res.status(200).json({ usuario, message: 'deleted successfully' })
            : res.status(404).json({ message: 'not found' });
    } catch (error) {
        return res.status(500).json({ error });
    }
};

export default {createUsuarioManual, readUsuariosManual, readUsuarioManual, updateUsuarioManual, deleteUsuarioManual};