import { Schema, model } from 'mongoose';

const Message = new Schema({
    user:{
        type:Schema.Types.ObjectId,
        ref:"User"
    },
    provider:{
        type:Schema.Types.ObjectId,
        ref:'Provider'
    },
    message:[{
            sender:{
                type:Number,
                default:0
            },
            content:{
                type:String,
            }
        }
    ],
    latest:{
        type:String,
        default:"Say Hi!"
    },
    puser:{
        type:Number,
        default:0
    },
    pprovider:{
        type:Number,
        default:0
    }
});


const hostPerson = model('Message', Message);

module.exports = hostPerson;
