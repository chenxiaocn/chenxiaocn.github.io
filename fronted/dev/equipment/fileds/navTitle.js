/**
 * Created by Administrator on 2017/8/3.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import {Row} from "antd";
import DataDeal from "./../../common/datadeal.js";
import store from "../../../reduxFile/store";
import {allEquipJsonData} from "../../../reduxFile/actions";
import ContentBodyRowLeft from "./contentBodyRowLeft.js";
import ContentBodyRowRight from "./contentBodyRowRight.js";
import $ from "jquery";
import './equip.less'

var NavTitle = React.createClass({
    getInitialState: function () {
        return {
            equipList:this.props.equipList,
            segmentList:[]
        }
    },
    componentDidMount: function () {
        this.getSegmentList(this.props.equipList);
    },
    getSegmentList:function(equipList){
        let segmentList=DataDeal.getConditionList(equipList,'Segment');
        this.setState({segmentList:segmentList});
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({equipList:nextprops.equipList});
        this.getSegmentList(nextprops.equipList);
    },
    chooseContent:function(){
        this.props.chooseContent();
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
            segment:this.props.segment,
            equipList:this.props.equipList,
            carList:[],
            subSegmentList:[]
        }
    },

    componentDidMount: function () {
        this.loadData(this.props.segment,this.props.equipList);
    },

    loadData:function(segment,list){
        let subSegmentList=DataDeal.getChildPropertyList(list,'Segment',segment,'SubSegment');
        let carList=DataDeal.getConditionResults(list,'Segment');
        this.setState({subSegmentList:subSegmentList,carList:carList});
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({equipList:nextProps.equipList,segment:nextProps.segment});
        this.loadData(nextProps.segment,nextProps.equipList);
    },
    allChoose:function(e){
        DataDeal.allSelected(e.target);
        this.props.chooseContent();
    },
    leftValueChoose:function(){
        this.props.chooseContent();
    },
    modelChoose:function(){
        this.props.chooseContent();
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