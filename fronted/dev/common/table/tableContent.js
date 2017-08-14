/**
 * Created by Administrator on 2017/8/14.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import DataDeal from "../datadeal.js";
import Ajax from "../ajax.js";
import API_URL from "../url.js";
import $ from "jquery";
import {Modal,Icon,Table} from "antd";
import './table.less';

var TableContent = React.createClass({
    getInitialState: function () {
        return {
            tableList:[]
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
    render: function () {
        //表格
        let columns = [
            { title: '用户名', width:70, dataIndex: 'name', key: '0'},
            { title: '内部用户',width:60,dataIndex: 'innerUser', key: '1'},
            { title: '真实姓名', width:70,dataIndex: 'realName', key: '2' },
            { title: '创建日期', width:70,dataIndex: 'createDate', key: '3'},
            { title: '有效期',  width:70,dataIndex: 'period', key: '4'},
            { title: '用户分类',  width:100,dataIndex: 'userClass', key: '5'},
            { title: '角色',  width:80,dataIndex: 'role', key: '6'},
            { title: '价格时间',width:50, dataIndex: 'priceDate', key: '7'},
            { title: '价格城市', width:50,dataIndex: 'priceCity', key: '8'},
            { title: 'Mix权限',width:50, dataIndex: 'MixPerm', key: '9' },
            { title: 'Mix数据源',width:50, dataIndex: 'MixDataSource', key: '10' },
            { title: '页面参数',width:50, dataIndex: 'pagePara', key: '11' },
            { title: '装备权限',width:50, dataIndex: 'equipPerm', key: '12' },
            { title: '数据源权限',width:50, dataIndex: 'dataSourcePerm', key: '13' },
            { title: '细分市场',width:50, dataIndex: 'segmentMarket', key: '14' },
            { title: '大区', width:50,dataIndex: 'bigArea', key: '15' },
            { title: '本品', width:50,dataIndex: 'zinc', key: '16' },
            {title: '',
             key: 'edit',
             width: 50,
             render: (
                 
             ) => <a href="#">编辑</a>
            },
            {title: '',
             key: '17',
             width: 50,
             render: () => <a href="#">删除</a>
            }
        ];

        let tableList=this.state.tableList;
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
                role:tableList[i].role,
                priceDate:tableList[i].priceDate,
                priceCity:tableList[i].priceCity,
                MixPerm:tableList[i].MixPerm,
                MixDataSource:tableList[i].MixDataSource,
                pagePara:tableList[i].pagePara,
                equipPerm:tableList[i].equipPerm,
                dataSourcePerm:tableList[i].dataSourcePerm,
                segmentMarket: tableList[i].segmentMarket,
                bigArea: tableList[i].bigArea,
                zinc: tableList[i].zinc
            });
        }
        return (
            <div className="table-list">
                <Table  bordered columns={columns} dataSource={data}/>
            </div>
        );
    }
});
export {TableContent as default}