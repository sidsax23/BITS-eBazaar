export {};

import express from 'express';
import RabbitMQClient from './RabbitMQ/client.ts';

const app = express();

app.use(express.json());

//Routing API calls to product_apis.js
import shoppingRoute from './APIs/shopping_apis.js';
app.use('/', shoppingRoute);

app.listen(8003, () => 
{
    console.log("Shopping service is listening to port 8003.");
    RabbitMQClient.initialize();
});