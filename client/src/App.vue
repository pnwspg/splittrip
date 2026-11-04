<script setup>
import {ref} from 'vue';
import {useAuth} from './stores/auth.js';
import {useRouter} from 'vue-router';
import {api} from './services/api.js';
const auth=useAuth(),router=useRouter();
const profileDialog=ref(false),profileName=ref(''),profileError=ref(''),saving=ref(false);
function logout(){auth.logout();router.push('/login');}
function openProfile(){profileName.value=auth.user?.name||'';profileError.value='';profileDialog.value=true;}
async function saveProfile(){profileError.value='';const name=profileName.value.trim();if(!name||name.length>80){profileError.value='กรุณากรอกชื่อ 1–80 ตัวอักษร';return;}saving.value=true;try{const {data}=await api.patch('/auth/me/profile',{name});auth.setUser(data.user);profileDialog.value=false;}catch(e){profileError.value=e.response?.data?.error||'บันทึกชื่อไม่สำเร็จ';}finally{saving.value=false;}}
</script>
<template><v-app><v-app-bar flat color="white" border="b"><v-container class="d-flex align-center"><v-icon color="primary" size="32" class="mr-2">mdi-wallet-outline</v-icon><span class="text-h6 font-weight-bold">SplitTrip</span><v-spacer/><template v-if="auth.user"><v-btn variant="text" prepend-icon="mdi-account-edit-outline" @click="openProfile">{{auth.user.name}}</v-btn><v-btn variant="text" prepend-icon="mdi-logout" @click="logout">ออกจากระบบ</v-btn></template></v-container></v-app-bar><v-main><router-view/></v-main><v-dialog v-model="profileDialog" max-width="450"><v-card class="pa-5"><h3 class="text-h6 mb-4">แก้ไขชื่อผู้ใช้งาน</h3><v-alert v-if="profileError" type="error" variant="tonal" class="mb-3">{{profileError}}</v-alert><v-form @submit.prevent="saveProfile"><v-text-field v-model="profileName" label="ชื่อที่แสดง" maxlength="80" counter autofocus required/><p class="text-caption mb-4">ชื่อใหม่จะแสดงในทริปและรายการค่าใช้จ่ายเดิม โดยไม่เปลี่ยนบัญชีล็อกอิน</p><div class="d-flex justify-end ga-2"><v-btn variant="text" @click="profileDialog=false">ยกเลิก</v-btn><v-btn type="submit" color="primary" :loading="saving">บันทึกชื่อ</v-btn></div></v-form></v-card></v-dialog></v-app></template>