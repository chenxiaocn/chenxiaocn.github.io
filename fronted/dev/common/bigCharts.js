/**
 * Created by Administrator on 2017/8/3.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import DataDeal from "./datadeal.js";
import $ from "jquery";
import '../equipment/equip.less'

var BigCharts = React.createClass({
    getInitialState: function () {
        return {
            bigCharts:[]//26个大写字母
        }
    },
    componentDidMount: function () {
        var bigCharts=DataDeal.generateBig();
        this.setState({bigCharts:bigCharts});
    },
    componentWillReceiveProps:function(nextprops){
    },
    chooseBrandPrefix:function(e){
        var thisInnerText=$(e.target).text();
        if($(e.target).hasClass("choose-active")){
            $(e.target).removeClass("choose-active");
            //加载数据
            this.props.chooseBrandPrefix(thisInnerText,'remove');
        }else{
            $(e.target).addClass("choose-active");
            //加载数据
            this.props.chooseBrandPrefix(thisInnerText,'add');
        }
    },
    render: function () {
        let charLi=this.state.bigCharts.map(function(content,index){
            if(content == "E"||content == "I"||content == "P"||content == "U"||content == "V"){
                return(
                    <li key={index} className="disable">{content}</li>
                );
            }else{
                return(
                    <li key={index} onClick={this.chooseBrandPrefix}>{content}</li>
                );
            }
        }.bind(this));
        return (
            <ul>
                {charLi}
            </ul>
        );
    }
});
export {BigCharts as default}