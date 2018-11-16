//import '@babel/polyfill'
import 'babel-polyfill'
import Vue from 'vue'
import './plugins/vuetify'
import Vuetify from 'vuetify'
import App from './App.vue'
import store from './store/store.js'
import VueRouter from 'vue-router';
import ES6Promise from 'es6-promise';
import axios from 'axios';
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css'
import 'font-awesome/css/font-awesome.min.css'
import '@fortawesome/fontawesome-free/css/all.css'
import mainContent from './components/mainContent.vue'
import TourMain from './components/TourMain.vue';
import VueSession from 'vue-session'
import loginPage from './components/loginPage.vue';
import Constant from './Constant';
import adminIndex from './components/adminIndex';
import adminProdList from './components/adminProdList';
import adminProdDetail from './components/adminProdDetail';
import adminVideoList from './components/adminVideoList';
import adminProdDetailStep1 from './components/adminProdDetailStep1'
import adminProdDetailStep2 from './components/adminProdDetailStep2'
import UpdatePhoto from './components/UpdatePhoto'
import adminProdWriteController from './components/adminProdWriteController'
import firebase from 'firebase';
import VueVideoPlayer from 'vue-video-player'
import BoardList from  './components/boards'
import 'video.js/dist/video-js.css'
import 'expose-loader?$!expose-loader?jQuery!jquery'
import 'vueditor/dist/style/vueditor.min.css'
import BoardDecs from './components/boardDescription'
import BoardEditor from './components/boardEditor'
import BoardNoticeDetail from './components/boardNoticeDetail'
import BoardNoticeList from './components/BoardNoticeList'

import ContentTest from './components/contentTest'
import adminBoard from './components/adminBoard'
import BoardLists from './components/BoardLists'
import BoardDetails from './components/BoardDetails';

import ProdDetailType1 from './components/ProdDetailType1';

Vue.use(VueVideoPlayer, /* {
  options: global default options,
  events: global videojs events
} */)
Vue.use(Vuetify, {
    iconfont: 'fa'
})
var config = {
    apiKey: Constant.FIRE_KEY,
    authDomain: Constant.FIRE_DOMAIN,
    databaseURL: Constant.FIRE_DATABASE,
    storageBucket: Constant.FIRE_SBUCKET,
}
firebase.initializeApp(config)

ES6Promise.polyfill()
Vue.prototype.$axios = axios;
Vue.prototype.$http = axios;
Vue.config.productionTip = false
Vue.use(VueSession, { presist: true })
Vue.use(VueRouter);


const router = new VueRouter({
    mode: 'history',
    routes: [
        { path: "/", name: 'index', redirect: '/maincontent' },

        {
            path: "/maincontent",
            name: 'main',
            component: mainContent
        },

        { path: "/TourMain", name: 'TourMain', component: TourMain },
        { path: "/login", name: 'login', component: loginPage, props: true},
        { path: "/adminIndex", name: 'adminIndex', component: adminIndex },
        { path: "/adminProdList" , name: 'adminProduct', component: adminProdList },

        { path: "/adminProdWrite" , name: 'adminprodwritecontroller', component: adminProdWriteController, props: true,
            children:[
                { path: 'writeStep1', name: 'writestep1', component: adminProdDetailStep1, props: true },
                { path: 'writeStep2', name: 'writestep2', component: adminProdDetailStep2, props: true,
                    children:[
                        { path:'addPhoto/:imgno', name:'addUpdatePhoto',component: UpdatePhoto, props: true }
                    ]
                },
            ]
        },

        { path: "/adminProdDetail" , name: 'adminProdDetail', component: adminProdDetail, props: true,
            children:[
                { path: 'TitleEdit/:no', name: 'titleedit', component: adminProdDetailStep1, props: true },
                { path: 'DetailEdit/:no', name: 'detailedit', component: adminProdDetailStep2, props: true,
                    children:[
                        { path:'photo/:imgno', name:'updatephoto',component: UpdatePhoto, props: true }
                    ]
                },
            ]
        },
        { path: "/adminVideoList" , name: 'adminVideo', component: adminVideoList,
            children:[
                { path: 'add', name: 'add', component: adminVideoList },
            ]
        },

        { path: "/adminBoard" , name: 'adminBoard', component: adminBoard,
            children:[
                /*{ path :'/boardto', name:'boards', component:BoardLists, props:true},*/
                /*{ path :'/boardto1', name:'boards1', component:BoardLists, props:true},*/
                { path :'/boards', name:'boards', component:BoardLists, props:true},
                { path :'/Detail', name:'boardDetails', component:BoardDetails, props:true },
                { path :'/editor', name:'boardsEditor', component:BoardEditor, props:true },
            ]
        },

        { path: "/board" , name: 'board', component: BoardList, props:true,
            children:[
                { path :'/description', name:'description', component:BoardDecs,
                    children:
                        [
                            { path :'/list', name:'boardNoticeList', component:BoardNoticeList},
                            { path :'/write', name:'write', component:BoardEditor },
                            { path :'boardDetail', name: 'boardDetail', component: BoardNoticeDetail, props:true }
                        ]

                },

            ]
        },

        { path: "/test", name: 'test', component: ContentTest },
        { path: "/ProdDetail", name:'PrDetail', component:ProdDetailType1, props:true }


        // {
        //     path: "/membermanager",
        //     name: 'member',
        //     component: MemberManager,
        //         children: [
        //             { path: 'add', name: 'noticeform', component: AutoNoticeForm },
        //             { path: 'update/:no', name: "noticeupdate", component: AutoNoticeForm, props: true }
        //         ]
        // }


    ]
});


new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')