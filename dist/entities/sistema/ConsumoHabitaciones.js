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
exports.ConsumoHabitaciones = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const Productos_1 = require("../inventario/Productos");
const ReservaHabitaciones_1 = require("./ReservaHabitaciones");
const Descuentos_1 = require("./Descuentos");
let ConsumoHabitaciones = exports.ConsumoHabitaciones = class ConsumoHabitaciones extends ModelEntity_1.ModelEntity {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => Productos_1.Productos, (producto) => producto.ConsumoHabitacionesId),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", Productos_1.Productos)
], ConsumoHabitaciones.prototype, "ProductoId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => ReservaHabitaciones_1.ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.ConsumoHabitacionesId),
    (0, typeorm_1.JoinColumn)({ name: 'reservaHabitacion_id' }),
    __metadata("design:type", ReservaHabitaciones_1.ReservaHabitaciones)
], ConsumoHabitaciones.prototype, "ReservaHabitacionesId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Descuentos_1.Descuentos, (descuentos) => descuentos.ConsumoHabitacionesId),
    (0, typeorm_1.JoinColumn)({ name: 'descuentos_id' }),
    __metadata("design:type", Descuentos_1.Descuentos)
], ConsumoHabitaciones.prototype, "DescuentoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo', unique: true, length: 25, nullable: false }),
    __metadata("design:type", String)
], ConsumoHabitaciones.prototype, "Codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad', nullable: false }),
    __metadata("design:type", String)
], ConsumoHabitaciones.prototype, "Cantidad", void 0);
exports.ConsumoHabitaciones = ConsumoHabitaciones = __decorate([
    (0, typeorm_1.Entity)()
], ConsumoHabitaciones);
