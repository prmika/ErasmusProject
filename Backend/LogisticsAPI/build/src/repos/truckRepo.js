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
Object.defineProperty(exports, "__esModule", { value: true });
const typedi_1 = require("typedi");
const truckId_1 = require("../domain/truckId");
const TruckMap_1 = require("../mappers/TruckMap");
const mongoose_1 = require("mongoose");
let TruckRepo = class TruckRepo {
    constructor(truckSchema) {
        this.truckSchema = truckSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(truck) {
        const idX = truck.id instanceof truckId_1.TruckId ? truck.id.toValue() : truck.id;
        const query = { domainId: idX };
        const truckDocument = await this.truckSchema.findOne(query);
        return !!truckDocument === true;
    }
    async save(truck) {
        const query = { domainId: truck.id.toString() };
        const truckDocument = await this.truckSchema.findOne(query);
        try {
            if (truckDocument === null) {
                const rawTruck = TruckMap_1.TruckMap.toPersistence(truck);
                const truckCreated = await this.truckSchema.create(rawTruck);
                return TruckMap_1.TruckMap.toDomain(truckCreated);
            }
            else {
                truckDocument.tare = truck.tare;
                truckDocument.load_capacity = truck.load_capacity;
                truckDocument.max_battery_charge = truck.max_battery_charge;
                truckDocument.autonomy = truck.autonomy;
                truckDocument.fast_charging_time = truck.fast_charging_time;
                await truckDocument.save();
                return truck;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(truckId) {
        const query = { domainId: truckId };
        const truckRecord = await this.truckSchema.findOne(query);
        if (truckRecord != null) {
            return TruckMap_1.TruckMap.toDomain(truckRecord);
        }
        else
            return null;
    }
    async findAll() {
        const truckRecords = await this.truckSchema.find({});
        let truckRecordsMapped = [];
        if (truckRecords != null) {
            truckRecords.forEach(truck => truckRecordsMapped.push(TruckMap_1.TruckMap.toDomain(truck)));
            return truckRecordsMapped;
        }
        else
            return null;
    }
};
TruckRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('truckSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], TruckRepo);
exports.default = TruckRepo;
//# sourceMappingURL=truckRepo.js.map