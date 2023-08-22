import { Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Inventarios} from './Inventarios';
import { Habitaciones } from '../sistema/Habitaciones';

export class InventariosHabitaciones extends ModelEntity {
    
    @Column({name: 'codigo',length: 45, nullable: false})
    Codigo: string;

    @ManyToOne(() => Inventarios, (inventario) => inventario.InventarioHabitacionesId)
    @JoinColumn({name: 'inventario_id'})
    InventarioId: Inventarios;

    @ManyToOne(() => Habitaciones, (habitaciones) => habitaciones.InventarioHabitacionesId)
    @JoinColumn({name: 'administracionHabitacion_id'})
    AdministracionHabitacionId: Habitaciones;

    @Column({name: 'cantidad', nullable: false})
    Cantidad: String;
}
