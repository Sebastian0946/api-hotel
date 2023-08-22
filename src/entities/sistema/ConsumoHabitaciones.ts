import { Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import { Productos } from '../inventario/Productos';
import { ReservaHabitaciones } from './ReservaHabitaciones';
import { Descuentos } from './Descuentos';

@Entity({schema: 'public'})
export class ConsumoHabitaciones extends ModelEntity {
    
    @ManyToOne(() => Productos, (producto) => producto.ConsumoHabitacionesId)
    @JoinColumn({name: 'producto_id'})
    ProductoId: Productos;

    @ManyToOne(() => ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.ConsumoHabitacionesId)
    @JoinColumn({name: 'reservaHabitacion_id'})
    ReservaHabitacionesId: ReservaHabitaciones;

    @ManyToOne(() => Descuentos, (descuentos) => descuentos.ConsumoHabitacionesId)
    @JoinColumn({name: 'descuentos_id'})
    DescuentoId: Descuentos;

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({name: 'cantidad', nullable: false})
    Cantidad: String;
}