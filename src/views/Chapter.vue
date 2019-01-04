<!--
2018/12/22
create by Misaka11
-->
<template>
    <el-container>
        <el-header><navbar></navbar></el-header>
        <el-container>
            <el-aside class="chapterbox" width="230px">
                <el-row v-for="chapter in chapters" :key="chapter.herf">
                    <el-col :span="1">
                        <el-card class= "chapters" shadow="hover" @click.native="SetChapter(chapter)">
                            <span>{{chapter.title}} </span>
                        </el-card>
                    </el-col>
                </el-row>
            </el-aside>
            <el-container>
                <el-main>
                    {{chapter.title}}
                    <br>
                    <div v-html="content"></div>
                </el-main>
                <el-footer>
                    <el-button-group>
                        <el-button type="primary" icon="el-icon-arrow-left" v-on:click="LastPage()">上一页</el-button>
                        <el-button type="primary" v-on:click="NextPage()">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                    </el-button-group>
                </el-footer>
            </el-container>
        </el-container>
    </el-container>
</template>

<script>
import navbar from "@/components/navbar"

export default {
    name : 'Chapter',
    components:{
        navbar,
    },
    data(){
        return {
            content:"",
        }
    },
    computed:{
        novel(){
            return this.$store.getters.getNovel;
        },
        chapter(){
            return this.$store.getters.getChapter;
        },
        chapters(){
            return this.$store.getters.getChapters;
        },
    },
    mounted(){
        this.$http.get('/api/article/getCharterContent?link='+this.novel.articleLink+this.chapter.href).then(function (response){
            this.content=JSON.parse(response.bodyText).content;
        });

    },
    methods:{
        SetChapter:function(chapter){
            this.$store.dispatch('setChapter',chapter);
            this.$http.get('/api/article/getCharterContent?link='+this.novel.articleLink+this.chapter.href)
            .then(function (response){
            this.content=JSON.parse(response.bodyText).content;
            console.log(response)
            });
            
            this.$router.push({ path: '/chapter'});
        },
        LastPage:function(){
            for (let index = 0; index < this.chapters.length; index++) {
                if(this.chapters[index].href == this.chapter.href){
                    if(index == 0){

                    }
                    else{
                        this.SetChapter(this.chapters[index-1]);
                    }
                    break;
                }
            }
        },
        NextPage:function(){
            for (let index = 0; index < this.chapters.length; index++) {
                if(this.chapters[index].href == this.chapter.href){
                    if(index == this.chapters.length-1){

                    }
                    else{
                        this.SetChapter(this.chapters[index+1]);
                    }
                    break;
                }
            }
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