# React Admin Template

## TODO

1. 环境变量✅
2. 代码格式化和语法检测✅
3. axios请求封装✅
4. Router和Layout✅
5. 页面鉴权WithAuth✅
6. 路由权限管理✅
7. 状态管理(userInfo...)✅
8. 主题切换✅
9. 多语言✅
10. Echarts❌
11. 各种组件Example❌

## 环境变量

- 设置方式：根目录下`.env`/`.env.[mode]`文件内
- 环境变量需要以`VITE_`(大写)开头
- 通过 `import.meta.env.[KEY]`在代码中引用环境变量
- 修改环境变量后，需要重新启动项目才能生效
- 在`src/vite-env.d.ts`中可声明环境变量 ts 类型，来获得编辑器代码提示
- 环境变量会以字符串形式暴露给客户端源码

## 代码格式化和语法检测

> 代码格式化：prettier
> 语法检测：eslint

- prettier

  - 需要工具：编辑器插件(vscode: Prettier-Code formatter)+`prettier devDependency`
  - vscode建议开启`formatOnSave`
  - 格式化rules优先级：`package.json中的prettier对象` > `.prettierrc文件内rules对象` > `编辑器prettier rules`
  - 使用`prettierignore`忽略某个文件格式化 && `prettier-ignore`注释忽略文件内某代码格式化

- eslint

  - vite 创建项目预装`eslint`和配置文件，在`rules`对象内添加规则
  - 安装`eslint-config-prettier devDependency`，并添加`prettier`到`eslintrc`文件的`extends`数组最后，来覆盖eslint中和prettier格式化规则冲突，以`prettier`为准

- pre-commit
  ```shell
  npx mrm@2 lint-staged
  ```
  这将安装 `husky` 和 `​​lint-staged`，然后向项目的 package.json 添加lint-staged配置，自动注册该配置于`pre-commit hook`。

## axios封装

- request：封装了的token添加的拦截器和游客api接口拦截器
- response：单独封装了鉴权出错和一般错误逻辑，以及配置了`skipErrorHandler`的情况
- 详见`src/api/request.tsx`

## Router和Layout

- Router
  - 使用了`React router v6`版本，通过`createBrowserRouter`创建router对象，`RouterProvider`注入页面
- Layout
  - 使用了`Ant Design Pro`的`ProLayout`，创建`BrowserRouter`时将`ProLayout组件`作为一个没有`path`的根路由的`element`属性套在router最外层
  - 创建`router`时，将不需要Layout的页面单独写在一个数组`routesWithoutLayout`内，例如登录页面、404页面，不需要Layout的多为单独页面，故`routesWithoutLayout`数组内不应有多层路由。
  - `Layout`组件内，通过`React Router`导出的`Outlet`组件和`routesWithoutLayout`渲染页面

## 路由鉴权和token鉴权

- 路由鉴权
  - 路由配置文件`src/route/route.tsx`中，根据路由配置route对象中的`access`字段和用户类型`userType`，在对外导出`route`前，筛选出有权限的路由。
- token鉴权
  - `React router`配置的`BrowserRouter`时，每个页面`path`对应的`element`使用`withAuth HOC`包裹页面组件，HOC内根据`localStorage`内的`token`请求`getCurrentUser`接口，若鉴权失效重定向到登录页面

## 全局状态管理

- Zustand创建不同类型的`store Slice`，例如userInfo、globalSetting等，并根据需要将部分状态持久化

## 主题切换

- 主题分为：浅色、黑暗、跟随系统
- `App组件`在外层套用`Antd的ConfigProvider`，theme属性根据`globalSetting`中保存的`themeColor`设置颜色算法`defaultAlgorithm`或`darkAlgorithm`
- `App组件`在挂载时，通过`window.matchMedia("(prefers-color-scheme: light)");`获取系统主题，监听`change`事件作出响应主题切换，同时组件卸载时清理监听。

## 多语言

- `React-i18next`库
- 在`locale`文件夹下配置不同语言的键值对象文件，在i18n初始化时注入
- 组件内通过`React-i18next`导出的`t("Test need Translation")`进行语言翻译，`changeLanguage('en...')`切换语言
- 切换到阿拉伯语等需要`RTL`布局的语言时，还需设置`App组件`外层套用`Antd的ConfigProvider`的`direction`，同时设置` document.body`的`dir`属性为`rtl`
- 在带有Layout的路由页面切换语言时，由于`src/route/route.tsx`配置的菜单路由名只在项目打开时初始化一次，无法跟随语言切换。所以在语言切换时，需深度克隆`route对象`进行语言翻译后传入`ProLayout`
