import React from "react";
import ReactDOM from "react-dom";
import { Menu, Icon } from 'antd';
const SubMenu = Menu.SubMenu;
import {Link} from 'react-router'
import $ from "jquery";

import PATH from "../path";
//import {hasPermission} from "../permissions";
import "./leftsider.less";

if (!Array.prototype.find) {
    Array.prototype.find = function (fn, thisArg) {
        if (!(typeof fn === 'function')) {
            throw new TypeError("fn不是一个有效的函数");
        }
        var arr = this;
        for (var i = 0, length = arr.length; i < length; i++) {
            if (fn.call(thisArg, arr[i], i, arr)) {
                return arr[i];
            }
        }
    }
}

const Sider = React.createClass({
    getInitialState() {
        return {
            current: this.props.selectedKeys ? this.props.selectedKeys :'1' ,
            openKeys: [],
            imgArr: ["11","2","3","4","5","6","7"]
        };
    },
    handleClick(e) {
        this.setState({ current: e.key });
        let keyArray=["2","5","6","7","8","9","10","11","12"];
        // if(keyArray.indexOf(e.key)!=-1){
        //     this.goBackOld();
        // }
    },
    goBackOld(){
        location.href="/";
    },
    onOpenChange(openKeys) {
        const state = this.state;
        const latestOpenKey = openKeys.find(key => !(state.openKeys.indexOf(key) > -1));
        const latestCloseKey = state.openKeys.find(key => !(openKeys.indexOf(key) > -1));

        let nextOpenKeys = [];
        if (latestOpenKey) {
            nextOpenKeys = this.getAncestorKeys(latestOpenKey).concat(latestOpenKey);
        }
        if (latestCloseKey) {
            nextOpenKeys = this.getAncestorKeys(latestCloseKey);
        }
        this.setState({ openKeys: nextOpenKeys });
    },
    getAncestorKeys(key) {
        const map = {
            sub3: []
        };
        return map[key] || [];
    },
    componentDidMount(){
        if(this.props.selectedKeys){
            this.setState({current:this.props.selectedKeys});
        }
        if(this.props.openKeys){
            this.setState({openKeys:this.props.openKeys});
        }
        var _this = this ;
        $("#left_sider ul.ant-menu li").on("click mouseover",function(){
            let imgArr = ["1","2","3","4","5","6","7"] ,
                index = $(this).index() ;
            imgArr[index] = imgArr[index] + "1";
            _this.setState({imgArr:imgArr});
        });
    },
    componentWillReceiveProps(nextprops){
        if(nextprops.selectedKeys){
            this.setState({current:nextprops.selectedKeys});
        }
        if(nextprops.openKeys){
            this.setState({openKeys:nextprops.openKeys});
        }
    },
    render() {
        return (
            <div className="left_sider" id="left_sider">
                <Menu
                    mode="inline"
                    openKeys={this.state.openKeys}
                    selectedKeys={[this.state.current]}
                    style={{ width: 170}}
                    onOpenChange={this.onOpenChange}
                    onClick={this.handleClick}
                    >
                    <Menu.Item key="1"><Link to="/"><img className="cate_logo"/>首页</Link></Menu.Item>
                    {
                      <Menu.Item key="3"><Link to={PATH.equipment.content}>
                                <img className="cate_logo"/>产品溢出回归
                            </Link></Menu.Item>
                    }
                    {
                       <Menu.Item key="4"><Link to={PATH.equipment.content}>
                                <img className="cate_logo"/>装备查询
                       </Link></Menu.Item>
                    }
                </Menu>
            </div>
        );
    }
});

export {Sider as default}