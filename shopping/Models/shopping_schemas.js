import mongoose from 'mongoose';

const OrderSchema = new mongoose.Schema(
    {
        item_id : {type:String, required: true},
        seller_id : {type:String,required:true},
        buyer_id : {type:String,required:true},
        order_status : {type:String,required:true},
        quote_price : {type:Number, required:true}
    }
)

export default mongoose.model("Order",OrderSchema)