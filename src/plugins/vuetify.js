import Vue from 'vue'
import {
    Vuetify,
    VAvatar,
    VBadge,
    VSwitch,
    VDataTable,
    VPagination,
    VTooltip,
    VTabs,
    VDialog,
    VCard,
    VTextarea,
    VImg,
    VChip,
    VCombobox,
    VAlert,
    VMenu,
    VForm,
    VTextField,
    VCarousel,
    VSelect,
    VApp,
    VDivider,
    VNavigationDrawer,
    VRadioGroup,
    VProgressCircular,
    VParallax,
    VJumbotron,
    VResponsive,
    VBreadcrumbs,
    VFooter,
    VList,
    VBtn,
    VIcon,
    VGrid,
    VToolbar,
    VTimeline,
    transitions
} from 'vuetify'
import 'vuetify/src/stylus/app.styl'

Vue.use(Vuetify, {
    components: {
        VApp,
        VAvatar,
        VBadge,
        VSwitch,
        VDataTable,
        VTooltip,
        VTabs,
        VPagination,
        VDialog,
        VCard,
        VTextarea,
        VImg,
        VChip,
        VCombobox,
        VAlert,
        VMenu,
        VForm,
        VTextField,
        VCarousel,
        VSelect,
        VDivider,
        VNavigationDrawer,
        VRadioGroup,
        VProgressCircular,
        VParallax,
        VJumbotron,
        VResponsive,
        VBreadcrumbs,
        VFooter,
        VList,
        VBtn,
        VIcon,
        VGrid,
        VToolbar,
        VTimeline,
        transitions
    },
    theme: {
        primary: '#ee44aa',
        secondary: '#424242',
        accent: '#82B1FF',
        error: '#FF5252',
        info: '#2196F3',
        success: '#4CAF50',
        warning: '#FFC107'
    },
    customProperties: true,
    iconfont: 'md',
})