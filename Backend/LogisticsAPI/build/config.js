"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';
const envFound = dotenv_1.default.config();
if (!envFound) {
    // This error should crash whole process
    throw new Error("⚠️  Couldn't find .env file  ⚠️");
}
exports.default = {
    /**
     * Your favorite port
     */
    port: parseInt(process.env.PORT, 10) || 3000,
    /**
     * That long string from mlab
     */
    databaseURL: process.env.MONGODB_URI || "mongodb+srv://dbAdmin:Lab5project2022@lab5project.9vyeml3.mongodb.net/electricgo",
    //databaseURL: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000/electricgo",
    /**
     * Your secret sauce
     */
    jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",
    /**
     * Used by winston logger
     */
    logs: {
        level: process.env.LOG_LEVEL || 'info',
    },
    /**
     * API configs
     */
    api: {
        prefix: '/api',
    },
    controllers: {
        role: {
            name: "RoleController",
            path: "../controllers/roleController"
        },
        truck: {
            name: "TruckController",
            path: "../controllers/truckController"
        },
        deliverypath: {
            name: "DeliveryPathController",
            path: "../controllers/deliverypathController"
        }
    },
    repos: {
        truck: {
            name: "TruckRepo",
            path: "../repos/truckRepo"
        },
        role: {
            name: "RoleRepo",
            path: "../repos/roleRepo"
        },
        user: {
            name: "UserRepo",
            path: "../repos/userRepo"
        },
        deliverypath: {
            name: "DeliveryPathRepo",
            path: "../repos/deliverypathRepo"
        }
    },
    services: {
        role: {
            name: "RoleService",
            path: "../services/roleService"
        },
        truck: {
            name: "TruckService",
            path: "../services/truckService"
        },
        deliverypath: {
            name: "DeliveryPathService",
            path: "../services/deliverypathService"
        }
    },
};
//# sourceMappingURL=config.js.map