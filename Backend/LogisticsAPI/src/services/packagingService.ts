import { Service, Inject } from 'typedi';
import config from "../../config";
import { IPackagingDTO } from '../dto/IPackagingDTO';
import { Packaging } from "../domain/packaging";
import { Truck } from '../domain/truck';
import IPackagingRepo from '../services/IRepos/IPackagingRepo';
import IPackagingService from './IServices/IPackagingService';
import ITruckRepo from './IRepos/ITruckRepo';
import ITruckService from './IServices/ITruckService';
import { Result } from "../core/logic/Result";
import { PackagingMap } from "../mappers/PackagingMap";
import Logger from '../loaders/logger';
import { ITruckDTO } from '../dto/ITruckDTO';




@Service()
export default class PackagingService implements IPackagingService {
  constructor(
    @Inject(config.repos.packaging.name) private packagingRepo: IPackagingRepo,
    @Inject(config.repos.truck.name) private truckRepo: ITruckRepo
  ) { }

  public async getPackaging(packagingId: string): Promise<Result<IPackagingDTO>> {
    try {
      const packaging = await this.packagingRepo.findByDomainId(packagingId);

      if (packaging === null) {
        return Result.fail<IPackagingDTO>("Packaging not found");
      }
      else {
        const packagingDTOResult = PackagingMap.toDTO(packaging) as IPackagingDTO;
        return Result.ok<IPackagingDTO>(packagingDTOResult)
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllPackages(): Promise<Result<IPackagingDTO[]>> {
    try {
      const packages = await this.packagingRepo.findAll();

      if (packages === null) {
        return Result.fail<IPackagingDTO[]>("No packages were found.");
      }
      else {
        let packagingDTOMappedResults = [] as IPackagingDTO[];
        packages.forEach(packaging => packagingDTOMappedResults.push(PackagingMap.toDTO(packaging) as IPackagingDTO))
        return Result.ok<IPackagingDTO[]>(packagingDTOMappedResults)
      }
    } catch (e) {
      throw e;
    }
  }

  public async getAllPackagesPaged(page: Number, numberOfItems: Number): Promise<Result<IPackagingDTO[]>> {
    try {
      const packages = await this.packagingRepo.findAllPaged(page, numberOfItems);

      if (packages === null) {
        return Result.fail<IPackagingDTO[]>("No packages were found.");
      }
      else {
        let packagingDTOMappedResults = [] as IPackagingDTO[];
        packages.forEach(packaging => packagingDTOMappedResults.push(PackagingMap.toDTO(packaging) as IPackagingDTO))
        return Result.ok<IPackagingDTO[]>(packagingDTOMappedResults)
      }
    } catch (e) {
      throw e;
    }
  }

  public async createPackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>> {
    try {
      /* fetch("https://localhost:5001/api/Deliveries", {
        method: 'GET',
        agent: httpsAgent,
      })
        .then(res => {
          return res.json()
        })
        .then(data => {
          console.log(data)
        })
        .catch(error => {
          console.log(error)
        }) */

      const packagingOrError = await Packaging.create(packagingDTO);
      const truck = await this.truckRepo.findByDomainId(packagingDTO.truckToPlace);
      const packages = await this.packagingRepo.findAll();

      if (packages.map(package_ => package_.deliveryId).includes(packagingDTO.deliveryId)) {
        return Result.fail<IPackagingDTO>("Duplicate delivery Id");
      }

      if (truck === null) {
        return Result.fail<IPackagingDTO>("Truck not found");
      }

      if (packagingOrError.isFailure) {
        return Result.fail<IPackagingDTO>(packagingOrError.errorValue());
      }
      const packagingResult = packagingOrError.getValue();
      await this.packagingRepo.save(packagingResult);
      const packagingDTOResult = PackagingMap.toDTO(packagingResult) as IPackagingDTO;
      return Result.ok<IPackagingDTO>(packagingDTOResult)
    } catch (e) {
      throw e;
    }
  }

  public async updatePackaging(packagingId: string, packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>> {
    try {
      if (packagingId == packagingDTO.id) {
        const packaging = await this.packagingRepo.findByDomainId(packagingDTO.id);

        if (packaging === null) {
          return Result.fail<IPackagingDTO>("Package not found");
        }

        const truck = await this.truckRepo.findByDomainId(packagingDTO.truckToPlace);
        const packages = await this.packagingRepo.findAll();
        if (packages.map(package_ => package_.deliveryId).includes(packagingDTO.deliveryId) && packaging.deliveryId != packagingDTO.deliveryId) {
          return Result.fail<IPackagingDTO>("Duplicate delivery Id");
        }

        if (truck === null) {
          return Result.fail<IPackagingDTO>("Truck not found");
        }
        else {
          packaging.truckToPlace = packagingDTO.truckToPlace;
          packaging.deliveryId = packagingDTO.deliveryId;
          packaging.placementX = packagingDTO.placementX;
          packaging.placementY = packagingDTO.placementY;
          packaging.placementZ = packagingDTO.placementZ;
          await this.packagingRepo.save(packaging);

          const packagingDTOResult = PackagingMap.toDTO(packaging) as IPackagingDTO;
          return Result.ok<IPackagingDTO>(packagingDTOResult)
        }
      }
      else {
        return Result.fail<IPackagingDTO>("PackagingId doesn't match with Id in URL. Please make sure both match.");
      }
    } catch (e) {
      throw e;
    }
  }
}
