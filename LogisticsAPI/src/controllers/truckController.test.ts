import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import ITruckService from "../services/IServices/ITruckService";
import TruckController from "../controllers/truckController";
import { ITruckDTO } from '../dto/ITruckDTO';
import { Truck } from '../domain/truck';

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
		let body = {
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		};
		let req: Partial<Request> = {};
		req.body = body;
		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let truckServiceInstance = Container.get("TruckService");
		sinon.stub(truckServiceInstance, "createTruck").returns(Result.ok<ITruckDTO>({
			"id": "123",
			"tare": req.body.tare,
			"load_capacity": req.body.load_capacity,
			"max_battery_charge": req.body.max_battery_charge,
			"autonomy": req.body.autonomy,
			"fast_charging_time": req.body.fast_charging_time
		}));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
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
		req.params = {"truckId": "123"};
		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let truckServiceInstance = Container.get("TruckService");
		sinon.stub(truckServiceInstance, "getTruck").returns(Result.ok<ITruckDTO>({
			"id": "123",
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		}));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.getTruck(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"id": "123", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		}));
	});

	it('truckController updateTruck unit test using truckService stub', async function () {
		// Arrange
		let body = {
			"id":"W01",
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		};
		let req: Partial<Request> = {};
		req.body = body;
		req.params = {"truckId": "W01"};
		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let truckServiceInstance = Container.get("TruckService");
		sinon.stub(truckServiceInstance, "updateTruck").returns(Result.ok<ITruckDTO>({
			"id": req.body.id,
			"tare": req.body.tare,
			"load_capacity": req.body.load_capacity,
			"max_battery_charge": req.body.max_battery_charge,
			"autonomy": req.body.autonomy,
			"fast_charging_time": req.body.fast_charging_time
		}));

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.updateTruck(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"id": req.body.id, "tare": req.body.tare,
			"load_capacity": req.body.load_capacity,
			"max_battery_charge": req.body.max_battery_charge,
			"autonomy": req.body.autonomy,
			"fast_charging_time": req.body.fast_charging_time
		}));
	});


	it('truckController + truckService integration test using truckRepoistory and Truck stubs', async function () {
		// Arrange	
		let body = {
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sinon.spy()
		};
		let next: Partial<NextFunction> = () => { };

		sinon.stub(Truck, "create").returns(Result.ok({
			"id": "123", "tare": req.body.tare,
			"load_capacity": req.body.load_capacity,
			"max_battery_charge": req.body.max_battery_charge,
			"autonomy": req.body.autonomy,
			"fast_charging_time": req.body.fast_charging_time
		}));

		let truckRepoInstance = Container.get("TruckRepo");
		sinon.stub(truckRepoInstance, "save").returns(new Promise<Truck>((resolve, reject) => {
			resolve(Truck.create({
				"id": "123", "tare": req.body.tare,
				"load_capacity": req.body.load_capacity,
				"max_battery_charge": req.body.max_battery_charge,
				"autonomy": req.body.autonomy,
				"fast_charging_time": req.body.fast_charging_time
			}).getValue())
		}));

		let truckServiceInstance = Container.get("TruckService");

		const ctrl = new TruckController(truckServiceInstance as ITruckService);

		// Act
		await ctrl.createTruck(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sinon.assert.calledOnce(res.json);
		sinon.assert.calledWith(res.json, sinon.match({
			"id": "123",
			"tare": req.body.tare,
			"load_capacity": req.body.load_capacity,
			"max_battery_charge": req.body.max_battery_charge,
			"autonomy": req.body.autonomy,
			"fast_charging_time": req.body.fast_charging_time
		}));
	});
});


