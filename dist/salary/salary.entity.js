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
exports.SalaryEntity = void 0;
const typeorm_1 = require("typeorm");
const provider_entity_1 = require("../provider/provider.entity");
let SalaryEntity = exports.SalaryEntity = class SalaryEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], SalaryEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, unique: true }),
    __metadata("design:type", String)
], SalaryEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], SalaryEntity.prototype, "salary", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], SalaryEntity.prototype, "ProviderID", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => provider_entity_1.ProviderEntity, Provider => Provider.salary),
    __metadata("design:type", provider_entity_1.ProviderEntity)
], SalaryEntity.prototype, "Provider", void 0);
exports.SalaryEntity = SalaryEntity = __decorate([
    (0, typeorm_1.Entity)("Salary Information")
], SalaryEntity);
//# sourceMappingURL=salary.entity.js.map