export {};

import express from 'express';
import RabbitMQClient from './RabbitMQ/client.ts'

const app = express();

app.use(express.json());

//Routing API calls to product_apis.js
import productRoute from './APIs/product_apis.js';
app.use('/', productRoute);

app.listen(8002, () => 
{
    console.log("Products service is listening to port 8002.");
    RabbitMQClient.initialize();
});