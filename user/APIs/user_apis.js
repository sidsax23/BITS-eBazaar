/* 
APIs pertaining to user service.
*/

//Basic Setup
import express from 'express';
const router = express.Router();
import bcrypt from 'bcrypt';

// Creating DB. Name of DB = User_DB
import mongoose from 'mongoose';
mongoose.connect("mongodb://localhost:27017/User_DB", 
                    {
                        useNewUrlParser: true,
                        useUnifiedTopology : true
                    }
                ).then(
                    () => {console.log("User DB Connected")}) /* Just to see if the DB got connected successfully or not*/

//Importing Models 
import UserModel from '../Models/user_schemas.js';

//1.) LOGIN API :-
router.post("/Login", async (req,res) => 
    {
        const {email,pass} = req.body
        // Searches the DB for a user with entered email ID. If it finds one, it returns the user otherwise it returns an error
        UserModel.findOne({email:email}, async (err,user) => 
        {
            if(user)
            {
                const passwordCompare = await bcrypt.compare(pass, user.pass);
                if(passwordCompare)
                {
                    res.send({message:"Login Successful",user:user})
                }
                else
                {
                    res.send({message:"Incorrect Password Entered."})
                }

            }
            else
            {
                res.send({message:"Looks like you are not a registered user. Please Sign up."})
            }
        })
    })

//2.) Sign Up API :-
router.post("/Sign_up", async (req,res) => 
{
    const {name,email,password,pass_copy,dept,phone_num,address} = req.body;
    const upi = phone_num+"@";

    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(password, salt);
    const pass = securePassword;

    // Searches the DB for a user with entered email ID. If it finds one, it returns the user otherwise it returns an error
    UserModel.findOne({email:email}, (err,user) => 
    {
        if(user)
        {
            res.send({message:"An account already exists with this email ID."});
        }
        else
        {
            UserModel.findOne({phone_num:phone_num}, (err,user) =>
            {
                if(user)
                {
                    res.send({message:"This phone number is already taken"});
                }
                else
                {
                    var cartID = new mongoose.Types.ObjectId();

                    const user  = new UserModel(
                    {
                        name,
                        email,
                        pass,
                        address,
                        phone_num,
                        dept,
                        upi,
                        cartID
                    })
                    user.save( err => 
                    {
                        if(err)
                        {
                            console.log(err);
                        }
                        else
                        {
                            res.send({message:"Account Successfully Created"});
                        }
                    })
                }
            })
            
        }
    })
    
})

//3.) Recover Password API :-
router.post("/Recover_pass", async (req,res) => 
{
    const {email}=req.body;

    // Generating new 5 character random password
    const characters ='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var new_pass = '';
    const charactersLength = characters.length;
    for (var i = 0; i < 5; i++) 
    {
        new_pass += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    // Encrypting Password
    const salt = await bcrypt.genSalt(10);
    const securePassword = await bcrypt.hash(new_pass, salt);

    // Query for updating the password to the new one 
    const query = {$set : {pass:securePassword}};

    // Searches the DB for a user with entered email ID. If it finds one, it returns the user otherwise it returns an error
    UserModel.findOne({email:email}, (err,user) => 
    {
            if(user)
            {
                UserModel.updateOne({email:email}, query, (err,result)=>
                {
                    if(result)
                    {
                        res.send({found:true,rpass:new_pass,rname:user.name});
                    }
                    else
                    {
                        res.send({found:false});
                    }

                })
                
            }
            else
            {
                res.send({found:false});
            }
    })
})



//4.) Profile Page API :-
router.post("/Profile", (req,res) =>
{
    const {email}=req.body
    UserModel.findOne({email:email}, (err,user) =>
    {
        if(user)
        {
            res.send({found:true,id:user._id,name:user.name,address:user.address,phone_num:user.phone_num,dept:user.dept,upi:user.upi})
        }
        else
        {
            res.send({found:false})
        }

    })

})

//5.) Profile Page Updation API :-
router.put("/Update_Profile", (req,res) => 
    {
        const email = req.body.email;
        const user = UserModel.findOne({email:email});
        const name = req.body.user_name_new == "" ? user.name : req.body.user_name_new;
        const phone_num = req.body.user_phone_num_new == "" ? user.phone_num : req.body.user_phone_num_new;
        const address = req.body.user_address_new == "" ? user.address : req.body.user_address_new;
        const upi = req.body.user_upi_new == "" ? user.upi : req.body.user_upi_new;
        // Searches the DB for a user with entered email ID. If it finds one, it returns the user otherwise it returns an error
        UserModel.findOne({phone_num:phone_num}, (err,user) => 
        {
            if(user)
            {
                res.send({message:"This phone number is already taken"})
            }
            else
            {
                UserModel.findOne({upi:upi}, async (err,user) => 
                {
                    if(user)
                    {
                        res.send({message:"This UPI ID is already taken."})
                    }
                    else
                    {
                       
                        var query;
                        if(req.body.user_pass_new!="")
                        {
                            const salt = await bcrypt.genSalt(10);
                            const securePassword = await bcrypt.hash(req.body.user_pass_new, salt);
                            query = { $set : {name:name,phone_num:phone_num,address:address,upi:upi,pass:securePassword}}
                        }
                        else
                        {
                            query = { $set : {name:name,phone_num:phone_num,address:address,upi:upi}}
                        }
                        UserModel.updateOne({email:email}, query, (err,user) => 
                        {
                            if(err)
                            {
                                console.log(err)
                                res.send({message:"Error Occurred."})
                            }
                            else
                            {
                                res.send({message:"Profile Updated Successfully."})
                            }
                        })
                    }   
                })
            }
        })
    })


//6.) Buyer Details Retrieval API:-
router.post("/fetch_buyer_details", (req,res) =>
{
    const id=req.body.buyer_id
    UserModel.findOne({_id:id}, (err,user) =>
    {
        if(user)
        {
            res.send({found:true,id:user._id,email:user.email,name:user.name,address:user.address,phone_num:user.phone_num,dept:user.dept,upi:user.upi})
        }
        else
        {
            res.send({found:false})
        }
    })
})


//7.) User Account Deletion API:-
router.delete("/Delete_Profile", (req,res) =>
{
    const id = req.query.id;
    UserModel.deleteOne({_id:id}, (err,user) =>
    {
        if(err)
        {
            console.log(err)
            res.send({message:"Error Occurred!"})
        }
        else
        {
            res.send({message:"Deletion Successfull!"})
        }
    })
    
})


//Exporting all APIs
export default router

