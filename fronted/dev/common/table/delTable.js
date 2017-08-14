/**
 * Created by Administrator on 2017/8/14.
 */
import React from "react";
import ReactDOM from 'react-dom'
import Ajax from "../ajax.js";
import $ from "jquery";
import {Modal ,Button,message} from "antd";

var DelTable = React.createClass({
    getInitialState: function () {
        return {
            visible:false
        }
    },
    handleCancel() {
        this.setState({visible: false});
        this.props.cancelModal();
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.delModalVisible) {
            this.setState({visible: true});
        }
    },
    submitOperates: function () {
        message.success("删除成功");
        this.handleCancel();
        //Ajax({
        //    url: API_URL.table.del,
        //    type: 'POST',
        //    data: {id:this.props.selectedId},
        //    success: function (data) {
        //        message.success("删除成功");
        //        this.handleCancel();
        //        this.props.refresh();
        //    }.bind(this)
        //});
    },
    render(){
        return (
            <Modal
                className="delModal"
                visible={this.state.visible}
                title={"您是否确定"}
                onCancel={this.handleCancel}
                width={600}
                wrapClassName="messageModal infoModal"
                maskClosable={false}
                onOk={this.submitOperates}
                footer={[
                <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" size="large"  onClick={this.submitOperates}>
                   删除
                </Button>
            ]}
                >
                <p>您确定删除吗?</p>
            </Modal>
        )
    }
});

export {DelTable as default}