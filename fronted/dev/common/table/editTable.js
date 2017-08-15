/**
 * Created by Administrator on 2017/8/14.
 */
import React from "react";
//import ConditionContent from './conditionContent.js';
import {Modal ,Button,Row, Col,Input,Checkbox,Select} from "antd";
const Option = Select.Option;
import $ from "jquery";
import './table.less';

var EditTable = React.createClass({
    getInitialState: function () {
        return {
            visible:false,
            selectedDetail:[],
            innerUserchecked: true,
            reStartchecked: false,
            name: '',
            password:'',
            email:'',
            realName:'',
            sex:'',
            tel:'',
            company:'',
            period:'',
            userClass:'',
            role:''
        }
    },
    handleCancel:function() {
        this.setState({visible: false});
        this.props.cancelModal();
    },
    handleChange: function(event) {
        this.setState({name: event.target.value});
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.addOrEditModalVisible) {
            this.setState({visible: true,selectedDetail:nextProps.selectedDetail,
                name:nextProps.selectedDetail.name,password:nextProps.selectedDetail.password,
                email:nextProps.selectedDetail.email,realName:nextProps.selectedDetail.realName,
                sex:nextProps.selectedDetail.sex,tel:nextProps.selectedDetail.tel,
                company:nextProps.selectedDetail.company,period:nextProps.selectedDetail.period,
                userClass:nextProps.selectedDetail.userClass,role:nextProps.selectedDetail.role});
        }
    },
    //handleChange:function(e){
    //    let value = (e.target.value + "").trim();
    //
    //},
    handleChangeCheckbox:function(){
        this.setState({ innerUserchecked: !this.state.innerUserchecked });
    },
    handleChangeCheckbox1:function(){
        this.setState({ reStartchecked: !this.state.reStartchecked });
    },
    onChange:function(e){
        //let value = (e.target.value + "").trim();
    },
    submitModifyOrAdd: function () {
       var data= $(".addOrEdit").serialize();
        data= decodeURIComponent(data,true);//解决序列化中文乱码
        //内部用户
        if(data.indexOf('innerUser')==-1){
            data+='&innerUser=否';
        }else{
            data=data.replace('innerUser=on','innerUser=是');
        }

        console.log(data);
    },
    render(){
        //let
        return (
            <Modal
                visible={this.state.visible}
                title={'编辑'}
                onCancel={this.handleCancel}
                width={600}
                wrapClassName="modifyPasswordModal infoModal"
                maskClosable={false}
                onOk={this.submitModifyOrAdd}
                footer={[
                <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" size="large"  onClick={this.submitModifyOrAdd}>
                   保存fff
                </Button>
            ]}
                >
                <form className="addOrEdit">
                   <div>
                       <Row>
                           <Col span={3}>用户名</Col>
                           <Col span={7}>
                               <Input type="text" name="name" value={this.state.name}  onChange={this.handleChange}/>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={3}>密码</Col>
                           <Col span={7}>
                               <Input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={3}>内部用户</Col>
                           <Col span={7} className="lineHeight30">
                             <Checkbox name="innerUser"  checked={this.state.selectedDetail.innerUser=="是"?this.state.innerUserchecked:!(this.state.innerUserchecked)} onChange={this.handleChangeCheckbox} value={this.state.innerUserchecked==true?"是":"否"}>{this.state.innerUserchecked==true?"是":"否"}</Checkbox>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={3}>是否启用</Col>
                           <Col span={7} className="lineHeight30" onChange={this.handleChangeCheckbox1}>
                               <Checkbox  name="reStart" checked={this.state.reStartchecked}>{this.state.reStartchecked==true?"是":"否"}</Checkbox>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={3}>邮箱</Col>
                           <Col span={7}>
                               <Input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={3}>真实姓名</Col>
                           <Col span={7}>
                               <Input type="text" name="realName" value={this.state.realName} onChange={this.handleChange}/>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={3}>性别</Col>
                           <Col span={7}>
                               <select name="sex" value={this.state.sex}  onChange={this.handleChange}>
                                   <option value="男">男</option>
                                   <option value="女">女</option>
                               </select>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={3}>电话</Col>
                           <Col span={7}>
                               <Input type="text" name="tel" value={this.state.tel}  onChange={this.handleChange}/>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={3}>公司名称</Col>
                           <Col span={7}>
                               <Input type="text" name="company" value={this.state.company} onChange={this.handleChange}/>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={3}>有效期</Col>
                           <Col span={7}>
                               <Input type="text" name="period" value={this.state.period} onChange={this.handleChange}/>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={3}>用户分类</Col>
                           <Col span={7}>
                               <select name="userClass" value={this.state.userClass}  onChange={this.handleChange}>
                                   <option value="产品组自定义分类">产品组自定义分类</option>
                                   <option value="无锡推荐字段分类">无锡推荐字段分类</option>
                               </select>
                           </Col>
                       </Row>
                       <Row>
                           <Col span={3}>角色</Col>
                           <Col span={7}>
                               <select name="role" value={this.state.role}  onChange={this.handleChange}>
                                   <option value="研究中心角色">研究中心角色</option>
                                   <option value="steve角色">steve角色</option>
                               </select>
                           </Col>
                       </Row>
                   </div>
                </form>
            </Modal>
        )
    }
});





export {EditTable as default}

