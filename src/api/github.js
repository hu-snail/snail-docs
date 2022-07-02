import request from '@/utils/octokit.js'

/**
 * @description 获取仓库资源
 * API：GET /search/repositories
 * @param q {string}
 * @param order {string}
 * @param per_page { integer }
 * @param page { integer }
 */

export const getSearchRepo = (params) => {
    return request({
        url: '/search/repositories',
        method: 'GET',
        params
    })
}