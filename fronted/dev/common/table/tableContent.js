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
import {Modal,Icon,Table} from "antd";
import './table.less';

var TableContent = React.createClass({
    getInitialState: function () {
        return {
            tableList:[],
            addOrEditModalVisible:false,
            delModalVisible:false,
            selectedId:'',
            selectedDetail:[]
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
    render: function () {
        let tableList=this.state.tableList;
        //表格
        let columns = [
            { title: '用户名', width:70, dataIndex: 'name', key: '0'},
            { title: '内部用户',width:60,dataIndex: 'innerUser', key: '1'},
            { title: '真实姓名', width:70,dataIndex: 'realName', key: '2' },
            { title: '创建日期', width:70,dataIndex: 'createDate', key: '3'},
            { title: '有效期',  width:70,dataIndex: 'period', key: '4'},
            { title: '用户分类',  width:100,dataIndex: 'userClass', key: '5'},
            { title: '角色',  width:80,dataIndex: 'role', key: '6'},
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

        let data = [];
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
                <Table  bordered columns={columns} dataSource={data}/>
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