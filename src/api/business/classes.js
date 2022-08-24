import request from '@/utils/request'

// 查询资讯类别列表
export function listClasses(query) {
  return request({
    url: '/business/classes/list',
    method: 'get',
    params: query
  })
}

//查询全部资讯类别列表
export function listAllClasses() {
  return request({
    url: '/business/classes/listAll',
    method: 'get'
  })
}

// 查询资讯类别详细
export function getClasses(classesId) {
  return request({
    url: '/business/classes/' + classesId,
    method: 'get'
  })
}

// 新增资讯类别
export function addClasses(data) {
  return request({
    url: '/business/classes',
    method: 'post',
    data: data
  })
}

// 修改资讯类别
export function updateClasses(data) {
  return request({
    url: '/business/classes',
    method: 'put',
    data: data
  })
}

// 删除资讯类别
export function delClasses(classesId) {
  return request({
    url: '/business/classes/' + classesId,
    method: 'delete'
  })
}
