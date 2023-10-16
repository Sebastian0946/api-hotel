import {Router} from 'express'
import { PersonaController } from '../../controller/seguridadController/PersonaController'
import { PersonaRepository } from '../../repository/seguridadRepository/PersonaRepository';

const router = Router()

const controller = new PersonaController(
    new PersonaRepository()
);

router.post('/seguridad/persona', controller.create.bind(controller));

router.get('/seguridad/persona', controller.list.bind(controller));

router.get('/seguridad/persona/:id', controller.get.bind(controller));

router.put('/seguridad/persona/:id', controller.update.bind(controller));

router.put('/seguridad/persona/eliminar/:id', controller.remove.bind(controller));

router.get('/seguridad/persona/documento/:documento', controller.findDocument.bind(controller))

export default router;