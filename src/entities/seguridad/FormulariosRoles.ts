import { Entity, ManyToOne, JoinColumn} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Formularios} from './Formularios';
import {Roles} from './Roles';

@Entity({schema: 'seguridad'})
export class FormulariosRoles extends ModelEntity {

    @ManyToOne(() => Roles)
    @JoinColumn({name: 'rolId'})
    RolesId: Roles;
    
    @ManyToOne(() => Formularios)
    @JoinColumn({name: 'formularioId'})
    FormulariosId: Formularios;
}
