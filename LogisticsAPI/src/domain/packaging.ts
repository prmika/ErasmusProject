import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PackagingId } from "./packagingId";

import { IPackagingDTO } from "../dto/IPackagingDTO";

interface PackagingProps {
    product: string;
    weight: Number;
}

export class Packaging extends AggregateRoot<PackagingProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get packagingId (): PackagingId {
    return new PackagingId(this.packagingId.toValue());
  }

  get product (): string {
    return this.props.product;
  }

  set product ( value: string) {
    this.props.product = value;
  }

  get weight (): Number {
    return this.props.weight;
  }

  set weight ( value: Number) {
    this.props.weight = value;
  }

  private constructor (props: PackagingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (packagingDTO: IPackagingDTO, id?: UniqueEntityID): Result<Packaging> {
    const product = packagingDTO.product;
    const weight = packagingDTO.weight;

    if ((!!weight === false || weight === 0) && (!!product === false || product.length === 0)) {
      return Result.fail<Packaging>('Must provide all the packaging properties!')
    } else {
      const packaging = new Packaging({ weight: weight, product: product }, id);
      return Result.ok<Packaging>(packaging)
    }
  }
}
