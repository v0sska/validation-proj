import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Groups } from 'src/groups/groups.entity';

@Entity()
export class Labels{
    
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    founded: number;

    @OneToMany(() => Groups, group => group.label)
    groups: Groups[];
}