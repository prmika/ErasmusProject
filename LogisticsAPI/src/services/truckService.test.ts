import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import ITruckService from "../services/IServices/ITruckService";
import TruckController from "../controllers/truckController";
import { ITruckDTO } from '../dto/ITruckDTO';
import { Truck } from '../domain/truck';
import TruckService from './truckService';
import ITruckRepo from './IRepos/ITruckRepo';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import assert from 'assert';

describe('truck service', function () {
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


	it('truckService getTruck unit test using truckRepo stub', async function () {
		// Arrange
		let body = {
			"id": "T01",
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		};

		let truckRepoInstance = Container.get("TruckRepo");//We mock truckRepo
		let tempSpy = sandbox.stub(truckRepoInstance, "findByDomainId").returns(Truck.create({
			"id": "T01", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		} as ITruckDTO).getValue() as Truck);//When the truckService needs the method findByDomainId, it will return this Truck

		const srvc = new TruckService(truckRepoInstance as ITruckRepo);

		// Act
		let result = await srvc.getTruck("T01");

		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"id": body.id,
				"tare": body.tare,
				"load_capacity": body.load_capacity,
				"max_battery_charge": body.max_battery_charge,
				"autonomy": body.autonomy,
				"fast_charging_time": body.fast_charging_time
			}));
			sandbox.done();
		});

		assert.notEqual(result, null);//The findByDomainId will have returned a truck which means the getTruck will also return a truck. Therfore it can't be null
	});

	it('truckService getAllTrucks unit test using truckRepo stub', async function () {
		// Arrange
		let body = {
			"id": "T01",
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		};

		let truckRepoInstance = Container.get("TruckRepo");//We mock truckRepo
		let tempSpy = sandbox.stub(truckRepoInstance, "findAll").returns([Truck.create({
			"id": "T01", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		} as ITruckDTO).getValue() as Truck, Truck.create({
			"id": "W02", "tare": 34,
			"load_capacity": 20.75,
			"max_battery_charge": 65,
			"autonomy": 54,
			"fast_charging_time": 45
		} as ITruckDTO).getValue() as Truck] as Truck[]);//When the truckService needs the method findAll, it will return a list with Trucks

		const srvc = new TruckService(truckRepoInstance as ITruckRepo);

		// Act
		await srvc.getAllTrucks();//Will successfully retrieve a list with trucks because of the Mock

		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match([{//Will return true if those attributes and their values are indeed the one that were called
				"id": "T01", "tare": 29.70,
				"load_capacity": 33.75,
				"max_battery_charge": 43.7,
				"autonomy": 32.74,
				"fast_charging_time": 54.8
			}, {
				"id": "W02", "tare": 34,
				"load_capacity": 20.75,
				"max_battery_charge": 65,
				"autonomy": 54,
				"fast_charging_time": 45
			}]));
			sandbox.done();
		});
	});

	it('truckService updateTruck unit test using truckRepo stub', async function () {
		// Arrange
		let body = {
			"id": "T01",
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		};

		let truckRepoInstance = Container.get("TruckRepo");//We mock truckRepo
		let tempSpy = sandbox.stub(truckRepoInstance, "findByDomainId").returns(Truck.create({//When the truckService needs the method findByDomainId, it will return this Truck
			"id": "T01", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		} as ITruckDTO).getValue() as Truck);

		let tempSpy2 = sandbox.stub(truckRepoInstance, "save").returns(Truck.create({//When the truckService needs the method save, it will return this created Truck
			"id": "T01", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		} as ITruckDTO).getValue() as Truck);

		const srvc = new TruckService(truckRepoInstance as ITruckRepo);

		// Act
		let result = await srvc.updateTruck("T01",body as ITruckDTO);

		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"id": body.id,
				"tare": body.tare,
				"load_capacity": body.load_capacity,
				"max_battery_charge": body.max_battery_charge,
				"autonomy": body.autonomy,
				"fast_charging_time": body.fast_charging_time
			}));
			sandbox.done();
		});

		tempSpy2.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"id": body.id,
				"tare": body.tare,
				"load_capacity": body.load_capacity,
				"max_battery_charge": body.max_battery_charge,
				"autonomy": body.autonomy,
				"fast_charging_time": body.fast_charging_time
			}));
			sandbox.done();
		});

		assert.notEqual(result, null);//The findByDomainId and save method will have returned a truck which means the updateTruck will also return a truck. Therfore it can't be null
	});
});


