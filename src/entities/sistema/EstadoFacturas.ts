import { Column, Entity, OneToMany } from "typeorm";
import { ModelEntity } from "../ModelEntity";

@Entity({schema: ''})
export class EstadoFacturas extends ModelEntity{

    @Column({name: 'codigo', unique: true, length: 25})
    Codigo: string

    @Column({name: 'descripcion', unique: true, length: 25})
    Descripcion: string
}