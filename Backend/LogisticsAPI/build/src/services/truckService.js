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
const truck_1 = require("../domain/truck");
const Result_1 = require("../core/logic/Result");
const TruckMap_1 = require("../mappers/TruckMap");
let TruckService = class TruckService {
    constructor(truckRepo) {
        this.truckRepo = truckRepo;
    }
    async getTruck(truckId) {
        try {
            const truck = await this.truckRepo.findByDomainId(truckId);
            if (truck === null) {
                return Result_1.Result.fail("Truck not found");
            }
            else {
                const truckDTOResult = TruckMap_1.TruckMap.toDTO(truck);
                return Result_1.Result.ok(truckDTOResult);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async getAllTrucks() {
        try {
            const trucks = await this.truckRepo.findAll();
            if (trucks === null) {
                return Result_1.Result.fail("No trucks were found.");
            }
            else {
                let truckDTOMappedResults = [];
                trucks.forEach(truck => truckDTOMappedResults.push(TruckMap_1.TruckMap.toDTO(truck)));
                return Result_1.Result.ok(truckDTOMappedResults);
            }
        }
        catch (e) {
            throw e;
        }
    }
    async createTruck(truckDTO) {
        try {
            const truckOrError = await truck_1.Truck.create(truckDTO);
            if (truckOrError.isFailure) {
                return Result_1.Result.fail(truckOrError.errorValue());
            }
            const truckResult = truckOrError.getValue();
            await this.truckRepo.save(truckResult);
            const truckDTOResult = TruckMap_1.TruckMap.toDTO(truckResult);
            return Result_1.Result.ok(truckDTOResult);
        }
        catch (e) {
            throw e;
        }
    }
    async updateTruck(truckId, truckDTO) {
        try {
            if (truckId == truckDTO.id) {
                const truck = await this.truckRepo.findByDomainId(truckDTO.id);
                if (truck === null) {
                    return Result_1.Result.fail("Truck not found");
                }
                else {
                    truck.tare = truckDTO.tare;
                    truck.load_capacity = truckDTO.load_capacity;
                    truck.max_battery_charge = truckDTO.max_battery_charge;
                    truck.autonomy = truckDTO.autonomy;
                    truck.fast_charging_time = truckDTO.fast_charging_time;
                    truck.truck_status = truckDTO.truck_status;
                    await this.truckRepo.save(truck);
                    const truckDTOResult = TruckMap_1.TruckMap.toDTO(truck);
                    return Result_1.Result.ok(truckDTOResult);
                }
            }
            else {
                return Result_1.Result.fail("TruckId doesn't match with Id in URL. Please make sure both match.");
            }
        }
        catch (e) {
            throw e;
        }
    }
};
TruckService = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)(config_1.default.repos.truck.name)),
    __metadata("design:paramtypes", [Object])
], TruckService);
exports.default = TruckService;
//# sourceMappingURL=truckService.js.map