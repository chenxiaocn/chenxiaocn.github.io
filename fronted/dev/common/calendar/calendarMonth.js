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
            dateRangeList:[],
            selectedList:[],
            selectedRange:[]
        }
    },
    componentDidMount: function () {
        let selectedRange;
        this.getYearList(this.props.endDate,this.props.curYear);
        var dateRangeList=DataDeal.getDateRangeList(this.props.beginDate,this.props.endDate);
        if(this.props.selectedList.length>0){//选中范围数组
            selectedRange=DataDeal.getSelectedRangeArr(this.props.selectedList,'month');
        }

        this.setState({
            dateType:this.props.dateType,beginDate:this.props.beginDate,endDate:this.props.endDate,
            dateRangeEndbled:this.props.dateRangeEndbled,single:this.props.single,
            curYear:this.props.curYear,curMonth:this.props.curMonth,dateRangeList:dateRangeList,
            selectedRange:selectedRange,selectedList:this.props.selectedList
        });
    },
    componentWillReceiveProps:function(nextprops){
        let selectedRange=[];
        this.getYearList(nextprops.endDate,nextprops.curYear);
        var dateRangeList=DataDeal.getDateRangeList(nextprops.beginDate,nextprops.endDate);//可选范围数组
        if(nextprops.selectedList.length>0){
            selectedRange=DataDeal.getSelectedRangeArr(nextprops.selectedList,'month');//选中范围数组
        }
        this.setState({
            dateType:nextprops.dateType,beginDate:nextprops.beginDate,endDate:nextprops.endDate,
            dateRangeEndbled:nextprops.dateRangeEndbled,single:nextprops.single,
            curYear:nextprops.curYear,curMonth:nextprops.curMonth,dateRangeList:dateRangeList,
            selectedRange:selectedRange,selectedList:nextprops.selectedList
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
                    <TwelveMonth  year={content} dateRangeList={this.state.dateRangeList} selectedRange={this.state.selectedRange} selectedList={this.state.selectedList}/>
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
            year:'',
            dateRangeList:[],
            selectedRange:[],
            monthList:[],
            selectedList:[]
        }
    },
    componentDidMount: function () {
        this.setState({
            year:this.props.year,dateRangeList:this.props.dateRangeList,
            selectedRange:this.props.selectedRange,selectedList:this.props.selectedList
        });

    },
    componentWillReceiveProps:function(nextprops){
        this.setState({
            year:nextprops.year,dateRangeList:nextprops.dateRangeList,
            selectedRange:nextprops.selectedRange,selectedList:nextprops.selectedList
        });
    },

    render: function () {
        let monthLi=[];
        let year=this.state.year,dateRangeList=this.state.dateRangeList, selectedRange=this.state.selectedRange;
        let monthList=DataDeal.circleValue(12);

        for(var i=0;i<monthList.length;i++){
            let monthValue;
            monthList[i]<10?monthValue='0'+ monthList[i].toString():monthValue=monthList[i].toString();
            let liValue=year+monthValue;
            let monthLiItem=(<li value={liValue} className="clickunable"  key={i}>{monthList[i]}月</li>);

            //是否在可选范围
            for(var j=0;j<dateRangeList.length;j++){
                if(liValue==dateRangeList[j]){
                    monthLiItem=(<li value={liValue} className="clickable" key={i+j}>{monthList[i]}月</li>);
                    break;
                }
            }
            //是否在选中范围
            for(var k=0;k<selectedRange.length;k++){
                if(liValue==selectedRange[k]){
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