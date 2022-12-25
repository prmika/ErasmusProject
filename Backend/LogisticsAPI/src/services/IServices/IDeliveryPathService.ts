import { Result } from "../../core/logic/Result";
import { IDeliveryPathDTO } from "../../dto/IDeliveryPathDTO";

export default interface IDeliveryPathService  {
    createDeliveryPath(deliverypathDTO: IDeliveryPathDTO): Promise<Result<IDeliveryPathDTO>>;
    updateDeliveryPath(deliverypathId: string, deliverypathDTO: IDeliveryPathDTO): Promise<Result<IDeliveryPathDTO>>;
    getDeliveryPath (deliverypathId: string): Promise<Result<IDeliveryPathDTO>>;
    getAllDeliveryPaths(): Promise<Result<IDeliveryPathDTO[]>>;
    getAllDeliveryPathsPaged(page: Number, numberOfItems: Number): Promise<Result<IDeliveryPathDTO[]>>;
}
