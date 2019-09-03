import { areaData } from './area.js'
import store from '@/store'

export function getProvince () {
  let province = []
  areaData.forEach(item => {
    province.push({
      'value': item.value,
      'text': item.text
    })
  })
  return province
}

export function getCity (id) {
  let city = []
  if (!id) {
    return city
  } else {
    areaData.forEach(item => {
      if (item.value === id) {
        city = item.children
      }
    })
  }
  return city
}

export function getAsyncProvince () {
  let province = []
  store.getters.wxhospitals.forEach(item => {
    province.push({
      'value': item.value,
      'name': item.name
    })
  })
  return province
}

export function getAsyncCity (id) {
  let city = []
  if (!id) {
    return city
  } else {
    store.getters.wxhospitals.forEach(item => {
      if (item.value === id) {
        city = item.children
      }
    })
  }
  return city
}
