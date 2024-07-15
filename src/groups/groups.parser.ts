import { Injectable } from "@nestjs/common";
import { Labels } from "src/labels/labels.entity";
import { GroupsDto } from "./groups.dto";
import { GroupsService } from "./groups.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import fs from 'fs';

@Injectable()
export class JsonFileParser {
    constructor(
    private readonly groupsService: GroupsService, 

    @InjectRepository(Labels)
    private labelsRepository: Repository<Labels>
    ) {}

    async parseJsonFile(fileToRead: any): Promise<GroupsDto[]> {
        const groupsToSave: GroupsDto[] = [];

        const file = fs.readFileSync(fileToRead.path, 'utf8');

        const fileData = JSON.parse(file);

        const labels = fileData.labels.map(labelData => {
            const label = new Labels();
            label.name = labelData.name;
            if (labelData.founded) {
              label.founded = labelData.founded;
            }
            return label;
          });

        await this.labelsRepository.save(labels);

        fileData.groups.forEach(groupData => {
            const group = new GroupsDto();
            group.name = groupData.name;
            group.genre = groupData.genre;
            group.label = labels.find(label => label.name === groupData.label).id;
            groupsToSave.push(group);
        });

        return groupsToSave;
    }
}