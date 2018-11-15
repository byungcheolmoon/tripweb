import Vue from 'vue';
import Vuex from 'vuex';
import Constant from '../Constant';
import axios from 'axios';
import CONF from '../Config';
import firebase from 'firebase';
import adminModule from './adminModule.js';
import boardModule from './boardModule.js';
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex);


const store = new Vuex.Store({
    mode: history,
    state: {
        memberlogin: { check: false, id: '', snstype:'' },
        memberinfo: [],
        memberitems: [],
        error: null,
        content:'',
    },
    plugins: [createPersistedState()],
    mutations: {
        [Constant.MEMBER_INFO]: (state, payload) => {
            state.memberlogin.check     = payload.check;
            state.memberlogin.id         = payload.userid;
            state.memberlogin.snstype   = payload.snstype;
            state.memberinfo             = payload;
            // state.memberinfo = payload

        },
        [Constant.TOPNAV_MENU]: (state, payload) => {
            if (payload.id == true) {
                state.memberitems = ['로그아웃', '개인정보', '장바구니'];
            } else {
                state.memberitems = ['회원가입/로그인'];
                state.memberlogin.check = false;
            }
        },
        setError (state, payload) {
            state.error = payload
        },
        resetUsername(state){
            state.memberinfo = [];
        },
        setUserNick(state, payload) {
                store._vm.$session.start();
                store._vm.$session.set("id", payload.userid);
                store._vm.$session.set("nickname", payload.nickname);
                store._vm.$session.set("snstype", payload.snstype);
                return true;
        }
    },
    actions: {
        [Constant.MEMBER_INFO]: (store, payload) => {

            var Params = new URLSearchParams();
            Params.append('cmd', '1000');
            Params.append('snsid', payload.userid);
            if(payload.usernickname != null){
                Params.append('usernick', payload.usernickname);
            }
            Params.append('snstype', payload.snstype);

            axios.post(CONF.MEMBER_INFO, Params)
                .then((response)=>{
                    if(response.data.result == "200"){
                        store.commit(Constant.MEMBER_INFO,
                            {
                                userid: payload.userid,
                                check: true,
                                nickname: response.data.info.nickname,
                                snstype: payload.snstype
                            })
                    } else {
                      alert('로그인에 실패하였습니다. 관리자에 문의하세요. store')
                    }
                })
        },
        weblogin({commit}, payload){
            store.commit(Constant.MEMBER_INFO,
                {
                    userid: payload.parm.userid,
                    check: true,
                    nickname: payload.parm.userid,
                    snstype: 'web'
                })
        },
        [Constant.TOPNAV_MENU]: (store, payload) => {
            store.commit(Constant.TOPNAV_MENU, { id: payload.id })
        },
        [Constant.MEMBER_LOGOUT_KAKAO]: (store, payload)=>{
            console.log(payload.id + 'kakao');
        },
        resetPasswordWithEmail ({ commit }, payload) {
            const { email } = payload
            // commit('setLoading', true)
            firebase.auth().sendPasswordResetEmail(email)
                .then(
                    () => {
                        // commit('setLoading', false)
                        console.log('Email Sent')
                    }
                )
                .catch(
                    error => {
                        // commit('setLoading', false)
                        commit('setError', error)
                        console.log(error)
                    }
                )
        },
        resetUsername({commit}){
            commit('resetUsername');
        },


    },
    getters: {
        error (state) {
            return state.error
        },
        getUsernick(){
            return store._vm.$session.get('nickname');
        }
    },
    modules: {
        admin: adminModule,
        board: boardModule
    }
})

export default store;