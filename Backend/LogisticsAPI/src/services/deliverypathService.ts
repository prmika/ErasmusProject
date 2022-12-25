import { Service, Inject } from 'typedi';
import config from "../../config";
import { IDeliveryPathDTO } from '../dto/IDeliveryPathDTO';
import { DeliveryPath } from "../domain/deliverypath";
import IDeliveryPathRepo from '../services/IRepos/IDeliveryPathRepo';
import IDeliveryPathService from './IServices/IDeliveryPathService';
import { Result } from "../core/logic/Result";
import { DeliveryPathMap } from "../mappers/DeliveryPathMap";
import Logger from '../loaders/logger';
import { DeliveryPathId } from '../domain/deliverypathId';

@Service()
export default class DeliveryPathService implements IDeliveryPathService {
    constructor(
        @Inject(config.repos.deliverypath.name) private deliverypathRepo: IDeliveryPathRepo
    ) { }

    public async getDeliveryPath(deliverypathId: string): Promise<Result<IDeliveryPathDTO>> {
        try {
            const deliverypath = await this.deliverypathRepo.findByDomainId(deliverypathId);

            if (deliverypath === null) {
                return Result.fail<IDeliveryPathDTO>("Delivery path not found");
            }
            else {
                const deliverypathDTOResult = DeliveryPathMap.toDTO(deliverypath) as IDeliveryPathDTO;
                return Result.ok<IDeliveryPathDTO>(deliverypathDTOResult)
            }
        } catch (e) {
            throw e;
        }
    }

    public async getAllDeliveryPaths(): Promise<Result<IDeliveryPathDTO[]>> {
        try {
            const deliverypath = await this.deliverypathRepo.findAll();

            if (deliverypath === null) {
                return Result.fail<IDeliveryPathDTO[]>("No delivery path were found.");
            }
            else {
                let deliverypathDTOMappedResults = [] as IDeliveryPathDTO[];
                deliverypath.forEach(deliverypath => deliverypathDTOMappedResults.push(DeliveryPathMap.toDTO(deliverypath) as IDeliveryPathDTO))
                return Result.ok<IDeliveryPathDTO[]>(deliverypathDTOMappedResults)
            }
        } catch (e) {
            throw e;
        }
    }

    public async getAllDeliveryPathsPaged(page: Number, numberOfItems: Number): Promise<Result<IDeliveryPathDTO[]>> {
        try {
            const deliverypath = await this.deliverypathRepo.findAllPaged(page, numberOfItems);
      
            if (deliverypath === null) {
              return Result.fail<IDeliveryPathDTO[]>("No packages were found.");
            }
            else {
              let packagingDTOMappedResults = [] as IDeliveryPathDTO[];
              deliverypath.forEach(packaging => packagingDTOMappedResults.push(DeliveryPathMap.toDTO(packaging) as IDeliveryPathDTO))
              return Result.ok<IDeliveryPathDTO[]>(packagingDTOMappedResults)
            }
          } catch (e) {
            throw e;
          }
    }

    public async createDeliveryPath(deliverypathDTO: IDeliveryPathDTO): Promise<Result<IDeliveryPathDTO>> {
        try {

            const deliverypathOrError = await DeliveryPath.create(deliverypathDTO);

            if (deliverypathOrError.isFailure) {
                return Result.fail<IDeliveryPathDTO>(deliverypathOrError.errorValue());
            }

            const deliverypathResult = deliverypathOrError.getValue();

            await this.deliverypathRepo.save(deliverypathResult);

            const deliverypathDTOResult = DeliveryPathMap.toDTO(deliverypathResult) as IDeliveryPathDTO;
            return Result.ok<IDeliveryPathDTO>(deliverypathDTOResult)
        } catch (e) {
            throw e;
        }
    }

    public async updateDeliveryPath(deliverypathId: string, deliverypathDTO: IDeliveryPathDTO): Promise<Result<IDeliveryPathDTO>> {
        try {
            if (deliverypathId == deliverypathDTO.id) {
                const deliverypath = await this.deliverypathRepo.findByDomainId(deliverypathDTO.id);
                if (deliverypath === null) {
                    return Result.fail<IDeliveryPathDTO>("Delivery path not found");
                }
                else {
                    deliverypath.departure_warehouseId = deliverypathDTO.departure_warehouseId;
                    deliverypath.destination_warehouseId = deliverypathDTO.destination_warehouseId;
                    deliverypath.distance = deliverypathDTO.distance;
                    deliverypath.time = deliverypathDTO.time;
                    deliverypath.used_battery = deliverypathDTO.used_battery;
                    deliverypath.extra_time_when_charging_required = deliverypathDTO.extra_time_when_charging_required;
                    await this.deliverypathRepo.save(deliverypath);

                    const deliverypathDTOResult = DeliveryPathMap.toDTO(deliverypath) as IDeliveryPathDTO;
                    return Result.ok<IDeliveryPathDTO>(deliverypathDTOResult)
                }
            }
            else{
                return Result.fail<IDeliveryPathDTO>("Delivery path Id doesn't match with Id in URL. Please make sure both match.");
            }
        } catch (e) {
            throw e;
        }
    }
}
