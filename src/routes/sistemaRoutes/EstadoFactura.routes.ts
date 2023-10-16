import {Router} from 'express'
import { EstadoFacturaController } from '../../controller/sistemaController/EstadoFacturaController'
import { EstadoFacturaRepository } from '../../repository/sistemaRepository/EstadoFacturaRepository';

const router = Router()

const controller = new EstadoFacturaController(
    
    new EstadoFacturaRepository()

);

router.post('/sistema/estadoFactura', controller.create.bind(controller));

router.get('/sistema/estadoFactura', controller.list.bind(controller));

router.get('/sistema/estadoFactura/:id', controller.get.bind(controller));

router.put('/sistema/estadoFactura/:id', controller.update.bind(controller));

router.put('/sistema/estadoFactura/eliminar/:id', controller.remove.bind(controller));

export default router;