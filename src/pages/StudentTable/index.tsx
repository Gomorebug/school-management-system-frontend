import services from '@/services/management';
import {
    ActionType,
    FooterToolbar,
    PageContainer,
    ProDescriptions,
    ProDescriptionsItemProps,
    ProTable,
    EditableProTable, ProCoreActionType
} from '@ant-design/pro-components';
import {Button, Space, Tag, Drawer, message, Divider, Select} from 'antd';
import React, {useEffect, useRef, useState} from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, {FormValueType} from './components/UpdateForm';
import {
    deleteStudentCourse,
    deleteStudentList,
    postStudentCourse,
    updateStudentGrade
} from "@/services/management/studentController";
import {Access, useModel} from "@umijs/max";
const {getStudentByCondition, putStudent, deleteStudent, postStudent} =
    services.studentController;



/**
 * 添加节点
 * @param fields
 */
const handleAdd = async (fields: API.Student) => {
    const hide = message.loading('正在添加');
    try {
        await postStudent({...fields});
        hide();
        message.success('添加成功');
        return true;
    } catch (error) {
        hide();
        message.error('添加失败请重试！');
        return false;
    }
};

/**
 * 更新节点
 * @param fields
 */
const handleUpdate = async (fields: FormValueType) => {
    const hide = message.loading('正在修改');
    try {
        const{cids,...student}=fields;
        await putStudent({sid: fields.sid} as API.putStudentParams,{student,cids});
        hide();
        message.success('修改成功');
        return true;
    } catch (error) {
        hide();
        message.error('修改失败请重试！');
        return false;
    }
};
/**
 * 删除学生课程
 * @param sid
 * @param cid
 */


/**
 *  删除学生
 * @param selectedRows
 */
const handleStudentRemove = async (selectedRows: API.Student[] | API.Student) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        if (Array.isArray(selectedRows)) {
            // 如果是数组，遍历并删除每个元素

            await deleteStudentList({
                sids: selectedRows.map((row) => row.sid)
            });
        } else {
            // 如果是单个对象，直接删除
            await deleteStudent({sid: selectedRows.sid} as API.deleteStudentParams);
        }
        hide();
        message.success('删除成功，即将刷新');
        return true;
    } catch (error) {
        hide();
        message.error('删除失败，请重试');
        return false;
    }
};

const TableList: React.FC<unknown> = () => {
    const [createModalVisible, handleModalVisible] = useState<boolean>(false);
    const [updateModalVisible, handleUpdateModalVisible] =
        useState<boolean>(false);
    const [stepFormValues, setStepFormValues] = useState({});
    const actionRef = useRef<ActionType>();
    const [row, setRow] = useState<API.Student>();
    const [selectedRowsState, setSelectedRows] = useState<API.Student[]>([]);
    const [courses, setCourses] = useState<API.Course[]>([]);
    const [selectedCourse,setSelectedCourse]=useState<API.Course>();
    const [studentCourses,setStudentCourses]=useState<readonly  API.StudentCourse[]>([]);
    const [refresh, setRefresh] = useState(0);

    const columns: ProDescriptionsItemProps<API.Student>[] = [
        {
            title: '学号',
            dataIndex: 'sid',
            tip: '学号是唯一标识',
            formItemProps: {
                rules: [
                    {
                        required: true,
                        message: '名称为必填项',
                    },
                ],
            },
        },
        {
            title: '名字',
            dataIndex: 'sname',
            valueType: 'text',
        },
        {
            title: '性别',
            dataIndex: 'ssex',
            valueEnum: {
                0: {text: '男', status: 'MALE'},
                1: {text: '女', status: 'FEMALE'},
            },
        },
        {
            title: '年龄',
            dataIndex: 'sage',
            valueType: 'digit',
        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (text, record, _, action:ProCoreActionType) => [
                <a
                    key="editable"
                    onClick={() => {
                        handleUpdateModalVisible(true);
                        setStepFormValues(record);
                    }}
                >
                    修改
                </a>,
                <Divider type="vertical"/>,
                <a key="delete" onClick={async () => {
                    await handleStudentRemove(record);
                    await action?.reloadAndRest?.();
                }}>
                    删除
                </a>
            ]
        },
    ];
    const courseColumns: ProDescriptionsItemProps<API.StudentCourse>[] = [
        {
            title: '课程名',
            dataIndex: 'cname',
            valueType: 'text',
            editable: false,
            renderFormItem: (_, {defaultRender, ...rest}, form) => {
                // 这里假设你的可选课程名为 options
                return (
                    <Select {...rest} placeholder="请选择课程名" onChange={(value) => {
                        const course = courses.find((option) => option.cname === value);
                        setSelectedCourse(course || undefined);
                    }}>
                        {courses.map((option) => (

                            <Select.Option key={option.cid} value={option.cname}>
                                {option?.cname}
                            </Select.Option>
                        ))}
                    </Select>
                );}
        },
        {
            title: '任课教师',
            dataIndex: 'tname',
            valueType: 'text',
            editable: false
        },
        {
            title: '学分',
            dataIndex: 'ccredit',
            hideInForm: true,
            valueType: 'digit',
            editable:false
        },
        {
            title: '成绩',
            dataIndex: 'grade',
            hideInForm: true,
            valueType: 'digit',
        },
        {
            title: '状态',
            dataIndex: 'status',
            hideInForm: true,
            editable: false,
            // renderFormItem: (_, {defaultRender}) => {
            //     return defaultRender(_);
            // },
            render: (_, record) => (
                <Space>
                    {record?.grade ? (
                            record.grade > 60 ? (
                                <Tag color="green">通过</Tag>
                            ) : (
                                <Tag color="red">挂科</Tag>
                            )
                        ) :
                        <Tag color="gray">未录入</Tag>
                    }

                </Space>
            ),

        },
        {
            title: '操作',
            dataIndex: 'option',
            valueType: 'option',
            render: (text, record, _, action) => [
                <a
                    key="editable"
                    onClick={() => {
                        action?.startEditable?.(record?.cid || -1);
                    }}
                >
                    修改
                </a>,
                <Divider type="vertical"/>,

            ]
        },
    ];

    const expandedRowRender = (expand: any, record: any) => {

        const defaultData=expand.courses.map((item: API.StudentCourse) => ({...item, sid: expand.sid}))
        return (
            <EditableProTable<API.StudentCourse>
                rowKey="cid"
                columns={courseColumns}
                key={refresh}
                request={async () => ({
                    data:defaultData,
                    total:defaultData.length,
                    success: true,
                })}
                actionRef={actionRef}
                editable={{
                    type: 'single',
                    onDelete: async (_, row) => {
                        const hide = message.loading("正在删除")
                        try {
                            hide();
                            // @ts-ignore
                            await deleteStudentCourse({sid: row.sid, cid: row.cid});
                            expand.courses = expand.courses.filter((course: { cid: string | undefined; }) => course.cid !== row.cid);
                            message.success("删除成功");
                            return true;
                        } catch (error) {
                            hide();
                            message.error('修改失败请重试！');
                            return false;
                        }
                    },
                    //点击保存
                    onSave: async (_, row) => {
                        const hide = message.loading('正在修改');
                        try {
                            // @ts-ignore
                            await updateStudentGrade({sid:expand.sid,cid:row.cid},{grade:row.grade});
                            hide();
                            message.success('修改成功');
                            // 更新 expand.courses
                            expand.courses = expand.courses.map((course: { cid: string | undefined; }) => course.cid === row.cid ? {...course, grade: row.grade} : course);
                            return true;
                        } catch (error) {
                            hide();
                            message.error('修改失败请重试！');
                            return false;
                        }
                    },
                }}
                recordCreatorProps={false}
            />

        )
    }

    return (
            <PageContainer
                header={{
                    title: '学生系统',
                }}
            >
                <ProTable<API.Student>
                    actionRef={actionRef}
                    rowKey="sid"
                    search={{labelWidth: 120}}
                    recordCreatorProps={false}
                    toolBarRender={() => [
                        <Button
                            key="1"
                            type="primary"
                            onClick={() => handleModalVisible(true)}
                        >
                            新建
                        </Button>,
                    ]}
                    request={async (params, sorter, filter) => {
                        const {data, code} = await getStudentByCondition({
                            ...params,
                            sorter,
                            filter,
                        });

                        setRefresh(refresh + 1);
                        return {
                            data: data,
                            success: code === 200,
                        };
                    }}
                    columns={columns}
                    rowSelection={{
                        onChange: (_, selectedRows) => setSelectedRows(selectedRows),
                    }}
                    expandable={{
                        expandedRowRender,
                    }}
                />
                {selectedRowsState?.length > 0 && (
                    <FooterToolbar
                        extra={
                            <div>
                                已选择{' '}
                                <a style={{fontWeight: 600}}>{selectedRowsState.length}</a>{' '}
                                项&nbsp;&nbsp;
                            </div>
                        }
                    >
                        <Button
                            onClick={async () => {
                                await handleStudentRemove(selectedRowsState);
                                setSelectedRows([]);
                                setRefresh(refresh+1);

                                actionRef.current?.reloadAndRest?.();
                            }}
                        >
                            批量删除
                        </Button>
                        <Button type="primary">批量审批</Button>
                    </FooterToolbar>
                )}
                <CreateForm
                    onCancel={() => handleModalVisible(false)}
                    modalVisible={createModalVisible}
                >
                    <ProTable<API.Student, API.Student>
                        onSubmit={async (value) => {
                            const success = await handleAdd(value);
                            if (success) {
                                handleModalVisible(false);
                                if (actionRef.current) {
                                    actionRef.current.reload();
                                }
                            }
                        }}
                        rowKey="sid"
                        type="form"
                        columns={columns}
                    />
                </CreateForm>
                {stepFormValues && Object.keys(stepFormValues).length ? (
                    <UpdateForm
                        onSubmit={async (value) => {
                            const success = await handleUpdate(value);
                            if (success) {
                                handleUpdateModalVisible(false);
                                setStepFormValues({});
                                actionRef.current?.reload?.();
                            }
                        }}
                        onCancel={() => {
                            handleUpdateModalVisible(false);
                            setStepFormValues({});
                        }}
                        updateModalVisible={updateModalVisible}
                        values={stepFormValues}
                    />
                ) : null}

                <Drawer
                    width={600}
                    open={!!row}
                    onClose={() => {
                        setRow(undefined);
                    }}
                    closable={false}
                >
                    {row?.sname && (
                        <ProDescriptions<API.Student>
                            column={2}
                            title={row?.sname}
                            request={async () => ({
                                data: row || {},
                            })}
                            params={{
                                id: row?.sname,
                            }}
                            columns={columns}
                        />
                    )}
                </Drawer>
            </PageContainer>

    );
};

export default TableList;
