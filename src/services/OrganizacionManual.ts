import OrganizacionManual, { IOrganizacionManual } from '../models/OrganizacionManual';
import UsuarioManual, { IUsuarioManual } from '../models/UsuarioManual';

const createOrganizacionManual = async (name: string): Promise<IOrganizacionManual> => {
    const organizacion = new OrganizacionManual({
        name,
        users: []
    });

    return await organizacion.save();
};

const readOrganizacionesManual = async (): Promise<IOrganizacionManual[]> => {
    return await OrganizacionManual.find().populate('users');
};

const readOrganizacionManualById = async (organizacionId: string): Promise<IOrganizacionManual | null> => {
    return await OrganizacionManual.findById(organizacionId).populate('users');
};

const readUsuariosByOrganizacionManual = async (organizacionId: string): Promise<IUsuarioManual[] | null> => {
    const organizacion = await OrganizacionManual.findById(organizacionId).populate('users');

    if (!organizacion) return null;

    return organizacion.users as unknown as IUsuarioManual[];
};

const deleteOrganizacionManual = async (organizacionId: string) => {
    return await OrganizacionManual.findByIdAndDelete(organizacionId);
};

export default {
    createOrganizacionManual,
    readOrganizacionesManual,
    readOrganizacionManualById,
    readUsuariosByOrganizacionManual,
    deleteOrganizacionManual
};