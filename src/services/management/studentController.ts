// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

import {baseURL} from "../../../config";
import {FormValueType} from "@/pages/CourseTable/components/UpdateForm";
const apiURL="/api/v1/students";
/** 添加学生信息 POST ${baseURL}${apiURL} */


export async function postStudent(body: API.Student, options?: { [key: string]: any }) {
  return request<API.ResponseResult>(`${baseURL}${apiURL}`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 修改学生信息 PUT ${baseURL}${apiURL}/${param0} */
export async function putStudent(
    // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
    params: API.putStudentParams,
    body: { student: Omit<FormValueType, "cids">; cids: string[] | undefined },
    options?: { [p: string]: any },
) {
  const { sid: param0, ...queryParams } = params;
  console.log(body)
  return request<API.ResponseResult>(`${baseURL}${apiURL}/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 删除学生信息 DELETE ${baseURL}${apiURL}/${param0} */
export async function deleteStudent(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteStudentParams,
  options?: { [key: string]: any },
) {
  const { sid: param0, ...queryParams } = params;
  return request<API.ResponseResult>(`${baseURL}${apiURL}/${param0}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 条件查询学生信息 GET ${baseURL}${apiURL}/${param0}/condition */
export async function getStudentByCondition1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStudentByCondition1Params,
  options?: { [key: string]: any },
) {
  const { sid: param0, ...queryParams } = params;
  return request<API.ResponseResult>(`${baseURL}${apiURL}${param0}/condition`, {
    method: 'GET',
    params: {
      ...queryParams,
      student: undefined,
      ...queryParams['student'],
    },
    ...(options || {}),
  });
}

/** 批量删除学生课程 DELETE ${baseURL}${apiURL}/${param0}/courses */
export async function deleteStudentCourseList(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteStudentCourseListParams,
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  const { sid: param0, ...queryParams } = params;
  return request<API.ResponseResult>(`${baseURL}${apiURL}${param0}/courses`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 添加学生的课程 POST ${baseURL}${apiURL}/${param0}/courses/${param1} */
export async function postStudentCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postStudentCourseParams,
  body:API.StudentCourse,
  options?: { [key: string]: any },
) {
  const { sid: param0, cid: param1, ...queryParams } = params;
  return request<API.ResponseResult>(`${baseURL}${apiURL}/${param0}/courses/${param1}`, {
    method: 'POST',
    params: { ...queryParams },
    data:body,
    ...(options || {}),
  });
}

/** 删除学生的课程 DELETE ${baseURL}${apiURL}/${param0}/courses/${param1} */
export async function deleteStudentCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteStudentCourseParams,
  options?: { [key: string]: any },
) {
  const { sid: param0, cid: param1, ...queryParams } = params;
  return request<API.ResponseResult>(`${baseURL}${apiURL}/${param0}/courses/${param1}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 修改学生的课程成绩 PUT ${baseURL}${apiURL}/${param0}/courses/${param1}/grade */
export async function updateStudentGrade(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.updateStudentGradeParams,
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  const { sid: param0, cid: param1, ...queryParams } = params;
  return request<API.ResponseResult>(`${baseURL}${apiURL}/${param0}/courses/${param1}/grade`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 查询学生总学分与完成学分 GET ${baseURL}${apiURL}/${param0}/credits */
export async function getStudentCredits1(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStudentCredits1Params,
  options?: { [key: string]: any },
) {
  const { sid: param0, ...queryParams } = params;
  return request<API.ResponseResult>(`${baseURL}${apiURL}/${param0}/credits`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 条件查询学生信息 GET ${baseURL}${apiURL}/condition */
export async function getStudentByCondition(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getStudentByConditionParams,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult>(`${baseURL}${apiURL}/condition`, {
    method: 'GET',
    params: {
      ...params,
      student: undefined,
      ...params['student'],
    },
    ...(options || {}),
  });
}

/** 查询学生总学分与完成学分 GET ${baseURL}${apiURL}/credits */
export async function getStudentCredits(options?: { [key: string]: any }) {
  return request<API.ResponseResult>(`${baseURL}${apiURL}/credits`, {
    method: 'GET',
    ...(options || {}),
  });
}

/** 批量添加学生信息 POST ${baseURL}${apiURL}/list */
export async function postStudentList(body: API.Student[], options?: { [key: string]: any }) {
  return request<API.ResponseResult>(`${baseURL}${apiURL}/list`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 批量删除学生信息 DELETE ${baseURL}${apiURL}/list */
export async function deleteStudentList(
  body: Record<string, any>,
  options?: { [key: string]: any },
) {
  return request<API.ResponseResult>(`${baseURL}${apiURL}/list`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json',
    },
    data: body,
    ...(options || {}),
  });
}

/** 学生登录 **/
export async function studentLogin(
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