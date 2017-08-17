/**
 * Created by Administrator on 2017/7/26.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import {Row,Col,Icon} from "antd";
import DataDeal from "../common/datadeal.js";
import $ from "jquery";
import './equip.less'

var Haschoose = React.createClass({
    getInitialState: function () {
        return {
            hasChooseList:[],
            selectedOrCancelflag:0
        }
    },
    componentDidMount:function(){

    },
    componentWillReceiveProps:function(nextprops){
        var hasChooseList=this.state.hasChooseList;
        if(nextprops.selectedOrCancelflag==0){
            hasChooseList= DataDeal.sorSplice(hasChooseList,nextprops.hasChooseList);
        }else{
            hasChooseList=hasChooseList.concat(nextprops.hasChooseList);
        }
        this.setState({hasChooseList:hasChooseList,selectedOrCancelflag:nextprops.selectedOrCancelflag});
    },
    modelDel:function(e){
        var hasChooseList=this.state.hasChooseList;
        var thisInnerText=$(e.target).prev()[0].innerText;
        var thisId=$(e.target).parent().attr('id');

        for(let i=0;i<$('.selected').length;i++){
            if(thisInnerText==$('.selected')[i].innerText){
                $($('.selected')[i]).removeClass('selected');
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
        $('.all')[0].innerText="全选";
        this.setState({hasChooseList:[]});
    },
    render:function(){
        let chooseLi=this.state.hasChooseList.map(function(content,index){
            return(
                <li key={index} id={content.id} data-id={content.dataId}>
                    <span className="licontent">{content.modeValue}</span>
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