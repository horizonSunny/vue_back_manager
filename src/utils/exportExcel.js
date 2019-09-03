import { getToken } from '@/utils/token'
import baseUrl from './global'

function createObjectURL (object) {
  return window.URL
    ? window.URL.createObjectURL(object)
    : window.webkitURL.createObjectURL(object)
}

export function exportExcelPost (url, params, exportName) {
  var xhr = new XMLHttpRequest()
  xhr.open('post', baseUrl + url) // url填写后台的接口地址，如果是post，在formData append参数（参考原文地址）
  xhr.setRequestHeader('Token', getToken())
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xhr.send(JSON.stringify(params))
  xhr.responseType = 'blob'
  xhr.onload = function (e) {
    if (this.status === 200) {
      var blob = this.response
      var filename = exportName + '.xls'
      console.log('this.response_', this.response)
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename)
      } else {
        var a = document.createElement('a')
        var url = createObjectURL(blob)
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      }
    }
  }
}

export function exportExcelGet (url, exportName) {
  var xhr = new XMLHttpRequest()
  var formData = new FormData()
  xhr.open('get', baseUrl + url) // url填写后台的接口地址，如果是post，在formData append参数（参考原文地址）
  xhr.setRequestHeader('Token', getToken())
  xhr.setRequestHeader('Content-Type', 'application/json;charset=UTF-8')
  xhr.responseType = 'blob'
  xhr.onload = function (e) {
    if (this.status === 200) {
      var blob = this.response
      var filename = exportName + '.xls'
      console.log('this.response_', this.response)
      var disposition = this.getResponseHeader('Content-Disposition')
      var tempFileName = disposition.split(';')[1]
      if (tempFileName) {
        filename = tempFileName.split('=')[1]
      }
      if (window.navigator.msSaveOrOpenBlob) {
        navigator.msSaveBlob(blob, filename)
      } else {
        var a = document.createElement('a')
        var url = createObjectURL(blob)
        a.href = url
        a.download = filename
        document.body.appendChild(a)
        a.click()
        window.URL.revokeObjectURL(url)
      }
    }
  }
  xhr.send(formData)
}
