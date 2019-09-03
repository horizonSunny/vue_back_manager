export function validateRequire (params) {
  if (!params) {
    return false
  } else {
    return true
  }
}
export function validateEmail (params) {
  var reg = new RegExp(
    '^[a-z0-9]+([._\\-]*[a-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$'
  )
  if (!reg.test(params)) {
    // 正则验证不通过，格式不对
    return false
  } else {
    return true
  }
}
