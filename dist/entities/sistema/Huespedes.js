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
exports.Huespedes = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const Personas_1 = require("../seguridad/Personas");
const ReservaHabitaciones_1 = require("./ReservaHabitaciones");
const Habitaciones_1 = require("./Habitaciones");
let Huespedes = exports.Huespedes = class Huespedes extends ModelEntity_1.ModelEntity {
};
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo', unique: true, length: 25, nullable: false }),
    __metadata("design:type", String)
], Huespedes.prototype, "Codigo", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => Personas_1.Personas, (Personas) => Personas.HuespedId),
    (0, typeorm_1.JoinColumn)({ name: 'persona_id' }),
    __metadata("design:type", Personas_1.Personas)
], Huespedes.prototype, "PersonaId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ReservaHabitaciones_1.ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.HabitacionId),
    __metadata("design:type", ReservaHabitaciones_1.ReservaHabitaciones)
], Huespedes.prototype, "ReservaHabitacionId", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => Habitaciones_1.Habitaciones, (habitaciones) => habitaciones.HuespedId),
    __metadata("design:type", Habitaciones_1.Habitaciones)
], Huespedes.prototype, "HabitacionesId", void 0);
exports.Huespedes = Huespedes = __decorate([
    (0, typeorm_1.Entity)({ schema: '' })
], Huespedes);
