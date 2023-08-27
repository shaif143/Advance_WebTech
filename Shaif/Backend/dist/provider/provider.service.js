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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProviderService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const civilian_entity_1 = require("../civilian/civilian.entity");
const bankinfo_entity_1 = require("../bankingDetails/bankinfo.entity");
const typeorm_2 = require("typeorm");
const provider_entity_1 = require("./provider.entity");
const bcrypt = require("bcrypt");
const service_entity_1 = require("../service/service.entity");
const dist_1 = require("@nestjs-modules/mailer/dist");
const email_log_entity_1 = require("./email-log.entity");
let ProviderService = exports.ProviderService = class ProviderService {
    constructor(ProviderRepo, CivilianRepo, ServiceRepo, BankRepo, mailerService, EmailRepo) {
        this.ProviderRepo = ProviderRepo;
        this.CivilianRepo = CivilianRepo;
        this.ServiceRepo = ServiceRepo;
        this.BankRepo = BankRepo;
        this.mailerService = mailerService;
        this.EmailRepo = EmailRepo;
    }
    async regProvider(ProviderRegInfo) {
        const salt = await bcrypt.genSalt();
        ProviderRegInfo.password = await bcrypt.hash(ProviderRegInfo.password, salt);
        return this.ProviderRepo.save(ProviderRegInfo);
    }
    async loginProvider(ProviderLoginInfo) {
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderLoginInfo.username });
        if (Provider != null) {
            const isMatch = await bcrypt.compare(ProviderLoginInfo.password, Provider.password);
            console.log(isMatch);
            return isMatch;
        }
        else {
            return false;
        }
    }
    async uploadProvider(fileName, username) {
        const Provider = await this.ProviderRepo.findOneBy({ username: username });
        console.log(username);
        if (Provider) {
            Provider.photoFileName = fileName;
            await this.ProviderRepo.save(Provider);
            return "Provider Photo Uploaded!";
        }
        return "Provider Photo Couldn't be Uploaded!";
    }
    async getProviderPhotoFileName(username) {
        const provider = await this.ProviderRepo.findOneBy({ username });
        if (provider && provider.photoFileName) {
            return provider.photoFileName;
        }
        return null;
    }
    async viewProviderProfile(ProviderUsername) {
        console.log(ProviderUsername);
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        if (Provider) {
            const { id, name, email, contact } = Provider;
            return { id, name, email, contact };
        }
        return "Provider not found!";
    }
    async updateProviderInfo(ProviderUpdateInfo, ProviderUsername) {
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        ProviderUpdateInfo.id = Provider.id;
        const salt = await bcrypt.genSalt();
        ProviderUpdateInfo.password = await bcrypt.hash(ProviderUpdateInfo.password, salt);
        await this.ProviderRepo.update({ id: Provider.id }, ProviderUpdateInfo);
        console.log("update!");
        return this.ProviderRepo.findOneBy({ id: Provider.id });
    }
    async addServices(ServiceAddInfo, ProviderUsername) {
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        ServiceAddInfo.ProviderID = Provider.id;
        return this.ServiceRepo.save(ServiceAddInfo);
    }
    async addBankInfo(addBankInfo, ProviderUsername) {
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        addBankInfo.ProviderID = Provider.id;
        return this.BankRepo.save(addBankInfo);
    }
    async regCivilian(CivilianRegInfo, ProviderUsername) {
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        CivilianRegInfo.ProviderID = Provider.id;
        return this.CivilianRepo.save(CivilianRegInfo);
    }
    async sendMailToCivilian(messageInfo, providerUsername) {
        const provider = await this.ProviderRepo.findOneBy({ username: providerUsername });
        await this.mailerService.sendMail({
            to: messageInfo.receiver,
            subject: 'Civilian ' + provider.name + ' : ' + messageInfo.subject,
            text: messageInfo.message,
        });
        const emailLog = this.EmailRepo.create({
            senderUsername: providerUsername,
            receiver: messageInfo.receiver,
            subject: messageInfo.subject,
            message: messageInfo.message,
        });
        await this.EmailRepo.save(emailLog);
    }
    async viewService(username) {
        const provider = await this.ProviderRepo.findOne({ where: { username } });
        const Services = await this.ServiceRepo.find({
            where: {
                Provider: provider,
            },
        });
        return Services;
    }
    async viewBankInfo(username) {
        const provider = await this.ProviderRepo.findOne({ where: { username } });
        const Information = await this.BankRepo.find({
            where: {
                Provider: provider,
            },
        });
        return Information;
    }
    async viewCivilian(username) {
        const provider = await this.ProviderRepo.findOne({ where: { username } });
        const civilian = await this.CivilianRepo.find({
            where: {
                Provider: provider,
            },
        });
        return civilian;
    }
    async viewEmails(providerUsername) {
        return this.EmailRepo.find({
            where: {
                senderUsername: providerUsername,
            },
            order: {
                sentAt: 'DESC',
            },
        });
    }
    async getCivilianById(CivilianId, ProviderUsername) {
        console.log(ProviderUsername);
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        if (!Provider) {
            return null;
        }
        const Civilian = await this.CivilianRepo.findOne({
            where: {
                id: CivilianId,
                Provider: Provider
            }
        });
        return Civilian;
    }
    async removeProvider(ProviderUsername) {
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        await this.ProviderRepo.delete(Provider.id);
    }
    async removeCivilian(CivilianId, ProviderUsername) {
        console.log("CivilianId:", CivilianId);
        console.log("ProviderUsername:", ProviderUsername);
        const Civilian = await this.CivilianRepo.findOneBy({ id: CivilianId });
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        console.log("Civilian:", Civilian);
        console.log("Provider:", Provider);
        if (!Civilian) {
            return "Civilian not found!";
        }
        if (!Provider) {
            return "Provider not found!";
        }
        const ProviderId = Provider.id;
        if (Civilian.ProviderID == ProviderId) {
            await this.CivilianRepo.delete(CivilianId);
            console.log("Civilian Deleted!");
            return "Civilian Deleted!";
        }
        else {
            console.log("Couldn't Delete!");
            return "Couldn't Delete!";
        }
    }
};
exports.ProviderService = ProviderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(provider_entity_1.ProviderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(civilian_entity_1.CivilianEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(service_entity_1.ServiceEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(bankinfo_entity_1.BankingEntity)),
    __param(5, (0, typeorm_1.InjectRepository)(email_log_entity_1.EmailEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        dist_1.MailerService,
        typeorm_2.Repository])
], ProviderService);
//# sourceMappingURL=provider.service.js.map