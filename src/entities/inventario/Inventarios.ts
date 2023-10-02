import { Entity, Column, ManyToOne, JoinColumn, BaseEntity, OneToMany} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Productos} from './Productos';
import { InventariosHabitaciones } from './InventariosHabitaciones';

@Entity({schema: ''})
export class Inventarios extends ModelEntity {
    
    @ManyToOne(() => Productos, (producto) => producto.InventarioId)
    @JoinColumn({name: 'producto_id'})
    ProductoId: Productos;

    @Column({name: 'codigo',unique: true, length: 25, nullable: false})
    Codigo: String;

    @Column({name: 'cantidad', nullable: false})
    Cantidad: String;

    @Column({ name: 'precio_proveedor', type: 'double precision', nullable: false })
    PrecioProveedor: number;
    
    @Column({ name: 'precio_venta', type: 'double precision', nullable: false })
    PrecioVenta: number;

    @OneToMany(() => InventariosHabitaciones, (inventarioHabitaciones) => inventarioHabitaciones.InventarioId)
    InventarioHabitacionesId: InventariosHabitaciones
}