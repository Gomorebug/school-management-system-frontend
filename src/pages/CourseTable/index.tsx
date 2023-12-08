import services from '@/services/management';
import {
    ActionType,
    FooterToolbar,
    PageContainer,
    ProDescriptions,
    ProDescriptionsItemProps,
    ProTable,
    EditableProTable
} from '@ant-design/pro-components';
import {Button, Space, Tag, Drawer, message, Divider} from 'antd';
import React, {useRef, useState} from 'react';
import CreateForm from './components/CreateForm';
import UpdateForm, {FormValueType} from './components/UpdateForm';
import {logger} from "@umijs/utils";

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
        await putStudent({
            sid: fields.sid || '',
        });
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
 *  删除节点
 * @param selectedRows
 */
const handleRemove = async (selectedRows: API.Student[]) => {
    const hide = message.loading('正在删除');
    if (!selectedRows) return true;
    try {
        await deleteStudent({
            sid: selectedRows.find((row) => row.sid)?.sid || '',
        });
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
            render: (_, record) => (
                <>
                    <a onClick={() => {
                        handleUpdateModalVisible(true);
                        setStepFormValues(record);
                    }}>
                        修改
                    </a>
                    <Divider type="vertical"/>
                    {/*TODO 增加删除功能*/}
                    <a> 删除 </a>
                </>
            ),
        },
    ];
    const courseColumns: ProDescriptionsItemProps<API.Course>[] = [
        {
            title: '课程名',
            dataIndex: 'cname',
            valueType: 'text',
            editable: false
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
            editable: false
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
            renderFormItem: (_, {defaultRender}) => {
                return defaultRender(_);
            },
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
                    录入
                </a>,
                <Divider type="vertical"/>,
                    // TODO 课程删除功能
                    <a key="delete" onClick={()=>{}}>
                        删除
                    </a>
                ]
        },
    ];
    const expandedRowRender = (expand: any, record: any) => {
        if (expand.courses.length === 0) return (<div>无课程</div>)
        return (
            <EditableProTable<API.Course>
                rowKey="cid"
                recordCreatorProps={false}
                columns={courseColumns}
                request={async () => ({
                    data: expand.courses,
                    total: expand.courses.length,
                    success: true,
                })
                }
                editable={{
                    type: 'multiple',
                    onSave: async (_, row) => {
                        // TODO 更新成绩
                    },
                    actionRender: (row, config, dom) => [dom.save, dom.cancel],
                }}
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
                headerTitle="学生表格"
                actionRef={actionRef}
                rowKey="sid"
                search={{
                    labelWidth: 120,
                }}
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
                    return {
                        data: data,
                        success: code === 200,
                    };
                }}
                columns={columns}
                rowSelection={{
                    onChange: (_, selectedRows) => setSelectedRows(selectedRows),
                }}
                expandable={{expandedRowRender}}
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
                            await handleRemove(selectedRowsState);
                            setSelectedRows([]);
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
                            if (actionRef.current) {
                                actionRef.current.reload();
                            }
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
