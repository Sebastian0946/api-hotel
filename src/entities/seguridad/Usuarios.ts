import { Entity, Column, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Personas} from './Personas'
import { Huespedes } from '../sistema/Huespedes';
import { ConfiguracionSistema } from '../parametrizacion/ConfiguracionSistema';


@Entity({schema: ''})
export class Usuarios extends ModelEntity {

    @OneToOne(() => Personas, (persona) => persona.UsuarioId)
    @JoinColumn({ name: 'persona_id' })
    PersonaId: Personas;

    @Column({name: 'usuario',length: 25, unique: true})
    Usuario: string;

    @Column({name: 'contrasena',length: 100, unique: true})
    Contraseña: string;

    @OneToMany(() => Huespedes, (huesped) => huesped.UsuarioId)
    HuespedId: Huespedes

    @OneToMany(() => ConfiguracionSistema, (configuracionSistema) => configuracionSistema.UsuarioId)
    ConfiguracionSistemaId: ConfiguracionSistema;
}
