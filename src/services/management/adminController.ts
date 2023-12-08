import { request } from '@umijs/max';

import {baseURL} from "../../../config";
const apiURL="/api/v1/admins";
//登录
export async function adminLogin(
    params:API.LoginParams
) {
    return request<API.ResponseResult>(`${baseURL}${apiURL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        data: params,
    });
}