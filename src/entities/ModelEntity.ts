import { PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, BaseEntity, DeleteDateColumn } from 'typeorm';

export enum Estado {
  Activo = 'Activo',
  Inactivo = 'Inactivo',
}

export abstract class ModelEntity extends BaseEntity{
  
  @PrimaryGeneratedColumn()
  id: number;

  @Column({name: 'estado',type: 'enum', enum: Estado, default: Estado.Activo})
  Estado: Estado;
  
  @CreateDateColumn()
  fecha_creacion: Date;

  @UpdateDateColumn()
  fecha_modificacion: Date;

  @DeleteDateColumn()
  fecha_eliminacion: Date;
}