import {Router} from 'express'
import { createModulo, deleteModulo, getModulo, getModuloId, updateModulo } from '../../controller/seguridadController/ModuloController'

const router = Router()

router.post('/seguridad/modulo', createModulo);

router.get('/seguridad/modulo', getModulo);

router.put('/seguridad/modulo/:id', updateModulo);

router.delete('/seguridad/modulo/:id', deleteModulo);

router.get('/seguridad/modulo/:id', getModuloId);

export default router;