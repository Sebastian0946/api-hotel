import { Entity, Column, OneToMany} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import { Formularios } from './Formularios';


@Entity({schema: ''})
export class Modulos extends ModelEntity {

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({name: 'ruta',length: 25, nullable: false})
    Ruta: String;

    @Column({name: 'etiqueta', length: 25, nullable: false, unique: true})
    Etiqueta: String

    @OneToMany(() => Formularios, (formulario) => formulario.ModuloId)
    FormularioId: Formularios[];
}
