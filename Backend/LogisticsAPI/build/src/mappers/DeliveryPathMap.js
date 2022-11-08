"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPathMap = void 0;
const Mapper_1 = require("../core/infra/Mapper");
const deliverypath_1 = require("../domain/deliverypath");
const UniqueEntityID_1 = require("../core/domain/UniqueEntityID");
class DeliveryPathMap extends Mapper_1.Mapper {
    static toDTO(deliverypath) {
        return {
            id: deliverypath.id.toString(),
            departure_warehouseId: deliverypath.departure_warehouseId,
            destination_warehouseId: deliverypath.destination_warehouseId,
            distance: deliverypath.distance,
            time: deliverypath.time,
            used_battery: deliverypath.used_battery,
            extra_time_when_charging_required: deliverypath.extra_time_when_charging_required
        };
    }
    static toDomain(deliverypath) {
        const deliverypathOrError = deliverypath_1.DeliveryPath.create(deliverypath, new UniqueEntityID_1.UniqueEntityID(deliverypath.domainId));
        deliverypathOrError.isFailure ? console.log(deliverypathOrError.error) : '';
        return deliverypathOrError.isSuccess ? deliverypathOrError.getValue() : null;
    }
    static toPersistence(deliverypath) {
        return {
            domainId: deliverypath.id.toString(),
            departure_warehouseId: deliverypath.departure_warehouseId,
            destination_warehouseId: deliverypath.destination_warehouseId,
            distance: deliverypath.distance,
            time: deliverypath.time,
            used_battery: deliverypath.used_battery,
            extra_time_when_charging_required: deliverypath.extra_time_when_charging_required
        };
    }
}
exports.DeliveryPathMap = DeliveryPathMap;
//# sourceMappingURL=DeliveryPathMap.js.map