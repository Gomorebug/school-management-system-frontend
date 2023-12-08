import {defineConfig} from '@umijs/max';

export default defineConfig({
    antd: {},
    access: {},
    model: {},
    initialState: {},
    request: {},
    layout: {
        title: '@umijs/max',
    },
    plugins: ['@umijs/max-plugin-openapi'],
    mfsu: {
        strategy: 'normal',
    },
    openAPI: {
        requestLibPath: "import { request } from '@umijs/max'",
        schemaPath: 'http://localhost:8888/v3/api-docs',
        mock: false,
    },
    routes: [
        {
            name: '登录',
            path:'/login',
            component:'./Login',
            // 新页面打开
            target: '_blank',
            // 不展示顶栏
            headerRender: false,
            // 不展示页脚
            footerRender: false,
            // 不展示菜单
            menuRender: false,
            // 不展示菜单顶栏
            menuHeaderRender: false,
            // // 权限配置，需要与 plugin-access 插件配合使用
            // 隐藏子菜单
            hideChildrenInMenu: true,
            // 隐藏自己和子菜单
            hideInMenu: true,
            // 在面包屑中隐藏
            hideInBreadcrumb: true,
            // 子项往上提，仍旧展示,
            flatMenu: true,
        },
        {
            path: '/',
            redirect: '/login',
        },
        // {
        //   name: '首页',
        //   path: '/home',
        //   component: './Home',
        // },
        // {
        //   name: '权限演示',
        //   path: '/access',
        //   component: './Access',
        // },

        {
            name: '学生管理',
            path: '/table/students',
            component: './StudentTable',
        },
        {
            name: '教师管理',
            path: '/table/teachers',
            component: './TeacherTable',
        },
        {
            name: '课程管理',
            path: '/table/courses',
            component: './CourseTable',
        }
    ],
    define: {
        'process.env': {
            'UMI_ENV': process.env.UMI_ENV
        }
    },
    npmClient: 'yarn',
});

