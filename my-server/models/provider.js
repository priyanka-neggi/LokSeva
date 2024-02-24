import { Schema, model } from 'mongoose';
import { genSalt, hash, compare } from 'bcrypt';
import { sign } from "jsonwebtoken";

const ProSchema = new Schema({
    fname: { 
        type: String,
        require:true
    },
    lname: { 
        type: String,
        require:true
    },
    email: {
        type: String,
        required : [true, "Please provide a unique email"],
        unique: true,
    },
    mobile : { 
        type : Number,
        require:true
    },
    state:{
        type:String,
        require:true
    },
    district:{
        type:String,
        require:true
    },
    pincode:{
        type:String,
        require:true
    },
    city:{
        type:String,
        require:true
    },
    profession:{
        type:String,
        require:true
    },
    password: {
        type: String,
        required: [true, "Please provide a password"],
        unique : false,
    },
    tokens:[{
        token:{
            type: String,
            required: true  
        }
    }]
});

ProSchema.methods.generateToken= async function(){
    try{
        const token= sign({_id:this._id},process.env.SECRET_KEY);
        this.tokens= this.tokens.concat({token:token});
        await this.save();
        return token;
    }catch(err){
        console.log("Error while generating token");
        console.error(err);
    }
}
ProSchema.pre('save',async function (next){
    if(this.isModified("password")){
        const salt=await genSalt(10);
        this.password=await hash(this.password,salt);
    }
     next(); 
})


ProSchema.methods.matchPassword=async function(password){
    const data=await compare(password,this.password)
    return data;
}

const hostPerson = model('Provider', ProSchema);

module.exports =hostPerson;
