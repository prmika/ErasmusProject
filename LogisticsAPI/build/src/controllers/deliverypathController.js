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
let DeliveryPathController = class DeliveryPathController {
    constructor(deliverypathServiceInstance) {
        this.deliverypathServiceInstance = deliverypathServiceInstance;
    }
    async getDeliveryPath(req, res, next) {
        try {
            const deliverypathOrError = await this.deliverypathServiceInstance.getDeliveryPath(req.params.deliverypathId);
            if (deliverypathOrError.isFailure) {
                return res.status(402).send();
            }
            const deliverypathDTO = deliverypathOrError.getValue();
            return res.json(deliverypathDTO).status(200);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async getAllDeliveryPaths(req, res, next) {
        try {
            const deliverypathOrError = await this.deliverypathServiceInstance.getAllDeliveryPaths();
            if (deliverypathOrError.isFailure) {
                return res.status(402).send();
            }
            const deliverypathDTOs = deliverypathOrError.getValue();
            return res.json(deliverypathDTOs).status(200);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async createDeliveryPath(req, res, next) {
        try {
            const deliverypathOrError = await this.deliverypathServiceInstance.createDeliveryPath(req.body);
            if (deliverypathOrError.isFailure) {
                return res.status(402).send();
            }
            const deliverypathDTO = deliverypathOrError.getValue();
            return res.json(deliverypathDTO).status(201);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
    async updateDeliveryPath(req, res, next) {
        try {
            const deliverypathOrError = await this.deliverypathServiceInstance.updateDeliveryPath(req.params.deliverypathId, req.body);
            if (deliverypathOrError.isFailure) {
                return res.status(404).send();
            }
            const deliveryPathDTO = deliverypathOrError.getValue();
            return res.status(201).json(deliveryPathDTO);
        }
        catch (e) {
            return next(e);
        }
    }
    ;
};
DeliveryPathController = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.services.deliverypath.name)),
    __metadata("design:paramtypes", [Object])
], DeliveryPathController);
exports.default = DeliveryPathController;
//# sourceMappingURL=deliverypathController.js.map