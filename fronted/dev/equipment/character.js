/**
 * Created by Administrator on 2017/7/26.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import $ from "jquery";
import Ajax from "../common/ajax";
import API_URL from "../common/url";
import DataDeal from "../common/datadeal.js";
import './equip.less'

var Character = React.createClass({
    getInitialState:function(){
        return{}
    },
    componentDidMount:function(){
    },
    componentWillReceiveProps:function(nextprops){
    },
    characterCar:function(e){
        var liText = $(e.target)[0].innerText;
        $(".condition-title span").removeClass("title-choose-active");
        if($(e.target).hasClass("choose-active")){
            $(e.target).removeClass("choose-active");
            //加载数据
            this.props.characterSelectedList(liText,'remove');
        }else{
            $(e.target).addClass("choose-active");
            //加载数据
            this.props.characterSelectedList(liText,'add');
        }


        if($(".choose-active").length==0){
            $(".condition-title span").addClass("title-choose-active");
        }
    },
    chooseNoLimit:function(e){
        $(".condition-ul li").removeClass("choose-active");
        $(e.target).addClass("title-choose-active");
        this.props.charcterNolimit();
    },
    render:function(){
        return (
            <div className="clearfix condition-body">
                <div className="pull-left condition-title">性质：<span className="title-choose-active" onClick={this.chooseNoLimit}>不限</span></div>
                <div className="pull-left">
                    <ul className='condition-ul'>
                        <li onClick={this.characterCar}>合资</li>
                        <li onClick={this.characterCar}>自主</li>
                        <li onClick={this.characterCar}>进口</li>
                    </ul>
                </div>
            </div>
        )
    }
});

export {Character as default}