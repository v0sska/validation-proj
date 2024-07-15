import { Injectable } from "@nestjs/common";
import { Labels } from "src/labels/labels.entity";
import { GroupsDto } from "./groups.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { HttpException, HttpStatus } from "@nestjs/common";
import * as fs from 'fs';

@Injectable()
export class JsonFileParser {
    constructor(
    @InjectRepository(Labels)
    private labelsRepository: Repository<Labels>
    ) {}

    async parseJsonFile(file: Express.Multer.File): Promise<GroupsDto[]> {
        const groupsToSave: GroupsDto[] = [];
    
        const fileContent = file.buffer.toString('utf8');
        const fileData = JSON.parse(fileContent);
    
        if (!Array.isArray(fileData)) {
            throw new HttpException('Invalid JSON format: expected an array', HttpStatus.BAD_REQUEST);
        }
    
        const labelsMap = new Map<string, Labels>();
    
        for (const entry of fileData) {
            const { label, founded_year } = entry;
    
            if (!labelsMap.has(label)) {
                const newLabel = new Labels();
                newLabel.name = label;
                newLabel.founded = founded_year;
                labelsMap.set(label, newLabel);
            }
        }
    
        const savedLabels = await this.labelsRepository.save(Array.from(labelsMap.values()));
    
        const savedLabelsMap = new Map<string, number>();
        savedLabels.forEach(label => savedLabelsMap.set(label.name, label.id));
    
        for (const entry of fileData) {
            const { label, group, genre } = entry;
    
            const groupDto = new GroupsDto();
            groupDto.name = group;
            groupDto.genre = genre;
            groupDto.label = savedLabelsMap.get(label);
    
            groupsToSave.push(groupDto);
        }
    
        return groupsToSave;
    }
    
    
}