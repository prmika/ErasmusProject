
/// import uuid from 'uuid/v4';
/// import {v4 as uuidv4} from 'uuid';
import { Identifier } from './Identifier'

export class UniqueEntityID extends Identifier<string>{
  constructor (id: string) {
//    super(id ? id : uuid()) 
    super(id)   //jart
  }
}