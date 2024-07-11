import { IsString, IsNumber, IsNotEmpty } from 'class-validator';

export class LabelsDto{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsNumber()
    @IsNotEmpty()
    founded: number;
}