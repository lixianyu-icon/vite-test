<template>
	<a-modal 
		v-model:visible="visible"  
		centered
		destroyOnClose 
		:title="modalTitle" 
		@cancel='handleCancel1'
		@ok="handleOk">
		<a-form :label-col="labelCol" :wrapper-col="wrapperCol" labelAlign='right'>
			<a-form-item label="分类名称" required v-bind="validateInfos.cateName">
				<a-input v-model:value="modelRef.cateName" placeholder="请输入分类名称，最多为30个字符" :maxlength="10" allowClear/>
			</a-form-item>
			<a-form-item label="分类描述">
				<a-textarea v-model:value="modelRef.remark" placeholder="请输入分类描述，最多为200个字符" showCount :maxlength="200" allowClear/>
			</a-form-item> 
		</a-form>
		<template #footer>
			<a-button key="back" @click="handleCancel1">返回</a-button>
			<a-button key="submit" type="primary" :loading="loading" @click="handleOk">确认</a-button>
		</template>
	</a-modal>
</template>
<script lang="ts">
import { defineComponent, PropType, computed, ref, reactive, toRaw } from "vue"; 
import { useForm } from '@ant-design-vue/use';
import { titleMap } from '@/config/common'; 
export default defineComponent({
	props: {
		visible: {
			type: Boolean as PropType<boolean>,
			default: false
		},
		mode: {
			type: String as PropType<string>,
			default: 'add'
		}
	},
	setup(props, context) { 
		const modelRef = reactive({
			cateName: '',
			remark: '', 
		}); 
		/** 加载中 */
        const loading = ref(false);  

		const rulesRef = reactive({
			cateName: [
				{
					required: true,
					message: '请输入分类名称',
					trigger: 'blur'
				},
			] 
		});   
		const { validate, validateInfos } = useForm(modelRef, rulesRef);
		const handleOk = () => { 
			validate()
				.then(() => {
					console.log(toRaw(modelRef));
					close();
				})
				.catch(err => {
					console.log('error', err);
				});
		};
		const handleCancel1 = () => {
			close();
		}
		const close = () => {
			context.emit('update:visible', false); 
		}
		const modalTitle = computed(() => { 
			return `${titleMap.get(props.mode)}标签分类`;
		}); 
		return { 
			labelCol: { span: 5 },
      		wrapperCol: { span: 19 },
			loading,
			handleOk,
			modelRef,
			modalTitle,
			handleCancel1,
			validateInfos
		};
	},
});
</script>