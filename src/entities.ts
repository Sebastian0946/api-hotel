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
  Categorias
];

export default Entities;