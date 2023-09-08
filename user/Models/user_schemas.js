import mongoose from 'mongoose';

const UserSchema = new mongoose.Schema(
    {
        name :  {type: String, required:true},
        email: {type: String, required:true, index:{unique:true}},
        pass: {type: String, required:true},
        address : {type: String, required:true},
        phone_num : {type: Number, required:true, unique:true},
        dept : {type:String,requried:true},
        upi : {type:String, unique:true, sparse:true},
        cartID : {type:String, required:true}
    }
)

export default mongoose.model('User', UserSchema);