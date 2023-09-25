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
var Payment_1 = require("../entity/Payment");
var Store_1 = require("../entity/Store");
var fetch = require("node-fetch");
module.exports.payment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var stores, userRepository, payment, productRepository, _i, stores_1, store, paymenttRepository, payments;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                stores = req.body.store;
                userRepository = data_source_1.AppDataSource.getRepository(Payment_1.Payment);
                payment = new Payment_1.Payment();
                payment.cardName = req.body.cardName;
                payment.cvc = req.body.cvc;
                payment.cardNumber = req.body.cardNumber;
                payment.expire = req.body.expire;
                payment.totalPrice = req.body.total;
                payment.user = req.user.user.id;
                return [4 /*yield*/, userRepository.save(payment)];
            case 1:
                _a.sent();
                productRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
                _i = 0, stores_1 = stores;
                _a.label = 2;
            case 2:
                if (!(_i < stores_1.length)) return [3 /*break*/, 5];
                store = stores_1[_i];
                return [4 /*yield*/, productRepository
                        .createQueryBuilder()
                        .update(Product_1.Product)
                        .set({
                        quantity: function () { return "quantity - 1"; },
                    })
                        .where("id = :id", { id: store.product.id })
                        .execute()];
            case 3:
                _a.sent();
                _a.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                paymenttRepository = data_source_1.AppDataSource.getRepository(Payment_1.Payment);
                return [4 /*yield*/, paymenttRepository.find({
                        where: { user: {
                                id: req.user.user.id
                            } },
                        relations: { user: true }
                    })];
            case 6:
                payments = _a.sent();
                res.json({ payments: payments });
                return [2 /*return*/];
        }
    });
}); };
module.exports.getPayment = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var paymenttRepository, payment;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                paymenttRepository = data_source_1.AppDataSource.getRepository(Payment_1.Payment);
                return [4 /*yield*/, paymenttRepository.find({
                        where: { user: {
                                id: req.user.user.id
                            } },
                        relations: { user: true }
                    })];
            case 1:
                payment = _a.sent();
                res.json({ payment: payment });
                return [2 /*return*/];
        }
    });
}); };
var _a = process.env, PAYPAL_CLIENT_ID = _a.PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET = _a.PAYPAL_CLIENT_SECRET;
var base = "https://api-m.sandbox.paypal.com";
var generateAccessToken = function () { return __awaiter(void 0, void 0, void 0, function () {
    var auth, response, data, error_1;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                _a.trys.push([0, 3, , 4]);
                if (!PAYPAL_CLIENT_ID || !PAYPAL_CLIENT_SECRET) {
                    throw new Error("MISSING_API_CREDENTIALS");
                }
                auth = Buffer.from(PAYPAL_CLIENT_ID + ":" + PAYPAL_CLIENT_SECRET).toString("base64");
                return [4 /*yield*/, fetch("".concat(base, "/v1/oauth2/token"), {
                        method: "POST",
                        body: "grant_type=client_credentials",
                        headers: {
                            Authorization: "Basic ".concat(auth),
                        },
                    })];
            case 1:
                response = _a.sent();
                return [4 /*yield*/, response.json()];
            case 2:
                data = _a.sent();
                return [2 /*return*/, data.access_token];
            case 3:
                error_1 = _a.sent();
                console.error("Failed to generate Access Token:", error_1);
                return [3 /*break*/, 4];
            case 4: return [2 /*return*/];
        }
    });
}); };
function handleResponse(response) {
    return __awaiter(this, void 0, void 0, function () {
        var jsonResponse, err_1, errorMessage;
        return __generator(this, function (_a) {
            switch (_a.label) {
                case 0:
                    _a.trys.push([0, 2, , 4]);
                    return [4 /*yield*/, response.json()];
                case 1:
                    jsonResponse = _a.sent();
                    return [2 /*return*/, {
                            jsonResponse: jsonResponse,
                            httpStatusCode: response.status,
                        }];
                case 2:
                    err_1 = _a.sent();
                    return [4 /*yield*/, response.text()];
                case 3:
                    errorMessage = _a.sent();
                    throw new Error(errorMessage);
                case 4: return [2 /*return*/];
            }
        });
    });
}
var createOrder = function (_a) {
    var store = _a.store, total = _a.total;
    return __awaiter(void 0, void 0, void 0, function () {
        var accessToken, url, payload, response;
        return __generator(this, function (_b) {
            switch (_b.label) {
                case 0: return [4 /*yield*/, generateAccessToken()];
                case 1:
                    accessToken = _b.sent();
                    url = "".concat(base, "/v2/checkout/orders");
                    payload = {
                        intent: "CAPTURE",
                        purchase_units: [
                            {
                                amount: {
                                    currency_code: "USD",
                                    value: total,
                                },
                            },
                        ],
                    };
                    return [4 /*yield*/, fetch(url, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: "Bearer ".concat(accessToken),
                                // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                                // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                                // "PayPal-Mock-Response": '{"mock_application_codes": "MISSING_REQUIRED_PARAMETER"}'
                                // "PayPal-Mock-Response": '{"mock_application_codes": "PERMISSION_DENIED"}'
                                // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
                            },
                            method: "POST",
                            body: JSON.stringify(payload),
                        })];
                case 2:
                    response = _b.sent();
                    return [2 /*return*/, handleResponse(response)];
            }
        });
    });
};
var captureOrder = function (orderID) { return __awaiter(void 0, void 0, void 0, function () {
    var accessToken, url, response;
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0: return [4 /*yield*/, generateAccessToken()];
            case 1:
                accessToken = _a.sent();
                url = "".concat(base, "/v2/checkout/orders/").concat(orderID, "/capture");
                return [4 /*yield*/, fetch(url, {
                        method: "POST",
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: "Bearer ".concat(accessToken),
                            // Uncomment one of these to force an error for negative testing (in sandbox mode only). Documentation:
                            // https://developer.paypal.com/tools/sandbox/negative-testing/request-headers/
                            // "PayPal-Mock-Response": '{"mock_application_codes": "INSTRUMENT_DECLINED"}'
                            // "PayPal-Mock-Response": '{"mock_application_codes": "TRANSACTION_REFUSED"}'
                            // "PayPal-Mock-Response": '{"mock_application_codes": "INTERNAL_SERVER_ERROR"}'
                        },
                    })];
            case 2:
                response = _a.sent();
                return [2 /*return*/, handleResponse(response)];
        }
    });
}); };
module.exports.paypalOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var productRepository, _a, store, total, _b, jsonResponse, httpStatusCode, _i, store_1, stor, error_2;
    return __generator(this, function (_c) {
        switch (_c.label) {
            case 0:
                _c.trys.push([0, 6, , 7]);
                productRepository = data_source_1.AppDataSource.getRepository(Product_1.Product);
                _a = req.body, store = _a.store, total = _a.total;
                return [4 /*yield*/, createOrder({ store: store, total: total })];
            case 1:
                _b = _c.sent(), jsonResponse = _b.jsonResponse, httpStatusCode = _b.httpStatusCode;
                if (!(httpStatusCode === 201)) return [3 /*break*/, 5];
                _i = 0, store_1 = store;
                _c.label = 2;
            case 2:
                if (!(_i < store_1.length)) return [3 /*break*/, 5];
                stor = store_1[_i];
                return [4 /*yield*/, productRepository
                        .createQueryBuilder()
                        .update(Product_1.Product)
                        .set({
                        quantity: function () { return "quantity - 1"; },
                    })
                        .where("id = :id", { id: stor.product.id })
                        .execute()];
            case 3:
                _c.sent();
                _c.label = 4;
            case 4:
                _i++;
                return [3 /*break*/, 2];
            case 5:
                res.status(httpStatusCode).json(jsonResponse);
                return [3 /*break*/, 7];
            case 6:
                error_2 = _c.sent();
                console.error("Failed to create order:", error_2);
                res.status(500).json({ error: "Failed to create order." });
                return [3 /*break*/, 7];
            case 7: return [2 /*return*/];
        }
    });
}); };
module.exports.captureOrder = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var orderID, _a, jsonResponse, httpStatusCode, userRepository, payment, storeRepository, allProducts, error_3;
    return __generator(this, function (_b) {
        switch (_b.label) {
            case 0:
                _b.trys.push([0, 5, , 6]);
                orderID = req.body.orderID;
                return [4 /*yield*/, captureOrder(orderID)];
            case 1:
                _a = _b.sent(), jsonResponse = _a.jsonResponse, httpStatusCode = _a.httpStatusCode;
                if (!(httpStatusCode === 201)) return [3 /*break*/, 4];
                userRepository = data_source_1.AppDataSource.getRepository(Payment_1.Payment);
                payment = new Payment_1.Payment();
                payment.cardName = jsonResponse.payer.name.given_name + jsonResponse.payer.name.surname;
                payment.cvc = jsonResponse.purchase_units[0].postal_code;
                payment.cardNumber = jsonResponse.payment_source.paypal.account_id;
                payment.totalPrice = jsonResponse.purchase_units[0].payments.captures[0].amount.value;
                payment.user = req.user.user.id;
                return [4 /*yield*/, userRepository.save(payment)];
            case 2:
                _b.sent();
                storeRepository = data_source_1.AppDataSource.getRepository(Store_1.Store);
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
            case 3:
                allProducts = _b.sent();
                res.json({ allProducts: allProducts });
                _b.label = 4;
            case 4: return [3 /*break*/, 6];
            case 5:
                error_3 = _b.sent();
                console.error("Failed to capture order:", error_3);
                res.status(500).json({ error: "Failed to capture order." });
                return [3 /*break*/, 6];
            case 6: return [2 /*return*/];
        }
    });
}); };
//# sourceMappingURL=PaymentController.js.map