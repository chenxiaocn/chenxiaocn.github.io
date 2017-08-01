/**
 * Created by panchong on 17/2/8.
 */
import React from "react";
import "./searchItem.less";
import {Icon} from "antd";

export default class SearchItem extends React.Component{
    constructor(){
        super();
        this.state={
            placeHolder:""
        }
    }
    componentDidMount(){
        this.setState({
            placeHolder:this.props.placeHolder
        });
        this.refs.search.value=this.props.content;
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            placeHolder:nextProps.placeHolder
        });
        this.refs.search.value=nextProps.content;
    }
    handleSearch(status){
        this.props.onSearch(this.refs.search.value,status);
    }
    render(){
        return(
            <div className="searchContainer clearfix">
                <input type="text" placeholder={this.state.placeHolder} ref="search"/>
                <button type="button" onClick={this.handleSearch.bind(this,true)}><Icon type="search" /></button>
            </div>
        );
    }
}