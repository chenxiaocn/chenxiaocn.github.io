import React from "react";
import ReactDOM from "react-dom";

import Header from "../common/header/header";
import Sider from "../common/sider/sider";
import $ from "jquery";
import API_URL from "../common/url";
import PATH from "../common/path.js";
import Ajax from "../common/ajax";
import { message } from 'antd';
import {Link} from 'react-router'
import "./indexpage.less"

var Highcharts = require('highcharts');
const imageSrc="image/index/";

export default class IndexPage extends React.Component{
    constructor(){
        super();
        this.state={
        }
    }
    componentDidMount(){
    }
    render(){
        return (
            <div>
                <Header />
                <div className="middle_part">
                    <div className="middle_row">
                        <div className="left_part">
                            <Sider selectedKeys="1"/>
                        </div>
                        <div className="right_part index_page">
                            <div className="flex_left_container">
                               aa
                            </div>
                            <div className="flex_right_container">
                             aa
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}