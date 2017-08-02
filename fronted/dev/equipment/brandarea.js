/**
 * Created by Administrator on 2017/7/27.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import SearchItem from "../common/searchItem/searchItem";
import {Row,Col} from "antd";
import Ajax from "../common/ajax";
import DataDeal from "../common/datadeal.js";
import $ from "jquery";
import API_URL from "../common/url";
import './equip.less'

var BrandArea = React.createClass({
    getInitialState: function () {
        return {
            segmentList:["A","A0","A00", "B","BUS", "C" , "D", "Pickup"],//所有级别列表
            SubSegment:[],//所有子级别列表
            selectedHZZZ:[],//选中的性质
            selectedSegment:[],//选中的级别，
            selectedBody:[],//选中的车身，
            selectedFuel:[],//选中的燃油，
            bigCharts:[],//26个大写字母
            brandPrefix:[],//品牌首字母
            brand:[],//品牌
            brandPrefixBrand:[],//品牌、首字母
            brandSelectedIntial:'',
            equipList:this.props.equipList
        }
    },
    componentDidMount: function () {
        var bigCharts=DataDeal.generateBig();
        this.setState({bigCharts:bigCharts,equipList:this.props.equipList});
        this.loadBrandPrefix(this.state.equipList);
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
    chooseContent:function(chooseContent,chooseType){
        this.props.chooseContent(chooseContent,chooseType);
    },
    chooseBrandPrefix:function(e){
        var liText = $(e.target)[0].innerText;
        $(".condition-title span").removeClass("title-choose-active");
        if($(e.target).hasClass("choose-active")){
            $(e.target).removeClass("choose-active");
            //加载数据
            this.props.chooseBrandPrefix(liText,'remove');
        }else{
            $(e.target).addClass("choose-active");
            //加载数据
            this.props.chooseBrandPrefix(liText,'add');
        }


        if($(".choose-active").length==0){
            $(".condition-title span").addClass("title-choose-active");
        }
    },
    render: function () {
        let charLi=this.state.bigCharts.map(function(content,index){
            if(content == "E"||content == "I"||content == "P"||content == "U"||content == "V"){
                return(
                    <li key={index} className="disable" onClick={this.chooseBrandPrefix}>{content}</li>
                );
            }else{
                return(
                    <li key={index} onClick={this.chooseBrandPrefix}>{content}</li>
                );
            }
        }.bind(this));
        let segBody=this.state.brandPrefixBrand.map(function(content,index){
            return(
                <BodyLi  key={index} brandPrefixBrand={content} chooseContent={this.chooseContent} brand={content.Brand} equipList={this.state.equipList}/>
            );
        }.bind(this));
        return (
            <div>
                <div className="nav-title">
                    <ul>
                        {charLi}
                    </ul>
                </div>
                <div className="segmentArea border clearfix brandArea">
                    <ul>
                        {segBody}
                    </ul>
                </div>
            </div>
        );
    }
});

var BodyLi = React.createClass({
    getInitialState: function () {
        return {
            brand:'',
            brandPrefix:'',
            OEM:[],
            equipList:this.props.equipList,
            OEMCarList:[]
        }
    },

    componentDidMount: function () {
        this.setState({equipList:this.props.equipList});
        this.loadData(this.props.brand,this.state.equipList);
    },

    loadData:function(brand,equipList){
        var dataList=equipList;
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
        this.setState({equipList:nextProps.equipList});
        this.loadData(nextProps.brandPrefixBrand.Brand,nextProps.equipList);
        this.setState({brandPrefix:nextProps.brandPrefixBrand.BrandPrefix,brand:nextProps.brandPrefixBrand.Brand});
    },
    allChoose:function(e){
        var BrandPrefix=$(e.target).prev()[0].innerText;
        var chooseType='all';
        //该级别下的所有model
        var modelLi= $(e.target).parent().next().find('.model-li');
        DataDeal.selectedAll(modelLi);
        //已选条件随之变化
    },
    subSegmentChoose:function(subSegment,chooseType){
        this.props.chooseContent(subSegment,chooseType);
    },
    render: function () {
        let itemBodyRow=this.state.OEM.map(function(content,index){
            return(
                <ItemBodyRow  key={index} OEM={content} subSegmentChoose={this.subSegmentChoose} OEMCarList={this.state.OEMCarList}/>
            );
        }.bind(this));
        return (
            <li>
                <div className="item-title clearfix">
                    <p className="pull-left"><b>{this.props.brandPrefixBrand.BrandPrefix}</b></p>
                    <div className="all pull-left" onClick={this.allChoose}>全选</div>
                    <div className="pull-left brand-title">{this.props.brandPrefixBrand.Brand}</div>
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
            OEM:this.props.OEM,
            Model:[],
            OEMCarList:this.props.OEMCarList
        }
    },

    componentDidMount: function () {
        this.setState({OEMCarList:this.props.OEMCarList});
        this.loadData(this.props.OEM);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({OEM:nextProps.OEM,OEMCarList:nextProps.OEMCarList});
        this.loadData(nextProps.OEM);
    },
    loadData:function(OEM){
        var dataList=this.state.OEMCarList;
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
export {BrandArea as default}