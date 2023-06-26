import {Router} from 'express'
import { createPersona, deletePersona, getPersona, getPersonaId, updatePersona } from '../../controller/seguridadController/PersonaController'

const router = Router()

router.post('/seguridad/persona', createPersona);

router.get('/seguridad/persona', getPersona);

router.put('/seguridad/persona/:id', updatePersona);

router.delete('/seguridad/persona/:id', deletePersona);

router.get('/seguridad/persona/:id', getPersonaId);

export default router;