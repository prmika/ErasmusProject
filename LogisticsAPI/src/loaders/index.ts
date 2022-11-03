import expressLoader from './express';
import dependencyInjectorLoader from './dependencyInjector';
import mongooseLoader from './mongoose';
import Logger from './logger';

import config from '../../config';

export default async ({ expressApp }) => {
  const mongoConnection = await mongooseLoader();
  Logger.info('✌️ DB loaded and connected!');

  const userSchema = {
    // compare with the approach followed in repos and services
    name: 'userSchema',
    schema: '../persistence/schemas/userSchema',
  };

  const roleSchema = {
    // compare with the approach followed in repos and services
    name: 'roleSchema',
    schema: '../persistence/schemas/roleSchema',
  };

  const truckSchema = {
    // compare with the approach followed in repos and services
    name: 'truckSchema',
    schema: '../persistence/schemas/truckSchema',
  };

  const deliveryPathSchema = {
    // compare with the approach followed in repos and services
    name: 'deliverypathSchema',
    schema: '../persistence/schemas/deliverypathSchema',
  };
  
  const packagingSchema = {
    // compare with the approach followed in repos and services
    name: 'packagingSchema',
    schema: '../persistence/schemas/packagingSchema',
  };

  const roleController = {
    name: config.controllers.role.name,
    path: config.controllers.role.path
  }

  const truckController = {
    name: config.controllers.truck.name,
    path: config.controllers.truck.path
  }

  const deliveryPathController = {
    name: config.controllers.deliverypath.name,
    path: config.controllers.deliverypath.path
  };
  
  const packagingController = {
    name: config.controllers.packaging.name,
    path: config.controllers.packaging.path
  }

  const roleRepo = {
    name: config.repos.role.name,
    path: config.repos.role.path
  }

  const userRepo = {
    name: config.repos.user.name,
    path: config.repos.user.path
  }

  const truckRepo = {
    name: config.repos.truck.name,
    path: config.repos.truck.path
  }

  const deliveryPathRepo = {
    name: config.repos.deliverypath.name,
    path: config.repos.deliverypath.path
  };
  
  const packagingRepo = {
    name: config.repos.packaging.name,
    path: config.repos.packaging.path
  }

  const roleService = {
    name: config.services.role.name,
    path: config.services.role.path
  }

  const truckService = {
    name: config.services.truck.name,
    path: config.services.truck.path
  }

  const deliveryPathService = {
    name: config.services.deliverypath.name,
    path: config.services.deliverypath.path
  };
  
  const packagingService = {
    name: config.services.packaging.name,
    path: config.services.packaging.path
  }

  await dependencyInjectorLoader({
    mongoConnection,
    schemas: [
      userSchema,
      roleSchema,
      truckSchema,
      deliveryPathSchema,
      packagingSchema
    ],
    controllers: [
      roleController,
      truckController,
      deliveryPathController,
      packagingController
    ],
    repos: [
      roleRepo,
      userRepo,
      truckRepo,
      deliveryPathRepo,
      packagingRepo
    ],
    services: [
      roleService,
      truckService,
      deliveryPathService,
      packagingService
    ]
  });
  Logger.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');

  await expressLoader({ app: expressApp });
  Logger.info('✌️ Express loaded');
};
