import { Entity, Column, OneToMany} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import { Habitaciones } from '../sistema/Habitaciones';

export class TipoHabitaciones extends ModelEntity {

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({name: 'descripcion',length: 25, nullable: false})
    Descripcion: String;

    @Column({name: 'cantidad',length: 25, nullable: false})
    Cantidad: String;

    @OneToMany(() => Habitaciones, (habitaciones) => habitaciones.TipoHabitacionesId)
    HabitacionesId!: Habitaciones;
}