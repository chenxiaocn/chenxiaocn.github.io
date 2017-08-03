/**
 * Created by Administrator on 2017/8/3.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import {Row,Col} from "antd";
import DataDeal from "./datadeal.js";
import ContentBodyRowLeft from "./contentBodyRowLeft.js";
import $ from "jquery";
import API_URL from "../common/url";
import '../equipment/equip.less'

var BrandPrefixNav = React.createClass({
    getInitialState: function () {
        return {
            equipList:[],
            brandPrefix:[],//品牌首字母
            brandPrefixBrand:[]//首字母加品牌名称
        }
    },
    componentDidMount: function () {
        this.setState({equipList:this.props.equipList});
        this.loadBrandPrefix(this.props.equipList);
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({equipList:nextprops.equipList});
        this.loadBrandPrefix(nextprops.equipList);
    },
    loadBrandPrefix:function(equipList){
        var dataList=equipList;
        var brandPrefix=[],brandPrefixBrand=[];
        for(var i=0;i<dataList.length;i++){
            brandPrefix.push(dataList[i].BrandPrefix);
            brandPrefixBrand.push({"BrandPrefix":dataList[i].BrandPrefix,"Brand":dataList[i].Brand});
        }
        brandPrefix = DataDeal.unique(brandPrefix).sort();
        //数组对象去重
        var hash = {};
        brandPrefixBrand = brandPrefixBrand.reduce(function(item, next) {
            hash[next.Brand] ?'' : hash[next.Brand] = true && item.push(next);
            return item
        }, []);

        //数组对象按大写字母排序
        DataDeal. sortArr(brandPrefixBrand, 'BrandPrefix');

        this.setState({brandPrefix:brandPrefix,brandPrefixBrand:brandPrefixBrand,equipList:equipList});
    },
    render: function () {
        let navTitle=this.state.brandPrefixBrand.map(function(content,index){
            return(
                <BodyLi  key={index}  brandPrefix={content.BrandPrefix}  brand={content.Brand} equipList={this.state.equipList}/>
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
            brand:'',
            brandPrefix:'',
            OEM:[],
            equipList:[],
            OEMCarList:[]
        }
    },

    componentDidMount: function () {
        this.setState({equipList:this.props.equipList,brand:this.props.brand,brandPrefix:this.props.brandPrefix});
        this.loadData(this.props.brand,this.props.equipList);
    },

    loadData:function(brand,list){
        var dataList=list;
        var OEM=[],OEMCarList=[];
        for(var i=0;i<dataList.length;i++){
            if(brand==dataList[i].Brand){
                OEM.push(dataList[i].OEM);
                OEMCarList.push(dataList[i]);
            }
        }
        OEM = DataDeal.unique(OEM);
        this.setState({OEM:OEM,OEMCarList:OEMCarList});
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({equipList:nextProps.equipList,brand:nextProps.brand,brandPrefix:nextProps.brandPrefix});
        this.loadData(nextProps.brand,nextProps.equipList);
    },
    render: function () {
        let itemBodyRow=this.state.OEM.map(function(content,index){
            return(
                <ItemBodyRow  key={index} OEM={content}  OEMCarList={this.state.OEMCarList}/>
            );
        }.bind(this));
        return (
            <li>
                <div className="item-title clearfix">
                    <p className="pull-left"><b>{this.state.brandPrefix}</b></p>
                    <div className="all pull-left">全选</div>
                    <div className="pull-left brand-title">{this.state.brand}</div>
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
    chooseModel:function(e){
        var target=$(e.target);
        DataDeal.selectedModel(target);
    },
    render: function () {
        let itemModel=this.state.Model.map(function(content,index){
            return(
                <li className="model-li" onClick={this.chooseModel} key={index} id={content.ModelID}>
                    {content.Model}
                    <b></b>
                </li>
            );
        }.bind(this));
        return (
            <Row className='brand-OEM-row'>
                <Col span={2} onClick={this.subSegmentChoose}>{this.props.OEM}</Col>
                <Col span={10}>
                    <ul>
                        {itemModel}
                    </ul>
                </Col>
            </Row>
        );
    }
});

export {BrandPrefixNav as default}