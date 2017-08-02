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

var Brand = React.createClass({
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
        this.setState({bigCharts:bigCharts});
        this.loadBrandPrefix(this.state.equipList);
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({equipList:nextprops.equipList});
    },
    loadBrandPrefix:function(equipList){
        var dataList=equipList;
        var brandPrefix=[],brandPrefixBrand=this.state.brandPrefixBrand;
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

        this.setState({brandPrefix:brandPrefix,brandPrefixBrand:brandPrefixBrand});
    },
    componentWillReceiveProps: function (nextProps) {
        var selectedHZZZ=[nextProps.selectedHZZZ];
        var selectedSegment=[nextProps.selectedSegment];
        var selectedBody=[nextProps.selectedBody];
        var selectedFuel=[nextProps.selectedFuel];
        this.loadBrandPrefix(nextProps.equipList);
        this.setState({equipList:nextProps.equipList,selectedHZZZ: selectedHZZZ,selectedSegment:selectedSegment,selectedBody:selectedBody,selectedFuel:selectedFuel});
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
                <BodyLi  key={index} brandPrefixBrand={content} chooseContent={this.chooseContent} brand={content.Brand}/>
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
            OEM:[]
        }
    },

    componentDidMount: function () {
        this.loadData(this.props.brand);
    },
    loadData:function(brand){
        Ajax({
            type: 'GET',
            url: API_URL.equipment.list,
            //data:{content:content},
            success: function(data) {
                var dataList=data.data.content;
                var OEM=[];
                for(var i=0;i<dataList.length;i++){
                    if(brand==dataList[i].Brand){
                        OEM.push(dataList[i].OEM);
                    }
                }
                OEM = DataDeal.unique(OEM);
                this.setState({OEM:OEM});
            }.bind(this)
        });
    },
    componentWillReceiveProps: function (nextProps) {
        this.loadData(nextProps.brandPrefixBrand.Brand);
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
                <ItemBodyRow  key={index} OEM={content} subSegmentChoose={this.subSegmentChoose}/>
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
            Model:[]
        }
    },

    componentDidMount: function () {
        this.loadData(this.props.OEM);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({OEM:nextProps.OEM});
        this.loadData(nextProps.OEM);
    },
    loadData:function(OEM){
        Ajax({
            type: 'GET',
            url: API_URL.equipment.list,
            //data:{content:content},
            success: function(data) {
                var dataList=data.data.content;
                var Model=[];
                for(var i=0;i<dataList.length;i++){
                    if(OEM==dataList[i].OEM){
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
export {Brand as default}