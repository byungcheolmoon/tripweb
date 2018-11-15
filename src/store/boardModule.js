import Constant from '../Constant';
import CONF from '../Config';
import axios from 'axios';
import store from "./store";

import createPersistedState from 'vuex-persistedstate'

export default {
    state: {
        currentview:'',
        isloading : false,
        BoardPage:{ pageno : 1 },
        Boardpcheck: false
    },
    plugins: [createPersistedState()],
    mutations: {
        BoardPage (state, payload){

            state.BoardPage.pageno = payload.pageno
        },
        BaordCheck(state, payload){
            state.Boardpcheck = payload.check
        },
        [Constant.CHANGE_ISLOADING] : (state, payload) => {
            state.isloading = payload.isloading;
        },
        [Constant.BOARD_CURRENT_VIEW] : (state, payload) =>{
            state.currentview = payload.view
        }
    },
    actions: {
        [Constant.CHANGE_ISLOADING] : (store, payload) => {
            store.commit(Constant.CHANGE_ISLOADING, payload);
        },
        [Constant.BOARD_CURRENT_VIEW]: (store, payload) => {
            store.commit(Constant.BOARD_CURRENT_VIEW, payload.view)
        }
    },
    getters:{
    }
}