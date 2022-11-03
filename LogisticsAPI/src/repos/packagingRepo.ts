import { Service, Inject } from 'typedi';

import IPackagingRepo from "../services/IRepos/IPackagingRepo";
import { Packaging } from "../domain/packaging";
import { PackagingId } from "../domain/packagingId";
import { PackagingMap } from "../mappers/PackagingMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IPackagingPersistence } from '../dataschema/IPackagingPersistence';

@Service()
export default class PackagingRepo implements IPackagingRepo {
  private models: any;

  constructor(
    @Inject('packagingSchema') private packagingSchema : Model<IPackagingPersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(packaging: Packaging): Promise<boolean> {
    
    const idX = packaging.id instanceof PackagingId ? (<PackagingId>packaging.id).toValue() : packaging.id;

    const query = { domainId: idX}; 
    const packagingDocument = await this.packagingSchema.findOne( query as FilterQuery<IPackagingPersistence & Document>);

    return !!packagingDocument === true;
  }

  public async save (packaging: Packaging): Promise<Packaging> {
    const query = { domainId: packaging.id.toString()}; 

    const packagingDocument = await this.packagingSchema.findOne( query );

    try {
      if (packagingDocument === null ) {
        const rawPackaging: any = PackagingMap.toPersistence(packaging);

        const packagingCreated = await this.packagingSchema.create(rawPackaging);

        return PackagingMap.toDomain(packagingCreated);
      } else {
        packagingDocument.product = packaging.product;
        packagingDocument.width = packaging.width;
        packagingDocument.height = packaging.height;
        packagingDocument.depth = packaging.depth;
        packagingDocument.weight = packaging.weight;
        packagingDocument.timeToLoad = packaging.timeToLoad;
        await packagingDocument.save();

        return packaging;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (packagingId: PackagingId | string): Promise<Packaging> {
    const query = { domainId: packagingId};
    const packagingRecord = await this.packagingSchema.findOne( query as FilterQuery<IPackagingPersistence & Document> );

    if( packagingRecord != null) {
      return PackagingMap.toDomain(packagingRecord);
    }
    else
      return null;
  }

  public async findAll (): Promise<Packaging[]> {
    const packagingRecords = await this.packagingSchema.find({});
    let packagingRecordsMapped = [] as Packaging[];
    if( packagingRecords != null) {
      packagingRecords.forEach(packaging => packagingRecordsMapped.push(PackagingMap.toDomain(packaging)))
      return packagingRecordsMapped;
    }
    else
      return null;
  }

}