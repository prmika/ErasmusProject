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
    app.use('/v1/deliverypath', route);
    const ctrl = typedi_1.Container.get(config_1.default.controllers.deliverypath.name);
    route.get('', (req, res, next) => ctrl.getAllDeliveryPaths(req, res, next));
    route.post('', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            departure_warehouseId: celebrate_1.Joi.string().required(),
            destination_warehouseId: celebrate_1.Joi.string().required(),
            distance: celebrate_1.Joi.number().required(),
            time: celebrate_1.Joi.number().required(),
            used_battery: celebrate_1.Joi.number().required(),
            extra_time_when_charging_required: celebrate_1.Joi.number().required()
        })
    }), (req, res, next) => ctrl.createDeliveryPath(req, res, next));
    route.get('/:deliverypathId', (req, res, next) => ctrl.getDeliveryPath(req, res, next));
    route.put('/:deliverypathId', (0, celebrate_1.celebrate)({
        body: celebrate_1.Joi.object({
            id: celebrate_1.Joi.string().required(),
            departure_warehouseId: celebrate_1.Joi.string().required(),
            destination_warehouseId: celebrate_1.Joi.string().required(),
            distance: celebrate_1.Joi.number().required(),
            time: celebrate_1.Joi.number().required(),
            used_battery: celebrate_1.Joi.number().required(),
            extra_time_when_charging_required: celebrate_1.Joi.number().required()
        }),
    }), (req, res, next) => ctrl.updateDeliveryPath(req, res, next));
};
//# sourceMappingURL=deliverypathRoute.js.map