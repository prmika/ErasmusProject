"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const sinon = __importStar(require("sinon"));
const typedi_1 = require("typedi");
const Result_1 = require("../core/logic/Result");
const truckController_1 = __importDefault(require("../controllers/truckController"));
const truck_1 = require("../domain/truck");
describe('truck controller', function () {
    const sandbox = sinon.createSandbox();
    beforeEach(function () {
        typedi_1.Container.reset();
        let truckSchemaInstance = require("../persistence/schemas/truckSchema").default;
        typedi_1.Container.set("truckSchema", truckSchemaInstance);
        let truckRepoClass = require("../repos/truckRepo").default;
        let truckRepoInstance = typedi_1.Container.get(truckRepoClass);
        typedi_1.Container.set("TruckRepo", truckRepoInstance);
        let truckServiceClass = require("../services/truckService").default;
        let truckServiceInstance = typedi_1.Container.get(truckServiceClass);
        typedi_1.Container.set("TruckService", truckServiceInstance);
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
        let req = {};
        req.body = body;
        let res = {
            json: sinon.spy()
        };
        let next = () => { };
        let truckServiceInstance = typedi_1.Container.get("TruckService");
        sinon.stub(truckServiceInstance, "createTruck").returns(Result_1.Result.ok({
            "id": "123",
            "tare": req.body.tare,
            "load_capacity": req.body.load_capacity,
            "max_battery_charge": req.body.max_battery_charge,
            "autonomy": req.body.autonomy,
            "fast_charging_time": req.body.fast_charging_time
        }));
        const ctrl = new truckController_1.default(truckServiceInstance);
        // Act
        await ctrl.createTruck(req, res, next);
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
        let req = {};
        req.params = { "truckId": "123" };
        let res = {
            json: sinon.spy()
        };
        let next = () => { };
        let truckServiceInstance = typedi_1.Container.get("TruckService");
        sinon.stub(truckServiceInstance, "getTruck").returns(Result_1.Result.ok({
            "id": "123",
            "tare": 29.70,
            "load_capacity": 33.75,
            "max_battery_charge": 43.7,
            "autonomy": 32.74,
            "fast_charging_time": 54.8
        }));
        const ctrl = new truckController_1.default(truckServiceInstance);
        // Act
        await ctrl.getTruck(req, res, next);
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
            "id": "W01",
            "tare": 29.70,
            "load_capacity": 33.75,
            "max_battery_charge": 43.7,
            "autonomy": 32.74,
            "fast_charging_time": 54.8
        };
        let req = {};
        req.body = body;
        req.params = { "truckId": "W01" };
        let res = {
            json: sinon.spy()
        };
        let next = () => { };
        let truckServiceInstance = typedi_1.Container.get("TruckService");
        sinon.stub(truckServiceInstance, "updateTruck").returns(Result_1.Result.ok({
            "id": req.body.id,
            "tare": req.body.tare,
            "load_capacity": req.body.load_capacity,
            "max_battery_charge": req.body.max_battery_charge,
            "autonomy": req.body.autonomy,
            "fast_charging_time": req.body.fast_charging_time
        }));
        const ctrl = new truckController_1.default(truckServiceInstance);
        // Act
        await ctrl.updateTruck(req, res, next);
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
        let req = {};
        req.body = body;
        let res = {
            json: sinon.spy()
        };
        let next = () => { };
        sinon.stub(truck_1.Truck, "create").returns(Result_1.Result.ok({
            "id": "123", "tare": req.body.tare,
            "load_capacity": req.body.load_capacity,
            "max_battery_charge": req.body.max_battery_charge,
            "autonomy": req.body.autonomy,
            "fast_charging_time": req.body.fast_charging_time
        }));
        let truckRepoInstance = typedi_1.Container.get("TruckRepo");
        sinon.stub(truckRepoInstance, "save").returns(new Promise((resolve, reject) => {
            resolve(truck_1.Truck.create({
                "id": "123", "tare": req.body.tare,
                "load_capacity": req.body.load_capacity,
                "max_battery_charge": req.body.max_battery_charge,
                "autonomy": req.body.autonomy,
                "fast_charging_time": req.body.fast_charging_time
            }).getValue());
        }));
        let truckServiceInstance = typedi_1.Container.get("TruckService");
        const ctrl = new truckController_1.default(truckServiceInstance);
        // Act
        await ctrl.createTruck(req, res, next);
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
//# sourceMappingURL=truckController.test.js.map