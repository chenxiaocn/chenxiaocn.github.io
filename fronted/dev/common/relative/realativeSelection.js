/**
 * Created by Administrator on 2017/8/22.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import {Row,Col} from "antd";
import $ from "jquery";

var RealativeSelection = React.createClass({
    getInitialState:function(){
        return{
            firstLevelList:this.props.firstLevelList,
            secLevelList: this.props.secLevelList,
            thirdLevelList:this.props.thirdLevelList,
            levelList:this.props.levelList,
            levelNames:this.props.levelNames,
            firstLevelValue:this.props.firstLevelList[0],
            secLevelValue:this.props.secLevelList[0],
            thirdLevelValue:this.props.thirdLevelList[0]
        }
    },
    componentWillReceiveProps:function(nextprops){
        this.setState({
            firstLevelList:nextprops.firstLevelList,
            secLevelList: nextprops.secLevelList,
            thirdLevelList:nextprops.thirdLevelList,
            levelNames:nextprops.levelNames,
            levelList:nextprops.levelList
        });
    },
    levelChange:function(e){
        let level=$(e.target).attr('data-level');
        let value=e.target.value;
        let firstLevelValue=this.state.firstLevelValue;
        let secLevelValue=this.state.secLevelValue;
        let thirdLevelValue=this.state.thirdLevelValue;
        switch (level){
            case "first":
                firstLevelValue=value;
                break;
            case "second":
                secLevelValue=value;
                break;
            case "third":
                thirdLevelValue=value;
                break;
        }
        this.setState({firstLevelValue:firstLevelValue,secLevelValue:secLevelValue,thirdLevelValue:thirdLevelValue});
        let levelValues=[firstLevelValue,secLevelValue,thirdLevelValue];
        this.props.levelChange(level,levelValues);
    },
    render() {
        const firstLevelOptions = this.state.firstLevelList.map(firstLevel => <option key={firstLevel}>{firstLevel}</option>);
        const secLevelOptions = this.state.secLevelList.map(secLevel => <option key={secLevel}>{secLevel}</option>);
        const thirdLevelOptions = this.state.thirdLevelList.map(thirdLevel => <option key={thirdLevel}>{thirdLevel}</option>);

        return (
           <div className="relate">
               {(this.state.levelNames)[0]}：
               <select value={this.state.firstLevelValue} data-level="first"  onChange={this.levelChange}>
                   {firstLevelOptions}
               </select>

               {(this.state.levelNames)[1]}：
               <select value={this.state.secLevelValue} data-level="second"  onChange={this.levelChange}>
                   {secLevelOptions}
               </select>

               {(this.state.levelNames)[2]}：
               <select value={this.state.thirdLevelValue} data-level="third"  onChange={this.levelChange}>
                   {thirdLevelOptions}
               </select>
           </div>
        );
    }
});

export {RealativeSelection as default }

