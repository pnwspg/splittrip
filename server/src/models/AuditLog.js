import mongoose from 'mongoose';
const schema = new mongoose.Schema({
  trip:{type:mongoose.Schema.Types.ObjectId,ref:'Trip',index:true},
  actor:{type:mongoose.Schema.Types.ObjectId,ref:'User',required:true,index:true},
  action:{type:String,required:true}, entity:{type:String,required:true},
  entityId:{type:mongoose.Schema.Types.ObjectId},
  details:{type:mongoose.Schema.Types.Mixed,default:{}},
  createdAt:{type:Date,default:Date.now,immutable:true}
},{versionKey:false});
schema.index({trip:1,createdAt:-1});
export default mongoose.model('AuditLog',schema);
