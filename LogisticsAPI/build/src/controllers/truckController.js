"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const config_1 = __importDefault(require("../../config"));
let TruckController = class TruckController {
    constructor(truckServiceInstance) {
        this.truckServiceInstance = truckServiceInstance;
    }
    async getTruck(req, res, next) {
        try {
            const truckOrError = await this.truckServiceInstance.getTruck(req.params.truckId);
            if (truckOrError.isFailure) {
                return res.status(402).send();
            }
            const truckDTO = truckOrError.getValue();
            return res.json(truckDTO).status(200);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async getAllTrucks(req, res, next) {
        try {
            const truckOrError = await this.truckServiceInstance.getAllTrucks();
            if (truckOrError.isFailure) {
                return res.status(402).send();
            }
            const truckDTOs = truckOrError.getValue();
            return res.json(truckDTOs).status(200);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async createTruck(req, res, next) {
        try {
            const truckOrError = await this.truckServiceInstance.createTruck(req.body);
            if (truckOrError.isFailure) {
                return res.status(402).send();
            }
            const truckDTO = truckOrError.getValue();
            return res.json(truckDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async updateTruck(req, res, next) {
        try {
            const truckOrError = await this.truckServiceInstance.updateTruck(req.params.truckId, req.body);
            if (truckOrError.isFailure) {
                return res.status(404).send();
            }
            const truckDTO = truckOrError.getValue();
            return res.status(201).json(truckDTO);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
};
TruckController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.truck.name)),
    __metadata("design:paramtypes", [Object])
], TruckController);
exports.default = TruckController;
//# sourceMappingURL=truckController.js.map