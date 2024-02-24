import { verify as _verify } from "jsonwebtoken";
import { findOne } from '../models/user';
import { findOne as _findOne } from '../models/provider';

const authenticateUser=async(req,res,next)=>{
    try{
        let token=req.headers.authorization;
        if(!token){
            res.status(401).send("Authorization Fails")
        }
        if(token.startsWith('Bearer ')){
            token=token.split(' ')[1];
        }
        const verify=_verify(token,process.env.SECRET_KEY);
        const userExist=await findOne({_id:verify._id,"tokens.token":token});
        if(!userExist){
            throw new Error("User Not Found");
        }

        req.token=token;
        req.rootUser=userExist;
        req.userId=userExist._id;

        next();
    }catch(err){
        console.log("Auth fail")
        console.log(err);
    }
}

const authenticatePro=async(req,res,next)=>{
    try{
        let token=req.headers.authorization;
        if(!token){
            res.status(401).send("Authorization Fails")
        }
        if(token.startsWith('Bearer ')){
            token=token.split(' ')[1];
        }
        const verify=_verify(token,process.env.SECRET_KEY);
        const userExist=await _findOne({_id:verify._id,"tokens.token":token});

        if(!userExist){
            throw new Error("User Not Found");
        }

        req.token=token;
        req.rootUser=userExist;
        req.userId=userExist._id;

        next();
    }catch(err){
        console.log(err);
        console.log("Auth fail")
    }
}

export default{authenticateUser,authenticatePro};