import mongoose from 'mongoose';

const ItemSchema = new mongoose.Schema(
    {
        name :  {type: String, required:true},
        email: {type: String, required:true},
        category: {type: String, required:true},
        sub_category: {type: String, required:true},
        price: {type: Number, required:true},
        quantity: {type: Number, required:true}, 
        condition : {type: String,required:true},
        description : {type: String},
        image : {type : String}
    }
)

export default mongoose.model('Item', ItemSchema);