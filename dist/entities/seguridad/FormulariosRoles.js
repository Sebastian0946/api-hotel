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
exports.FormulariosRoles = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const Formularios_1 = require("./Formularios");
const Roles_1 = require("./Roles");
let FormulariosRoles = exports.FormulariosRoles = class FormulariosRoles extends ModelEntity_1.ModelEntity {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => Roles_1.Roles),
    (0, typeorm_1.JoinColumn)({ name: 'rol_id' }),
    __metadata("design:type", Roles_1.Roles)
], FormulariosRoles.prototype, "RolesId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Formularios_1.Formularios),
    (0, typeorm_1.JoinColumn)({ name: 'formulario_id' }),
    __metadata("design:type", Formularios_1.Formularios)
], FormulariosRoles.prototype, "FormulariosId", void 0);
exports.FormulariosRoles = FormulariosRoles = __decorate([
    (0, typeorm_1.Entity)()
], FormulariosRoles);
