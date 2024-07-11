import { Controller, Post, Get, Put, Delete, Param, Body, ParseIntPipe } from "@nestjs/common";
import { LabelsService } from "./labels.service";
import { LabelsDto } from "./labels.dto";
import { HttpCode } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";

@Controller('labels')
export class LabelsController {
    constructor(private readonly labelsService: LabelsService) {}

    @HttpCode(HttpStatus.CREATED)
    @Post()
    async createLabel(@Body() label: LabelsDto): Promise<Object>{
       return {
            message: 'Label created successfully',
            data: await this.labelsService.createLabel(label)
       };
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    async getLabels(): Promise<Object> {
        return {
            data: {
                labels: await this.labelsService.getLabels()
            }
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getLabel(@Param('id', ParseIntPipe) id: number): Promise<Object> {
        return {
            data: {
                label: await this.labelsService.getLabel(id)
            }
        }
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async deleteLabelById(@Param('id', ParseIntPipe) id: number): Promise<Object> {
        await this.labelsService.deleteLabel(id);

        return {
            message: 'Label deleted successfully'
        };
    }

    @HttpCode(HttpStatus.OK)
    @Put(':id')
    async updateLabelById(@Param('id', ParseIntPipe) id: number, @Body() updatedLabel: LabelsDto){
        await this.labelsService.updateLabel(id, updatedLabel);

        return {
            message: 'Label updated successfully'
        };
    }
}