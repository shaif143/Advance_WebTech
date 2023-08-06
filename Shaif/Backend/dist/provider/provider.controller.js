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
const provider_dto_1 = require("./provider.dto");
const provider_service_1 = require("./provider.service");
const session_guard_1 = require("./session.guard");
let ProviderController = exports.ProviderController = class ProviderController {
    constructor(ProviderService) {
        this.ProviderService = ProviderService;
    }
    gethellow() {
        return "hello!";
    }
    regProvider(ProviderRegInfo) {
        console.log(ProviderRegInfo);
        return this.ProviderService.regProvider(ProviderRegInfo);
    }
    async loginProvider(ProviderLoginInfo, session) {
        console.log(ProviderLoginInfo);
        if (await this.ProviderService.loginProvider(ProviderLoginInfo)) {
            session.username = ProviderLoginInfo.username;
            return "Provider Login Successful!";
        }
        else {
            return "Provider Login Failed!";
        }
    }
    Logout(session) {
        if (session.destroy()) {
            return { message: "Log out" };
        }
        else {
            throw new common_1.UnauthorizedException("Invalid action");
        }
    }
    uploadProvider(photoObj, session) {
        console.log(photoObj.filename);
        const fileName = photoObj.filename;
        return this.ProviderService.uploadProvider(fileName, session.username);
    }
    getCivilianByProviderId(session) {
        return this.ProviderService.getCivilianByProviderId(session.username);
    }
    async getAllServices(session) {
        return this.ProviderService.getAllServices();
    }
    getServicesByProvider(providerid) {
        return this.ProviderService.getServicesByProvider(providerid);
    }
    updateProviderInfo(ProviderUpdateInfo, session) {
        console.log(ProviderUpdateInfo);
        return this.ProviderService.updateProviderInfo(ProviderUpdateInfo, session.username);
    }
    removeProvider(session) {
        return this.ProviderService.removeProvider(session.username);
    }
    removeCivilian(CivilianId, session) {
        return this.ProviderService.removeCivilian(CivilianId, session.username);
    }
    viewProfile(session) {
        return this.ProviderService.viewProfile(session.username);
    }
    regCivilian(CivilianRegInfo, session) {
        console.log(CivilianRegInfo);
        return this.ProviderService.regCivilian(CivilianRegInfo, session.username);
    }
    addSalary(salary) {
        console.log(salary);
        return this.ProviderService.addSalary(salary);
    }
    addServices(ServiceAddInfo, session) {
        console.log(ServiceAddInfo);
        return this.ProviderService.addServices(ServiceAddInfo, session.username);
    }
    sendMailToCivilian(messageInfo, session) {
        console.log(messageInfo);
        this.ProviderService.sendMailToCivilian(messageInfo, session.username);
        return "E-mail Send Successful!";
    }
};
__decorate([
    (0, common_1.Get)('/'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Object)
], ProviderController.prototype, "gethellow", null);
__decorate([
    (0, common_1.Post)('register'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provider_dto_1.ProviderRegDTO]),
    __metadata("design:returntype", Object)
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
    (0, common_1.Get)('/signout'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "Logout", null);
__decorate([
    (0, common_1.Put)('upload'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('image', {
        fileFilter: (req, file, cb) => {
            if (file.originalname.match(/^.*\.(jpg|webp|png|jpeg)$/)) {
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
    (0, common_1.Get)('search/Civilian'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProviderController.prototype, "getCivilianByProviderId", null);
__decorate([
    (0, common_1.Get)('getAllServices'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProviderController.prototype, "getAllServices", null);
__decorate([
    (0, common_1.Get)('/getservice/:providerid'),
    __param(0, (0, common_1.Param)('providerid', common_1.ParseIntPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "getServicesByProvider", null);
__decorate([
    (0, common_1.Put)('updateinfo'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provider_dto_1.ProviderUpdateDTO, Object]),
    __metadata("design:returntype", Object)
], ProviderController.prototype, "updateProviderInfo", null);
__decorate([
    (0, common_1.Delete)('remove'),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProviderController.prototype, "removeProvider", null);
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
    (0, common_1.Get)('/profile'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Object)
], ProviderController.prototype, "viewProfile", null);
__decorate([
    (0, common_1.Post)('register/Civilian'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [civilian_dto_1.CivilianRegDTO, Object]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "regCivilian", null);
__decorate([
    (0, common_1.Post)('/addSalary'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "addSalary", null);
__decorate([
    (0, common_1.Post)('addServices'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [service_dto_1.ServiceAddDTO, Object]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "addServices", null);
__decorate([
    (0, common_1.Post)('sendmail/civilian'),
    (0, common_1.UseGuards)(session_guard_1.SessionGuard),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Session)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [provider_dto_1.ProviderMessageDTO, Object]),
    __metadata("design:returntype", void 0)
], ProviderController.prototype, "sendMailToCivilian", null);
exports.ProviderController = ProviderController = __decorate([
    (0, common_1.Controller)('Provider'),
    __metadata("design:paramtypes", [provider_service_1.ProviderService])
], ProviderController);
//# sourceMappingURL=provider.controller.js.map