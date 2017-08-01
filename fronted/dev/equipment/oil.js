/**
 * Created by Administrator on 2017/7/26.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import './equip.less'

var Oil = React.createClass({
    getInitialState: function () {
        return {
            oilCarList:[ "汽油","BEV","混合动力", "插电混合动力","柴油", "汽油/CNG" , "汽油/CNG"]//所有级别
        }
    },
    componentDidMount:function(){
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({oilCarList:nextprops.fuelList});

    },
    oilCar:function(e){
        var liText = $(e.target)[0].innerText;
        $(".condition-title span").removeClass("title-choose-active");
        if($(e.target).hasClass("choose-active")){
            $(e.target).removeClass("choose-active");
            //加载数据
            this.props.oilSelectedList(liText,'remove');
        }else{
            $(e.target).addClass("choose-active");
            this.props.oilSelectedList(liText,'add');
        }
        if($(".choose-active").length==0){
            $(".condition-title span").addClass("title-choose-active");
        }
    },
    chooseNoLimit:function(e){
        $(".condition-ul li").removeClass("choose-active");
        $(e.target).addClass("title-choose-active");
    },
    render:function(){
        let Cars=this.state.oilCarList.map(function(content,index){
            return(
                <li onClick={this.oilCar} key={index}>{content}</li>
            );
        }.bind(this));
        return (
            <div className="clearfix condition-body">
                <div className="pull-left condition-title">燃油：<span className="title-choose-active" onClick={this.chooseNoLimit}>不限</span></div>
                <div className="pull-left">
                    <ul className='condition-ul'>
                        {Cars}
                    </ul>
                </div>
            </div>
        )
    }
});

export {Oil as default}