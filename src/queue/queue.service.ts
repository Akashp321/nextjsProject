import { Injectable } from "@nestjs/common";
import { InjectQueue } from "@nestjs/bull";
import type { Queue } from "bull";
@Injectable()
export class QueryService{
    constructor(@InjectQueue('email') private emailQueue:Queue){}
    async addEmailJob(data:any){
        return this.emailQueue.add(data);
    }
}