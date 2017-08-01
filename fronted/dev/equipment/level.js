/**
 * Created by Administrator on 2017/7/26.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import './equip.less'

var Level = React.createClass({
    getInitialState: function () {
        return {
            levelCarList:["A","A0","A00", "B","BUS", "C" , "D", "Picup"]//所有级别
        }
    },
    componentDidMount:function(){
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({levelCarList:nextprops.segmentList});
    },
    levelSeclectedCar:function(e){
        var liText = $(e.target)[0].innerText;
        $(".condition-title span").removeClass("title-choose-active");
        if($(e.target).hasClass("choose-active")){
            $(e.target).removeClass("choose-active");
            //加载数据
            this.props.levelSelectedList(liText,'remove');
        }else{
            $(e.target).addClass("choose-active");
            //加载数据
            this.props.levelSelectedList(liText,'add');
        }
        if($(".choose-active").length==0){
            $(".condition-title span").addClass("title-choose-active");
        }
    },
    chooseNoLimit:function(e){
        $(".condition-ul li").removeClass("choose-active");
        $(e.target).addClass("title-choose-active");
        let levelCarList=["A","A0","A00", "B","BUS", "C" , "D", "Picup"];
        this.setState({levelCarList:levelCarList});
        this.props.levelNoLimit();
    },
    render:function(){
        let levelCars=this.state.levelCarList.map(function(content,index){
            return(
                <li onClick={this.levelSeclectedCar} key={index}>{content}</li>
            );
        }.bind(this));
        return (
            <div className="clearfix condition-body">
                <div className="pull-left condition-title">级别：<span className="title-choose-active" onClick={this.chooseNoLimit}>不限</span></div>
                <div className="pull-left">
                    <ul className='condition-ul'>
                        {levelCars}
                    </ul>
                </div>
            </div>
        )
    }
});

export {Level as default}