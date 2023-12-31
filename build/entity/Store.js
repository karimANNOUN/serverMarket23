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
exports.Store = void 0;
var typeorm_1 = require("typeorm");
var User_1 = require("./User");
var Product_1 = require("./Product");
var Store = exports.Store = /** @class */ (function () {
    function Store() {
    }
    __decorate([
        (0, typeorm_1.PrimaryGeneratedColumn)(),
        __metadata("design:type", Number)
    ], Store.prototype, "id", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return User_1.User; }, function (author) { return author.store; }),
        __metadata("design:type", User_1.User)
    ], Store.prototype, "author", void 0);
    __decorate([
        (0, typeorm_1.ManyToOne)(function () { return Product_1.Product; }, function (product) { return product.store; }),
        __metadata("design:type", Product_1.Product)
    ], Store.prototype, "product", void 0);
    Store = __decorate([
        (0, typeorm_1.Entity)()
    ], Store);
    return Store;
}());
//# sourceMappingURL=Store.js.map