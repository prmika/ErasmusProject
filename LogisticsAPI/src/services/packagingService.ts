import { Service, Inject } from 'typedi';
import config from "../../config";
import { IPackagingDTO } from '../dto/IPackagingDTO';
import { Packaging } from "../domain/packaging";
import IPackagingRepo from '../services/IRepos/IPackagingRepo';
import IPackagingService from './IServices/IPackagingService';
import { Result } from "../core/logic/Result";
import { PackagingMap } from "../mappers/PackagingMap";
import Logger from '../loaders/logger';

@Service()
export default class PackagingService implements IPackagingService {
  constructor(
    @Inject(config.repos.packaging.name) private packagingRepo: IPackagingRepo
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

  public async createPackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>> {
    try {

      const packagingOrError = await Packaging.create(packagingDTO);

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
        else {
          packaging.product = packagingDTO.product;
          packaging.width = packagingDTO.width;
          packaging.height = packagingDTO.height;
          packaging.depth = packagingDTO.depth;
          packaging.weight = packagingDTO.weight;
          packaging.timeToLoad = packagingDTO.timeToLoad;
          await this.packagingRepo.save(packaging);

          const packagingDTOResult = PackagingMap.toDTO(packaging) as IPackagingDTO;
          return Result.ok<IPackagingDTO>(packagingDTOResult)
        }
      }
      else{
        return Result.fail<IPackagingDTO>("PackagingId doesn't match with Id in URL. Please make sure both match.");
      }
    } catch (e) {
      throw e;
    }
  }
}
