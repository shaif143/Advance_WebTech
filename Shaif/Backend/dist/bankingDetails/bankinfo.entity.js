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
exports.BankingEntity = void 0;
const typeorm_1 = require("typeorm");
const provider_entity_1 = require("../provider/provider.entity");
let BankingEntity = exports.BankingEntity = class BankingEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BankingEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BankingEntity.prototype, "accountName", void 0);
__decorate([
    (0, typeorm_1.Column)({ unique: true }),
    __metadata("design:type", String)
], BankingEntity.prototype, "accountNumber", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], BankingEntity.prototype, "branch", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", Number)
], BankingEntity.prototype, "routingNumber", void 0);
__decorate([
    (0, typeorm_1.Column)({ nullable: true }),
    __metadata("design:type", Number)
], BankingEntity.prototype, "ProviderID", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => provider_entity_1.ProviderEntity, (Provider) => Provider.bankinfo, { onDelete: "CASCADE" }),
    (0, typeorm_1.JoinColumn)({ name: 'ProviderID' }),
    __metadata("design:type", provider_entity_1.ProviderEntity)
], BankingEntity.prototype, "Provider", void 0);
exports.BankingEntity = BankingEntity = __decorate([
    (0, typeorm_1.Entity)("Banking Details")
], BankingEntity);
//# sourceMappingURL=bankinfo.entity.js.map