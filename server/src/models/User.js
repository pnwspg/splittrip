import mongoose from 'mongoose';
const schema = new mongoose.Schema({name:{type:String,required:true,trim:true},email:{type:String,required:true,unique:true,lowercase:true,trim:true},passwordHash:{type:String,required:true},bankAccounts:[{bank:{type:String,required:true,trim:true},accountName:{type:String,required:true,trim:true},accountNumber:{type:String,required:true,trim:true},isDefault:{type:Boolean,default:false}}]},{timestamps:true});
export default mongoose.model('User',schema);
