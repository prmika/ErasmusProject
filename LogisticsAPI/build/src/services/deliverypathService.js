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
const deliverypath_1 = require("../domain/deliverypath");
const Result_1 = require("../core/logic/Result");
const DeliveryPathMap_1 = require("../mappers/DeliveryPathMap");
let DeliveryPathService = class DeliveryPathService {
    constructor(deliverypathRepo) {
        this.deliverypathRepo = deliverypathRepo;
    }
    async getDeliveryPath(deliverypathId) {
        try {
            const deliverypath = await this.deliverypathRepo.findByDomainId(deliverypathId);
            if (deliverypath === null) {
                return Result_1.Result.fail("Delivery path not found");
            }
            else {
                const deliverypathDTOResult = DeliveryPathMap_1.DeliveryPathMap.toDTO(deliverypath);
                return Result_1.Result.ok(deliverypathDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getAllDeliveryPaths() {
        try {
            const deliverypath = await this.deliverypathRepo.findAll();
            if (deliverypath === null) {
                return Result_1.Result.fail("No delivery path were found.");
            }
            else {
                let deliverypathDTOMappedResults = [];
                deliverypath.forEach(deliverypath => deliverypathDTOMappedResults.push(DeliveryPathMap_1.DeliveryPathMap.toDTO(deliverypath)));
                return Result_1.Result.ok(deliverypathDTOMappedResults);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createDeliveryPath(deliverypathDTO) {
        try {
            const deliverypathOrError = await deliverypath_1.DeliveryPath.create(deliverypathDTO);
            if (deliverypathOrError.isFailure) {
                return Result_1.Result.fail(deliverypathOrError.errorValue());
            }
            const deliverypathResult = deliverypathOrError.getValue();
            await this.deliverypathRepo.save(deliverypathResult);
            const deliverypathDTOResult = DeliveryPathMap_1.DeliveryPathMap.toDTO(deliverypathResult);
            return Result_1.Result.ok(deliverypathDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updateDeliveryPath(deliverypathId, deliverypathDTO) {
        try {
            if (deliverypathId == deliverypathDTO.id) {
                const deliverypath = await this.deliverypathRepo.findByDomainId(deliverypathDTO.id);
                if (deliverypath === null) {
                    return Result_1.Result.fail("Delivery path not found");
                }
                else {
                    deliverypath.departure_warehouseId = deliverypathDTO.departure_warehouseId;
                    deliverypath.destination_warehouseId = deliverypathDTO.destination_warehouseId;
                    deliverypath.distance = deliverypathDTO.distance;
                    deliverypath.time = deliverypathDTO.time;
                    deliverypath.used_battery = deliverypathDTO.used_battery;
                    deliverypath.extra_time_when_charging_required = deliverypathDTO.extra_time_when_charging_required;
                    await this.deliverypathRepo.save(deliverypath);
                    const deliverypathDTOResult = DeliveryPathMap_1.DeliveryPathMap.toDTO(deliverypath);
                    return Result_1.Result.ok(deliverypathDTOResult);
                }
            }
            else {
                return Result_1.Result.fail("Delivery path Id doesn't match with Id in URL. Please make sure both match.");
            }
        }
        catch (e) {
            throw e;
        }
    }
};
DeliveryPathService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.deliverypath.name)),
    __metadata("design:paramtypes", [Object])
], DeliveryPathService);
exports.default = DeliveryPathService;
//# sourceMappingURL=deliverypathService.js.map