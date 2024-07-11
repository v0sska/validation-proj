import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Groups } from "./groups.entity";
import { GroupsDto } from "./groups.dto";
import { Labels } from "src/labels/labels.entity";

export class GroupsService {
    constructor(
        @InjectRepository(Groups)
        private groupsRepository: Repository<Groups>,

        @InjectRepository(Labels)
        private labelsRepository: Repository<Labels>

    ) {}

    async createGroup(group: GroupsDto): Promise<Groups> {

        const label = await this.labelsRepository.findOne({ where: { id: group.label } });

        if(!label){
            throw new Error('Label not found');
        }

        let groupToSave = new Groups();

        groupToSave.name = group.name;
        groupToSave.genre = group.genre;
        groupToSave.label = label;

        return this.groupsRepository.save(groupToSave);
    }

    async getGroups(): Promise<Groups[]> {
        return this.groupsRepository.find();
    }

    async getGroupById(id: number): Promise<Groups> {
        return this.groupsRepository.findOneBy( {id} );
    }

    async deleteGroupById(id: number): Promise<void> {
        await this.groupsRepository.delete(id);
    }

    async updateGroupById(id: number, group: GroupsDto): Promise<void> {

        const label = await this.labelsRepository.findOne({ where: { id: group.label } });

        if(!label){
            throw new Error('Label not found');
        }

        let groupToUpdate = new Groups();

        groupToUpdate.name = group.name;
        groupToUpdate.genre = group.genre;
        groupToUpdate.label = label;

        await this.groupsRepository.update(id, groupToUpdate);
    }


}
 