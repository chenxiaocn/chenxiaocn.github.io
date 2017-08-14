/**
 * Created by Administrator on 2017/8/14.
 */
import React from "react";
import ReactDOM from 'react-dom'
//import store from "../../reduxFile/store";
//import ConditionContent from './conditionContent.js';
import {Modal ,Button,Row, Col,Input,Checkbox,Select} from "antd";
const Option = Select.Option;
import $ from "jquery";
import './table.less';

var EditTable = React.createClass({
    getInitialState: function () {
        return {
            visible:false,
            checked: true
        }
    },
    handleCancel:function() {
        this.setState({visible: false});
        this.props.cancelModal();
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.addOrEditModalVisible) {
            this.setState({visible: true});
        }
    },
    handleChange:function(){},
    submitModifyOrAdd: function () {
    },
    render(){
        return (
            <Modal
                visible={this.state.visible}
                title={'编辑'}
                onCancel={this.handleCancel}
                width={1000}
                wrapClassName="modifyPasswordModal infoModal"
                maskClosable={false}
                onOk={this.submitModifyOrAdd}
                footer={[
                <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" size="large"  onClick={this.submitModifyOrAdd}>
                   保存
                </Button>
            ]}
                >
                <form className="addOrEdit">
                   <div>
                       <Row>
                           <Col span={2}>用户名</Col>
                           <Col span={5}>
                               <Input type="text" />
                           </Col>
                       </Row>
                       <Row>
                           <Col span={2}>密码</Col>
                           <Col span={5}>
                               <Input type="text" />
                           </Col>
                       </Row>
                       <Row>
                           <Col span={2}>是否启用</Col>
                           <Col span={5} className="lineHeight30">
                               <Checkbox checked={this.state.checked}>是</Checkbox>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={2}>内部用户</Col>
                           <Col span={5} className="lineHeight30">
                               <Checkbox checked={!(this.state.checked)}>否</Checkbox>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={2}>邮箱</Col>
                           <Col span={5}>
                               <Input type="text" />
                           </Col>
                       </Row>
                       <Row>
                           <Col span={2}>真实姓名</Col>
                           <Col span={5}>
                               <Input type="text" />
                           </Col>
                       </Row>
                       <Row>
                           <Col span={2}>性别</Col>
                           <Col span={5}>
                               <Select defaultValue="lucy"  onChange={this.handleChange}>
                                   <Option value="jack">男</Option>
                                   <Option value="lucy">女</Option>
                               </Select>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={2}>电话</Col>
                           <Col span={5}>
                               <Input type="text" />
                           </Col>
                       </Row>
                       <Row>
                           <Col span={2}>公司名称</Col>
                           <Col span={5}>
                               <Input type="text" />
                           </Col>
                       </Row>
                       <Row>
                           <Col span={2}>有效期</Col>
                           <Col span={5}>
                               <Input type="text" />
                           </Col>
                       </Row>
                       <Row>
                           <Col span={2}>用户分类</Col>
                           <Col span={5}>
                               <Select defaultValue="lucy"  onChange={this.handleChange}>
                                   <Option value="jack">11</Option>
                                   <Option value="lucy">22</Option>
                               </Select>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={2}>角色</Col>
                           <Col span={5}>
                               <Select defaultValue="lucy"  onChange={this.handleChange}>
                                   <Option value="jack">11</Option>
                                   <Option value="lucy">22</Option>
                               </Select>
                           </Col>
                       </Row>
                   </div>
                </form>
            </Modal>
        )
    }
});





export {EditTable as default}