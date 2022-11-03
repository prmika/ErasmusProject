import { Result } from "../../core/logic/Result";
import { IPackagingDTO } from "../../dto/IPackagingDTO";

export default interface IPackagingService  {
  createPackaging(packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>>;
  updatePackaging(packagingId: string, packagingDTO: IPackagingDTO): Promise<Result<IPackagingDTO>>;
  getPackaging(packagingId: string): Promise<Result<IPackagingDTO>>;
  getAllPackages(): Promise<Result<IPackagingDTO[]>>;
}
