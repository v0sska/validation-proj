import { InjectRepository } from "@nestjs/typeorm";
import { Injectable } from "@nestjs/common";
import { Repository } from "typeorm";
import { Labels } from "./labels.entity";
import { LabelsDto } from "./labels.dto";

export class LabelsService {
    constructor(
        @InjectRepository(Labels)
        private labelsRepository: Repository<Labels>
    ) {}

    async createLabel(label: LabelsDto): Promise<Labels> {
        return this.labelsRepository.save(label);
    }

    async getLabels(): Promise<Labels[]> {
        return this.labelsRepository.find();
    }

    async getLabel(id: number): Promise<Labels> {
        return this.labelsRepository.findOneBy( {id} );
    }

    async updateLabel(id: number, label: LabelsDto): Promise<void> {
        await this.labelsRepository.update(id, label);
    }

    async deleteLabel(id: number): Promise<void> {
        await this.labelsRepository.delete(id);
    }
}