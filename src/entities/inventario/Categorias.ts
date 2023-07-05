import { Entity, Column, BaseEntity, OneToMany} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import { Productos } from './Productos';


@Entity({schema: 'inventario'})
export class Categorias extends ModelEntity {

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({name: 'descripcion',length: 25, nullable: false})
    Descripcion: String;

    @OneToMany(() => Productos, (producto) => producto.CategoriaId)
    ProductosId: Productos
}