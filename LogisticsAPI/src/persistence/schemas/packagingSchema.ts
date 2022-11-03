import { IPackagingPersistence } from '../../dataschema/IPackagingPersistence';
import mongoose from 'mongoose';

const Packaging = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        product: {
            type: String,
            required: [true, 'Enter the name of the product'],
            unique: true
        },

        weight: {
            type: Number,
            required: [true, 'Please enter the weight'],
            index: true,
        },

    },
    { timestamps: true },
);

export default mongoose.model<IPackagingPersistence & mongoose.Document>('Packaging', Packaging);
