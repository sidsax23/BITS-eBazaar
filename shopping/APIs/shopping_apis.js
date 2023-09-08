/* 
APIs pertaining to user service.
*/

//Basic Setup
import express from 'express';
const router = express.Router()
import RabbitMQClient from '../RabbitMQ/client.ts';

// Creating DB. Name of DB = User_DB
import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/Shopping_DB", 
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology : true
                    }
                ).then(
                    () => {console.log("Shopping DB Connected")}) /* Just to see if the DB got connected successfully or not*/

//Importing Models 
import OrderModel from '../Models/shopping_schemas.js';

//1.) Sending Request to Seller and Updating Order Details API :-
router.post("/request", (req,res) =>
{
    const {item_id,seller_id,buyer_id,quote_price} = req.body
    const order_status="Incomplete"
    const order  = new OrderModel(
    {
        item_id,
        seller_id,
        buyer_id,
        order_status,
        quote_price
       
    })

    order.save( err => 
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            res.send({message:"Request Sent Successfully"})
        }
    })
    
})


//2.) Fetching User Requests API :-
router.post("/fetch_requests", (req,res) =>
{
    OrderModel.find({buyer_id:req.body.user_id},(err,data) => 
    {
        if(err)
        {
            res.send({message:"No requests"})
        }
        else
        {
            res.send(data)
        }
    })
    
})



//3.) Fetching User Offers API :-
router.post("/fetch_offers", (req,res) =>
{
    OrderModel.find({seller_id:req.body.user_id},(err,data) => 
    {
        if(err)
        {
            res.send({message:"No requests"})
        }
        else
        {
            res.send(data)
        }
    })
    
})

//4.) Declining Transaction API :-
router.post("/decline_transaction", (req,res) =>
{
    const order_id=req.body._id
    const order_query = { $set : {order_status:"Declined by seller"}}
    OrderModel.updateOne({_id:order_id}, order_query, (err,order) => 
    {
        if(err)
        {
            console.log(err)
        }
    })

})

//5.) Completing Transaction API :-
router.post("/complete_transaction", async (req,res) =>
{
    const order_id=req.body._id
    const order_query_complete = { $set : {order_status:"Complete"}}

    OrderModel.updateOne({_id:order_id}, order_query_complete, (err,order) => 
    {
        if(err)
        {
            console.log(err)
        }
    })

    //Add Logic to save item details of orders that are completed.

    //Data to be sent to products service by RabbitMQ
    const item_id=req.body.item_id
    const data = {
        api : "/complete_transaction",
        contents : String(item_id)
    }
    const response = await RabbitMQClient.produce(data);
    const quantity = Number(response);

    if(quantity==0)
    {
        const order_query_sold_out = { $set : {order_status:"Sold Out"}}
        OrderModel.updateMany({$and : [{_id:{$ne:order_id}}, {item_id:item_id}]}, order_query_sold_out, (err,order) => 
        {
            if(err)
            {
                console.log(err)
            }
        })
    }

})

//6.) Deleting orders associated with Items(s) a user deleted API :-
router.post("/Delete_Orders", (req,res) => 
{
    const Product_ids = req.body.ids

    //Deleting products
    OrderModel.deleteMany({item_id : {$in : Product_ids}}, (err) => 
    {
      if(err) 
      {
          res.send("Error Occurred! Please try again later.");
      }
      else
      {
        res.send("Deletion Successfull.")
      }
    });
})

//7.) Fetching Offer Count :-
router.post("/fetch_items_offer_count", (req,res) => 
{
    const Product_ids = req.body.ids

    var offer_counts=[]
    for(var i=0;i<Product_ids.length;i++)
    {
        offer_counts.push(0)
    }
    

    OrderModel.find( (err,orders) => 
    {
      if(orders)
      {
        for(var i=0;i<Product_ids.length;i++)
        {
            for(var j=0;j<orders.length;j++)
            {
                if(Product_ids[i]==orders[j].item_id)
                {
                    offer_counts[i]+=1;
                }
            }
        }
        res.send(offer_counts)
      }
      
      
    })

})



//7.) Order Deletion (Associated with user account being deleted) API:-
router.delete("/Delete_Orders", (req,res) =>
{
    const id = req.query.id;
    OrderModel.deleteMany({ $or : [{seller_id:id},{buyer_id:id}]}, (err) => 
    {
      if(err) 
      {
          res.send("");
      }
      else
      {
        res.send("Deletion Successfull.")
      }
    })
})

//Exporting all APIs
export default router