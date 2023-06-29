import { Entity, Column, ManyToOne, JoinColumn} from 'typeorm';
import { ModelEntity } from '../ModelEntity';
import {Productos} from './Productos';

@Entity({schema: 'inventario'})
export class Inventarios extends ModelEntity {
    
    @ManyToOne(() => Productos)
    @JoinColumn({name: 'productoId'})
    ProductoId: Productos;

    @Column({name: 'cantidad', nullable: false})
    Cantidad: String;

    @Column({ name: 'precio_proveedor', type: 'double precision', nullable: false })
    PrecioProveedor: number;
    
    @Column({ name: 'precio_venta', type: 'double precision', nullable: false })
    PrecioVenta: number;
}