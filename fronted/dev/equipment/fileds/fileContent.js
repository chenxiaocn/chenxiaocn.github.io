/**
 * Created by Administrator on 2017/7/27.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import SearchItem from "../../common/searchItem/searchItem";
import ConditionContent from './conditionContent.js';
import BigCharts from "../../common/bigCharts.js";
import BrandPrefixNav from "./brandPrefixNav.js";
import Haschoose from "../hasChoose.js";
import NavTitle from "./navTitle.js";
import DataDeal from "../../common/datadeal.js";
import $ from "jquery";
import './equip.less'

var FileContent = React.createClass({
    getInitialState: function () {
        return {
            equipList:this.props.equipList,//所有的数据
            resultList:[],//筛选的数据
            searchContent:'',//搜索内容
            filterType:'按品牌',//按品牌还是按级别,
            HZZZList:[],//所有性质列表
            segmentList: [],//所有级别列表
            bodyList:[],//所有车身列表
            fuelList:[],//所有燃油列表
            selectedHZZZList:[],//选中的性质集合
            selectedSegmentList:[],
            selectedBodyList:[],
            selectedFuelList:[],
            selectedSubSegmentList:[],
            selectedBrandList:[],
            selectedOEMList:[],
            selectedBrandPrefixList:[],
            allConditions:[],
            hasChooseList:this.props.hasChooseList,//已选级别
            selectedOrCancelflag:0
        }
    },
    componentDidMount:function(){
        this.setState({resultList:this.props.equipList});
        this.getData(this.props.equipList);
    },
    componentWillReceiveProps:function(nextprops){
        this.getData(nextprops.equipList);
        this.setState({equipList:nextprops.equipList,hasChooseList:nextprops.hasChooseList});
    },
    getData:function(equipList){
        //获取所有性质、级别、车身、燃油列表
        let HZZZList=DataDeal.getConditionList(equipList,'HZZZ');
        let segmentList=DataDeal.getConditionList(equipList,'Segment');
        let bodyList=DataDeal.getConditionList(equipList,'BodyType');
        let fuelList=DataDeal.getConditionList(equipList,'Fuel');
        let allConditions=[{ "性质":HZZZList},{"级别":segmentList},{"车身":bodyList},{"燃油":fuelList}];

        this.setState({allConditions:allConditions,HZZZList:HZZZList,segmentList:segmentList,bodyList:bodyList,fuelList:fuelList});
    },
    handleSearch:function(searchContent, status){
        let allLists=[], searchResult=[];
        searchContent==''? allLists=this.state.equipList : allLists=this.state.resultList;
        searchResult=DataDeal.fuzzySearch(allLists,searchContent);
        this.setState({searchContent: searchContent,resultList:searchResult});
    },
    chooseFilterType:function(e){
        let thisInnerText=$(e.target).text();
        this.setState({filterType:thisInnerText});
        $('.filter-btn-group div').removeClass('btn-active');
        $(e.target).addClass('btn-active');
    },   //首字母筛选品牌
    chooseBrandPrefix:function(content,clickType){
        let dataList=this.state.equipList;
        let equipListArry=[];
        let selectedHZZZList=this.state.selectedHZZZList, selectedSegmentList=this.state.selectedSegmentList;
        let selectedBodyList=this.state.selectedBodyList,selectedFuelList=this.state.selectedFuelList;
        let selectedSubSegmentList=this.state.selectedSubSegmentList,selectedBrandList=this.state.selectedBrandList;
        let selectedOEMList=this.state.selectedOEMList,selectedBrandPrefixList=this.state.selectedBrandPrefixList;

        if(clickType=='add'){
            selectedBrandPrefixList.push(content);
        }else{
            selectedBrandPrefixList = DataDeal.removeByValue(selectedBrandPrefixList,content);
        }

        equipListArry=DataDeal.selectedCondition(selectedHZZZList,selectedSegmentList,selectedBodyList,selectedFuelList,selectedSubSegmentList,selectedBrandList,selectedOEMList,selectedBrandPrefixList,dataList);

        this.setState({selectedHZZZList:selectedHZZZList,resultList:equipListArry,selectedHZZZ:content});
    },
    //条件选择
    selectedCellCondition:function(content,clickType,conditionTypeInnerText){
        let dataList=this.state.equipList;
        var allConditions=[],equipListArry=[];
        var segmentList=[],bodyList=[],fuelList=[],equipListArry=[];
        var initSegmentList=this.state.segmentList,initBodyList=this.state.bodyList,initFuelList=this.state.fuelList;
        var selectedHZZZList=this.state.selectedHZZZList, selectedSegmentList=this.state.selectedSegmentList;
        var selectedBodyList=this.state.selectedBodyList, selectedFuelList=this.state.selectedFuelList;
        var selectedSubSegmentList=this.state.selectedSubSegmentList, selectedBrandList=this.state.selectedBrandList;
        var selectedOEMList=this.state.selectedOEMList, selectedBrandPrefixList=this.state.selectedBrandPrefixList;

        if(clickType=='add'){
            switch (conditionTypeInnerText){
                case "性质": selectedHZZZList.push(content);
                    break;
                case "级别":selectedSegmentList.push(content);
                    break;
                case "车身":selectedBodyList.push(content);
                    break;
                case "燃油":selectedFuelList.push(content);
                    break;
                case "子级别":selectedSubSegmentList.push(content);
                    break;
            }
        }

        if(clickType=='remove'){
            switch (conditionTypeInnerText){
                case "性质":  selectedHZZZList = DataDeal.removeByValue(selectedHZZZList,content);
                    break;
                case "级别": selectedSegmentList = DataDeal.removeByValue(selectedSegmentList,content);
                    break;
                case "车身": selectedBodyList = DataDeal.removeByValue(selectedBodyList,content);
                    break;
                case "燃油": selectedFuelList = DataDeal.removeByValue(selectedFuelList,content);
                    break;
                case "子级别": selectedSubSegmentList = DataDeal.removeByValue(selectedSubSegmentList,content);
                    break;
            }
        }

        if(clickType=='noLimit'){
            switch (conditionTypeInnerText){
                case "性质": selectedHZZZList=[];
                    break;
                case "级别":selectedSegmentList=[];
                    selectedSubSegmentList=[];
                    break;
                case "车身":selectedBodyList=[];
                    break;
                case "燃油":selectedFuelList=[];
                    break;
                case "子级别": selectedSubSegmentList =[];
                    break;
            }
        }

        equipListArry=DataDeal.selectedCondition(selectedHZZZList,selectedSegmentList,selectedBodyList,selectedFuelList,selectedSubSegmentList,selectedBrandList,selectedOEMList,selectedBrandPrefixList,dataList);

        //该条件下的车的级别、车身、燃油
        for(var j=0;j<equipListArry.length;j++){
            segmentList.push(equipListArry[j].Segment);
            bodyList.push(equipListArry[j].BodyType);
            fuelList.push(equipListArry[j].Fuel);
        }
        segmentList = DataDeal.unique(segmentList);
        bodyList = DataDeal.unique(bodyList);
        fuelList = DataDeal.unique(fuelList);

        if(clickType=='add'){
            if(conditionTypeInnerText=='级别'||conditionTypeInnerText=='子级别'){
                segmentList=initSegmentList;
            }
            if(conditionTypeInnerText=='车身'){
                segmentList=initSegmentList;
                bodyList=initBodyList;
            }
            if(conditionTypeInnerText=='燃油'){
                segmentList=initSegmentList;
                bodyList=initBodyList;
                fuelList=initFuelList;
            }
        }
        if(clickType=='remove'){
            if(conditionTypeInnerText=='级别'){
                selectedSegmentList.length==0?segmentList=segmentList:segmentList=initSegmentList;
            }
            if(conditionTypeInnerText=='子级别'){
                segmentList=initSegmentList;
            }
            if(conditionTypeInnerText=='车身'){
                segmentList=initSegmentList;
                selectedBodyList.length==0?bodyList=bodyList:bodyList=initBodyList;
            }
            if(conditionTypeInnerText=='燃油'){
                segmentList=initSegmentList;
                bodyList=initBodyList;
                selectedFuelList.length==0?fuelList=fuelList:fuelList=initFuelList;
            }
        }

        allConditions=[{ "性质": this.state.HZZZList},{ "级别": DataDeal.unique(segmentList)},{ "车身": bodyList},{ "燃油": fuelList}];

        this.setState({allConditions:allConditions,resultList:equipListArry});
        this.setState({segmentList:segmentList,bodyList:bodyList,fuelList:fuelList});
        this.setState({selectedHZZZList:selectedHZZZList,selectedSegmentList:selectedSegmentList,selectedBodyList:selectedBodyList,selectedFuelList:selectedFuelList,
            selectedSubSegmentList:selectedSubSegmentList,selectedBrandList:selectedBrandList,selectedOEMList:selectedOEMList,selectedBrandPrefixList:selectedBrandPrefixList
        });
    },
    //选择车系
    chooseContent:function(chooseContent,flag){
        this.setState({hasChooseList:chooseContent,selectedOrCancelflag:flag});
    },
    render:function(){
        let conditionLists=[], allConditions=this.state.allConditions;
        for(let item in allConditions){
            for(let item2 in allConditions[item]){
                conditionLists.push(<ConditionContent key={item2}  selectedCellCondition={this.selectedCellCondition} conditionTitle={item2} conditionContent={allConditions[item][item2]}/>);
            }
        }

        let filterType =this.state.filterType, navtitle;
        switch (filterType){
            case "按品牌":
                $('.nav-title').show();
                navtitle=(<BrandPrefixNav equipList={this.state.resultList} chooseContent={this.chooseContent}/>);
                break;
            case "按级别":
                $('.nav-title').hide();
                navtitle=(<NavTitle equipList={this.state.resultList} chooseContent={this.chooseContent}/>);
                break;
        }
        return (
            <div className="card-content">
                <div className="condition-body">
                    {/*查询条件(性质、级别、车身、燃油)*/}
                    {conditionLists}
                </div>
                {/*按品牌、级别*/}
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
                {/*已选条件*/}
                <Haschoose hasChooseList={this.state.hasChooseList}  selectedOrCancelflag={this.state.selectedOrCancelflag}/>
            </div>
        )
    }
});
export {FileContent as default}