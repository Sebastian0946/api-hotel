import {Router} from 'express'
import { ModuloController } from '../../controller/seguridadController/ModuloController'
import { ModuloRepository } from '../../repository/seguridadRepository/ModuloRepository';

const router = Router()

const controller = new ModuloController(
    
    new ModuloRepository()

);


router.post('/seguridad/modulo', controller.create.bind(controller));

router.get('/seguridad/modulo', controller.list.bind(controller));

router.get('/seguridad/modulo/:id', controller.get.bind(controller));

router.put('/seguridad/modulo/:id', controller.update.bind(controller));

router.delete('/seguridad/modulo/:id', controller.remove.bind(controller));


export default router;