/**
 * Created by Administrator on 2017/7/25.
 */
import React from "react";
// import {Link} from "react-router";

import Header from "../common/header/header";
import Sider from "../common/sider/sider";
// import Ajax from "../common/ajax";
import EquipDetail from "./equipDetail.js"

import {Modal} from "antd";

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
            <div className="knowledgerank_page consult_page">
                <div className="operation_banner">
                </div>

                <div className="knowledgerank_content">
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