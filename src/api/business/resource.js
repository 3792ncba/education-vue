import request from '@/utils/request'

// 查询资源管理列表
export function listResource(query) {
  return request({
    url: '/business/resource/list',
    method: 'get',
    params: query
  })
}

// 查询资源管理详细
export function getResource(resourceId) {
  return request({
    url: '/business/resource/' + resourceId,
    method: 'get'
  })
}

// 文件上传
export function fileUpload(data) {
  return request({
    url: '/business/resource/fileUpload',
    method: 'post',
    data: data
  })
}

// 新增资源管理
export function addResource(data) {
  return request({
    url: '/business/resource',
    method: 'post',
    data: data
  })
}

// 修改资源管理
export function updateResource(data) {
  return request({
    url: '/business/resource',
    method: 'put',
    data: data
  })
}

// 删除资源管理
export function delResource(resourceId) {
  return request({
    url: '/business/resource/' + resourceId,
    method: 'delete'
  })
}
