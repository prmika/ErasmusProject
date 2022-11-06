import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import IDeliveryPathService from "../services/IServices/IDeliveryPathService";
import DeliveryPathController from "../controllers/deliverypathController";
import { IDeliveryPathDTO } from '../dto/IDeliveryPathDTO';
import { DeliveryPath } from '../domain/deliverypath';
import DeliveryPathService from './deliverypathService';
import IDeliveryPathRepo from './IRepos/IDeliveryPathRepo';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import assert from 'assert';
import DeliveryPathRepo from "../repos/deliverypathRepo";

describe('deliverypath service', function () {
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


    it('deliverypathService getDeliveryPath unit test using deliverypathRepo stub', async function () {
        // Arrange
        let body = {
            "id": "D01",
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 43.7,
            "time": 32.74,
            "used_battery": 54.8,
            "extra_time_when_charging_required": 40
        };

        let deliverypathRepoInstance = Container.get("DeliveryPathRepo");//We mock deliverypathRepo
        let tempSpy = sandbox.stub(deliverypathRepoInstance, "findByDomainId").returns(DeliveryPath.create({
            "id": "D01",
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 43.7,
            "time": 32.74,
            "used_battery": 54.8,
            "extra_time_when_charging_required": 40
        } as IDeliveryPathDTO).getValue() as DeliveryPath);//When the deliverypathService needs the method findByDomainId, it will return this DeliveryPath

        const srvc = new DeliveryPathService(deliverypathRepoInstance as IDeliveryPathRepo);

        // Act
        let result = await srvc.getDeliveryPath("D01");

        // Assert
        tempSpy.callsFake(() => {
            sandbox.assert.calledOnce();
            sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
                "id": body.id,
                "departure_warehouseId": body.departure_warehouseId,
                "destination_warehouseId": body.destination_warehouseId,
                "distance": body.distance,
                "time": body.time,
                "used_battery": body.used_battery,
                "extra_time_when_charging_required": 40
            }));
            sandbox.done();
        });

        assert.notEqual(result, null);//The findByDomainId will have returned a deliverypath which means the getDeliveryPath will also return a deliverypath. Therefore it can't be null
    });

    it('deliverypathService getAllDeliveryPaths unit test using deliverypathRepo stub', async function () {
        // Arrange
        let body = {
            "id": "D01",
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 43.7,
            "time": 32.74,
            "used_battery": 54.8,
            "extra_time_when_charging_required": 40
        };

        let deliverypathRepoInstance = Container.get("DeliveryPathRepo");//We mock deliverypathRepo
        let tempSpy = sandbox.stub(deliverypathRepoInstance, "findAll").returns([DeliveryPath.create({
            "id": "D01",
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 43.7,
            "time": 32.74,
            "used_battery": 54.8,
            "extra_time_when_charging_required": 40,
        } as IDeliveryPathDTO).getValue() as DeliveryPath, DeliveryPath.create({
            "id": "D02",
            "departure_warehouseId": "W02",
            "destination_warehouseId": "W03",
            "distance": 47.7,
            "time": 38.74,
            "used_battery": 84.8,
            "extra_time_when_charging_required": 20,
        } as IDeliveryPathDTO).getValue() as DeliveryPath] as DeliveryPath[]);//When the deliverypathService needs the method findAll, it will return a list with DeliveryPaths

        const srvc = new DeliveryPathService(deliverypathRepoInstance as IDeliveryPathDTO);

        // Act
        await srvc.getAllDeliveryPaths();//Will successfully retrieve a list with deliverypath because of the Mock

        // Assert
        tempSpy.callsFake(() => {
            sandbox.assert.calledOnce();
            sandbox.assert.calledWith(sandbox.match([{//Will return true if those attributes and their values are indeed the one that were called
                "id": "D01",
                "departure_warehouseId": "W01",
                "destination_warehouseId": "W02",
                "distance": 43.7,
                "time": 32.74,
                "used_battery": 54.8,
                "extra_time_when_charging_required": 40,
            }, {
                "id": "D02",
                "departure_warehouseId": "W02",
                "destination_warehouseId": "W03",
                "distance": 47.7,
                "time": 38.74,
                "used_battery": 84.8,
                "extra_time_when_charging_required": 20
            }]));
            sandbox.done();
        });
    });

    it('deliverypathService updateDeliveryPath unit test using deliverypathRepo stub', async function () {
        // Arrange
        let body = {
            "id": "D01",
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 43.7,
            "time": 32.74,
            "used_battery": 54.8,
            "extra_time_when_charging_required": 40
        };

        let deliverypathRepoInstance = Container.get("DeliveryPathRepo");//We mock deliverypathRepo
        let tempSpy = sandbox.stub(deliverypathRepoInstance, "findByDomainId").returns(DeliveryPath.create({//When the deliverypathService needs the method findByDomainId, it will return this DeliveryPath
            "id": "D01",
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 43.7,
            "time": 32.74,
            "used_battery": 54.8,
            "extra_time_when_charging_required": 40
        } as IDeliveryPathDTO).getValue() as DeliveryPath);

        let tempSpy2 = sandbox.stub(deliverypathRepoInstance, "save").returns(DeliveryPath.create({//When the deliverypathService needs the method save, it will return this created DeliveryPath
            "id": "D01",
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 43.7,
            "time": 32.74,
            "used_battery": 54.8,
            "extra_time_when_charging_required": 40
        } as IDeliveryPathDTO).getValue() as DeliveryPath);

        const srvc = new DeliveryPathService(deliverypathRepoInstance as IDeliveryPathDTO);

        // Act
        let result = await srvc.updateDeliveryPath("D01",body as IDeliveryPathDTO);

        // Assert
        tempSpy.callsFake(() => {
            sandbox.assert.calledOnce();
            sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
                "id": body.id,
                "departure_warehouseId": body.departure_warehouseId,
                "destination_warehouseId": body.destination_warehouseId,
                "distance": body.distance,
                "time": body.time,
                "used_battery": body.used_battery,
                "extra_time_when_charging_required": body.extra_time_when_charging_required
            }));
            sandbox.done();
        });

        tempSpy2.callsFake(() => {
            sandbox.assert.calledOnce();
            sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
                "id": body.id,
                "departure_warehouseId": body.departure_warehouseId,
                "destination_warehouseId": body.destination_warehouseId,
                "distance": body.distance,
                "time": body.time,
                "used_battery": body.used_battery,
                "extra_time_when_charging_required": body.extra_time_when_charging_required
            }));
            sandbox.done();
        });

        assert.notEqual(result, null);//The findByDomainId and save method will have returned a deliverypath which means the updateDeliveryPath will also return a deliverypath. Therfore it can't be null
    });
});


