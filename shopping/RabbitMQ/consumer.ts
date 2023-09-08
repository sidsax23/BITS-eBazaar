import { Channel } from "amqplib";
import EventEmitter from "events";

export default class Consumer {

    constructor(private channel : Channel, private replyQueueName : string, private eventEmitter: EventEmitter) {}
    
    async consumeMessages()
    {

        this.channel.consume(this.replyQueueName, 
        (message) =>  
        {
            if(message)
            {
                console.log(JSON.parse(message.content.toString()));
                this.eventEmitter.emit(message.properties.correlationId,message);
            }

        },
        {
            noAck:true
        }
        );
    }
    
}