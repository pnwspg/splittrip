import mongoose from 'mongoose';
const schema=new mongoose.Schema({name:{type:String,required:true,trim:true},description:{type:String,default:''},owner:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},members:[{type:mongoose.Schema.Types.ObjectId,ref:'User'}],joinCode:{type:String,unique:true,required:true},currency:{type:String,default:'THB'}},{timestamps:true});
export default mongoose.model('Trip',schema);
