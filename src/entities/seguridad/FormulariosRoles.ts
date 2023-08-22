import { Entity, ManyToOne, JoinColumn} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Formularios} from './Formularios';
import {Roles} from './Roles';

export class FormulariosRoles extends ModelEntity {

    @ManyToOne(() => Roles)
    @JoinColumn({name: 'rol_id'})
    RolesId: Roles;
    
    @ManyToOne(() => Formularios)
    @JoinColumn({name: 'formulario_id'})
    FormulariosId: Formularios;
}