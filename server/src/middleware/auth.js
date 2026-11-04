import jwt from 'jsonwebtoken';
import Trip from '../models/Trip.js';
export function auth(req,res,next){try{const token=req.headers.authorization?.match(/^Bearer (.+)$/)?.[1];if(!token)return res.status(401).json({error:'กรุณาเข้าสู่ระบบ'});const decoded=jwt.verify(token,process.env.JWT_SECRET);req.userId=decoded.sub;next();}catch{return res.status(401).json({error:'เซสชันหมดอายุ กรุณาเข้าสู่ระบบใหม่'});}}
export async function tripMember(req,res,next){try{const trip=await Trip.findById(req.params.tripId);if(!trip)return res.status(404).json({error:'ไม่พบทริป'});if(!trip.members.some(m=>String(m)===req.userId))return res.status(403).json({error:'ไม่มีสิทธิ์เข้าถึงทริป'});req.trip=trip;next();}catch(e){next(e)};}
