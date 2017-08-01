/**
 * Created by Administrator on 2017/7/27.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import SearchItem from "../common/searchItem/searchItem";
import {Row,Col} from "antd";
import Ajax from "../common/ajax";
import DataDeal from "../common/datadeal.js";
import store from "../../reduxFile/store";
import {chooseContentConditions} from "../../reduxFile/actions";
import $ from "jquery";
import API_URL from "../common/url";
import './equip.less'

var SegmentArea = React.createClass({
    getInitialState: function () {
        return {
            segmentList:["A","A0","A00", "B","BUS", "C" , "D", "Pickup"],//所有级别列表
            selectedSegmentList:this.props.selectedSegmentList
        }
    },

    componentDidMount: function () {
        //this.setState({segmentList:this.props.segmentList});
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({segmentList:nextProps.segmentList,
            selectedSegmentList:nextProps.selectedSegmentList
        });
    },

    chooseContent:function(chooseContent,chooseType){
        this.props.chooseContent(chooseContent,chooseType);
    },
    render: function () {
        let segBody=this.state.segmentList.map(function(content,index){
            return(
                <SegBodyLi  key={index} segTitle={content} chooseContent={this.chooseContent}/>
            );
        }.bind(this));
        return (
            <div className="segmentArea border clearfix brandArea">
                <ul>
                    {segBody}
                </ul>
            </div>
        );
    }

});

var SegBodyLi = React.createClass({
    getInitialState: function () {
        return {
            segTitle:this.props.segTitle,
            subSegment:[]
        }
    },

    componentDidMount: function () {
        this.loadData(this.props.segTitle);
    },
    loadData:function(segTitle){
        Ajax({
            type: 'GET',
            url: API_URL.equipment.list,
            //data:{content:content},
            success: function(data) {
                var dataList=data.data.content;
                var subSegment=[];
                for(var i=0;i<dataList.length;i++){
                    if(segTitle==dataList[i].Segment){
                        subSegment.push(dataList[i].SubSegment);
                    }
                }
                subSegment = DataDeal.unique(subSegment);
                this.setState({subSegment:subSegment});
            }.bind(this)
        });
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({segTitle:nextProps.segTitle});
        this.loadData(nextProps.segTitle);
    },
    allChoose:function(e){
        var segTitle=$(e.target).next()[0].innerText;
        var chooseType='all';
        //该级别下的所有model
        var modelLi= $(e.target).parent().next().find('.model-li');
        DataDeal.selectedAll(modelLi);


    },
    subSegmentChoose:function(subSegment,chooseType){
        this.props.chooseContent(subSegment,chooseType);
    },
    render: function () {
        let itemBodyRow=this.state.subSegment.map(function(content,index){
            return(
                <ItemBodyRow  key={index} subSegment={content} subSegmentChoose={this.subSegmentChoose}/>
            );
        }.bind(this));
        return (
            <li>
                <div className="item-title clearfix">
                    <div className="all pull-left" onClick={this.allChoose}>全选</div>
                    <p className="pull-left"><b>{this.props.segTitle}</b></p>
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
            subSegment:this.props.subSegment,
            Model:[]
        }
    },

    componentDidMount: function () {
        this.loadData(this.props.subSegment);
    },
    componentWillReceiveProps: function (nextProps) {
        this.loadData(nextProps.subSegment);
    },
    loadData:function(subSegment){
        Ajax({
            type: 'GET',
            url: API_URL.equipment.list,
            //data:{content:content},
            success: function(data) {
                var dataList=data.data.content;
                var Model=[];
                for(var i=0;i<dataList.length;i++){
                    if(subSegment==dataList[i].SubSegment){
                        Model.push(dataList[i].Model);
                    }
                }
                Model = DataDeal.unique(Model);
                this.setState({Model:Model});
            }.bind(this)
        });
    },
    subSegmentChoose:function(e){
        var subSegment=$(e.target)[0].innerText;
        var chooseType='subSegment';
        this.props.subSegmentChoose(subSegment,chooseType);

        if($(e.target).hasClass('selectedSub')){
            $(e.target).removeClass('selectedSub');
        }
        else{
            $(e.target).addClass('selectedSub');
        }
        //该级别下的所有model
        var modelLi= $(e.target).next().find('.model-li');
        DataDeal.selectedAll(modelLi);
    },
    render: function () {
        let itemModel=this.state.Model.map(function(content,index){
            return(
                <ItemModel  key={index} Model={content}/>
            );
        }.bind(this));
        return (
            <Row>
                <Col span={2} onClick={this.subSegmentChoose}>{this.props.subSegment}</Col>
                <Col span={10}>
                    <ul>
                        {itemModel}
                    </ul>
                </Col>
            </Row>
        );
    }

});

var ItemModel = React.createClass({
    getInitialState: function () {
        return {
            Model:this.props.Model
        }
    },

    componentDidMount: function () {
    },
    chooseModel:function(e){
        var target=$(e.target);
        DataDeal.selectedModel(target);
    },
    render: function () {
        return (
            <li className="model-li" onClick={this.chooseModel}>
                {this.props.Model}
                <b></b>
            </li>
        );
    }

});
export {SegmentArea as default}