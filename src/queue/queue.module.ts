import { QueryService } from "./queue.service";
import { BullModule } from "@nestjs/bull";
import { QueueProcessor } from "./queue.processor";
import { Module } from "@nestjs/common";
@Module({
    imports:[BullModule.registerQueue({name:'email'})],
    providers:[QueryService,QueueProcessor],
    exports:[QueryService]
})
export class QueryModule{}