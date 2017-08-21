/**
 * Created by Administrator on 2017/7/26.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import {Row,Col,Icon} from "antd";
import DataDeal from "../common/datadeal.js";
import store from "../../reduxFile/store";
import {allEquipJsonData} from "../../reduxFile/actions";
import $ from "jquery";
import './fileds/equip.less'

var Haschoose = React.createClass({
    getInitialState: function () {
        return {
            hasChooseList:this.props.hasChooseList,
            selectedOrCancelflag:0
        }
    },
    componentWillReceiveProps:function(nextprops){
        let hasChooseList=this.state.hasChooseList;
        if(nextprops.selectedOrCancelflag==0){
            hasChooseList= DataDeal.sorSplice(hasChooseList,nextprops.hasChooseList);
        }
        if(nextprops.selectedOrCancelflag==1){
            hasChooseList=hasChooseList.concat(nextprops.hasChooseList);
            //数组对象去重
            let hash = {};
            hasChooseList = hasChooseList.reduce(function(item, next) {
                hash[next.dataId] ?'': hash[next.dataId] = true && item.push(next);
                return item;
            }, []);
        }

        let conditions = {hasChooseList:hasChooseList};
        store.dispatch(allEquipJsonData(conditions));//存到store

        this.setState({hasChooseList:hasChooseList,selectedOrCancelflag:nextprops.selectedOrCancelflag});
    },
    modelDel:function(e){
        let allNode;
        let thisTabInnerText=$('.ant-tabs-tab-active').text();
        let thisId=$(e.target).parent().attr('id');
        let hasChooseList=this.state.hasChooseList;
        let selectedList=$('.selected');

        for(let i=0;i<selectedList.length;i++){
            let id=$(selectedList[i]).attr('id');
            if(thisId==id){
                if(thisTabInnerText=='竞品组'){
                    allNode= $(selectedList[i]).parent().prev().find('.all');
                }
                if(thisTabInnerText=='条件选车'){
                    //左部随之变化的样式
                    let selectedModel=$(selectedList[i]).parent().find('.selected');
                    let selectedModelLength=selectedModel.length;
                    if(selectedModelLength==1)
                    {
                        $(selectedList[i]).parent().parent().prev().removeClass('selectedSub');
                    }
                    allNode=$(selectedList[i]).parent().parent().parent().parent().prev().find('.all')
             }
                allNode.text("全选");
                $(selectedList[i]).removeClass('selected');
                break;
            }
        }

        for(let i=0;i<hasChooseList.length;i++){
            if(hasChooseList[i].id==thisId){
                hasChooseList.splice(i,1);
                break;
            }
        }
        this.setState({hasChooseList:hasChooseList});
    },
    delAll:function(e){
        $('.model-li').removeClass('selected');
        $('.ant-col-2').removeClass('selectedSub');
        $('.chk').removeClass('selected');
        for(let i=0;i<$('.all').length;i++){
            $($('.all')[i]).text("全选");
        }
        this.setState({hasChooseList:[]});
    },
    render:function(){
        let chooseLi=this.state.hasChooseList.map(function(content,index){
            return(
                <li key={index} id={content.id} data-id={content.dataId}>
                    <span className="licontent">{content.modelValue}</span>
                    <span onClick={this.modelDel}>×</span>
                </li>
            )
        }.bind(this));
        return (
            <div className="item-body border has-choose">
                <div className="item-body">
                    <Row>
                        <Col span={3}>已选条件：
                            <Icon type="delete" onClick={this.delAll}/>
                        </Col>
                        <Col span={9}>
                            <ul className="has-choose-ul">
                                {chooseLi}
                            </ul>
                        </Col>
                    </Row>
                </div>
            </div>
        )
    }
});
export {Haschoose as default}