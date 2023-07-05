"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// Entidades Seguridad
const Usuarios_1 = require("./entities/seguridad/Usuarios");
const Personas_1 = require("./entities/seguridad/Personas");
const Modulos_1 = require("./entities/seguridad/Modulos");
const Roles_1 = require("./entities/seguridad/Roles");
const UsuariosRoles_1 = require("./entities/seguridad/UsuariosRoles");
const FormulariosRoles_1 = require("./entities/seguridad/FormulariosRoles");
const Formularios_1 = require("./entities/seguridad/Formularios");
// Entidades Inventario
const Productos_1 = require("./entities/inventario/Productos");
const Inventarios_1 = require("./entities/inventario/Inventarios");
const Categorias_1 = require("./entities/inventario/Categorias");
const InventariosHabitaciones_1 = require("./entities/inventario/InventariosHabitaciones");
// Entidades Parametrizacion
const TipoHabitaciones_1 = require("./entities/parametrizacion/TipoHabitaciones");
const ConfiguracionSistema_1 = require("./entities/parametrizacion/ConfiguracionSistema");
// Entidades Sistema
const Huespedes_1 = require("./entities/sistema/Huespedes");
const EstadoFacturas_1 = require("./entities/sistema/EstadoFacturas");
const Habitaciones_1 = require("./entities/sistema/Habitaciones");
const ConsumoHabitaciones_1 = require("./entities/sistema/ConsumoHabitaciones");
const ReservaHabitaciones_1 = require("./entities/sistema/ReservaHabitaciones");
const Descuentos_1 = require("./entities/sistema/Descuentos");
const Entities = [
    Usuarios_1.Usuarios,
    Personas_1.Personas,
    Modulos_1.Modulos,
    Roles_1.Roles,
    UsuariosRoles_1.UsuariosRoles,
    FormulariosRoles_1.FormulariosRoles,
    Formularios_1.Formularios,
    Productos_1.Productos,
    Inventarios_1.Inventarios,
    Categorias_1.Categorias,
    InventariosHabitaciones_1.InventariosHabitaciones,
    TipoHabitaciones_1.TipoHabitaciones,
    ConfiguracionSistema_1.ConfiguracionSistema,
    Huespedes_1.Huespedes,
    EstadoFacturas_1.EstadoFacturas,
    Habitaciones_1.Habitaciones,
    ConsumoHabitaciones_1.ConsumoHabitaciones,
    ReservaHabitaciones_1.ReservaHabitaciones,
    Descuentos_1.Descuentos
];
exports.default = Entities;
