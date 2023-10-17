import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { ModelEntity } from "../ModelEntity";
import { Habitaciones } from "./Habitaciones";
import { Descuentos } from "./Descuentos";
import { ConsumoHabitaciones } from "./ConsumoHabitaciones";

@Entity({ schema: '' })
export class ReservaHabitaciones extends ModelEntity {

    @ManyToOne(() => Habitaciones, (habitacion) => habitacion.ReservaHabitacionId)
    @JoinColumn({ name: 'habitacion_id' })
    HabitacionId: Habitaciones;

    @ManyToOne(() => Descuentos, (descuento) => descuento.ReservaHabitacionId, { nullable: true })
    @JoinColumn({ name: 'descuento_id' })
    DescuentoId: Descuentos | null;

    @Column({ name: 'codigo', unique: true, length: 25, nullable: false })
    Codigo: String;

    @Column({ name: 'fechaEntrada', type: 'timestamp', nullable: false })
    FechaEntrada: Date;
    
    @Column({ name: 'fechaSalida', type: 'timestamp', nullable: false })
    FechaSalida: Date;

    @OneToMany(() => ConsumoHabitaciones, (consumoHabitacion) => consumoHabitacion.ReservaHabitacionesId)
    ConsumoHabitacionesId: ConsumoHabitaciones;
}