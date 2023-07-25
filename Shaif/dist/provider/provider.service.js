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
const salary_entity_1 = require("../salary/salary.entity");
const typeorm_2 = require("typeorm");
const provider_entity_1 = require("./provider.entity");
const bcrypt = require("bcrypt");
const service_entity_1 = require("../service/service.entity");
const dist_1 = require("@nestjs-modules/mailer/dist");
let ProviderService = exports.ProviderService = class ProviderService {
    constructor(ProviderRepo, CivilianRepo, ServiceRepo, SalaryRepo, mailerService) {
        this.ProviderRepo = ProviderRepo;
        this.CivilianRepo = CivilianRepo;
        this.ServiceRepo = ServiceRepo;
        this.SalaryRepo = SalaryRepo;
        this.mailerService = mailerService;
    }
    async regProvider(ProviderRegInfo) {
        const salt = await bcrypt.genSalt();
        ProviderRegInfo.password = await bcrypt.hash(ProviderRegInfo.password, salt);
        return this.ProviderRepo.save(ProviderRegInfo);
    }
    async loginProvider(ProviderLoginInfo) {
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderLoginInfo.username });
        const isMatch = await bcrypt.compare(ProviderLoginInfo.password, Provider.password);
        console.log(isMatch);
        return isMatch;
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
    async getCivilianByProviderId(ProviderUsername) {
        console.log(ProviderUsername);
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        const ProviderId = Provider.id;
        return this.ProviderRepo.find({
            where: { id: ProviderId },
            relations: { Civilians: true }
        });
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
    async removeProvider(ProviderUsername) {
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        await this.ProviderRepo.delete(Provider.id);
    }
    async removeCivilian(CivilianId, ProviderUsername) {
        const Civilian = await this.CivilianRepo.findOneBy({ id: CivilianId });
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        const ProviderId = Provider.id;
        if (Civilian.ProviderID == ProviderId) {
            await this.CivilianRepo.delete(CivilianId);
            return "Civilian Deleted!";
        }
        else {
            return "Couldn't Delete!";
        }
    }
    async viewProfile(ProviderUsername) {
        console.log(ProviderUsername);
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        const ProviderId = Provider.id;
        return this.ProviderRepo.find({
            where: { id: ProviderId }
        });
    }
    async regCivilian(CivilianRegInfo, ProviderUsername) {
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        CivilianRegInfo.ProviderID = Provider.id;
        return this.CivilianRepo.save(CivilianRegInfo);
    }
    async addSalary(salary) {
        return this.SalaryRepo.save(salary);
    }
    async addServices(ServiceAddInfo, ProviderUsername) {
        const Provider = await this.ProviderRepo.findOneBy({ username: ProviderUsername });
        ServiceAddInfo.ProviderID = Provider.id;
        return this.ServiceRepo.save(ServiceAddInfo);
    }
    async getAllServices() {
        return this.ServiceRepo.find();
    }
    async getServicesByProvider(providerid) {
        return this.ProviderRepo.find({
            where: { id: providerid },
            relations: {
                Services: true,
            },
        });
    }
    async sendMailToCivilian(messageInfo, providerUsername) {
        const provider = await this.ProviderRepo.findOneBy({ username: providerUsername });
        const providerName = provider.name;
        await this.mailerService.sendMail({
            to: "daruchinicheradip@gmail.com",
            subject: "Civilian " + providerName + " : " + messageInfo.subject,
            text: messageInfo.message,
        });
    }
    async Logout(session, username) {
        const Search = await this.ProviderRepo.find({
            select: {
                name: true,
                id: true,
                password: false
            },
            where: {
                username: username,
            }
        });
        session.destroy();
        return "Logout Successfully";
    }
};
__decorate([
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String]),
    __metadata("design:returntype", Promise)
], ProviderService.prototype, "Logout", null);
exports.ProviderService = ProviderService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(provider_entity_1.ProviderEntity)),
    __param(1, (0, typeorm_1.InjectRepository)(civilian_entity_1.CivilianEntity)),
    __param(2, (0, typeorm_1.InjectRepository)(service_entity_1.ServiceEntity)),
    __param(3, (0, typeorm_1.InjectRepository)(salary_entity_1.SalaryEntity)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        typeorm_2.Repository,
        dist_1.MailerService])
], ProviderService);
//# sourceMappingURL=provider.service.js.map