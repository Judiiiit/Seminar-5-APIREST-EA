import mongoose, { Document, Schema, Types } from 'mongoose';

export interface IOrganizacion {
    name: string;
}

export interface IOrganizacionModel extends IOrganizacion, Document {usuarios?: mongoose.Types.ObjectId[]}

const OrganizacionSchema: Schema = new Schema(
    {
        name: { type: String, required: true }
    },
    {
        versionKey: false,
        id : false,
        toJSON: { virtuals: true },
        toObject: { virtuals: true }
    }
);

OrganizacionSchema.virtual('usuarios', {
    ref: 'Usuario',
    localField: '_id',
    foreignField: 'organizacion'
});


export default mongoose.model<IOrganizacionModel>('Organizacion', OrganizacionSchema);
