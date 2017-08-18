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
        let dataList=equipList;
        let brandPrefix=[],brandPrefixBrand=[];
        for(let i=0;i<dataList.length;i++){
            brandPrefix.push(dataList[i].BrandPrefix);
            brandPrefixBrand.push({"BrandPrefix":dataList[i].BrandPrefix,"Brand":dataList[i].Brand});
        }
        brandPrefix = DataDeal.unique(brandPrefix).sort();
        //数组对象去重
        let hash = {};
        brandPrefixBrand = brandPrefixBrand.reduce(function(item, next) {
            hash[next.Brand] ?'' : hash[next.Brand] = true && item.push(next);
            return item;
        }, []);

        //数组对象按大写字母排序
        DataDeal. sortArr(brandPrefixBrand, 'BrandPrefix');

        this.setState({brandPrefix:brandPrefix,brandPrefixBrand:brandPrefixBrand,equipList:equipList});
    },
    chooseContent:function(ModelLiArry,flag){
        this.props.chooseContent(ModelLiArry,flag);
    },
    render: function () {
        let navTitle=this.state.brandPrefixBrand.map(function(content,index){
            return(
                <BodyLi  key={index}  brandPrefix={content.BrandPrefix}  brand={content.Brand} equipList={this.state.equipList} chooseContent={this.chooseContent}/>
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
            carList:[]
        }
    },

    componentDidMount: function () {
        this.setState({equipList:this.props.equipList,brand:this.props.brand,brandPrefix:this.props.brandPrefix});
        this.loadData(this.props.brand,this.props.equipList);
    },

    componentWillReceiveProps: function (nextProps) {
        this.setState({equipList:nextProps.equipList,brand:nextProps.brand,brandPrefix:nextProps.brandPrefix});
        this.loadData(nextProps.brand,nextProps.equipList);
    },
    loadData:function(brand,list){
        let dataList=list;
        let OEM=[],carList=[];
        for(let i=0;i<dataList.length;i++){
            if(brand==dataList[i].Brand){
                OEM.push(dataList[i].OEM);
                carList.push(dataList[i]);
            }
        }
        OEM = DataDeal.unique(OEM);
        this.setState({OEM:OEM,carList:carList});
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
        let itemBodyRow=this.state.OEM.map(function(content,index){
            return(
            <Row className='brand-OEM-row' key={index}>
               <ContentBodyRowLeft content={content} leftValueChoose={this.leftValueChoose}/>
               <ContentBodyRowRight content={this.state.carList} leftVaule={content} modelChoose={this.modelChoose} leftProperty="OEM"/>
            </Row>
            );
        }.bind(this));
        return (
            <li>
                <div className="item-title clearfix">
                    <p className="pull-left"><b>{this.state.brandPrefix}</b></p>
                    <div className="all pull-left" onClick={this.allChoose}>全选</div>
                    <div className="pull-left brand-title">{this.state.brand}</div>
                </div>
                <div className="item-body">
                    {itemBodyRow}
                </div>
            </li>
        );
    }
});
export {BrandPrefixNav as default}