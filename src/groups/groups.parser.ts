import { Injectable } from "@nestjs/common";
import { Labels } from "src/labels/labels.entity";
import { GroupsDto } from "./groups.dto";
import { GroupsService } from "./groups.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class JsonFileParser {
    constructor(
    private readonly groupsService: GroupsService, 

    @InjectRepository(Labels)
    private labelsRepository: Repository<Labels>
    ) {}

    async parseJsonFile(fileToRead: any): Promise<GroupsDto[]> {
        const groupsToSave: GroupsDto[] = [];


        return groupsToSave;
    }
}