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
exports.InventariosHabitaciones = void 0;
const typeorm_1 = require("typeorm");
const ModelEntity_1 = require("../ModelEntity");
const Inventarios_1 = require("./Inventarios");
const Habitaciones_1 = require("../sistema/Habitaciones");
class InventariosHabitaciones extends ModelEntity_1.ModelEntity {
}
exports.InventariosHabitaciones = InventariosHabitaciones;
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo', length: 45, nullable: false }),
    __metadata("design:type", String)
], InventariosHabitaciones.prototype, "Codigo", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Inventarios_1.Inventarios, (inventario) => inventario.InventarioHabitacionesId),
    (0, typeorm_1.JoinColumn)({ name: 'inventario_id' }),
    __metadata("design:type", Inventarios_1.Inventarios)
], InventariosHabitaciones.prototype, "InventarioId", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => Habitaciones_1.Habitaciones, (habitaciones) => habitaciones.InventarioHabitacionesId),
    (0, typeorm_1.JoinColumn)({ name: 'administracionHabitacion_id' }),
    __metadata("design:type", Habitaciones_1.Habitaciones)
], InventariosHabitaciones.prototype, "AdministracionHabitacionId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad', nullable: false }),
    __metadata("design:type", String)
], InventariosHabitaciones.prototype, "Cantidad", void 0);
