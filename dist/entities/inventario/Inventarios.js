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
exports.Inventarios = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const Productos_1 = require("./Productos");
let Inventarios = exports.Inventarios = class Inventarios extends ModelEntity_1.ModelEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'habitacionId', unique: true, nullable: false }),
    __metadata("design:type", String)
], Inventarios.prototype, "HabitacionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Productos_1.Productos),
    (0, typeorm_1.JoinColumn)({ name: 'productoId' }),
    __metadata("design:type", Productos_1.Productos)
], Inventarios.prototype, "ProductoId", void 0);
exports.Inventarios = Inventarios = __decorate([
    (0, typeorm_1.Entity)()
], Inventarios);
