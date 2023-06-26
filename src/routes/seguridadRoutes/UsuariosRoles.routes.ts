import {Router} from 'express'
import { createUsuarioRol, deleteUsuarioRol, getUsuarioRol, getUsuarioRolId, updateUsuarioRol } from '../../controller/seguridadController/UsuarioRolController'

const router = Router()

router.post('/seguridad/usuarioRol', createUsuarioRol);

router.get('/seguridad/usuarioRol', getUsuarioRol);

router.put('/seguridad/usuarioRol/:id', updateUsuarioRol);

router.delete('/seguridad/usuarioRol/:id', deleteUsuarioRol);

router.get('/seguridad/usuarioRol/:id', getUsuarioRolId);

export default router;