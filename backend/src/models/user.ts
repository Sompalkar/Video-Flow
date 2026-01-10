import mongoose from "mongoose";

 
const userSchema =  new mongoose.Schema({
    name :{
        type :String,
    },
    email:{
        type:String,
        unique:true,
        require:true
    },
    password:{
        type:String,
        require:true
    },
})

const User  = mongoose.model('User', userSchema)
export default User