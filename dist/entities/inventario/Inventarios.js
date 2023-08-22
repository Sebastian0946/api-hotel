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
const InventariosHabitaciones_1 = require("./InventariosHabitaciones");
let Inventarios = exports.Inventarios = class Inventarios extends ModelEntity_1.ModelEntity {
};
__decorate([
    (0, typeorm_1.ManyToOne)(() => Productos_1.Productos, (producto) => producto.InventarioId),
    (0, typeorm_1.JoinColumn)({ name: 'producto_id' }),
    __metadata("design:type", Productos_1.Productos)
], Inventarios.prototype, "ProductoId", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'codigo', unique: true, length: 25, nullable: false }),
    __metadata("design:type", String)
], Inventarios.prototype, "Codigo", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'cantidad', nullable: false }),
    __metadata("design:type", String)
], Inventarios.prototype, "Cantidad", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_proveedor', type: 'double precision', nullable: false }),
    __metadata("design:type", Number)
], Inventarios.prototype, "PrecioProveedor", void 0);
__decorate([
    (0, typeorm_1.Column)({ name: 'precio_venta', type: 'double precision', nullable: false }),
    __metadata("design:type", Number)
], Inventarios.prototype, "PrecioVenta", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => InventariosHabitaciones_1.InventariosHabitaciones, (inventarioHabitaciones) => inventarioHabitaciones.InventarioId),
    __metadata("design:type", InventariosHabitaciones_1.InventariosHabitaciones)
], Inventarios.prototype, "InventarioHabitacionesId", void 0);
exports.Inventarios = Inventarios = __decorate([
    (0, typeorm_1.Entity)()
], Inventarios);
