"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Truck = void 0;
const AggregateRoot_1 = require("../core/domain/AggregateRoot");
const Result_1 = require("../core/logic/Result");
const truckId_1 = require("./truckId");
class Truck extends AggregateRoot_1.AggregateRoot {
    get id() {
        return this._id;
    }
    get truckId() {
        return new truckId_1.TruckId(this.truckId.toValue());
    }
    get tare() {
        return this.props.tare;
    }
    set tare(value) {
        this.props.tare = value;
    }
    get load_capacity() {
        return this.props.load_capacity;
    }
    set load_capacity(value) {
        this.props.load_capacity = value;
    }
    get max_battery_charge() {
        return this.props.max_battery_charge;
    }
    set max_battery_charge(value) {
        this.props.max_battery_charge = value;
    }
    get autonomy() {
        return this.props.autonomy;
    }
    set autonomy(value) {
        this.props.autonomy = value;
    }
    get fast_charging_time() {
        return this.props.fast_charging_time;
    }
    set fast_charging_time(value) {
        this.props.fast_charging_time = value;
    }
    constructor(props, id) {
        super(props, id);
    }
    static create(truckDTO, id) {
        const tare = truckDTO.tare;
        const load_capacity = truckDTO.load_capacity;
        const max_battery_charge = truckDTO.max_battery_charge;
        const autonomy = truckDTO.autonomy;
        const fast_charging_time = truckDTO.fast_charging_time;
        if ((!!tare === false || tare === 0) && (!!load_capacity === false || load_capacity === 0) && (!!max_battery_charge === false || max_battery_charge === 0)
            && (!!autonomy === false || autonomy === 0) && (!!fast_charging_time === false || fast_charging_time === 0)) {
            return Result_1.Result.fail('Must provide all the truck properties!');
        }
        else {
            const truck = new Truck({ tare: tare, load_capacity: load_capacity, max_battery_charge: max_battery_charge, autonomy: autonomy, fast_charging_time: fast_charging_time }, id);
            return Result_1.Result.ok(truck);
        }
    }
}
exports.Truck = Truck;
//# sourceMappingURL=truck.js.map