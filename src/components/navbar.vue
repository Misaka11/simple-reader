<!--
2018/12/22
create by Misaka11
负责登录注册和导航，很重要的部件
是不是不应该把这么多功能放到这里面？
-->
<template>
    <el-container>
    <el-menu class="el-menu-demo"  mode="horizontal" @select="handleSelect" >
        <el-menu-item index="0">首页</el-menu-item>
    </el-menu>
    <div align='center'>
    <el-menu class="el-menu-demo"  mode="horizontal" @select="handleSelect" v-if="!islogin">
        <el-menu-item index="1">登陆</el-menu-item>
        <el-menu-item index="2">注册</el-menu-item>
    </el-menu>
    </div>
    <el-menu class="el-menu-demo" mode="horizontal" @select="handleSelect" v-if="islogin">
        <el-submenu index = "3">
            <template slot="title">
                <img :src="image" class="touxiang">
                <span>{{user_info.email}}</span>
            </template>
            <el-menu-item index="3-0">{{identity}}</el-menu-item>
            <el-menu-item index="3-1">我的收藏</el-menu-item>
            <el-menu-item index="3-2">我的笔记</el-menu-item>
            <el-menu-item index="3-3">退出登录</el-menu-item>
        </el-submenu>
    </el-menu>
    <el-dialog title="登录" :visible.sync="FormVisible1" width="20%">
        <el-form :model="form1" >
            <div v-if="errorInfo1">
                    <span>{{errInfo1}}</span>
            </div>
            <el-form-item label="邮箱" :label-width="formLabelWidth" >
                <el-input v-model="form1.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="密码" :label-width="formLabelWidth">
                <el-input type="password" v-model="form1.password" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="FormVisible1 = false">取 消</el-button>
            <el-button type="primary" @click="login()">确 定</el-button>
        </div>
    </el-dialog>
    <el-dialog title="注册" :visible.sync="FormVisible2" width="20%">
        <el-form :model="form2">
            <div v-if="errorInfo2">
                    <span>{{errInfo2}}</span>
            </div>
            <el-form-item label="注册邮箱" :label-width="formLabelWidth">
                <el-input v-model="form2.email" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="注册密码" :label-width="formLabelWidth">
                <el-input type="password" v-model="form2.password1" autocomplete="off"></el-input>
            </el-form-item>
            <el-form-item label="重复密码" :label-width="formLabelWidth">
                <el-input type="password" v-model="form2.password2" autocomplete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="FormVisible2 = false">取 消</el-button>
            <el-button type="primary" @click="register()">确 定</el-button>
        </div>
    </el-dialog>
    </el-container>
</template>

<script>
export default {
    name : 'navbar',

    data(){
        return{
            image : require("../assets/admin_img.png"),
            FormVisible1: false,
            FormVisible2: false,
            errorInfo1: false,
            errorInfo2: false,
            islogin : false,
            formLabelWidth:'100px',
            user_info : {},
            form1:{
                email:'',
                password:'',
            },
            form2:{
                email:'',
                password1:'',
                password2:'',
            }
        }
    },
    mounted(){
        this.user_info = this.$store.getters.getUser_info;
        console.log(this.user_info)
        if(!this.user_info)
        {
            this.islogin = false;
        }
        else{
            this.islogin = true;
        }
    },
    computed:{
        identity(){
            if(this.islogin){
                if(this.user_info.competence == 0)
                    return "身份：admin";
                else return "身份：reader";
            }
        }
    },
    methods:{
        handleSelect(key,keyPath){
            console.log(key,keyPath);
            if(key == 0){
                this.$router.push('/');
            }
            if(key == 1){
                this.FormVisible1 = true;
            }
            if(key == 2){
                this.FormVisible2 = true;
            }
            if(key == '3-0'){
                //管理员进入控制台
                if(this.user_info.competence == 0)
                    this.$router.push('/console');
            }
            if(key == '3-1'){
                this.$router.push('/Favorite');
            }
            if(key == '3-2'){
                this.$router.push('/Notes');
            }
            if(key == '3-3'){
                this.islogin = false;
                console.log("退出并保存信息")
                this.$http.post('api/user/updateUser',this.user_info);
                this.$store.dispatch('setLogout');
                this.$router.push('/');
            }
        },
        login(){
            this.$http.post('api/user/login/',{email:this.form1.email,password:this.form1.password})
            .then(function(response){
                console.log(response);
                if(response.data==0){
                    this.errorInfo1 = true;
                    this.errInfo1 = "密码错误"
                }
                else if(response.data==-1){
                    this.errorInfo1 = true;
                    this.errInfo1 = "账号错误"
                }
                else if(response.status == 200){
                    this.user_info = JSON.parse(response.bodyText);
                    console.log(this.user_info);
                    this.islogin = true;
                    this.FormVisible1 = false;
                    this.$store.dispatch('setUser_info',this.user_info);
                    this.$router.push('/');
                }
            });
        },
        register(){
            if(this.form2.password1 == this.form2.password2){
                this.$http.post('api/user/register/',{email:this.form2.email,password:this.form2.password1,competence:1})
                .then(function(response){
                    //console.log(response);
                    if(response.bodyText=='0'){
                        console.log(response)
                        this.errorInfo2 = true;
                        this.errInfo2 = "注册失败"
                    } else if(response.status == 200){
                        console.log(response)

                        this.FormVisible2 = false;
                    }
                });
            }else{
                this.errorInfo2 = true;
                this.errInfo2 = "密码不相同";
            }
            
        }
    }
}
</script>

<style>
  .touxiang{
      width: 50px;
      height: 50px;
      border-radius: 50%;

  }
  .el-menu-demo{
      float: right;
  }
</style>




