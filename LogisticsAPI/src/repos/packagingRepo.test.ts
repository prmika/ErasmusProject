import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import IPackagingService from "../services/IServices/IPackagingService";
import PackagingController from "../controllers/packagingController";
import { IPackagingDTO } from '../dto/IPackagingDTO';
import { Packaging } from '../domain/packaging';
import assert from 'assert';
import { PackagingMap } from '../mappers/PackagingMap';
import PackagingRepo from './packagingRepo';
import { IPackagingPersistence } from '../dataschema/IPackagingPersistence';
import { Document, Model } from 'mongoose';
import { ObjectId } from 'mongodb';

describe('packaging repository', function () {
	const sandbox = sinon.createSandbox();

	beforeEach(function () {
		Container.reset();
		let packagingSchemaInstance = require("../persistence/schemas/packagingSchema").default;
		Container.set("packagingSchema", packagingSchemaInstance);

		let packagingRepoClass = require("../repos/packagingRepo").default;
		let packagingRepoInstance = Container.get(packagingRepoClass);
		Container.set("PackagingRepo", packagingRepoInstance);

		let packagingServiceClass = require("../services/packagingService").default;
		let packagingServiceInstance = Container.get(packagingServiceClass);
		Container.set("PackagingService", packagingServiceInstance);
	});

	afterEach(function () {
		sandbox.restore();
	});

	it('packagingRepo exists unit test using packagingSchema stub', async function () {
		// Arrange
		let packaging: Result<Packaging> = Packaging.create({
			"id": "P01",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4,
            "timeToLoad": 0.5
		} as IPackagingDTO);

		let convertedPackaging: Packaging = packaging.getValue() as Packaging; //We create the package that we want to check for its existence.


		let packagingSchemaInstance = Container.get("packagingSchema");//We mock packagingSchema
		let tempSpy = sandbox.stub(packagingSchemaInstance, "findOne").returns(Result.ok<IPackagingPersistence>({ //Mock the findOne method of PackagingSchema
			domainId: '68182f24-dd89-4a86-af10-ba52e4943013',
			product: "test_product",
			width: 2,
			height: 1.5,
			depth: 1.3,
			weight: 20.4,
            timeToLoad: 0.5
		}));

		const repo = new PackagingRepo(packagingSchemaInstance as Model<IPackagingPersistence & Document>);

		// Act
		let result = await repo.exists(convertedPackaging); //Check if pre-created package exists
		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"product": "test_product",
			    "width": 2,
			    "height": 1.5,
			    "depth": 2.3,
			    "weight": 20.4,
                "timeToLoad": 0.5
			}));
			sandbox.done();
		});

		assert.ok(result); //Will return true because package exists.
	});

	it('packagingRepo save unit test using packagingSchema stub', async function () {
		// Arrange
		let packaging: Result<Packaging> = Packaging.create({
			"id": "P01",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4,
            "timeToLoad": 0.5
		} as IPackagingDTO);

		let convertedPackaging: Packaging = packaging.getValue() as Packaging; //We create the package that we want to save.


		let packagingSchemaInstance = Container.get("packagingSchema");//We mock packagingSchema
		let tempSpy = sandbox.stub(packagingSchemaInstance, "findOne").returns(null); //We want the system to return null which means the package doesn't exist yet.
		let tempSpy2 = sandbox.stub(packagingSchemaInstance, "create").returns(convertedPackaging); //The method will return a package that was created with the data we sent.
		const repo = new PackagingRepo(packagingSchemaInstance as Model<IPackagingPersistence & Document>);

		// Act
		let result = await repo.save(convertedPackaging);
		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"product": "test_product",
			    "width": 2,
			    "height": 1.5,
			    "depth": 2.3,
			    "weight": 20.4,
                "timeToLoad": 0.5
			}));
			sandbox.done();
		});
		tempSpy2.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"product": "test_product",
			    "width": 2,
			    "height": 1.5,
			    "depth": 2.3,
			    "weight": 20.4,
                "timeToLoad": 0.5
			}));
			sandbox.done();
		});

		assert.ok(result);//A package will be returned (not null because the package will be saved successfully)
	});

	it('packagingRepo findByDomainId unit test using packagingSchema stub', async function () {
		// Arrange

		let packagingSchemaInstance = Container.get("packagingSchema");//We mock packagingSchema
		let tempSpy = sandbox.stub(packagingSchemaInstance, "findOne").returns(Result.ok<IPackagingPersistence>({//findOne method will return a part of IPackagingPersistence which findByDomain
			domainId: '68182f24-dd89-4a86-af10-ba52e4943013',                                            //will use to return in case the Id is known in a real world (not mock) situation
			product: "test_product",
			width: 2,
			height: 1.5,
			depth: 1.3,
			weight: 20.4,
            timeToLoad: 0.5
		}));
		const repo = new PackagingRepo(packagingSchemaInstance as Model<IPackagingPersistence & Document>);

		// Act
		let result = await repo.findByDomainId("68182f24-dd89-4a86-af10-ba52e4943013");
		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"product": "test_product",
			    "width": 2,
			    "height": 1.5,
			    "depth": 2.3,
			    "weight": 20.4,
                "timeToLoad": 0.5
			}));
			sandbox.done();
		});

		assert.ok(result);//Result is a package that has the same id as the one given to the method
	});

	it('packagingRepo findByDomainId unit test when result is null (using packagingSchema stub)', async function () {
		// Arrange

		let packagingSchemaInstance = Container.get("packagingSchema");
		let tempSpy = sandbox.stub(packagingSchemaInstance, "findOne").returns(null);//findOne should return null, which means it doesn't find a package with the given packagingId
		const repo = new PackagingRepo(packagingSchemaInstance as Model<IPackagingPersistence & Document>);

		// Act
		let result = await repo.findByDomainId("68182f24-dd89-4a86-af10-ba52e4943013");
		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match(null));//Will return true if it was null
			sandbox.done();
		});

		assert.equal(null, result);//The findByDomainId method will return null
	});
});