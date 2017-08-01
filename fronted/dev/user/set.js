import React from "react";
import ReactDOM from "react-dom";
let Promise = require('es6-promise').Promise;
import 'whatwg-fetch';
import Validation from "../common/validation";
import {Modal,message,Upload,Button,Icon} from "antd";
import Sider from "../common/sider/sider";
import Header from "../common/header/header";
import BreadCrumb from "../common/breadcrumb/breadcrumb.js";
//import HeadPicModal from "../common/headPicModal/headPicModal";
import API_URL from "../common/url.js";
import common from "../common/common";
import Ajax from "../common/ajax";
//import "./user.less";
import "../../css/antdChange.less";

export default class PersonSet extends React.Component{
    constructor(){
        super();
        this.state={
            name:"",
            phone:"",
            oldPassword:"",
            newPassword:"",
            reNewPassword:"",
            visibleArray:[false]
        };
    }
    componentDidMount(){
        this.loadData();
    }
    handleRefresh(){
        this.loadData();
    }
    loadData(){
        Ajax({
            url:API_URL.usercenter.showInfo,
            type:"GET",
            cache:false,
            ifModified:true,
            success:function(data){
                this.setState({
                    avatar: data.data.avatar,
                    name: data.data.name,
                    phone: data.data.phone
                });
                sessionStorage.avatar = data.data.avatar ;
                $("#header_user_logo").attr("src" , data.data.avatar);
            }.bind(this)
        });
    }
    handleChange(label,e){
        let index=null;
        switch(label){
            case "name":this.setState({name:e.target.value});index=0;break;
            case "phone":this.setState({phone:e.target.value});index=1;break;
            case "oldPassword":this.setState({oldPassword:e.target.value});index=2;break;
            case "newPassword":this.setState({newPassword:e.target.value});index=3;break;
            case "reNewPassword":this.setState({reNewPassword:e.target.value});index=4;break;
        }
    }
    handleSubmit(content){
        switch (content){
            case "basicInfo":if(!Validation.required(this.state.name)){
                ReactDOM.render(<div>必填选项</div>,document.getElementsByClassName("errorMsg")[0]);
            } else if(!Validation.isMobile(this.state.phone)){
                ReactDOM.render(<div>请输入正确格式的手机号码</div>,document.getElementsByClassName("errorMsg")[1]);
            } else{
                ReactDOM.render(<div></div>,document.getElementsByClassName("errorMsg")[0]);
                ReactDOM.render(<div></div>,document.getElementsByClassName("errorMsg")[1]);
                fetch(API_URL.usercenter.update,
                    {
                        method:"POST",
                        headers:{
                        'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        credentials: 'include',
                        body:"name="+this.state.name+"&phone="+this.state.phone
                    }).then(response => response.json()).
                then(data=>{
                    if(common.loginOutTime(data)) {
                        if (data.success) {
                            message.success("修改成功！");
                        } else {
                            Modal.error({
                                title: "修改失败！",
                                content: data.msg
                            });
                        }
                    }
                }
                ).catch(e=>{
                    Modal.error({
                        title:"获取用户信息失败！",
                        content:e
                    });
                });
            }break;
            case "password":if(!Validation.required(this.state.oldPassword)){
                ReactDOM.render(<div>请输入旧密码</div>,document.getElementsByClassName("errorMsg")[2]);
            } else if(!Validation.mixLength(this.state.newPassword,6)){
                ReactDOM.render(<div>密码长度不小于6位</div>,document.getElementsByClassName("errorMsg")[3]);
            } else if(Validation.trim(this.state.newPassword)!=Validation.trim(this.state.reNewPassword)){
                ReactDOM.render(<div>两次输入的密码不一致</div>,document.getElementsByClassName("errorMsg")[4]);
            } else{
                ReactDOM.render(<div></div>,document.getElementsByClassName("errorMsg")[2]);
                ReactDOM.render(<div></div>,document.getElementsByClassName("errorMsg")[3]);
                ReactDOM.render(<div></div>,document.getElementsByClassName("errorMsg")[4]);
                fetch(API_URL.usercenter.changePassword,
                    {method:"POST",
                        credentials: 'include',
                        headers:{
                            'Content-Type': 'application/x-www-form-urlencoded'
                        },
                        body:`oldPassword=${this.state.oldPassword}&newPassword=${this.state.newPassword}&rePassword=${this.state.reNewPassword}`}).
                then(response => response.json()).
                then(data=> {
                    if (common.loginOutTime(data)) {
                        if (data.success) {
                            message.success("修改成功！");
                        } else {
                            Modal.error({
                                title: "修改失败！",
                                content: data.msg
                            });
                        }
                    }
                }).catch(e=>{
                    Modal.error({
                        title:"获取用户信息失败！",
                        content:e
                    });
                });
            }
        }
    }
    handleModal(index){
        let visibleArray=this.state.visibleArray;
        visibleArray[index]=!visibleArray[index];
        this.setState({
            visibleArray:visibleArray
        });
    }
    render(){
        return <div className="personSet">
            <Header />
            <div className="middle_part">
                <div className="middle_row">
                    <div className="left_part">
                        <Sider selectedKeys="0" />
                    </div>
                    <div className="right_part">
                        <BreadCrumb title="个人设置" visible={false}/>
                        <div className="body">
                            <div className="left">
                                <img src={this.state.avatar}/>
                                <button type="button" className="blueBtn" onClick={this.handleModal.bind(this,0)}>更换头像</button>
                            </div>
                            <div className="right">
                                <div className="title">
                                    基本信息
                                </div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td className="label">姓名：</td>
                                        <td className="content"><input type="text" name="name" value={this.state.name} onChange={this.handleChange.bind(this,"name")}/></td>
                                        <td><div className="errorMsg"/></td>
                                    </tr>
                                    <tr>
                                        <td className="label">手机：</td>
                                        <td className="content"><input type="phone" name="phone" value={this.state.phone} onChange={this.handleChange.bind(this,"phone")}/></td>
                                        <td><div className="errorMsg"/></td>
                                    </tr>
                                    <tr>
                                        <td className="label"></td>
                                        <td className="content"><button type="button" className="grayBtn" onClick={this.handleSubmit.bind(this,"basicInfo")}>修改</button></td>
                                    </tr>
                                    </tbody>
                                </table>
                                <div className="title">
                                    修改密码
                                </div>
                                <table>
                                    <tbody>
                                    <tr>
                                        <td className="label">原密码：</td>
                                        <td className="content"><input type="password" name="oldPassword" value={this.state.oldPassword} onChange={this.handleChange.bind(this,"oldPassword")}/></td>
                                        <td><div className="errorMsg"/></td>
                                    </tr>
                                    <tr>
                                        <td className="label">新密码：</td>
                                        <td className="content"><input type="password" name="newPassword" value={this.state.newPassword} onChange={this.handleChange.bind(this,"newPassword")}/></td>
                                        <td><div className="errorMsg"/></td>
                                    </tr>
                                    <tr>
                                        <td className="label">确认密码：</td>
                                        <td className="content"><input type="password" name="reNewPassword" value={this.state.reNewPassword} onChange={this.handleChange.bind(this,"reNewPassword")}/></td>
                                        <td><div className="errorMsg"/></td>
                                    </tr>
                                    <tr>
                                        <td className="label"></td>
                                        <td className="content"><button type="button" className="grayBtn" onClick={this.handleSubmit.bind(this,"password")}>修改</button></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    }
}
