import request from '@/utils/request'

// 查询商品列表
export function listGoods(query) {
  return request({
    url: '/business/goods/list',
    method: 'get',
    params: query
  })
}

// 查询商品详细
export function getGoods(goodsId) {
  return request({
    url: '/business/goods/' + goodsId,
    method: 'get'
  })
}

// 新增商品
export function addGoods(data) {
  return request({
    url: '/business/goods',
    method: 'post',
    data: data
  })
}

// 修改商品
export function updateGoods(data) {
  return request({
    url: '/business/goods',
    method: 'put',
    data: data
  })
}

// 删除商品
export function delGoods(goodsId) {
  return request({
    url: '/business/goods/' + goodsId,
    method: 'delete'
  })
}
