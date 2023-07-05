import { Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Modulos} from './Modulos'

@Entity({schema: 'seguridad'})
export class Formularios extends ModelEntity {

    @ManyToOne(() => Modulos, (modulo) => modulo.FormularioId)
    @JoinColumn({name: 'modulo_id'})
    ModuloId: Modulos;

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({name: 'icon', nullable: false})
    Icono: String

    @Column({name: 'ruta',length: 25, nullable: false, unique: true})
    Ruta: String;

    @Column({name: 'etiqueta', length: 25, nullable: false, unique: true})
    Etiqueta: String
}