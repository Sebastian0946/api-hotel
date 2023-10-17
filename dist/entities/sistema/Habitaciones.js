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
exports.Habitaciones = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const TipoHabitaciones_1 = require("../parametrizacion/TipoHabitaciones");
const InventariosHabitaciones_1 = require("../inventario/InventariosHabitaciones");
const ReservaHabitaciones_1 = require("./ReservaHabitaciones");
const Huespedes_1 = require("./Huespedes");
let Habitaciones = exports.Habitaciones = class Habitaciones extends ModelEntity_1.ModelEntity {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => TipoHabitaciones_1.TipoHabitaciones, (tipoHabitaciones) => tipoHabitaciones.HabitacionesId),
    (0, typeorm_1.JoinColumn)({ name: 'tipoHabitaciones_id' }),
    __metadata("design:type", TipoHabitaciones_1.TipoHabitaciones)
], Habitaciones.prototype, "TipoHabitacionesId", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Huespedes_1.Huespedes, (huesped) => huesped.HabitacionesId),
    (0, typeorm_1.JoinColumn)({ name: 'huesped_id' }),
    __metadata("design:type", Huespedes_1.Huespedes)
], Habitaciones.prototype, "HuespedId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo', unique: true, length: 25, nullable: false }),
    __metadata("design:type", String)
], Habitaciones.prototype, "Codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'descripcion', length: 25, nullable: false }),
    __metadata("design:type", String)
], Habitaciones.prototype, "Descripcion", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'ocupacion', nullable: false }),
    __metadata("design:type", Boolean)
], Habitaciones.prototype, "Ocupado", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InventariosHabitaciones_1.InventariosHabitaciones, (inventarioHabitaciones) => inventarioHabitaciones.AdministracionHabitacionId),
    __metadata("design:type", InventariosHabitaciones_1.InventariosHabitaciones)
], Habitaciones.prototype, "InventarioHabitacionesId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReservaHabitaciones_1.ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.HabitacionId),
    __metadata("design:type", ReservaHabitaciones_1.ReservaHabitaciones)
], Habitaciones.prototype, "ReservaHabitacionId", void 0);
exports.Habitaciones = Habitaciones = __decorate([
    (0, typeorm_1.Entity)({ schema: '' })
], Habitaciones);
