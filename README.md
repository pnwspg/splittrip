# SplitTrip — MEVN Stack

เว็บแอปแชร์ค่าใช้จ่ายแบบหลายคน: Vue 3 + Vuetify + Pinia + Express + MongoDB + Mongoose + JWT

## ความสามารถ
- สมัครสมาชิก / ล็อกอิน / JWT อายุ 7 วัน
- สร้างหลายทริปและเข้าร่วมด้วยรหัสเชิญ
- เพิ่มรายการและเลือกผู้จ่าย พร้อมติ๊กผู้ร่วมรับผิดชอบ
- หารเท่ากันแบบแม่นยำถึงสตางค์ (เศษสตางค์กระจายตามลำดับ) หรือระบุยอดรายคน
- แสดงยอดสุทธิและแนะนำการโอนให้น้อยรายการ
- บันทึกยอดโอนจริง / ลบประวัติการโอน / Export CSV UTF-8 BOM ภาษาไทย
- เจ้าของทริปลบสมาชิกที่ไม่มีประวัติการเงินได้ สมาชิกทุกคนดูข้อมูลทริปได้

## วิธีเริ่มใช้งาน
ต้องมี Node.js 20.19+ หรือ 22.12+ และ MongoDB Local หรือ MongoDB Atlas

### 1. Backend
```bash
cd server
cp .env.example .env
npm install
npm run dev
```
แก้ `server/.env` ให้ตรง MongoDB ของคุณและเปลี่ยน `JWT_SECRET` เป็นข้อความสุ่มยาวอย่างน้อย 32 ตัวอักษร (ห้ามใช้ค่าตัวอย่าง)

### 2. Frontend (เปิด terminal ใหม่)
```bash
cd client
cp .env.example .env
npm install
npm run dev
```
เปิด http://localhost:5173 แล้วสมัครสมาชิก

Windows PowerShell ใช้ `Copy-Item .env.example .env` แทน `cp` ได้

### 3. ทดสอบหลายคน
1. Browser A สมัครบัญชีแรก สร้างทริป และคัดลอกรหัสเชิญ
2. Browser B (Incognito) สมัครอีกบัญชี กดเข้าร่วมด้วยรหัส
3. ทั้งสองบัญชีเพิ่มค่าใช้จ่ายได้ เปิดแท็บสรุปเพื่อดูยอดโอนคืน
4. กดบันทึกโอนเพื่อบันทึกยอดจริง แล้วโหลดข้อมูลใหม่เพื่อเห็นยอดคงเหลือ

## API
| Method | Endpoint | ความหมาย |
|---|---|---|
| POST | /api/auth/register | สมัครสมาชิก |
| POST | /api/auth/login | ล็อกอิน |
| GET | /api/auth/me | ผู้ใช้ปัจจุบัน |
| GET, POST | /api/trips | รายการทริป / สร้างทริป |
| POST | /api/trips/join | เข้าร่วมด้วยรหัส |
| GET | /api/trips/:tripId | รายละเอียดทริป |
| DELETE | /api/trips/:tripId/members/:userId | ลบสมาชิกที่ไม่มีรายการเงิน (เจ้าของ) |
| GET, POST | /api/trips/:tripId/expenses | ดู / เพิ่มค่าใช้จ่าย |
| DELETE | /api/trips/:tripId/expenses/:expenseId | ลบค่าใช้จ่าย |
| GET, POST | /api/trips/:tripId/payments | ดู / บันทึกการโอน |
| DELETE | /api/trips/:tripId/payments/:paymentId | ลบการโอน |
| GET | /api/trips/:tripId/summary | ยอดสุทธิและการโอนที่แนะนำ |

## โครงสร้างข้อมูล
`User` ชื่อ อีเมล passwordHash; `Trip` ชื่อ owner members joinCode; `Expense` รายการ วันที่ จำนวนเงินเป็นสตางค์ ผู้จ่าย splits; `Payment` ผู้โอน ผู้รับ ยอดจริงเป็นสตางค์

## ข้อควรรู้
- เวอร์ชันนี้เป็น MVP ใช้การโหลดใหม่หลังทำรายการ ยังไม่มี WebSocket real-time push
- บันทึกการโอนเป็นการแจ้งยอดโดยผู้โอนหรือเจ้าของทริป ยังไม่มีการยืนยันรับเงินจากผู้รับ
- หากต้องใช้ production ควรเพิ่ม HTTPS, password reset, email verification, audit log, invitation expiry, tests และ rate limiting ที่เหมาะสมสำหรับทุก endpoint
- เมื่อเพิ่มผู้ร่วมทริปใหม่ ระบบจะไม่ย้อนหลังเปลี่ยนยอดหารของรายการเก่า
- การลบรายการอาจทำให้ยอดสุทธิเปลี่ยน; ควรตรวจสอบยอดที่เคยโอนจริงก่อนลบ
- ค่าใช้จ่ายและการโอนทั้งหมดเป็น THB และเก็บจำนวนเงินเป็น integer satang เพื่อป้องกัน floating-point error


## บัญชีธนาคารของสมาชิก (เพิ่มในเวอร์ชันนี้)
- สมาชิกแต่ละคนเพิ่มบัญชีธนาคารได้สูงสุด 10 บัญชี กำหนดบัญชีหลัก แก้ไขและลบได้ในแท็บสมาชิกของทริป
- แสดงธนาคาร ชื่อบัญชี และหมายเลขบัญชีในรายการโอนที่แนะนำและหน้าบันทึกการชำระเงิน
- สมาชิกที่อยู่ในทริปเดียวกันเท่านั้นที่อ่านข้อมูลบัญชีของสมาชิกทริปได้ผ่าน `GET /api/trips/:tripId`
- เจ้าของบัญชีเท่านั้นที่แก้ไขได้ผ่าน `POST /api/auth/me/bank-accounts`, `PUT /api/auth/me/bank-accounts/:accountId`, `DELETE /api/auth/me/bank-accounts/:accountId`
- ข้อมูลบัญชีเป็นข้อมูลส่วนบุคคล ควรใช้ HTTPS และจำกัดสิทธิ์ฐานข้อมูลใน production; รุ่นนี้ยังไม่ได้เข้ารหัสเลขบัญชีในระดับ field


## Audit Logs (ประวัติการทำรายการ)
- หน้า Trip Detail > ประวัติการทำรายการ แสดงผู้ดำเนินการ เวลา ประเภท และรายละเอียด พร้อมแบ่งหน้า
- GET `/api/trips/:tripId/logs?page=1&limit=30` ต้องเข้าสู่ระบบและเป็นสมาชิกทริป
- MongoDB collection `auditlogs` บันทึกการสร้างทริป เข้าร่วม/ลบสมาชิก เพิ่ม/ลบค่าใช้จ่าย เพิ่ม/ลบการโอน และเพิ่ม/แก้ไข/ลบบัญชีธนาคาร
- Log ไม่บันทึกเลขบัญชี รหัสผ่าน หรือ token; การเปลี่ยนบัญชีบันทึกเฉพาะชื่อธนาคาร
- รายการก่อนติดตั้งฟีเจอร์นี้จะไม่มีประวัติย้อนหลัง; ไม่สามารถแก้ไขหรือลบ log ผ่าน API
- ข้อจำกัด: การเขียน log และการเขียนข้อมูลหลักยังไม่อยู่ใน MongoDB transaction เดียวกัน หาก log ล้มเหลวหลังบันทึกข้อมูลหลัก API อาจตอบ error ทั้งที่ข้อมูลหลักถูกบันทึกแล้ว ควรใช้ transaction + replica set ก่อนใช้กับงานที่ต้องการ audit แบบเคร่งครัด


## Update: Expense date and user display name
- Expense entry date accepts **DD/MM/YYYY (Gregorian year)**, validated and converted to YYYY-MM-DD for the existing API. Example: 03/11/2026.
- Click your display name in the top bar to edit it. `PATCH /api/auth/me/profile` accepts `{ "name": "New name" }` and requires JWT.
- Name changes preserve the user ID and existing balances, and add `profile.name.updated` audit entries to the user's current trips, with old and new display names. Other browsers should refresh to see the updated name.
- Date entry is text with validation (not a native calendar picker), to guarantee consistent DD/MM/YYYY across browsers.
