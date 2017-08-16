/**
 * Created by Administrator on 2017/7/27.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import SearchItem from "../../common/searchItem/searchItem";
import store from "../../../reduxFile/store";
import {allEquipJsonData} from "../../../reduxFile/actions";
import BigCharts from "../../common/bigCharts.js";
import BrandPrefixNav from "./brandPrefixNav.js";
import NavTitle from "./navTitle.js";
import DataDeal from "../../common/datadeal.js";
import $ from "jquery";
import './../equip.less'

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
        let equipListConditions = store.getState().allEquipJsonDataState ;
        searchContent==''? equipList=equipListConditions.equipList: equipList=this.state.equipList;
         searchResult=DataDeal.fuzzySearch(equipList,searchContent);
        this.setState({searchContent: searchContent,equipList:searchResult});
    },
    chooseFilterType:function(e){
        var thisInnerText=$(e.target)[0].innerText;
        this.setState({filterType:thisInnerText});
        $('.filter-btn-group div').removeClass('btn-active');
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
                    <SearchItem  onSearch={this.handleSearch} content={this.state.searchContent} placeHolder="请输入查找内容"/>
                </div>
                <div className="filter-btn-group">
                    <div className="btn-active" onClick={this.chooseFilterType} key={1}>按品牌</div>
                    <div onClick={this.chooseFilterType} key={2}>按级别</div>
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
export {Segment as default}