import request from '@/utils/request'

// 查询资源类别管理列表
export function listResourceClasses(query) {
  return request({
    url: '/business/resourceClasses/list',
    method: 'get',
    params: query
  })
}

//查询全部资源类别列表
export function listAllResourceClasses() {
  return request({
    url: '/business/resourceClasses/listAll',
    method: 'get'
  })
}

// 查询资源类别管理详细
export function getResourceClasses(classesId) {
  return request({
    url: '/business/resourceClasses/' + classesId,
    method: 'get'
  })
}

// 新增资源类别管理
export function addResourceClasses(data) {
  return request({
    url: '/business/resourceClasses',
    method: 'post',
    data: data
  })
}

// 修改资源类别管理
export function updateResourceClasses(data) {
  return request({
    url: '/business/resourceClasses',
    method: 'put',
    data: data
  })
}

// 删除资源类别管理
export function delResourceClasses(classesId) {
  return request({
    url: '/business/resourceClasses/' + classesId,
    method: 'delete'
  })
}
