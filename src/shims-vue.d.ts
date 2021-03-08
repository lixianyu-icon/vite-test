/*
 * @description: Cannot find module '@/views/Home.vue' or its corresponding type declarations 解决这个报错问题
 * @Author: lixy
 * @Date: 2021-03-03
 */
declare module '*.vue' {
    import Vue from 'vue';
    export default Vue;
}

declare module "vue/types/vue" {
    interface Vue {
        $http: any;
        $Message: any;
        $Modal: any;
    }
}