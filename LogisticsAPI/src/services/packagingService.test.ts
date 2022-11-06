import 'reflect-metadata';

import * as sinon from 'sinon';
import { Response, Request, NextFunction } from 'express';
import { Container } from 'typedi';
import { Result } from '../core/logic/Result';
import IPackagingService from "../services/IServices/IPackagingService";
import PackagingController from "../controllers/packagingController";
import { IPackagingDTO } from '../dto/IPackagingDTO';
import { Packaging } from '../domain/packaging';
import PackagingService from './packagingService';
import IPackagingRepo from './IRepos/IPackagingRepo';
import { UniqueEntityID } from '../core/domain/UniqueEntityID';
import assert from 'assert';

describe('packaging service', function () {
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


	it('packagingService getPackaging unit test using packagingRepo stub', async function () {
		// Arrange
		let body = {
			"id": "P01",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4
            //"timeToLoad": 0.5
		};

		let packagingRepoInstance = Container.get("PackagingRepo");//We mock packagingRepo
		let tempSpy = sandbox.stub(packagingRepoInstance, "findByDomainId").returns(Packaging.create({
			"id": "P01",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4
            //"timeToLoad": 0.5
		} as IPackagingDTO).getValue() as Packaging);//When the packagingService needs the method findByDomainId, it will return this Packaging

		const srvc = new PackagingService(packagingRepoInstance as IPackagingRepo);

		// Act
		let result = await srvc.getPackaging("P01");

		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"id": body.id,
			    "product": body.product,
			    "width": body.width,
			    "height": body.height,
			    "depth": body.depth,
			    "weight": body.weight
                //"timeToLoad": body.timeToLoad
			}));
			sandbox.done();
		});

		assert.notEqual(result, null);//The findByDomainId will have returned a package which means the getPackaging will also return a package. Therefore it can't be null
	});

	it('packagingService getAllPackages unit test using packagingRepo stub', async function () {
		// Arrange
		let body = {
			"id": "P01",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4
            //"timeToLoad": 0.5
		};

		let packagingRepoInstance = Container.get("PackagingRepo");//We mock packagingRepo
		let tempSpy = sandbox.stub(packagingRepoInstance, "findAll").returns([Packaging.create({
			"id": "P01",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4
            //"timeToLoad": 0.5
		} as IPackagingDTO).getValue() as Packaging, Packaging.create({
			"id": "P01",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4
            //"timeToLoad": 0.5
		} as IPackagingDTO).getValue() as Packaging] as Packaging[]);//When the packagingService needs the method findAll, it will return a list with Packages

		const srvc = new PackagingService(packagingRepoInstance as IPackagingRepo);

		// Act
		await srvc.getAllPackages();//Will successfully retrieve a list with packages because of the Mock

		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match([{//Will return true if those attributes and their values are indeed the one that were called
				"id": "P01",
			    "product": "test_product",
			    "width": 2,
			    "height": 1.5,
			    "depth": 2.3,
			    "weight": 20.4
                //"timeToLoad": 0.5
			}, {
				"id": "P01",
			    "product": "test_product",
			    "width": 2,
			    "height": 1.5,
			    "depth": 2.3,
			    "weight": 20.4
                //"timeToLoad": 0.5
			}]));
			sandbox.done();
		});
	});

	it('packagingService updatePackaging unit test using packagingRepo stub', async function () {
		// Arrange
		let body = {
			"id": "P01",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4
            //"timeToLoad": 0.5
		};

		let packagingRepoInstance = Container.get("PackagingRepo");//We mock packagingRepo
		let tempSpy = sandbox.stub(packagingRepoInstance, "findByDomainId").returns(Packaging.create({//When the packagingService needs the method findByDomainId, it will return this Packaging
			"id": "P01",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4
            //"timeToLoad": 0.5
		} as IPackagingDTO).getValue() as Packaging);

		let tempSpy2 = sandbox.stub(packagingRepoInstance, "save").returns(Packaging.create({//When the packagingService needs the method save, it will return this created Packaging
			"id": "P01",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4
            //"timeToLoad": 0.5
		} as IPackagingDTO).getValue() as Packaging);

		const srvc = new PackagingService(packagingRepoInstance as IPackagingRepo);

		// Act
		let result = await srvc.updatePackaging("P01", body as IPackagingDTO);

		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"id": body.id,
			    "product": body.product,
			    "width": body.width,
			    "height": body.height,
			    "depth": body.depth,
			    "weight": body.weight
                //"timeToLoad": body.timeToLoad
			}));
			sandbox.done();
		});

		tempSpy2.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"id": body.id,
			    "product": body.product,
			    "width": body.width,
			    "height": body.height,
			    "depth": body.depth,
			    "weight": body.weight
                //"timeToLoad": body.timeToLoad
			}));
			sandbox.done();
		});

		assert.notEqual(result, null);//The findByDomainId and save method will have returned a package which means the updatePackaging will also return a package. Therfore it can't be null
	});

	it('packagingService + packagingRepo integration test for getAllPackages using packagingRepoistory stubs', async function () {
		// Arrange	
		let packagingSchemaInstance = Container.get("packagingSchema");//We mock packagingRepo
		let tempSpy = sandbox.stub(packagingSchemaInstance, "find").returns(new Promise<Packaging[]>((resolve, reject) => {//We mock find method of PackagingSchema
			resolve([Packaging.create({
				"id": "P01",
				"product": "test_product",
				"width": 2,
				"height": 1.5,
				"depth": 2.3,
				"weight": 20.4
            	//"timeToLoad": 0.5
			} as IPackagingDTO).getValue() as Packaging, Packaging.create({
				"id": "P02",
				"product": "test_product_2",
				"width": 1.5,
				"height": 3,
				"depth": 4,
				"weight": 25.1
            	//"timeToLoad": 0.5
			} as IPackagingDTO).getValue() as Packaging])
		}));

		let packagingRepoInstance = Container.get("PackagingRepo");//We mock packagingRepo

		const srv = new PackagingService(packagingRepoInstance as IPackagingRepo);//Make new packagingService

		// Act
		let result = await srv.getAllPackages();

		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce();
			sandbox.assert.calledWith(sandbox.match([{//Will return true if those attributes and their values are indeed the one that were called
				"id": "P01",
				"product": "test_product",
				"width": 2,
				"height": 1.5,
				"depth": 2.3,
				"weight": 20.4
            	//"timeToLoad": 0.5
			}, {
				"id": "P02",
				"product": "test_product_2",
				"width": 1.5,
				"height": 3,
				"depth": 4,
				"weight": 25.1
            	//"timeToLoad": 0.5
			}]));
			sandbox.done();
		});
		assert.notEqual(result, null);
	});
	
});


