// Rutas Seguridad
import usurioRoutes from './routes/seguridadRoutes/Usuarios.routes';
import personaRoutes from './routes/seguridadRoutes/Personas.routes';
import formularioRoutes from './routes/seguridadRoutes/Formularios.routes';
import moduloRoutes from './routes/seguridadRoutes/Modules.routes';
import rolRoutes from './routes/seguridadRoutes/Roles.routes';
import usuarioRolRoutes from './routes/seguridadRoutes/UsuariosRoles.routes';
import formularioRolRoutes from './routes/seguridadRoutes/FormulariosRoles.routes';

// Rutas Inventario
import categoriaRoutes from './routes/inventarioRoutes/Categorias.routes';
import inventarioRoutes from './routes/inventarioRoutes/Inventarios.routes';
import productoRoutes from './routes/inventarioRoutes/Productos.routes';


const routes = [
  usurioRoutes,
  personaRoutes,
  formularioRoutes,
  moduloRoutes,
  rolRoutes,
  usuarioRolRoutes,
  formularioRolRoutes,
  categoriaRoutes,
  inventarioRoutes,
  productoRoutes
];

export default routes;
