import {Router} from 'express'
import { FormularioController } from '../../controller/seguridadController/FormularioController'
import { FormularioRepository } from '../../repository/seguridadRepository/FormularioRepository';

const router = Router()

const controller = new FormularioController(
    
    new FormularioRepository()

);

router.post('/seguridad/formulario', controller.create.bind(controller));

router.get('/seguridad/formulario', controller.list.bind(controller));

router.get('/seguridad/formulario/:id', controller.get.bind(controller));

router.put('/seguridad/formulario/:id', controller.update.bind(controller));

router.delete('/seguridad/formulario/:id', controller.remove.bind(controller));


export default router;