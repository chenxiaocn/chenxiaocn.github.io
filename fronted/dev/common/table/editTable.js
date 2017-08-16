/**
 * Created by Administrator on 2017/8/14.
 */
import React from "react";
import ReactDOM from 'react-dom'
import {Modal ,Button,message} from "antd";
import InputComponent from'./inputComponent.js';
import SelectComponent from'./selectComponent.js';
import CheckboxComponent from'./checkboxComponent.js';
import Validation from'../validation.js';
import $ from "jquery";
import './table.less';

var EditTable = React.createClass({
    getInitialState: function () {
        return {
            visible:false,selectedDetail:[],selectedId:this.props.selectedId,
            innerUserchecked: true,reStartchecked: false,
            name: '',password:'',email:'',realName:'',sex:'',tel:'',company:'',period:'',userClass:'',role:''
        }
    },
    handleCancel:function() {
        this.setState({visible: false});
        this.props.cancelModal();
    },
    handleChange: function(thisName,value) {
        this.setState({[thisName]:value});
    },
    componentWillReceiveProps: function (nextProps) {
        if (nextProps.addOrEditModalVisible) {
            this.setState({
                visible: true,selectedDetail:nextProps.selectedDetail,selectedId:nextProps.selectedId,
                name:nextProps.selectedDetail.name,password:nextProps.selectedDetail.password,
                email:nextProps.selectedDetail.email,realName:nextProps.selectedDetail.realName,
                sex:nextProps.selectedDetail.sex,tel:nextProps.selectedDetail.tel,
                company:nextProps.selectedDetail.company,period:nextProps.selectedDetail.period,
                userClass:nextProps.selectedDetail.userClass,role:nextProps.selectedDetail.role
            });
        }
        if(nextProps.selectedDetail.innerUser=="是"){
            this.setState({innerUserchecked:true});
        }else{
            this.setState({innerUserchecked:false});
        }
    },
    blur:function(thisName,value){
        switch (thisName){
            case "name":
                if(!Validation.required(this.state.name)){
                    message.error("请输入用户名");
                    return;
                }
                break;
            case "password":
                if(!Validation.required(this.state.password)){
                    message.error("请输入密码");
                    return;
                }
                break;
            case "tel":
                if(!Validation.isMobile(this.state.tel)){
                message.error("联系电话格式不正确");
                return;
            }
                break;
            case "email":
                if(!Validation.isMail(this.state.email)){
                message.error("邮箱格式不正确");
                return;
            }
                break;
        }
    },
    handleChangeCheckbox:function(thisName){
        if(thisName=="innerUser"){
            this.setState({ innerUserchecked: !this.state.innerUserchecked });
        }
        if(thisName=="reStart"){
            this.setState({ reStartchecked:!this.state.reStartchecked });
        }
    },
    submitModifyOrAdd: function () {
        let data= $(".addOrEdit").serialize();
        data= decodeURIComponent(data,true);//解决序列化中文乱码
        data=this.dealSubData(data,'innerUser');//内部用户、是否启用
        data=this.dealSubData(data,'reStart');//内部用户、是否启用
        console.log(data);
    },
    dealSubData:function(data,str){
        if(data.indexOf(str)==-1){
            data+='&'+str+'=否';
        }else{
            let beStr=str+'=on';
            let reStr=str+'=是';
            data=data.replace(beStr,reStr);
        }
        return data;
    },
    render(){
        return (
            <Modal
                visible={this.state.visible}
                title={this.state.selectedId?'编辑':'新增'}
                onCancel={this.handleCancel}
                width={600}
                wrapClassName="modifyPasswordModal infoModal"
                maskClosable={false}
                onOk={this.submitModifyOrAdd}
                footer={[
                <Button key="back" size="large" onClick={this.handleCancel}>取消</Button>,
                <Button key="submit" type="primary" size="large"  onClick={this.submitModifyOrAdd}>保存</Button>
                ]}
                >
                <form className="addOrEdit">
                    <InputComponent title="用户名" name="name"  value={this.state.name} handleChange={this.handleChange} onBlur={this.blur}/>
                    <InputComponent title="密码" name="password"  value={this.state.password} handleChange={this.handleChange} onBlur={this.blur}/>
                    <CheckboxComponent title="内部用户" name="innerUser"  checked={this.state.innerUserchecked} handleChangeCheckbox={this.handleChangeCheckbox}/>
                    <CheckboxComponent title="是否启用" name="reStart"  checked={this.state.reStartchecked} handleChangeCheckbox={this.handleChangeCheckbox}/>
                    <InputComponent title="邮箱" name="email"  value={this.state.email} handleChange={this.handleChange} onBlur={this.blur}/>
                    <InputComponent title="真实姓名" name="realName"  value={this.state.realName} handleChange={this.handleChange} onBlur={this.blur}/>
                    <SelectComponent title="性别" name="sex"  value={this.state.sex} optionList={["男","女"]} handleChange={this.handleChange}/>
                    <InputComponent title="电话" name="tel"  value={this.state.tel} handleChange={this.handleChange} onBlur={this.blur}/>
                    <InputComponent title="公司名称" name="company"  value={this.state.company} handleChange={this.handleChange} onBlur={this.blur}/>
                    <InputComponent title="有效期" name="period"  value={this.state.period} handleChange={this.handleChange} onBlur={this.blur}/>
                    <SelectComponent title="用户分类" name="userClass"  value={this.state.userClass} optionList={["产品组自定义分类","无锡推荐字段分类"]} handleChange={this.handleChange}/>
                    <SelectComponent title="角色" name="role"  value={this.state.role} optionList={["研究中心角色","steve角色"]} handleChange={this.handleChange}/>
                </form>
            </Modal>
        )
    }
});
export {EditTable as default}