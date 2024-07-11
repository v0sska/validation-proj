import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Groups } from "./groups.entity";
import { GroupsService } from "./groups.service";
import { GroupsController } from "./groups.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Groups])],
    controllers: [GroupsController],
    providers: [GroupsService],
})
export class GroupsModule {}