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

describe('packaging controller', function () {
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

	it('packagingController createPackaging unit test using packagingService stub', async function () {
		// Arrange
		let body = { //Declare body for the request, which will be used to create a package
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4,
            "timeToLoad": 0.5
		};
		let req: Partial<Request> = {};
		req.body = body;
		let res: Partial<Response> = {
			json: sandbox.spy()//We spy on the json result
		};
		let next: Partial<NextFunction> = () => { };

		let packagingServiceInstance = Container.get("PackagingService");//We mock packagingService
		sandbox.stub(packagingServiceInstance, "createPackaging").returns(Result.ok<IPackagingDTO>({//When the packagingController needs the method create, it will return a PackagingDTO object with these attributes
			"id": "123",
			"product": req.body.product,
			"width": req.body.width,
			"height": req.body.height,
			"depth": req.body.depth,
			"weight": req.body.weight,
            "timeToLoad": req.body.timeToLoad
		}));

		const ctrl = new PackagingController(packagingServiceInstance as IPackagingService);

		// Act
		await ctrl.createPackaging(<Request>req, <Response>res, <NextFunction>next);//The createPackaging method is called with  req, res, and next parameters. Req contains data necessary for the function 
																				//to run successfully and Res will contain the results (package object - not null)
		// Assert
		sandbox.assert.calledOnce(res.json);
		sandbox.assert.calledWith(res.json, sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
			"id": "123",
			"product": req.body.product,
			"width": req.body.width,
			"height": req.body.height,
			"depth": req.body.depth,
			"weight": req.body.weight,
            "timeToLoad": req.body.timeToLoad
		}));
	});
	

	it('packagingController getPackaging unit test using packagingService stub', async function () {
		// Arrange
		let req: Partial<Request> = {};
		req.params = { "packagingId": "123" };//The req should contain a packagingId for the getPackaging method to be performed successfully
		let res: Partial<Response> = {
			json: sandbox.spy()//We spy on the json result
		};
		let next: Partial<NextFunction> = () => { };

		let packagingServiceInstance = Container.get("PackagingService");//We mock packagingService
		sandbox.stub(packagingServiceInstance, "getPackaging").returns(Result.ok<IPackagingDTO>({//When the packagingController needs the method getPackaging, it will return a PackagingDTO object with this attributes
			"id": "123",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4,
            "timeToLoad": 0.5
		}));

		const ctrl = new PackagingController(packagingServiceInstance as IPackagingService);

		// Act
		await ctrl.getPackaging(<Request>req, <Response>res, <NextFunction>next);//This will return a Packaging, or any Packaging kind different from null

		// Assert
		sandbox.assert.calledOnce(res.json);
		sandbox.assert.calledWith(res.json, sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
			"id": "123",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4,
            "timeToLoad": 0.5
		}));
	});

	it('packagingController getAllPackages unit test using packagingService stub', async function () {
		// Arrange
		let req: Partial<Request> = {};
		let res: Partial<Response> = {
			json: sandbox.spy() //We spy on the json result
		};
		let next: Partial<NextFunction> = () => { };

		let packagingServiceInstance = Container.get("PackagingService"); //We mock packagingService
		sandbox.stub(packagingServiceInstance, "getAllPackages").returns(Result.ok<IPackagingDTO[]>([{//When the packagingController needs the method getAllPackages, it will return a list of PackagingDTO objects with these attributes
			"id": "P01",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4,
            "timeToLoad": 0.5
		},
		{
			"id": "P02",
			"product": "test_product_2",
			"width": 1.5,
			"height": 3,
			"depth": 4,
			"weight": 25.1,
            "timeToLoad": 0.5
		}]));

		const ctrl = new PackagingController(packagingServiceInstance as IPackagingService);

		// Act
		await ctrl.getAllPackages(<Request>req, <Response>res, <NextFunction>next);//This will return a list of Packages, or any Packaging kind of list that is different from null

		// Assert
		sandbox.assert.calledOnce(res.json);
		sandbox.assert.calledWith(res.json, sandbox.match([{//Will return true if those attributes and their values are indeed the one that were called
			"id": "P01",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4,
            "timeToLoad": 0.5
		},
		{
			"id": "P02",
			"product": "test_product_2",
			"width": 1.5,
			"height": 3,
			"depth": 4,
			"weight": 25.1,
            "timeToLoad": 0.5
		}]));
	});

	it('packagingController updatePackaging unit test using packagingService stub', async function () {
		// Arrange
		let body = { //Declare body for the request, which will be used to create a package
			"id": "P01",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4,
            "timeToLoad": 0.5
		};
		let req: Partial<Request> = {};
		req.body = body; //Requests needs a body
		req.params = { "packagingId": "P01" };//The req should contain a packagingId for the getPackaging method to be performed successfully
		let res: Partial<Response> = {
			json: sandbox.spy()
		};
		let next: Partial<NextFunction> = () => { };

		let packagingServiceInstance = Container.get("PackagingService");//We mock packagingService
		let tempSpy = sandbox.stub(packagingServiceInstance, "updatePackaging").returns(Result.ok<IPackagingDTO>({//When the packagingController needs the method updatePackaging, it will return a PackagingDTO object with these attributes
			"id": req.body.id,
			"product": req.body.product,
			"width": req.body.width,
			"height": req.body.height,
			"depth": req.body.depth,
			"weight": req.body.weight,
            "timeToLoad": req.body.timeToLoad
		}));

		const ctrl = new PackagingController(packagingServiceInstance as IPackagingService);

		await ctrl.updatePackaging(<Request>req, <Response>res, <NextFunction>next);//This will return a Packaging, or any Packaging kind different from null, which means it was updated successfully
		// Assert
		tempSpy.callsFake(() => {
			sandbox.assert.calledOnce(res.json);
			sandbox.assert.calledWith(res.json, sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
				"id": req.body.id,
			    "product": req.body.product,
			    "width": req.body.width,
			    "height": req.body.height,
			    "depth": req.body.depth,
			    "weight": req.body.weight,
                "timeToLoad": req.body.timeToLoad
			}));
			sandbox.done();
		});

	});

	it('Create packaging', function () {
		let packaging: Result<Packaging> = Packaging.create({ //Creates a package object
			"id": "123",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4,
            "timeToLoad": 0.5
		} as IPackagingDTO);

		let convertedPackaging: Packaging = packaging.getValue() as Packaging;

		//Check if all parameters are correct and equal to the ones assigned
		assert.equal(convertedPackaging.product,"test_product");  
		assert.equal(convertedPackaging.width,2);  
		assert.equal(convertedPackaging.height,1.5);  
		assert.equal(convertedPackaging.depth,2.3);  
		assert.equal(convertedPackaging.weight,20.4);
        assert.equal(convertedPackaging.timeToLoad,0.5);
	});

	it('Create and update packaging', function () {
		let packaging: Result<Packaging> = Packaging.create({ //Creates a package object
			"id": "123",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4,
            "timeToLoad": 0.5
		} as IPackagingDTO);

		let convertedPackaging: Packaging = packaging.getValue() as Packaging;

		//Check if all parameters are correct and equal to the ones assigned
		assert.equal(convertedPackaging.product,"test_product");  
		assert.equal(convertedPackaging.width,2);  
		assert.equal(convertedPackaging.height,1.5);  
		assert.equal(convertedPackaging.depth,2.3);  
		assert.equal(convertedPackaging.weight,20.4);
        assert.equal(convertedPackaging.timeToLoad,0.5);  
		
		//Changes values
		convertedPackaging.product = "test_product_99";
		convertedPackaging.width = 4;
		convertedPackaging.height = 2.5;
		convertedPackaging.depth = 2.9;
		convertedPackaging.weight = 10.1;
        convertedPackaging.timeToLoad = 1.1;

		//Values are replaced
		//Check if all parameters are correct and equal to the ones assigned (not the older values anymore)
		assert.notEqual(convertedPackaging.product,"test_product");  
		assert.notEqual(convertedPackaging.width,2);  
		assert.notEqual(convertedPackaging.height,1.5);  
		assert.notEqual(convertedPackaging.depth,2.3);  
		assert.notEqual(convertedPackaging.weight,20.4);
		assert.notEqual(convertedPackaging.timeToLoad,0.5);  

		assert.equal(convertedPackaging.product,"test_product_99");  
		assert.equal(convertedPackaging.width,4);  
		assert.equal(convertedPackaging.height,2.5);  
		assert.equal(convertedPackaging.depth,2.9);  
		assert.equal(convertedPackaging.weight,10.1);
        assert.equal(convertedPackaging.timeToLoad,1.1); 

	});

	it('Map packaging data', function () {
		let packaging: Result<Packaging> = Packaging.create({ //Creates a package object
			"id": "123",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4,
            "timeToLoad": 0.5
		} as IPackagingDTO);

		

		let convertedPackaging: Packaging = packaging.getValue() as Packaging;

		//Check if toDTO maps correctly and values are still the same
		let packagingDto = PackagingMap.toDTO(convertedPackaging);
		assert.equal(packagingDto.product,"test_product");  
		assert.equal(packagingDto.width,2);  
		assert.equal(packagingDto.height,1.5);  
		assert.equal(packagingDto.depth,2.3);  
		assert.equal(packagingDto.weight,20.4);
		assert.equal(packagingDto.timeToLoad,0.5);  

		//Check if toDomain maps correctly and values are still the same
		let packagingDomain = PackagingMap.toDomain(convertedPackaging);
		assert.equal(packagingDomain.product,"test_product");  
		assert.equal(packagingDomain.width,2);  
		assert.equal(packagingDomain.height,1.5);  
		assert.equal(packagingDomain.depth,2.3);  
		assert.equal(packagingDomain.weight,20.4);
		assert.equal(packagingDomain.timeToLoad,0.5); 

		//Check if toPersistence maps correctly and values are still the same
		let packagingPersistence = PackagingMap.toPersistence(convertedPackaging);
		assert.equal(packagingPersistence.product,"test_product");  
		assert.equal(packagingPersistence.width,2);  
		assert.equal(packagingPersistence.height,1.5);  
		assert.equal(packagingPersistence.depth,2.3);  
		assert.equal(packagingPersistence.weight,20.4);
		assert.equal(packagingPersistence.timeToLoad,0.5); 
	});

	it('Check if 2 packages are equal to each other', function () {
		let packaging: Result<Packaging> = Packaging.create({ //Creates a package object
			"id": "123",
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4,
            "timeToLoad": 0.5
		} as IPackagingDTO);

		let convertedPackaging: Packaging = packaging.getValue() as Packaging;
		let convertedPackaging2: Packaging = packaging.getValue() as Packaging;
		
		//Check if both created Packages are equal to each others (it should)
		assert.ok(convertedPackaging.equals(convertedPackaging2))
	});

	it('packagingController + packagingService integration test using packagingRepoistory and Packaging stubs', async function () {
		// Arrange	
		let body = { //Declare body for the request, which will be used to create a package
			"product": "test_product",
			"width": 2,
			"height": 1.5,
			"depth": 2.3,
			"weight": 20.4,
            "timeToLoad": 0.5
		};
		let req: Partial<Request> = {};
		req.body = body;

		let res: Partial<Response> = {
			json: sandbox.spy()
		};
		let next: Partial<NextFunction> = () => { };

		sandbox.stub(Packaging, "create").returns(Result.ok({ //Create method will return Packaging with these attributes and values
			"id": "123",
			"product": req.body.product,
			"width": req.body.width,
			"height": req.body.height,
			"depth": req.body.depth,
			"weight": req.body.weight,
            "timeToLoad": req.body.timeToLoad
		}));

		let packagingRepoInstance = Container.get("PackagingRepo");//We mock packagingRepo
		sandbox.stub(packagingRepoInstance, "save").returns(new Promise<Packaging>((resolve, reject) => {
			resolve(Packaging.create({ //We resolve the data when creating the packaging and get + check the value
				"id": "123",
				"product": req.body.product,
				"width": req.body.width,
				"height": req.body.height,
				"depth": req.body.depth,
				"weight": req.body.weight,
            	"timeToLoad": req.body.timeToLoad
			}).getValue())
		}));

		let packagingServiceInstance = Container.get("PackagingService");//We mock packagingService

		const ctrl = new PackagingController(packagingServiceInstance as IPackagingService);

		// Act
		await ctrl.createPackaging(<Request>req, <Response>res, <NextFunction>next);

		// Assert
		sandbox.assert.calledOnce(res.json);
		sandbox.assert.calledWith(res.json, sandbox.match({//Will return true if those attributes and their values are indeed the one that were called
			"id": "123",
			"product": req.body.product,
			"width": req.body.width,
			"height": req.body.height,
			"depth": req.body.depth,
			"weight": req.body.weight,
            "timeToLoad": req.body.timeToLoad
		}));
	});
});


