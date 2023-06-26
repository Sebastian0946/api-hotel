import {Router} from 'express'
import { createFormularioRol, deleteFormularioRol, getFormularioRol, getFormularioRolId, updateFormularioRol } from '../../controller/seguridadController/FormularioRolController'

const router = Router()

router.post('/seguridad/formularioRol', createFormularioRol);

router.get('/seguridad/formularioRol', getFormularioRol);

router.put('/seguridad/formularioRol/:id', updateFormularioRol);

router.delete('/seguridad/formularioRol/:id', deleteFormularioRol);

router.get('/seguridad/formularioRol/:id', getFormularioRolId);

export default router;