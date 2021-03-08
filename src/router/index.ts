/*
 * @description: 路由
 * @Author: lixy
 * @Date: 2021-03-02
 */
import { createRouter, createWebHistory } from "vue-router";

const routes = [
	{
		path: "/",
		name: "Home",
		component: () => import("@/views/Home.vue"),
	},
	{
		path: "/tag",
		name: "tag",
		redirect: { name: 'tag_classfication' },
		component: () => import("@/views/tag/Index.vue"),
		children: [
			{
				path: "manage",
				name: "tag_manage",
				component: () => import("@/views/tag/manage/Index.vue"),
			},
			{
				path: "classfication",
				name: "tag_classfication",
				component: () => import("@/views/tag/classfication/Index.vue"),
			}
		]
	},
];

export default createRouter({
	history: createWebHistory(),
	routes,
}); 