import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { TruckId } from "./truckId";

import { ITruckDTO } from "../dto/ITruckDTO";

interface TruckProps {
    tare: Number;
    load_capacity: Number;
    max_battery_charge: Number;
    autonomy: Number;
    fast_charging_time: Number;
}

export class Truck extends AggregateRoot<TruckProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get truckId (): TruckId {
    return new TruckId(this.truckId.toValue());
  }

  get tare (): Number {
    return this.props.tare;
  }

  set tare ( value: Number) {
    this.props.tare = value;
  }

  get load_capacity (): Number {
    return this.props.load_capacity;
  }

  set load_capacity ( value: Number) {
    this.props.load_capacity = value;
  }

  get max_battery_charge (): Number {
    return this.props.max_battery_charge;
  }

  set max_battery_charge ( value: Number) {
    this.props.max_battery_charge = value;
  }

  get autonomy (): Number {
    return this.props.autonomy;
  }

  set autonomy ( value: Number) {
    this.props.autonomy = value;
  }

  get fast_charging_time (): Number {
    return this.props.fast_charging_time;
  }

  set fast_charging_time ( value: Number) {
    this.props.fast_charging_time = value;
  }

  private constructor (props: TruckProps, id: UniqueEntityID) {
    super(props, id);
  }

  public static create (truckDTO: ITruckDTO, id: UniqueEntityID): Result<Truck> {
    const tare = truckDTO.tare;
    const load_capacity = truckDTO.load_capacity;
    const max_battery_charge = truckDTO.max_battery_charge;
    const autonomy = truckDTO.autonomy;
    const fast_charging_time = truckDTO.fast_charging_time;

    if ((id.toValue().toString().length < 6 || id.toValue().toString().length > 6) || (!!tare === false || tare === 0) || (!!load_capacity === false || load_capacity === 0) || (!!max_battery_charge === false || max_battery_charge === 0) 
    && (!!autonomy === false || autonomy === 0) || (!!fast_charging_time === false || fast_charging_time === 0)) {
      return Result.fail<Truck>('Must provide all the truck properties and id (aka licenseplate) needs a length of 6!')
    } else {
      const truck = new Truck({ tare: tare, load_capacity: load_capacity, max_battery_charge: max_battery_charge, autonomy: autonomy, fast_charging_time: fast_charging_time}, id);
      return Result.ok<Truck>(truck)
    }
  }
}
