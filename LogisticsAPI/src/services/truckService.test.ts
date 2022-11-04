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


	it('truckService getTruck unit test using truckRepo stub', async function () {
		// Arrange
		let body = {
			"id": "W01",
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		};

		let truckRepoInstance = Container.get("TruckRepo");
		let tempSpy = sinon.stub(truckRepoInstance, "findByDomainId").returns(Truck.create({
			"id": "W01", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		} as ITruckDTO).getValue() as Truck);

		const srvc = new TruckService(truckRepoInstance as ITruckRepo);

		// Act
		await srvc.getTruck("W01");

		// Assert
		tempSpy.callsFake(() => {
			sinon.assert.calledOnce();
			sinon.assert.calledWith(sinon.match({
				"id": body.id,
				"tare": body.tare,
				"load_capacity": body.load_capacity,
				"max_battery_charge": body.max_battery_charge,
				"autonomy": body.autonomy,
				"fast_charging_time": body.fast_charging_time
			}));
			sinon.done();
		});
	});

	it('truckService getAllTrucks unit test using truckRepo stub', async function () {
		// Arrange
		let body = {
			"id": "W01",
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		};

		let truckRepoInstance = Container.get("TruckRepo");
		let tempSpy = sinon.stub(truckRepoInstance, "findAll").returns([Truck.create({
			"id": "W01", "tare": 29.70,
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
		} as ITruckDTO).getValue() as Truck] as Truck[]);

		const srvc = new TruckService(truckRepoInstance as ITruckRepo);

		// Act
		await srvc.getAllTrucks();

		// Assert
		tempSpy.callsFake(() => {
			sinon.assert.calledOnce();
			sinon.assert.calledWith(sinon.match([{
				"id": "W01", "tare": 29.70,
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
			sinon.done();
		});
	});

	it('truckService updateTruck unit test using truckRepo stub', async function () {
		// Arrange
		let body = {
			"id": "W01",
			"tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		};

		let truckRepoInstance = Container.get("TruckRepo");
		let tempSpy = sinon.stub(truckRepoInstance, "findByDomainId").returns(Truck.create({
			"id": "W01", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		} as ITruckDTO).getValue() as Truck);
		let tempSpy2 = sinon.stub(truckRepoInstance, "save").returns(Truck.create({
			"id": "W01", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		} as ITruckDTO).getValue() as Truck);

		const srvc = new TruckService(truckRepoInstance as ITruckRepo);

		// Act
		await srvc.updateTruck("W01",body as ITruckDTO);

		// Assert
		tempSpy.callsFake(() => {
			sinon.assert.calledOnce();
			sinon.assert.calledWith(sinon.match({
				"id": body.id,
				"tare": body.tare,
				"load_capacity": body.load_capacity,
				"max_battery_charge": body.max_battery_charge,
				"autonomy": body.autonomy,
				"fast_charging_time": body.fast_charging_time
			}));
			sinon.done();
		});
		tempSpy2.callsFake(() => {
			sinon.assert.calledOnce();
			sinon.assert.calledWith(sinon.match({
				"id": body.id,
				"tare": body.tare,
				"load_capacity": body.load_capacity,
				"max_battery_charge": body.max_battery_charge,
				"autonomy": body.autonomy,
				"fast_charging_time": body.fast_charging_time
			}));
			sinon.done();
		});
	});
});


