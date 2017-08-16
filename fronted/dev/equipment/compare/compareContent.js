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
//import {Row} from 'antd';
import DataDeal from "../../common/datadeal.js";
import $ from "jquery";
import './compare.less'

var CompareContent = React.createClass({
    getInitialState: function () {
        return {
            hasChooseList:[],
            selectedOrCancelflag:0,
            recordsList:[]
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
                console.log(recordsList);
                let conditions = {compareList : recordsList};
                store.dispatch(allEquipJsonData(conditions));//存到store
                this.setState({recordsList:recordsList});
            }.bind(this)
        });
    },
    componentWillReceiveProps:function(nextprops){
    },
    allSelected:function(e){
        let thisName=$(e.target).attr('data-Name');
        let thisInnertext=$(e.target)[0].innerText;
        let modelLi= $(e.target).parent().next().find('.chk');//该级别下的所有model
        DataDeal.allOrCancel(thisInnertext,$(e.target));//全选或取消
        let flag=DataDeal.modelHasSelected(modelLi);//选中1，取消0
        let ModelLiArry= DataDeal.getModelLiValue(modelLi);
        this.setState({hasChooseList:ModelLiArry,selectedOrCancelflag:flag});
    },
    render: function () {
        let jspCell=this.state.recordsList.map(function(content,index){
            return(
                <dl key={index}>
                    <dt>
                        <b className="all" onClick={this.allSelected} data-Name={content.Name}>全选</b>
                        {content.Name}
                    </dt>
                    <DDContent content={content} recordsList={this.state.recordsList}/>
                </dl>
            )
        }.bind(this));
        return (
            <div>
                <div className='st-content compare selected'>
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
                        <a className="chk" data-id="4111_598" data-oem="奥迪" data-model="Q5">Q5(奥迪)<b></b></a>
                        <a className="chk" data-id="4111_142202" data-oem="奥迪" data-model="Q3">Q3(奥迪)<b></b></a>
                        <a className="chk" data-id="331_598" data-oem="一汽大众" data-model="Q5">Q5(一汽大众)<b></b></a>
                        <a className="chk" data-id="331_142202" data-oem="一汽大众" data-model="Q3">Q3(一汽大众)<b></b></a>
                        <a className="chk" data-id="331_341" data-oem="一汽大众" data-model="A6">A6(一汽大众)<b></b></a>
                        <a className="chk" data-id="331_343" data-model="A6L">A6L<b></b></a>
                        <a className="chk" data-id="4111_4437" data-model="S5 Sportback">S5 Sportback<b></b></a>
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
    componentDidMount: function () {
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
            for(let j=0;j<recordsList[i].Details.length;j++){
                if(modelId==recordsList[i].Details[j].Model){
                    count++;
                }
            }
        }
        if(count>1){
            flag=true;
        }
        return flag;
    },

    render: function () {
        let flag=this.jugeModel(this.state.recordsList,343);
        let modelItem=this.state.details.map(function(content,index){
            let modelId=content.Model;
            let flag=this.jugeModel(this.state.recordsList,modelId);
            return(
                <a key={index} className="chk" id={modelId} data-id={content.OEM+'_'+modelId} data-oem={content.OEMInfo.NameC} data-model={content.ModelInfo.NameC}>{flag?content.ModelInfo.NameC+'('+content.OEMInfo.NameC+')':content.ModelInfo.NameC}
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