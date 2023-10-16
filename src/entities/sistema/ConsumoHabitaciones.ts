import { Column, ManyToOne, JoinColumn, Entity} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import { Productos } from '../inventario/Productos';
import { ReservaHabitaciones } from './ReservaHabitaciones';

@Entity({schema: ''})
export class ConsumoHabitaciones extends ModelEntity {
    
    @ManyToOne(() => Productos, (producto) => producto.ConsumoHabitacionesId)
    @JoinColumn({name: 'producto_id'})
    ProductoId: Productos;

    @ManyToOne(() => ReservaHabitaciones, (reservaHabitacion) => reservaHabitacion.ConsumoHabitacionesId)
    @JoinColumn({name: 'reservaHabitacion_id'})
    ReservaHabitacionesId: ReservaHabitaciones;

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({name: 'cantidad', nullable: false})
    Cantidad: String;
}