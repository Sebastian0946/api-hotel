import { Entity, Column} from 'typeorm';
import { ModelEntity } from '../ModelEntity';


@Entity({schema: 'seguridad'})
export class Modulos extends ModelEntity {

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({name: 'ruta',length: 25, nullable: false, unique: true})
    Ruta: String;

    @Column({name: 'etiquieta', length: 25, nullable: false, unique: true})
    Etiqueta: String
}
