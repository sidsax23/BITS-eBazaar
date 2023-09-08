/* 
APIs pertaining to user service.
*/

//Basic Setup
import express from 'express';
const router = express.Router()

// Creating DB. Name of DB = User_DB
import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/Products_DB", 
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology : true
                    }
                ).then(
                    () => {console.log("Products DB Connected")}) /* Just to see if the DB got connected successfully or not*/

//Importing Models 
import ItemModel from '../Models/product_schemas.js';


//1.) Updating Item details when order is placed API :-
router.post("/complete_transaction", (req,res) =>
{
    const item_query = { $inc : {quantity:-1}}
    const item_id = req.body.data

   ItemModel.updateOne({_id:item_id}, item_query, (err,result) => 
    {
        if(err)
        {
            console.log(err)
        }
        else
        {
            ItemModel.findOne({_id:item_id}, (err,item) => 
            {
                res.send(String(item.quantity));
            })
        }
    })
})

//2.) Selling Item API :-
router.post("/Sell_Item", (req,res) => 
{
    const {name,email,category,sub_category,image,price,condition,description,quantity} = req.body
    const item  = new ItemModel(
    {
        name,email,category,sub_category,image,price,condition,description,quantity
    })

    item.save( err => 
    {
        if(err)
        {
            res.send(err)
        }
        else
        {
            res.send({message:name+" Successfully Added"})
        }
    })
})

//2.) Retrieving Items for sale API :-
router.post("/fetch_items", (req,res) => 
{
    ItemModel.find({category:req.body.category, email:{$ne:req.body.email}, quantity:{$gte:1}},(err,data) => 
    {
        if(err)
        {
            res.send({message:"No items available in this category"})
        }
        else
        {
            res.send(data)
        }
    })

})


//3.) Retrieving Filtered Items API :-
router.post("/fetch_filtered_items", (req,res) => 
{
    ItemModel.find({$and : [{category:req.body.category}, {email:{$ne:req.body.email}},{quantity:{$gte:1}}, {price:{$gte:req.body.min_price, $lte:req.body.max_price}}, 
                    {$or :[{condition:req.body.condition1},{condition:req.body.condition2},{condition:req.body.condition3},{condition:req.body.condition4},
                    {condition:req.body.condition5}]}, {$or :[{sub_category:req.body.sub_category1},{sub_category:req.body.sub_category2},
                    {sub_category:req.body.sub_category3},{sub_category:req.body.sub_category4},{sub_category:req.body.sub_category5},
                    {sub_category:req.body.sub_category6},{sub_category:req.body.sub_category7}]}]}, (err,data) => 
    {
        if(err)
        {
            res.send({message:"No items available in this category"})
        }
        else
        {
            res.send(data)
        }
    })

})

//4.) Retrieving Item for Product Page API :-
router.post("/fetch_item_details", (req,res) =>
{
    const id=req.body.id
    ItemModel.findOne({_id:id}, (err,item) =>
    {
        if(item)
        {
            res.send(item)
            
        }
        else
        {
            console.log(err)
        }

    })

})

//5.) Retrieving Searched Items API :-
router.post("/fetch_search_items", (req,res) => 
{
    const search_item = new RegExp(req.body.search_key)
    ItemModel.find({$and :[{email:{$ne:req.body.email}}, {quantity:{$gte:1}}, {name :{$regex : search_item, $options : 'i'}}] },(err,data) => 
    {
        if(err)
        {
            console.log(err)
            res.send({message:"No items available"})
        }
        else
        {
            res.send(data)
        }
    })

})

//6.) Retrieving Filtered Items (Search) API :-
router.post("/fetch_filtered_items_search", (req,res) => 
{
    var left_conditional="^" // '^TEXT$' searches for an exact match of TEXT. 'TEXT' just searches for names conatining TEXT
    var right_conditional="$"
    if(!req.body.sub_category1&&!req.body.sub_category2&&!req.body.sub_category3&&!req.body.sub_category4&&!req.body.sub_category5&&!req.body.sub_category6&&!req.body.sub_category7)
    {
        left_conditional=""
        right_conditional=""
    }
    const search_item = new RegExp(req.body.search_key)

    ItemModel.find({$and : [{category:req.body.category}, {email:{$ne:req.body.email}},{quantity:{$gte:1}}, {price:{$gte:req.body.min_price, $lte:req.body.max_price}}, 
                    {name :{$regex : search_item, $options : 'i'}}, {$or :[{condition: {$regex : req.body.condition1, $options : 'i'}},
                    {condition: {$regex : req.body.condition2, $options : 'i'}},{condition: {$regex : req.body.condition3, $options : 'i'}},
                    {condition: {$regex : req.body.condition4, $options : 'i'}},{condition: {$regex : req.body.condition5, $options : 'i'}}]}, 
                    {$or :[{sub_category: {$regex : left_conditional+req.body.sub_category1+right_conditional, $options : 'i'}},
                    {sub_category: {$regex : left_conditional+req.body.sub_category2+right_conditional, $options : 'i'}},
                    {sub_category: {$regex : left_conditional+req.body.sub_category3+right_conditional, $options : 'i'}},
                    {sub_category: {$regex : left_conditional+req.body.sub_category4+right_conditional, $options : 'i'}},
                    {sub_category: {$regex : left_conditional+req.body.sub_category5+right_conditional, $options : 'i'}},
                    {sub_category: {$regex : left_conditional+req.body.sub_category6+right_conditional, $options : 'i'}},
                    {sub_category: {$regex : left_conditional+req.body.sub_category7+right_conditional, $options : 'i'}},]}]}, (err,data) => 
    {
        if(err)
        {
            res.send({message:"No items available in this category"})
        }
        else
        {
            res.send(data)
        }
    })

})


//7.) Retrieving Items put for sale by a user API :-
router.post("/fetch_my_items", (req,res) => 
{
    ItemModel.find({email:req.body.email},(err,data) => 
    {
        if(err)
        {
            res.send({message:"No items put up for sale"})
        }
        else
        {
            res.send(data)
        }
    })
})

//8.) Deleting Items put for sale by a user API :-
router.post("/Delete_Items", (req,res) => 
{
    const Product_ids = req.body.ids

    //Deleting products
    ItemModel.deleteMany({_id : {$in : Product_ids}}, (err) => 
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

//9.) Updating Item Detail(s) API :-
router.put("/Update_Item", (req,res) => 
    {
        const id = req.body.id;
        const item = ItemModel.findOne({_id:id});

        const name = req.body.name_new == "" ? item.name : req.body.name_new;
        const category = req.body.category_new == "" ? item.category : req.body.category_new;
        const sub_category = req.body.sub_category_new == "" ? item.sub_category : req.body.sub_category_new;
        const price = req.body.price_new == "" ? item.price : req.body.price_new;
        const quantity = req.body.quantity_new == "" ? item.quantity : req.body.quantity_new;
        const condition = req.body.condition_new == "" ? item.condition : req.body.condition_new;
        const description = req.body.description_new == "" ? item.description : req.body.description_new;
        const image = req.body.image_url_new == "" ? item.image : req.body.image_url_new;

       
        const query = { $set : {name:name,category:category,sub_category:sub_category,price:price,quantity:quantity,condition:condition,description:description,image:image}}
        ItemModel.updateOne({_id:id}, query, (err,item) => 
        {
            if(err)
            {
                console.log(err)
                res.send({message:"Error Occurred."})
            }
            else
            {
                res.send({message:"Item Updated Successfully."})
            }
        })
    })
  
//10.) Item Deletion (Associated with user account being deleted) API:-
router.delete("/Delete_Items", (req,res) =>
{
    const email = req.query.email;
    ItemModel.deleteMany({email: email}, (err) => 
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

