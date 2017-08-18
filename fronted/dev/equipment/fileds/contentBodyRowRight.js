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
            content:[],
            leftVaule:'',
            leftProperty:'',
            ModelList:[]
        }
    },
    componentDidMount: function () {
        this.setState({
            content:this.props.content,
            leftVaule:this.props.leftVaule,
            leftProperty:this.props.leftProperty
        });
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
        let equipListConditions = store.getState().allEquipJsonDataState ;
        let dataList=equipListConditions.equipList;


        let target=$(e.target);
        let itemValue=target.text();
        let id=target.attr('id');
        let dataId=target.attr('data-id');
        let dataOem=target.attr('data-oem');

        let flag= DataDeal.selectedModel(target,'selected');//选中1，取消0
        let ModelLiArry=[{"modelValue":itemValue,"dataId":dataId,"id":id,"dataOem":dataOem}];
        ModelLiArry=DataDeal.jugeModel(dataList,ModelLiArry);//判断重名

        let conditions = {selectedList : ModelLiArry,selectedOrCancelflag:flag};
        store.dispatch(allEquipJsonData(conditions));//存到store

        this.props.modelChoose();
    },
    loadData:function(content,leftVaule,leftProperty){
        let dataList=content;
        let Model=[];
        for(let item in dataList){
            for(let key in dataList[item]){
                if(key==leftProperty){
                    if(leftVaule==dataList[item][key]){
                       Model.push(dataList[item]);
                    }
                }
            }
        }
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