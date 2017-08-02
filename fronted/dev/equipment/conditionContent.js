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
        return{
            conditionTitle:this.props.conditionTitle,
            conditionContent:this.props.conditionContent
        }
    },
    componentDidMount:function(){
        //this.setState({conditionTitle:this.props.conditionTitle,conditionContent:this.props.conditionContent});
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({conditionTitle:this.props.conditionTitle,conditionContent:this.props.conditionContent});
    },
    selectedCellCondition:function(e){
        var liText = $(e.target)[0].innerText;
        var conditionTypeInnerText=$(e.target).attr("data-parent");
        $(".condition-title span").removeClass("title-choose-active");

        if($(e.target).hasClass("choose-active")){
            $(e.target).removeClass("choose-active");
            //加载数据
            this.props.selectedCellCondition(liText,'remove',conditionTypeInnerText);
        }else{
            $(e.target).addClass("choose-active");
            //加载数据
            this.props.selectedCellCondition(liText,'add',conditionTypeInnerText);
        }

        if($(e.target).parent().find('.choose-active').length==0){
            $(e.target).parent().parent().parent().find('.no-limit').addClass("title-choose-active");
        }
    },
    chooseNoLimit:function(e){
        var typeInnerText=$(e.target).prev()[0].innerText;
        typeInnerText=typeInnerText.substring(0,typeInnerText.length-1);
        var conditionLi=$(e.target).parent().parent().find('.condition-ul li');
        for(var i=0;i<conditionLi.length;i++){
            if($(conditionLi[i]).hasClass('choose-active')){
                $(conditionLi[i]).removeClass('choose-active');
            }
        }
        this.props.chooseNoLimit(typeInnerText);
    },
    render:function(){
        let conditionItem=this.state.conditionContent.map(function(content,index){
            return( <li key={index} onClick={this.selectedCellCondition} data-parent={this.state.conditionTitle}>{content}</li>)
        }.bind(this));
        return (
            <div className="clearfix ">
                <div className="pull-left condition-title"><span className="conditonType">{this.state.conditionTitle}：</span><span className="title-choose-active no-limit" onClick={this.chooseNoLimit}>不限</span></div>
                <div className="pull-left">
                    <ul className='condition-ul'>
                        {conditionItem}
                    </ul>
                </div>
            </div>
        )
    }
});

export {ConditionContent as default}