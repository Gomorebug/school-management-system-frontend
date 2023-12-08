declare namespace API {

  type LoginParams={
    username:string;
    password:string;
  };
  type deleteStudentCourseListParams = {
    sid: string;
  };

  type deleteStudentCourseParams = {
    sid: string;
    cid: string;
  };

  type deleteStudentParams = {
    sid: string;
  };

  type deleteTeacherToCourseParams = {
    tid: string;
    cid: string;
  };

  type getGradeStatisticsByTeacherParams = {
    tid: string;
  };

  type getStudentByCondition1Params = {
    student: Student;
  }&Student;

  type getStudentByConditionParams = {
    student: Student;
  };

  type getStudentCredits1Params = {
    sid: string;
  };

  type postStudentCourseParams = {
    sid: string;
    cid: string;
  };

  type postTeacherToCourseParams = {
    tid: string;
    cid: string;
  };

  type putStudentParams = {
    sid: string;
  };

  type putTeacherParams = {
    tid: string;
  };

  type ResponseResult = {
    code?: number;
    message?: string;
    data?: any;
  };

  type Student = {
    sid?: string;
    sname?: string;
    ssex?: string;
    sage?: number;
    courses?: Course[];
    cids?: string[];
  };

  type Teacher = {
    tid?: string;
    tname?: string;
    tsalary?: number;
    title?: string;
    courses?: Course[];
  };
  type Course = {
    cid?: string;
    cname?: string;
    ccredit?: number;
  }&Teacher;
  type StudentCourse = {
    grade?: number;
    tname?: string;
  }&Course&Student;

  type updateStudentGradeParams = {
    sid: string;
    cid: string;
  };
}
