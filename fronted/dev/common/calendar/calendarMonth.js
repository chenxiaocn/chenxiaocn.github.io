/**
 * Created by Administrator on 2017/8/9.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import DataDeal from "../datadeal.js";
import $ from "jquery";
import './calendar.less';

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
            yearList:[],
            dateRangeList:[]
        }
    },
    componentDidMount: function () {
        this.getYearList(this.props.endDate,this.props.curYear);
        var dateRangeList=DataDeal.getDateRangeList(this.props.beginDate,this.props.endDate);
        this.setState({dateType:this.props.dateType,beginDate:this.props.beginDate,endDate:this.props.endDate,
            dateRangeEndbled:this.props.dateRangeEndbled,single:this.props.single,
            curYear:this.props.curYear,curMonth:this.props.curMonth,dateRangeList:dateRangeList
        });
    },
    componentWillReceiveProps:function(nextprops){
        this.getYearList(nextprops.endDate,nextprops.curYear);
        var dateRangeList=DataDeal.getDateRangeList(this.props.beginDate,this.props.endDate);
        this.setState({dateType:nextprops.dateType,beginDate:nextprops.beginDate,endDate:nextprops.endDate,
            dateRangeEndbled:nextprops.dateRangeEndbled,single:nextprops.single,
            curYear:nextprops.curYear,curMonth:nextprops.curMonth,dateRangeList:dateRangeList
        });

    },
    getYearList:function(endDate,curYear){
        var yearList=[];
        if(endDate==null){
            yearList=[curYear-2,curYear-1,curYear];
        }else{
            let endYear=parseInt(endDate.substring(0,4));//截取年份；
            yearList=[endYear-2,endYear-1,endYear];
        }
        this.setState({yearList:yearList});
    },
    ctrPrevNext:function(e){
        var thisCtrYear=parseInt($(e.target).next().attr('value'));
        let yearList=[thisCtrYear-1,thisCtrYear,thisCtrYear+1];
        this.setState({yearList:yearList});
    },
    render: function () {
        let calendarTypeMonth=this.state.yearList.map(function(content,index){
            let CalendarCtrlI;
            switch (index){
                case 0:
                    CalendarCtrlI=(<i className="icon-prev-ctrl cam-calendar-ctrl-prev" onClick={this.ctrPrevNext}></i>);
                    break;
                case 2:
                    CalendarCtrlI=(<i className="icon-next-ctrl cam-calendar-ctrl-next" onClick={this.ctrPrevNext}></i>);
                    break;
            }
            return(
                <div key={index} className="cam-calendar-s cam-calendar-type-month cam-calendar-1" id="cam-calendar-1">
                    <div className="cam-calendar-s-title">
                        {CalendarCtrlI}
                        <div className="cam-calendar-year" value={content}>{content}年</div>
                    </div>
                    <TwelveMonth  year={content} dateRangeList={this.state.dateRangeList}/>
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

var TwelveMonth = React.createClass({
    getInitialState: function () {
        return {
        }
    },
    componentDidMount: function () {
    },
    componentWillReceiveProps:function(nextprops){
    },
    render: function () {
        let monthLi=[];
        let monthList=DataDeal.circleValue(12);
        let year=(this.props.year).toString();
        let dateRangeList=this.props.dateRangeList;

        for(var i=0;i<monthList.length;i++){
            let monthValue;
            monthList[i]<10?monthValue='0'+ monthList[i].toString():monthValue=monthList[i].toString();
            let liValue=year+monthValue;

            let monthLiItem=(<li value={liValue} className="clickable" key={i}>{monthList[i]}月</li>);

            for(var j=0;j<dateRangeList.length;j++){
                if(liValue==dateRangeList[j]){
                    monthLiItem=(<li value={liValue} className="clickable active" key={i+j}>{monthList[i]}月</li>);
                    break;
                }
            }
            monthLi.push(monthLiItem);
        }

        return(
            <ul>
                {monthLi}
            </ul>
        );
    }
});
export {CalendarMonth as default}