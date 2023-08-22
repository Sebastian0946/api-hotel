import { Column, OneToOne, JoinColumn, OneToMany} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Personas} from './Personas'
import { Huespedes } from '../sistema/Huespedes';
import { ConfiguracionSistema } from '../parametrizacion/ConfiguracionSistema';

export class Usuarios extends ModelEntity {

    @OneToOne(() => Personas, (persona) => persona.UsuarioId)
    @JoinColumn({ name: 'persona_id' })
    PersonaId: Personas;

    @Column({name: 'usuario',length: 25})
    Usuario: string;

    @Column({name: 'contrasena',length: 100})
    Contraseña: string;

    @OneToMany(() => Huespedes, (huesped) => huesped.UsuarioId)
    HuespedId: Huespedes

    @OneToMany(() => ConfiguracionSistema, (configuracionSistema) => configuracionSistema.UsuarioId)
    ConfiguracionSistemaId: ConfiguracionSistema;
}
