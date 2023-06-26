"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// Rutas Seguridad
const Usuarios_routes_1 = __importDefault(require("./routes/seguridadRoutes/Usuarios.routes"));
const Personas_routes_1 = __importDefault(require("./routes/seguridadRoutes/Personas.routes"));
const Formularios_routes_1 = __importDefault(require("./routes/seguridadRoutes/Formularios.routes"));
const Modules_routes_1 = __importDefault(require("./routes/seguridadRoutes/Modules.routes"));
const Roles_routes_1 = __importDefault(require("./routes/seguridadRoutes/Roles.routes"));
const UsuariosRoles_routes_1 = __importDefault(require("./routes/seguridadRoutes/UsuariosRoles.routes"));
const FormulariosRoles_routes_1 = __importDefault(require("./routes/seguridadRoutes/FormulariosRoles.routes"));
// Rutas Inventario
const Categorias_routes_1 = __importDefault(require("./routes/inventarioRoutes/Categorias.routes"));
const Inventarios_routes_1 = __importDefault(require("./routes/inventarioRoutes/Inventarios.routes"));
const Productos_routes_1 = __importDefault(require("./routes/inventarioRoutes/Productos.routes"));
const routes = [
    Usuarios_routes_1.default,
    Personas_routes_1.default,
    Formularios_routes_1.default,
    Modules_routes_1.default,
    Roles_routes_1.default,
    UsuariosRoles_routes_1.default,
    FormulariosRoles_routes_1.default,
    Categorias_routes_1.default,
    Inventarios_routes_1.default,
    Productos_routes_1.default
];
exports.default = routes;
