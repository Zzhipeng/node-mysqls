
// 工具类函数

// js判断两个对象的值是否相等
function isObjectValueEqual(a, b) {
    let aProps = Object.getOwnPropertyNames(a);
    let bProps = Object.getOwnPropertyNames(b);
    //判断属性名的length是否一致
    //    if (aProps.length != bProps.length) {
    //        return false;
    //    }
    //循环取出属性名，再判断属性值是否一致
    for (let i = 0; i < aProps.length; i++) {
        let propName = aProps[i];
        if (a[propName] !== b[propName]) {
            return propName;
        }
    }
    return false
}
module.exports =  {
    isObjectValueEqual
} 