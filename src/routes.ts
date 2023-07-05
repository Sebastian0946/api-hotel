// Rutas Seguridad
import usurioRoutes from './routes/seguridadRoutes/Usuarios.routes';
import personaRoutes from './routes/seguridadRoutes/Personas.routes';
import formularioRoutes from './routes/seguridadRoutes/Formularios.routes';
import moduloRoutes from './routes/seguridadRoutes/Modulos.routes';
import rolRoutes from './routes/seguridadRoutes/Roles.routes';
import usuarioRolRoutes from './routes/seguridadRoutes/UsuariosRoles.routes';
import formularioRolRoutes from './routes/seguridadRoutes/FormulariosRoles.routes';

// Rutas Inventario
import categoriaRoutes from './routes/inventarioRoutes/Categorias.routes';
import inventarioRoutes from './routes/inventarioRoutes/Inventarios.routes';
import productoRoutes from './routes/inventarioRoutes/Productos.routes';
import inventarioHabitacionRoutes from './routes/inventarioRoutes/InventarioHabitacion.routes';

//Rutas parametrizacion
import ConfiguracionSistemaRoutes from './routes/parametrizacionRoutes/ConfiguracionSistema.routes';
import TipoHabitacion from './routes/parametrizacionRoutes/TipoHabitacion.routes';

//Rutas Sistema
import ConsumoHabitacionRoutes from './routes/sistemaRoutes/ConsumoHabitacion.routes';
import DescuentoRoutes from './routes/sistemaRoutes/Descuento.routes';
import EstadoFacturaRoutes from './routes/sistemaRoutes/EstadoFactura.routes';
import HabitacionRoutes from './routes/sistemaRoutes/Habitacion.routes';
import HuespedRoutes from './routes/sistemaRoutes/Huesped.routes';
import ReservaHabitacionRoutes from './routes/sistemaRoutes/ReservaHabitacion.routes';

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
  productoRoutes,
  inventarioHabitacionRoutes,
  ConfiguracionSistemaRoutes,
  TipoHabitacion,
  ConsumoHabitacionRoutes,
  EstadoFacturaRoutes,
  DescuentoRoutes,
  HabitacionRoutes,
  HuespedRoutes,
  ReservaHabitacionRoutes
];

export default routes;
