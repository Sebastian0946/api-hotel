import {Router} from 'express'
import { ConfiguracionSistemaController } from '../../controller/parametrizacionController/ConfiguracionSistemaController'
import { ConfiguracionSistemaRepository } from '../../repository/parametrizacionRepository/ConfiguracionSistemaRepostiroty';

const router = Router()

const controller = new ConfiguracionSistemaController(
    
    new ConfiguracionSistemaRepository()

);

router.post('/parametrizacion/configuracionSistema', controller.create.bind(controller));

router.get('/parametrizacion/configuracionSistema', controller.list.bind(controller));

router.get('/parametrizacion/configuracionSistema/:id', controller.get.bind(controller));

router.put('/parametrizacion/configuracionSistema/:id', controller.update.bind(controller));

router.delete('/parametrizacion/configuracionSistema/:id', controller.remove.bind(controller));

export default router;