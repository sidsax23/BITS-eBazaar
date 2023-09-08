import axios from 'axios'
import rabbitMQclient from './client.ts'

export default class MessageHandler
{
    static async HandleMessage(api:string, data:any, correlationId:string, replyTo:string)
    {
        //Processing message
        let response = {};
        const URL = "http://localhost:8002"+api;
        const input = {
            data:data
        }
        await axios.post(URL,input).then((res:any)=>response=res.data);

        //Sending response back to client
        await rabbitMQclient.produce(response, correlationId, replyTo)
    }
}