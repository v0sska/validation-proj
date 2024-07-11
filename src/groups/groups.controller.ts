import { Controller, Post, Get, Put, Delete, Param, Body, ParseIntPipe } from "@nestjs/common";
import { GroupsDto } from "./groups.dto";
import { GroupsService } from "./groups.service";
import { HttpCode } from "@nestjs/common";
import { HttpStatus } from "@nestjs/common";
import { group } from "console";

@Controller('groups')
export class GroupsController {

    constructor(private readonly groupsService: GroupsService) {}

    @HttpCode(HttpStatus.OK)
    @Post()
    async createGroup(@Body() group: GroupsDto){
        return {
            message: 'Group created successfully',
            data: await this.groupsService.createGroup(group)
        };
    }

    @HttpCode(HttpStatus.OK)
    @Get()
    async getGroups(): Promise<Object> {
        return {
            data: {
                groups: await this.groupsService.getGroups()
            }
        }
    }

    @HttpCode(HttpStatus.OK)
    @Get(':id')
    async getGroupById(@Param('id', ParseIntPipe) id: number): Promise<Object> {
        return {
            data: {
                group: await this.groupsService.getGroupById(id)
            }
        }
    }

    @HttpCode(HttpStatus.OK)
    @Delete(':id')
    async deleteGroupById(@Param('id', ParseIntPipe) id: number): Promise<Object> {
        await this.groupsService.deleteGroupById(id);

        return {
            message: 'Group deleted successfully'
        };
    }

    @HttpCode(HttpStatus.OK)
    @Put(':id')
    async updateGroupById(@Param('id', ParseIntPipe) id: number, @Body() updatedGroup: GroupsDto): Promise<Object> {
        await this.groupsService.updateGroupById(id, updatedGroup);

        return {
            message: 'Group updated successfully'
        };
    }


}