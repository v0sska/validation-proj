import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Labels } from "./labels.entity";
import { LabelsService } from "./labels.service";
import { LabelsController } from "./labels.controller";

@Module({
    imports: [TypeOrmModule.forFeature([Labels])],
    controllers: [LabelsController],
    providers: [LabelsService],
})
export class LabelsModule {}