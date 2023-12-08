import {
    ProFormDateTimePicker,
    ProFormRadio,
    ProFormSelect,
    ProFormText,
    ProFormTextArea,
    StepsForm,
} from '@ant-design/pro-components';
import {Modal} from 'antd';
import React from 'react';
import services from "@/services/management";
import {prop} from "@umijs/utils/compiled/cheerio/lib/api/attributes";
const {getCourses} =services.courseController;

export interface FormValueType extends Partial<API.StudentCourse> {
    sid?: string;
    sname?: string;
    sage?: number;
    ssex?: string;
}

export interface UpdateFormProps {
    onCancel: (flag?: boolean, formVals?: FormValueType) => void;
    onSubmit: (values: FormValueType) => Promise<void>;
    updateModalVisible: boolean;
    values: Partial<API.Student>;
}

const UpdateForm: React.FC<UpdateFormProps> = (props) => (
    <StepsForm
        stepsProps={{
            size: 'small',
        }}
        stepsFormRender={(dom, submitter) => {
            return (
                <Modal
                    width={580}
                    style={{padding: '32px 40px 48px'}}
                    destroyOnClose
                    title="修改信息"
                    open={props.updateModalVisible}
                    footer={submitter}
                    onCancel={() => props.onCancel()}
                >
                    {dom}
                </Modal>
            );
        }}
        onFinish={props.onSubmit}
    >
        <StepsForm.StepForm
            initialValues={{
                sid: props.values.sid,
                sname: props.values.sname,
                ssex: props.values.ssex,
                sage: props.values.sage,
            }}
            title="基本信息"
        >
            <ProFormText
                width="md"
                name="sid"
                label="学号"
                disabled={true}
            />
            <ProFormText
                name="sname"
                width="md"
                label="姓名"
                placeholder="请输入至少五个字符"
                rules={[{required: true, message: '请输入学生姓名！'},]}
            />
            <ProFormSelect
                width="md"
                name="ssex"
                label="性别"
                valueEnum={{
                    0: '男',
                    1: '女',
                }}
            />
            <ProFormText
                width="md"
                name="sage"
                label="年龄"
            />
        </StepsForm.StepForm>
        <StepsForm.StepForm
            title="添加课程"
        >
            <ProFormSelect
                name="cids"
                label="课程"
                fieldProps={{
                    mode: 'tags',
                }}
                width="lg"
                initialValue={[]}
                request={async () => {
                    const res = await getCourses({sid:props.values.sid});
                    return res.data.map((item: { cname: any; cid: any; }) => ({
                        label: item.cname,
                        value: item.cid,
                    }));
                }}

            />



        </StepsForm.StepForm>
    </StepsForm>
);

export default UpdateForm;
