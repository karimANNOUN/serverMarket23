"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
var typeorm_1 = require("typeorm");
var Product_1 = require("./Product");
var Payment_1 = require("./Payment");
var Store_1 = require("./Store");
var User = exports.User = /** @class */ (function () {
    function User() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], User.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "email", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "userName", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "password", void 0);
    __decorate([
        (0, typeorm_1.Column)({ nullable: true }),
        __metadata("design:type", String)
    ], User.prototype, "image", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Product_1.Product; }, function (product) { return product.user; }) // note: we will create author property in the Photo class below
        ,
        __metadata("design:type", Array)
    ], User.prototype, "products", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Store_1.Store; }, function (store) { return store.author; }) // note: we will create author property in the Photo class below
        ,
        __metadata("design:type", Array)
    ], User.prototype, "store", void 0);
    __decorate([
        (0, typeorm_1.OneToMany)(function () { return Payment_1.Payment; }, function (payment) { return payment.user; }) // note: we will create author property in the Photo class below
        ,
        __metadata("design:type", Array)
    ], User.prototype, "payment", void 0);
    User = __decorate([
        (0, typeorm_1.Entity)(),
        (0, typeorm_1.Unique)(['email'])
    ], User);
    return User;
}());
//# sourceMappingURL=User.js.map