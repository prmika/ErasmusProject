"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const celebrate_1 = require("celebrate");
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../../config"));
const route = (0, express_1.Router)();
exports.default = (app) => {
    app.use('/v1/trucks', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.truck.name);
    route.get('', (req, res, next) => ctrl.getAllTrucks(req, res, next));
    route.post('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            tare: celebrate_1.Joi.number().required(),
            load_capacity: celebrate_1.Joi.number().required(),
            max_battery_charge: celebrate_1.Joi.number().required(),
            autonomy: celebrate_1.Joi.number().required(),
            fast_charging_time: celebrate_1.Joi.number().required()
        })
    }), (req, res, next) => ctrl.createTruck(req, res, next));
    route.get('/:truckId', (req, res, next) => ctrl.getTruck(req, res, next));
    route.put('/:truckId', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            tare: celebrate_1.Joi.number().required(),
            load_capacity: celebrate_1.Joi.number().required(),
            max_battery_charge: celebrate_1.Joi.number().required(),
            autonomy: celebrate_1.Joi.number().required(),
            fast_charging_time: celebrate_1.Joi.number().required()
        }),
    }), (req, res, next) => ctrl.updateTruck(req, res, next));
};
//# sourceMappingURL=truckRoute.js.map