import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';

import { ITruckDTO } from "../dto/ITruckDTO";
import { Truck } from "../domain/truck";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class TruckMap extends Mapper<Truck> {
  
  public static toDTO( truck: Truck): ITruckDTO {
    return {
      id: truck.id.toString(),
      tare: truck.tare,
      load_capacity: truck.load_capacity,
      max_battery_charge: truck.max_battery_charge,
      autonomy: truck.autonomy,
      fast_charging_time: truck.fast_charging_time
    } as ITruckDTO;
  }

  public static toDomain (truck: any | Model<ITruckPersistence & Document> ): Truck {
    const truckOrError = Truck.create(
      truck,
      new UniqueEntityID(truck.domainId)
    );

    truckOrError.isFailure ? console.log(truckOrError.error) : '';

    return truckOrError.isSuccess ? truckOrError.getValue() : null;
  }

  public static toPersistence (truck: Truck): any {
    return {
      domainId: truck.id.toString(),
      tare: truck.tare,
      load_capacity: truck.load_capacity,
      max_battery_charge: truck.max_battery_charge,
      autonomy: truck.autonomy,
      fast_charging_time: truck.fast_charging_time
    }
  }
}