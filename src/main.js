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
import BoardEditUpdate from './components/boardEditPhoto'
import BoardNoticeDetail from './components/boardNoticeDetail'
import BoardNoticeList from './components/BoardNoticeList'

import ContentTest from './components/contentTest'
import ContentTest1 from './components/contentTest2'
import ContentTest2 from './components/contentTest3'

import adminBoard from './components/adminBoard'
import BoardLists from './components/BoardLists'
import BoardDetails from './components/BoardDetails';

import BoardSetEditor from './components/boardSetEditor'

import ProdDetailType1 from './components/ProdDetailType1';

import TourMain from './components/TourMain';
import TourStep1 from './components/TourStep1';
import TourStep2 from './components/TourStep2';


import VueYoutube from 'vue-youtube'
import CKEditor from '@ckeditor/ckeditor5-vue';


import ShowDetail from './components/showDetail'


// Require Froala Editor js file.
require('froala-editor/js/froala_editor.pkgd.min')

// Require Froala Editor css files.
require('froala-editor/css/froala_editor.pkgd.min.css')
require('font-awesome/css/font-awesome.css')
require('froala-editor/css/froala_style.min.css')

// Import and use Vue Froala lib.
import VueFroala from 'vue-froala-wysiwyg'


Vue.use(VueFroala)




Vue.use(VueYoutube)

Vue.use(CKEditor)

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
        { path: "/TourStep1", name: 'TourPass', component: TourStep1, props:true },
        { path: "/TourStep2", name: 'TourDetail', component: TourStep2, props:true },


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
                { path :'/boards/:readMode', name:'boards', component:BoardLists, props:true},
                { path :'/Detail', name:'boardDetails', component:BoardDetails, props:true }, // 관리자 보드 디테일

                { path :'/SetEditer/:idx', name:'boardsetEdit', component:BoardSetEditor, props:true }, // 관리자 보드 세트 에디터

                { path :'/write', name:'boardsWrite', component:BoardEditor, props:true,
                    children:[
                        { path:'editPhoto/:imgno', name:'EditPhoto',component: BoardEditUpdate, props: true }
                    ]
                },  // 관리자 보드 에디터

                { path :'/editor/:idx', name:'boardsEditor', component:BoardEditor, props:true,
                    children:[
                        { path:'editPhoto/:imgno', name:'EditPhoto',component: BoardEditUpdate, props: true }
                    ]
                },  // 관리자 보드 에디터
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
        { path: "/showDetail", name: 'showDetail', component: ShowDetail, props:true},
        { path: "/test", name: 'test', component: ContentTest },
        { path: "/test1", name:'test1', component: ContentTest1},
        { path: "/test2", name:'test2', component: ContentTest2},

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