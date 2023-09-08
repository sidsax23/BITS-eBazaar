import { Channel } from "amqplib";
import config from "./config.ts";
import { randomUUID } from "crypto";
import EventEmitter from "events";

export default class Producer{
    constructor(private channel : Channel, private replyQueueName : string, private eventEmitter : EventEmitter) {}


    async produceMessages(data:any)
    {
        const uuid = randomUUID() // Generating random correlation ID
        this.channel.sendToQueue(config.rabbitMQ.queues.rpcQueue, 
                                 Buffer.from(JSON.stringify(data)), 
                                 {
                                    replyTo:this.replyQueueName,
                                    correlationId: uuid,
                                    headers:
                                    {
                                        api: data.api,
                                        data : data.contents,
                                    },
                                 }
                                );
        //Wait for response
        return new Promise((resolve,reject) => 
        {
            this.eventEmitter.once(uuid, async (data) => 
            {
                const reply=(data.content);
                resolve(reply);
            })
        }) 

    }
}