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

    @Column({name: 'ocupacion', nullable: false})
    Ocupado: Boolean;

    @OneToMany(() => InventariosHabitaciones, (inventarioHabitaciones) => inventarioHabitaciones.AdministracionHabitacionId)
    InventarioHabitacionesId: InventariosHabitaciones

    @OneToMany(() => ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.HabitacionId)
    ReservaHabitacionId: ReservaHabitaciones
}