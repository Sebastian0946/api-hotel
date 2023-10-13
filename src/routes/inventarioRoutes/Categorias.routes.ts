import {Router} from 'express'
import { CategoriaController } from '../../controller/invetarioController/CategoriaController'
import { CategoriaRepository } from '../../repository/invetarioRepository/CategoriaRepository';

const router = Router()

const controller = new CategoriaController(
    new CategoriaRepository()
);

router.post('/inventario/categoria', controller.create.bind(controller));

router.get('/inventario/categoria', controller.list.bind(controller));

router.get('/inventario/categoria/:id', controller.get.bind(controller));

router.put('/inventario/categoria/:id', controller.update.bind(controller));

router.delete('/inventario/categoria/:id', controller.remove.bind(controller));

export default router;