import { IDeliveryPathPersistence } from '../../dataschema/IDeliveryPathPersistence';
import mongoose from 'mongoose';

const DeliveryPath = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        departure_warehouseId: {
            type: String,
            required: [true, 'Please enter a departure warehouse ID'],
            index: true,
        },

        destination_warehouseId: {
            type: String,
            required: [true, 'Please enter a destination warehouse ID'],
            index: true,
        },

        distance: {
            type: Number,
            required: [true, 'Please enter a distance'],
            index: true,
        },

        time: {
            type: Number,
            required: [true, 'Please enter a time'],
            index: true,
        },

        used_battery: {
            type: Number,
            required: [true, 'Please enter the used battery'],
            index: true,
        },

        extra_time_when_charging_required: {
            type: Number,
            required: [true, 'Please enter the extra time required'],
            index: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model<IDeliveryPathPersistence & mongoose.Document>('DeliveryPath', DeliveryPath);
