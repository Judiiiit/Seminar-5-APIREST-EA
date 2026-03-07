import mongoose, { Document, Schema } from 'mongoose';

export interface IOrganizacionManual extends Document {
    name: string;
    users: mongoose.Types.ObjectId[];
}

const OrganizacionManualSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        users: [{ type: Schema.Types.ObjectId, ref: 'UsuarioManual' }] // Guardamos IDs aquí
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IOrganizacionManual>('OrganizacionManual', OrganizacionManualSchema);