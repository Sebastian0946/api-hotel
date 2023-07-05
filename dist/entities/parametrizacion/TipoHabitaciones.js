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
exports.TipoHabitaciones = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const Habitaciones_1 = require("../sistema/Habitaciones");
let TipoHabitaciones = exports.TipoHabitaciones = class TipoHabitaciones extends ModelEntity_1.ModelEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo', unique: true, length: 25, nullable: false }),
    __metadata("design:type", String)
], TipoHabitaciones.prototype, "Codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion', length: 25, nullable: false }),
    __metadata("design:type", String)
], TipoHabitaciones.prototype, "Descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad', length: 25, nullable: false }),
    __metadata("design:type", String)
], TipoHabitaciones.prototype, "Cantidad", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Habitaciones_1.Habitaciones, (habitaciones) => habitaciones.TipoHabitacionesId),
    __metadata("design:type", Habitaciones_1.Habitaciones)
], TipoHabitaciones.prototype, "HabitacionesId", void 0);
exports.TipoHabitaciones = TipoHabitaciones = __decorate([
    (0, typeorm_1.Entity)()
], TipoHabitaciones);
