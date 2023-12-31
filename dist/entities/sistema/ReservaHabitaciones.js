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
exports.ReservaHabitaciones = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const Habitaciones_1 = require("./Habitaciones");
const Descuentos_1 = require("./Descuentos");
const ConsumoHabitaciones_1 = require("./ConsumoHabitaciones");
let ReservaHabitaciones = exports.ReservaHabitaciones = class ReservaHabitaciones extends ModelEntity_1.ModelEntity {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => Habitaciones_1.Habitaciones, (habitacion) => habitacion.ReservaHabitacionId),
    (0, typeorm_1.JoinColumn)({ name: 'habitacion_id' }),
    __metadata("design:type", Habitaciones_1.Habitaciones)
], ReservaHabitaciones.prototype, "HabitacionId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Descuentos_1.Descuentos, (descuento) => descuento.ReservaHabitacionId, { nullable: true }),
    (0, typeorm_1.JoinColumn)({ name: 'descuento_id' }),
    __metadata("design:type", Object)
], ReservaHabitaciones.prototype, "DescuentoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo', unique: true, length: 25, nullable: false }),
    __metadata("design:type", String)
], ReservaHabitaciones.prototype, "Codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_entrada', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], ReservaHabitaciones.prototype, "FechaEntrada", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'fecha_salida', type: 'timestamp', nullable: false }),
    __metadata("design:type", Date)
], ReservaHabitaciones.prototype, "FechaSalida", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => ConsumoHabitaciones_1.ConsumoHabitaciones, (consumoHabitacion) => consumoHabitacion.ReservaHabitacionesId),
    __metadata("design:type", ConsumoHabitaciones_1.ConsumoHabitaciones)
], ReservaHabitaciones.prototype, "ConsumoHabitacionesId", void 0);
exports.ReservaHabitaciones = ReservaHabitaciones = __decorate([
    (0, typeorm_1.Entity)({ schema: '' })
], ReservaHabitaciones);
