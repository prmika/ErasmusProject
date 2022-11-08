import { Result } from "../../core/logic/Result";
import { ITruckDTO } from "../../dto/ITruckDTO";

export default interface ITruckService  {
  createTruck(truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  updateTruck(truckId: string, truckDTO: ITruckDTO): Promise<Result<ITruckDTO>>;
  getTruck (truckId: string): Promise<Result<ITruckDTO>>;
  getAllTrucks(): Promise<Result<ITruckDTO[]>>;
}
