import { Router } from 'express'
import { UsuarioController } from '../../controller/seguridadController/UsuarioController'
import { UsuarioRepository } from '../../repository/seguridadRepository/UsuarioRepository';

const router = Router()

const controller = new UsuarioController(

    new UsuarioRepository()

);

router.post('/seguridad/usuario', controller.create.bind(controller));

router.get('/seguridad/usuario',  controller.list.bind(controller));

router.get('/seguridad/usuario/:id', controller.get.bind(controller));

router.get('/seguridad/usuario/permisos/:usuario/:contrasena', controller.getPermission.bind(controller));

router.get('/seguridad/usuario/login/:usuario/:contrasena', controller.getLogin.bind(controller));

router.put('/seguridad/usuario/:id',  controller.update.bind(controller));

router.put('/seguridad/usuario/eliminar/:id',  controller.remove.bind(controller));

export default router;