"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Rutas Seguridad
const Usuarios_routes_1 = __importDefault(require("./routes/seguridadRoutes/Usuarios.routes"));
const Personas_routes_1 = __importDefault(require("./routes/seguridadRoutes/Personas.routes"));
const Formularios_routes_1 = __importDefault(require("./routes/seguridadRoutes/Formularios.routes"));
const Modulos_routes_1 = __importDefault(require("./routes/seguridadRoutes/Modulos.routes"));
const Roles_routes_1 = __importDefault(require("./routes/seguridadRoutes/Roles.routes"));
const UsuariosRoles_routes_1 = __importDefault(require("./routes/seguridadRoutes/UsuariosRoles.routes"));
const FormulariosRoles_routes_1 = __importDefault(require("./routes/seguridadRoutes/FormulariosRoles.routes"));
// Rutas Inventario
const Categorias_routes_1 = __importDefault(require("./routes/inventarioRoutes/Categorias.routes"));
const Inventarios_routes_1 = __importDefault(require("./routes/inventarioRoutes/Inventarios.routes"));
const Productos_routes_1 = __importDefault(require("./routes/inventarioRoutes/Productos.routes"));
const InventarioHabitacion_routes_1 = __importDefault(require("./routes/inventarioRoutes/InventarioHabitacion.routes"));
//Rutas parametrizacion
const ConfiguracionSistema_routes_1 = __importDefault(require("./routes/parametrizacionRoutes/ConfiguracionSistema.routes"));
const TipoHabitacion_routes_1 = __importDefault(require("./routes/parametrizacionRoutes/TipoHabitacion.routes"));
//Rutas Sistema
const ConsumoHabitacion_routes_1 = __importDefault(require("./routes/sistemaRoutes/ConsumoHabitacion.routes"));
const Descuento_routes_1 = __importDefault(require("./routes/sistemaRoutes/Descuento.routes"));
const EstadoFactura_routes_1 = __importDefault(require("./routes/sistemaRoutes/EstadoFactura.routes"));
const Habitacion_routes_1 = __importDefault(require("./routes/sistemaRoutes/Habitacion.routes"));
const Huesped_routes_1 = __importDefault(require("./routes/sistemaRoutes/Huesped.routes"));
const ReservaHabitacion_routes_1 = __importDefault(require("./routes/sistemaRoutes/ReservaHabitacion.routes"));
const routes = [
    Usuarios_routes_1.default,
    Personas_routes_1.default,
    Formularios_routes_1.default,
    Modulos_routes_1.default,
    Roles_routes_1.default,
    UsuariosRoles_routes_1.default,
    FormulariosRoles_routes_1.default,
    Categorias_routes_1.default,
    Inventarios_routes_1.default,
    Productos_routes_1.default,
    InventarioHabitacion_routes_1.default,
    ConfiguracionSistema_routes_1.default,
    TipoHabitacion_routes_1.default,
    ConsumoHabitacion_routes_1.default,
    EstadoFactura_routes_1.default,
    Descuento_routes_1.default,
    Habitacion_routes_1.default,
    Huesped_routes_1.default,
    ReservaHabitacion_routes_1.default
];
exports.default = routes;
