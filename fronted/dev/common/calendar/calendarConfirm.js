/**
 * Created by Administrator on 2017/8/10.
 */
import React from  'react'
import ReactDOM from 'react-dom'
//import DataDeal from "../datadeal.js";
import $ from "jquery";
import './calendar.less';

var CalendarConfirm = React.createClass({
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
    calendarConfirm:function(){
        this.props.calendarConfirm();
    },
    cancelCalendar:function(){
        this.props.cancelCalendar();
    },
    render: function () {
        return (
            <div className="cam-calendar-bottom">
                <a className="btn-calendar" data-id="cam-sure" onClick={this.calendarConfirm}>确定</a>
                <a className="btn-calendar" data-id="cam-cancel" onClick={this.cancelCalendar}>取消</a>
            </div>
        );
    }
});
export {CalendarConfirm as default}