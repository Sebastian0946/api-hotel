import { Column, ManyToOne, JoinColumn, OneToMany, Entity, OneToOne} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import { TipoHabitaciones } from '../parametrizacion/TipoHabitaciones';
import { InventariosHabitaciones } from '../inventario/InventariosHabitaciones';
import { ReservaHabitaciones } from './ReservaHabitaciones';
import { Huespedes } from './Huespedes';

@Entity({schema: ''})
export class Habitaciones extends ModelEntity {

    @ManyToOne(() => TipoHabitaciones, (tipoHabitaciones) => tipoHabitaciones.HabitacionesId)
    @JoinColumn({name: 'tipoHabitaciones_id'})
    TipoHabitacionesId: TipoHabitaciones;

    @OneToOne(() => Huespedes, (huesped) => huesped.HabitacionesId)
    @JoinColumn({ name: 'huesped_id' })
    HuespedId: Huespedes;
    
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