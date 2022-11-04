import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import ITruckService from "../services/IServices/ITruckService";
import TruckController from "../controllers/truckController";
import { ITruckDTO } from '../dto/ITruckDTO';
import { Truck } from '../domain/truck';
import assert from 'assert';
import { TruckMap } from '../mappers/TruckMap';

describe('truck controller', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function () {
		Container.reset();
		let truckSchemaInstance = require("../persistence/schemas/truckSchema").default;
		Container.set("truckSchema", truckSchemaInstance);

		let truckRepoClass = require("../repos/truckRepo").default;
		let truckRepoInstance = Container.get(truckRepoClass);
		Container.set("TruckRepo", truckRepoInstance);

		let truckServiceClass = require("../services/truckService").default;
		let truckServiceInstance = Container.get(truckServiceClass);
		Container.set("TruckService", truckServiceInstance);
	});

	afterEach(function () {
		sandbox.restore();
	});

	it('truckController createTruck unit test using truckService stub', async function () {
		// Arrange
		let body = { //Declare body for the request, which will be used to create a truck
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		};
		let req: Partial<Request> = {};
		req.body = body;
		let res: Partial<Response> = {
			json: sandbox.spy()//We spy on the json result
		};
		let next: Partial<NextFunction> = () => { };

		let truckServiceInstance = Container.get("TruckService");//We mock truckService
		sandbox.stub(truckServiceInstance, "createTruck").returns(Result.ok<ITruckDTO>({//When the truckController needs the method create, it will return a TruckDTO object with these attributes
			"id": "123",
			"tare": req.body.tare,
			"load_capacity": req.body.load_capacity,
			"max_battery_charge": req.body.max_battery_charge,
			"autonomy": req.body.autonomy,
			"fast_charging_time": req.body.fast_charging_time
		}));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);//The createtruck method is called with  req, res, and next parameters. Req contains data necessary for the function 
																				//to run successfully and Res will contain the results (truck object - not null)
		// Assert
		sandbox.assert.calledOnce(res.json);
		sandbox.assert.calledWith(res.json, sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
			"id": "123", "tare": req.body.tare,
			"load_capacity": req.body.load_capacity,
			"max_battery_charge": req.body.max_battery_charge,
			"autonomy": req.body.autonomy,
			"fast_charging_time": req.body.fast_charging_time
		}));
	});
	

	it('truckController getTruck unit test using truckService stub', async function () {
		// Arrange
		let req: Partial<Request> = {};
		req.params = { "truckId": "123" };//The req should contain a truckId for the getTruck method to be performed successfully
		let res: Partial<Response> = {
			json: sandbox.spy()//We spy on the json result
		};
		let next: Partial<NextFunction> = () => { };

		let truckServiceInstance = Container.get("TruckService");//We mock truckService
		sandbox.stub(truckServiceInstance, "getTruck").returns(Result.ok<ITruckDTO>({//When the truckController needs the method getTruck, it will return a TruckDTO object with this attributes
			"id": "123",
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		}));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.getTruck(<Request>req, <Response>res, <NextFunction>next);//This will return a Truck, or any Truck kind different from null

		// Assert
		sandbox.assert.calledOnce(res.json);
		sandbox.assert.calledWith(res.json, sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
			"id": "123", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		}));
	});

	it('truckController getAllTrucks unit test using truckService stub', async function () {
		// Arrange
		let req: Partial<Request> = {};
		let res: Partial<Response> = {
			json: sandbox.spy() //We spy on the json result
		};
		let next: Partial<NextFunction> = () => { };

		let truckServiceInstance = Container.get("TruckService"); //We mock truckService
		sandbox.stub(truckServiceInstance, "getAllTrucks").returns(Result.ok<ITruckDTO[]>([{//When the truckController needs the method getAllTrucks, it will return a list of TruckDTO objects with these attributes
			"id": "W01",
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		},
		{
			"id": "W02",
			"tare": 30,
			"load_capacity": 41.76,
			"max_battery_charge": 43.7,
			"autonomy": 24.87,
			"fast_charging_time": 57.43
		}]));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.getAllTrucks(<Request>req, <Response>res, <NextFunction>next);//This will return a list of Trucks, or any Truck kind of list that is different from null

		// Assert
		sandbox.assert.calledOnce(res.json);
		sandbox.assert.calledWith(res.json, sandbox.match([{//Will return true if those attributes and their values are indeed the one that were called
			"id": "W01",
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		},
		{
			"id": "W02",
			"tare": 30,
			"load_capacity": 41.76,
			"max_battery_charge": 43.7,
			"autonomy": 24.87,
			"fast_charging_time": 57.43
		}]));
	});

	it('truckController updateTruck unit test using truckService stub', async function () {
		// Arrange
		let body = { //Declare body for the request, which will be used to create a truck
			"id": "W01",
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		};
		let req: Partial<Request> = {};
		req.body = body; //Requests needs a body
		req.params = { "truckId": "W01" };//The req should contain a truckId for the getTruck method to be performed successfully
		let res: Partial<Response> = {
			json: sandbox.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let truckServiceInstance = Container.get("TruckService");//We mock truckService
		let tempSpy = sandbox.stub(truckServiceInstance, "updateTruck").returns(Result.ok<ITruckDTO>({//When the truckController needs the method updateTruck, it will return a TruckDTO object with these attributes
			"id": req.body.id,
			"tare": req.body.tare,
			"load_capacity": req.body.load_capacity,
			"max_battery_charge": req.body.max_battery_charge,
			"autonomy": req.body.autonomy,
			"fast_charging_time": req.body.fast_charging_time
		}));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		await ctrl.updateTruck(<Request>req, <Response>res, <NextFunction>next);//This will return a Truck, or any Truck kind different from null, which means it was updated successfully
		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce(res.json);
			sandbox.assert.calledWith(res.json, sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"id": req.body.id, "tare": req.body.tare,
				"load_capacity": req.body.load_capacity,
				"max_battery_charge": req.body.max_battery_charge,
				"autonomy": req.body.autonomy,
				"fast_charging_time": req.body.fast_charging_time
			}));
			sandbox.done();
		});

	});

	it('Create truck', function () {
		let truck: Result<Truck> = Truck.create({ //Creates a truck object
			"id": "123", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		} as ITruckDTO);

		let convertedTruck: Truck = truck.getValue() as Truck;

		//Check if all parameters are correct and equal to the ones assigned
		assert.equal(convertedTruck.tare,29.70);  
		assert.equal(convertedTruck.load_capacity,33.75);  
		assert.equal(convertedTruck.max_battery_charge,43.7);  
		assert.equal(convertedTruck.autonomy,32.74);  
		assert.equal(convertedTruck.fast_charging_time,54.8);  
	});

	it('Create and update truck', function () {
		let truck: Result<Truck> = Truck.create({ //Creates a truck object
			"id": "123", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		} as ITruckDTO);

		let convertedTruck: Truck = truck.getValue() as Truck;

		//Check if all parameters are correct and equal to the ones assigned
		assert.equal(convertedTruck.tare,29.70);  
		assert.equal(convertedTruck.load_capacity,33.75);  
		assert.equal(convertedTruck.max_battery_charge,43.7);  
		assert.equal(convertedTruck.autonomy,32.74);  
		assert.equal(convertedTruck.fast_charging_time,54.8);  
		
		//Changes values
		convertedTruck.tare = 30;
		convertedTruck.load_capacity = 45;
		convertedTruck.max_battery_charge = 90;
		convertedTruck.autonomy = 25;
		convertedTruck.fast_charging_time = 46.7;

		//Values are replaced
		//Check if all parameters are correct and equal to the ones assigned (not the older values anymore)
		assert.notEqual(convertedTruck.tare,29.70);  
		assert.notEqual(convertedTruck.load_capacity,33.75);  
		assert.notEqual(convertedTruck.max_battery_charge,43.7);  
		assert.notEqual(convertedTruck.autonomy,32.74);  
		assert.notEqual(convertedTruck.fast_charging_time,54.8);  

		assert.equal(convertedTruck.tare,30);  
		assert.equal(convertedTruck.load_capacity,45);  
		assert.equal(convertedTruck.max_battery_charge,90);  
		assert.equal(convertedTruck.autonomy,25);  
		assert.equal(convertedTruck.fast_charging_time,46.7);  

	});

	it('Map truck data', function () {
		let truck: Result<Truck> = Truck.create({ //Creates a truck object
			"id": "123", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		} as ITruckDTO);

		

		let convertedTruck: Truck = truck.getValue() as Truck;

		//Check if toDTO maps correctly and values are still the same
		let truckDto = TruckMap.toDTO(convertedTruck);
		assert.equal(truckDto.tare,29.70);  
		assert.equal(truckDto.load_capacity,33.75);  
		assert.equal(truckDto.max_battery_charge,43.7);  
		assert.equal(truckDto.autonomy,32.74);  
		assert.equal(truckDto.fast_charging_time,54.8);  

		//Check if toDomain maps correctly and values are still the same
		let truckDomain = TruckMap.toDomain(convertedTruck);
		assert.equal(truckDomain.tare,29.70);  
		assert.equal(truckDomain.load_capacity,33.75);  
		assert.equal(truckDomain.max_battery_charge,43.7);  
		assert.equal(truckDomain.autonomy,32.74);  
		assert.equal(truckDomain.fast_charging_time,54.8);  

		//Check if toPersistence maps correctly and values are still the same
		let truckPersistence = TruckMap.toPersistence(convertedTruck);
		assert.equal(truckPersistence.tare,29.70);  
		assert.equal(truckPersistence.load_capacity,33.75);  
		assert.equal(truckPersistence.max_battery_charge,43.7);  
		assert.equal(truckPersistence.autonomy,32.74);  
		assert.equal(truckPersistence.fast_charging_time,54.8);  
	});

	it('Check if 2 trucks are equal to each other', function () {
		let truck: Result<Truck> = Truck.create({ //Creates a truck object
			"id": "123", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		} as ITruckDTO);

		let convertedTruck: Truck = truck.getValue() as Truck;
		let convertedTruck2: Truck = truck.getValue() as Truck;
		
		//Check if both created Trucks are equal to each others (it should)
		assert.ok(convertedTruck.equals(convertedTruck2))
	});

	it('truckController + truckService integration test using truckRepoistory and Truck stubs', async function () {
		// Arrange	
		let body = { //Declare body for the request, which will be used to create a truck
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sandbox.spy()
		};
		let next: Partial<NextFunction> = () => { };

		sandbox.stub(Truck, "create").returns(Result.ok({ //Create method will return Truck with these attributes and values
			"id": "123", "tare": req.body.tare,
			"load_capacity": req.body.load_capacity,
			"max_battery_charge": req.body.max_battery_charge,
			"autonomy": req.body.autonomy,
			"fast_charging_time": req.body.fast_charging_time
		}));

		let truckRepoInstance = Container.get("TruckRepo");//We mock truckRepo
		sandbox.stub(truckRepoInstance, "save").returns(new Promise<Truck>((resolve, reject) => {
			resolve(Truck.create({ //We resolve the data when creating the truck and get + check the value
				"id": "123", "tare": req.body.tare,
				"load_capacity": req.body.load_capacity,
				"max_battery_charge": req.body.max_battery_charge,
				"autonomy": req.body.autonomy,
				"fast_charging_time": req.body.fast_charging_time
			}).getValue())
		}));

		let truckServiceInstance = Container.get("TruckService");//We mock truckService

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sandbox.assert.calledOnce(res.json);
		sandbox.assert.calledWith(res.json, sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
			"id": "123",
			"tare": req.body.tare,
			"load_capacity": req.body.load_capacity,
			"max_battery_charge": req.body.max_battery_charge,
			"autonomy": req.body.autonomy,
			"fast_charging_time": req.body.fast_charging_time
		}));
	});
});


