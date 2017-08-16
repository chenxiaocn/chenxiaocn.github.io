/**
 * Created by Administrator on 2017/8/14.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import DataDeal from "../datadeal.js";
import Ajax from "../ajax.js";
import API_URL from "../url.js";
import EditTable from "./editTable.js";
import DelTable from "./delTable.js";
import $ from "jquery";
import {Modal,Icon,Table,Button} from "antd";
import './table.less';

var TableContent = React.createClass({
    getInitialState: function () {
        return {
            tableList:[],
            addOrEditModalVisible:false,
            delModalVisible:false,
            selectedId:'',
            selectedDetail:[],
            filteredInfo: null,  ///////表格排序
            sortedInfo: null  ///////表格排序
        }
    },
    componentDidMount: function () {
        this.getTableList();
    },
    getTableList:function(){
        Ajax({
            type: 'GET',
            url: API_URL.table.list,
            //data:{content:content},
            success: function(data) {
                let tableList=data.data.content;
                this.setState({tableList:tableList});
            }.bind(this)
        });
    },
    componentWillReceiveProps:function(nextprops){
    },
    addOrEdit:function(e,index){
        let thisRowIndex=$(e.target).parent().parent().index();
        let thisRecord=(this.state.tableList)[thisRowIndex];
        let selectedId=thisRecord.id;
        this.setState({addOrEditModalVisible:true,selectedId:selectedId,selectedDetail:thisRecord});
    },
    del:function(){
        this.setState({delModalVisible:true});
    },
    handleRefresh:function(){
        this.getTableList();
    },
    cancelModal:function(){
        this.setState({addOrEditModalVisible:false,delModalVisible:false,selectedDetail:[],selectedId:''});
    },
    addTest:function(){
        this.setState({addOrEditModalVisible:true,selectedId:'',selectedDetail:[]});
    },



///////表格排序
handleChange:function(pagination, filters, sorter){
    //console.log('Various parameters', pagination, filters, sorter);
    this.setState({
        filteredInfo: filters,sortedInfo: sorter
    });
},

    render: function () {
        let { sortedInfo, filteredInfo } = this.state;
        sortedInfo = sortedInfo || {};
        filteredInfo = filteredInfo || {};

        let tableList=this.state.tableList; let data= [];
        //表格
        let columns = [
            { title: '用户名', width:70, dataIndex: 'name', key: '0',
                sorter: (a, b) => a.name.length - b.name.length,
                sortOrder: sortedInfo.columnKey === '0' && sortedInfo.order
            },
            { title: '内部用户',width:60,dataIndex: 'innerUser', key: '1',
                sorter: (a, b) => a.innerUser.length - b.innerUser.length,
                sortOrder: sortedInfo.columnKey === '1' && sortedInfo.order
            },
            { title: '真实姓名', width:70,dataIndex: 'realName', key: '2',
                sorter: (a, b) => a.realName.length - b.realName.length,
                sortOrder: sortedInfo.columnKey === '2' && sortedInfo.order
            },
            { title: '创建日期', width:70,dataIndex: 'createDate', key: '3',
                sorter: (a, b) => a.createDate.length - b.createDate.length,
                sortOrder: sortedInfo.columnKey === '3' && sortedInfo.order
            },
            { title: '有效期',  width:70,dataIndex: 'period', key: '4',
                sorter: (a, b) => a.period.length - b.period.length,
                sortOrder: sortedInfo.columnKey === '4' && sortedInfo.order
            },
            { title: '用户分类',  width:100,dataIndex: 'userClass', key: '5',
                sorter: (a, b) => a.userClass.length - b.userClass.length,
                sortOrder: sortedInfo.columnKey === '5' && sortedInfo.order
            },
            { title: '角色',  width:80,dataIndex: 'role', key: '6',
                sorter: (a, b) => a.role.length - b.role.length,
                sortOrder: sortedInfo.columnKey === '6' && sortedInfo.order
            },
            { title: '价格时间',width:50, dataIndex: 'priceDate', key: '7',
                render: () => <a href="javascript:void(0);">设置</a>
            },
            { title: '价格城市', width:50,dataIndex: 'priceCity', key: '8',
                render: () => <a href="javascript:void(0);">设置</a>
            },
            { title: 'Mix权限',width:50, dataIndex: 'MixPerm', key: '9' ,
                render: () => <a href="javascript:void(0);">设置</a>
            },
            { title: 'Mix数据源',width:50, dataIndex: 'MixDataSource', key: '10',
                render: () => <a href="javascript:void(0);">设置</a>
            },
            { title: '页面参数',width:50, dataIndex: 'pagePara', key: '11',
                render: () => <a href="javascript:void(0);">设置</a>
            },
            { title: '装备权限',width:50, dataIndex: 'equipPerm', key: '12',
                render: () => <a href="javascript:void(0);">设置</a>
            },
            { title: '数据源权限',width:50, dataIndex: 'dataSourcePerm', key: '13',
                render: () => <a href="javascript:void(0);">设置</a>
            },
            { title: '细分市场',width:50, dataIndex: 'segmentMarket', key: '14',
                render: () => <a href="javascript:void(0);">设置</a>
            },
            { title: '大区', width:50,dataIndex: 'bigArea', key: '15',
                render: () => <a href="javascript:void(0);">设置</a>
            },
            { title: '本品', width:50,dataIndex: 'zinc', key: '16',
                render: () => <a href="javascript:void(0);">设置</a>
            },
            {title: '',key: 'edit',width: 50,
             render: () => <a href="javascript:void(0);" onClick={this.addOrEdit}>编辑</a>
            },
            {title: '',key: 'del',width: 50,
             render: () => <a href="javascript:void(0);" onClick={this.del}>删除</a>
            }
        ];
        for (let i = 0; i < tableList.length; i++) {
            data.push({
                key: i,
                name:tableList[i].name,
                innerUser:tableList[i].innerUser,
                realName:tableList[i].realName,
                createDate:tableList[i].createDate,
                period:tableList[i].period,
                userClass:tableList[i].userClass,
                role:tableList[i].role
            });
        }

        return (
            <div className="table-list">
                <div onClick={this.addTest}>新增</div>
                {/*列表*/}
                <Table  bordered columns={columns} dataSource={data} onChange={this.handleChange}/>

                {/*编辑或修改*/}
                <EditTable cancelModal={this.cancelModal} refresh={this.handleRefresh} addOrEditModalVisible={this.state.addOrEditModalVisible}
                           selectedId={this.state.selectedId} selectedDetail={this.state.selectedDetail}/>
                {/*删除*/}
                <DelTable cancelModal={this.cancelModal} refresh={this.handleRefresh} delModalVisible={this.state.delModalVisible} selectedId={this.state.selectedId}/>
            </div>
        );
    }
});
export {TableContent as default}