/**
 * Created by Administrator on 2017/8/3.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import {Row,Col} from "antd";
import DataDeal from "./datadeal.js";
import ContentBodyRowLeft from "./contentBodyRowLeft.js";
import ContentBodyRowRight from "./contentBodyRowRight.js";
import $ from "jquery";
import API_URL from "../common/url";
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
    render: function () {
        let navTitle=this.state.segmentList.map(function(content,index){
            return(
                <BodyLi  key={index}  equipList={this.state.equipList} segment={content}/>
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
    render: function () {
        let itemBodyRow=this.state.subSegmentList.map(function(content,index){
            return(
                <Row className='brand-OEM-row' key={index}>
                    <ContentBodyRowLeft content={content}/>
                    <ContentBodyRowRight content={this.state.carList} leftVaule={content} leftProperty="SubSegment"/>
                </Row>
            );
        }.bind(this));
        return (
            <li>
                <div className="item-title clearfix">
                    <p className="pull-left"><b>{this.state.segment}</b></p>
                    <div className="all pull-left">全选</div>
                </div>
                <div className="item-body">
                    {itemBodyRow}
                </div>
            </li>
        );
    }
});

var ItemBodyRow = React.createClass({
    getInitialState: function () {
        return {
            OEM:[],
            Model:[],
            OEMCarList:[]
        }
    },

    componentDidMount: function () {
        this.setState({OEMCarList:this.props.OEMCarList,OEM:this.props.OEM});
        this.loadData(this.props.OEM,this.props.OEMCarList);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({OEM:nextProps.OEM,OEMCarList:nextProps.OEMCarList});
        this.loadData(nextProps.OEM,nextProps.OEMCarList);
    },
    loadData:function(OEM,OEMCarList){
        var dataList=OEMCarList;
        var Model=[];
        for(var i=0;i<dataList.length;i++){
            if(OEM==dataList[i].OEM){
                Model.push({Model:dataList[i].Model,ModelID:dataList[i].ModelID});
            }
        }
        //数组对象去重
        var hash = {};
        Model = Model.reduce(function(item, next) {
            hash[next.ModelID] ?'' : hash[next.ModelID] = true && item.push(next);
            return item
        }, []);

        this.setState({Model:Model});
    },
    render: function () {
        let itemModel=this.state.Model.map(function(content,index){
            return(
                <li className="model-li"  key={index} id={content.ModelID}>
                    {content.Model}
                    <b></b>
                </li>
            );
        }.bind(this));
        return (
            <Row className='brand-OEM-row'>
                <Col span={2}>{this.props.OEM}</Col>
                <Col span={10}>
                    <ul>
                        {itemModel}
                    </ul>
                </Col>
            </Row>
        );
    }
});

export {NavTitle as default}