<!--
2018/12/22
create by Misaka11
同上一页一个问题
-->
<template>
    <el-container>
        <el-header><navbar></navbar></el-header>
        <el-main>
            <h1>极简小说阅读器</h1>
            <div class="desbox">
                <el-row>
                    <el-col :offset="9" :span="6">
                        <el-card shadow="hover" :body-style="{ padding: '0x' }">
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
                                    <i v-if="!isShoucang" class="el-icon-star-off" @click="shoucang()"></i>
                                    <i v-if="isShoucang" class="el-icon-star-on" @click="shoucang()"></i>
                                </div>
                            </el-card>
                    </el-col>
                </el-row>
            </div>
            <div class="chapterbox">
                <el-row>
                    <el-col :offset="1" :span="3" v-for="chapter in chapters" :key="chapter.href">
                        <!--<router-link to="/Chapter" :click="SetChapter(chapter,chapters)"> -->
                            <el-card class= "chapters" shadow="hover" @click.native="SetChapter(chapter,chapters)">
                                <span>{{chapter.title}} </span>
                            </el-card>
                        <!--</router-link> -->
                    </el-col>
                </el-row>
            </div>
        </el-main>
    </el-container>
</template>

<script>
import navbar from "@/components/navbar"

export default {
    name : 'Chapters',
    components:{
        navbar,
    },
    data(){
        return {
            image : require("../assets/Novel.jpg"),
            chapters:[],
            isShoucang:false,
            user_info:{},
            favoritelist:[],
        }
    },
    computed:{
        novel(){
            return this.$store.getters.getNovel;
        },
    },
    mounted(){
        this.user_info = this.$store.getters.getUser_info;
        if(this.user_info)
            this.favoritelist = JSON.parse(this.user_info.favorite);
        if(!this.favoritelist) this.favoritelist = [];
        this.favoritelist.forEach(element => {
            if(element.articleLink == this.novel.articleLink){
                this.isShoucang = true;
                return false;
            }
        });
        this.chapters = this.$store.getters.getChapters;
        this.$http.get('api/article/getCharterList?link='+this.novel.articleLink+'&download=no')
        .then(function (response){
            this.chapters =JSON.parse(response.bodyText).content;
            console.log(response)
        });
    },
    methods:{
        SetChapter:function(chapter,chapters){
            this.$store.dispatch('setChapter',chapter);
            this.$store.dispatch('setChapters',chapters);
            this.$router.push({ path: '/chapter'});
        },
        shoucang: function(){
            console.log(this.novel)
            if(this.isShoucang){
                alert("取消收藏");
                //在favoritelist中删除novel
                for (let index = 0; index < this.favoritelist.length; ) {
                    const element = this.favoritelist[index];
                    if(element.articleLink == this.novel.articleLink){
                        this.favoritelist.splice(index,1);
                        continue;
                    }
                    index++
                }
                console.log(this.favoritelist)
                this.user_info.favorite = JSON.stringify(this.favoritelist);
                this.$store.dispatch('setUser_info',this.user_info);
                this.isShoucang = false;
            }
            else{
                alert("收藏成功");
                //在favoritelist中添加novel
                this.favoritelist.push(this.novel);
                console.log(this.favoritelist)
                this.user_info.favorite = JSON.stringify(this.favoritelist);
                this.$store.dispatch('setUser_info',this.user_info);
                this.isShoucang = true;
            }
        }
    }
}
</script>

<style>

  .desbox img{
    width: 40%;
    height: 30%;
    float: left;
  }
  .desbox span{
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

  .el-header{
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
  
  .el-main {
    background-color: #E9EEF3;
    color: #333;
  }

</style>
