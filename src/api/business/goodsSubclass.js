import request from '@/utils/request'

// 查询商品子类列表
export function listGoodsSubclass(query) {
  return request({
    url: '/business/goodsSubclass/list',
    method: 'get',
    params: query
  })
}

// 查询商品子类详细
export function getGoodsSubclass(subclassId) {
  return request({
    url: '/business/goodsSubclass/' + subclassId,
    method: 'get'
  })
}

// 新增商品子类
export function addGoodsSubclass(data) {
  return request({
    url: '/business/goodsSubclass',
    method: 'post',
    data: data
  })
}

// 修改商品子类
export function updateGoodsSubclass(data) {
  return request({
    url: '/business/goodsSubclass',
    method: 'put',
    data: data
  })
}

// 删除商品子类
export function delGoodsSubclass(subclassId) {
  return request({
    url: '/business/goodsSubclass/' + subclassId,
    method: 'delete'
  })
}
