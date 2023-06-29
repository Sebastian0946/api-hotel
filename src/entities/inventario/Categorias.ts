import { Entity, Column} from 'typeorm';
import { ModelEntity } from '../ModelEntity';


@Entity({schema: 'inventario'})
export class Categorias extends ModelEntity {

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({name: 'descripcion',length: 25, nullable: false})
    Descripcion: String;
}
