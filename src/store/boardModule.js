import Constant from '../Constant';
import CONF from '../Config';
import axios from 'axios';
import store from "./store";

import createPersistedState from 'vuex-persistedstate'

export default {
    state: {
        currentview:'',
        currentskin:'',
        isloading : false,
        BoardPage:{ pageno : 1 },
        Boardpcheck: false,
        primcode:'',
    },
    //plugins: [createPersistedState()],
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
        },
        [Constant.BOARD_CURRENT_SKIN]:(state, payload) => {
            state.currentskin = payload
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
        }

    },
    getters:{
    }
}