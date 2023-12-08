// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

import {baseURL} from "../../../config";
const apiURL="/api/v1/courses";

/** 获取课程信息 GET ${baseURL}${apiURL}/${param0} */
export async function getCourses(
    params:API.StudentCourse
) {
    const { sid: param0, ...queryParams } = params;
    return request<API.ResponseResult>(`${baseURL}${apiURL}/${param0}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
    });
}
