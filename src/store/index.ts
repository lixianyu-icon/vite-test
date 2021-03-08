/*
 * @description: 全局状态管理
 * @Author: lixy
 * @Date: 2021-03-02
 */
import { createStore } from "vuex";

export default createStore({
	state() {
		return {
			count: 0,
		};
	},
	mutations: {
		increment(state:any) {
			state.count++;
		},
	},
	actions: {
		increment(context:any) {
			context.commit("increment");
		},
	},
}); 