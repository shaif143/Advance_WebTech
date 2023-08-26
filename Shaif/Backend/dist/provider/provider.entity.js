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
exports.ProviderEntity = void 0;
const service_entity_1 = require("../service/service.entity");
const civilian_entity_1 = require("../civilian/civilian.entity");
const typeorm_1 = require("typeorm");
const bankinfo_entity_1 = require("../bankingDetails/bankinfo.entity");
let ProviderEntity = exports.ProviderEntity = class ProviderEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ProviderEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 150 }),
    __metadata("design:type", String)
], ProviderEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, unique: true }),
    __metadata("design:type", String)
], ProviderEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProviderEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], ProviderEntity.prototype, "password", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], ProviderEntity.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", String)
], ProviderEntity.prototype, "photoFileName", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => civilian_entity_1.CivilianEntity, Civilian => Civilian.Provider, { cascade: ["remove"] }),
    __metadata("design:type", Array)
], ProviderEntity.prototype, "Civilians", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => bankinfo_entity_1.BankingEntity, (bankinfo) => bankinfo.Provider, { cascade: ["remove"] }),
    __metadata("design:type", bankinfo_entity_1.BankingEntity)
], ProviderEntity.prototype, "bankinfo", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => service_entity_1.ServiceEntity, Service => Service.Provider, { cascade: ["remove"] }),
    __metadata("design:type", Array)
], ProviderEntity.prototype, "Services", void 0);
exports.ProviderEntity = ProviderEntity = __decorate([
    (0, typeorm_1.Entity)('Provider')
], ProviderEntity);
//# sourceMappingURL=provider.entity.js.map