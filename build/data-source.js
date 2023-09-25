"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
require("reflect-metadata");
var typeorm_1 = require("typeorm");
var User_1 = require("./entity/User");
var Product_1 = require("./entity/Product");
var Store_1 = require("./entity/Store");
var Payment_1 = require("./entity/Payment");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "".concat(process.env.DATABASE_HOST),
    port: 5432,
    username: "".concat(process.env.DATABASE_USERNAME),
    password: "".concat(process.env.DATABASE_PASSWORD),
    database: "".concat(process.env.DATABASE_NAME),
    synchronize: true,
    logging: false,
    entities: [User_1.User, Product_1.Product, Store_1.Store, Payment_1.Payment],
    migrations: [],
    subscribers: [],
});
//# sourceMappingURL=data-source.js.map