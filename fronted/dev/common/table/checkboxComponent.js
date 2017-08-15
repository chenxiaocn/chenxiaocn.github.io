/**
 * Created by Administrator on 2017/8/15.
 */
import React from "react";
import ReactDOM from 'react-dom'
import {Row, Col,Checkbox} from "antd";
import $ from "jquery";
import './table.less';

var CheckboxComponent = React.createClass({
    getInitialState: function () {
        return {
            name:this.props.name,
            title:this.props.title,
            checked:this.props.checked
        }
    },
    handleChangeCheckbox: function(e) {
        let thisName=e.target.name;
        this.props.handleChangeCheckbox(thisName);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({name:nextProps.name,title:nextProps.title,checked:nextProps.checked});
    },
    render(){
        return (
            <Row>
                <Col span={3}>{this.state.title}</Col>
                <Col span={7} className="lineHeight30">
                    <Checkbox name={this.state.name}  checked={this.state.checked} onChange={this.handleChangeCheckbox}>{this.state.checked==true?"是":"否"}</Checkbox>
                </Col>
            </Row>
        )
    }
});
export {CheckboxComponent as default}