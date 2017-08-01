/**
 * Created by Administrator on 2017/7/31.
 */
import React from "react";
import {Link} from "react-router";

import SearchItem from "../common/searchItem/searchItem";
import Ajax from "../common/ajax";
import store from "../../reduxFile/store";
import ConditionContent from './conditionContent.js';
import Segmentbrand from './segmentbrand.js';
import Haschoose from "./hasChoose.js";
import DataDeal from "../common/datadeal.js";
import "./equip.less";

import $ from "jquery";
import API_URL from "../common/url";
import {Pagination ,message ,Modal ,Menu ,Dropdown, Tabs, Radio} from "antd";
const TabPane = Tabs.TabPane;

{/*添加 选车*/}
var EquipDetail = React.createClass({
    getInitialState: function () {
        return {
            visible: false,
            selectedHZZZ:[],//单个选中的性质
            selectedHZZZList:[],//选中的性质集合
            selectedSegment:[],//选中的级别，
            selectedSegmentList:[],
            selectedBody:[],//选中的车身，
            selectedBodyList:[],
            selectedFuel:[],//选中的燃油，
            selectedFuelList:[],
            chooseContent:'',//已选
            chooseType:'',//已选级别类型,
            segItemSelectedFlag:0,//选中单个级别
            selectedSubSegmentList:[],
            selectedBrandList:[],
            selectedOEMList:[],
            selectedBrandPrefixList:[],
            segmentList:[],//某种性质下所有级别列表
            bodyList:[],//某种性质下所有车身列表
            fuelList:[],//某种性质下所有燃油列表
            equipList:[],
            allConditions:[]
        }
    },
    componentDidMount: function () {
        this.getEquipList();
        var allConditions=DataDeal.getConditions();
        this.setState({allConditions:allConditions});
    },
    getEquipList:function(){
        Ajax({
            type: 'GET',
            url: API_URL.equipment.list,
            //data:{content:content},
            success: function(data) {
                var equipList=data.data.content;
                this.setState({equipList:equipList});
            }.bind(this)
        });
    },
    showModal:function() {
        this.setState({
            visible: true
        });
    },
    handleCancel:function() {
        this.setState({visible: false});
        this.cleanInput();
        this.props.cancelModal();
    },
    cleanInput:function(){
        this.setState({})
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.addOrModifyModalVisible) {
            this.setState({visible: true});
        }
    },
    characterSelectedList:function(content,clickType){
        this.getEquipList();
        var dataList=this.state.equipList;

        var segmentList=[],bodyList=[],fuelList=[],equipListArry=[];
        var selectedHZZZList=this.state.selectedHZZZList;
        var selectedSegmentList=this.state.selectedSegmentList;
        var selectedBodyList=this.state.selectedBodyList;
        var selectedFuelList=this.state.selectedFuelList;
        var selectedSubSegmentList=this.state.selectedSubSegmentList;
        var selectedBrandList=this.state.selectedBrandList;
        var selectedOEMList=this.state.selectedOEMList;
        var selectedBrandPrefixList=this.state.selectedBrandPrefixList;

        if(clickType=='add'){
            selectedHZZZList.push(content);
        }else{
            selectedHZZZList = DataDeal.removeByValue(selectedHZZZList,content);
        }

        equipListArry=DataDeal.selectedCondition(selectedHZZZList,selectedSegmentList,selectedBodyList,selectedFuelList,selectedSubSegmentList,selectedBrandList,selectedOEMList,selectedBrandPrefixList,dataList);

        //筛选该性质下的车的级别、车身、燃油
        for(var j=0;j<equipListArry.length;j++){
            segmentList.push(equipListArry[j].Segment);
            bodyList.push(equipListArry[j].BodyType);
            fuelList.push(equipListArry[j].Fuel);
        }
        segmentList = DataDeal.unique(segmentList);
        bodyList = DataDeal.unique(bodyList);
        fuelList = DataDeal.unique(fuelList);
        this.setState({selectedHZZZList:selectedHZZZList,equipList:equipListArry,selectedHZZZ:content,characterRelatedList:equipListArry,
            segmentList:segmentList,bodyList:bodyList,fuelList:fuelList,selectedFlag:1});
    },

    levelSelectedList:function(content,clickType){
        this.getEquipList();
        var dataList=this.state.equipList;

        var bodyList=this.state.bodyList,fuelList=[],equipListArry=[];
        var selectedHZZZList=this.state.selectedHZZZList;
        var selectedSegmentList=this.state.selectedSegmentList;
        var selectedBodyList=this.state.selectedBodyList;
        var selectedFuelList=this.state.selectedFuelList;
        var selectedSubSegmentList=this.state.selectedSubSegmentList;
        var selectedBrandList=this.state.selectedBrandList;
        var selectedOEMList=this.state.selectedOEMList;
        var selectedBrandPrefixList=this.state.selectedBrandPrefixList;

        if(clickType=='add'){
            selectedSegmentList.push(content);
            this.setState({segItemSelectedFlag:1,selectedSegmentList:selectedSegmentList});
        }else{
            selectedSegmentList = DataDeal.removeByValue(selectedSegmentList,content);
            this.setState({segItemSelectedFlag:0});
        }

        equipListArry=DataDeal.selectedCondition(selectedHZZZList,selectedSegmentList,selectedBodyList,selectedFuelList,selectedSubSegmentList,selectedBrandList,selectedOEMList,selectedBrandPrefixList,dataList);

        //筛选该性质下的车、车身、燃油
        for(var j=0;j<equipListArry.length;j++){
            bodyList.push(equipListArry[j].BodyType);
            fuelList.push(equipListArry[j].Fuel);
        }
        bodyList = DataDeal.unique(bodyList);
        fuelList = DataDeal.unique(fuelList);
        this.setState({selectedHZZZList:selectedHZZZList,equipList:equipListArry,selectedHZZZ:content,characterRelatedList:equipListArry,
            bodyList:bodyList,fuelList:fuelList,selectedFlag:1});
    },

    bodySelectedList:function(content,clickType){
        this.getEquipList();
        var dataList=this.state.equipList;
        var segmentList=[],fuelList=[],equipListArry=[];
        var selectedHZZZList=this.state.selectedHZZZList;
        var selectedSegmentList=this.state.selectedSegmentList;
        var selectedBodyList=this.state.selectedBodyList;
        var selectedFuelList=this.state.selectedFuelList;
        var selectedSubSegmentList=this.state.selectedSubSegmentList;
        var selectedBrandList=this.state.selectedBrandList;
        var selectedOEMList=this.state.selectedOEMList;
        var selectedBrandPrefixList=this.state.selectedBrandPrefixList;

        if(clickType=='add'){
            selectedBodyList.push(content);
            //this.setState({segItemSelectedFlag:1,selectedSegmentList:selectedSegmentList});
        }else{
            selectedBodyList = DataDeal.removeByValue(selectedBodyList,content);
        }

        equipListArry=DataDeal.selectedCondition(selectedHZZZList,selectedSegmentList,selectedBodyList,selectedFuelList,selectedSubSegmentList,selectedBrandList,selectedOEMList,selectedBrandPrefixList,dataList);

        //筛选该性质下的车的燃油
        for(var j=0;j<equipListArry.length;j++){
            segmentList.push(equipListArry[j].Segment);
            fuelList.push(equipListArry[j].Fuel);
        }
        segmentList = DataDeal.unique(segmentList);
        fuelList = DataDeal.unique(fuelList);
        this.setState({segmentList:segmentList,selectedHZZZList:selectedHZZZList,equipList:equipListArry,selectedHZZZ:content,characterRelatedList:equipListArry,
            fuelList:fuelList,selectedFlag:1});
    },
    oilSelectedList:function(content,clickType){
        this.getEquipList();
        var dataList=this.state.equipList;
        var segmentList=[],equipListArry=[];
        var selectedHZZZList=this.state.selectedHZZZList;
        var selectedSegmentList=this.state.selectedSegmentList;
        var selectedBodyList=this.state.selectedBodyList;
        var selectedFuelList=this.state.selectedFuelList;
        var selectedSubSegmentList=this.state.selectedSubSegmentList;
        var selectedBrandList=this.state.selectedBrandList;
        var selectedOEMList=this.state.selectedOEMList;
        var selectedBrandPrefixList=this.state.selectedBrandPrefixList;

        if(clickType=='add'){
            selectedFuelList.push(content);
        }else{
            selectedFuelList = DataDeal.removeByValue(selectedFuelList,content);
        }

        equipListArry=DataDeal.selectedCondition(selectedHZZZList,selectedSegmentList,selectedBodyList,selectedFuelList,selectedSubSegmentList,selectedBrandList,selectedOEMList,selectedBrandPrefixList,dataList);

        //筛选该性质下的车的燃油
        for(var j=0;j<equipListArry.length;j++){
            segmentList.push(equipListArry[j].Segment);
        }
        segmentList = DataDeal.unique(segmentList);
        this.setState({segmentList:segmentList,selectedHZZZList:selectedHZZZList,equipList:equipListArry,selectedHZZZ:content,
            characterRelatedList:equipListArry,selectedFlag:1});
    },

    chooseContent:function(chooseContent,chooseType){
        this.setState({chooseContent:chooseContent,chooseType:chooseType});
    },
    //首字母筛选品牌
    chooseBrandPrefix:function(content,clickType){
        this.getEquipList();
        var dataList=this.state.equipList;
        var equipListArry=[];
        var selectedHZZZList=this.state.selectedHZZZList;
        var selectedSegmentList=this.state.selectedSegmentList;
        var selectedBodyList=this.state.selectedBodyList;
        var selectedFuelList=this.state.selectedFuelList;
        var selectedSubSegmentList=this.state.selectedSubSegmentList;
        var selectedBrandList=this.state.selectedBrandList;
        var selectedOEMList=this.state.selectedOEMList;
        var selectedBrandPrefixList=this.state.selectedBrandPrefixList;

        if(clickType=='add'){
            selectedBrandPrefixList.push(content);
        }else{
            selectedBrandPrefixList = DataDeal.removeByValue(selectedBrandPrefixList,content);
        }

        equipListArry=DataDeal.selectedCondition(selectedHZZZList,selectedSegmentList,selectedBodyList,selectedFuelList,selectedSubSegmentList,selectedBrandList,selectedOEMList,selectedBrandPrefixList,dataList);

        this.setState({selectedHZZZList:selectedHZZZList,equipList:equipListArry,selectedHZZZ:content,
            characterRelatedList:equipListArry});
    },
    //级别不限
    levelNoLimit:function(){
        let segmentList=["A","A0","A00", "B","BUS", "C" , "D", "Picup"];
        this.setState({segmentList:segmentList});
    },
    //性质不限
    charcterNolimit:function(){

    },
    submitModifyOrAddStu: function () {
    },
    render(){
        return (
            <Modal
                visible={this.state.visible}
                title={'www'}
                onCancel={this.handleCancel}
                width={1000}
                wrapClassName="modifyPasswordModal infoModal"
                maskClosable={false}
                onOk={this.submitModifyOrAddStu}>
                <form  id="modifyOrAddForm">
                    {/*条件选车tab*/}
                    <div className="card-container">
                        <Tabs type="card">
                            <TabPane tab="竞品组" key="1">
                            </TabPane>

                            <TabPane tab="条件选车" key="2">
                                {/*条件*/}
                                <div className="card-content">
                                    {/*查询条件*/}
                                 <ConditionContent allConditions={this.state.allConditions} selectedHZZZList={this.state.selectedHZZZList} charcterNolimit={this.charcterNolimit} characterSelectedList={this.characterSelectedList} equipList={this.state.equipList}/>
                                </div>
                                {/*按品牌、级别*/}
                                <Segmentbrand chooseBrandPrefix={this.chooseBrandPrefix} equipList={this.state.equipList} selectedSegmentList={this.state.selectedSegmentList} segItemSelectedFlag={this.state.segItemSelectedFlag}  segmentList={this.state.segmentList} chooseContent={this.chooseContent} selectedHZZZ={this.state.selectedHZZZ} selectedFuel={this.state.selectedFuel} selectedBody={this.state.selectedBody} selectedSegment={this.state.selectedSegment}/>
                                {/*已选条件*/}
                                <Haschoose  chooseContent={this.state.chooseContent} chooseType={this.state.chooseType}/>
                            </TabPane>
                        </Tabs>
                    </div>
                </form>
            </Modal>
        )
    }
});

export {EquipDetail as default}