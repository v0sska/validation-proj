import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Groups } from "./groups.entity";
import { GroupsService } from "./groups.service";
import { GroupsController } from "./groups.controller";
import { Labels } from "src/labels/labels.entity";

@Module({
    imports: [TypeOrmModule.forFeature([Groups, Labels])],
    controllers: [GroupsController],
    providers: [GroupsService],
})
export class GroupsModule {}