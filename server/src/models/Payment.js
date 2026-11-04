import mongoose from 'mongoose';
const schema=new mongoose.Schema({trip:{type:mongoose.Schema.Types.ObjectId,ref:'Trip',required:true,index:true},from:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},to:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},amountCents:{type:Number,required:true,min:1},createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},note:{type:String,default:''}},{timestamps:true});
export default mongoose.model('Payment',schema);
