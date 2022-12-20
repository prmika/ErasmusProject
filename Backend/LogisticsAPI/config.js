import dotenv from 'dotenv';

// Set the NODE_ENV to 'development' by default
process.env.NODE_ENV = process.env.NODE_ENV || 'development';

const envFound = dotenv.config();
if (!envFound) {
  // This error should crash whole process

  throw new Error("⚠️  Couldn't find .env file  ⚠️");
}

export default {
  /**
   * Your favorite port
   */
  port: parseInt(process.env.PORT, 10) || 3000,

  /**
   * That long string from mlab
   */
  databaseURL: process.env.MONGODB_URI || "mongodb+srv://dbAdmin:Lab5project2022@lab5project.9vyeml3.mongodb.net/electricgo",
  //databaseURL: process.env.MONGODB_URI || "mongodb://127.0.0.1:27017/?directConnection=true&serverSelectionTimeoutMS=2000/electricgo",

  /**
   * Your secret sauce
   */
  jwtSecret: process.env.JWT_SECRET || "my sakdfho2390asjod$%jl)!sdjas0i secret",

  /**
   * Used by winston logger
   */
  logs: {
    level: process.env.LOG_LEVEL || 'info',
  },

  /**
   * API configs
   */
  api: {
    prefix: '/api',
  },

  controllers: {
    user: {
      name: "UserController",
      path: "../controllers/userController"
    },
    role: {
      name: "RoleController",
      path: "../controllers/roleController"
    },
    truck: {
      name: "TruckController",
      path: "../controllers/truckController"
    },
    packaging: {
      name: "PackagingController",
      path: "../controllers/packagingController"
    },
    deliverypath: {
      name: "DeliveryPathController",
      path: "../controllers/deliverypathController"
    }
  },

  repos: {
    truck: {
      name: "TruckRepo",
      path: "../repos/truckRepo"
    },
    packaging: {
      name: "PackagingRepo",
      path: "../repos/packagingRepo"
    },
    deliverypath: {
      name: "DeliveryPathRepo",
      path: "../repos/deliverypathRepo"
    },
    role: {
      name: "RoleRepo",
      path: "../repos/roleRepo"
    },
    user: {
      name: "UserRepo",
      path: "../repos/userRepo"
    }
  },

  services: {
    user: {
      name: "UserService",
      path: "../services/userService"
    },
    role: {
      name: "RoleService",
      path: "../services/roleService"
    },
    truck: {
      name: "TruckService",
      path: "../services/truckService"
    },
    packaging: {
      name: "PackagingService",
      path: "../services/packagingService"
    },
    deliverypath: {
      name: "DeliveryPathService",
      path: "../services/deliverypathService"
    }
  },
};
