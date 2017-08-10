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
        }
    },
    componentDidMount: function () {
    },
    componentWillReceiveProps:function(nextprops){
    },
    render: function () {
        return (
            <div className="cam-calendar-bottom">
                <a className="btn-calendar" data-id="cam-sure">确定</a>
                <a className="btn-calendar" data-id="cam-cancel">取消</a>
            </div>
        );
    }
});
export {CalendarConfirm as default}