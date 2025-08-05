import { TasksService } from "./tasks.service";
import { Module } from "@nestjs/common";
@Module({
    imports:[TasksService],
    exports:[TasksService],
})
export class TaskModule{}