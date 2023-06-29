import { Entity, Column, JoinColumn, ManyToOne} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Categorias} from './Categorias'

@Entity({schema: 'inventario'})
export class Productos extends ModelEntity {

    @ManyToOne(() => Categorias)
    @JoinColumn({name: 'categoriaId'})
    CategoriaId: Categorias;

    @Column({name: 'codigo',length: 45})
    Codigo: string;

    @Column({name: 'nombre',length: 45})
    Nombre: string;
}
