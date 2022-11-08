import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import IDeliveryPathService from "../services/IServices/IDeliveryPathService";
import DeliveryPathController from "../controllers/deliverypathController";
import { IDeliveryPathDTO } from '../dto/IDeliveryPathDTO';
import { DeliveryPath } from '../domain/deliverypath';
import assert from 'assert';
import { DeliveryPathMap } from '../mappers/DeliveryPathMap';
import DeliveryPathRepo from './deliverypathRepo';
import { IDeliveryPathPersistence } from '../dataschema/IDeliveryPathPersistence';
import { Document, Model } from 'mongoose';
import { ObjectId } from 'mongodb';

describe('delivery path repository', function () {
    const sandbox = sinon.createSandbox();

    beforeEach(function () {
        Container.reset();
        let deliverypathSchemaInstance = require("../persistence/schemas/deliverypathSchema").default;
        Container.set("deliverypathSchema", deliverypathSchemaInstance);

        let deliverypathRepoClass = require("../repos/deliverypathRepo").default;
        let deliverypathRepoInstance = Container.get(deliverypathRepoClass);
        Container.set("DeliveryPathRepo", deliverypathRepoInstance);

        let deliverypathServiceClass = require("../services/deliverypathService").default;
        let deliverypathServiceInstance = Container.get(deliverypathServiceClass);
        Container.set("DeliveryPathService", deliverypathServiceInstance);
    });

    afterEach(function () {
        sandbox.restore();
    });

    it('deliverypathRepo exists unit test using deliverypathSchema stub', async function () {
        // Arrange
        let deliverypath: Result<DeliveryPath> = DeliveryPath.create({
            "id": "123", "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 31.2,
            "time": 3,
            "used_battery": 60,
            "extra_time_when_charging_required": 20,
        } as IDeliveryPathDTO);

        let convertedDeliveryPath: DeliveryPath = deliverypath.getValue() as DeliveryPath; //We create the delivery path that we want to check for its existence.


        let deliverypathSchemaInstance = Container.get("deliverypathSchema");//We mock deliverypathSchema
        let tempSpy = sandbox.stub(deliverypathSchemaInstance, "findOne").returns(Result.ok<IDeliveryPathPersistence>({ //Mock the findOne method of DeliveryPathSchema
            domainId: 'a5efbb7d-3380-4c14-85da-6434b245132d',
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 31.2,
            "time": 3,
            "used_battery": 60,
            "extra_time_when_charging_required": 20,
        }));

        const repo = new DeliveryPathRepo(deliverypathSchemaInstance as Model<IDeliveryPathPersistence & Document>);

        // Act
        let result = await repo.exists(convertedDeliveryPath); //Check if pre-created deliverypath exists
        // Assert
        tempSpy.callsFake(() => {
            sandbox.assert.calledOnce();
            sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
                "departure_warehouseId": "W01",
                "destination_warehouseId": "W02",
                "distance": 31.2,
                "time": 3,
                "used_battery": 60,
                "extra_time_when_charging_required": 20,
            }));
            sandbox.done();
        });

        assert.ok(result); //Will return true because delivery path exists.
    });

    it('deliverypathRepo save unit test using deliverypathSchema stub', async function () {
        // Arrange
        let deliverypath: Result<DeliveryPath> = DeilveryPath.create({
            "id": "123", "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 31.2,
            "time": 3,
            "used_battery": 60,
            "extra_time_when_charging_required": 20,
        } as IDeliveryPathDTO);

        let convertedDeliveryPath: DeliveryPath = deliverypath.getValue() as DeliveryPath; //We create the delivery path that we want to save.


        let deliverypathSchemaInstance = Container.get("deliverypathSchema");//We mock deliverypathSchema
        let tempSpy = sandbox.stub(deliverypathSchemaInstance, "findOne").returns(null); //We want the system to return null which means the delivery path doesn't exist yet.
        let tempSpy2 = sandbox.stub(deliverypathSchemaInstance, "create").returns(convertedDeliveryPath); //The method will return a delivery path that was created with the data we sent.
        const repo = new DeliveryPathRepo(deliverypathSchemaInstance as Model<IDeliveryPathPersistence & Document>);

        // Act
        let result = await repo.save(convertedDeliveryPath);
        // Assert
        tempSpy.callsFake(() => {
            sandbox.assert.calledOnce();
            sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
                "departure_warehouseId": "W01",
                "destination_warehouseId": "W02",
                "distance": 31.2,
                "time": 3,
                "used_battery": 60,
                "extra_time_when_charging_required": 20,
            }));
            sandbox.done();
        });
        tempSpy2.callsFake(() => {
            sandbox.assert.calledOnce();
            sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
                "departure_warehouseId": "W01",
                "destination_warehouseId": "W02",
                "distance": 31.2,
                "time": 3,
                "used_battery": 60,
                "extra_time_when_charging_required": 20,
            }));
            sandbox.done();
        });

        assert.ok(result);//A delivery path will be returned (not null because the delivery path will be saved successfully)
    });

    it('deliverypathRepo findByDomainId unit test using deliverypathSchema stub', async function () {
        // Arrange

        let deliverypathSchemaInstance = Container.get("deliverypathSchema");//We mock deliverypathSchema
        let tempSpy = sandbox.stub(deliverypathSchemaInstance, "findOne").returns(Result.ok<IDeliveryPathPersistence>({//findOne method will return a part of IDeliveryPathPersistence which findByDomain
            domainId: 'a5efbb7d-3380-4c14-85da-6434b245132d',                                            //will use to return in case the Id is known in a real world (not mock) situation
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 31.2,
            "time": 3,
            "used_battery": 60,
            "extra_time_when_charging_required": 20,
        }));
        const repo = new DeliveryPathRepo(deliverypathSchemaInstance as Model<IDeliveryPathPersistence & Document>);

        // Act
        let result = await repo.findByDomainId("a5efbb7d-3380-4c14-85da-6434b245132d");
        // Assert
        tempSpy.callsFake(() => {
            sandbox.assert.calledOnce();
            sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
                "departure_warehouseId": "W01",
                "destination_warehouseId": "W02",
                "distance": 31.2,
                "time": 3,
                "used_battery": 60,
                "extra_time_when_charging_required": 20,
            }));
            sandbox.done();
        });

        assert.ok(result);//Result is a delivery path that has the sane id as the one given to the method
    });

    it('deliverypathRepo findByDomainId unit test when result is null (using deliverypathSchema stub)', async function () {
        // Arrange

        let deliverypathSchemaInstance = Container.get("deliverypathSchema");
        let tempSpy = sandbox.stub(deliverypathSchemaInstance, "findOne").returns(null);//findOne should return null, which means it doesn't find a delivery path with the given deliverypathId
        const repo = new DeliveryPathRepo(deliverypathSchemaInstance as Model<IDeliveryPathPersistence & Document>);

        // Act
        let result = await repo.findByDomainId("a5efbb7d-3380-4c14-85da-6434b245132d");
        // Assert
        tempSpy.callsFake(() => {
            sandbox.assert.calledOnce();
            sandbox.assert.calledWith(sandbox.match(null));//Will return true if it was null
            sandbox.done();
        });

        assert.equal(null, result);//The findByDomainId method will return null
    });
});