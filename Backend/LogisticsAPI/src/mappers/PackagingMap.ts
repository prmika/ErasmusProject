import { Mapper } from "../core/infra/Mapper";

import { Document, Model } from 'mongoose';
import { IPackagingPersistence } from '../dataschema/IPackagingPersistence';

import { IPackagingDTO } from "../dto/IPackagingDTO";
import { Packaging } from "../domain/packaging";

import { UniqueEntityID } from "../core/domain/UniqueEntityID";

export class PackagingMap extends Mapper<Packaging> {
  
  public static toDTO( packaging: Packaging): IPackagingDTO {
    return {
      id: packaging.id.toString(),
      truckToPlace: packaging.truckToPlace,
      deliveryId: packaging.deliveryId,
      placementX: packaging.placementX,
      placementY: packaging.placementY,
      placementZ: packaging.placementZ,
      timeToLoad: packaging.timeToLoad,
      timeToUnload: packaging.timeToUnload
    } as IPackagingDTO;
  }

  public static toDomain (packaging: any | Model<IPackagingPersistence & Document> ): Packaging {
    const packagingOrError = Packaging.create(
      packaging,
      new UniqueEntityID(packaging.domainId)
    );

    packagingOrError.isFailure ? console.log(packagingOrError.error) : '';

    return packagingOrError.isSuccess ? packagingOrError.getValue() : null;
  }

  public static toPersistence (packaging: Packaging): any {
    return {
      domainId: packaging.id.toString(),
      truckToPlace: packaging.truckToPlace,
      deliveryId: packaging.deliveryId,
      placementX: packaging.placementX,
      placementY: packaging.placementY,
      placementZ: packaging.placementZ,
      timeToLoad: packaging.timeToLoad,
      timeToUnload: packaging.timeToUnload
    }
  }
}