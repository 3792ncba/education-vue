import request from '@/utils/request'

// 查询资讯管理列表
export function listMessage(query) {
  return request({
    url: '/business/message/list',
    method: 'get',
    params: query
  })
}

// 查询资讯管理详细
export function getMessage(messageId) {
  return request({
    url: '/business/message/' + messageId,
    method: 'get'
  })
}

// 新增资讯管理
export function addMessage(data) {
  return request({
    url: '/business/message',
    method: 'post',
    data: data
  })
}

// 修改资讯管理
export function updateMessage(data) {
  return request({
    url: '/business/message',
    method: 'put',
    data: data
  })
}

// 删除资讯管理
export function delMessage(messageId) {
  return request({
    url: '/business/message/' + messageId,
    method: 'delete'
  })
}
