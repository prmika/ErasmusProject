import { Repo } from "../../core/infra/Repo";
import { Packaging } from "../../domain/packaging";
import { PackagingId } from "../../domain/packagingId";

export default interface IPackagingRepo extends Repo<Packaging> {
  save(packaging: Packaging): Promise<Packaging>;
  findByDomainId (packagingId: PackagingId | string): Promise<Packaging>;
  findAll (): Promise<Packaging[]>;
  //findByIds (packagingIds: PackagingId[]): Promise<Packaging[]>;
  //saveCollection (packages: Packaging[]): Promise<Packaging[]>;
  //removeByRoleIds (packages: PackagingId[]): Promise<any>
}