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
    changeSelectList:function(dataRange){
        this.props.changeSelectList(dataRange);
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
                    <TwelveMonth  year={content}dateRangeEndbled={this.state.dateRangeEndbled} single={this.state.single} dateRangeList={this.state.dateRangeList}
                                  selectedRange={this.state.selectedRange} selectedList={this.state.selectedList}  changeSelectList={this.changeSelectList}/>
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
            selectedList:[],
            firstClick:false
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
    addOrDel:function(e){
        let thisMonth=$(e.target).attr('value');
        let thisIndex=$(e.target).index();
        let dateRangeEndbled=this.props.dateRangeEndbled;
        let single=this.props.single;
        if(dateRangeEndbled){
            if($(e.target).hasClass('active')){
                let firstClick=!(this.state.firstClick);
                if(firstClick){
                    $(e.target).parent().find('li').removeClass('active');
                    $(e.target).addClass('active rangFlagFirstClick');
                }else{
                    $(e.target).removeClass('active');
                }
                this.setState({firstClick:firstClick});
            }
            else{
                $(e.target).addClass('active rangFlagFirstClick');
            }

            let allLi=$(e.target).parent().find('li');
            let beginClickDate='',beginClickDateFlag=false,beginDateIndex;

            for(let i=0;i<allLi.length;i++){
                if(!(i==thisIndex)){
                    if($(allLi[i]).hasClass('rangFlagFirstClick')){
                        beginClickDate=$(allLi[i]).attr('value');
                        beginClickDateFlag=true;
                        beginDateIndex=[i];
                        break;
                    }
                }
            }

            let tmpBegin,tmpEnd,tmpBeginDate,tmpEndDate;
            if(beginClickDateFlag){
                if(beginDateIndex>thisIndex){
                    tmpBegin=thisIndex;
                    tmpEnd=beginDateIndex;
                    tmpBeginDate=thisMonth;
                    tmpEndDate=beginClickDate;
                }else{
                    tmpBegin=parseInt(beginDateIndex);
                    tmpEnd=parseInt(thisIndex);
                    tmpBeginDate=beginClickDate;
                    tmpEndDate=thisMonth;
                }

                for(let j=tmpBegin+1;j<tmpEnd;j++){
                    $(allLi[j]).addClass('active');
                }
                allLi.removeClass('rangFlagFirstClick');
                let dataRange=tmpBeginDate+'~'+tmpEndDate;
                this.props.changeSelectList(dataRange);
            }
        }
        if(single){
            var singSelectFlag;
            if($(e.target).hasClass('active')){
                singSelectFlag=false;
                $(e.target).removeClass('active');
            }else{
                singSelectFlag=true;
                $(e.target).addClass('active');
            }
            this.props.changeSelectList(thisMonth);
        }
    },
    dblClick:function(e){
         let thisMonth=$(e.target).attr('value');
         let selectedList=this.state.selectedList;
         $(e.target).parent().find('li').removeClass('active');
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
                    monthLiItem=(<li value={liValue} className="clickable" key={i+j} onClick={this.addOrDel}>{monthList[i]}月</li>);
                    break;
                }
            }
            //是否在选中范围
            for(var k=0;k<selectedRange.length;k++){
                if(liValue==selectedRange[k]){
                    if(this.props.dateRangeEndbled){
                        monthLiItem=(<li value={liValue} className="clickable active dateRangeEndbled" key={i+j} onClick={this.addOrDel} onDoubleClick={this.dblClick}>{monthList[i]}月</li>);
                    }
                    if(this.props.single){
                        monthLiItem=(<li value={liValue} className="clickable active" key={i+j} onClick={this.addOrDel}>{monthList[i]}月</li>);
                    }
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