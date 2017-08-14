/**
 * Created by Administrator on 2017/8/9.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import DataDeal from "../datadeal.js";
import $ from "jquery";
import './calendar.less';
import {Row} from 'antd';

var CalendarQuarter = React.createClass({
    getInitialState: function () {
        return {
            dateType:'',
            beginDate:'',
            endDate:'',
            dateRangeEndbled:'',
            single:'',
            curYear:'',
            quarterList:[],
            dateRangeList:[],
            selectedList:[],
            selectedRange:[]
        }
    },
    componentDidMount: function () {
        let selectedRange=[],quarterList;
        var dateRangeList=DataDeal.getQuarterRange(this.props.beginDate,this.props.endDate);//可选季度范围
        if(this.props.selectedList.length>0){//选中范围数组
            selectedRange=DataDeal.getSelectedRangeArr(this.props.selectedList,'quarter');
        }
        quarterList=this.getQuarterList(this.props.curYear);

        this.setState({
            dateType:this.props.dateType,beginDate:this.props.beginDate,endDate:this.props.endDate,
            dateRangeEndbled:this.props.dateRangeEndbled,single:this.props.single,
            curYear:this.props.curYear,dateRangeList:dateRangeList,
            selectedRange:selectedRange,selectedList:this.props.selectedList,quarterList:quarterList
        });
    },
    componentWillReceiveProps:function(nextprops){
        let selectedRange=[],quarterList;
        var dateRangeList=DataDeal.getQuarterRange(this.props.beginDate,this.props.endDate);//可选范围数组
        if(nextprops.selectedList.length>0){
            selectedRange=DataDeal.getSelectedRangeArr(nextprops.selectedList,'quarter');//选中范围数组
        }
        quarterList=this.getQuarterList(this.props.curYear);
        this.setState({
            dateType:nextprops.dateType,beginDate:nextprops.beginDate,endDate:nextprops.endDate,
            dateRangeEndbled:nextprops.dateRangeEndbled,single:nextprops.single,
            curYear:nextprops.curYear,dateRangeList:dateRangeList,
            selectedRange:selectedRange,selectedList:nextprops.selectedList,quarterList:quarterList
        });

    },

    getQuarterList:function(year){
        let arr=[];
        let fourQuarters=DataDeal.getRange(1,4);
        fourQuarters=fourQuarters.join(',');
        for(var i=year;i>year-5;i--){
            let item=((i.toString())+','+fourQuarters).split(',');
            arr.push(item);
        }
        return arr;
    },
    ctrPrevNext:function(e){
        var thisCtrYear=parseInt($(e.target).next().attr('value'));
        let quarterList=[thisCtrYear-1,thisCtrYear,thisCtrYear+1];
        this.setState({quarterList:quarterList});
    },
    changeSelectList:function(dataRange){
        this.props.changeSelectList(dataRange);
    },
    render: function () {
        let RowContain=this.state.quarterList.map(function(content,index){
            return (
                <Row key={index}>
                    <QuarterList  quarterList={content}  curYear={this.state.curYear} dateRangeEndbled={this.state.dateRangeEndbled} single={this.state.single} dateRangeList={this.state.dateRangeList}
                                  selectedRange={this.state.selectedRange} selectedList={this.state.selectedList}  changeSelectList={this.changeSelectList}/>
                </Row>
            )
        }.bind(this));
        return (
            <div className="cam-calendar-list clearfix">
                <div className="cam-calendar-s cam-calendar-type-quarter cam-calendar-1" id="cam-calendar-1">
                    <div className="cam-calendar-s-title">
                        <i className="icon-prev-ctrl cam-calendar-ctrl-prev" onClick={this.ctrPrevNext}></i>
                        <div className="cam-calendar-year">年-季</div>
                        <i className="icon-next-ctrl cam-calendar-ctrl-next" onClick={this.ctrPrevNext}></i>
                    </div>
                    <div>
                        {RowContain}
                    </div>
                </div>
            </div>
        );
    }
});

var QuarterList = React.createClass({
    getInitialState: function () {
        return {
            dateRangeList:[],
            selectedRange:[],
            quarterList:[],
            selectedList:[],
            firstClick:false
        }
    },
    componentDidMount: function () {
        this.setState({
            dateRangeList:this.props.dateRangeList, quarterList:this.props.quarterList,
            selectedRange:this.props.selectedRange,selectedList:this.props.selectedList
        });
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({
            dateRangeList:nextprops.dateRangeList,quarterList:nextprops.quarterList,
            selectedRange:nextprops.selectedRange,selectedList:nextprops.selectedList
        });
    },
    addOrDel:function(e){
        let thisValue=$(e.target).attr('value');
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
                    tmpBeginDate=thisValue;
                    tmpEndDate=beginClickDate;
                }else{
                    tmpBegin=beginDateIndex;
                    tmpEnd=thisIndex;
                    tmpBeginDate=beginClickDate;
                    tmpEndDate=thisValue;
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
            this.props.changeSelectList(thisValue);
        }
    },
    dblClick:function(e){
        $(e.target).parent().find('li').removeClass('active');
    },

    render: function () {
        let quarterLi=[];
        let dateRangeList=this.state.dateRangeList, selectedRange=this.state.selectedRange;
        let quarterList=this.state.quarterList;

        for(var i=0;i<quarterList.length;i++){
            let liValue=quarterList[0]+'0'+quarterList[i],liItem;
            if(i==0){
                liItem=(<li  className="clickunable"  key={i}>{quarterList[0]}</li>);
            }else{
                liItem=(<li value={liValue} className="clickunable"  key={i}>{quarterList[i]}季</li>);
                //是否在可选范围
                for(var j=0;j<dateRangeList.length;j++){
                    let dataRangeItem=dateRangeList[j];
                    if(liValue==dateRangeList[j]){
                        liItem=(<li value={liValue} className="clickable" key={i} onClick={this.addOrDel}>{quarterList[i]}季</li>);
                        break;
                    }
                }
                //是否在选中范围
                for(var k=0;k<selectedRange.length;k++){
                    if(liValue==selectedRange[k]){
                        if(this.props.dateRangeEndbled){
                            liItem=(<li value={liValue} className="clickable active dateRangeEndbled" key={i} onClick={this.addOrDel} onDoubleClick={this.dblClick}>{quarterList[i]}季</li>);
                        }
                        if(this.props.single){
                            liItem=(<li value={liValue} className="clickable active" key={i} onClick={this.addOrDel}>{quarterList[i]}季</li>);
                        }
                        break;
                    }
                }
            }
            quarterLi.push(liItem);
        }

        return(
            <ul>
                {quarterLi}
            </ul>
        );
    }
});
export {CalendarQuarter as default}