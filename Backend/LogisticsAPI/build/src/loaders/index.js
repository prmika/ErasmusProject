"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("./express"));
const dependencyInjector_1 = __importDefault(require("./dependencyInjector"));
const mongoose_1 = __importDefault(require("./mongoose"));
const logger_1 = __importDefault(require("./logger"));
const config_1 = __importDefault(require("../../config"));
exports.default = async ({ expressApp }) => {
    const mongoConnection = await (0, mongoose_1.default)();
    logger_1.default.info('✌️ DB loaded and connected!');
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
    const roleController = {
        name: config_1.default.controllers.role.name,
        path: config_1.default.controllers.role.path
    };
    const truckController = {
        name: config_1.default.controllers.truck.name,
        path: config_1.default.controllers.truck.path
    };
    const deliveryPathController = {
        name: config_1.default.controllers.deliverypath.name,
        path: config_1.default.controllers.deliverypath.path
    };
    const roleRepo = {
        name: config_1.default.repos.role.name,
        path: config_1.default.repos.role.path
    };
    const userRepo = {
        name: config_1.default.repos.user.name,
        path: config_1.default.repos.user.path
    };
    const truckRepo = {
        name: config_1.default.repos.truck.name,
        path: config_1.default.repos.truck.path
    };
    const deliveryPathRepo = {
        name: config_1.default.repos.deliverypath.name,
        path: config_1.default.repos.deliverypath.path
    };
    const roleService = {
        name: config_1.default.services.role.name,
        path: config_1.default.services.role.path
    };
    const truckService = {
        name: config_1.default.services.truck.name,
        path: config_1.default.services.truck.path
    };
    const deliveryPathService = {
        name: config_1.default.services.deliverypath.name,
        path: config_1.default.services.deliverypath.path
    };
    await (0, dependencyInjector_1.default)({
        mongoConnection,
        schemas: [
            userSchema,
            roleSchema,
            truckSchema,
            deliveryPathSchema
        ],
        controllers: [
            roleController,
            truckController,
            deliveryPathController
        ],
        repos: [
            roleRepo,
            userRepo,
            truckRepo,
            deliveryPathRepo
        ],
        services: [
            roleService,
            truckService,
            deliveryPathService
        ]
    });
    logger_1.default.info('✌️ Schemas, Controllers, Repositories, Services, etc. loaded');
    await (0, express_1.default)({ app: expressApp });
    logger_1.default.info('✌️ Express loaded');
};
//# sourceMappingURL=index.js.map