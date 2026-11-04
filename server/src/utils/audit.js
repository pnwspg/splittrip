import AuditLog from '../models/AuditLog.js';
// Explicit, allowlisted audit details: never store credentials, tokens, or bank account numbers.
export async function audit(req,action,entity,entityId,details={},trip=null){
  await AuditLog.create({trip:trip||req.trip?._id||undefined,actor:req.userId,action,entity,entityId,details});
}
