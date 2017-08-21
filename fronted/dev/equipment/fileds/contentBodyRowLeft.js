/**
 * Created by Administrator on 2017/8/3.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import {Col} from "antd";
import DataDeal from "./../../common/datadeal.js";
import store from "../../../reduxFile/store";
import {allEquipJsonData} from "../../../reduxFile/actions";
import $ from "jquery";
import './equip.less';

var contentBodyRowLeft = React.createClass({
    getInitialState: function () {
        return {
            content:''
        }
    },
    componentDidMount: function () {
        this.setState({content:this.props.content});
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({content:nextprops.content,flag:nextprops.selectedSubFlag});
    },
    leftValueChoose:function(e){
        let flag=DataDeal.selectedModel($(e.target),'selectedSub');
        //全选、取消
        let antRow=$(e.target).parent().parent().find('.ant-row');
        let selectedSub=$(e.target).parent().parent().find('.selectedSub');
        let allNode=$(e.target).parent().parent().parent().find('.all');
        DataDeal.modelSelctedAllCss(antRow,selectedSub,allNode);

        let modelLi= $(e.target).next().find('.model-li');//该级别下的所有model
        DataDeal.modelHasSelected(modelLi,flag,'selected');//选中1，取消0

        let ModelLiArry= DataDeal.getModelLiValue(modelLi);
        DataDeal.getSelectedModelLiArr(ModelLiArry,flag);

        this.props.leftValueChoose();
    },
    render: function () {
        return (
            <Col span={2} onClick={this.leftValueChoose}>{this.state.content}</Col>
        );
    }
});
export {contentBodyRowLeft as default}