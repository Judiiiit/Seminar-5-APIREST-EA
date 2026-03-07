import mongoose from 'mongoose';
import UsuarioManual, { IUsuarioManual } from '../models/UsuarioManual';
import OrganizacionManual from '../models/OrganizacionManual';

const createUsuarioManual = async (name: string, organization: string): Promise<IUsuarioManual | null> => {
    const organizacionExists = await OrganizacionManual.findById(organization);

    if (!organizacionExists) return null;

    const usuario = new UsuarioManual({
        _id: new mongoose.Types.ObjectId(),
        name,
        organization
    });

    const savedUsuario = await usuario.save();

    await OrganizacionManual.findByIdAndUpdate(organization, {
        $push: { users: savedUsuario._id }
    });

    return savedUsuario;
};

const readUsuariosManual = async (): Promise<IUsuarioManual[]> => {
    return await UsuarioManual.find().populate('organization');
};

const readUsuarioManualById = async (usuarioId: string): Promise<IUsuarioManual | null> => {
    return await UsuarioManual.findById(usuarioId).populate('organization');
};

const updateUsuarioManual = async (
    usuarioId: string,
    name?: string,
    newOrganization?: string
): Promise<IUsuarioManual | null> => {
    const usuario = await UsuarioManual.findById(usuarioId);

    if (!usuario) return null;

    if (name !== undefined) {
        usuario.name = name;
    }

    if (newOrganization && newOrganization.toString() !== usuario.organization.toString()) {
        const nuevaOrganizacionExists = await OrganizacionManual.findById(newOrganization);

        if (!nuevaOrganizacionExists) return null;

        await OrganizacionManual.findByIdAndUpdate(usuario.organization, {
            $pull: { users: usuario._id }
        });

        await OrganizacionManual.findByIdAndUpdate(newOrganization, {
            $push: { users: usuario._id }
        });

        usuario.organization = new mongoose.Types.ObjectId(newOrganization);
    }

    return await usuario.save();
};

const deleteUsuarioManual = async (usuarioId: string): Promise<IUsuarioManual | null> => {
    const usuario = await UsuarioManual.findById(usuarioId);

    if (!usuario) return null;

    await OrganizacionManual.findByIdAndUpdate(usuario.organization, {
        $pull: { users: usuario._id }
    });

    await UsuarioManual.findByIdAndDelete(usuarioId);

    return usuario;
};

export default {
    createUsuarioManual,
    readUsuariosManual,
    readUsuarioManualById,
    updateUsuarioManual,
    deleteUsuarioManual
};