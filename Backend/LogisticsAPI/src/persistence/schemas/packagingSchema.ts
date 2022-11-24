import { IPackagingPersistence } from '../../dataschema/IPackagingPersistence';
import mongoose from 'mongoose';

const Packaging = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        truckToPlace: {
            type: String,
            required: [true, 'Choose a truck to place delivery'],
            unique: true
        },

        deliveryId: {
            type: String,
            required: [true, 'Choose a delivery'],
            unique: true
        },

        placementX: {
            type: Number,
            required: [true, 'Please enter the X coordinate'],
            index: true,
        },

        placementY: {
            type: Number,
            required: [true, 'Please enter the Y coordinate'],
            index: true,
        },

        placementZ: {
            type: Number,
            required: [true, 'Please enter the Z coordinate'],
            index: true,
        },

        timeToLoad: {
            type: Number,
            required: [true, 'Please enter the time needed to Load the delivery'],
            index: true,
        },

        timeToUnload: {
            type: Number,
            required: [true, 'Please enter the time needed to Unload the delivery'],
            index: true,
        },

    },
    { timestamps: true },
);

export default mongoose.model<IPackagingPersistence & mongoose.Document>('Packaging', Packaging);
