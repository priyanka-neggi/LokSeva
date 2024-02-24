import { connect } from 'mongoose';


const DB= process.env.DB;

connect(DB).then(()=>{
  console.log(`DB connected`);
}).catch((err)=>{
  // console.log("Error");
  console.log(err);
})