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
import $ from "jquery";
import API_URL from "../common/url";
import './equip.less'
const TabPane = Tabs.TabPane;

var Segment = React.createClass({
    getInitialState: function () {
        return {
            equipList:[],
            segmentList:[],
            selectedSegmentList:[],
            segItemSelectedFlag:[],
            searchContent:'',//搜索内容
            searchResult:[],
            filterType:'按品牌'//按品牌还是按级别
        }
    },
    componentDidMount:function(){
        this.setState({
            equipList:this.props.equipList,
            segmentList:this.props.segmentList,
            selectedSegmentList:this.props.selectedSegmentList,
            segItemSelectedFlag:this.props.segItemSelectedFlag});
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({
            equipList:nextprops.equipList,
            segmentList:nextprops.segmentList,
            selectedSegmentList:nextprops.selectedSegmentList,
            segItemSelectedFlag:nextprops.segItemSelectedFlag
        });
    },
    chooseContent:function(chooseContent,flag){
        this.props.chooseContent(chooseContent,flag);
    },
    chooseBrandPrefix:function(content,clickType){
        this.props.chooseBrandPrefix(content,clickType);
    },
    handleSearch:function(searchContent, status){
        this.setState({searchContent: searchContent});
        if (status) {
            let conditions = {searchContent : searchContent};
            var searchResult=DataDeal.fuzzySearch(this.state.equipList,searchContent);
            var segmentList=this.getResultSeg(searchResult);
            this.setState({equipList:searchResult,segmentList:segmentList});
        }
    },
    chooseFilterType:function(e){
        var thisInnerText=$(e.target)[0].innerText;
        this.setState({filterType:thisInnerText});
    },
    //获取级别
    getResultSeg:function(searchResult){
        var segList=[];
        for(var i=0;i<searchResult.length;i++){
            segList.push(searchResult[i].Segment);
        }
        segList=DataDeal.unique(segList);
        return segList;
    },
    render:function(){
        var filterType =this.state.filterType;
        let navtitle;
        switch (filterType){
            case "按品牌":
                navtitle=(<BrandPrefixNav equipList={this.state.equipList}/>);
                break;
            case "按级别":
                navtitle=(<NavTitle/>);
                break;
        }
        return (
            <div className="seg-brand-body">
                <div className="pull-right clearfix">
                    <SearchItem  onSearch={this.handleSearch} content={this.state.searchContent}/>
                </div>
                <div>
                    <Button onClick={this.chooseFilterType} key={1}>按品牌</Button>
                    <Button onClick={this.chooseFilterType} key={2}>按级别</Button>
                </div>
                <div className="content-body">
                    <div className="nav-title">
                        <BigCharts/>
                    </div>
                    <div className="content-body-area border clearfix">
                        {navtitle}
                    </div>
                </div>
            </div>

        )
    }
});



export {Segment as default}