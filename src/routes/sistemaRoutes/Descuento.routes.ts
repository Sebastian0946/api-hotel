import {Router} from 'express'
import { DescuentosController } from '../../controller/sistemaController/DescuentoController'
import { DescuentosRepository } from '../../repository/sistemaRepository/DescuentosRepository';

const router = Router()

const controller = new DescuentosController(
    
    new DescuentosRepository()

);

router.post('/sistema/descuento', controller.create.bind(controller));

router.get('/sistema/descuento', controller.list.bind(controller));

router.get('/sistema/descuento/:id', controller.get.bind(controller));

router.put('/sistema/descuento/:id', controller.update.bind(controller));

router.delete('/sistema/descuento/:id', controller.remove.bind(controller));

export default router;