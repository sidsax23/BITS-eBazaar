import { Channel } from "amqplib";
import MessageHandler from "./MessageHandler.ts";

export default class Consumer {

    constructor(private channel : Channel, private rpcQueue : string) {}
    
    async consumeMessages()
    {

        this.channel.consume(this.rpcQueue, 
        async function(message)  
        {
            if(message)
            {
                const {correlationId, replyTo} = message.properties;
                if(!correlationId || !replyTo)
                {
                    console.log("Correlation ID/Reply Queue details missing.")
                }
                else
                {
                    const api = message.properties.headers.api;
                    const data = message.properties.headers.data;
                    await MessageHandler.HandleMessage(api,data,correlationId,replyTo);
                }
            }

        },
        {
            noAck:true
        }
        );
    }
    
}