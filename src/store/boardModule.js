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
          currentLastcate:'all'
        },
        adminBoardInfo: {
            abWriteMode:null,
            skintype2imgcount:0,
            skintype2imglist:[]
        },
        adminBoardSetResult:false,
        adminBoardSetEditInfo:{
            levelcheck:'',
            abseTitle:'',
            abseSubTitle:'',
            abseCate1:{},
            abseCate2:{},
            abseCate3:{},
            abseImg:'',
            abseTlevel:[],
            abseMlevel:[],
            abseBlevel:[]
        },
        adminBoardSetCate:{
            tlevel:[],
            mlevel:[],
            blevel:[],
        },
        adminBoardTemp:{
            topInfo:{
                tTitle:'',
                tVideo:'',
                tImgCount:0,
                tImgList:[]
            },
            middleInfo:{
                mTitle:'',
                mContent:''
            },
            bottomInfo:{
                bTitle:'',
                bContent:''
            }
        }

    },
    //plugins: [createPersistedState()],
    mutations: {
        BoardPage (state, payload){
            state.BoardPage.pageno = payload.pageno
        },
        adBoardMode (state, payload){
            state.adminBoardInfo.abWriteMode = payload.mode
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
       },
        addImageCount(state, payload){
            state.adminBoardInfo.skintype2imgcount = payload.count
        },
        [Constant.BOARD_SETCATEGORY]:(state, payload)=>{
            state.adminBoardSetCate.tlevel = payload.tlevel
            state.adminBoardSetCate.mlevel = payload.mlevel
            state.adminBoardSetCate.blevel = payload.blevel
        },
        [Constant.BOARD_SETSAVE]:(state)=>{
            state.adminBoardSetResult  = !state.adminBoardSetResult;
        },
        [Constant.BOARD_SETEDITINFO]:(state, payload)=>{
            state.adminBoardSetEditInfo.levelcheck      = payload.idx;
            state.adminBoardSetEditInfo.abseCate1       = payload.info.cate1;
            state.adminBoardSetEditInfo.abseCate2       = payload.info.cate2;
            state.adminBoardSetEditInfo.abseCate3       = payload.info.cate3;
            state.adminBoardSetEditInfo.abseTitle       = payload.info.title;
            state.adminBoardSetEditInfo.abseSubTitle    = payload.info.subtitle;
            state.adminBoardSetEditInfo.abseImg          = payload.info.img;
            state.adminBoardSetEditInfo.abseTlevel      = payload.info.tlevel;
            state.adminBoardSetEditInfo.abseMlevel      = payload.info.mlevel;
            state.adminBoardSetEditInfo.abseBlevel      = payload.info.blevel;
        },
        [Constant.BOARD_SETVSHOW]:(state, payload)=>{
            state.adminBoardTemp.topInfo.tTitle     = payload.tinfo.title
            state.adminBoardTemp.topInfo.tVideo     = payload.tinfo.videoid
            state.adminBoardTemp.topInfo.tImgCount  = payload.tinfo.img_count
            state.adminBoardTemp.topInfo.tImgList   = payload.tinfo.imglist

            state.adminBoardTemp.middleInfo.mTitle = payload.minfo.board_title
            state.adminBoardTemp.middleInfo.mContent = payload.minfo.board_content

            state.adminBoardTemp.bottomInfo.bTitle = payload.binfo.board_title
            state.adminBoardTemp.bottomInfo.bContent = payload.binfo.board_content
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
                    //console.log(response)
                    store.commit(Constant.BOARD_ADMIN_FETCH_IMGLIST,{ imglist:response.data.imglist, count:response.data.img_count })
                })
        },
        [Constant.UPDATE_PHOTO]:(store,payload)=>{// 이미지 수정에서 이미지 하나씩 업로드 하는거

            var data = new FormData();

            data.append('cmd', '3003');
            data.append('idx', payload.idx);
            data.append('img_num', payload.img_num);
            data.append('file', payload.file);

            axios.post(CONF.BOARD_INFO, data)
                .then((response)=>{
                    //store.commit(Constant.BOARD_ADMIN_FETCH_IMGLIST,{ imglist:response.data.imglist, count:response.data.img_count })
                })
        },
        [Constant.BOARD_SETCATEGORY]:(store,payload)=>{
            var data = new FormData();
            data.append('cmd', '4000');
            data.append('step1', payload.step1.abbr);
            data.append('step2', payload.step2.abbr);
            data.append('step3', payload.step3.abbr);

            axios.post(CONF.BOARD_INFO, data)
                .then((response)=>{
                    store.commit(Constant.BOARD_SETCATEGORY,
                        {
                            tlevel:response.data.tlevel,
                            mlevel:response.data.mlevel,
                            blevel:response.data.blevel
                        })
                })
        },
        [Constant.BOARD_SETSAVE]:(store,payload)=>{
            var data = new FormData();
            data.append('cmd', payload.cmd);
            data.append('idx', payload.idx);
            data.append('step1', payload.step1);
            data.append('step2', payload.step2);
            data.append('step3', payload.step3);

            data.append('title', payload.title);
            data.append('subtitle', payload.subtitle);
            data.append('file', payload.file);
            data.append('tlevel', payload.tlevel);
            data.append('mlevel', payload.mlevel);
            data.append('blevel', payload.blevel);

            axios.post(CONF.BOARD_INFO, data)
                .then((response)=>{
                    if(response.data == "200"){
                        store.commit(Constant.BOARD_SETSAVE)
                    } else {
                        alert('문제가 발생 관리자에게 문의 요망')
                    }
                })
        },
        [Constant.BOARD_SETEDITINFO]:(store,payload)=>{
            var data = new FormData();
            data.append('cmd', '4002');
            data.append('idx', payload.idx);
            axios.post(CONF.BOARD_INFO, data)
                .then((response)=>{
                    store.commit(Constant.BOARD_SETEDITINFO,
                        {
                            idx:payload.idx,
                            info:response.data
                        })
                })
        },
        [Constant.BOARD_SETVSHOW] : (store, payload)=>{
            var data = new FormData();
            data.append('cmd', '4021');
            data.append('tidx', payload.tidx);
            data.append('midx', payload.midx);
            data.append('bidx', payload.bidx);
            axios.post(CONF.BOARD_INFO, data)
                .then((response)=>{
                    //console.log(response.data[0]);
                    store.commit(Constant.BOARD_SETVSHOW,
                        {
                            tinfo:response.data[0],
                            minfo:response.data[1].minfo,
                            binfo:response.data[2].binfo
                        })
                })
        },
    },
    getters:{
        lastcateBySelect(state){
            if(state.adminBoardListInfo.currentLastcate == 'all'){
                return state.adminBoardListInfo.abListLastCate
            } else {
                return state.adminBoardListInfo.abListLastCate.filter( c => c.cate === state.adminBoardListInfo.currentLastcate.code)
            }
        },
       /* regions(state){
            var temp = state.adminBoardListInfo.abListSubCate.map((c)=>c.cate_kor);
            temp = _.uniq(temp);
            temp.splice(0,0, "전체");
            return temp;
        },
        currentcate(state){
            return state.adminBoardListInfo.currentLastcate
        }*/
    }
}