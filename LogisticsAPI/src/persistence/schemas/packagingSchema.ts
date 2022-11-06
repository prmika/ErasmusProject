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

        width: {
            type: Number,
            required: [true, 'Please enter the width of package'],
            index: true,
        },

        height: {
            type: Number,
            required: [true, 'Please enter the height of package'],
            index: true,
        },

        depth: {
            type: Number,
            required: [true, 'Please enter the depth of package'],
            index: true,
        },

        weight: {
            type: Number,
            required: [true, 'Please enter the weight of package'],
            index: true,
        },

        timeToLoad: {
            type: Number,
            //required: [true, 'Please enter the time needed to Load/Unload the package'],
            index: true,
        },

    },
    { timestamps: true },
);

export default mongoose.model<IPackagingPersistence & mongoose.Document>('Packaging', Packaging);
