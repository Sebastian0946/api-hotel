import {Router} from 'express'
import { createFormulario, deleteFormulario, getFormulario, getFormularioId, updateFormulario } from '../../controller/seguridadController/FormularioController'

const router = Router()

router.post('/seguridad/formulario', createFormulario);

router.get('/seguridad/formulario', getFormulario);

router.put('/seguridad/formulario/:id', updateFormulario);

router.delete('/seguridad/formulario/:id', deleteFormulario);

router.get('/seguridad/formulario/:id', getFormularioId);

export default router;