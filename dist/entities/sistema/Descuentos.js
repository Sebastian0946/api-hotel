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
exports.Descuentos = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const ReservaHabitaciones_1 = require("./ReservaHabitaciones");
let Descuentos = exports.Descuentos = class Descuentos extends ModelEntity_1.ModelEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo', unique: true, length: 25, nullable: false }),
    __metadata("design:type", String)
], Descuentos.prototype, "Codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'porcentajeDescuento', type: 'double precision', nullable: false }),
    __metadata("design:type", Number)
], Descuentos.prototype, "PorcentajeDescuento", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReservaHabitaciones_1.ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.DescuentoId),
    __metadata("design:type", ReservaHabitaciones_1.ReservaHabitaciones)
], Descuentos.prototype, "ReservaHabitacionId", void 0);
exports.Descuentos = Descuentos = __decorate([
    (0, typeorm_1.Entity)({ schema: '' })
], Descuentos);
