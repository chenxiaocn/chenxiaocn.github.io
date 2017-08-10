/**
 * Created by Administrator on 2017/8/8.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import CalendarMonth from "./calendarMonth.js";
import CalendarAdd from "./calendarAdd.js";
import CalendarConfirm from "./calendarConfirm.js";
import DataDeal from "../datadeal.js";
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
            curDay:'',
            selectedList:[]
        }
    },
    componentDidMount: function () {
        this.getCurrentTime();
        this.setState({dateType:this.props.dateType,beginDate:this.props.beginDate,endDate:this.props.endDate,
            dateRangeEndbled:this.props.dateRangeEndbled,single:this.props.single,selectedList:this.props.selectedCalendarDate});
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({dateType:nextprops.dateType,beginDate:nextprops.beginDate,endDate:nextprops.endDate,
            dateRangeEndbled:nextprops.dateRangeEndbled,single:nextprops.single,selectedList:nextprops.selectedCalendarDate
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
    delSelected:function(content){
        let selectedList=this.state.selectedList;
        selectedList=DataDeal.removeByValue(selectedList,content);
        this.setState({selectedList:selectedList});
    },
    calendarConfirm:function(){
        console.log(this.state.selectedList);
    },
    render: function () {
        let dateType=this.state.dateType;
        let calendarBody;
        switch (dateType){
            case "year":break;
            case "month":
                calendarBody=(<CalendarMonth selectedList={this.state.selectedList} curYear={this.state.curYear} curMonth={this.state.curMonth} beginDate={this.state.beginDate} endDate={this.state.endDate} dateRangeEndbled={this.state.dateRangeEndbled} single={this.state.single}/>);
                break;
            case "quarter ":break;
            case "week":break;
            case "day":break;
        }
        return (
            <div className="cam-calendar">
                <div className="cam-calendar-pointer"></div>
                {calendarBody}
                {this.props.add=='true'?<CalendarAdd  selectedList={this.state.selectedList} delSelected={this.delSelected}/>:''}
                <CalendarConfirm  selectedList={this.state.selectedList} calendarConfirm={this.calendarConfirm}/>
            </div>
        );
    }
});
export {Calendar as default}