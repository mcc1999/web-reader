## Vue3 + Vite Project Init

Vue3 + Vite + Typescript + Less + Pinia

## 开发环境

- node 16.13.0
- vite 4.1.0
- vue 3.2.45

### 启动开发服务

```bash
yarn run dev
```

### 代码质量检查

eslint + prettier + lint-staged + yorkie，commit 代码时自动通过 prettier 格式化代码后进行 lint 检查，检查不通过无法提交代码

### CSS

样式使用 SASS

### 产品实现目标 Neat Reader Web 产品

https://www.neat-reader.cn/webapp#/

- 路由
- 书架
- 图书阅读器
- Header
- 目录 Contents
- 阅读区域 Reader Area

### 主题

项目有 Light/Dark 两种模式，通过`SCSS`变量和`HTML`标签的 class 类名`dark`实现，通过 useDark()实现两种模式切换

- Light 变量配置  
  在`@/src/styles/element/index.scss`文件里替换原 Light 模式所需变量  
  `@forward "element-plus/theme-chalk/src/common/var.scss" with (/** 你想替换的变量 */)`

- Dark 变量配置
  - 在`@/scr/styles/index.scss`文件里引入 Dark 模式所有变量:  
    `@use "element-plus/theme-chalk/src/dark/css-vars.scss" as *;`
  - 在`@/scr/styles/element/dark.scss`文件里替换原 Dark 模式所需变量
  - 在`@/src/styles/element/index.scss`文件引入替换的 Dark 模式变量:  
    `@use "./dark.scss";`
- vite 在按需导入时自定义主题，使用`scss.additionalData`来编译所有应用 scss 变量的组件, 把自定义文件传入

  ```Typescript
  export default defineConfig({
    ...
    css: {
      preprocessorOptions: {
        scss: {
          additionalData: `@use "@/styles/element/index.scss" as *;`
        }
      }
    },
    ...
    Components({
      ...
      resolvers: [
        ElementPlusResolver({importStyle: 'sass'}), // importStyle可以配置element-plus的样式引入方式
        ...
      ],
      ...
    }),
  ```

  ### Icon 使用

  1. 自动导入

  - `yarn add @iconify-json/ep`  
    `yarn add unplugin-vue-components unplugin-icons unplugin-auto-import`
  - 配置 vite.config.ts
    ```typescript
    export default defineConfig({
      // ...
      plugins: [
        AutoImport({
          // ...
          resolvers: [
            // 自动导入图标组件
            IconsResolver({
              prefix: 'Icon',
            }),
          ],
          dts: path.resolve(pathSrc, 'auto-imports.d.ts'),
        }),
        Components({
          resolvers: [
            // 自动注册图标组件
            IconsResolver({
              enabledCollections: ['ep'],
            }),
          ],
          dts: path.resolve(pathSrc, 'components.d.ts'),
        }),
        Icons({
          autoInstall: true,
        }),
      ],
    });
    ```
  - 在[https://icones.js.org/](https://icones.js.org/)找想要的 Icon
  - 使用方法： `<i-ep-document-add />`

  1. 手动导入

  - 安装  
    `yarn add @element-plus/icons-vue`
  - 使用  
    `import { DocumentAdd } from '@element-plus/icons-vue'`  
    `<el-icon><DocumentAdd /></el-icon>`
