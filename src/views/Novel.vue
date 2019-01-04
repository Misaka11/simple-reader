<!--
2018/12/22
create by Misaka11
问题：之前我实现v-for + router-link跳转，
在router-link里加入动态绑定函数，发现每个循环都会运行
解决方法：去掉router-link，直接在card上点击函数，传递动态参数，
再在函数中实现跳转（注：click后需要加.active）
-->
<template>
    <el-container>
        <el-header><navbar></navbar></el-header>
        <el-main>
            <h1>{{header}}</h1>
            <div class="searchbox">
                <el-row>
                    <el-col :span="6" :offset="9">
                        <el-input placeholder="请输入搜索小说" v-model="searchNovel" clearable></el-input>
                    </el-col>
                    <el-col :span="1">
                        <el-button icon="el-icon-search" circle v-on:click="Search()"></el-button>
                    </el-col>
                </el-row>
            </div>
            <div class = "novelbox" v-cloak>
                <el-row>
                    <el-col :offset="9" :span="6" v-for="novel in novels" :key="novel.articleName">
                        
                            <el-card shadow="hover" :body-style="{ padding: '0x' }" @click.native="SetNovel(novel)">
                                <div>
                                    <img :src="image">
                                </div>
                                <div>
                                    <p>
                                        <span>分类：{{novel.classify}}</span>
                                        <span>小说：{{novel.articleName}}</span>
                                        <span>作者：{{novel.authorName}}</span>
                                        <span>最新章节：{{novel.latestCharterName}}</span>
                                    </p>
                                </div>
                            </el-card>
                        
                    </el-col>
                </el-row>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import navbar from "@/components/navbar"

export default {
    name : 'Novel',
    components:{
        navbar,
    },
    data(){
            return{
                header: '极简小说阅读器',
                searchNovel: '',
                image : require("../assets/Novel.jpg"),
                novels: [],
        }
    },
    computed:{
        
    },
    methods:{
        Search: function() {
            this.searchNovel="狼群"
            console.log(this.searchNovel);
            this.$http.get('api/article/searchArticle?searchKey='+this.searchNovel)
            .then(function (response){
            this.novels=JSON.parse(response.bodyText).content;
            console.log(response)
            });
            
        },
        SetNovel: function (novel) {
            this.$store.dispatch('setNovel',novel);
            //console.log(novel);
            this.$router.push({ path: '/chapters'});
        },
        
    }
}
</script>

<style>
  [v-cloak] {
      display: none;
    }
  .el-row {
    margin-bottom: 20px;
  }
  .el-col {
    border-radius: 25px;
    margin-bottom: 20px;
  }
  .novelbox{
      height: 500px;
      
  }
  .novelbox img{
    width: 40%;
    height: 30%;
    float: left;
  }

  .novelbox span{
    margin-bottom: 10px;
    font-size: 15px;
    min-height: 31px;
    display: flex;
    align-items: left;
    justify-content: left;
    height: 31px;
    margin-top: 5px;
    color: #0f0e0d;
    white-space: normal;
    font-family: Microsoft YaHei;
  }
  .el-header{
    background-color: #B3C0D1;
    color: #333;
  }

  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }


</style>