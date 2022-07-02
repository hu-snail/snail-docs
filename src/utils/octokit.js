import { Octokit, App } from "https://cdn.skypack.dev/octokit";
import { setting } from '@/config/github.config.js'

const { AUTH_TOKEN, SUCCESS_CODE } = setting
const octokit = new Octokit({
    auth: AUTH_TOKEN
})

const reuqest = async({method = 'GET', url, params}) => {
    return new Promise(async (resolve, reject) => {
       const {data, status} = await octokit.request(`${method} ${url}`, params)
       if (status === SUCCESS_CODE) resolve(data)
       else reject(data)
    })
}
export default reuqest