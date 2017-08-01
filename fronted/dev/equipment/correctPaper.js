/**
 * Created by panchong on 17/2/17.
 */
import React from "react";
import {Modal,message,InputNumber,Popover,Icon} from 'antd';
let Promise = require('es6-promise').Promise;
if (!window.Promise) {
    window.Promise = Promise;
}
import 'whatwg-fetch';
import Sider from "../common/sider/sider";
import BreadCrumb from "../common/breadcrumb/breadcrumb.js";
import Header from "../common/header/header.js";
import API_URL from "../common/url.js";
import PATH from "../common/path.js";
import common from "../common/common";

//import "./student.less";
import "../../css/antdChange.less";
const imageSrc="image/student/";
export default class CorrectPaper extends React.Component{
    constructor(){
        super();
        this.state={
            offline:{}, course:{},textbook:{},
            answerSheetVisible:false
        }
    }
    componentDidMount(){
        this.loadData();
        this.loadOfflineData();
    }
    loadData(){
        fetch(API_URL.student.dynamics+
            "?recordId="+localStorage.getItem("recordId"),
            {method: 'GET', credentials: 'include'}).
            then(response => response.json())
            .then(data => {
                if(common.loginOutTime(data)) {
                    this.setState({
                        name: data.data.name
                    });
                }
            })
            .catch(e => {
                Modal.error({
                    title:"获取失败!",
                    content:e
                });
            });
    }
    loadOfflineData(){
        fetch(API_URL.student.offline+
            "?recordId="+localStorage.getItem("recordId"),
            {method: 'GET', credentials: 'include'}).
            then(response => response.json())
            .then(data => {
                if(common.loginOutTime(data)) {
                    this.setState({
                        typeName: data.data.offline.typeName,
                        knowledge: data.data.course.content,
                        offline: data.data.offline ? data.data.offline :{},
                        course: data.data.course,
                        textbook: data.data.textbook,
                        url: data.data.url
                    });
                }
            })
            .catch(e => {
                Modal.error({
                    title:"获取失败!",
                    content:e
                });
            });
    }
    handleRefresh(){
        this.loadOfflineData();
    }
    showModal(){
        this.setState({
            answerSheetVisible:true
        });
    }
    closeModal(status){
        this.setState({
            answerSheetVisible:status
        });
    }
    render(){
        let score = <a onClick={this.showModal.bind(this)}>请批改试卷</a>;
        if(this.state.offline.score){
            score = <p className="cursor-pointer" onClick={this.showModal.bind(this)}><span>{this.state.offline.score}</span>分</p>;
        }
        return(
            <div className="correctPaper">
                <Header />
                <div className="middle_part">
                    <div className="middle_row">
                        <div className="left_part">
                            <Sider selectedKeys="4"/>
                        </div>
                        <div className="right_part">
                            <BreadCrumb title="在线检测作答试卷" goBackPath={PATH.student.dynamics}/>
                            <div className="info">
                                <table>
                                    <tbody>
                                    <tr>
                                        <td className="label">知识点&nbsp;&#58;</td>
                                        <td className="content">{this.state.knowledge}</td>
                                    </tr>
                                    <tr>
                                        <td className="label">姓名&nbsp;&#58;</td>
                                        <td className="content">{this.state.name}</td>
                                    </tr>
                                    <tr>
                                        <td className="label">试卷类型&nbsp;&#58;</td>
                                        <td className="content">{this.state.typeName}</td>
                                    </tr>
                                    <tr>

                                    </tr>
                                    </tbody>
                                </table>
                                <table className="right">
                                    <tbody>
                                    <tr>
                                        <td width="40%">{score}</td>
                                        <td><button type="button" className="blueBtn" onClick={this.showModal.bind(this)}>答题卡</button></td>
                                    </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="paper">
                                <iframe src= {this.state.url} type="application/pdf"></iframe>
                            </div>
                        </div>
                    </div>
                </div>
                <AnswerSheetModal
                    visible={this.state.answerSheetVisible}
                    handleClose={this.closeModal.bind(this)}
                    onRefresh={this.handleRefresh.bind(this)}
                    offline={this.state.offline}
                    key="sheet"
                />
            </div>
        );
    }
}
class AnswerSheetModal extends React.Component{
    constructor(){
        super();
        this.state={
            visible:false,
            answers:[],
            score:'',
            addNum:0,
            addVisible:false,
            confirmLoading:false
        }
    }
    componentWillReceiveProps(nextProps){
        this.setState({
            visible:nextProps.visible,
            answers:nextProps.offline.detailList?nextProps.offline.detailList:[],
            score: nextProps.offline.score?nextProps.offline.score:'',
            consume: nextProps.offline.consume?nextProps.offline.consume:''
        });
    }
    closeModal(){
        this.props.handleClose(false);
    }
    handleSubmit(){
        if(this.state.answers.length == 0){
            message.error("请添加题目信息!");
            return;
        }
        let correct = 0;
        for(let i in this.state.answers){
            if(this.state.answers[i] == null){
                message.error("请选择正确错误!");
                return;
            }
            if(this.state.answers[i]){
                correct ++;
            }
        }
        if(this.props.offline.score != null && this.props.offline.score > -1){
            this.closeModal();
        } else{
            this.setState({
                confirmLoading:true
            });
            $.ajax({
                url:API_URL.student.saveOffline,
                type:"POST",
                data:{
                    learnRecordId:localStorage.getItem("recordId"),
                    score:this.state.score,
                    consume:this.state.consume,
                    'answers[]':this.state.answers,
                    total:this.state.answers.length,
                    correct:correct
                },
                success:function (data) {
                    if (data.success) {
                        message.success("提交成功!");
                        this.props.onRefresh();
                        this.closeModal();
                    } else {
                        Modal.error({
                            title: "提交失败!",
                            content: data.msg
                        });
                    }
                    this.setState({
                        confirmLoading:false
                    });
                }.bind(this)
            });
        }
    }
    handleCancel(){
        this.closeModal();
        this.setState({
            confirmLoading:false
        });
    }
    handleScore(value){
        this.setState({score:value})
    }
    handleConsume(value){
        this.setState({consume:value});
    }
    changeAddNum(value){
        this.setState({
            addNum:value
        });
    }
    handleAdd(){
        let oldNum=this.state.answers.length;
        let oldAnswers = this.state.answers;
        for(let i=oldNum; i<oldNum+parseInt(this.state.addNum);i++){
            oldAnswers[i] = null;
        }
        this.setState({
            answers:oldAnswers,
            addVisible:false
        });
    }
    handleReduce(id){
        let answers = this.state.answers;
        for(let i=0; i<answers.length; i++){
            if(i==(id-1)){
                answers.splice(i,1);
            }
        }
        this.setState({
            answers:answers
        });
    }
    handleCorrect(answer){
        let answers = this.state.answers;
        for(let i in answers){
            if(i == answer.id-1){
                answers[i] = answer.value;
            }
        }
        this.setState({
            answers:answers
        });
    }
    handleAddVisibleChange(vaisible){
        if(!(this.props.offline.score != null && this.props.offline.score > -1)){
            this.setState({
                addVisible:vaisible
            });
        }
    }
    render(){
        let answers = [];
        let isDisable=(this.props.offline.score != null && this.props.offline.score > -1);
        let corrects = 0;
        for(let j in this.state.answers){
            if(this.state.answers[j]){
                corrects++;
            }
        }
        let correctrate=(this.state.answers.length==0?0:(corrects/this.state.answers.length))*100;
        let content=(
            <div>
                题数&nbsp;&#58;&nbsp;<InputNumber min={0} onChange={this.changeAddNum.bind(this)} defaultValue={0}/>
                <button type="button" onClick={this.handleAdd.bind(this)} className="blueBtn okAdd">确定</button>
            </div>

        );
        answers=this.state.answers.map((answer,index)=>{
            let id = parseInt(index) + 1;
            return <Answer id={id} correct={this.handleCorrect.bind(this)} onReduce={this.handleReduce.bind(this)}
                           value={answer} disabled={isDisable} key={"answer"+index}/>
        });
        return(
            <Modal title="答题卡"
                   visible={this.state.visible}
                   onOk={this.handleSubmit.bind(this)}
                   onCancel={this.handleCancel.bind(this)}
                   confirmLoading={this.state.confirmLoading}
                   maskClosable={false}
                   okText="提交"
                   wrapClassName="answerSheet"
            >
                <table>
                    <tbody>
                    <tr>
                        <td>
                            总分&nbsp;&#58;&nbsp;<InputNumber min={0} defaultValue={this.state.score?parseInt(this.state.score):0} onChange={this.handleScore.bind(this)} disabled={isDisable}/>
                        </td>
                        <td>耗时&nbsp;&#58;&nbsp;<InputNumber min={0} defaultValue={this.state.consume?parseInt(this.state.consume):0} onChange={this.handleConsume.bind(this)} disabled={isDisable}/>分钟</td>
                        <td>正确率&nbsp;&#58;&nbsp;{correctrate.toFixed(2)}% ({corrects}/{this.state.answers.length})</td>
                    </tr>
                    </tbody>
                </table>
                <div className="answers">
                    {answers}
                    <Popover
                        placement="bottom"
                        content={content}
                        visible={this.state.addVisible}
                        trigger="click"
                        onVisibleChange={this.handleAddVisibleChange.bind(this)}
                    >
                        <button type="button" className={isDisable?"add disabled":"add"}><img src={imageSrc+"add.png"} disabled={isDisable}/></button>
                    </Popover>
                </div>
            </Modal>
        );
    }
}
class Answer extends React.Component{
    constructor(){
        super();
        this.state={
            closeImg:"answerItemClose.png",
            value:null
        }
    }
    handleClose(){
        if(!this.props.disabled){
            this.props.onReduce(this.props.id);
            this.setState({
                closeImg:"answerItemClose-hover.png"
            });
        }
    }
    handleMouseOver(){
        this.setState({
            closeImg:"answerItemClose-hover.png"
        });
    }
    handleMouseOut(){
        this.setState({
            closeImg:"answerItemClose.png"
        });
    }
    handleRight(){
        let value = this.props.value;
        if(value){
            value=null;
        }else{
            value=true;
        }
        this.props.correct({id:this.props.id, value:value});
    }
    handleError(){
        let value = this.props.value;
        if(value === false){
            value=null;
        }else {
            value=false;
        }
        this.props.correct({id:this.props.id, value:value});
    }
    render(){
        let rightClass = "right-default";
        if(this.props.value){
            rightClass = "right-click";
        }
        let errorClass = "error-default";
        if(this.props.value === false){
            errorClass = "error-click"
        }
        return(
            <div className="answerItem" onMouseOver={this.handleMouseOver.bind(this)} onMouseOut={this.handleMouseOut.bind(this)}>
                <img src={imageSrc+this.state.closeImg} onClick={this.handleClose.bind(this)} className={this.props.disabled?"disabled":"cursor-pointer"}/>
                <p>题{this.props.id}&nbsp;&#58;</p>
                <button type="button" className={this.props.disabled?rightClass+" disabled":rightClass} onClick={this.handleRight.bind(this)} disabled={this.props.disabled}>正确</button>
                <button type="button" className={this.props.disabled?errorClass+" disabled":errorClass} onClick={this.handleError.bind(this)} disabled={this.props.disabled}>错误</button>
            </div>
        );
    }
}