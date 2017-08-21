/**
 * Created by Administrator on 2017/8/4.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import {Col} from "antd";
import DataDeal from "./../../common/datadeal.js";
import store from "../../../reduxFile/store";
import {allEquipJsonData} from "../../../reduxFile/actions";
import $ from "jquery";
import './equip.less'

var contentBodyRowRight = React.createClass({
    getInitialState: function () {
        return {
            content:this.props.content,
            leftVaule:this.props.leftVaule,
            leftProperty:this.props.leftProperty,
            ModelList:[]
        }
    },
    componentDidMount: function () {
        this.loadData(this.props.content,this.props.leftVaule,this.props.leftProperty);
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({
            content:nextprops.content,
            leftVaule:nextprops.leftVaule,
            leftProperty:nextprops.leftProperty
        });
        this.loadData(nextprops.content,nextprops.leftVaule,nextprops.leftProperty);
    },
    modelChoose:function(e){
        let flag=DataDeal.selectedModel($(e.target),'selected');
        let ModelLiArry=[DataDeal.modelSelected($(e.target),flag)];

        DataDeal.getSelectedModelLiArr(ModelLiArry,flag);

        //左部随之变化的样式
        let selectedModel=$(e.target).parent().find('.selected');
        let leftNode=$(e.target).parent().parent().prev();
        selectedModel.length?leftNode.addClass('selectedSub'):leftNode.removeClass('selectedSub');

        //全选或取消
        let modelList=$(e.target).parent().parent().parent().parent().find('.model-li');
        let selectedList=$(e.target).parent().parent().parent().parent().find('.selected');
        let allNode=$(e.target).parent().parent().parent().parent().prev().find('.all');
        DataDeal.modelSelctedAllCss(modelList,selectedList,allNode);

        this.props.modelChoose();
    },
    loadData:function(content,leftVaule,leftProperty){
        let Model=DataDeal.getPropertyVaule(content,leftProperty,leftVaule);
        //数组对象去重
        let hash = {};
        Model = Model.reduce(function(item, next) {
            hash[next.ModelID] ?'' : hash[next.ModelID] = true && item.push(next);
            return item
        }, []);

        this.setState({ModelList:Model});
    },
    render: function () {
        let itemModel=this.state.ModelList.map(function(content,index){
            return(
                <li className="model-li"  key={index} data-id={content.OEMID+'_'+content.ModelID} id={content.ModelID} data-oem={content.OEM} onClick={this.modelChoose}>
                    {content.Model}
                    <b></b>
                </li>
            );
        }.bind(this));
        return (
            <Col span={10}>
                <ul>
                    {itemModel}
                </ul>
            </Col>
        );
    }
});
export {contentBodyRowRight as default}