/**
 * Created by Administrator on 2017/7/31.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import { Menu, Dropdown, Icon } from 'antd';
import $ from "jquery";
import Ajax from "../common/ajax";
import API_URL from "../common/url";
import DataDeal from "../common/datadeal.js";
import EquipData from "./equipData.js";
import './equip.less'

var ConditionContent = React.createClass({
    getInitialState:function(){
        return{
            conditionTitle:[],
            conditionContent:[]
        }
    },
    componentDidMount:function(){
        this.setState({conditionTitle:this.props.conditionTitle,conditionContent:this.props.conditionContent});
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({conditionTitle:nextprops.conditionTitle,conditionContent:nextprops.conditionContent});
    },
    selectedCellCondition:function(liText,clickType,conditionTypeInnerText){
        this.props.selectedCellCondition(liText,clickType,conditionTypeInnerText);
    },
    chooseNoLimit:function(e){
        var liText = $(e.target)[0].innerText;
        var typeInnerText=$(e.target).prev()[0].innerText;//所属筛选条件
        typeInnerText=typeInnerText.substring(0,typeInnerText.length-1);
        var conditionLi=$(e.target).parent().parent().find('.condition-ul li');
        if(!($(e.target).hasClass('title-choose-active'))){
            $(e.target).addClass('title-choose-active');
            //如，性质下所有li，自主、合资、进口
            for(var i=0;i<conditionLi.length;i++){
                if($(conditionLi[i]).hasClass('choose-active')){
                    $(conditionLi[i]).removeClass('choose-active');
                }
            }
            this.props.selectedCellCondition(liText,'noLimit',typeInnerText);
        }
    },
    render:function(){
        let conditonType=DataDeal.getId(this.state.conditionTitle);
        let conditionItem=this.state.conditionContent.map(function(content,index){
            return(
                <ConditionLi key={index} selectedCellCondition={this.selectedCellCondition} conditionTitle={this.state.conditionTitle} content={content}/>
            )
        }.bind(this));
        return (
            <div className="clearfix row" id={conditonType}>
                <div className="pull-left condition-title">
                    <span className="conditonType">{this.state.conditionTitle}：</span>
                    <span className="title-choose-active no-limit" onClick={this.chooseNoLimit}>不限</span>
                </div>
                <div className="pull-left">
                    <ul className='condition-ul'>
                        {conditionItem}
                    </ul>
                </div>
            </div>
        )
    }
});

var ConditionLi=React.createClass({
    getInitialState: function () {
        return {
            content:[],
            conditionTitle:[]
        }
    },
    componentDidMount: function () {
        this.setState({content:this.props.content,conditionTitle:this.props.conditionTitle});
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({content:nextProps.content,conditionTitle:nextProps.conditionTitle});
    },
    selectedCellCondition:function(e){
        var liText = $(e.target)[0].innerText;
        var conditionTypeInnerText=this.state.conditionTitle;
        //“不限”添样式
        for(var i=0;i<$('.conditonType').length;i++)
        {
            var conditonTypeCellContent=$($('.conditonType')[i])[0].innerText;
            conditonTypeCellContent=conditonTypeCellContent.substring(0,conditonTypeCellContent.length-1);
            if(conditonTypeCellContent==conditionTypeInnerText){
                $($('.conditonType')[i]).next().removeClass("title-choose-active");
                break;
            }
        }

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
    subSegChoose:function(e){
        let liText = $(e.target)[0].innerText;
        let thisConditonType=$(e.target).attr('data-conditonType');
        let thisDataParent=$(e.target).attr('data-parent');
        let conditionTypeInnerText=this.state.conditionTitle;
        //“不限”添样式
        for(var i=0;i<$('.conditonType').length;i++)
        {
            var conditonTypeCellContent=$($('.conditonType')[i])[0].innerText;
            conditonTypeCellContent=conditonTypeCellContent.substring(0,conditonTypeCellContent.length-1);
            if(conditonTypeCellContent==conditionTypeInnerText){
                $($('.conditonType')[i]).next().removeClass("title-choose-active");
                break;
            }
        }

        if($(e.target).hasClass("choose-active")){
            $(e.target).removeClass("choose-active");
            let itemSelected=$(e.target).parent().find('.ant-dropdown-menu-item-selected');
            //加载数据
            this.props.selectedCellCondition(liText,'remove','子级别');

            //“不限”添样式

            for(var i=0;i<$('.conditonType').length;i++)
            {
                var conditonTypeCellContent=$($('.conditonType')[i])[0].innerText;
                conditonTypeCellContent=conditonTypeCellContent.substring(0,conditonTypeCellContent.length-1);
                if(conditonTypeCellContent==conditionTypeInnerText){
                    var segLi=$($('.conditonType')[i]).parent().next().find('li');
                    for(var j=0;j<segLi.length;j++){
                        var segLiId=$(segLi[j]).attr('id');
                        if(thisDataParent==segLiId){
                          if(itemSelected.length==0){
                              $(segLi[j]).removeClass('choose-active');
                          }
                        }
                    }
                    var segItem=$($('.conditonType')[i]).parent().next().find('choose-active');
                    if(segItem.length==0){
                        $($('.conditonType')[i]).next().addClass("title-choose-active");
                    }
                    break;
                }
            }

        }else{
            for(var i=0;i<$('.conditonType').length;i++)
            {
                var conditonTypeCellContent=$($('.conditonType')[i])[0].innerText;
                conditonTypeCellContent=conditonTypeCellContent.substring(0,conditonTypeCellContent.length-1);
                if(conditonTypeCellContent==conditionTypeInnerText){
                   var segLi=$($('.conditonType')[i]).parent().next().find('li');
                    for(var j=0;j<segLi.length;j++){
                        var segLiId=$(segLi[j]).attr('id');
                        if(thisDataParent==segLiId){
                            if(!($(segLi[j]).hasClass("choose-active"))){
                                $(segLi[j]).addClass("choose-active");
                            }
                        }
                    }
                    break;
                }
            }

            $(e.target).addClass("choose-active");
            //加载数据
            this.props.selectedCellCondition(liText,'add','子级别');
        }
    },
    render: function () {
        let conditionTitle=this.state.conditionTitle;
        let content=this.state.content;
        let equipList=EquipData.getAllData();
        let subSegList=DataDeal.getSubSegList(equipList,content);//获取该级别下的子级别
        let conditonType=DataDeal.getId(conditionTitle);

        let menuItem=subSegList.map(function(content,index){
            return(
                <Menu.Item key={index}>
                    <p onClick={this.subSegChoose} data-parent={this.state.content} data-conditonType={conditonType}>{content}</p>
                </Menu.Item>
            );
        }.bind(this));

        let menu = (
            <Menu>
                {menuItem}
            </Menu>
        );

        if(conditionTitle=="级别"){
            return(
                <Dropdown overlay={menu}>
                    <li className="ant-dropdown-link" id={this.state.content} onClick={this.selectedCellCondition}>
                        {this.state.content}
                    </li>
                </Dropdown>
            );
        }else{
            return(<li onClick={this.selectedCellCondition}>{this.state.content}</li>)
        }
    }

});

export {ConditionContent as default}