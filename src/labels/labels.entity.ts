import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Labels{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    founded: number;
}