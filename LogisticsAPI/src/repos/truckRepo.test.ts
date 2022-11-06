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

		let convertedTruck: Truck = truck.getValue() as Truck; //We create the truck that we want to check for its existence.


		let truckSchemaInstance = Container.get("truckSchema");//We mock truckSchema
		let tempSpy = sandbox.stub(truckSchemaInstance, "findOne").returns(Result.ok<ITruckPersistence>({ //Mock the findOne method of TruckSchema
			domainId: 'a5efbb7d-3380-4c14-85da-6434b245132d',
			tare: 29.7,
			load_capacity: 33.75,
			max_battery_charge: 43.7,
			autonomy: 32.74,
			fast_charging_time: 54.8
		}));

		const repo = new TruckRepo(truckSchemaInstance as Model<ITruckPersistence & Document>);

		// Act
		let result = await repo.exists(convertedTruck); //Check if pre-created truck exists
		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"tare": 29.7,
				"load_capacity": 33.75,
				"max_battery_charge": 43.7,
				"autonomy": 32.74,
				"fast_charging_time": 54.8
			}));
			sandbox.done();
		});

		assert.ok(result); //Will return true because truck exists.
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

		let convertedTruck: Truck = truck.getValue() as Truck; //We create the truck that we want to save.


		let truckSchemaInstance = Container.get("truckSchema");//We mock truckSchema
		let tempSpy = sandbox.stub(truckSchemaInstance, "findOne").returns(null); //We want the system to return null which means the truck doesn't exist yet.
		let tempSpy2 = sandbox.stub(truckSchemaInstance, "create").returns(convertedTruck); //The method will return a truck that was created with the data we sent.
		const repo = new TruckRepo(truckSchemaInstance as Model<ITruckPersistence & Document>);

		// Act
		let result = await repo.save(convertedTruck);
		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
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
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"tare": 29.7,
				"load_capacity": 33.75,
				"max_battery_charge": 43.7,
				"autonomy": 32.74,
				"fast_charging_time": 54.8
			}));
			sandbox.done();
		});

		assert.ok(result);//A truck will be returned (not null because the truck will be saved successfully)
	});

	it('truckRepo findByDomainId unit test using truckSchema stub', async function () {
		// Arrange

		let truckSchemaInstance = Container.get("truckSchema");//We mock truckSchema
		let tempSpy = sandbox.stub(truckSchemaInstance, "findOne").returns(Result.ok<ITruckPersistence>({//findOne method will return a part of ITruckPersistence which findByDomain
			domainId: 'a5efbb7d-3380-4c14-85da-6434b245132d',                                            //will use to return in case the Id is known in a real world (not mock) situation
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
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"tare": 29.7,
				"load_capacity": 33.75,
				"max_battery_charge": 43.7,
				"autonomy": 32.74,
				"fast_charging_time": 54.8
			}));
			sandbox.done();
		});
	});

	it('truckRepo findByDomainId unit test when result is null (using truckSchema stub)', async function () {
		// Arrange

		let truckSchemaInstance = Container.get("truckSchema");
		let tempSpy = sandbox.stub(truckSchemaInstance, "findOne").returns(null);//findOne should return null, which means it doesn't find a truck with the given truckId
		const repo = new TruckRepo(truckSchemaInstance as Model<ITruckPersistence & Document>);

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