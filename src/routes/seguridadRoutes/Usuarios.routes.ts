import {Router} from 'express'
import { createUsuario, deleteUsuario, getUsuario, getUsuarioId, updateUsuario } from '../../controller/seguridadController/UsuarioController'

const router = Router()

router.post('/seguridad/usuario', createUsuario);

router.get('/seguridad/usuario', getUsuario);

router.put('/seguridad/usuario/:id', updateUsuario);

router.delete('/seguridad/usuario/:id', deleteUsuario);

router.get('/seguridad/usuario/:id', getUsuarioId);

export default router;