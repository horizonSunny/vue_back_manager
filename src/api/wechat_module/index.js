import http from '@/utils/http'
// 查询视屏列表
export function queryVideoList (params) {
  return http({
    url: 'wx/backend/query/expertsSays',
    method: 'get',
    params: params
  })
}
// 新增视屏资讯
export function insertVideo (params, config) {
  return http({
    url: 'wx/backend/expertsSay',
    method: 'post',
    data: params,
    config
  })
}
// 更新视屏资讯
export function updateVideo (params) {
  return http({
    url: 'wx/backend/expertsSay',
    method: 'put',
    data: params
  })
}
// 发布视屏资讯
export function updateVideoStatus (params) {
  return http({
    url: 'wx/backend/expertsSay/status',
    method: 'put',
    data: params
  })
}

// 查询DTP药店
export function queryDrugstoreList (params) {
  return http({
    url: 'wx/backend/query/drugstores',
    method: 'get',
    params: params
  })
}
// 新增DTP药店
export function insertDrugstore (params) {
  return http({
    url: 'wx/backend/drugstore',
    method: 'post',
    data: params
  })
}
// 更新DTP药店
export function updateDrugstore (params) {
  return http({
    url: 'wx/backend/drugstore',
    method: 'put',
    data: params
  })
}
// 修改DTP药店状态
export function updateDrugstoreStatus (params) {
  return http({
    url: 'wx/backend/drugstore/status',
    method: 'put',
    data: params
  })
}
// 下载模板
export function downloadDrugstoreTemplate (params) {
  return http({
    url: 'wx/backend/download/drugstoreTemplate',
    method: 'get',
    params: params
  })
}
// 上传模板
export function importDrugstores (params) {
  return http({
    url: 'wx/backend/importDrugstores',
    method: 'post',
    data: params
  })
}

// 查询医生专家
export function queryDoctorList (params) {
  return http({
    url: 'wx/backend/query/professorDoctors',
    method: 'get',
    params: params
  })
}
// 新增医生专家
export function insertDoctor (params) {
  return http({
    url: 'wx/backend/professorDoctor',
    method: 'post',
    data: params
  })
}
// 更新医生专家
export function updateDoctor (params) {
  return http({
    url: 'wx/backend/professorDoctor',
    method: 'put',
    data: params
  })
}
// 禁用/启用医生专家
export function updateDoctorStatus (params) {
  return http({
    url: 'wx/backend/professorDoctor/status',
    method: 'put',
    data: params
  })
}

// 查询联合医院
export function queryHospitalList (params) {
  return http({
    url: 'wx/backend/query/unionHospitals',
    method: 'get',
    params: params
  })
}
// 新增联合医院
export function insertHospital (params) {
  return http({
    url: 'wx/backend/unionHospital',
    method: 'post',
    data: params
  })
}
// 更新联合医院状态
export function updateHospitalStatus (params) {
  return http({
    url: 'wx/backend/unionHospital/status',
    method: 'put',
    data: params
  })
}
// 更新联合医院
export function updateHospital (params) {
  return http({
    url: 'wx/backend/unionHospital',
    method: 'put',
    data: params
  })
}

// 查询认知障碍
export function queryGraphicList (params) {
  return http({
    url: 'wx/backend/query/cognitiveDisorders',
    method: 'get',
    params: params
  })
}
// 新增认知障碍
export function insertGraphic (params) {
  return http({
    url: 'wx/backend/cognitiveDisorder',
    method: 'post',
    data: params
  })
}
// 更新认知障碍
export function updateGraphic (params) {
  return http({
    url: 'wx/backend/cognitiveDisorder',
    method: 'put',
    data: params
  })
}
// 禁用/启用认知障碍
export function updateGraphicStatus (params) {
  return http({
    url: 'wx/backend/cognitiveDisorder/status',
    method: 'put',
    data: params
  })
}
