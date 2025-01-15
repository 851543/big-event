<script setup>
import { ref } from "vue";
const userPasswordInfo = ref({
  old_pwd: "",
  new_pwd: "",
  re_pwd: "",
});
//确认密码自定义校验
const checkRePassword = (rule, value, callback) => {
  if (value === "") {
    callback(new Error("请再次确认新密码"));
  } else if (value !== userPasswordInfo.value.new_pwd) {
    callback(new Error("请确保两次输入的新密码一样"));
  } else {
    callback();
  }
};
const rules = {
  old_pwd: [
    { required: true, message: "请输入密码", trigger: "blur" },
    {
      pattern: /^\S{5,16}$/,
      message: "密码必须是5-6位的非空字符串",
      trigger: "blur",
    },
  ],
  new_pwd: [
    { required: true, message: "请输入新密码", trigger: "blur" },
    {
      min: 5,
      max: 16,
      message: "新密码必须是5-6位的非空字符串",
      trigger: "blur",
    },
  ],
  re_pwd: [
    { required: true, message: "请再次输入新密码", trigger: "blur" },
    { validator: checkRePassword, trigger: "blur" },
  ],
};
//重置密码
const clearPasswordInfoData = () => {
  userPasswordInfo.value.old_pwd = "";
  userPasswordInfo.value.new_pwd = "";
  userPasswordInfo.value.re_pwd = "";
}; 
import {userResetPasswordUpdateService} from '@/api/user.js'
import {ElMessage} from 'element-plus'
import {useTokenStore} from '@/stores/token.js'
import {useRouter} from 'vue-router'
const tokenStore = useTokenStore()
const router = useRouter()
const updatesrcUserResetPassword = async ()=>{
    const result = await userResetPasswordUpdateService(userPasswordInfo.value)
    ElMessage.success(result.data ? result.data : "修改成功")
    //清空token信息
    tokenStore.token="";
    //回登陆
    router.push("/login")
}
</script>
<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <span></span>
      </div>
    </template>
    <el-row>
      <el-col :span="12">
        <el-form
          :model="userPasswordInfo"
          :rules="rules"
          label-width="100px"
          size="large"
        >
          <el-form-item label="原密码" prop="old_pwd">
            <el-input v-model="userPasswordInfo.old_pwd"></el-input>
          </el-form-item>
          <el-form-item label="新密码" prop="new_pwd">
            <el-input type="password" v-model="userPasswordInfo.new_pwd"></el-input>
          </el-form-item>
          <el-form-item label="确认密码" prop="re_pwd">
            <el-input type="password" v-model="userPasswordInfo.re_pwd"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="updatesrcUserResetPassword">修改密码</el-button>
            <el-button @click="clearPasswordInfoData">重置</el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </el-card>
</template>