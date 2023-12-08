import {
    AlipayCircleOutlined,
    LockOutlined,
    MobileOutlined,
    TaobaoCircleOutlined,
    UserOutlined,
    WeiboCircleOutlined,
} from '@ant-design/icons';
import {
    LoginForm,
    ProConfigProvider,
    ProFormCaptcha,
    ProFormCheckbox,
    ProFormText,
    setAlpha,
} from '@ant-design/pro-components';
import { Space, Tabs, message, theme } from 'antd';
import type { CSSProperties } from 'react';
import { useState } from 'react';
import {adminLogin} from "@/services/management/adminController";
type LoginType = 'account';

export default () => {
    const { token } = theme.useToken();
    const [loginType, setLoginType] = useState<LoginType>('account');
    const iconStyles: CSSProperties = {
        marginInlineStart: '16px',
        color: setAlpha(token.colorTextBase, 0.2),
        fontSize: '24px',
        verticalAlign: 'middle',
        cursor: 'pointer',
    };

    return (
        <ProConfigProvider hashed={false}>
            <div style={{ backgroundColor: token.colorBgContainer }}>
                <LoginForm
                    logo="https://github.githubassets.com/images/modules/logos_page/Octocat.png"
                    title="Hugcode"
                    subTitle="学生管理平台"
                    actions={
                        <Space>
                            {/*TODO 贴上作者链接*/}
                        </Space>
                    }
                    onFinish={async (values) => {
                        // const res=await adminLogin(values as API.LoginParams)
                        //
                        // if(res.code==200){
                        //     //给权限浏览
                        //     document.cookie = `token=${res.data.token}`;
                        //     window.location.href='/table/students'
                        // }
                        // //跳转页面到/table/students
                        // else message.error(res.message);
                    }}
                >
                    <Tabs
                        centered
                        activeKey={loginType}
                        onChange={(activeKey) => setLoginType(activeKey as LoginType)}
                    >
                        <Tabs.TabPane key={'account'} tab={'账号密码登录'} />
                    </Tabs>
                    {loginType === 'account' && (
                        <>
                            <ProFormText
                                name="username"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <UserOutlined className={'prefixIcon'} />,
                                }}
                                placeholder={'学号'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入用户名!',
                                    },
                                ]}
                            />
                            <ProFormText.Password
                                name="password"
                                fieldProps={{
                                    size: 'large',
                                    prefix: <LockOutlined className={'prefixIcon'} />,
                                    strengthText:
                                        'Password should contain numbers, letters and special characters, at least 8 characters long.',

                                    statusRender: (value) => {
                                        const getStatus = () => {
                                            if (value && value.length > 12) {
                                                return 'ok';
                                            }
                                            if (value && value.length > 6) {
                                                return 'pass';
                                            }
                                            return 'poor';
                                        };
                                        const status = getStatus();
                                        if (status === 'pass') {
                                            return (
                                                <div style={{ color: token.colorWarning }}>
                                                    强度：中
                                                </div>
                                            );
                                        }
                                        if (status === 'ok') {
                                            return (
                                                <div style={{ color: token.colorSuccess }}>
                                                    强度：强
                                                </div>
                                            );
                                        }
                                        return (
                                            <div style={{ color: token.colorError }}>强度：弱</div>
                                        );
                                    },
                                }}
                                placeholder={'密码'}
                                rules={[
                                    {
                                        required: true,
                                        message: '请输入密码！',
                                    },
                                ]}
                            />
                        </>
                    )}
                    <div
                        style={{
                            marginBlockEnd: 24,
                        }}
                    >
                        <ProFormCheckbox noStyle name="autoLogin">
                            自动登录
                        </ProFormCheckbox>
                        <a
                            style={{
                                float: 'right',
                            }}
                        >
                            忘记密码
                        </a>
                    </div>
                </LoginForm>
            </div>
        </ProConfigProvider>
    );
};