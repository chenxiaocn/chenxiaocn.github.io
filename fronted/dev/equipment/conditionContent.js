/**
 * Created by Administrator on 2017/7/31.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import $ from "jquery";
import Ajax from "../common/ajax";
import API_URL from "../common/url";
import DataDeal from "../common/datadeal.js";
import './equip.less'

var ConditionContent = React.createClass({
    getInitialState:function(){
        return{allConditions:this.props.allConditions,
            conditionKeys:[],//条件名
            conditionValues:[]//每一个条件对应的全部内容，即不限情况下
        }
    },
    componentDidMount:function(){
        this.setState({allConditions:this.props.allConditions});
        this.getConditionKeyValue(this.props.allConditions);
    },
    getConditionKeyValue:function(allConditions){
        this.setState({conditionKeys:allConditions[0]});
        this.setState({conditionValues:allConditions[1]});
    },
    componentWillReceiveProps:function(nextprops){
    },

    render:function(){
        let chooseLi=this.state.allConditions.map(function(content,index){
            return(
                <div className="clearfix ">
                    <div className="pull-left condition-title">性质：<span className="title-choose-active" onClick={this.chooseNoLimit}>不限</span></div>
                    <div className="pull-left">
                        <ul className='condition-ul'>
                            <li>合资</li>
                            <li>自主</li>
                            <li>进口</li>
                        </ul>
                    </div>
                </div>
            )
        }.bind(this));
        return (
            <div className="condition-body">
                <div className="clearfix ">
                    <div className="pull-left condition-title">性质：<span className="title-choose-active" onClick={this.chooseNoLimit}>不限</span></div>
                    <div className="pull-left">
                        <ul className='condition-ul'>
                            <li>合资</li>
                            <li>自主</li>
                            <li>进口</li>
                        </ul>
                    </div>
                </div>
                <div className="clearfix ">
                    <div className="pull-left condition-title">性质：<span className="title-choose-active" onClick={this.chooseNoLimit}>不限</span></div>
                    <div className="pull-left">
                        <ul className='condition-ul'>
                            <li>合资</li>
                            <li>自主</li>
                            <li>进口</li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
});

export {ConditionContent as default}