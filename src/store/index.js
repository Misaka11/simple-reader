/*<!--
2019/1/1
create by Misaka11
全局变量所在地
-->*/
import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
    name: 'store',
    state:{
        novel:{},
        chapters:{},
        chapter:{},
        user_info:{},
    },
    getters: {
        getNovel(state){
            //if(state.novel = {})
            state.novel = JSON.parse(sessionStorage.getItem('novel'));
            return state.novel;
        },
        getChapters(state){
            //if(!state.chapters)
            state.chapters = JSON.parse(sessionStorage.getItem('chapters'));
            return state.chapters;
        },
        getChapter(state){
            //if(!state.chapter)
            state.chapter = JSON.parse(sessionStorage.getItem('chapter'));
            return state.chapter;
        },
        getUser_info(state){
            //if(!state.user_info)
            state.user_info = JSON.parse(sessionStorage.getItem('user_info'));
            return state.user_info;
        }
    },
    mutations: {
        no(state,novel){
            sessionStorage.setItem('novel',JSON.stringify(novel));
            state.novel = novel;
        },
        chs(state,chapters){
            sessionStorage.setItem('chapters',JSON.stringify(chapters));
            state.chapters=chapters;
        },
        ch(state,chapter){
            sessionStorage.setItem('chapter',JSON.stringify(chapter));
            state.chapter=chapter;
        },
        us(state,user_info){
            sessionStorage.setItem('user_info',JSON.stringify(user_info));
            state.user_info = user_info;
        },
        siou(state){
            sessionStorage.removeItem('user_info');
            state.user_info = {};
        }
    },
    actions:{
        setNovel(context,novel){
            context.commit('no',novel);
        },
        setChapters(context,chapters){
            context.commit('chs',chapters);
        },
        setChapter(context,chapter){
            context.commit('ch',chapter);
        },
        setUser_info(context,user_info){
            context.commit('us',user_info);
        },
        setLogout(context){
            context.commit('siou');
        },
    }
})
export default store;