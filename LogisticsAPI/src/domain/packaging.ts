import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PackagingId } from "./packagingId";

import { IPackagingDTO } from "../dto/IPackagingDTO";

interface PackagingProps {
    product: string;
    width: Number;
    height: Number;
    depth: Number;
    weight: Number;
    timeToLoad: Number;
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

  get width (): Number {
    return this.props.width;
  }

  set width ( value: Number) {
    this.props.width = value;
  }

  get height (): Number {
    return this.props.height;
  }

  set height ( value: Number) {
    this.props.height = value;
  }

  get depth (): Number {
    return this.props.depth;
  }

  set depth ( value: Number) {
    this.props.depth = value;
  }

  get weight (): Number {
    return this.props.weight;
  }

  set weight ( value: Number) {
    this.props.weight = value;
  }

  get timeToLoad (): Number {
    return 0.5 + (0.02 * this.weight.valueOf());
  }

  /*set timeToLoad ( value: Number) {
    this.props.timeToLoad = 0.5 + (0.02 * this.weight.valueOf());
  }*/

  private constructor (props: PackagingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (packagingDTO: IPackagingDTO, id?: UniqueEntityID): Result<Packaging> {
    const product = packagingDTO.product;
    const width = packagingDTO.width;
    const height = packagingDTO.height;
    const depth = packagingDTO.depth;
    const weight = packagingDTO.weight;
    //const timeToLoad = packagingDTO.timeToLoad;

    /*if ((!!product === false || product.length === 0) && (!!width === false || width === 0) && (!!height === false || height === 0) && (!!depth === false || depth === 0) && (!!weight === false || weight === 0) && (!!timeToLoad === false || timeToLoad === 0)) {
      return Result.fail<Packaging>('Must provide all the package properties!')
    }*/
    if ((width >= 9) && (height > 10) && (depth > 20)) {
      return Result.fail<Packaging>('Package is too big!')
    }
    else {
      const packaging = new Packaging({ product: product, width: width, height: height, depth: depth, weight: weight, timeToLoad: 0.5 }, id);
      return Result.ok<Packaging>(packaging)
    }
  }
}
