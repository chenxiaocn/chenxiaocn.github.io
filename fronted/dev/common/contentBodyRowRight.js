/**
 * Created by Administrator on 2017/8/4.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import {Row,Col} from "antd";
import DataDeal from "./datadeal.js";
import $ from "jquery";
import API_URL from "../common/url";
import '../equipment/equip.less'

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
        var target=$(e.target);
        var itemValue=target[0].innerText;
        var itemId=target.attr('id');
        var flag= DataDeal.selectedModel(target);//选中1，取消0
        var ModelLiArry=[{"modeValue":itemValue,"modelId":itemId}];
        this.props.modelChoose(ModelLiArry,flag);
    },
    loadData:function(content,leftVaule,leftProperty){
        var dataList=content;
        var Model=[];
        for(var item in dataList){
            for(var key in dataList[item]){
                if(key==leftProperty){
                    if(leftVaule==dataList[item][key]){
                        Model.push({Model:dataList[item].Model,ModelID:dataList[item].ModelID});
                    }
                }
            }
        }
        //数组对象去重
        var hash = {};
        Model = Model.reduce(function(item, next) {
            hash[next.ModelID] ?'' : hash[next.ModelID] = true && item.push(next);
            return item
        }, []);

        this.setState({ModelList:Model});
    },
    render: function () {
        let itemModel=this.state.ModelList.map(function(content,index){
            return(
                <li className="model-li"  key={index} id={content.ModelID} onClick={this.modelChoose}>
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