/**
 * Created by Administrator on 2017/8/15.
 */
import React from "react";
import ReactDOM from 'react-dom'
import {Row, Col,Input} from "antd";
import $ from "jquery";
import './table.less';

var SelectComponent = React.createClass({
    getInitialState: function () {
        return {
            name:this.props.name,
            title:this.props.title,
            value:this.props.value,
            optionList:this.props.optionList
        }
    },
    handleChange: function(e) {
        let thisName=e.target.name;
        let value=e.target.value;
        this.props.handleChange(thisName,value);
    },
    componentWillReceiveProps: function (nextProps) {
        this.setState({name:nextProps.name,title:nextProps.title,value:nextProps.value,optionList:nextProps.optionList});
    },
    render(){
        let optionList=this.state.optionList.map(function(content,index){
            return(<option value={content} key={index}>{content}</option>);
        }.bind(this));

        return (
            <Row>
                <Col span={3}>{this.state.title}</Col>
                <Col span={7}>
                    <select name={this.state.name} value={this.state.value}  onChange={this.handleChange}>
                        {optionList}
                    </select>
                </Col>
            </Row>
        )
    }
});
export {SelectComponent as default}
