import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Labels } from "src/labels/labels.entity";

@Entity()
export class Groups{

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    name: string;

    @Column()
    genre: string;

    @ManyToOne(() => Labels, label => label.groups)
    label: Labels;
}