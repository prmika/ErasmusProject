import { Result } from "../../core/logic/Result";
import { User } from "../../domain/user";
import { IUserDTO } from "../../dto/IUserDTO";

export default interface IUserService  {
  SignUp(userDTO: IUserDTO): Promise<Result<{userDTO: IUserDTO, token: string}>>;
  getUser(email: string): Promise<Result<IUserDTO>>
}
