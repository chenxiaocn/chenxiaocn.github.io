/**
 * Created by Administrator on 2017/7/31.
 */
import React from "react";
import ReactDOM from 'react-dom'
import Ajax from "../common/ajax";
import store from "../../reduxFile/store";
import {allEquipJsonData} from "../../reduxFile/actions";
import ConditionContent from './fileds/conditionContent.js';
import Segmentbrand from './fileds/segmentbrand.js';
import Haschoose from "./hasChoose.js";
import CompareContent from "./compare/compareContent.js";
import DataDeal from "../common/datadeal.js";
import "./equip.less";

import $ from "jquery";
import API_URL from "../common/url";
import {Modal ,Menu ,Tabs, Radio,Button} from "antd";
const TabPane = Tabs.TabPane;

{/*添加 选车*/}
var EquipDetail = React.createClass({
    getInitialState: function () {
        let equipListConditions = store.getState().allEquipJsonDataState ;
        let hasChooseList=equipListConditions.hasChooseList;
        let historyList=equipListConditions.historyList;
        return {
            visible: false,
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
            resultList:[],//所有的车系数据
            allConditions:[],
            hasChooseList:hasChooseList,//已选级别
            selectedOrCancelflag:0,
            historyList:historyList//最近浏览
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
                let resultList=data.data.content;
                let conditions = {equipList : resultList };
                store.dispatch(allEquipJsonData(conditions));//存到store

                //获取所有性质、级别、车身、燃油列表
                let HZZZList=DataDeal.getConditionList(resultList,'HZZZ');
                let segmentList=DataDeal.getConditionList(resultList,'Segment');
                let bodyList=DataDeal.getConditionList(resultList,'BodyType');
                let fuelList=DataDeal.getConditionList(resultList,'Fuel');
                let allConditions=[{ "性质":HZZZList},{"级别":segmentList},{"车身":bodyList},{"燃油":fuelList}];

                this.setState({resultList:resultList,allConditions:allConditions,HZZZList:HZZZList,segmentList:segmentList,bodyList:bodyList,fuelList:fuelList});
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
        let equipListConditions = store.getState().allEquipJsonDataState ;
        var dataList=equipListConditions.equipList;
        var equipListArry=[];
        var selectedHZZZList=this.state.selectedHZZZList, selectedSegmentList=this.state.selectedSegmentList;
        var selectedBodyList=this.state.selectedBodyList,selectedFuelList=this.state.selectedFuelList;
        var selectedSubSegmentList=this.state.selectedSubSegmentList,selectedBrandList=this.state.selectedBrandList;
        var selectedOEMList=this.state.selectedOEMList,selectedBrandPrefixList=this.state.selectedBrandPrefixList;

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
        let equipListConditions = store.getState().allEquipJsonDataState ;
        let dataList=equipListConditions.equipList;
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
    callback:function(key){
        if(key=="1"){
            let equipListConditions = store.getState().allEquipJsonDataState ;
            let historyList=equipListConditions.historyList;
            this.setState({historyList:historyList});
        }
    },
    submitModifyOrAdd: function (e) {
        //条件选车“已选条件”为竞品组的“最近浏览”
        let thisTabInnerText=$('.ant-tabs-tab-active').text();
        if(thisTabInnerText=='条件选车'){
            let conditions = {historyList : this.state.hasChooseList };
            store.dispatch(allEquipJsonData(conditions));//存到store
            this.setState({historyList:this.state.hasChooseList,selectedOrCancelflag:2});
        }

        //获取厂商Model号
        let OEMModelIDs=[];
        let choooseLi=$('.has-choose-ul li');
        for(let i=0;i<choooseLi.length;i++){
            OEMModelIDs.push($($(choooseLi)[i]).attr('data-id'));
        }
        console.log(OEMModelIDs);
    },
    render(){
        let conditionLists=[], allConditions=this.state.allConditions;
        for(var item in allConditions){
            for(var item2 in allConditions[item]){
                conditionLists.push(<ConditionContent key={item2}  selectedCellCondition={this.selectedCellCondition} conditionTitle={item2} conditionContent={allConditions[item][item2]}/>
                );
            }
        }
        return (
            <Modal
                visible={this.state.visible}
                title={'选择车系'}
                onCancel={this.handleCancel}
                width={1000}
                wrapClassName="modifyPasswordModal infoModal"
                maskClosable={false}
                onOk={this.submitModifyOrAdd}
                footer={[
                <Button key="submit" type="primary" size="large" onClick={this.submitModifyOrAdd}>确定</Button>,
                <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>
                ]}
                >
                <form  id="modifyOrAddForm">
                    {/*条件选车tab*/}
                    <div className="card-container">
                        <Tabs type="card" defaultActiveKey="1" onChange={this.callback}>
                            <TabPane tab="竞品组" key="1">
                                <CompareContent  historyList={this.state.historyList}/>
                            </TabPane>
                            <TabPane tab="条件选车" key="2">
                                {/*条件*/}
                                <div className="card-content">
                                    <div className="condition-body">
                                        {/*查询条件(性质、级别、车身、燃油)*/}
                                        {conditionLists}
                                    </div>
                                    {/*按品牌、级别*/}
                                    <Segmentbrand chooseBrandPrefix={this.chooseBrandPrefix}   equipList={this.state.resultList} chooseContent={this.chooseContent}/>
                                    {/*已选条件*/}
                                    <Haschoose hasChooseList={this.state.hasChooseList}  selectedOrCancelflag={this.state.selectedOrCancelflag}/>
                                </div>
                            </TabPane>
                        </Tabs>
                    </div>
                </form>
            </Modal>
        )
    }
});

export {EquipDetail as default}