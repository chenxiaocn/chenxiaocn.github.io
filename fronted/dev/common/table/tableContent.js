/**
 * Created by Administrator on 2017/8/14.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import DataDeal from "../datadeal.js";
import $ from "jquery";
import {Modal,Icon,Table} from "antd";
import './table.less';

var TableContent = React.createClass({
    getInitialState: function () {
        return {
        }
    },
    componentDidMount: function () {
    },
    componentWillReceiveProps:function(nextprops){
    },
    render: function () {
        //表格
        let columns = [
            { title: '用户名', width: 80, dataIndex: 'name', key: 'name', fixed: 'left' },
            { title: '内部用户',  dataIndex: 'innerUser', key: '1'},
            { title: '真实姓名', dataIndex: 'realName', key: '2' },
            { title: '创建日期', dataIndex: 'createDate', key: '3'},
            { title: '有效期', dataIndex: 'period', key: '4'},
            { title: '用户分类', dataIndex: 'userClass', key: '5'},
            { title: '角色', dataIndex: 'role', key: '6'},
            { title: '价格时间', dataIndex: 'priceDate', key: '7'},
            { title: '价格城市', dataIndex: 'priceCity', key: '8'},
            { title: 'Mix权限', dataIndex: 'MixPerm', key: '9' },
            { title: 'Mix数据源', dataIndex: 'MixDataSource', key: '10' },
            { title: '页面参数', dataIndex: 'pagePara', key: '11' },
            { title: '装备权限', dataIndex: 'equipPerm', key: '12' },
            { title: '数据源权限', dataIndex: 'dataSourcePerm', key: '13' },
            { title: '细分市场', dataIndex: 'segmentMarket', key: '14' },
            { title: '大区', dataIndex: 'bigArea', key: '15' },
            { title: '本品', dataIndex: 'zinc', key: '16' },
            {title: '',key: 'edit',
                fixed: 'right',
                width: 50,
                render: () => <a href="#">edit</a>
            },
            {
                title: '',
                key: '17',
                fixed: 'right',
                width: 50,
                render: () => <a href="#">18</a>
            }
        ];

        let data = [];
        for (let i = 0; i < 100; i++) {
            data.push({
                key: i,
                name: `Edrward ${i}`,
                innerUser:`joe ${i}`,
                realName:`汤 ${i}`,
                age: 32,
                address: `London Park no. ${i}`

            });
        }


        return (
            <div className="table-list">
                <Table  bordered columns={columns} dataSource={data} scroll={{  x: 1500, y: 300}} />
            </div>
        );
    }
});
export {TableContent as default}