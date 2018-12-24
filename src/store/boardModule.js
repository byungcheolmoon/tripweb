import Constant from '../Constant';
import CONF from '../Config';
import axios from 'axios';
import store from "./store";
import _ from 'lodash';

import createPersistedState from 'vuex-persistedstate'

export default {
    state: {
        currentview:'',
        currentskin:'',
        isloading : false,
        BoardPage:{ pageno : 1 },
        Boardpcheck: false,
        primcode:null,
        adminBoardListInfo:{
          abListSubCate:'',
          abListLastCate:'',
          currentLastcate:'guam'
        },
        adminBoardInfo: {
            skintype2imgcount:0,
            skintype2imglist:[]
        },

    },
    //plugins: [createPersistedState()],
    mutations: {
        BoardPage (state, payload){
            state.BoardPage.pageno = payload.pageno
        },
        BoardCheck(state, payload){
            state.Boardpcheck = payload.check
        },
        [Constant.CHANGE_ISLOADING] : (state, payload) => {
            state.isloading = payload.isloading;
        },
        [Constant.BOARD_CURRENT_VIEW] : (state, payload) =>{
            state.currentview = payload.view
        },
        [Constant.BOARD_CURRENT_SKIN]:(state, payload) => {
            state.currentskin = payload
        },
        [Constant.PRIM_CODE]:(state, payload) => {
          state.primcode = payload.primcode
        },
        [Constant.BOARD_ADMIN_FETCH_IMGLIST]:(state, payload) => { // 디테일 중에서 이미지
            state.adminBoardInfo.skintype2imglist = payload.imglist
            state.adminBoardInfo.skintype2imgcount = payload.count
        },
        [Constant.BOARD_CATEGORY] : (state, payload) => {
            state.adminBoardListInfo.abListSubCate = payload.cate
            state.adminBoardListInfo.abListLastCate = payload.subcate
        },
        [Constant.BOARD_CATESEARCH] : (state, payload) =>{
            // 여기 책보고 찾아 내야할듯
        },
       [Constant.CHANGE_REGION] : (state, payload)=>{
           state.adminBoardListInfo.currentLastcate = payload.region
       }
    },
    actions: {
        [Constant.CHANGE_ISLOADING] : (store, payload) => {
            store.commit(Constant.CHANGE_ISLOADING, payload);
        },
        [Constant.BOARD_CURRENT_VIEW]: (store, payload) => {
            store.commit(Constant.BOARD_CURRENT_VIEW, payload.view)
        },
        [Constant.BOARD_CURRENT_SKIN]:(store, payload) => {
            store.commit(Constant.BOARD_CURRENT_SKIN, payload.skin)
        },
        [Constant.BOARD_CATEGORY]:(store) =>{
            var data = new FormData();
            data.append('cmd', '2004');
            axios.post(CONF.BOARD_INFO, data)
                .then((response)=>{
                    /*console.log(response.data.catelist)
                    console.log(response.data.subcatelist)*/
                    store.commit(Constant.BOARD_CATEGORY,{ cate:response.data.catelist, subcate:response.data.subcatelist })
                })
        },
        [Constant.BOARD_ADMIN_FETCH_IMGLIST]:(store, payload) => { // 디테일 중에서 이미지
            let idx = payload.idx;
            var data = new FormData();
            if(idx == undefined){
                var idxck = 'no';
            } else {
                var idxck  = idx;
            }
            data.append('cmd', '7001');
            data.append('idx', idxck);
            axios.post(CONF.BOARD_INFO, data)
                .then((response)=>{
                    console.log(response)
                    store.commit(Constant.BOARD_ADMIN_FETCH_IMGLIST,{ imglist:response.data.imglist, count:response.data.img_count })
                })
        }
    },
    getters:{
        lastcateBySelect(state){
            if(state.adminBoardListInfo.currentLastcate == '전체'){
                return state.adminBoardListInfo.abListLastCate;
            } else {
                return state.adminBoardListInfo.abListLastCate.filter( c => c.cate === state.adminBoardListInfo.currentLastcate.code)
            }
        },
        regions(state){
            var temp = state.adminBoardListInfo.abListSubCate.map((c)=>c.cate_kor);
            temp = _.uniq(temp);
            temp.splice(0,0, "전체");
            return temp;
        },
        currentcate(state){
            return state.adminBoardListInfo.currentLastcate
        }
    }
}