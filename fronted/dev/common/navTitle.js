/**
 * Created by Administrator on 2017/8/3.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import {Row} from "antd";
import DataDeal from "./datadeal.js";
import ContentBodyRowLeft from "./contentBodyRowLeft.js";
import ContentBodyRowRight from "./contentBodyRowRight.js";
import $ from "jquery";
import '../equipment/equip.less'

var NavTitle = React.createClass({
    getInitialState: function () {
        return {
            equipList:[],
            segmentList:[]
        }
    },
    componentDidMount: function () {
        this.setState({equipList:this.props.equipList});
        this.getSegmentList(this.props.equipList);
    },
    getSegmentList:function(equipList){
        var segmentList=[];
        for(var i=0;i<equipList.length;i++){
            segmentList.push(equipList[i].Segment);
        }
        segmentList = DataDeal.unique(segmentList);
        this.setState({segmentList:segmentList});
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({equipList:nextprops.equipList});
        this.getSegmentList(nextprops.equipList);
    },
    chooseContent:function(ModelLiArry,flag){
        this.props.chooseContent(ModelLiArry,flag);
    },
    render: function () {
        let navTitle=this.state.segmentList.map(function(content,index){
            return(
                <BodyLi  key={index}  equipList={this.state.equipList} segment={content} chooseContent={this.chooseContent}/>
            );
        }.bind(this));
        return (
            <ul>
                {navTitle}
            </ul>

        );
    }
});
var BodyLi = React.createClass({
    getInitialState: function () {
        return {
            segment:[],
            equipList:[],
            carList:[],
            subSegmentList:[]
        }
    },

    componentDidMount: function () {
        this.setState({equipList:this.props.equipList,segment:this.props.segment});
        this.loadData(this.props.segment,this.props.equipList);
    },

    loadData:function(segment,list){
        var dataList=list;
        var subSegmentList=[],carList=[];
        for(var i=0;i<dataList.length;i++){
            if(segment==dataList[i].Segment){
                subSegmentList.push(dataList[i].SubSegment);
                carList.push(dataList[i]);
            }
        }
        subSegmentList = DataDeal.unique(subSegmentList);
        this.setState({subSegmentList:subSegmentList,carList:carList});
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({equipList:nextProps.equipList,segment:nextProps.segment});
        this.loadData(nextProps.segment,nextProps.equipList);
    },
    allChoose:function(e){
        var thisInnertext=$(e.target)[0].innerText;
        var modelLi= $(e.target).parent().next().find('.model-li');//该级别下的所有model
        var flag=DataDeal.modelHasSelected(modelLi);//选中1，取消0
        DataDeal.allOrCancel(thisInnertext,$(e.target));//全选或取消
        var ModelLiArry= DataDeal.getModelLiValue(modelLi);
        this.props.chooseContent(ModelLiArry,flag);
    },
    leftValueChoose:function(ModelLiArry,flag){
        this.props.chooseContent(ModelLiArry,flag);
    },
    modelChoose:function(ModelLiArry,flag){
        this.props.chooseContent(ModelLiArry,flag);
    },
    render: function () {
        let itemBodyRow=this.state.subSegmentList.map(function(content,index){
            return(
                <Row className='brand-OEM-row' key={index}>
                    <ContentBodyRowLeft content={content} leftValueChoose={this.leftValueChoose}/>
                    <ContentBodyRowRight content={this.state.carList} leftVaule={content} modelChoose={this.modelChoose} leftProperty="SubSegment"/>
                </Row>
            );
        }.bind(this));
        return (
            <li>
                <div className="item-title clearfix">
                    <div className="all pull-left" onClick={this.allChoose}>全选</div>
                    <p className="pull-left"><b>{this.state.segment}</b></p>
                </div>
                <div className="item-body">
                    {itemBodyRow}
                </div>
            </li>
        );
    }
});
export {NavTitle as default}