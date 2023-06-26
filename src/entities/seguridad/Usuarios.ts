import { Entity, Column, OneToOne, JoinColumn} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Personas} from './Personas'

@Entity({schema: 'seguridad'})
export class Usuarios extends ModelEntity {

    @OneToOne(() => Personas)
    @JoinColumn({ name: 'personaId' })
    PersonaId: Personas;

    @Column({name: 'usuario',length: 25})
    Usuario: string;

    @Column({name: 'contraseña',length: 100})
    Contraseña: string;
}
