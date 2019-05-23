export function deepCopy (source) {
  var sourceCopy = source instanceof Array ? [] : {}
  for (var item in source) {
    sourceCopy[item] =
      typeof source[item] === 'object' ? deepCopy(source[item]) : source[item]
  }
  return sourceCopy
}
// 过滤属性值为propsArray包含的类型的对象属性
export function getTargetObject (targetObject, propsArray) {
  if (typeof targetObject !== 'object' || !Array.isArray(propsArray)) {
    throw new Error('参数格式不正确')
  }
  const result = {}
  Object.keys(targetObject)
    .filter(key => targetObject[key] !== '')
    .forEach(key => {
      result[key] = targetObject[key]
    })
  return result
}

// 依据子级内的属性获取父级对象的值的数组
export function getMatchArr (targetObject, property, array) {
  if (typeof targetObject !== 'object' || !Array.isArray(array)) {
    throw new Error('参数格式不正确')
  }
  const result = {}
  Object.keys(targetObject)
    .filter(key => targetObject[key] !== '')
    .forEach(key => {
      result[key] = targetObject[key]
    })
  return result
}
