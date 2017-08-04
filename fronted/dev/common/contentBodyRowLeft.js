/**
 * Created by Administrator on 2017/8/3.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import {Row,Col} from "antd";
import DataDeal from "./datadeal.js";
import $ from "jquery";
import API_URL from "../common/url";
import '../equipment/equip.less'

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
        this.setState({content:nextprops.content});
    },
    leftValueChoose:function(e){
        if($(e.target).hasClass('selectedSub')){
            $(e.target).removeClass('selectedSub');
        }else{
            $(e.target).addClass('selectedSub');
        }
        var modelLi= $(e.target).next().find('.model-li');//该级别下的所有model
        var flag=DataDeal.modelHasSelected(modelLi);//选中1，取消0
        var ModelLiArry= DataDeal.getModelLiValue(modelLi);
        this.props.leftValueChoose(ModelLiArry,flag);
    },
    render: function () {
        return (
            <Col span={2} onClick={this.leftValueChoose}>{this.state.content}</Col>
        );
    }
});
export {contentBodyRowLeft as default}