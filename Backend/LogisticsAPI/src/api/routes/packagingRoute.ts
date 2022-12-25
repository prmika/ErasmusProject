import { Router } from 'express';
import { celebrate, Joi } from 'celebrate';

import { Container } from 'typedi';
import IPackagingController from '../../controllers/IControllers/IPackagingController';

import config from "../../../config";

const route = Router();

export default (app: Router) => {
  app.use('/v1/packages', route);

  const ctrl = Container.get(config.controllers.packaging.name) as IPackagingController;

  route.get('', (req, res, next) => ctrl.getAllPackages(req, res, next));
  
  route.get('/paged/:page/:numberOfItems', (req, res, next) => ctrl.getAllPackagesPaged(req, res, next));

  route.post('',
    celebrate({
      body: Joi.object({
        truckToPlace: Joi.string().required(),
        deliveryId: Joi.string().required(),
        placementX: Joi.number().required(),
        placementY: Joi.number().required(),
        placementZ: Joi.number().required()
      })
    }),
    (req, res, next) => ctrl.createPackaging(req, res, next));

  route.get('/:packagingId', (req, res, next) => ctrl.getPackaging(req, res, next));

  route.put('/:packagingId',
    celebrate({
      body: Joi.object({
        id: Joi.string().required(),
        truckToPlace: Joi.string().required(),
        deliveryId: Joi.string().required(),
        placementX: Joi.number().required(),
        placementY: Joi.number().required(),
        placementZ: Joi.number().required()
      }),
    }),
    (req, res, next) => ctrl.updatePackaging(req, res, next));


};