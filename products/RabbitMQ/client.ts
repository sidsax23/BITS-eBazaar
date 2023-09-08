import { Channel, Connection, connect } from "amqplib";
import config from "./config.ts";
import Consumer from "./consumer.ts";
import Producer from "./producer.ts";

//NOTE : This will be a singleton class as only one insatnce of RabbitMQ will ever exist.
class RabbitMQClient
{
    private constructor() {};

    private static instance: RabbitMQClient; //Only one instance of RabbitMQ should run
    private isInitialized = false; //Flag noting whether the one instance of RabbitMQ has been initialised or not.

    private producer!: Producer;
    private consumer!: Consumer;
    private connection!: Connection;
    private producerChannel!: Channel;
    private consumerChannel!: Channel;

    //Only one instance of RabbitMQ runs which we return. But if there is none yet, then that one instance is created.
    public static getInstance()
    {
        if(!this.instance)
        {
            this.instance = new RabbitMQClient();
        }
        return this.instance
    }

    //Initializing the RabbitMQ instance
    async initialize()
    {
        if(this.isInitialized) // If the instance of RabbitMQ has already been initialised then there is no point in initialising it again.
        {   
            return;
        }
        else
        {
            try 
            {
                this.connection=await connect(config.rabbitMQ.url);
                this.producerChannel = await this.connection.createChannel();
                this.consumerChannel = await this.connection.createChannel();

                const {queue : rpcQueue} = await this.consumerChannel.assertQueue(config.rabbitMQ.queues.rpcQueue,{exclusive:true}) // By not giving it a name, RabbitMQ assigns the queue a unique random unique name which we store in 'replyQueueName'. Exclusive:true means that the queue is deleted if RabbitMQ connection dies.

                this.producer = new Producer(this.consumerChannel);
                this.consumer = new Consumer(this.consumerChannel,rpcQueue);
                this.consumer.consumeMessages();
                this.isInitialized = true;

            } 
            catch(error) 
            {
                console.log("RabbitMQ Error : ",error)   
            }
        }

    }

    //For accessing the producemessages method (as it is orginially in Producer class)
    async produce(data:any, correlationId: string, replyToQueue : string)
    {
        if(!this.isInitialized)
        {
            await this.initialize(); //If the RabbitMQ instance has not been initialized, we call the initialize function before producing data and sending it to the queue
        }
        return await this.producer.produceMessages(data, correlationId,replyToQueue)
    }


}

export default RabbitMQClient.getInstance(); //This way whenever we import this class, we will get them RabbitMQ instance right away (it will be created if it does not exist)