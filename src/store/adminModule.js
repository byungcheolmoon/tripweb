import Constant from '../Constant';
import CONF from '../Config';
import axios from 'axios';
import store from "./store";
import eventBus from "../EventBus"
import createPersistedState from 'vuex-persistedstate'

export default {
    state: {
        isloading : false,
        prodMode: {mode:''},
        prodContactInfo:{ totalpage : '', pageno: '' },
        prodContactImg:{prod_img:''},
        prodContacts:[],
        prodFetchOne:[],
        prodContactsDetail:[],
        prodContactDetailImgs:[]

    },
    plugins: [createPersistedState()],
    mutations: {
        [Constant.PRODUCT_CONTACTS]: (state, payload)=>{
            state.prodContacts = payload.data.info
            state.prodContactInfo.totalpage = payload.data.totalpage
        },
        [Constant.PRODUCT_CONTACT_FETCH_ONE]:(state, payload)=>{

            if(payload.no == 'add'){
                eventBus.$emit('idx-check' , payload.data.idx)
                state.prodFetchOne = payload.data;
                state.prodContactImg = payload.data.prod_img;
            } else {
                var index = state.prodContacts.findIndex((item) => item.idx === payload.no);
                eventBus.$emit('idx-check' , payload.no)

                state.prodFetchOne = state.prodContacts[index];
                state.prodContactImg = state.prodContacts[index].prod_img
            }
        },
        prodListPage (state, payload){
            state.prodContactInfo.pageno = payload.pageno
        },
        prodModeUpdate (state, payload){
          state.prodMode = payload.mode
        },
        [Constant.PRODUCT_EDIT]: (state, payload) => {
            var index = state.prodContacts.findIndex((item) => item.idx === payload.data.contacts.idx);
            state.prodContacts[index].prod_fishtype  = payload.data.contacts.types
            state.prodContacts[index].prod_name       = payload.data.contacts.title
            state.prodContacts[index].prod_paytext   = payload.data.contacts.price
            if(payload.data.contacts.img_name){
                state.prodContacts[index].prod_img   = payload.data.contacts.img_name
                state.prodContactImg = payload.data.contacts.img_name

            }
            alert('타이틀 부분 수정완료 STEP2도 수정해주세요! 할게있으면..')
        },
        [Constant.PRODUCT_CONTACT_FETCH_DETAIL]: (state, payload) => {
            state.prodContactsDetail = payload.data.contacts
            state.prodContactDetailImgs = payload.data.imglist
        },
        [Constant.UPDATE_PHOTO]:(state, payload) => {
            state.prodContactDetailImgs[payload.img_key] = payload.img_name;
        },
        [Constant.PRODUCT_CONTACT_FETCH_DETAIL_EDIT] : (state, payload) =>{
            state.prodContactsDetail.idx = payload.idx
            state.prodContactsDetail.title = payload.title
            state.prodContactsDetail.content = payload.content
            state.prodContactsDetail.set1 = payload.set1
            state.prodContactsDetail.set2 = payload.set2
            state.prodContactsDetail.url = payload.url

            alert('변경완료')
        },
        [Constant.PRODUCT_DEL]:(state, payload) =>{
            var index = state.prodContacts.findIndex((item) => item.idx === payload.idx);
            state.prodContacts.splice(index,1)
            alert('삭제완료')
        },
        [Constant.CHANGE_ISLOADING] : (state, payload) => {
            state.isloading = payload.isloading;
        }
    },
    actions: {
        [Constant.PRODUCT_CONTACTS]: (store) => {
            store.dispatch(Constant.CHANGE_ISLOADING, {isloading:true})
            var Params = new URLSearchParams();
            Params.append('cmd', '2000');
            Params.append('select_type', 'fetchs');

            axios.post(CONF.PRODUCT_INFO, Params)
                .then((response)=>{
                    store.dispatch(Constant.CHANGE_ISLOADING, {isloading:false })
                    store.commit(Constant.PRODUCT_CONTACTS,{ data : response.data})

                })
        },
        [Constant.PRODUCT_CONTACT_FETCH_ONE] : (store, payload) => {
            store.commit(Constant.PRODUCT_CONTACT_FETCH_ONE,{ no : payload.no})
        },
        [Constant.PRODUCT_EDIT] : (store, payload) => {

            var data = new FormData();
            data.append('cmd', '3001');
            data.append('uploadedfile', payload.file);
            data.append('title', payload.title);
            data.append('price', payload.price);
            data.append('types', payload.types);
            data.append('idx', payload.idx);

            axios.post(CONF.PRODUCT_EDIT, data)
                .then((response)=>{
                    store.commit(Constant.PRODUCT_EDIT,{ data: response.data })
                })

        },
        [Constant.PRODUCT_CONTACT_FETCH_DETAIL]: (store, payload) => {

            var data = new FormData();
            data.append('cmd', '3002');
            data.append('idx', payload.no);
            axios.post(CONF.PRODUCT_EDIT, data)
                .then((response)=>{
                    store.commit(Constant.PRODUCT_CONTACT_FETCH_DETAIL,{data:response.data});
                })
        },
        [Constant.UPDATE_PHOTO]:(store, payload) =>{
            var data = new FormData();
            data.append('cmd', '3003');
            data.append('uploadedfile', payload.file);
            data.append('idx', payload.idx);
            data.append('imgnum', payload.img_num);
            var img_key = "img_" + payload.img_num;

            axios.post(CONF.PRODUCT_EDIT, data)
                .then((response)=>{
                    store.commit(Constant.UPDATE_PHOTO,{ img_name: response.data.img_name, img_key: img_key})
                })
        },
        [Constant.UPDATE_PHOTO_DEL]: (store, payload) => {
            var data = new FormData();
            data.append('cmd', '3004');
            data.append('idx', payload.idx);
            data.append('imgnum', payload.img_num);
            var img_key = "img_" + payload.img_num;

            axios.post(CONF.PRODUCT_EDIT, data)
                .then((response)=>{
                    store.commit(Constant.UPDATE_PHOTO,{ img_name: "none", img_key: img_key})
                })
        },
        [Constant.PRODUCT_CONTACT_FETCH_DETAIL_EDIT]: (store, payload) => {
            // 디테일 텍스트 수정

            var data = new FormData();
            data.append('cmd', '3005');
            data.append('idx', payload.idx);
            data.append('title', payload.title);
            data.append('content', payload.content);
            data.append('set1', payload.set1);
            data.append('set2', payload.set2);
            data.append('url', payload.url);
            axios.post(CONF.PRODUCT_EDIT, data)
                .then((response)=>{
                    store.commit(Constant.PRODUCT_CONTACT_FETCH_DETAIL_EDIT,
                        {
                            idx:payload.idx,
                            title: payload.title,
                            content: payload.content,
                            set1: payload.set1,
                            set2: payload.set2,
                            url: payload.url
                        })
                })
        },
        [Constant.PRODUCT_ADD]:(store, payload) => {
            // 스텝1 새글 작성
            var data = new FormData();
            data.append('cmd', '4000');
            data.append('uploadedfile', payload.file);
            data.append('title', payload.title);
            data.append('price', payload.price);
            data.append('types', payload.types);

            axios.post(CONF.PRODUCT_EDIT, data)
                .then((response)=>{
                    store.commit(Constant.PRODUCT_CONTACT_FETCH_ONE,{ no : 'add', data: response.data.contacts})
                })

        },
        [Constant.PRODUCT_DEL]: (store, payload) =>{

            var data = new FormData();
            data.append('cmd', '5000');
            data.append('idx', payload.idx)

            axios.post(CONF.PRODUCT_EDIT, data)
                .then(()=>{
                    store.commit(Constant.PRODUCT_DEL, { idx :payload.idx })
                })

        },
        [Constant.CHANGE_ISLOADING] : (store, payload) => {
            store.commit(Constant.CHANGE_ISLOADING, payload);
        },
    },
    getters:{
    }
}