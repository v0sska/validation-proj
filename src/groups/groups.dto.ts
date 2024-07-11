import { IsString, IsNumber, IsNotEmpty } from "class-validator";

export class GroupsDto{

    @IsString()
    @IsNotEmpty()
    name: string;

    @IsString()
    @IsNotEmpty()
    genre: string;

    @IsNumber()
    @IsNotEmpty()
    label: number;

}