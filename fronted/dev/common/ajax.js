import {message} from "antd";
import common from "./common";

let Ajax=(config)=>{
    $.ajax({
        url:config.url,
        data:config.data||{},
        type:config.type,
        dataType: 'json',
        success:function(data){
            if(common.loginOutTime(data)){
                if(data.success){
                    config.success(data);
                } else{
                    if(config.failure){
                        config.failure();
                    }
                    message.error(data.msg);
                }
            }
        },
        error: function(xhr, status, err) {
            message.error(err);
        }
    })
};

export default Ajax;