import React from "react";
import "./searchItem.less";
import {Icon,Input} from "antd";

export default class SearchItem extends React.Component{
    constructor(){
        super();
        this.state={
            placeHolder:''
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
            <div className="searchContainer">
               <input type="text" placeholder={this.state.placeHolder} ref="search" onKeyUp={this.handleSearch.bind(this,true)}/>
            </div>
        );
    }
}