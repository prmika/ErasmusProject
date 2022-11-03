"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueEntityID = void 0;
/// import uuid from 'uuid/v4';
/// import {v4 as uuidv4} from 'uuid';
const uuidv4 = require('uuid').v4; // jart
const Identifier_1 = require("./Identifier");
class UniqueEntityID extends Identifier_1.Identifier {
    constructor(id) {
        //    super(id ? id : uuid()) 
        super(id ? id : uuidv4()); //jart
    }
}
exports.UniqueEntityID = UniqueEntityID;
//# sourceMappingURL=UniqueEntityID.js.map