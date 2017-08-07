import React from "react";
import {Link} from "react-router";
import { Menu, Dropdown, Icon } from 'antd';
import $ from "jquery";
import API_URL from "../url";
import common from "../common";
import PATH from "../path.js";
import Ajax from "../ajax";
import "./header.less"

const onClick = function ({ key }) {
};

const menu = (
    <Menu onClick={onClick}>
        <Menu.Item key="1"><Link to={PATH.user.set}><span className="headerFunTitle"><img src="image/common/setting.png"/>个人设置</span></Link></Menu.Item>
        <Menu.Item key="2"><span className="headerFunTitle"><img src="image/common/exit.png"/>退出</span></Menu.Item>
    </Menu>
);

var Header = React.createClass({
    componentDidMount: function () {
    },
    getInitialState: function(){
        return {
        }
    },
    render: function () {
        return (
            <header className="header">
                <div className="header_operation">
                    <Dropdown overlay={menu} trigger={['click']} placement="bottomCenter">
                        <a className="ant-dropdown-link" href="#">
                            {/*<img className="user_logo" id="header_user_logo" src={this.state.avatar} />*/}
                            <span className="user_name">admin</span>
                            <Icon type="caret-down" />
                        </a>
                    </Dropdown>
                </div>
            </header>
        )
    }
});

export {Header as default}