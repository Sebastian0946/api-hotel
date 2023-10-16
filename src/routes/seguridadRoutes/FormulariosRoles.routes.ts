import {Router} from 'express'
import { FormularioRolController } from '../../controller/seguridadController/FormularioRolController'
import { FormularioRolRepository } from '../../repository/seguridadRepository/FormularioRolRepository';

const router = Router()

const controller = new FormularioRolController(
    
    new FormularioRolRepository()

);

router.post('/seguridad/formularioRol', controller.create.bind(controller));

router.get('/seguridad/formularioRol', controller.list.bind(controller));

router.get('/seguridad/formularioRol/:id', controller.get.bind(controller));

router.put('/seguridad/formularioRol/:id', controller.update.bind(controller));

router.put('/seguridad/formularioRol/eliminar/:id', controller.remove.bind(controller));

export default router;