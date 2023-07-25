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
exports.CivilianEntity = void 0;
const provider_entity_1 = require("../provider/provider.entity");
const typeorm_1 = require("typeorm");
let CivilianEntity = exports.CivilianEntity = class CivilianEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CivilianEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CivilianEntity.prototype, "name", void 0);
__decorate([
    (0, typeorm_1.Column)({ length: 80, unique: true }),
    __metadata("design:type", String)
], CivilianEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CivilianEntity.prototype, "email", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CivilianEntity.prototype, "contact", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], CivilianEntity.prototype, "age", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CivilianEntity.prototype, "gender", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CivilianEntity.prototype, "profession", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], CivilianEntity.prototype, "ProviderID", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => provider_entity_1.ProviderEntity, Provider => Provider.Civilians, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'ProviderID' }),
    __metadata("design:type", provider_entity_1.ProviderEntity)
], CivilianEntity.prototype, "Provider", void 0);
exports.CivilianEntity = CivilianEntity = __decorate([
    (0, typeorm_1.Entity)('Civilian')
], CivilianEntity);
//# sourceMappingURL=civilian.entity.js.map