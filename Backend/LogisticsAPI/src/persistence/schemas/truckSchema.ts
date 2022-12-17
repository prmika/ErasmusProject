import { ITruckPersistence } from '../../dataschema/ITruckPersistence';
import mongoose from 'mongoose';

const Truck = new mongoose.Schema(
    {
        domainId: {
            type: String,
            unique: true
        },

        tare: {
            type: Number,
            required: [true, 'Please enter a tare'],
            index: true,
        },

        load_capacity: {
            type: Number,
            required: [true, 'Please enter a load capacity'],
            index: true,
        },

        max_battery_charge: {
            type: Number,
            required: [true, 'Please enter a max battery charge'],
            index: true,
        },

        autonomy: {
            type: Number,
            required: [true, 'Please enter an autonomy'],
            index: true,
        },

        fast_charging_time: {
            type: Number,
            required: [true, 'Please enter a fast_charging_times'],
            index: true,
        },
        truck_status: {
            type: String,
            default: 'active',
            required: [true, 'Please enter the status of a truck'],
            index: true,
        },
    },
    { timestamps: true },
);

export default mongoose.model<ITruckPersistence & mongoose.Document>('Truck', Truck);
