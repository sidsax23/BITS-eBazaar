import express from 'express';
const app = express();


app.use(express.json());
//Routing API calls to user_apis.js
import userRoute from './APIs/user_apis.js';
app.use('/', userRoute);

app.listen(8001, () => 
{
    console.log("Customer service is listening to port 8001.");
});