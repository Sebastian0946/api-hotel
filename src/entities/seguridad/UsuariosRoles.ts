import { Entity, ManyToOne, JoinColumn} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Usuarios} from './Usuarios';
import {Roles} from './Roles';

@Entity({schema: 'seguridad'})
export class UsuariosRoles extends ModelEntity {

    @ManyToOne(() => Roles)
    @JoinColumn({ name: 'rolId'})
    RolesId: Roles;

    @ManyToOne(() => Usuarios)
    @JoinColumn({ name: 'usuarioId'})
    UsuariosId: Usuarios;

}
