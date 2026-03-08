import OrganizacionManual, { IOrganizacionManual } from '../models/OrganizacionManual';
import UsuarioManual, { IUsuarioManual } from '../models/UsuarioManual';

const createOrganizacionManual = async (name: string): Promise<IOrganizacionManual> => {
    const organizacion = new OrganizacionManual({
        name,
        users: []
    });

    return await organizacion.save();
};

const getAllOrganizacionesManual = async (): Promise<IOrganizacionManual[]> => {
    return await OrganizacionManual.find().populate('users').lean();
};

const getOrganizacionManualById = async (organizacionId: string): Promise<IOrganizacionManual | null> => {
    return await OrganizacionManual.findById(organizacionId).populate('users').lean();
};

const getUsuariosByOrganizacionManual = async (organizacionId: string): Promise<IUsuarioManual[] | null> => {
    const organizacion = await OrganizacionManual.findById(organizacionId).populate('users').lean();

    if (!organizacion) return null;

    return organizacion.users as unknown as IUsuarioManual[];
};


const deleteOrganizacionManual = async (organizacionId: string) => {
    return await OrganizacionManual.findByIdAndDelete(organizacionId).lean();
};

const updateOrganizacionManual = async (organizacionId: string, data: Partial<IOrganizacionManual>) => {
    const organizacion = await OrganizacionManual.findById(organizacionId);

    if (!organizacion) return null;

    organizacion.set(data);
    await organizacion.save();

    return await OrganizacionManual.findById(organizacionId).populate('usuarios').lean();
};

export default {
    createOrganizacionManual,
    getAllOrganizacionesManual,
    getOrganizacionManualById,
    getUsuariosByOrganizacionManual,
    updateOrganizacionManual,
    deleteOrganizacionManual
};