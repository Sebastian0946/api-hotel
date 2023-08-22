import { Entity, Column, ManyToOne, JoinColumn, OneToMany} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import { TipoHabitaciones } from '../parametrizacion/TipoHabitaciones';
import { InventariosHabitaciones } from '../inventario/InventariosHabitaciones';
import { ReservaHabitaciones } from './ReservaHabitaciones';

@Entity({schema: 'public'})
export class Habitaciones extends ModelEntity {

    @ManyToOne(() => TipoHabitaciones, (tipoHabitaciones) => tipoHabitaciones.HabitacionesId)
    @JoinColumn({name: 'tipoHabitaciones_id'})
    TipoHabitacionesId: TipoHabitaciones;

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({name: 'descripcion',length: 25, nullable: false})
    Descripcion: String;

    // Relacion con Inventario Habitaciones
    @OneToMany(() => InventariosHabitaciones, (inventarioHabitaciones) => inventarioHabitaciones.AdministracionHabitacionId)
    InventarioHabitacionesId: InventariosHabitaciones

    // Relacion con Reserva Haitaciones
    @OneToMany(() => ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.HabitacionId)
    ReservaHabitacionId: ReservaHabitaciones
}