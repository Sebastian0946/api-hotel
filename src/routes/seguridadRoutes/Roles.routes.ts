import {Router} from 'express'
import { RolController } from '../../controller/seguridadController/RolesController'
import { RolRepository } from '../../repository/seguridadRepository/RolesRepository';

const router = Router()

const controller = new RolController(
    
    new RolRepository()

);

router.post('/seguridad/rol', controller.create.bind(controller));

router.get('/seguridad/rol', controller.list.bind(controller));

router.get('/seguridad/rol/:id', controller.get.bind(controller));

router.put('/seguridad/rol/:id', controller.update.bind(controller));

router.put('/seguridad/rol/eliminar/:id', controller.remove.bind(controller));

export default router;