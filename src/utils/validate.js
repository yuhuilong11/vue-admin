/**
 * 过滤特殊字符
 * **/

export function stripscript(str) {
    var pattern = new RegExp("[`~!@#$^&*()=|{}':;',\\[\\].<>/?~！@#￥……&*（）&;—|{ }【】‘；：”“'。，、？]")
    var rs = "";
    for (var i = 0; i < str.length; i++) {
        rs = rs + str.substr(i, 1).replace(pattern, '');
    }
    return rs;
}

// 验证邮箱

export function validateEmail(value){
    let reg = /^([a-zA-Z]|[0-9])(\w|\-)+@[a-zA-Z0-9]+\.([a-zA-Z]{2,4})$/;  //定义邮箱正则表达式

    return !reg.test(value) ? true : false ;  //三元运算

    // if(!reg.test(value)){
    //     return true
    // }
    // else{
    //     return false
    // }
}

// 验证密码
export function validatePsd(value){
    let reg = /^(?!\D+$)(?![^a-zA-Z]+$)\S{6,20}$/  //定义数字加字母的正则表达式

    return !reg.test(value) ? true : false;
//     if(!reg.test(value)){
//         return true
//     }
//     else{
//         return false
//     }

}

//验证验证码
export function validateVCode(value){
    let reg = /^[a-z0-9]{6}$/ //定义数字或字母的正则表达式
    return !reg.test(value) ? true : false;
}