import mongoose from 'mongoose';
const splitSchema=new mongoose.Schema({user:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},amountCents:{type:Number,required:true,min:0}},{_id:false});
const schema=new mongoose.Schema({trip:{type:mongoose.Schema.Types.ObjectId,ref:'Trip',required:true,index:true},title:{type:String,required:true,trim:true},date:{type:Date,required:true},amountCents:{type:Number,required:true,min:1},paidBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true},splits:[splitSchema],createdBy:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true}},{timestamps:true});
export default mongoose.model('Expense',schema);
