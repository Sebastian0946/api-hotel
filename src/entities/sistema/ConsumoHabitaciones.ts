import { Column, ManyToOne, JoinColumn, Entity, OneToOne } from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import { ReservaHabitaciones } from './ReservaHabitaciones';
import { EstadoFacturas } from './EstadoFacturas';

@Entity({ schema: '' })
export class ConsumoHabitaciones extends ModelEntity {

    @ManyToOne(() => ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.ConsumoHabitacionesId)
    @JoinColumn({ name: 'reservaHabitacion_id' })
    ReservaHabitacionesId: ReservaHabitaciones;

    @Column({ name: 'codigo', unique: true, length: 25, nullable: false })
    Codigo: String;

    @Column({ name: 'cantidad', nullable: false })
    Cantidad: String;

    @OneToOne(() => EstadoFacturas, (estadoFactura) => estadoFactura.ConsumoHabitacionesId)
    EstadoFacturaId: EstadoFacturas;
}