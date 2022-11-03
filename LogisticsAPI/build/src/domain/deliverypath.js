"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DeliveryPath = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const deliverypathId_1 = require("./deliverypathId");
class DeliveryPath extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get deliverypathId() {
        return new deliverypathId_1.DeliveryPathId(this.deliverypathId.toValue());
    }
    get departure_warehouseId() {
        return this.props.departure_warehouseId;
    }
    set departure_warehouseId(value) {
        this.props.departure_warehouseId = value;
    }
    get destination_warehouseId() {
        return this.props.destination_warehouseId;
    }
    set destination_warehouseId(value) {
        this.props.destination_warehouseId = value;
    }
    get distance() {
        return this.props.distance;
    }
    set distance(value) {
        this.props.distance = value;
    }
    get time() {
        return this.props.time;
    }
    set time(value) {
        this.props.time = value;
    }
    get used_battery() {
        return this.props.used_battery;
    }
    set used_battery(value) {
        this.props.used_battery = value;
    }
    get extra_time_when_charging_required() {
        return this.props.extra_time_when_charging_required;
    }
    set extra_time_when_charging_required(value) {
        this.props.extra_time_when_charging_required = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(deliverypathDTO, id) {
        const departure_warehouseId = deliverypathDTO.departure_warehouseId;
        const destination_warehouseId = deliverypathDTO.destination_warehouseId;
        const distance = deliverypathDTO.distance;
        const time = deliverypathDTO.time;
        const used_battery = deliverypathDTO.used_battery;
        const extra_time_when_charging_required = deliverypathDTO.extra_time_when_charging_required;
        if ((!!departure_warehouseId === false || departure_warehouseId === "" || departure_warehouseId == undefined) && (!!destination_warehouseId === false || destination_warehouseId === "" || destination_warehouseId == undefined) && (!!distance === false || distance === 0)
            && (!!time === false || time === 0) && (!!used_battery === false || used_battery === 0) && (!!extra_time_when_charging_required === false || extra_time_when_charging_required === 0)) {
            return Result_1.Result.fail('Must provide all the delivery path properties!');
        }
        else {
            const deliverypath = new DeliveryPath({ departure_warehouseId: departure_warehouseId, destination_warehouseId: destination_warehouseId, distance: distance, time: time, used_battery: used_battery, extra_time_when_charging_required: extra_time_when_charging_required }, id);
            return Result_1.Result.ok(deliverypath);
        }
    }
}
exports.DeliveryPath = DeliveryPath;
//# sourceMappingURL=deliverypath.js.map