import mongoose from 'mongoose';
import Organizacion, { IOrganizacionModel, IOrganizacion } from '../models/Organizacion';
import Usuario, { IUsuarioModel } from '../models/Usuario';

const createOrganizacion = async (data: Partial<IOrganizacion>): Promise<IOrganizacionModel> => {
    const organizacion = new Organizacion({
        _id: new mongoose.Types.ObjectId(),
        ...data
    });
    return await organizacion.save();
};

const getOrganizacion = async (organizacionId: string): Promise<IOrganizacionModel | null> => {
    return await Organizacion.findById(organizacionId).populate('usuarios').lean();
};

const getAllOrganizaciones = async (): Promise<IOrganizacionModel[]> => {
    return await Organizacion.find().populate('usuarios').lean();
};

const getUsuariosByOrganizacion = async (organizacionId: string): Promise<IUsuarioModel[] | null> => {
    const organizacion = await Organizacion.findById(organizacionId).lean();

    if (!organizacion) return null;

    return await Usuario.find({ organizacion: organizacionId }).populate('organizacion').lean();
};

const updateOrganizacion = async (
    organizacionId: string,
    data: Partial<IOrganizacion>): Promise<IOrganizacionModel | null> => {
    const organizacion = await Organizacion.findById(organizacionId);
    if (organizacion) {
        organizacion.set(data);
        return await organizacion.save();
    }
    return null;
};

const deleteOrganizacion = async (organizacionId: string): Promise<IOrganizacionModel | null> => {
    return await Organizacion.findByIdAndDelete(organizacionId).lean();
};

export default {
    createOrganizacion,
    getOrganizacion,
    getAllOrganizaciones,
    getUsuariosByOrganizacion,
    updateOrganizacion,
    deleteOrganizacion
};