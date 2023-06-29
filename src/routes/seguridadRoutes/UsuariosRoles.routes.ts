import {Router} from 'express'
import { UsuarioRolController } from '../../controller/seguridadController/UsuarioRolController'
import { UsuarioRolRepository } from '../../repository/seguridadRepository/UsuarioRolRepository';

const router = Router()

const controller = new UsuarioRolController(
    
    new UsuarioRolRepository()

);

router.post('/seguridad/usuarioRol', controller.create.bind(controller));

router.get('/seguridad/usuarioRol', controller.list.bind(controller));

router.get('/seguridad/usuarioRol/:id', controller.get.bind(controller));

router.put('/seguridad/usuarioRol/:id', controller.update.bind(controller));

router.delete('/seguridad/usuarioRol/:id', controller.remove.bind(controller));

export default router;