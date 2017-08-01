/**
 * Created by Administrator on 2017/7/27.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import SearchItem from "../common/searchItem/searchItem";
import {Row,Col,Tabs} from "antd";
import Ajax from "../common/ajax";
import store from "../../reduxFile/store";
import {chooseContentConditions} from "../../reduxFile/actions";
import BrandtArea from "./brandarea.js";
import SegmentArea from "./segarea.js";
import $ from "jquery";
import API_URL from "../common/url";
import './equip.less'
const TabPane = Tabs.TabPane;

var Segment = React.createClass({
    getInitialState: function () {
        return {
            equipList:this.props.equipList,
            segmentList:this.props.segmentList,
            selectedSegmentList:this.props.selectedSegmentList,
            segItemSelectedFlag:this.props.segItemSelectedFlag
        }
    },
    componentDidMount:function(){
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({
            equipList:nextprops.equipList,
            segmentList:nextprops.segmentList,
            selectedSegmentList:nextprops.selectedSegmentList,
            segItemSelectedFlag:nextprops.segItemSelectedFlag
        });
    },
    chooseContent:function(chooseContent,chooseType){
        this.props.chooseContent(chooseContent,chooseType);
    },
    chooseBrandPrefix:function(content,clickType){
        this.props.chooseBrandPrefix(content,clickType);
    },
    render:function(){
        return (
            <div className="seg-brand-body">
                    <div className="pull-right searchConsult">
                        <SearchItem placeHolder="请输入车系名称" onSearch={this.handleSearch} content={this.state.searchContent}/>
                    </div>
                    <div className="pull-left">
                        <Tabs type="card">
                            <TabPane tab="按品牌" key="1">
                                <BrandtArea equipList={this.state.equipList} chooseBrandPrefix={this.chooseBrandPrefix} chooseContent={this.chooseContent} selectedHZZZ={this.props.selectedHZZZ}  selectedFuel={this.props.selectedFuel} selectedBody={this.props.selectedBody} selectedSegment={this.props.selectedSegment} selectedFlag={this.props.selectedFlag}/>
                            </TabPane>
                            <TabPane tab="按级别" key="2">
                                <SegmentArea  selectedSegmentList={this.state.selectedSegmentList} segItemSelectedFlag={this.state.segItemSelectedFlag} segmentList={this.state.segmentList} chooseContent={this.chooseContent} selectedHZZZ={this.props.selectedHZZZ}  selectedFuel={this.props.selectedFuel} selectedBody={this.props.selectedBody} selectedSegment={this.props.selectedSegment} selectedFlag={this.props.selectedFlag}/>
                            </TabPane>
                        </Tabs>
                    </div>
           </div>

        )
    }
});
export {Segment as default}