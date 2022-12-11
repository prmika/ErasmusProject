import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { DeliveryPathId } from "./deliverypathId";

import { IDeliveryPathDTO } from "../dto/IDeliveryPathDTO";

interface DeliveryPathProps {
    departure_warehouseId: string;
    destination_warehouseId: string;
    distance: Number;
    time: Number;
    used_battery: Number;
    extra_time_when_charging_required: Number;
}

export class DeliveryPath extends AggregateRoot<DeliveryPathProps> {
    get id (): UniqueEntityID {
        return this._id;
    }

    get deliverypathId (): DeliveryPathId {
        return new DeliveryPathId(this.deliverypathId.toValue());
    }

    get departure_warehouseId (): string {
        return this.props.departure_warehouseId;
    }

    set departure_warehouseId ( value: string) {
        this.props.departure_warehouseId = value;
    }

    get destination_warehouseId (): string {
        return this.props.destination_warehouseId;
    }

    set destination_warehouseId ( value: string) {
        this.props.destination_warehouseId = value;
    }

    get distance (): Number {
        return this.props.distance;
    }

    set distance ( value: Number) {
        this.props.distance = value;
    }

    get time (): Number {
        return this.props.time;
    }

    set time ( value: Number) {
        this.props.time = value;
    }

    get used_battery (): Number {
        return this.props.used_battery;
    }

    set used_battery ( value: Number) {
        this.props.used_battery = value;
    }

    get extra_time_when_charging_required (): Number {
        return this.props.extra_time_when_charging_required;
    }

    set extra_time_when_charging_required ( value: Number) {
        this.props.extra_time_when_charging_required = value;
    }

    private constructor (props: DeliveryPathProps, id: UniqueEntityID) {
        super(props, id);
    }

    public static create (deliverypathDTO: IDeliveryPathDTO, id: UniqueEntityID): Result<DeliveryPath> {
        const departure_warehouseId = deliverypathDTO.departure_warehouseId;
        const destination_warehouseId = deliverypathDTO.destination_warehouseId;
        const distance = deliverypathDTO.distance;
        const time = deliverypathDTO.time;
        const used_battery = deliverypathDTO.used_battery;
        const extra_time_when_charging_required = deliverypathDTO.extra_time_when_charging_required;

        if ((id.toValue().length <= 0 || id.toValue() == undefined) && (!!departure_warehouseId === false || departure_warehouseId === "" || departure_warehouseId == undefined) && (!!destination_warehouseId === false || destination_warehouseId === "" || destination_warehouseId == undefined) && (!!distance === false || distance === 0)
            && (!!time === false || time === 0) && (!!used_battery === false || used_battery === 0) && (!!extra_time_when_charging_required === false || extra_time_when_charging_required === 0)) {
            return Result.fail<DeliveryPath>('Must provide all the delivery path properties!')
        } else {
            const deliverypath = new DeliveryPath({ departure_warehouseId: departure_warehouseId, destination_warehouseId: destination_warehouseId, distance: distance, time: time, used_battery: used_battery, extra_time_when_charging_required: extra_time_when_charging_required}, id);
            return Result.ok<DeliveryPath>(deliverypath)
        }
    }
}
