<!--
2019/1/3
create by Misaka11
-->
<template>
    <el-container>
        <el-header><navbar></navbar></el-header>
        <el-container>
            <el-main>
                
                <el-button type="primary" icon="el-icon-edit" @click="FormVisible1 = true">写笔记</el-button>
            <div class = "notebox" v-cloak>
                <el-row>
                    <el-col :offset="9" :span="6" v-for="note in notelist" :key="note.title">
                        <el-card class="box-card">
                            <div slot="header" class="clearfix">
                                <span>{{note.title}}</span>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="deleteNote(note)">删除</el-button>
                                <el-button style="float: right; padding: 3px 0" type="text" @click="editNote(note)">修改</el-button>
                            </div>
                            <div class="text item">
                                {{note.content }}
                            </div>
                        </el-card>
                    </el-col>
                </el-row>
            </div>
            </el-main>
            <el-dialog title="笔记" :visible.sync="FormVisible1">
                <el-form :model="form1">
                    <div v-if="errorInfo1">
                            <span>{{errInfo1}}</span>
                    </div>
                    <el-form-item label="标题" :label-width="formLabelWidth">
                        <el-input v-model="form1.title" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" :label-width="formLabelWidth">
                        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" v-model="form1.content" ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="FormVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="addNote()">确 定</el-button>
                </div>
            </el-dialog>
            <el-dialog title="笔记" :visible.sync="FormVisible2">
                <el-form :model="form2">
                    <div v-if="errorInfo2">
                            <span>{{errInfo2}}</span>
                    </div>
                    <el-form-item label="标题" :label-width="formLabelWidth">
                        <el-input v-model="form2.title" :disabled = "true" autocomplete="off"></el-input>
                    </el-form-item>
                    <el-form-item label="内容" :label-width="formLabelWidth">
                        <el-input type="textarea" :autosize="{ minRows: 5, maxRows: 10}" v-model="form2.content" ></el-input>
                    </el-form-item>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button @click="FormVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="editNoteY()">确 定</el-button>
                </div>
            </el-dialog>
        </el-container>
    </el-container>
</template>

<script>
import navbar from "@/components/navbar"

export default {
    name : 'Notes',
    components:{
        navbar,
    },
    data(){
        return {
            user_info:{},
            notelist:[],
            FormVisible1: false,
            FormVisible2: false,
            errorInfo1: false,
            errorInfo2: false,
            formLabelWidth:'50px',
            user_info : {},
            form1:{
                title:'',
                content:'',
            },
            form2:{
                title:'',
                content:'',
            },
        }
    },
    computed:{
        
    },
    mounted(){
        this.user_info = this.$store.getters.getUser_info;
        this.notelist = JSON.parse(this.user_info.notes);
        if(this.notelist == null) this.notelist = [];
    },
    methods:{
        addNote(){
            for (let index = 0; index < this.notelist.length; index++) {
                    const element = this.notelist[index];
                    if(element.title  == this.form1.title){
                        alert('已经有重复标题');
                        return;
                    }
                }
            var no = new Object();
            no.title = this.form1.title;
            no.content = this.form1.content;
            this.notelist.push(no);
            this.FormVisible1 = false;
            this.form1.title = '';
            this.form1.content = '';
            this.user_info.notes = JSON.stringify(this.notelist);
            this.$store.dispatch('setUser_info',this.user_info);
        },
        editNote(note){
            this.FormVisible2 = true;
            this.form2.title = note.title;
            this.form2.content = note.content;
        },
        editNoteY(){
            for (let index = 0; index < this.notelist.length; index++) {
                    const element = this.notelist[index];
                    if(element.title  == this.form2.title){
                        this.notelist[index].content = this.form2.content;
                        break;
                    }
                }
            this.FormVisible2 = false;
            this.user_info.notes = JSON.stringify(this.notelist);
            this.$store.dispatch('setUser_info',this.user_info);
        },
        deleteNote(note){
            //console.log(note.title)
            for (let index = 0; index < this.notelist.length; index++) {
                    const element = this.notelist[index];
                    if(element.title  == note.title){
                        this.notelist.splice(index,1);
                        break;
                    }
                }
            this.user_info.notes = JSON.stringify(this.notelist);
            this.$store.dispatch('setUser_info',this.user_info);
        },
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
  
  .text {
    font-size: 14px;
  }

  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 480px;
  }
</style>