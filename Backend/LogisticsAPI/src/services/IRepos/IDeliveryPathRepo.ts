import { Repo } from "../../core/infra/Repo";
import { DeliveryPath } from "../../domain/deliverypath";
import { DeliveryPathId } from "../../domain/deliverypathId";

export default interface IDeliveryPathRepo extends Repo<DeliveryPath> {
    save(deliverypath: DeliveryPath): Promise<DeliveryPath>;
    findByDomainId (deliverypathId: DeliveryPathId | string): Promise<DeliveryPath>;
    findAll (): Promise<DeliveryPath[]>;
    findAllPaged(page: Number, numberOfItems : Number): Promise<DeliveryPath[]>;
    //findByIds (deliverypathIds: DeliveryPathId[]): Promise<DeliveryPath[]>;
    //saveCollection (deliverypaths: DeliveryPath[]): Promise<DeliveryPath[]>;
    //removeByRoleIds (deliverypaths: DeliveryPathId[]): Promise<any>
}