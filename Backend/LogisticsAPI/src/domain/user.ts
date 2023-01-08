import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";
import { Result } from "../core/logic/Result";
import { UserId } from "./userId";
import { UserEmail } from "./userEmail";
import { Role } from "../domain/role";
import { UserPassword } from "./userPassword";
import { Guard } from "../core/logic/Guard";


interface UserProps {
  firstName: string;
  lastName: string;
  email: UserEmail;
  password: UserPassword;
  role: Role;
  phoneNr: string;
  isActive: Boolean
}

export class User extends AggregateRoot<UserProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get userId (): UserId {
    return UserId.caller(this.id)
  }

  get email (): UserEmail {
    return this.props.email;
  }

  set email(value: UserEmail) {
    this.props.email = value;
  }

  get firstName (): string {
    return this.props.firstName
  }

  set firstName(value: string) {
    this.props.firstName = value;
  }

  get lastName (): string {
    return this.props.lastName;
  }

  set lastName(value: string) {
    this.props.lastName = value;
  }

  get password (): UserPassword {
    return this.props.password;
  }

  set password (value: UserPassword) {
    this.props.password = value;
  }

  get role (): Role {
    return this.props.role;
  }
  
  set role (value: Role) {
      this.props.role = value;
  }

  get phoneNr (): string {
    return this.props.phoneNr;
  }

  set phoneNr (value: string) {
    this.props.phoneNr = value;
  }

  get isActive (): Boolean {
    return this.props.isActive;
  }
  

  private constructor (props: UserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (props: UserProps, id?: UniqueEntityID): Result<User> {

    const guardedProps = [
      { argument: props.firstName, argumentName: 'firstName' },
      { argument: props.lastName, argumentName: 'lastName' },
      { argument: props.email, argumentName: 'email' },
      { argument: props.role, argumentName: 'role' },
      { argument: props.phoneNr, argumentName: 'phoneNr' },
      { argument: props.isActive, argumentName: 'isActive' }
    ];

    const guardResult = Guard.againstNullOrUndefinedBulk(guardedProps);

    if (!guardResult.succeeded) {
      return Result.fail<User>(guardResult.message)
    }     
    else {
      const user = new User({
        ...props
      }, id);

      return Result.ok<User>(user);
    }
  }
}