/**
 * Created by Administrator on 2017/7/31.
 */
import React from "react";
import ReactDOM from 'react-dom'
import Ajax from "../common/ajax";
import store from "../../reduxFile/store";
import {allEquipJsonData} from "../../reduxFile/actions";
import FileContent from './fileds/fileContent.js';
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
            resultList:[],//所有的车系数据
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

                this.setState({resultList:resultList});
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
                                <FileContent  equipList={this.state.resultList} hasChooseList={this.state.hasChooseList}/>
                            </TabPane>
                        </Tabs>
                    </div>
                </form>
            </Modal>
        )
    }
});

export {EquipDetail as default}

//<div className="card-content">
//    <div className="condition-body">
//        {/*查询条件(性质、级别、车身、燃油)*/}
//        {conditionLists}
//    </div>
//    {/*按品牌、级别*/}
//    <FileContent chooseBrandPrefix={this.chooseBrandPrefix}   equipList={this.state.resultList} chooseContent={this.chooseContent}/>
//    {/*已选条件*/}
//    <Haschoose hasChooseList={this.state.hasChooseList}  selectedOrCancelflag={this.state.selectedOrCancelflag}/>
////</div>