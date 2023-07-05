// Entidades Seguridad
import { Usuarios } from './entities/seguridad/Usuarios';
import { Personas } from './entities/seguridad/Personas';
import { Modulos } from './entities/seguridad/Modulos';
import { Roles } from './entities/seguridad/Roles';
import { UsuariosRoles } from './entities/seguridad/UsuariosRoles';
import { FormulariosRoles } from './entities/seguridad/FormulariosRoles';
import { Formularios } from './entities/seguridad/Formularios';

// Entidades Inventario
import { Productos } from './entities/inventario/Productos';
import { Inventarios } from './entities/inventario/Inventarios';
import { Categorias } from './entities/inventario/Categorias';
import { InventariosHabitaciones } from './entities/inventario/InventariosHabitaciones';

// Entidades Parametrizacion
import { TipoHabitaciones } from './entities/parametrizacion/TipoHabitaciones';
import { ConfiguracionSistema } from './entities/parametrizacion/ConfiguracionSistema';

// Entidades Sistema
import { Huespedes } from './entities/sistema/Huespedes';
import { EstadoFacturas } from './entities/sistema/EstadoFacturas';
import { Habitaciones } from './entities/sistema/Habitaciones';
import { ConsumoHabitaciones } from './entities/sistema/ConsumoHabitaciones';
import { ReservaHabitaciones } from './entities/sistema/ReservaHabitaciones';
import { Descuentos } from './entities/sistema/Descuentos';

const Entities = [
  Usuarios,
  Personas,
  Modulos,
  Roles,
  UsuariosRoles,
  FormulariosRoles,
  Formularios,
  Productos,
  Inventarios,
  Categorias,
  InventariosHabitaciones,
  TipoHabitaciones,
  ConfiguracionSistema,
  Huespedes,
  EstadoFacturas,
  Habitaciones,
  ConsumoHabitaciones,
  ReservaHabitaciones,
  Descuentos
];

export default Entities;