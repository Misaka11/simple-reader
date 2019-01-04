<!--
2019/1/3
create by Misaka11
-->
<template>
    <el-container>
        <el-header><navbar></navbar></el-header>
        <el-container>
            <el-main>
                <el-table
                    :data="userlist"
                    height="500"
                    stripe
                    style="width: 100%">
                    <el-table-column
                    prop="email"
                    label="邮箱"
                    width="180">
                    </el-table-column>
                    <el-table-column
                    prop="op"
                    label="操作">
                    <template slot-scope="scope">
                        <el-button @click="deleteUser(scope.row)" type="text" size="small">删除</el-button>
                    </template>
                    </el-table-column>
                </el-table>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
import navbar from "@/components/navbar"

export default {
    name : 'console',
    components:{
        navbar,
    },
    data(){
        return {
            userlist:[],
        }
    },
    computed:{
        
    },
    mounted(){
        this.$http.post('api/user/getUserList',{})
        .then(function(response){
            console.log(response);
            this.userlist = JSON.parse(response.bodyText);
            console.log(this.userlist);
        });
    },
    methods:{
        deleteUser: function(row){
            for (let index = 0; index < this.userlist.length; index++) {
                const element = this.userlist[index];
                if(element.email == row.email){
                    this.userlist.splice(index,1);
                    break;
                }
            }
            this.$http.post('api/user/deleteUser',{email:row.email})
            .then(function(response){
                console.log(response);
            
            });
        }
    }
}
</script>

<style>
  .el-header, .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
 /* .el-aside {
    background-color: #D3DCE6;
    color: #333;
    text-align: center;
    line-height: 200px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
    text-align: center;
    line-height: 160px;
  }*/
  .chapterbox{
      height: 500px;
  }
  .chapterbox span{
    overflow: hidden;
    text-overflow:ellipsis;
    white-space: nowrap;
    margin-bottom: 0px;
    font-size: 15px;
    min-height: 31px;
    display: flex;
    align-items: left;
    justify-content: left;
    height: 31px;
    margin-top: -5px;
    color: #0f0e0d;
    font-family: Microsoft YaHei;
  }
  .chapters{
      height: 50px;
      width: 200px;
  }
</style>