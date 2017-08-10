/**
 * Created by Administrator on 2017/8/9.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import DataDeal from "../datadeal.js";
import $ from "jquery";
import './calendar.less';

var CalendarAdd = React.createClass({
    getInitialState: function () {
        return {
            selectedList:[]
        }
    },
    componentDidMount: function () {
        this.setState({selectedList:this.props.selectedList});
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({selectedList:nextprops.selectedList});
    },
    delSelected:function(e){
        var delSelected=$(e.target).prev()[0].innerText;
        let selectedList=this.state.selectedList;
        selectedList=DataDeal.removeByValue(selectedList,delSelected);
        this.setState({selectedList:selectedList});
    },
    render: function () {
        let camSelected=this.state.selectedList.map(function(content,index){
            return(
                <a href="javascript:void(0)" key={index}>
                    <span>{content}</span>
                    <b onClick={this.delSelected}></b>
                </a>
            );
        }.bind(this));

        return (
            <div>
                <div className="cam-addBtn">
                    <a href="">添加</a>
                </div>
                <div className="cam-selected">
                    {camSelected}
                </div>
            </div>
        );
    }
});
export {CalendarAdd as default}