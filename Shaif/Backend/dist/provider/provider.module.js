"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const service_entity_1 = require("../service/service.entity");
const civilian_entity_1 = require("../civilian/civilian.entity");
const provider_controller_1 = require("./provider.controller");
const provider_entity_1 = require("./provider.entity");
const provider_service_1 = require("./provider.service");
const bankinfo_entity_1 = require("../bankingDetails/bankinfo.entity");
const mailer_1 = require("@nestjs-modules/mailer");
const email_log_entity_1 = require("./email-log.entity");
let ProviderModule = exports.ProviderModule = class ProviderModule {
};
exports.ProviderModule = ProviderModule = __decorate([
    (0, common_1.Module)({
        imports: [typeorm_1.TypeOrmModule.forFeature([provider_entity_1.ProviderEntity, civilian_entity_1.CivilianEntity, service_entity_1.ServiceEntity, bankinfo_entity_1.BankingEntity, email_log_entity_1.EmailEntity]), mailer_1.MailerModule.forRoot({
                transport: {
                    host: 'smtp.gmail.com',
                    port: 465,
                    ignoreTLS: true,
                    secure: true,
                    auth: {
                        user: 'daruchinicheradip@gmail.com',
                        pass: 'nfzymfrzjbbdcpmi'
                    }
                }
            })],
        controllers: [provider_controller_1.ProviderController],
        providers: [provider_service_1.ProviderService]
    })
], ProviderModule);
//# sourceMappingURL=provider.module.js.map