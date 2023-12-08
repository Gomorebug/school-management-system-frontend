// @ts-ignore
/* eslint-disable */
import { request } from '@umijs/max';

/** 获取全部教师信息 GET /api/v1/teachers */
export async function getTeacher(options?: { [key: string]: any }) {
  return request<API.ResponseResult>('/api/v1/teachers', {
    method: 'GET',
    ...(options || {}),
  });
}

/** 修改教师信息 PUT /api/v1/teachers/${param0} */
export async function putTeacher(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.putTeacherParams,
  body: API.Teacher,
  options?: { [key: string]: any },
) {
  const { tid: param0, ...queryParams } = params;
  return request<API.ResponseResult>(`/api/v1/teachers/${param0}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    params: { ...queryParams },
    data: body,
    ...(options || {}),
  });
}

/** 为教师添加单个课程 POST /api/v1/teachers/${param0}/courses/${param1} */
export async function postTeacherToCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.postTeacherToCourseParams,
  options?: { [key: string]: any },
) {
  const { tid: param0, cid: param1, ...queryParams } = params;
  return request<API.ResponseResult>(`/api/v1/teachers/${param0}/courses/${param1}`, {
    method: 'POST',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 为教师删除单个课程 DELETE /api/v1/teachers/${param0}/courses/${param1} */
export async function deleteTeacherToCourse(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.deleteTeacherToCourseParams,
  options?: { [key: string]: any },
) {
  const { tid: param0, cid: param1, ...queryParams } = params;
  return request<API.ResponseResult>(`/api/v1/teachers/${param0}/courses/${param1}`, {
    method: 'DELETE',
    params: { ...queryParams },
    ...(options || {}),
  });
}

/** 获取教师所教的每门课程的平均成绩、最高分、最低分 GET /api/v1/teachers/${param0}/grades/statistics */
export async function getGradeStatisticsByTeacher(
  // 叠加生成的Param类型 (非body参数swagger默认没有生成对象)
  params: API.getGradeStatisticsByTeacherParams,
  options?: { [key: string]: any },
) {
  const { tid: param0, ...queryParams } = params;
  return request<API.ResponseResult>(`/api/v1/teachers/${param0}/grades/statistics`, {
    method: 'GET',
    params: { ...queryParams },
    ...(options || {}),
  });
}
