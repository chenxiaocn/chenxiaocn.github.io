/**
 * Created by Administrator on 2017/8/9.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import DataDeal from "../datadeal.js";
import $ from "jquery";
import './calendar.less';

var CalendarYear = React.createClass({
    getInitialState: function () {
        return {
            dateType:'',
            beginDate:'',
            endDate:'',
            dateRangeEndbled:'',
            single:'',
            curYear:'',
            yearList:[],
            dateRangeList:[],
            selectedList:[],
            selectedRange:[]
        }
    },
    componentDidMount: function () {
        let selectedRange=[],yearList;
        var dateRangeList=DataDeal.getRange(this.props.beginDate,this.props.endDate);//可选年份范围
        if(this.props.selectedList.length>0){//选中范围数组
            selectedRange=DataDeal.getSelectedRangeArr(this.props.selectedList,'year');
        }
        yearList=DataDeal.getRange(this.props.curYear-11,this.props.curYear).reverse();

        this.setState({
            dateType:this.props.dateType,beginDate:this.props.beginDate,endDate:this.props.endDate,
            dateRangeEndbled:this.props.dateRangeEndbled,single:this.props.single,
            curYear:this.props.curYear,dateRangeList:dateRangeList,
            selectedRange:selectedRange,selectedList:this.props.selectedList,yearList:yearList
        });
    },
    componentWillReceiveProps:function(nextprops){
        let selectedRange=[],yearList;
        var dateRangeList=DataDeal.getRange(this.props.beginDate,this.props.endDate);//可选范围数组
        if(nextprops.selectedList.length>0){
            selectedRange=DataDeal.getSelectedRangeArr(nextprops.selectedList,'year');//选中范围数组
        }
        yearList=DataDeal.getRange(nextprops.curYear-11,nextprops.curYear).reverse();
        this.setState({
            dateType:nextprops.dateType,beginDate:nextprops.beginDate,endDate:nextprops.endDate,
            dateRangeEndbled:nextprops.dateRangeEndbled,single:nextprops.single,
            curYear:nextprops.curYear,dateRangeList:dateRangeList,
            selectedRange:selectedRange,selectedList:nextprops.selectedList,yearList:yearList
        });

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
        return (
            <div className="cam-calendar-list clearfix">
                <div className="cam-calendar-s cam-calendar-type-year cam-calendar-1" id="cam-calendar-1">
                    <div className="cam-calendar-s-title">
                        <i className="icon-prev-ctrl cam-calendar-ctrl-prev" onClick={this.ctrPrevNext}></i>
                        <div className="cam-calendar-year">年</div>
                        <i className="icon-next-ctrl cam-calendar-ctrl-next" onClick={this.ctrPrevNext}></i>
                    </div>
                    <YearList  yearList={this.state.yearList}  curYear={this.state.curYear} dateRangeEndbled={this.state.dateRangeEndbled} single={this.state.single} dateRangeList={this.state.dateRangeList}
                                  selectedRange={this.state.selectedRange} selectedList={this.state.selectedList}  changeSelectList={this.changeSelectList}/>
                </div>
            </div>
        );
    }
});

var YearList = React.createClass({
    getInitialState: function () {
        return {
            dateRangeList:[],
            selectedRange:[],
            yearList:[],
            selectedList:[],
            firstClick:false
        }
    },
    componentDidMount: function () {
        this.setState({
           dateRangeList:this.props.dateRangeList, yearList:this.props.yearList,
            selectedRange:this.props.selectedRange,selectedList:this.props.selectedList
        });
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({
            dateRangeList:nextprops.dateRangeList,yearList:nextprops.yearList,
            selectedRange:nextprops.selectedRange,selectedList:nextprops.selectedList
        });
    },
    addOrDel:function(e){
        let thisYear=$(e.target).attr('value');
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
                        beginDateIndex=i;
                        break;
                    }
                }
            }

            let tmpBegin,tmpEnd,tmpBeginDate,tmpEndDate;
            if(beginClickDateFlag){
                if(beginDateIndex>thisIndex){
                    tmpBegin=thisIndex;
                    tmpEnd=beginDateIndex;
                    tmpBeginDate=beginClickDate;
                    tmpEndDate=thisYear;
                }else{
                    tmpBegin=beginDateIndex;
                    tmpEnd=thisIndex;
                    tmpBeginDate=thisYear;
                    tmpEndDate=beginClickDate;
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
            this.props.changeSelectList(thisYear);
        }
    },
    dblClick:function(e){
         $(e.target).parent().find('li').removeClass('active');
    },

    render: function () {
        let yearLi=[];
        let dateRangeList=this.state.dateRangeList, selectedRange=this.state.selectedRange;
        let yearList=this.state.yearList;
        for(var i=0;i<yearList.length;i++){
            let liValue=yearList[i];
            let yearLiItem=(<li value={liValue} className="clickunable"  key={i}>{liValue}</li>);
            //是否在可选范围
            for(var j=0;j<dateRangeList.length;j++){
                let dataRangeItem=dateRangeList[j];
                if(liValue==dateRangeList[j]){
                    yearLiItem=(<li value={liValue} className="clickable" key={i} onClick={this.addOrDel}>{liValue}</li>);
                    break;
                }
            }
            //是否在选中范围
            for(var k=0;k<selectedRange.length;k++){
                if(liValue==selectedRange[k]){
                    if(this.props.dateRangeEndbled){
                        yearLiItem=(<li value={liValue} className="clickable active dateRangeEndbled" key={i} onClick={this.addOrDel} onDoubleClick={this.dblClick}>{liValue}</li>);
                    }
                    if(this.props.single){
                        yearLiItem=(<li value={liValue} className="clickable active" key={i} onClick={this.addOrDel}>{liValue}</li>);
                    }
                    break;
                }
            }
            yearLi.push(yearLiItem);
        }

        return(
            <ul>
                {yearLi}
            </ul>
        );
    }
});
export {CalendarYear as default}