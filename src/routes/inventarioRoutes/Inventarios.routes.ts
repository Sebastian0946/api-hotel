import {Router} from 'express'
import { createInventario, deleteInventario, getInventario, getInventarioId, updateInventario } from '../../controller/invetarioController/InventarioController'

const router = Router()

router.post('/inventario/inventario', createInventario);

router.get('/inventario/inventario', getInventario);

router.put('/inventario/inventario/:id', updateInventario);

router.delete('/inventario/inventario/:id', deleteInventario);

router.get('/inventario/inventario/:id', getInventarioId);

export default router;