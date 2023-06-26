import {Router} from 'express'
import { createRoles, deleteRoles, getRoles, getRolesId, updateRoles } from '../../controller/seguridadController/RolesController'

const router = Router()

router.post('/seguridad/rol', createRoles);

router.get('/seguridad/rol', getRoles);

router.put('/seguridad/rol/:id', updateRoles);

router.delete('/seguridad/rol/:id', deleteRoles);

router.get('/seguridad/rol/:id', getRolesId);

export default router;