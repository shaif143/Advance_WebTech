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
exports.CivilianRegDTO = void 0;
const class_validator_1 = require("class-validator");
class CivilianRegDTO {
}
exports.CivilianRegDTO = CivilianRegDTO;
__decorate([
    (0, class_validator_1.IsString)({ message: "Invalid Name" }),
    (0, class_validator_1.Matches)(/^[a-z A-Z]+$/, { message: "Use Valid Name Format" }),
    (0, class_validator_1.MaxLength)(200),
    __metadata("design:type", String)
], CivilianRegDTO.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Invalid Name" }),
    (0, class_validator_1.Matches)(/^[a-zA-Z0-9@._$]+$/, { message: "Use Valid Username Format" }),
    __metadata("design:type", String)
], CivilianRegDTO.prototype, "username", void 0);
__decorate([
    (0, class_validator_1.IsEmail)({}, { message: "Invalid E-mail!" }),
    __metadata("design:type", String)
], CivilianRegDTO.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: "Invalid Contact!" }),
    __metadata("design:type", Number)
], CivilianRegDTO.prototype, "contact", void 0);
__decorate([
    (0, class_validator_1.IsInt)({ message: "Invalid Age!" }),
    __metadata("design:type", Number)
], CivilianRegDTO.prototype, "age", void 0);
__decorate([
    (0, class_validator_1.IsString)({ message: "Invalid Name!" }),
    __metadata("design:type", String)
], CivilianRegDTO.prototype, "profession", void 0);
//# sourceMappingURL=civilian.dto.js.map