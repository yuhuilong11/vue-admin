<template>
  <div id="login">
 <div class="login-wrap">
   <ul class="menu-tab">
     <li  v-for="item in menuTab"  :key="item.id" :class="{'current':item.current}" @click="toggleMenu(item)">{{item.txt}}</li>
   </ul>
   <!--表单 start-->
   <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" class="login-form" size="medium" >

  <el-form-item prop="username" class="item-form">
    <label>邮箱</label>
    <el-input type="text" v-model="ruleForm.username" autocomplete="off"></el-input>
  </el-form-item>

  <el-form-item prop="password"  class="item-form">
    <label>密码</label>
    <el-input type="password" v-model="ruleForm.password" autocomplete="off" maxlength="20" minlength="6"></el-input>
  </el-form-item>

  <el-form-item prop="passwords"  class="item-form" v-if="model === 'register'">
    <label>重复密码</label>
    <el-input type="password" v-model="ruleForm.passwords" autocomplete="off" maxlength="20" minlength="6"></el-input>
  </el-form-item>

  <el-form-item prop="code"  class="item-form">
    <label>验证码</label>
    <el-row :gutter="10">
      <el-col :span="15"><el-input v-model.number="ruleForm.code" maxlength="6" minlength="6"></el-input></el-col>
      <el-col :span="9"> <el-button type="success" class="block" >获取验证码</el-button></el-col> 
    </el-row>
  </el-form-item>
  <el-form-item>
    <el-button type="danger" @click="submitForm('ruleForm')" name="submitForms" class="login-btn block">提交</el-button>
  </el-form-item>
</el-form>
 </div>
  </div>
</template>
<script>
import { stripscript,validateEmail,validatePsd,validateVCode} from '@/utils/validate.js'
export default {
  name:"login",
  data(){
    
      //验证用户名
      var validateUsername = (rule, value, callback) => {
        // let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;  //定义邮箱正则表达式  
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else if(validateEmail(value)){    //验证输入的邮箱格式是否正确
          callback(new Error('用户名格式错误'));
        }else {
          callback();  //true
        }
      };
      //验证密码
      var validatePassword = (rule, value, callback) => {
        this.ruleForm.password = stripscript(value)
        value = this.ruleForm.password
        console.log(value)

        // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/  //定义数字加字母的正则表达式
        if (value === '') {
          callback(new Error('请输入密码'));
        } else if ( validatePsd(value)) {
          callback(new Error('密码必须为6到20位的数字加字母!'));
        } else {
          callback();
        }
      };
      //验证重复密码
      var validatePasswords = (rule, value, callback) => {
        //用v-show 时 如果 model 为login 让它直接通过
          // if(this.model === "login") { callback();}
        this.ruleForm.passwords = stripscript(value)
        value = this.ruleForm.passwords
        console.log(value)

        // let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/  //定义数字加字母的正则表达式
        if (value === '') {
          callback(new Error('请再次输入密码'));
        } else if ( value != this.ruleForm.password ) {
          callback(new Error('重复密码不正确'));
        } else {
          callback();
        }
      };
      //验证验证码
      var validateCode = (rule, value, callback) => {
        this.ruleForm.code = stripscript(value)
        value = this.ruleForm.code
        console.log(value)
        // let reg = /^[a-z0-9]{6}$/ //定义数字或字母的正则表达式
        if (value ==='') {
           return callback(new Error('验证码不能为空'));
        } else if(validateVCode(value)){
            return callback(new Error('验证码格式有误!'));
        } else {
          callback();
        }
      };
    return{
      menuTab:[
        {txt:'登录', current:true, type:'login'},
        {txt:'注册', current:false, type:'register'}
      ],
      //model模块
      model: 'login',
      //表单的数据
      ruleForm: {
          username: '',
          password: '',
          passwords: '',
          code: ''
        },
        rules: {
          username: [
            { validator: validateUsername, trigger: 'blur' }
          ],
          password: [
            { validator: validatePassword, trigger: 'blur' }
          ],
          passwords: [
            { validator: validatePasswords, trigger: 'blur' }
          ],
          code: [
            { validator: validateCode, trigger: 'blur' }
          ]
        }
    }
  },
  
  created(){},
  mounted(){},
  methods:{
     toggleMenu(data){
       this.menuTab.forEach(elem => {
         elem.current = false
       });
       //高光
       data.current = true
       //修改模块值
       this.model = data.type
     },
     //表单的方法
      
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          if (valid) {
            alert('submit!');
          } else {
            console.log('error submit!!');
            return false;
          }
        });
      }
    
  }

};
</script>
<style lang="scss" scoped>
#login {
  height: 100vh; //vh 可视区范围
  background-color: #344a5f;
}
.login-wrap{
  width: 330px;
  margin: auto;
}
.menu-tab{
  text-align: center;
  li{
    display: inline-block;
    width: 88px;
    line-height: 36px;
    font-size: 14px;
    color: #fff;
    border-radius: 2px;
    cursor: pointer;
  }
}
.current{
  background-color: rgba(0,0,0,0.1);
}
.login-form{
  margin-top: 29px;
  label{
    margin-bottom: 3px;
    display: block;
    font-size: 14px;
    color: #fff; 
  }
  .item-form{
  margin-bottom: 13px;
}
.block{
  display: block;
  width: 100%;
}
.login-btn{
  margin-top: 19px;
}
}

</style>