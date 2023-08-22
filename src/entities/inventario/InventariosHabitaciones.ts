import { Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Inventarios} from './Inventarios';
import { Habitaciones } from '../sistema/Habitaciones';

@Entity({schema: 'inventario'})
export class InventariosHabitaciones extends ModelEntity {
    
    @ManyToOne(() => Inventarios, (inventario) => inventario.InventarioHabitacionesId)
    @JoinColumn({name: 'inventario_id'})
    InventarioId: Inventarios;

    @ManyToOne(() => Habitaciones, (habitaciones) => habitaciones.InventarioHabitacionesId)
    @JoinColumn({name: 'administracionHabitacion_id'})
    AdministracionHabitacionId: Habitaciones;

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({name: 'cantidad', nullable: false})
    Cantidad: String;
}
