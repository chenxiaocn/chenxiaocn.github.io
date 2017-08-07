/**
 * Created by Administrator on 2017/7/27.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import SearchItem from "../common/searchItem/searchItem";
import {Row,Col,Tabs,Button} from "antd";
import Ajax from "../common/ajax";
import store from "../../reduxFile/store";
import {chooseContentConditions} from "../../reduxFile/actions";
import BrandtArea from "./brandarea.js";
import SegmentArea from "./segarea.js";
import BigCharts from "../common/bigCharts.js";
import BrandPrefixNav from "../common/brandPrefixNav.js";
import NavTitle from "../common/navTitle.js";
import DataDeal from "../common/datadeal.js";
import EquipData from "./equipData.js";
import $ from "jquery";
import API_URL from "../common/url";
import './equip.less'
const TabPane = Tabs.TabPane;

var Segment = React.createClass({
    getInitialState: function () {
        return {
            equipList:[],
            searchContent:'',//搜索内容
            searchResult:[],
            filterType:'按品牌'//按品牌还是按级别,
        }
    },
    componentDidMount:function(){
        this.setState({equipList:this.props.equipList});
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({equipList:nextprops.equipList});
    },
    chooseContent:function(chooseContent,flag){
        this.props.chooseContent(chooseContent,flag);
    },
    chooseBrandPrefix:function(content,clickType){
        this.props.chooseBrandPrefix(content,clickType);
    },
    handleSearch:function(searchContent, status){
        var equipList=[], searchResult=[];
        searchContent==''? equipList=EquipData.getAllData(): equipList=this.state.equipList;
         searchResult=DataDeal.fuzzySearch(equipList,searchContent);
        this.setState({searchContent: searchContent,equipList:searchResult});
    },
    chooseFilterType:function(e){
        var thisInnerText=$(e.target)[0].innerText;
        this.setState({filterType:thisInnerText});
        $('.filter-btn-group button').removeClass('btn-active');
        $(e.target).addClass('btn-active');
    },
    render:function(){
        var filterType =this.state.filterType;
        let navtitle;
        switch (filterType){
            case "按品牌":
                $('.nav-title').show();
                navtitle=(<BrandPrefixNav equipList={this.state.equipList} chooseContent={this.chooseContent}/>);
                break;
            case "按级别":
                $('.nav-title').hide();
                navtitle=(<NavTitle equipList={this.state.equipList} chooseContent={this.chooseContent}/>);
                break;
        }
        return (
            <div className="seg-brand-body">
                <div className="pull-right clearfix">
                    <SearchItem  onSearch={this.handleSearch} content={this.state.searchContent}/>
                </div>
                <div className="filter-btn-group">
                    <button className="btn-active" onClick={this.chooseFilterType} key={1}>按品牌</button>
                    <button onClick={this.chooseFilterType} key={2}>按级别</button>
                </div>
                <div className="content-body">
                    <div className="nav-title">
                        <BigCharts chooseBrandPrefix={this.chooseBrandPrefix}/>
                    </div>
                    <div className="content-body-area border clearfix">
                        {navtitle}
                    </div>
                </div>
            </div>

        )
    }
});

//<Tabs type="card">
//    <TabPane tab="按品牌" key="1">
//        <BrandtArea  equipList={this.state.equipList} chooseBrandPrefix={this.chooseBrandPrefix} chooseContent={this.chooseContent} selectedHZZZ={this.props.selectedHZZZ}  selectedFuel={this.props.selectedFuel} selectedBody={this.props.selectedBody} selectedSegment={this.props.selectedSegment} selectedFlag={this.props.selectedFlag}/>
//    </TabPane>
//    <TabPane tab="按级别" key="2">
//        <SegmentArea  equipList={this.state.equipList} segItemSelectedFlag={this.state.segItemSelectedFlag} segmentList={this.state.segmentList} chooseContent={this.chooseContent}/>
//    </TabPane>
//</Tabs>

export {Segment as default}