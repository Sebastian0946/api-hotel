import {Router} from 'express'
import { createCategoria, deleteCategoria, getCategoria, getCategoriaId, updateCategoria } from '../../controller/invetarioController/CategoriaController'

const router = Router()

router.post('/inventario/categoria', createCategoria);

router.get('/inventario/categoria', getCategoria);

router.put('/inventario/categoria/:id', updateCategoria);

router.delete('/inventario/categoria/:id', deleteCategoria);

router.get('/inventario/categoria/:id', getCategoriaId);

export default router;