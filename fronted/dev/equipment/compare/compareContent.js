/**
 * Created by Administrator on 2017/8/16.
 */
import React from  'react'
import ReactDOM from 'react-dom';
import Haschoose from "../hasChoose.js";
import Ajax from "../../common/ajax";
import API_URL from "../../common/url";
import store from "../../../reduxFile/store";
import {allEquipJsonData} from "../../../reduxFile/actions";
import DataDeal from "../../common/datadeal.js";
import $ from "jquery";
import './compare.less'

var CompareContent = React.createClass({
    getInitialState: function () {
        return {
            hasChooseList:[],
            selectedOrCancelflag:0,
            recordsList:[],
            historyList:[]
        }
    },
    componentDidMount: function () {
        this.getRecordsList();
    },
    getRecordsList:function(){
        Ajax({
            type: 'GET',
            url: API_URL.equipment.compareList,
            //data:{content:content},
            success: function(data) {
                let recordsList=data.Records;
                let conditions = {compareList : recordsList};
                store.dispatch(allEquipJsonData(conditions));//存到store
                this.setState({recordsList:recordsList});
            }.bind(this)
        });
    },
    componentWillReceiveProps:function(nextprops){
        let historyList =nextprops.historyList;
        this.setState({historyList:historyList});
    },
    allSelected:function(e){
        let thisInnertext=$(e.target).text();
        let flag=DataDeal.allOrCancel(thisInnertext,$(e.target));//全选或取消
        let modelLi= $(e.target).parent().next().find('.chk');//该级别下的所有model
        DataDeal.modelHasSelected(modelLi,flag,'selected');//选中1，取消0
        let ModelLiArry= DataDeal.getModelLiValue(modelLi);

        this.setState({hasChooseList:ModelLiArry,selectedOrCancelflag:flag});
    },
    modelChoose:function(ModelLiArry,flag){
        this.setState({hasChooseList:ModelLiArry,selectedOrCancelflag:flag});
    },
    historyChoose:function(e){
        let flag=DataDeal.selectedModel($(e.target),'selected');
        let ModelLiArry=[DataDeal.modelSelected($(e.target),flag)];

        this.modelChoose(ModelLiArry,flag);
        this.setState({flag:flag});
    },
    render: function () {
        let historyCell;
        if(this.state.historyList){
            historyCell=this.state.historyList.map(function(content,index){
                return(
                    <a key={index} className="chk" data-id={content.dataId} data-model={content.modelValue} onClick={this.historyChoose}>{content.modelValue}<b></b></a>
                )
            }.bind(this));
        }else{historyCell=''}

        let jspCell=this.state.recordsList.map(function(content,index){
            return(
                <dl key={index}>
                    <dt>
                        <b className="all" onClick={this.allSelected} data-Name={content.Name}>全选</b>
                        {content.Name}
                    </dt>
                    <DDContent content={content} recordsList={this.state.recordsList} modelChoose={this.modelChoose}/>
                </dl>
            )
        }.bind(this));
        return (
            <div>
                <div className='st-content compare'>
                    <div className="scroll">
                        <div className="jspContainer">
                            <div className="jspPane">
                                {jspCell}
                            </div>
                        </div>
                    </div>

                    {/*最近浏览*/}
                    <div className="sm-history">
                        <div className="title">最近浏览:</div>
                        {historyCell}
                        <div style={{clear:'both'}}></div>
                    </div>
                </div>
                {/*已选条件*/}
                <Haschoose hasChooseList={this.state.hasChooseList}  selectedOrCancelflag={this.state.selectedOrCancelflag}/>
            </div>
        )
    }
});

var DDContent = React.createClass({
    getInitialState: function () {
        return {
            details:this.props.content.Details,
            recordsList:this.props.recordsList
        }
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({
            details:nextprops.content.Details,
            recordsList:nextprops.recordsList
        });
    },
    jugeModel:function(recordsList,modelId){
        let flag=false,count=0;
        for(let i=0;i<recordsList.length;i++){
            let list=recordsList[i].Details;
            count=DataDeal.jugeCell(list,modelId,'Model');
        }
        count>1? flag=true:flag=false;
        return flag;
    },

    modelChoose:function(e){
        //全选样式
        let flag=DataDeal.selectedModel($(e.target),'selected');

        let modelLis=$(e.target).parent().find('.chk');
        let selectedList=$(e.target).parent().find('.selected');
        let allNode= $(e.target).parent().prev().find('.all');
        DataDeal.modelSelctedAllCss(modelLis,selectedList,allNode);

        let ModelLiArry=[DataDeal.modelSelected($(e.target),flag)];
        this.props.modelChoose(ModelLiArry,flag);
    },
    render: function () {
        let modelItem=this.state.details.map(function(content,index){
            let modelId=content.Model;
            let flag=this.jugeModel(this.state.recordsList,modelId);
            return(
                <a key={index} className="chk" id={modelId} data-id={content.OEM+'_'+modelId} data-oem={content.OEMInfo.NameC} data-model={content.ModelInfo.NameC} onClick={this.modelChoose}>{flag?content.ModelInfo.NameC+'('+content.OEMInfo.NameC+')':content.ModelInfo.NameC}
                    <b></b>
                </a>
            )
        }.bind(this));
        return (
            <dd>
                {modelItem}
             </dd>
        )
    }
});
export {CompareContent as default}