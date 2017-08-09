/**
 * Created by Administrator on 2017/8/8.
 */
import React from  'react'
import ReactDOM from 'react-dom'
//import DataDeal from "./../datadeal.js";
//import CalendarYear from "./calendarYear.js";
import Datadeal from "../datadeal.js";
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
            </div>
        );
    }
});

var CalendarMonth = React.createClass({
    getInitialState: function () {
        return {
            dateType:'',
            beginDate:'',
            endDate:'',
            dateRangeEndbled:'',
            single:'',
            curYear:'',
            curMonth:'',
            yearList:[]
        }
    },
    componentDidMount: function () {
        let curYear=this.props.curYear;
        let yearList=[curYear-2,curYear-1,curYear];
        this.setState({dateType:this.props.dateType,beginDate:this.props.beginDate,endDate:this.props.endDate,
            dateRangeEndbled:this.props.dateRangeEndbled,single:this.props.single,
            curYear:this.props.curYear,curMonth:this.props.curMonth,yearList:yearList
        });
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({dateType:nextprops.dateType,beginDate:nextprops.beginDate,endDate:nextprops.endDate,
            dateRangeEndbled:nextprops.dateRangeEndbled,single:nextprops.single,
            curYear:nextprops.curYear,curMonth:nextprops.curMonth
        });
    },
    ctrPrevNext:function(e){
        var thisCtrYear=parseInt($(e.target).next().attr('value'));
        let yearList=[thisCtrYear-1,thisCtrYear,thisCtrYear+1];
        this.setState({yearList:yearList});
    },
    render: function () {
        let yearList=this.state.yearList;
        let monthList=Datadeal.circleValue(12);

        let calendarTypeMonth=yearList.map(function(content,index){
            let CalendarCtrlI;
            switch (index){
                case 0:
                    CalendarCtrlI=(<i className="icon-prev-ctrl cam-calendar-ctrl-prev" onClick={this.ctrPrevNext}></i>);
                    break;
                case 2:
                    CalendarCtrlI=(<i className="icon-next-ctrl cam-calendar-ctrl-next" onClick={this.ctrPrevNext}></i>);
                    break;
            }

            let TwelveMonth=monthList.map(function(monthContent,index){
                return(
                    <li value={monthContent} className="clickable" key={index}>{monthContent}月</li>
                );
            });

            return(
                <div key={index} className="cam-calendar-s cam-calendar-type-month cam-calendar-1" id="cam-calendar-1">
                    <div className="cam-calendar-s-title">
                        {CalendarCtrlI}
                        <div className="cam-calendar-year" value={content}>{content}年</div>
                    </div>
                    <ul>
                        {TwelveMonth}
                    </ul>
                </div>
            );
        }.bind(this));
        return (
            <div className="cam-calendar-list clearfix">
                {calendarTypeMonth}
            </div>

        );
    }
});
export {Calendar as default}