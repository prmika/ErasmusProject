import { Service, Inject } from 'typedi';

import IDeliveryPathRepo from "../services/IRepos/IDeliveryPathRepo";
import { DeliveryPath } from "../domain/deliverypath";
import { DeliveryPathId } from "../domain/deliverypathId";
import { DeliveryPathMap } from "../mappers/DeliveryPathMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IDeliveryPathPersistence } from '../dataschema/IDeliveryPathPersistence';

@Service()
export default class DeliveryPathRepo implements IDeliveryPathRepo {
    private models: any;

    constructor(
        @Inject('deliverypathSchema') private deliverypathSchema : Model<IDeliveryPathPersistence & Document>,
    ) {}

    private createBaseQuery (): any {
        return {
            where: {},
        }
    }

    public async exists(deliverypath: DeliveryPath): Promise<boolean> {

        const idX = deliverypath.id instanceof DeliveryPathId ? (<DeliveryPathId>deliverypath.id).toValue() : deliverypath.id;

        const query = { domainId: idX};
        const deliverypathDocument = await this.deliverypathSchema.findOne( query as FilterQuery<IDeliveryPathPersistence & Document>);

        return !!deliverypathDocument === true;
    }

    public async save (deliverypath: DeliveryPath): Promise<DeliveryPath> {
        const query = { domainId: deliverypath.id.toString()};

        const deliverypathDocument = await this.deliverypathSchema.findOne( query );

        try {
            if (deliverypathDocument === null ) {
                const rawDeliveryPath: any = DeliveryPathMap.toPersistence(deliverypath);

                const deliverypathCreated = await this.deliverypathSchema.create(rawDeliveryPath);

                return DeliveryPathMap.toDomain(deliverypathCreated);
            } else {
                deliverypathDocument.departure_warehouseId = deliverypath.departure_warehouseId;
                deliverypathDocument.destination_warehouseId = deliverypath.destination_warehouseId;
                deliverypathDocument.distance = deliverypath.distance;
                deliverypathDocument.time = deliverypath.time;
                deliverypathDocument.used_battery = deliverypath.used_battery;
                deliverypathDocument.extra_time_when_charging_required = deliverypath.extra_time_when_charging_required;
                await deliverypathDocument.save();

                return deliverypath;
            }
        } catch (err) {
            throw err;
        }
    }

    public async findByDomainId (deliverypathId: DeliveryPathId | string): Promise<DeliveryPath> {
        const query = { domainId: deliverypathId};
        const deliverypathRecord = await this.deliverypathSchema.findOne( query as FilterQuery<IDeliveryPathPersistence & Document> );

        if( deliverypathRecord != null) {
            return DeliveryPathMap.toDomain(deliverypathRecord);
        }
        else
            return null;
    }

    public async findAll (): Promise<DeliveryPath[]> {
        const deliverypathRecords = await this.deliverypathSchema.find({});
        let deliverypathRecordsMapped = [] as DeliveryPath[];
        if( deliverypathRecords != null) {
            deliverypathRecords.forEach(deliverypath => deliverypathRecordsMapped.push(DeliveryPathMap.toDomain(deliverypath)))
            return deliverypathRecordsMapped;
        }
        else
            return null;
    }

    public async findAllPaged (page: number, numberOfItems : number): Promise<DeliveryPath[]> {
        const deliverypathRecords = await this.deliverypathSchema.find({});
        let deliverypathRecordsMapped = [] as DeliveryPath[];
        if( deliverypathRecords != null) {
            deliverypathRecords.forEach(deliverypath => deliverypathRecordsMapped.push(DeliveryPathMap.toDomain(deliverypath)))
            const amountToSkip: number = (page - 1) * numberOfItems;
            return deliverypathRecordsMapped.splice(amountToSkip,numberOfItems);
        }
        else
            return null;
    }

}