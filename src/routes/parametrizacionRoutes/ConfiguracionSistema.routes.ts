import {Router} from 'express'
import { ConfiguracionSistemaController } from '../../controller/parametrizacionController/ConfiguracionSistemaController'
import { ConfiguracionSistemaRepository } from '../../repository/parametrizacionRepository/ConfiguracionSistemaRepostiroty';

const router = Router()

const controller = new ConfiguracionSistemaController(
    
    new ConfiguracionSistemaRepository()

);

router.post('/parametrizacion/configuracionSistema', controller.create.bind(controller));

router.get('/inventario/configuracionSistema', controller.list.bind(controller));

router.get('/inventario/configuracionSistema/:id', controller.get.bind(controller));

router.put('/inventario/configuracionSistema/:id', controller.update.bind(controller));

router.delete('/inventario/configuracionSistema/:id', controller.remove.bind(controller));

export default router;