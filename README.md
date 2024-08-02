# React Admin Template

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

  - 需要工具：编辑器插件(vscode: Prettier - Code formatter)+`prettier devDependency`
  - vscode建议开启`formatOnSave`
  - 格式化rules优先级：`package.json中的prettier对象` > `.prettierrc文件内rules对象` > `编辑器prettier rules`
  - 使用`prettierignore`忽略文件格式化 && `prettier-ignore`注释忽略文件内格式化

- eslint
  - vite 创建项目预装`eslint`和配置文件，在`rules`对象内添加规则
  - 安装`eslint-config-prettier devDependency`，并添加`prettier`到`eslintrc`文件的`extends`数组最后，来覆盖eslint中和prettier格式化规则冲突，以`prettier`为准

- pre-commit
  ```shell
  npx mrm@2 lint-staged
  ```
  这将安装 `husky` 和 `​​lint-staged`，然后向项目的 package.json 添加lint-staged配置，自动注册该配置于`pre-commit hook`。