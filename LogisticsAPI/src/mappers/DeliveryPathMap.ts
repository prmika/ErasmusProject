import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IDeliveryPathPersistence } from '../dataschema/IDeliveryPathPersistence';

import {IDeliveryPathDTO} from "../dto/IDeliveryPathDTO";
import { DeliveryPath } from "../domain/DeliveryPath";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class DeliveryPathMap extends Mapper<DeliveryPath> {

    public static toDTO( deliverypath: DeliveryPath): IDeliveryPathDTO {
        return {
            id: deliverypath.id.toString(),
            departure_warehouseId: deliverypath.departure_warehouseId,
            destination_warehouseId: deliverypath.destination_warehouseId,
            distance: deliverypath.distance,
            used_battery: deliverypath.used_battery,
            extra_time_when_charging_required: deliverypath.extra_time_when_charging_required
        } as IDeliveryPathDTO;
    }

    public static toDomain (deliverypath: any | Model<IDeliveryPathPersistence & Document> ): DeliveryPath {
        const deliverypathOrError = DeliveryPath.create(
            deliverypath,
            new UniqueEntityID(deliverypath.domainId)
        );

        deliverypathOrError.isFailure ? console.log(deliverypathOrError.error) : '';

        return deliverypathOrError.isSuccess ? deliverypathOrError.getValue() : null;
    }

    public static toPersistence (deliverypath: DeliveryPath): any {
        return {
            domainId: deliverypath.id.toString(),
            tare: deliverypath.tare,
            load_capacity: deliverypath.load_capacity,
            max_battery_charge: deliverypath.max_battery_charge,
            autonomy: deliverypath.autonomy,
            fast_charging_time: deliverypath.fast_charging_time
        }
    }
}