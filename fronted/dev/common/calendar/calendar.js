/**
 * Created by Administrator on 2017/8/8.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import CalendarMonth from "./calendarMonth.js";
//import Datadeal from "../datadeal.js";
import $ from "jquery";
import './calendar.less';

var Calendar = React.createClass({
    getInitialState: function () {
        return {
            dateType:'',
            beginDate:'',
            endDate:'',
            dateRangeEndbled:'',
            single:'',
            curYear:'',
            curMonth:'',
            curQuarter:'',
            curDay:''
        }
    },
    componentDidMount: function () {
        this.setState({dateType:this.props.dateType,beginDate:this.props.beginDate,endDate:this.props.endDate,
            dateRangeEndbled:this.props.dateRangeEndbled,single:this.props.single});
        this.getCurrentTime();
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({dateType:nextprops.dateType,beginDate:nextprops.beginDate,endDate:nextprops.endDate,
            dateRangeEndbled:nextprops.dateRangeEndbled,single:nextprops.single
        });
        //this.getCurrentTime();
    },
    getCurrentTime:function(){
        var date=new Date;
        var year=date.getFullYear();
        var month=date.getMonth()+1;
        var quarter =Math.floor( ( month % 3 == 0 ? ( month / 3 ) : ( month / 3 + 1 ) ) );
        var day = date.getDate();
        this.setState({curYear:year,curMonth:month,curQuarter:quarter,curDay:day});
    },
    render: function () {
        let dateType=this.state.dateType;
        let calendarBody;
        switch (dateType){
            case "year":break;
            case "month":
                calendarBody=(<CalendarMonth curYear={this.state.curYear} curMonth={this.state.curMonth} beginDate={this.state.beginDate} endDate={this.state.endDate} dateRangeEndbled={this.state.dateRangeEndbled} single={this.state.single}/>);
                break;
            case "quarter ":break;
            case "week":break;
            case "day":break;
        }
        return (
            <div className="cam-calendar">
                <div className="cam-calendar-pointer"></div>
                {calendarBody}
                <div>
                    <div className="cam-addBtn">
                        <a href="">添加</a>
                    </div>
                    <div className="cam-selected">
                        <a href="javascript:">
                            <span>201601~201607</span>
                            <b></b>
                        </a>
                        <a href="javascript:;">
                            <span>201610</span>
                            <b></b></a>
                    </div>
                </div>
                <div className="cam-calendar-bottom">
                    <a className="btn-calendar" data-id="cam-sure">确定</a>
                    <a className="btn-calendar" data-id="cam-cancel">取消</a>
                </div>
            </div>
        );
    }
});
export {Calendar as default}