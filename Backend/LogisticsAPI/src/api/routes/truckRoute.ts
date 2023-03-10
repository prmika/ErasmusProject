import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import ITruckController from '../../controllers/IControllers/ITruckController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/v1/trucks', route);

  const ctrl = Container.get(config.controllers.truck.name) as ITruckController;

  route.get('', (req, res, next) => ctrl.getAllTrucks(req, res, next));

  route.post('',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        tare: Joi.number().required(),
        load_capacity: Joi.number().required(),
        max_battery_charge: Joi.number().required(),
        autonomy: Joi.number().required(),
        fast_charging_time: Joi.number().required(),
        status: Joi.boolean().required()
      })
    }),
    (req, res, next) => ctrl.createTruck(req, res, next));

  route.get('/:truckId', (req, res, next) => ctrl.getTruck(req, res, next));

  route.put('/:truckId',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        tare: Joi.number().required(),
        load_capacity: Joi.number().required(),
        max_battery_charge: Joi.number().required(),
        autonomy: Joi.number().required(),
        fast_charging_time: Joi.number().required(),
        status: Joi.boolean().required()
      }),
    }),
    (req, res, next) => ctrl.updateTruck(req, res, next));


};