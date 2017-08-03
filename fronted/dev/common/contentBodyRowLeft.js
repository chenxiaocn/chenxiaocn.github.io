/**
 * Created by Administrator on 2017/8/3.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import {Row,Col} from "antd";
import DataDeal from "./datadeal.js";
import $ from "jquery";
import API_URL from "../common/url";
import '../equipment/equip.less'

var contentBodyRowLeft = React.createClass({
    getInitialState: function () {
        return {

        }
    },
    componentDidMount: function () {

    },
    componentWillReceiveProps:function(nextprops){
    },
    render: function () {
        return (
            <ul>
                <li>44</li>
            </ul>

        );
    }
});
export {contentBodyRowLeft as default}