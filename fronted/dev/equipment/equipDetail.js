/**
 * Created by Administrator on 2017/7/31.
 */
import React from "react";
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
            hasChooseList:[],//已选级别
            segItemSelectedFlag:0,//选中单个级别
            selectedSubSegmentList:[],
            selectedBrandList:[],
            selectedOEMList:[],
            selectedBrandPrefixList:[],
            selectedOrCancelflag:0,
            segmentList: ["A","A0","A00", "B","BUS", "C" , "D", "Pickup"],//某种性质下所有级别列表
            bodyList:["NB","HB","SUV", "MPV","CROSS", "SW" , "C0", "CA", "BUS", "Pickup"],//某种性质下所有车身列表
            fuelList:[ "汽油","BEV","混合动力", "插电混合动力","柴油", "汽油/CNG" , "CNG"],//某种性质下所有燃油列表
            carListData:[],//所有的车系数据
            allConditions:[
                { "性质": ['自主','合资','进口']},
                { "级别": ["A","A0","A00", "B","BUS", "C" , "D", "Pickup"]},
                { "车身": ["NB","HB","SUV", "MPV","CROSS", "SW" , "C0", "CA", "BUS", "Pickup"]},
                { "燃油": [ "汽油","BEV","混合动力", "插电混合动力","柴油", "汽油/CNG" , "CNG"]}
            ]
        }
    },
    componentDidMount: function () {
        this.getJsonData();
    },
    getJsonData:function(){
        Ajax({
            type: 'GET',
            url: API_URL.equipment.list,
            //data:{content:content},
            success: function(data) {
                var carListData=data.data.content;
                this.setState({carListData:carListData});
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
        this.props.cancelModal();
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.addOrModifyModalVisible) {
            this.setState({visible: true});
        }
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
    chooseNoLimit:function(type){
        this.changeCondition(type);
    },
    //条件选择
    selectedCellCondition:function(content,clickType,conditionTypeInnerText){
        this.getJsonData();
        var dataList=this.state.carListData;
        var allConditions=this.state.allConditions;

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
            switch (conditionTypeInnerText){
                case "性质": selectedHZZZList.push(content);
                    break;
                case "级别":selectedSegmentList.push(content);
                    break;
                case "车身":selectedBodyList.push(content);
                    break;
                case "燃油":selectedFuelList.push(content);
                    break;
            }
        }else{
            switch (conditionTypeInnerText){
                case "性质":  selectedHZZZList = DataDeal.removeByValue(selectedHZZZList,content);
                    break;
                case "级别": selectedSegmentList = DataDeal.removeByValue(selectedSegmentList,content);
                    break;
                case "车身": selectedBodyList = DataDeal.removeByValue(selectedBodyList,content);
                    break;
                case "燃油": selectedFuelList = DataDeal.removeByValue(selectedFuelList,content);
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

        if(conditionTypeInnerText=='级别'){
            allConditions=[
                { "性质": ['自主','合资','进口']},
                { "级别": ["A","A0","A00", "B","BUS", "C" , "D", "Pickup"]},
                { "车身": bodyList},
                { "燃油": fuelList}
            ];
        }
        if(conditionTypeInnerText=='车身'){
            allConditions=[
                { "性质": ['自主','合资','进口']},
                { "级别": ["A","A0","A00", "B","BUS", "C" , "D", "Pickup"]},
                { "车身": ["NB","HB","SUV", "MPV","CROSS", "SW" , "C0", "CA", "BUS", "Pickup"]},
                { "燃油": fuelList}
            ];
        }
        if(conditionTypeInnerText=='燃油'){
            allConditions=[
                { "性质": ['自主','合资','进口']},
                { "级别": ["A","A0","A00", "B","BUS", "C" , "D", "Pickup"]},
                { "车身": ["NB","HB","SUV", "MPV","CROSS", "SW" , "C0", "CA", "BUS", "Pickup"]},
                { "燃油": [ "汽油","BEV","混合动力", "插电混合动力","柴油", "汽油/CNG" , "CNG"]}
            ];
        }if(conditionTypeInnerText=='性质'){
            allConditions=[
                { "性质": ['自主','合资','进口']},
                { "级别": segmentList},
                { "车身": bodyList},
                { "燃油": fuelList}
            ];
        }
        this.setState({segmentList:segmentList,bodyList:bodyList,fuelList:fuelList});
        this.setState({selectedHZZZList:selectedHZZZList,selectedSegmentList:selectedSegmentList,selectedBodyList:selectedBodyList,selectedFuelList:selectedFuelList,
            selectedSubSegmentList:selectedSubSegmentList,selectedBrandList:selectedBrandList,selectedOEMList:selectedOEMList,selectedBrandPrefixList:selectedBrandPrefixList
        });
        this.setState({allConditions:allConditions,carListData:equipListArry});
    },

    changeCondition:function(type){
        this.getJsonData();
        var dataList=this.state.carListData;
        var allConditions=this.state.allConditions;
        var segmentList=[],bodyList=[],fuelList=[],equipListArry=[];

        var selectedHZZZList=this.state.selectedHZZZList;
        var selectedSegmentList=this.state.selectedSegmentList;
        var selectedBodyList=this.state.selectedBodyList;
        var selectedFuelList=this.state.selectedFuelList;
        var selectedSubSegmentList=this.state.selectedSubSegmentList;
        var selectedBrandList=this.state.selectedBrandList;
        var selectedOEMList=this.state.selectedOEMList;
        var selectedBrandPrefixList=this.state.selectedBrandPrefixList;

        switch (type){
            case "性质":selectedHZZZList=[];
                break;
            case "级别":selectedSegmentList=[];
                break;
            case "车身":selectedBodyList=[];
                break;
            case "燃油":selectedFuelList=[];
                break;
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
        if(type=='级别'){
            allConditions=[
                { "性质": ['自主','合资','进口']},
                { "级别": ["A","A0","A00", "B","BUS", "C" , "D", "Pickup"]},
                { "车身": bodyList},
                { "燃油": fuelList}
            ];
        }
        if(type=='车身'){
            allConditions=[
                { "性质": ['自主','合资','进口']},
                { "级别": ["A","A0","A00", "B","BUS", "C" , "D", "Pickup"]},
                { "车身": ["NB","HB","SUV", "MPV","CROSS", "SW" , "C0", "CA", "BUS", "Pickup"]},
                { "燃油": fuelList}
            ];
        }
        if(type=='燃油'){
            allConditions=[
                { "性质": ['自主','合资','进口']},
                { "级别": ["A","A0","A00", "B","BUS", "C" , "D", "Pickup"]},
                { "车身": ["NB","HB","SUV", "MPV","CROSS", "SW" , "C0", "CA", "BUS", "Pickup"]},
                { "燃油": [ "汽油","BEV","混合动力", "插电混合动力","柴油", "汽油/CNG" , "CNG"]}
            ];
        }if(type=='性质'){
            allConditions=[
                { "性质": ['自主','合资','进口']},
                { "级别": segmentList},
                { "车身": bodyList},
                { "燃油": fuelList}
            ];
        }
        this.setState({segmentList:segmentList,bodyList:bodyList,fuelList:fuelList});
        this.setState({selectedHZZZList:selectedHZZZList,selectedSegmentList:selectedSegmentList,selectedBodyList:selectedBodyList,selectedFuelList:selectedFuelList,
            selectedSubSegmentList:selectedSubSegmentList,selectedBrandList:selectedBrandList,selectedOEMList:selectedOEMList,selectedBrandPrefixList:selectedBrandPrefixList
        });
        this.setState({allConditions:allConditions,carListData:equipListArry});
    },
    //选择车系
    chooseContent:function(chooseContent,flag){
        this.setState({hasChooseList:chooseContent,selectedOrCancelflag:flag});
    },
    submitModifyOrAddStu: function () {
    },
    render(){
        let conditionLists=[], allConditions=this.state.allConditions;
        for(var item in allConditions){
            for(var item2 in allConditions[item]){
                conditionLists.push(<ConditionContent key={item2} chooseNoLimit={this.chooseNoLimit} selectedCellCondition={this.selectedCellCondition} conditionTitle={item2} conditionContent={allConditions[item][item2]}/>
                );
            }
        }
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
                                    <div className="condition-body">
                                        {/*查询条件(性质、级别、车身、燃油)*/}
                                        {conditionLists}
                                    </div>
                                </div>
                                {/*按品牌、级别*/}
                                <Segmentbrand chooseBrandPrefix={this.chooseBrandPrefix}  segmentList={this.state.segmentList}  equipList={this.state.carListData} selectedSegmentList={this.state.selectedSegmentList} segItemSelectedFlag={this.state.segItemSelectedFlag}
                                               chooseContent={this.chooseContent} selectedHZZZ={this.state.selectedHZZZ} selectedFuel={this.state.selectedFuel}
                                               selectedBody={this.state.selectedBody} selectedSegment={this.state.selectedSegment}/>
                                {/*已选条件*/}
                                <Haschoose hasChooseList={this.state.hasChooseList}  selectedOrCancelflag={this.state.selectedOrCancelflag}/>
                            </TabPane>
                        </Tabs>
                    </div>
                </form>
            </Modal>
        )
    }
});

export {EquipDetail as default}