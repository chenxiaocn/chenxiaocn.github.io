/**
 * Created by zhangweiqing on 2015/12/7.
 */
let permissions = [
    {"id":1,"pId":0,"name":"课程管理","open":true},
    {"id":11,"pId":1,"name":"课程链","open":false},
    {"id":111,"pId":11,"name":"创建"},
    {"id":112,"pId":11,"name":"导入"},
    {"id":113,"pId":11,"name":"复制"},
    {"id":114,"pId":11,"name":"删除"},
    {"id":115,"pId":11,"name":"修改序号"},
    {"id":116,"pId":11,"name":"编辑"},
    {"id":117,"pId":11,"name":"管理"},
    {"id":1171,"pId":117,"name":"导入动画"},
    {"id":1172,"pId":117,"name":"管理互动问答"},
    {"id":11721,"pId":1172,"name":"创建"},
    {"id":11722,"pId":1172,"name":"导入"},
    {"id":11723,"pId":1172,"name":"删除"},
    {"id":11724,"pId":1172,"name":"上传/删除音频"},
    {"id":11725,"pId":1172,"name":"编辑"},
    {"id":11726,"pId":1172,"name":"预览"},
    {"id":11727,"pId":1172,"name":"插入问题"},
    {"id":11728,"pId":1172,"name":"动画预览"},
    {"id":11729,"pId":1172,"name":"查看"},
    {"id":1173,"pId":117,"name":"查看题库"},
    {"id":11731,"pId":1173,"name":"创建"},
    {"id":11732,"pId":1173,"name":"删除"},
    {"id":11733,"pId":1173,"name":"编辑"},
    {"id":11734,"pId":1173,"name":"预览"},
    {"id":11735,"pId":1173,"name":"列表查看"},
    {"id":1174,"pId":117,"name":"查看"},
    {"id":118,"pId":11,"name":"列表查看"},
    {"id":12,"pId":1,"name":"习题库","open":false},
    {"id":121,"pId":12,"name":"创建"},
    {"id":122,"pId":12,"name":"导入"},
    {"id":123,"pId":12,"name":"删除"},
    {"id":124,"pId":12,"name":"编辑"},
    {"id":125,"pId":12,"name":"预览"},
    {"id":126,"pId":12,"name":"列表查看"},
    {"id":13,"pId":1,"name":"入学测","open":false},
    {"id":131,"pId":13,"name":"创建"},
    {"id":132,"pId":13,"name":"导入"},
    {"id":133,"pId":13,"name":"删除"},
    {"id":134,"pId":13,"name":"编辑"},
    {"id":135,"pId":13,"name":"预览"},
    {"id":136,"pId":13,"name":"列表查看"},
    {"id":2,"pId":0,"name":"学校管理","open":true},
    {"id":21,"pId":2,"name":"创建"},
    {"id":22,"pId":2,"name":"删除"},
    {"id":23,"pId":2,"name":"编辑"},
    {"id":24,"pId":2,"name":"管理"},
    {"id":241,"pId":24,"name":"设置校长"},
    {"id":242,"pId":24,"name":"更换教材"},
    {"id":243,"pId":24,"name":"老师管理"},
    {"id":2431,"pId":243,"name":"创建老师"},
    {"id":2432,"pId":243,"name":"删除老师"},
    {"id":2433,"pId":243,"name":"查看学生信息"},
    {"id":2434,"pId":243,"name":"老师详情"},
    {"id":2435,"pId":243,"name":"修改老师"},
    {"id":2436,"pId":243,"name":"重置密码"},
    {"id":2437,"pId":243,"name":"修改头像"},
    {"id":2438,"pId":243,"name":"启用/禁用"},
    {"id":2439,"pId":243,"name":"查看课表"},
    {"id":244,"pId":24,"name":"教室管理"},
    {"id":2441,"pId":244,"name":"创建"},
    {"id":2442,"pId":244,"name":"删除"},
    {"id":2443,"pId":244,"name":"修改"},
    {"id":2444,"pId":244,"name":"查看"},
    {"id":245,"pId":24,"name":"排课计划"},
    {"id":246,"pId":24,"name":"班级管理"},
    {"id":2461,"pId":246,"name":"创建"},
    {"id":2462,"pId":246,"name":"课程表"},
    {"id":2463,"pId":246,"name":"删除"},
    {"id":2464,"pId":246,"name":"编辑"},
    {"id":2465,"pId":246,"name":"添加人员"},
    {"id":2466,"pId":246,"name":"列表查看"},
    {"id":247,"pId":24,"name":"报名咨询"},
    {"id":2471,"pId":247,"name":"列表查看"},
    {"id":2472,"pId":247,"name":"备注"},
    {"id":248,"pId":24,"name":"查看"},
    {"id":25,"pId":2,"name":"查看列表"},
    {"id":3,"pId":0,"name":"装备查询","open":true},
    {"id":31,"pId":3,"name":"创建"},
    {"id":32,"pId":3,"name":"分配老师"},
    {"id":33,"pId":3,"name":"删除"},
    {"id":34,"pId":3,"name":"启用/禁用"},
    {"id":35,"pId":3,"name":"重置密码"},
    {"id":36,"pId":3,"name":"编辑"},
    {"id":37,"pId":3,"name":"详情"},
    {"id":38,"pId":3,"name":"列表查看"},
    {"id":371,"pId":37,"name":"设置期限/有效期"},
    {"id":372,"pId":37,"name":"查看错题"},
    {"id":373,"pId":37,"name":"清空错题"},
    {"id":374,"pId":37,"name":"学习动态"},
    {"id":3741,"pId":374,"name":"查看互动问答详情"},
    {"id":3742,"pId":374,"name":"历史图表"},
    {"id":3743,"pId":374,"name":"指定练习册"},
    {"id":3744,"pId":374,"name":"查看线下试卷"},
    {"id":3745,"pId":374,"name":"批改试卷"},
    {"id":3746,"pId":374,"name":"查看作答试卷"},
    {"id":3747,"pId":374,"name":"查看在线检测试卷"},
    {"id":3748,"pId":374,"name":"查看报告"},
    {"id":3749,"pId":374,"name":"过关设置"},
    {"id":37411,"pId":374,"name":"查看"},
    {"id":375,"pId":37,"name":"入学测"},
    {"id":3751,"pId":375,"name":"重新测试"},
    {"id":3752,"pId":375,"name":"关闭测试"},
    {"id":3753,"pId":375,"name":"修改等级"},
    {"id":3754,"pId":375,"name":"查看详细报告"},
    {"id":3755,"pId":375,"name":"修改学习起点"},
    {"id":3756,"pId":375,"name":"重置"},
    {"id":3757,"pId":375,"name":"查看"},
    {"id":376,"pId":37,"name":"重新购买"},
    {"id":377,"pId":37,"name":"查看"},
    {"id":4,"pId":0,"name":"用户管理","open":true},
    {"id":41,"pId":4,"name":"管理员用户"},
    {"id":411,"pId":41,"name":"创建"},
    {"id":412,"pId":41,"name":"启用/禁用"},
    {"id":413,"pId":41,"name":"重置密码"},
    {"id":414,"pId":41,"name":"编辑"},
    {"id":415,"pId":41,"name":"删除"},
    {"id":416,"pId":41,"name":"列表查看"},
    {"id":42,"pId":4,"name":"其他用户"},
    {"id":421,"pId":42,"name":"创建"},
    {"id":422,"pId":42,"name":"启用/禁用"},
    {"id":423,"pId":42,"name":"重置密码"},
    {"id":424,"pId":42,"name":"编辑"},
    {"id":425,"pId":42,"name":"删除"},
    {"id":426,"pId":42,"name":"列表查看"},
    {"id":5,"pId":0,"name":"业务配置","open":true},
    {"id":51,"pId":5,"name":"教材管理"},
    {"id":511,"pId":51,"name":"创建"},
    {"id":512,"pId":51,"name":"删除"},
    {"id":513,"pId":51,"name":"修改"},
    {"id":514,"pId":51,"name":"查看"},
    {"id":52,"pId":5,"name":"错题配置"},
    {"id":6,"pId":0,"name":"系统管理","open":true},
    {"id":61,"pId":6,"name":"权限管理"},
    {"id":611,"pId":61,"name":"创建"},
    {"id":612,"pId":61,"name":"删除"},
    {"id":613,"pId":61,"name":"编辑"},
    {"id":614,"pId":61,"name":"复制"},
    {"id":615,"pId":61,"name":"列表查看"},
    {"id":62,"pId":6,"name":"登录超时"},
    {"id":63,"pId":6,"name":"错题反馈"},
    {"id":631,"pId":63,"name":"处理"},
    {"id":632,"pId":63,"name":"删除"},
    {"id":633,"pId":63,"name":"列表查看"},
    {"id":64,"pId":6,"name":"操作日志"},
    {"id":7,"pId":0,"name":"首页","open":true}
];

let hasPermission = function(permissionNameOrId){
    for(let i = 0, length = permissions.length; i < length ; i++){
        if((permissions[i].name===permissionNameOrId || permissions[i].id===permissionNameOrId)  && JSON.parse(sessionStorage.rolePermission).permissionIds.indexOf(permissions[i].id)!=-1){
            return true;
        }
    }
    return false;
};

export {hasPermission}