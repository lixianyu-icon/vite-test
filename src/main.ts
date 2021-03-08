/*
 * @description: main.ts
 * @Author: lixy
 * @Date: 2021-03-02
 */
import { createApp } from 'vue';
import router from "./router";
import store from "./store";
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';

import App from './App.vue';
import './style/main/index.less';
import './style/main/table.less';
import './style/main/ant_reset.less';

createApp(App).use(router).use(store).use(Antd).mount("#app"); 