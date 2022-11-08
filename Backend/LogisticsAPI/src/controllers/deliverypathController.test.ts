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

describe('delivery path controller', function () {
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

    it('deliverypathController createDeliveryPath unit test using deliverypathService stub', async function () {
        // Arrange
        let body = { //Declare body for the request, which will be used to create a deliverypath
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 32.3,
            "time": 12.5,
            "used_battery": 33.2,
            "extra_time_when_charging_required": 10
        };
        let req: Partial<Request> = {};
        req.body = body;
        let res: Partial<Response> = {
            json: sandbox.spy()//We spy on the json result
        };
        let next: Partial<NextFunction> = () => { };

        let deliverypathServiceInstance = Container.get("DeliveryPathService");//We mock deliverypathService
        sandbox.stub(deliverypathServiceInstance, "createDeliveryPath").returns(Result.ok<IDeliveryPathDTO>({//When the deliverypathController needs the method create, it will return a DeliverPathDTO object with these attributes
            "id": "123",
            "departure_warehouseId": req.body.departure_warehouseId,
            "destination_warehouseId": req.body.destination_warehouseId,
            "distance": req.body.distance,
            "time": req.body.time,
            "used_battery": req.body.used_battery,
            "extra_time_when_charging_required": req.body.extra_time_when_charging_required
        }));

        const ctrl = new DeliveryPathController(deliverypathServiceInstance as IDeliveryPathService);

        // Act
        await ctrl.createDeliveryPath(<Request>req, <Response>res, <NextFunction>next);//The createdeliverypath method is called with  req, res, and next parameters. Req contains data necessary for the function
                                                                                //to run successfully and Res will contain the results (deliverypath object - not null)
        // Assert
        sandbox.assert.calledOnce(res.json);
        sandbox.assert.calledWith(res.json, sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
            "id": "123", "departure_warehouseId": req.body.departure_warehouseId,
            "destination_warehouseId": req.body.destination_warehouseId,
            "distance": req.body.distance,
            "time": req.body.time,
            "used_battery": req.body.used_battery,
            "extra_time_when_charging_required": req.body.extra_time_when_charging_required
        }));
    });


    it('deliverypathController getDeliveryPath unit test using deliverypathService stub', async function () {
        // Arrange
        let req: Partial<Request> = {};
        req.params = { "deliverypathId": "123" };//The req should contain a deliverypathId for the deliverypathDeliveryPath method to be performed successfully
        let res: Partial<Response> = {
            json: sandbox.spy()//We spy on the json result
        };
        let next: Partial<NextFunction> = () => { };

        let deliverypathServiceInstance = Container.get("DeliveryPathService");//We mock deliverypathService
        sandbox.stub(deliverypathServiceInstance, "getDeliveryPath").returns(Result.ok<IDeliveryPathDTO>({//When the deliverypathController needs the method getDelieryPath, it will return a DeliveryPathDTO object with this attributes
            "id": "123",
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 32.3,
            "time": 12.5,
            "used_battery": 33.2,
            "extra_time_when_charging_required": 10
        }));

        const ctrl = new DeliveryPathController(deliverypathServiceInstance as IDeliveryPathService);

        // Act
        await ctrl.getDeliveryPath(<Request>req, <Response>res, <NextFunction>next);//This will return a DeliveryPath, or any DeliveryPath kind different from null

        // Assert
        sandbox.assert.calledOnce(res.json);
        sandbox.assert.calledWith(res.json, sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
            "id": "123", "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 32.3,
            "time": 12.5,
            "used_battery": 33.2,
            "extra_time_when_charging_required": 10
        }));
    });

    it('deliverypathController getAllDeliveryPath unit test using deliverypathService stub', async function () {
        // Arrange
        let req: Partial<Request> = {};
        let res: Partial<Response> = {
            json: sandbox.spy() //We spy on the json result
        };
        let next: Partial<NextFunction> = () => { };

        let deliverypathServiceInstance = Container.get("DeliveryPathService"); //We mock deliverypathService
        sandbox.stub(deliverypathServiceInstance, "getAllDeliveryPaths").returns(Result.ok<IDeliveryPathDTO[]>([{//When the deliverypathController needs the method getAllDeliveryPaths, it will return a list of DeliveryPathDTO objects with these attributes
            "id": "W01",
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 32.3,
            "time": 12.5,
            "used_battery": 33.2,
            "extra_time_when_charging_required": 10
        },
            {
                "id": "W02",
                "departure_warehouseId": "W02",
                "destination_warehouseId": "W03",
                "distance": 32.3,
                "time": 12.5,
                "used_battery": 33.2,
                "extra_time_when_charging_required": 10
            }]));

        const ctrl = new DeliveryPathController(deliverypathServiceInstance as IDeliveryPathService);

        // Act
        await ctrl.getAllDeliveryPaths(<Request>req, <Response>res, <NextFunction>next);//This will return a list of DeliveryPaths, or any Delivery Path kind of list that is different from null

        // Assert
        sandbox.assert.calledOnce(res.json);
        sandbox.assert.calledWith(res.json, sandbox.match([{//Will return true if those attributes and their values are indeed the one that were called
            "id": "W01",
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 32.3,
            "time": 12.5,
            "used_battery": 33.2,
            "extra_time_when_charging_required": 10
        },
            {
                "id": "W02",
                "departure_warehouseId": "W02",
                "destination_warehouseId": "W03",
                "distance": 32.3,
                "time": 12.5,
                "used_battery": 33.2,
                "extra_time_when_charging_required": 10
            }]));
    });

    it('deliverypathController updateDeliveryPath unit test using deliverypathService stub', async function () {
        // Arrange
        let body = { //Declare body for the request, which will be used to create a deliverypath
            "id": "W01",
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 32.3,
            "time": 12.5,
            "used_battery": 33.2,
            "extra_time_when_charging_required": 10
        };
        let req: Partial<Request> = {};
        req.body = body; //Requests needs a body
        req.params = { "deliverypathId": "W01" };//The req should contain a deliverypathId for the getDeliveryPath method to be performed successfully
        let res: Partial<Response> = {
            json: sandbox.spy()
        };
        let next: Partial<NextFunction> = () => { };

        let deliverypathServiceInstance = Container.get("DeliveryPathService");//We mock deliverypathService
        let tempSpy = sandbox.stub(deliverypathServiceInstance, "updateDeliveryPath").returns(Result.ok<IDeliveryPathDTO>({//When the deliverypathController needs the method updateDeliveryPath, it will return a DeliveryPathDTO object with these attributes
            "id": req.body.id,
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 32.3,
            "time": 12.5,
            "used_battery": 33.2,
            "extra_time_when_charging_required": 10
        }));

        const ctrl = new DeliveryPathController(deliverypathServiceInstance as IDeliveryPathService);

        await ctrl.updateDeliveryPath(<Request>req, <Response>res, <NextFunction>next);//This will return a DeliveryPath, or any DeliveryPath kind different from null, which means it was updated successfully
        // Assert
        tempSpy.callsFake(() => {
            sandbox.assert.calledOnce(res.json);
            sandbox.assert.calledWith(res.json, sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
                "id": req.body.id, "departure_warehouseId": "W01",
                "destination_warehouseId": "W02",
                "distance": 32.3,
                "time": 12.5,
                "used_battery": 33.2,
                "extra_time_when_charging_required": 10
            }));
            sandbox.done();
        });

    });

    it('Create deliverypath', function () {
        let deliverypath: Result<DeliveryPath> = DeliveryPath.create({ //Creates a deliverypath object
            "id": "123", "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 32.3,
            "time": 12.5,
            "used_battery": 33.2,
            "extra_time_when_charging_required": 10
        } as IDeliveryPathDTO);

        let convertedDeliveryPath: DeliveryPath = deliverypath.getValue() as DeliveryPath;

        //Check if all parameters are correct and equal to the ones assigned
        assert.equal(convertedDeliveryPath.departure_warehouseId,29.70);
        assert.equal(convertedDeliveryPath.destination_warehouseId,33.75);
        assert.equal(convertedDeliveryPath.distance,43.7);
        assert.equal(convertedDeliveryPath.time,32.74);
        assert.equal(convertedDeliveryPath.used_battery,54.8);
        assert.equal(convertedDeliveryPath.extra_time_when_charging_required,54.8);
    });

    it('Create and update deliverypath', function () {
        let deliverypath: Result<DeliveryPath> = DeliveryPath.create({ //Creates a deliverypath object
            "id": "123", "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 32.3,
            "time": 12.5,
            "used_battery": 33.2,
            "extra_time_when_charging_required": 10
        } as IDeliveryPathDTO);

        let convertedDeliveryPath: DeliveryPath = deliverypath.getValue() as DeliveryPath;

        //Check if all parameters are correct and equal to the ones assigned
        assert.equal(convertedDeliveryPath.departure_warehouseId,"W01");
        assert.equal(convertedDeliveryPath.destination_warehouseId,33.75);
        assert.equal(convertedDeliveryPath.distance,43.7);
        assert.equal(convertedDeliveryPath.time,32.74);
        assert.equal(convertedDeliveryPath.used_battery,54.8);
        assert.equal(convertedDeliveryPath.extra_time_when_charging_required,54.8);

        //Changes values
        convertedDeliveryPath.departure_warehouseId = "W01";
        convertedDeliveryPath.destination_warehouseId = "W02";
        convertedDeliveryPath.distance = 90;
        convertedDeliveryPath.time = 25;
        convertedDeliveryPath.used_battery = 46.7;
        assert.equal(convertedDeliveryPath.extra_time_when_charging_required,54.8);

        //Values are replaced
        //Check if all parameters are correct and equal to the ones assigned (not the older values anymore)
        assert.notEqual(convertedDeliveryPath.departure_warehouseId,"W01");
        assert.notEqual(convertedDeliveryPath.destination_warehouseId,"W02");
        assert.notEqual(convertedDeliveryPath.distance,43.7);
        assert.notEqual(convertedDeliveryPath.time,32.74);
        assert.notEqual(convertedDeliveryPath.used_battery,54.8);
        assert.equal(convertedDeliveryPath.extra_time_when_charging_required,54.8);

        assert.equal(convertedDeliveryPath.departure_warehouseId,"W01");
        assert.equal(convertedDeliveryPath.destination_warehouseId,"W02");
        assert.equal(convertedDeliveryPath.distance,90);
        assert.equal(convertedDeliveryPath.time,25);
        assert.equal(convertedDeliveryPath.used_battery,46.7);
        assert.equal(convertedDeliveryPath.extra_time_when_charging_required,54.8);

    });

    it('Map deliverypath data', function () {
        let deliverypath: Result<DeliveryPath> = DeliveryPath.create({ //Creates a deliverypath object
            "id": "123", "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 32.3,
            "time": 12.5,
            "used_battery": 33.2,
            "extra_time_when_charging_required": 10
        } as IDeliveryPathDTO);



        let convertedDeliveryPath: DeliveryPath = deliverypath.getValue() as DeliveryPath;

        //Check if toDTO maps correctly and values are still the same
        let deliverypathDto = DeliveryPathMap.toDTO(convertedDeliveryPath);
        assert.equal(deliverypathDto.departure_warehouseId,"W01");
        assert.equal(deliverypathDto.destination_warehouseId,"W02");
        assert.equal(deliverypathDto.distance,43.7);
        assert.equal(deliverypathDto.time,32.74);
        assert.equal(deliverypathDto.used_battery,54.8);
        assert.equal(deliverypathDto.extra_time_when_charging_required,54.8);


        //Check if toDomain maps correctly and values are still the same
        let deliverypathDomain = DeliveryPathMap.toDomain(convertedDeliveryPath);
        assert.equal(deliverypathDomain.departure_warehouseId,"W01");
        assert.equal(deliverypathDomain.destination_warehouseId,"W02");
        assert.equal(deliverypathDomain.distance,43.7);
        assert.equal(deliverypathDomain.time,32.74);
        assert.equal(deliverypathDomain.used_battery,54.8);
        assert.equal(deliverypathDomain.extra_time_when_charging_required,54.8);


        //Check if toPersistence maps correctly and values are still the same
        let deliverypathPersistence = DeliveryPathMap.toPersistence(convertedDeliveryPath);
        assert.equal(deliverypathPersistence.departure_warehouseId,"W01");
        assert.equal(deliverypathPersistence.destination_warehouseId,"W02");
        assert.equal(deliverypathPersistence.distance,43.7);
        assert.equal(deliverypathPersistence.time,32.74);
        assert.equal(deliverypathPersistence.used_battery,54.8);
        assert.equal(deliverypathPersistence.extra_time_when_charging_required,54.8);

    });

    it('Check if 2 deliverypath are equal to each other', function () {
        let deliverypath: Result<DeliveryPath> = DeliveryPath.create({ //Creates a deliverypath object
            "id": "123", "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 32.3,
            "time": 12.5,
            "used_battery": 33.2,
            "extra_time_when_charging_required": 10
        } as IDeliveryPathDTO);

        let convertedDeliveryPath: DeliveryPath = deliverypath.getValue() as DeliveryPath;
        let convertedDeliveryPath2: DeliveryPath = deliverypath.getValue() as DeliveryPath;

        //Check if both created DeliveryPaths are equal to each others (it should)
        assert.ok(convertedDeliveryPath.equals(convertedDeliveryPath2))
    });

    it('deliverypathController + deliverypathService integration test using deliverypathRepoistory and DeliveryPath stubs', async function () {
        // Arrange
        let body = { //Declare body for the request, which will be used to create a deliverypath
            "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 32.3,
            "time": 12.5,
            "used_battery": 33.2,
            "extra_time_when_charging_required": 10
        };
        let req: Partial<Request> = {};
        req.body = body;

        let res: Partial<Response> = {
            json: sandbox.spy()
        };
        let next: Partial<NextFunction> = () => { };

        sandbox.stub(DeliveryPath, "create").returns(Result.ok({ //Create method will return DeliveryPath with these attributes and values
            "id": "123", "departure_warehouseId": "W01",
            "destination_warehouseId": "W02",
            "distance": 32.3,
            "time": 12.5,
            "used_battery": 33.2,
            "extra_time_when_charging_required": 10
        }));

        let deliverypathRepoInstance = Container.get("DeliveryPathRepo");//We mock deliverypathRepo
        sandbox.stub(deliverypathRepoInstance, "save").returns(new Promise<DeliveryPath>((resolve, reject) => {
            resolve(DeliveryPath.create({ //We resolve the data when creating the deliverypath and get + check the value
                "id": "123", "departure_warehouseId": req.body.departure_warehouseId,
                "destination_warehouseId": req.body.destination_warehouseId,
                "distance": req.body.distance,
                "time": req.body.time,
                "used_battery": req.body.used_battery,
                "extra_time_when_charging_required": req.body.extra_time_when_charging_required
            }).getValue())
        }));

        let deliverypathServiceInstance = Container.get("DeliveryPathService");//We mock deliverypathService

        const ctrl = new DeliveryPathController(deliverypathServiceInstance as IDeliveryPathService);

        // Act
        await ctrl.createDeliveryPath(<Request>req, <Response>res, <NextFunction>next);

        // Assert
        sandbox.assert.calledOnce(res.json);
        sandbox.assert.calledWith(res.json, sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
            "id": "123",
            "departure_warehouseId": req.body.departure_warehouseId,
            "destination_warehouseId": req.body.destination_warehouseId,
            "time": req.body.time,
            "used_battery": req.body.used_battery,
            "extra_time_when_charging_required": req.body.extra_time_when_charging_required
        }));
    });
});


