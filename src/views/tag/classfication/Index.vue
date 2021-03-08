<template> 
    <a-layout-header class="t_table_header">
        <a-form
            layout="inline"
            :model="model">
            <a-form-item label='分类名称'>
                <a-input v-model:value="model.cateName" placeholder="请输入分类名称"></a-input>
            </a-form-item>
            <a-form-item>
                <a-button type="primary" @click="searchTableData">
                    <template #icon><SearchOutlined /></template>
                    查询</a-button>
            </a-form-item>
            <a-form-item style="float:right">
                <a-button type="primary" @click="addItem">
                    <template #icon><PlusOutlined /></template>
                </a-button>
            </a-form-item>
        </a-form>
    </a-layout-header>
    <a-layout-content class="t_table_content"> 
        <div style="height: 100%; overflow: hidden">
            <a-table
                class="ant-table-striped"
                size="small"
                :loading='loading'
                :columns="columns"
                :data-source="tableData" 
                :pagination='false'
                :rowClassName="(record, index) => (index % 2 === 1 ? 'table-striped' : null)"
                :scroll="{ x: 1500, y: tableHeight }">
                <template #action='{ record }'>
                    <a-button type="link" size="small" @click="deleteItem(record)">
                        <DeleteTwoTone twoToneColor="#ff0000"/>
                    </a-button>
                </template>
            </a-table> 
        </div>
        <div class="t_pagination">
            <a-pagination 
            show-quick-jumper 
            show-size-changer
            :page-size="pageSize"
            :page-size-options="pageSizeOptions" 
            v-model:current="currentPage" 
            :total="500" 
            @showSizeChange='onShowSizeChange'
            @change="onCurrentPageChange" /> 
        </div>
    </a-layout-content>
    <Edit v-model:visible="visible" v-if="visible" :mode='mode' />
</template>
<script lang='ts'>
import { defineComponent, onMounted, ref, Ref, createVNode } from 'vue';
import { SearchOutlined, DeleteTwoTone, ExclamationCircleOutlined, PlusOutlined } from "@ant-design/icons-vue";
import { pageSizeOptions } from '@/config/common';
import { Modal, message } from 'ant-design-vue';
import Edit from './Edit.vue';
const columns = [
    { title: 'Full Name', width: 100, dataIndex: 'name', key: 'name', fixed: 'left' },
    { title: 'Age', width: 100, dataIndex: 'age', key: 'age', fixed: 'left' },
    { title: 'Column 1', dataIndex: 'address', key: '1', width: 150 },
    { title: 'Column 2', dataIndex: 'address', key: '2', width: 150 },
    { title: 'Column 3', dataIndex: 'address', key: '3', width: 150 },
    { title: 'Column 4', dataIndex: 'address', key: '4', width: 150 },
    { title: 'Column 5', dataIndex: 'address', key: '5', width: 150 },
    { title: 'Column 6', dataIndex: 'address', key: '6', width: 150 },
    { title: 'Column 7', dataIndex: 'address', key: '7', width: 150 },
    { title: 'Column 8', dataIndex: 'address', key: '8' },
    { title: 'Action', key: 'operation', fixed: 'right', width: 100, slots: { customRender: 'action' }},
];
interface DataItem {
    key: number;
    name: string;
    age: number;
    address: string;
}
interface Model {
    cateName: string;
}

export default defineComponent({
    components: { SearchOutlined, DeleteTwoTone, PlusOutlined, Edit },
    setup() {
        /** 控制添加弹框 */
        const visible = ref(false);
        /** 弹框模式 */
        const mode = ref('add');

        /** 加载中 */
        const loading = ref(false); 

        /** 搜索条件 */ 
        const model: Ref<Model> = ref({
            cateName: '',
        });

        /** 表格数据 */
        const tableData = ref([]);
        /** 当前页码 */
        const currentPage = ref(1);
        /** 每页数量 */
        const pageSize = ref(10);

        /** 修改每页数量 */
        const onShowSizeChange = (current: number, size: number) => {
            // 每页数量不变时不用做处理
            if(pageSize.value === size){
                return false;
            }
            pageSize.value = size;
            // 页码重置为1
            currentPage.value = 1;
            getTableData();
        }  
        /** 页码切换 */
        const onCurrentPageChange = (page: number, size: number) => {
            getTableData();
        }

        /** 删除表格中数据 */
        const deleteItem = (record: any) => {
            Modal.confirm({
                title: '删除告警',
                icon: createVNode(ExclamationCircleOutlined),
                content: '是否确认删除该条数据？',
                okText: '确认',
                cancelText: '取消',
                centered: true,
                onOk() {
                    tableData.value = tableData.value.filter(item => item.key !== record.key);
                },
                onCancel() {
                    message.info('已取消删除操作');
                }
            });
        }

        /** 添加表格数据 */
        const addItem = () => {
            mode.value = 'add';
            visible.value = true;
        }

        /** 获取表格数据 */
        const getTableData = () => {
            loading.value = true;
            setTimeout(()=>{
                const tempTableData: DataItem[] = [];
                const base = pageSize.value * (currentPage.value - 1);
                const cateName = model.value.cateName || '测试';
                for (let i = 0; i < pageSize.value; i++) {
                    tempTableData.push({
                        key: base + i,
                        name: `${cateName} ${base + i}`,
                        age: 322,
                        address: `London Park no. ${base + i}`,
                    });
                }
                tableData.value = tempTableData;
                loading.value = false;
            }, 1000);
        }
        /** 点击按条件查询表格数据 */
        const searchTableData = () => {
            getTableData();
        } 
        onMounted(()=> {
            getTableData();
        });
        return {
            mode,
            model,
            visible,
            loading,
            columns,
            tableData,
            pageSize,
            currentPage,
            getTableData,
            deleteItem,
            addItem,
            searchTableData,
            pageSizeOptions,
            onShowSizeChange,
            onCurrentPageChange,
            tableHeight: document.body.clientHeight - 240,
        }
    }
})
</script>