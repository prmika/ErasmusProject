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
import TruckRepo from './truckRepo';
import { ITruckPersistence } from '../dataschema/ITruckPersistence';
import { Document, Model } from 'mongoose';
import { ObjectId } from 'mongodb';

describe('truck repository', function () {
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

	it('truckRepo exists unit test using truckSchema stub', async function () {
		// Arrange
		let truck: Result<Truck> = Truck.create({
			"id": "123", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		} as ITruckDTO);

		let convertedTruck: Truck = truck.getValue() as Truck;


		let truckSchemaInstance = Container.get("truckSchema");
		let tempSpy = sandbox.stub(truckSchemaInstance, "findOne").returns(Result.ok<ITruckPersistence>({
			domainId: 'a5efbb7d-3380-4c14-85da-6434b245132d',
			tare: 29.7,
			load_capacity: 33.75,
			max_battery_charge: 43.7,
			autonomy: 32.74,
			fast_charging_time: 54.8
		}));

		const repo = new TruckRepo(truckSchemaInstance as Model<ITruckPersistence & Document>);

		// Act
		let result = await repo.exists(convertedTruck);
		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sinon.match({
				"tare": 29.7,
				"load_capacity": 33.75,
				"max_battery_charge": 43.7,
				"autonomy": 32.74,
				"fast_charging_time": 54.8
			}));
			sandbox.done();
		});

		assert.ok(result);
	});

	it('truckRepo save unit test using truckSchema stub', async function () {
		// Arrange
		let truck: Result<Truck> = Truck.create({
			"id": "123", "tare": 29.70,
			"load_capacity": 33.75,
			"max_battery_charge": 43.7,
			"autonomy": 32.74,
			"fast_charging_time": 54.8
		} as ITruckDTO);

		let convertedTruck: Truck = truck.getValue() as Truck;


		let truckSchemaInstance = Container.get("truckSchema");
		let tempSpy = sandbox.stub(truckSchemaInstance, "findOne").returns(null);
		let tempSpy2 = sandbox.stub(truckSchemaInstance, "create").returns(convertedTruck);
		const repo = new TruckRepo(truckSchemaInstance as Model<ITruckPersistence & Document>);

		// Act
		let result = await repo.save(convertedTruck);
		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sinon.match({
				"tare": 29.7,
				"load_capacity": 33.75,
				"max_battery_charge": 43.7,
				"autonomy": 32.74,
				"fast_charging_time": 54.8
			}));
			sandbox.done();
		});
		tempSpy2.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sinon.match({
				"tare": 29.7,
				"load_capacity": 33.75,
				"max_battery_charge": 43.7,
				"autonomy": 32.74,
				"fast_charging_time": 54.8
			}));
			sandbox.done();
		});

		assert.ok(result);
	});

	it('truckRepo findByDomainId unit test using truckSchema stub', async function () {
		// Arrange

		let truckSchemaInstance = Container.get("truckSchema");
		let tempSpy = sandbox.stub(truckSchemaInstance, "findOne").returns(Result.ok<ITruckPersistence>({
			domainId: 'a5efbb7d-3380-4c14-85da-6434b245132d',
			tare: 29.7,
			load_capacity: 33.75,
			max_battery_charge: 43.7,
			autonomy: 32.74,
			fast_charging_time: 54.8
		}));
		const repo = new TruckRepo(truckSchemaInstance as Model<ITruckPersistence & Document>);

		// Act
		let result = await repo.findByDomainId("a5efbb7d-3380-4c14-85da-6434b245132d");
		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sinon.match({
				"tare": 29.7,
				"load_capacity": 33.75,
				"max_battery_charge": 43.7,
				"autonomy": 32.74,
				"fast_charging_time": 54.8
			}));
			sandbox.done();
		});

		assert.ok(result);
	});

	it('truckRepo findByDomainId unit test when result is null (using truckSchema stub)', async function () {
		// Arrange

		let truckSchemaInstance = Container.get("truckSchema");
		let tempSpy = sandbox.stub(truckSchemaInstance, "findOne").returns(null);
		const repo = new TruckRepo(truckSchemaInstance as Model<ITruckPersistence & Document>);

		// Act
		let result = await repo.findByDomainId("a5efbb7d-3380-4c14-85da-6434b245132d");
		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sinon.match(null));
			sandbox.done();
		});

		assert.equal(null, result);
	});
});