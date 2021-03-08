<template>
	<a-layout class="t_page_container">
		<a-layout-sider v-model:collapsed="collapsed" theme="light" collapsible>
			<Logo :show-title="!collapsed" title='系统管理'/>
			<a-menu v-model:selectedKeys="selectedKeys" mode="inline">
				<a-menu-item v-for="item in menu" :key='item.key' @click="switchRoute">
					<component :is="item.icon"></component> 
					<span>{{item.name}}</span>
				</a-menu-item>
				<!-- <a-menu-item key="2">
					<desktop-outlined />
					<span>标签分类</span>
				</a-menu-item> -->
				<!-- <a-sub-menu key="sub1">
					<template #title>
						<user-outlined />
						<span>User</span>
					</template>
					<a-menu-item key="3">Tom</a-menu-item>
					<a-menu-item key="4">Bill</a-menu-item>
					<a-menu-item key="5">Alex</a-menu-item>
				</a-sub-menu> -->
			</a-menu>
		</a-layout-sider>
		<a-layout style="padding: 15px">
			<router-view/>
		</a-layout>
	</a-layout>
</template>
<script>
import Logo from "@/components/Logo.vue";
import {
  // menu
  PieChartOutlined,
  DesktopOutlined,
  UserOutlined,
  TeamOutlined,
  FileOutlined,
  // header
  HomeFilled,
  SettingFilled,
} from "@ant-design/icons-vue";
export default {  
	components: {
		Logo,
		// icons
		PieChartOutlined,
		DesktopOutlined,
		UserOutlined,
		TeamOutlined,
		FileOutlined,
		HomeFilled,
		SettingFilled,
	},
	data() {
		this.menu = [
			// {
			// 	key: 'tag_manage',
			// 	name: '标签管理',
			// 	icon: 'pie-chart-outlined',
			// 	pathname: 'tag_manage',
			// },
			{
				key: 'tag_classfication',
				name: '标签分类',
				icon: 'desktop-outlined',
				pathname: 'tag_classfication',
			}
		];
		return {
			collapsed: false,
			selectedKeys: ["tag_manage"],
		};
	},
	methods: {
		switchRoute({ item, key, keyPath }){ 
			this.$router.replace({name: keyPath[0]}); 
		}
	}
};
</script>