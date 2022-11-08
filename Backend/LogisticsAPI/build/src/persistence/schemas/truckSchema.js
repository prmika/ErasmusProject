"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Truck = new mongoose_1.default.Schema({
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
}, { timestamps: true });
exports.default = mongoose_1.default.model('Truck', Truck);
//# sourceMappingURL=truckSchema.js.map