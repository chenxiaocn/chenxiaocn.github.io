/**
 * Created by Administrator on 2017/8/8.
 */
import React from  'react'
import ReactDOM from 'react-dom'
import DataDeal from "./datadeal.js";
import $ from "jquery";
import '../equipment/equip.less';
import '../../css/calendar.less';

var Calendar = React.createClass({
    getInitialState: function () {
        return {
        }
    },
    componentDidMount: function () {
    },
    componentWillReceiveProps:function(nextprops){
    },
    render: function () {
        return (
            <div className="cam-calendar">
                <div className="cam-calendar-pointer"></div>
                <div className="cam-calendar-list clearfix">
                    <div className="cam-calendar-s cam-calendar-type-month cam-calendar-1" id="cam-calendar-1">
                        <div className="cam-calendar-s-title">
                            <i className="icon-prev-ctrl cam-calendar-ctrl-prev"></i>
                            <div className="cam-calendar-year">2014年</div>
                        </div>
                        <ul>
                            <li value="201401" className="clickable">1月</li>
                            <li value="201402" className="clickable">2月</li>
                            <li value="201403" className="clickable">3月</li>
                            <li value="201404" className="clickable">4月</li>
                            <li value="201405" className="clickable">5月</li>
                            <li value="201406" className="clickable">6月</li>
                            <li value="201407" className="clickable">7月</li>
                            <li value="201408" className="clickable">8月</li>
                            <li value="201409" className="clickable">9月</li>
                            <li value="201410" className="clickable">10月</li>
                            <li value="201411" className="clickable">11月</li>
                            <li value="201412" className="clickable">12月</li>
                        </ul>
                    </div>
                    <div className="cam-calendar-s cam-calendar-type-month cam-calendar-2" id="cam-calendar-2">
                        <div className="cam-calendar-s-title">
                            <div className="cam-calendar-year">2015年</div>
                        </div>
                        <ul>
                            <li value="201501" className="clickable active">1月</li>
                            <li value="201502" className="clickable active">2月</li>
                            <li value="201503" className="clickable">3月</li>
                            <li value="201504" className="clickable">4月</li>
                            <li value="201505" className="clickable">5月</li>
                            <li value="201506" className="clickable">6月</li>
                            <li value="201507" className="clickable">7月</li>
                            <li value="201508" className="clickable">8月</li>
                            <li value="201509" className="clickable">9月</li>
                            <li value="201510" className="clickable">10月</li>
                            <li value="201511" className="clickable">11月</li>
                            <li value="201512" className="clickable">12月</li>
                        </ul>
                    </div>
                    <div className="cam-calendar-s cam-calendar-type-month cam-calendar-3" id="cam-calendar-3">
                        <div className="cam-calendar-s-title">
                            <i className="icon-next-ctrl cam-calendar-ctrl-next"></i>
                            <div className="cam-calendar-year">2016年</div>
                        </div>
                        <ul>
                            <li value="201601" className="clickable">1月</li>
                            <li value="201602" className="clickable">2月</li>
                            <li value="201603" className="clickable">3月</li>
                            <li value="201604" className="clickable">4月</li>
                            <li value="201605" className="clickable">5月</li>
                            <li value="201606" className="clickable">6月</li>
                            <li value="201607" className="clickable">7月</li>
                            <li value="201608" className="clickable">8月</li>
                            <li value="201609" className="clickable">9月</li>
                            <li value="201610" className="clickable">10月</li>
                            <li value="201611" className="clickable">11月</li>
                            <li value="201612" className="clickable">12月</li>
                        </ul>
                    </div>
                </div>
            </div>
        );
    }
});
export {Calendar as default}