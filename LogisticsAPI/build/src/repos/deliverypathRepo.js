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
const deliverypathId_1 = require("../domain/deliverypathId");
const DeliveryPathMap_1 = require("../mappers/DeliveryPathMap");
const mongoose_1 = require("mongoose");
let DeliveryPathRepo = class DeliveryPathRepo {
    constructor(deliverypathSchema) {
        this.deliverypathSchema = deliverypathSchema;
    }
    createBaseQuery() {
        return {
            where: {},
        };
    }
    async exists(deliverypath) {
        const idX = deliverypath.id instanceof deliverypathId_1.DeliveryPathId ? deliverypath.id.toValue() : deliverypath.id;
        const query = { domainId: idX };
        const deliverypathDocument = await this.deliverypathSchema.findOne(query);
        return !!deliverypathDocument === true;
    }
    async save(deliverypath) {
        const query = { domainId: deliverypath.id.toString() };
        const deliverypathDocument = await this.deliverypathSchema.findOne(query);
        try {
            if (deliverypathDocument === null) {
                const rawDeliveryPath = DeliveryPathMap_1.DeliveryPathMap.toPersistence(deliverypath);
                const deliverypathCreated = await this.deliverypathSchema.create(rawDeliveryPath);
                return DeliveryPathMap_1.DeliveryPathMap.toDomain(deliverypathCreated);
            }
            else {
                deliverypathDocument.departure_warehouseId = deliverypath.departure_warehouseId;
                deliverypathDocument.destination_warehouseId = deliverypath.destination_warehouseId;
                deliverypathDocument.distance = deliverypath.distance;
                deliverypathDocument.time = deliverypath.time;
                deliverypathDocument.used_battery = deliverypath.used_battery;
                deliverypathDocument.extra_time_when_charging_required = deliverypath.extra_time_when_charging_required;
                await deliverypathDocument.save();
                return deliverypath;
            }
        }
        catch (err) {
            throw err;
        }
    }
    async findByDomainId(deliverypathId) {
        const query = { domainId: deliverypathId };
        const deliverypathRecord = await this.deliverypathSchema.findOne(query);
        if (deliverypathRecord != null) {
            return DeliveryPathMap_1.DeliveryPathMap.toDomain(deliverypathRecord);
        }
        else
            return null;
    }
    async findAll() {
        const deliverypathRecords = await this.deliverypathSchema.find({});
        let deliverypathRecordsMapped = [];
        if (deliverypathRecords != null) {
            deliverypathRecords.forEach(deliverypath => deliverypathRecordsMapped.push(DeliveryPathMap_1.DeliveryPathMap.toDomain(deliverypath)));
            return deliverypathRecordsMapped;
        }
        else
            return null;
    }
};
DeliveryPathRepo = __decorate([
    (0, typedi_1.Service)(),
    __param(0, (0, typedi_1.Inject)('deliverypathSchema')),
    __metadata("design:paramtypes", [mongoose_1.Model])
], DeliveryPathRepo);
exports.default = DeliveryPathRepo;
//# sourceMappingURL=deliverypathRepo.js.map