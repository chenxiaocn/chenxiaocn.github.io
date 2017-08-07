import React from "react";
import {Link} from "react-router";
import "./breadcrumb.less";
export default class BreadCrumb extends React.Component{
    constructor(){
        super();
        this.state={
            title:"",
            goBackPath:""
        }
    }
    componentDidMount(){
        this.setState({
            title:this.props.title,
            goBackPath:this.props.goBackPath
        });
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            title:nextProps.title,
            goBackPath:nextProps.goBackPath
        });
    }
    goBack(){
        history.back();
    }
    render(){
        return(
            <div className="breadcrumb-container">
                <span>{this.state.title}</span>
                { this.props.visible ? <Link to={this.state.goBackPath}><button type="button" className="pull-right grayBtn">返回</button></Link> : "" }
                {/*this.props.visible ? <button type="button" className="pull-right grayBtn" onClick={this.goBack.bind(this)}>返回</button> : ""*/}
            </div>
        );
    }
}

BreadCrumb.defaultProps = {
    visible: true
};