import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IDeliveryPathController from '../../controllers/IControllers/IDeliveryPathController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
    app.use('/v1/deliverypath', route);

    const ctrl = Container.get(config.controllers.deliverypath.name) as IDeliveryPathController;

    route.get('', (req, res, next) => ctrl.getAllDeliveryPaths(req, res, next));

    route.get('/paged/:page/:numberOfItems', (req, res, next) => ctrl.getAllDeliveryPathsPaged(req, res, next));

    route.post('',
        celebrate({
            body: Joi.object({
                departure_warehouseId: Joi.string().required(),
                destination_warehouseId: Joi.string().required(),
                distance: Joi.number().required(),
                time: Joi.number().required(),
                used_battery: Joi.number().required(),
                extra_time_when_charging_required: Joi.number().required()
            })
        }),
        (req, res, next) => ctrl.createDeliveryPath(req, res, next));

    route.get('/:deliverypathId', (req, res, next) => ctrl.getDeliveryPath(req, res, next));

    route.put('/:deliverypathId',
        celebrate({
            body: Joi.object({
                departure_warehouseId: Joi.string().required(),
                destination_warehouseId: Joi.string().required(),
                distance: Joi.number().required(),
                time: Joi.number().required(),
                used_battery: Joi.number().required(),
                extra_time_when_charging_required: Joi.number().required()
            }),
        }),
        (req, res, next) => ctrl.updateDeliveryPath(req, res, next));


};