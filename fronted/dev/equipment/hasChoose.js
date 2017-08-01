/**
 * Created by Administrator on 2017/7/26.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import {Row,Col,Icon} from "antd";
import Ajax from "../common/ajax";
import API_URL from "../common/url";
import DataDeal from "../common/datadeal.js";
import $ from "jquery";
import './equip.less'

var Haschoose = React.createClass({
    getInitialState: function () {
        return {
            modelList:[],
            chooseType:''
        }
    },
    componentDidMount:function(){

    },
    componentWillReceiveProps:function(nextprops){
        this.loadAlltData(nextprops.chooseContent,nextprops.chooseType);//全选
    },
    loadAlltData:function(chooseContent,chooseType){
        Ajax({
            type: 'GET',
            url: API_URL.equipment.list,
            //data:{content:content},
            success: function(data) {
                var dataList=data.data.content;
                var modelList=this.state.modelList;
                if(chooseType=='all'){
                    for(var i=0;i<dataList.length;i++){
                        if(dataList[i].Segment==chooseContent){
                            modelList.push(dataList[i].Model);
                        }
                    }
                }
                if(chooseType=='subSegment'){
                    for(var i=0;i<dataList.length;i++){
                        if(dataList[i].SubSegment==chooseContent){
                            modelList.push(dataList[i].Model);
                        }
                    }
                }
                modelList = DataDeal.unique(modelList);

                this.setState({modelList:modelList});
            }.bind(this)
        });
    },
    modelDel:function(e){
        var thisInnerText=$(e.target).prev()[0].innerText;
        for(var i=0;i< $('.model-li').length;i++){
            if(thisInnerText==$('.model-li')[i][0].innerText){
                $('.model-li')[i].removeClass('selected');
                break;
            }
        }
        $(e.target).parent().remove();
    },
    delAll:function(e){
        $('.model-li').removeClass('selected');
        $('.ant-col-2').removeClass('selectedSub');
        this.setState({modelList:[]});
    },
    render:function(){
        let chooseLi=this.state.modelList.map(function(content,index){
            return(
                <li key={index}>
                    <span className="licontent">{content}</span>
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