const express = require('express');
const cors = require('cors');
const proxy = require('express-http-proxy'); //Responsible for summoning the required service.

const app = express();

app.use(express.json());
app.use(cors());

app.use('/user',proxy('http://localhost::8001'));
app.use('/shopping',proxy('http://localhost::8003'));
app.use('/products',proxy('http://localhost::8002')); //Products

app.listen(8000, () => 
{
    console.log("Gateway service is listening to port 8000.");
});