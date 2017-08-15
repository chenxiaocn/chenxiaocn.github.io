/**
 * Created by Administrator on 2017/8/15.
 */
import React from "react";
import ReactDOM from 'react-dom'
import {Row, Col,Input} from "antd";
import $ from "jquery";
import './table.less';

var InputComponent = React.createClass({
    getInitialState: function () {
        return {
            name:this.props.name,
            title:this.props.title,
            value:this.props.value
        }
    },
    handleChange: function(e) {
        let thisName=e.target.name;
        let value=e.target.value;
        this.props.handleChange(thisName,value);
    },
    blur:function(e){
        let thisName=e.target.name;
        let value=e.target.value;
        this.props.onBlur(thisName,value);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({name:nextProps.name,title:nextProps.title,value:nextProps.value});

    },
    render(){
        return (
            <Row>
                <Col span={3}>{this.state.title}</Col>
                <Col span={7}>
                    <Input type={this.state.name=="password"?'password':'text'}  name={this.state.name} value={this.state.value}  onChange={this.handleChange} onBlur={this.blur}/>
                </Col>
            </Row>
        )
    }
});
export {InputComponent as default}

