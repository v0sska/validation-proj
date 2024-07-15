import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, FindManyOptions } from "typeorm";
import { Groups } from "./groups.entity";
import { GroupsDto } from "./groups.dto";
import { Labels } from "src/labels/labels.entity";
import { HttpException, HttpStatus } from "@nestjs/common";
import { JsonFileParser } from "./groups.parser";

@Injectable()
export class GroupsService {
    constructor(
        @InjectRepository(Groups)
        private groupsRepository: Repository<Groups>,

        @InjectRepository(Labels)
        private labelsRepository: Repository<Labels>,

        private readonly jsonFileParser: JsonFileParser

    ) {}

    async createGroup(group: GroupsDto): Promise<Groups> {

        const label = await this.labelsRepository.findOne({ where: { id: group.label } });

        if(!label){
            throw new HttpException('Label not found', HttpStatus.NOT_FOUND);
        }

        let groupToSave = new Groups();

        groupToSave.name = group.name;
        groupToSave.genre = group.genre;
        groupToSave.label = label;

        return this.groupsRepository.save(groupToSave);
    }

    async getGroups(): Promise<Groups[]> {
        return this.groupsRepository.find({ relations: ['label'] });
    }

    async getGroupById(id: number): Promise<Groups> {
        return this.groupsRepository.findOne({ where: { id }, relations: ['label'] });
    }

    async deleteGroupById(id: number): Promise<void> {
        await this.groupsRepository.delete(id);
    }

    async updateGroupById(id: number, group: GroupsDto): Promise<void> {

        const label = await this.labelsRepository.findOne({ where: { id: group.label } });

        if(!label){
            throw new HttpException('Label not found', HttpStatus.NOT_FOUND);
        }

        let groupToUpdate = new Groups();

        groupToUpdate.name = group.name;
        groupToUpdate.genre = group.genre;
        groupToUpdate.label = label;

        await this.groupsRepository.update(id, groupToUpdate);
    }

    async listGroupByCriteria(labelId?: number, size: number = 10, from: number = 0, genre?: string): Promise<Groups[]> {
        let whereOptions: FindManyOptions<Groups> = {
            take: size,
            skip: from,
            relations: ['label']
        };

        if (labelId) {
            const labelToFind = await this.labelsRepository.findOne({ where: { id: labelId }});
            if (labelToFind) {
                whereOptions.where = { label: labelToFind };
            }
        }

        if (genre) {
            whereOptions.where = { ...whereOptions.where, genre };
        }

        return this.groupsRepository.find(whereOptions);
    }

    async importGroupsFromFile(file: any): Promise<number> {

        if(!file){
            throw new HttpException('File not found', HttpStatus.NOT_FOUND);
        }

        if(file.mimetype !== 'application/json'){
            throw new HttpException('Invalid file format', HttpStatus.BAD_REQUEST);
        }

      
        const recievedGroups = await this.jsonFileParser.parseJsonFile(file);

        const groupsToSave = await Promise.all(recievedGroups.map(async group => {
            return await this.groupDtoToEntity(group);
        }));

        await this.groupsRepository.save(groupsToSave);

        return groupsToSave.length;
    }

    private async groupDtoToEntity(group: GroupsDto): Promise<Groups> {
        const label = await this.labelsRepository.findOne({ where: { id: group.label } });

        if(!label){
            throw new HttpException('Label not found', HttpStatus.NOT_FOUND);
        }

        let convertedGroup = new Groups();

        convertedGroup.name = group.name;
        convertedGroup.genre = group.genre;
        convertedGroup.label = label;

        return convertedGroup;
    }

}
 