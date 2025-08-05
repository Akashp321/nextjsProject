import { Processor,Process } from "@nestjs/bull";
import bull from "bull";
import { Logger } from "@nestjs/common";
@Processor('email')
export class QueueProcessor{
    private readonly logger=new Logger(QueueProcessor.name);
    @Process()
    async HandleEmailJob(job:bull.Job){
        return this.logger.debug(`processing email ${JSON.stringify(job.data)}`);
    }
}