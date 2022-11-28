import { AggregateRoot } from "../core/domain/AggregateRoot";
import { UniqueEntityID } from "../core/domain/UniqueEntityID";

import { Result } from "../core/logic/Result";
import { PackagingId } from "./packagingId";

import { IPackagingDTO } from "../dto/IPackagingDTO";


interface PackagingProps {
    truckToPlace: string;
    deliveryId: string;
    placementX: Number;
    placementY: Number;
    placementZ: Number;
}

export class Packaging extends AggregateRoot<PackagingProps> {
  get id (): UniqueEntityID {
    return this._id;
  }

  get packagingId (): PackagingId {
    return new PackagingId(this.packagingId.toValue());
  }

  get truckToPlace (): string {
    return this.props.truckToPlace;
  }

  set truckToPlace ( value: string) {
    this.props.truckToPlace = value;
  }

  get deliveryId (): string {
    return this.props.deliveryId;
  }

  set deliveryId ( value: string) {
    this.props.deliveryId = value;
  }

  get placementX (): Number {
    return this.props.placementX;
  }

  set placementX ( value: Number) {
    this.props.placementX = value;
  }

  get placementY (): Number {
    return this.props.placementY;
  }

  set placementY ( value: Number) {
    this.props.placementY = value;
  }

  get placementZ (): Number {
    return this.props.placementZ;
  }

  set placementZ ( value: Number) {
    this.props.placementZ = value;
  }

  private constructor (props: PackagingProps, id?: UniqueEntityID) {
    super(props, id);
  }

  public static create (packagingDTO: IPackagingDTO, id?: UniqueEntityID): Result<Packaging> {
    const truckToPlace = packagingDTO.truckToPlace;
    const deliveryId = packagingDTO.deliveryId;
    const placementX = packagingDTO.placementX;
    const placementY = packagingDTO.placementY;
    const placementZ = packagingDTO.placementZ;

    /*if ((!!product === false || product.length === 0) && (!!width === false || width === 0) && (!!height === false || height === 0) && (!!depth === false || depth === 0) && (!!weight === false || weight === 0) && (!!timeToLoad === false || timeToLoad === 0)) {
      return Result.fail<Packaging>('Must provide all the package properties!')
    }*/
    if ((!!truckToPlace === false || truckToPlace.length === 0) && (!!deliveryId === false || deliveryId.length === 0) && (!!placementX === false || placementX < 0 || placementX >= 10) && (!!placementY === false || placementY < 0 || placementY >= 20) && (!!placementZ === false || placementZ < 0 || placementZ >= 8)) {
      return Result.fail<Packaging>('Must provide all the package properties!')
    }
    else {
      const packaging = new Packaging({ truckToPlace: truckToPlace, deliveryId: deliveryId, placementX: placementX, placementY: placementY, placementZ: placementZ }, id);
      return Result.ok<Packaging>(packaging)
    }
  }
}
