import {Router} from 'express'
import { createProducto, deleteProducto, getProducto, getProductoId, updateProducto } from '../../controller/invetarioController/ProductoController'

const router = Router()

router.post('/inventario/producto', createProducto);

router.get('/inventario/producto', getProducto);

router.put('/inventario/producto/:id', updateProducto);

router.delete('/inventario/producto/:id', deleteProducto);

router.get('/inventario/producto/:id', getProductoId);

export default router;