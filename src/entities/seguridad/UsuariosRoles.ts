import { Entity, ManyToOne, JoinColumn} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Usuarios} from './Usuarios';
import {Roles} from './Roles';

@Entity({schema: 'seguridad'})
export class UsuariosRoles extends ModelEntity {

    @ManyToOne(() => Roles)
    @JoinColumn({ name: 'rol_id'})
    RolesId: Roles;

    @ManyToOne(() => Usuarios)
    @JoinColumn({ name: 'usuario_id'})
    UsuariosId: Usuarios;

}
