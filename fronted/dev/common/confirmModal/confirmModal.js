import React from "react";
import {Modal} from 'antd';
import "../../../css/antdChange.less";
import "./confirmModal.less";

export default class ConfirmModal extends React.Component{
    constructor(){
        super();
        this.state={
            visible:false,
            content:""
        }
    }
    componentDidMount(){
        this.setState({
            visible:this.props.visible,
            content:this.props.content
        });
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            visible:nextProps.visible,
            content:nextProps.content
        });
    }
    handleOk(){
        this.props.onRefresh(true);
    }
    handleCancel(){
        this.props.onRefresh(false);
    }
    render(){
        return(
            <div>
                <Modal title="提示" visible={this.state.visible}
                       onOk={this.handleOk.bind(this)} onCancel={this.handleCancel.bind(this)}
                       width={800} okText="确定" cancelText="取消" maskClosable={false}
                       wrapClassName="confirm"
                >
                    <p className="message">{this.state.content}</p>
                </Modal>
            </div>
        );
    }
}