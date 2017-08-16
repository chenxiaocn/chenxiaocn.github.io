/**
 * Created by Administrator on 2017/8/16.
 */
import React from  'react'
import ReactDOM from 'react-dom';
import Haschoose from "../hasChoose.js";
//import DataDeal from "./datadeal.js";
import $ from "jquery";
import './compare.less'

var CompareContent = React.createClass({
    getInitialState: function () {
        return {
            CompareChoosedList:[],
            selectedOrCancelflag:0
        }
    },
    componentDidMount: function () {
    },
    componentWillReceiveProps:function(nextprops){
    },
    render: function () {
        return (
            <div>
                <div className='st-content compare selected'>
                    <div className="scroll">
                        <div className="jspContainer">
                            <div className="jspPane"><dl>
                                <dt><b className="all">全选</b>competitor1</dt>
                                <dd>
                                    <a className="chk" data-id="331_343" data-model="A6L">A6L <b></b></a>
                                    <a className="chk selected" data-id="331_142202" data-oem="一汽大众" data-model="Q3">Q3(一汽大众) <b></b></a>
                                    <a className="chk selected" data-id="331_598" data-oem="一汽大众" data-model="Q5">Q5(一汽大众) <b></b></a>
                                </dd>
                                <dt><b className="all">全选</b>competitor2</dt>
                                <dd>
                                    <a className="chk" data-id="331_341" data-oem="一汽大众" data-model="A6">A6(一汽大众) <b></b></a>
                                    <a className="chk" data-id="331_142202" data-oem="一汽大众" data-model="Q3">Q3(一汽大众) <b></b></a>
                                    <a className="chk" data-id="331_598" data-oem="一汽大众" data-model="Q5">Q5(一汽大众) <b></b></a>
                                    <a className="chk" data-id="4111_142202" data-oem="奥迪" data-model="Q3">Q3(奥迪) <b></b></a>
                                    <a className="chk" data-id="4111_598" data-oem="奥迪" data-model="Q5">Q5(奥迪) <b></b></a>
                                </dd>
                            </dl>
                            </div>
                        </div>
                    </div>

                    {/*最近浏览*/}
                    <div className="sm-history">
                        <div className="title">最近浏览:</div>
                        <a className="chk" data-id="4111_598" data-oem="奥迪" data-model="Q5">Q5(奥迪)<b></b></a>
                        <a className="chk" data-id="4111_142202" data-oem="奥迪" data-model="Q3">Q3(奥迪)<b></b></a>
                        <a className="chk" data-id="331_598" data-oem="一汽大众" data-model="Q5">Q5(一汽大众)<b></b></a>
                        <a className="chk" data-id="331_142202" data-oem="一汽大众" data-model="Q3">Q3(一汽大众)<b></b></a>
                        <a className="chk" data-id="331_341" data-oem="一汽大众" data-model="A6">A6(一汽大众)<b></b></a>
                        <a className="chk" data-id="331_343" data-model="A6L">A6L<b></b></a>
                        <a className="chk" data-id="4111_4437" data-model="S5 Sportback">S5 Sportback<b></b></a>
                        <div style={{clear:'both'}}></div>
                    </div>
                </div>
                {/*已选条件*/}
                <Haschoose hasChooseList={this.state.CompareChoosedList}  selectedOrCancelflag={this.state.selectedOrCancelflag}/>
            </div>
        )
    }
});
export {CompareContent as default}