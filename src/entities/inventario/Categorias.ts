import { Entity, Column} from 'typeorm';
import { ModelEntity } from '../ModelEntity';


@Entity({schema: 'inventario'})
export class Categorias extends ModelEntity {

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({name: 'nombre',length: 25, nullable: false})
    Nombre: String;
}
