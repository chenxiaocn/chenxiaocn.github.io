import React from "react";
import API_URL from "../common/url.js";
import Ajax from "../common/ajax";
import { Input ,Button} from 'antd';
import "./login.less";
let LoginForm = React.createClass({
    loadingImage: function () {
        document.getElementById("randImage").src = "/image.jsp?" + Math.random();
        $("#yzhm").css("display", "block");
    },
    login: function () {
        Ajax({
            type:'GET',
            url: API_URL.login,
            data: $("#loginForm").serialize(),
            success: function (data) {
                sessionStorage.user = JSON.stringify(data.data.user);
                sessionStorage.rolePermission = JSON.stringify(data.data.rolePermission);
                if(data.data.province){
                    sessionStorage.province = data.data.province;
                }
                if(data.data.city){
                    sessionStorage.city = data.data.city;
                }
                if(data.data.school){
                    sessionStorage.school = JSON.stringify(data.data.school);
                }
                location.href="/";
            }.bind(this),
            failure:function(){
                this.getLoginCount();
            }.bind(this)
        });
    },
    getLoginCount: function () {
        Ajax({
            url: API_URL.loginCount,
            type: 'GET',
            success: function (data) {
                if (data.data >= 5) {
                    this.loadingImage();
                }
            }.bind(this)
        });
    },
    judgeKey:function(e){
        if(e.keyCode==13){
            this.login();
        }
    },
    componentDidMount: function () {
        this.getLoginCount();
    },
    render: function () {
        return (
            <div  onKeyDown={this.judgeKey} className="loginBody">
                <div className="boxHeader">
                    <a href="http://www.alearning.com.cn/" target="blank"></a>
                </div>
                <div className="boxMain clearfix">
                    <div className="boxContainer pull-right" ref="loginpage" >
                        <div className="clearfix">
                            <div className="logoPic"></div>
                        </div>
                        <div className="loginContainer">
                            <form id="loginForm">
                                <label htmlFor="inputUser">
                                    <Input placeholder="帐号" className="inputAttr1" name="username"
                                           id="inputUser"/>
                                </label>
                                <label htmlFor="inputPassword">
                                    <Input type="password" placeholder="密码" className="inputAttr2"  id="inputPassword"
                                           name="password"/>
                                </label>
                                <div id="yzhm">
                                    <div className="clearfix">
                                        <div className="inputCode">
                                            <label htmlFor="inputCode">
                                                <input type="text" className="inputAttr3" name="rand" placeholder="输入验证码" id="inputCode"/>
                                            </label>
                                        </div>
                                        <div className="CodeImg">
                                            <a href="#" onClick={this.loadingImage}><img id="randImage" src="" style={{border:1,width:70,height:39}}/></a>
                                            <a href="#" id="notSee" onClick={this.loadingImage} style={{color: '#1FA231'}}>看不清</a>
                                        </div>
                                    </div>
                                </div>
                                <Button type="primary" className="inputLog" onClick={this.login}>登录</Button>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="boxFooter">
                </div>
            </div>
        );
    }
});
export {LoginForm as default}