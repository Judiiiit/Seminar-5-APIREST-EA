import mongoose, { Document, Schema } from 'mongoose';

export interface IUsuarioManual extends Document {
    name: string;
    organization: mongoose.Types.ObjectId;
}

const UsuarioManualSchema: Schema = new Schema(
    {
        name: { type: String, required: true },
        organization: {type: Schema.Types.ObjectId, required: true, ref: 'OrganizacionManual'}
    },
    {
        timestamps: true
    }
);

export default mongoose.model<IUsuarioManual>('UsuarioManual', UsuarioManualSchema);