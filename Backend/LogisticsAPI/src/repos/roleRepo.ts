import { Service, Inject } from 'typedi';

import IRoleRepo from "../services/IRepos/IRoleRepo";
import { Role } from "../domain/role";
import { RoleId } from "../domain/roleId";
import { RoleMap } from "../mappers/RoleMap";

import { Document, FilterQuery, Model } from 'mongoose';
import { IRolePersistence } from '../dataschema/IRolePersistence';

@Service()
export default class RoleRepo implements IRoleRepo {
  private models: any;

  constructor(
    @Inject('roleSchema') private roleSchema : Model<IRolePersistence & Document>,
  ) {}

  private createBaseQuery (): any {
    return {
      where: {},
    }
  }

  public async exists(role: Role): Promise<boolean> {
    
    const idX = role.id instanceof RoleId ? (<RoleId>role.id).toValue() : role.id;

    const query = { domainId: idX}; 
    const roleDocument = await this.roleSchema.findOne( query as FilterQuery<IRolePersistence & Document>);

    return !!roleDocument === true;
  }

  public async save (role: Role): Promise<Role> {
    const query = { domainId: role.id.toString()}; 

    const roleDocument = await this.roleSchema.findOne( query );

    try {
      if (roleDocument === null ) {
        const rawRole: any = RoleMap.toPersistence(role);

        const roleCreated = await this.roleSchema.create(rawRole);

        return RoleMap.toDomain(roleCreated);
      } else {
        roleDocument.name = role.name;
        await roleDocument.save();

        return role;
      }
    } catch (err) {
      throw err;
    }
  }

  public async findByDomainId (roleId: RoleId | string): Promise<Role> {
    const query = { domainId: roleId};
    const roleRecord = await this.roleSchema.findOne( query as FilterQuery<IRolePersistence & Document> );

    if( roleRecord != null) {
      return RoleMap.toDomain(roleRecord);
    }
    else
      return null;
  }

  public async findByName (name: string): Promise<Role> {
    const query = { name: name};
    const roleRecord = await this.roleSchema.findOne( query as FilterQuery<IRolePersistence & Document> );

    if( roleRecord != null) {
      return RoleMap.toDomain(roleRecord);
    }
    else
      return null;
  }

  public async findAll (): Promise<Role[]> {
    const RoleRecords = await this.roleSchema.find({});
    let RoleRecordsMapped = [] as Role[];
    if( RoleRecords != null) {
      RoleRecords.forEach(Role => RoleRecordsMapped.push(RoleMap.toDomain(Role)))
      return RoleRecordsMapped;
    }
    else
      return null;
  }
}