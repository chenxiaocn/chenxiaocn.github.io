/**
 * Created by Administrator on 2017/7/25.
 */
import React from "react";
import {Link} from "react-router";
import Header from "../common/header/header";
import Sider from "../common/sider/sider";
import EquipDetail from "./equipDetail.js"
import Calendar from "../common/calendar/calendar.js"
import TableContent from "../common/table/tableContent.js"
import {Modal,Icon} from "antd";
import './equip.less';
import '../common/calendar/calendar.less';

export default class EquipContent extends React.Component {
    render() {
        return (
            <div>
                <Header />
                <div className="middle_part">
                    <div className="middle_row">
                        <div className="left_part">
                            <Sider selectedKeys="4"/>
                        </div>
                        <div className="right_part">
                            <Content />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

var Content = React.createClass({
    getInitialState: function () {
        return {
            addOrModifyModalVisible:false,
            calendarModal:false,
            //dateType:'year',
            dateType:'quarter',
            //selectedCalendarDate:['2011~2013','2014~2016'],
            selectedCalendarDate:['201501~201503'],
            beginDate:'201302',
            //beginDate:'2011',
            //endDate:'2017',
            endDate:'201703',
            dateRangeEndbled:true,
            //single:false,
            single:false,
            addType:true
        }
    },
    componentDidMount: function () {
    },
    handleRefresh: function () {
    },
    chooseCar:function(){
        this.setState({addOrModifyModalVisible:true});
    },
    cancelModal:function(){
        this.setState({addOrModifyModalVisible:false});
    },
    calendarConfirm:function(selectedCalendarDate){
        this.setState({selectedCalendarDate:selectedCalendarDate});
    },
    addCalendarModal:function(){
        let calendarModal=!(this.state.calendarModal);
        this.setState({calendarModal:calendarModal});
    },
    cancelCalendar:function(){
        this.setState({calendarModal:false});
    },
    render: function () {
        let selectedCalendarDate=this.state.selectedCalendarDate;
        selectedCalendarDate=selectedCalendarDate.join(',');
        if(this.state.dateRangeEndbled){
            if(!(this.state.dateType=='quarter')){
                selectedCalendarDate=selectedCalendarDate.substring(0,selectedCalendarDate.length-1);
            }
        }
        return (
            <div className="consult_page time_contain">
                {/*日历*/}
                <div className="operation_banner clearfix time">
                    <div>
                        <div className="pull-left cal-title">sop</div>
                        <div className="pull-left pa_date" onClick={this.addCalendarModal}>
                            <input className="border js-input_time" type="text" placeholder={selectedCalendarDate}/>
                            <Icon type="calendar"/>
                        </div>
                    </div>
                    {this.state.calendarModal?<Calendar  dateType={this.state.dateType} beginDate={this.state.beginDate} endDate={this.state.endDate}
                                                         dateRangeEndbled={this.state.dateRangeEndbled} single={this.state.single}
                                                         addType={this.state.addType} selectedCalendarDate={this.state.selectedCalendarDate}
                                                         calendarConfirm={this.calendarConfirm} cancelCalendar={this.cancelCalendar}/>:''}
                </div>
                <br/>
                <div className="outer_content">
                    <div className="clearfix">
                        <div className="pull-left">
                            <ToolBar selectedIds={this.state.selectedIds} onRefresh={this.handleRefresh}
                                     chooseCar={this.chooseCar} />
                        </div>
                    </div>
                    {/*选择车系*/}
                    <EquipDetail cancelModal={this.cancelModal} refresh={this.handleRefresh} addOrModifyModalVisible={this.state.addOrModifyModalVisible}/>
                    {/*表格列表*/}
                    <TableContent/>
                </div>
            </div>
        );
    }

});
var ToolBar = React.createClass({
    reload:function(){
        this.props.onRefresh();
    },
    chooseCar:function(){
        this.props.chooseCar();
    },
    render: function(){
        return(
            <div className="list_operation_btns">
                <button onClick={this.chooseCar}>选择车系</button>
            </div>
        )
    }
});