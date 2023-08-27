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
exports.ProviderController = void 0;
const common_1 = require("@nestjs/common");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const service_dto_1 = require("../service/service.dto");
const civilian_dto_1 = require("../civilian/civilian.dto");
const bankinfo_dto_1 = require("../bankingDetails/bankinfo.dto");
const provider_dto_1 = require("./provider.dto");
const provider_service_1 = require("./provider.service");
const session_guard_1 = require("./session.guard");
const typeorm_1 = require("@nestjs/typeorm");
const email_log_entity_1 = require("./email-log.entity");
const typeorm_2 = require("typeorm");
let ProviderController = exports.ProviderController = class ProviderController {
    constructor(ProviderService, emailLogRepository) {
        this.ProviderService = ProviderService;
        this.emailLogRepository = emailLogRepository;
    }
    async regProvider(providerRegInfo) {
        try {
            await this.ProviderService.regProvider(providerRegInfo);
            return "Provider Registration Successful!";
        }
        catch (error) {
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    async loginProvider(ProviderLoginInfo, session) {
        console.log(ProviderLoginInfo);
        const result = await this.ProviderService.loginProvider(ProviderLoginInfo);
        if (result) {
            session.username = ProviderLoginInfo.username;
            console.log("login session username: " + session.username);
            return session.username;
        }
        else {
            return new common_1.NotFoundException({ message: "Provider Not Found!" });
        }
    }
    uploadProvider(photoObj, session) {
        console.log(photoObj.filename);
        const fileName = photoObj.filename;
        return this.ProviderService.uploadProvider(fileName, session.username);
    }
    async getProviderPhoto(filename, res) {
        return res.sendFile(filename, { root: './uploads' });
    }
    async getLoggedInProviderPhoto(session, res) {
        const username = session.username;
        const filename = await this.ProviderService.getProviderPhotoFileName(username);
        if (filename) {
            return res.redirect(`/provider/photo/${encodeURIComponent(filename)}`);
        }
        else {
            return "Something went wrong";
        }
    }
    viewProviderProfile(session) {
        return this.ProviderService.viewProviderProfile(session.username);
    }
    updateProviderInfo(ProviderUpdateInfo, session) {
        console.log(ProviderUpdateInfo);
        this.ProviderService.updateProviderInfo(ProviderUpdateInfo, session.username);
        return "Provider info updated successfully!";
    }
    addServices(ServiceAddInfo, session) {
        console.log(ServiceAddInfo);
        this.ProviderService.addServices(ServiceAddInfo, session.username);
        return "Service Added Successfully";
    }
    addBankInfo(addBankInfo, session) {
        try {
            console.log(addBankInfo);
            return this.ProviderService.addBankInfo(addBankInfo, session.username);
        }
        catch (error) {
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    regCivilian(CivilianRegInfo, session) {
        try {
            console.log(CivilianRegInfo);
            return this.ProviderService.regCivilian(CivilianRegInfo, session.username);
        }
        catch (error) {
            throw new common_1.HttpException('Internal Server Error', common_1.HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
    sendMailToCivilian(messageInfo, session) {
        console.log(messageInfo);
        this.ProviderService.sendMailToCivilian(messageInfo, session.username);
        return "E-mail Send Successful!";
    }
    viewNotification(session) {
        return this.ProviderService.viewService(session.username);
    }
    viewBankInfo(session) {
        return this.ProviderService.viewBankInfo(session.username);
    }
    viewCivilian(session) {
        return this.ProviderService.viewCivilian(session.username);
    }
    viewEmails(session) {
        return this.ProviderService.viewEmails(session.username);
    }
    removeProvider(session) {
        this.ProviderService.removeProvider(session.username);
        return "Account Deleted successfully";
    }
    getCivilianById(CivilianId, session) {
        return this.ProviderService.getCivilianById(CivilianId, session.username);
    }
    removeCivilian(CivilianId, session) {
        return this.ProviderService.removeCivilian(CivilianId, session.username);
    }
    logoutManager(req) {
        if (req.session.destroy()) {
            console.log('Provider Sign Out');
            return true;
        }
        else {
            throw new common_1.UnauthorizedException("Invalid Actions : Cannot Sign Out Provider!");
        }
    }
};
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provider_dto_1.ProviderRegDTO]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "regProvider", null);
__decorate([
    (0, common_1.Post)('login'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provider_dto_1.ProviderLoginDTO, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "loginProvider", null);
__decorate([
    (0, common_1.Put)('upload'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg|gif)$/)) {
                cb(null, true);
            }
            else {
                cb(new multer_1.MulterError('LIMIT_UNEXPECTED_FILE', 'image'), false);
            }
        },
        limits: { fileSize: 300000 },
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: function (req, file, cb) {
                cb(null, Date.now() + file.originalname);
            },
        })
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "uploadProvider", null);
__decorate([
    (0, common_1.Get)('photo/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getProviderPhoto", null);
__decorate([
    (0, common_1.Get)('photo'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __param(1, (0, common_1.Res)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getLoggedInProviderPhoto", null);
__decorate([
    (0, common_1.Get)('/profile'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "viewProviderProfile", null);
__decorate([
    (0, common_1.Put)('updateinfo'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provider_dto_1.ProviderUpdateDTO, Object]),
    __metadata("design:returntype", Object)
], ProviderController.prototype, "updateProviderInfo", null);
__decorate([
    (0, common_1.Post)('provideServices'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_dto_1.ServiceAddDTO, Object]),
    __metadata("design:returntype", Object)
], ProviderController.prototype, "addServices", null);
__decorate([
    (0, common_1.Post)('/addBankInfo'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [bankinfo_dto_1.BankInfoDTO, Object]),
    __metadata("design:returntype", Object)
], ProviderController.prototype, "addBankInfo", null);
__decorate([
    (0, common_1.Post)('/addCivilian'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [civilian_dto_1.CivilianRegDTO, Object]),
    __metadata("design:returntype", Object)
], ProviderController.prototype, "regCivilian", null);
__decorate([
    (0, common_1.Post)('sendmail/civilian'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provider_dto_1.ProviderMessageDTO, Object]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "sendMailToCivilian", null);
__decorate([
    (0, common_1.Get)('/getAllservices'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "viewNotification", null);
__decorate([
    (0, common_1.Get)('/getBankInfo'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "viewBankInfo", null);
__decorate([
    (0, common_1.Get)('/getAllCivilian'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "viewCivilian", null);
__decorate([
    (0, common_1.Get)('/emailHistory'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "viewEmails", null);
__decorate([
    (0, common_1.Delete)('remove'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProviderController.prototype, "removeProvider", null);
__decorate([
    (0, common_1.Get)('search/Civilian/:CivilianId'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('CivilianId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], ProviderController.prototype, "getCivilianById", null);
__decorate([
    (0, common_1.Delete)('remove/Civilian/:CivilianId'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Param)('CivilianId', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", Object)
], ProviderController.prototype, "removeCivilian", null);
__decorate([
    (0, common_1.Post)('logout'),
    __param(0, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "logoutManager", null);
exports.ProviderController = ProviderController = __decorate([
    (0, common_1.Controller)('Provider'),
    __param(1, (0, typeorm_1.InjectRepository)(email_log_entity_1.EmailEntity)),
    __metadata("design:paramtypes", [provider_service_1.ProviderService,
        typeorm_2.Repository])
], ProviderController);
//# sourceMappingURL=provider.controller.js.map