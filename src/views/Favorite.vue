<!--
2019/1/3
create by Misaka11
-->
<template>
    <el-container>
        <el-header><navbar></navbar></el-header>
        <el-container>
            <el-main>
                收藏夹
                <br>
            <div class = "favoritebox" v-cloak>
                <el-row>
                    <el-col :offset="9" :span="6" v-for="novel in favoritelist" :key="novel.articleName">
                        
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
    </el-container>
</template>

<script>
import navbar from "@/components/navbar"

export default {
    name : 'Favorite',
    components:{
        navbar,
    },
    data(){
        return {
            image : require("../assets/Novel.jpg"),
            user_info:{},
            favoritelist:[],
        }
    },
    computed:{
        
    },
    mounted(){
        this.user_info = this.$store.getters.getUser_info;
        this.favoritelist = JSON.parse(this.user_info.favorite);
    },
    methods:{
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
  .favoritebox{
      height: 500px;
      
  }
  .favoritebox img{
    width: 40%;
    height: 30%;
    float: left;
  }

  .favoritebox span{
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