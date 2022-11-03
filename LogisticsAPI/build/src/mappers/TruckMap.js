"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TruckMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const truck_1 = require("../domain/truck");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class TruckMap extends Mapper_1.Mapper {
    static toDTO(truck) {
        return {
            id: truck.id.toString(),
            tare: truck.tare,
            load_capacity: truck.load_capacity,
            max_battery_charge: truck.max_battery_charge,
            autonomy: truck.autonomy,
            fast_charging_time: truck.fast_charging_time
        };
    }
    static toDomain(truck) {
        const truckOrError = truck_1.Truck.create(truck, new UniqueEntityID_1.UniqueEntityID(truck.domainId));
        truckOrError.isFailure ? console.log(truckOrError.error) : '';
        return truckOrError.isSuccess ? truckOrError.getValue() : null;
    }
    static toPersistence(truck) {
        return {
            domainId: truck.id.toString(),
            tare: truck.tare,
            load_capacity: truck.load_capacity,
            max_battery_charge: truck.max_battery_charge,
            autonomy: truck.autonomy,
            fast_charging_time: truck.fast_charging_time
        };
    }
}
exports.TruckMap = TruckMap;
//# sourceMappingURL=TruckMap.js.map