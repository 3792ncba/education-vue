import request from '@/utils/request'

// 查询商品类别列表
export function listGoodsClasses(query) {
  return request({
    url: '/business/goodsClasses/list',
    method: 'get',
    params: query
  })
}

// 查询全部商品类别列表
export function listAllGoodsClasses(query) {
  return request({
    url: '/business/goodsClasses/listAll',
    method: 'get',
    params: query
  })
}

// 查询商品类别详细
export function getGoodsClasses(classesId) {
  return request({
    url: '/business/goodsClasses/' + classesId,
    method: 'get'
  })
}

// 新增商品类别
export function addGoodsClasses(data) {
  return request({
    url: '/business/goodsClasses',
    method: 'post',
    data: data
  })
}

// 修改商品类别
export function updateGoodsClasses(data) {
  return request({
    url: '/business/goodsClasses',
    method: 'put',
    data: data
  })
}

// 删除商品类别
export function delGoodsClasses(classesId) {
  return request({
    url: '/business/goodsClasses/' + classesId,
    method: 'delete'
  })
}
