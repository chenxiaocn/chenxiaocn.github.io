/**
 * Created by Administrator on 2017/7/25.
 */
import React from "react";
import {Link} from "react-router";
import Header from "../common/header/header";
import Sider from "../common/sider/sider";
import EquipDetail from "./equipDetail.js"
import Calendar from "../common/calendar.js"
import {Modal,Icon} from "antd";
import './equip.less';
import '../../css/calendar.less';

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
            addOrModifyModalVisible:false
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
    render: function () {
        return (
            <div className="consult_page time_contain">
                <div className="operation_banner clearfix time">
                    <div>
                        <div className="pull-left cal-title">sop</div>
                        <div className="pull-left pa_date">
                            <input className="border js-input_time" type="text" placeholder="2017"/>
                            <Icon type="calendar"/>
                        </div>
                    </div>
                    <div className="cam-calendar-wrapper">
                        <Calendar />
                    </div>

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