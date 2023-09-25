"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (g && (g = 0, op[0] && (_ = 0)), _) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var data_source_1 = require("../data-source");
var Product_1 = require("../entity/Product");
var Store_1 = require("../entity/Store");
module.exports.newProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userRepository, product, allProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                userRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
                product = new Product_1.Product();
                product.name = req.body.name;
                product.quantity = req.body.quantity;
                product.category = req.body.category;
                product.image = req.file.path;
                product.price = req.body.price;
                product.user = user.user.id;
                return [4 /*yield*/, userRepository.save(product)];
            case 1:
                _a.sent();
                return [4 /*yield*/, userRepository.find({
                        relations: {
                            user: true,
                        },
                    })];
            case 2:
                allProducts = _a.sent();
                res.json({ allProducts: allProducts });
                return [2 /*return*/];
        }
    });
}); };
module.exports.allProducts = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepository, allProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
                return [4 /*yield*/, userRepository.find({
                        relations: {
                            user: true,
                        },
                    })];
            case 1:
                allProducts = _a.sent();
                res.json({ allProducts: allProducts });
                return [2 /*return*/];
        }
    });
}); };
module.exports.productUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepository, allProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
                return [4 /*yield*/, userRepository.find({
                        where: {
                            user: {
                                id: req.user.user.id
                            }
                        }
                    })];
            case 1:
                allProducts = _a.sent();
                res.json({ allProducts: allProducts });
                return [2 /*return*/];
        }
    });
}); };
module.exports.productStore = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var user, userRepository, store, allProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                user = req.user;
                userRepository = data_source_1.AppDataSource.getRepository(Store_1.Store);
                store = new Store_1.Store();
                store.author = user.user.id;
                store.product = req.body.id;
                return [4 /*yield*/, userRepository.save(store)];
            case 1:
                _a.sent();
                return [4 /*yield*/, userRepository.find({
                        where: {
                            author: {
                                id: req.user.user.id
                            }
                        },
                        relations: {
                            product: true,
                        },
                    })];
            case 2:
                allProducts = _a.sent();
                res.json({ allProducts: allProducts });
                return [2 /*return*/];
        }
    });
}); };
module.exports.getStore = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var userRepository, allProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                userRepository = data_source_1.AppDataSource.getRepository(Store_1.Store);
                return [4 /*yield*/, userRepository.find({
                        where: {
                            author: {
                                id: req.user.user.id
                            }
                        },
                        relations: {
                            product: true,
                        },
                    })];
            case 1:
                allProducts = _a.sent();
                res.json({ allProducts: allProducts });
                return [2 /*return*/];
        }
    });
}); };
module.exports.deleteProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var storeRepository, allProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                storeRepository = data_source_1.AppDataSource.getRepository(Store_1.Store);
                return [4 /*yield*/, storeRepository
                        .createQueryBuilder('store')
                        .delete()
                        .from(Store_1.Store)
                        .where("authorId = :authorId", { authorId: req.user.user.id })
                        .andWhere("productId = :productId", { productId: req.body.prod.id })
                        .execute()
                    // await storeRepository.delete(photoToRemove)
                ];
            case 1:
                _a.sent();
                return [4 /*yield*/, storeRepository.find({
                        where: {
                            author: {
                                id: req.user.user.id
                            }
                        },
                        relations: {
                            product: true,
                        },
                    })];
            case 2:
                allProducts = _a.sent();
                res.json({ allProducts: allProducts });
                return [2 /*return*/];
        }
    });
}); };
module.exports.personelProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productRepository, product;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
                return [4 /*yield*/, productRepository.findOne({
                        where: { id: JSON.parse(req.params.id) },
                        relations: { user: true }
                    })];
            case 1:
                product = _a.sent();
                res.json({ product: product });
                return [2 /*return*/];
        }
    });
}); };
module.exports.updateProduct = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productRepository, allProducts, allProduct;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                productRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
                return [4 /*yield*/, productRepository
                        .createQueryBuilder()
                        .update(Product_1.Product)
                        .set({
                        name: req.body.name,
                        quantity: req.body.quantity,
                        price: req.body.price,
                        image: req.file.path,
                        category: req.body.category
                    })
                        .where("id = :id", { id: req.body.prodId })
                        .execute()];
            case 1:
                _a.sent();
                return [4 /*yield*/, productRepository.find({
                        relations: {
                            user: true,
                        },
                    })];
            case 2:
                allProducts = _a.sent();
                return [4 /*yield*/, productRepository.find({
                        where: {
                            user: {
                                id: req.user.user.id
                            }
                        }
                    })];
            case 3:
                allProduct = _a.sent();
                res.json({ allProducts: allProducts, allProduct: allProduct });
                return [2 /*return*/];
        }
    });
}); };
module.exports.deletedProductUser = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var personelRepository, allProducts;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                personelRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
                return [4 /*yield*/, personelRepository
                        .createQueryBuilder('product')
                        .delete()
                        .from(Product_1.Product)
                        .where("id = :id", { id: JSON.parse(req.body.prod.id) })
                        .execute()];
            case 1:
                _a.sent();
                return [4 /*yield*/, personelRepository.find({
                        where: {
                            user: {
                                id: req.user.user.id
                            }
                        }
                    })];
            case 2:
                allProducts = _a.sent();
                res.json({ allProducts: allProducts });
                return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=ProductController.js.map