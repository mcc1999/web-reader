## Web Reader

> 模仿 Neat Reader Web 阅读器实现的 epub 阅读器，将来可能支持 txt 等更多格式

> [在线试用](https://web-reader-delta.vercel.app/#/bookshelf)

- 技术栈：Vue3 + Vite + Typescript + Less + Pinia
- epubjs
-

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

项目有 Light/Dark 两种模式，通过`SCSS`变量和`HTML`标签的 class 类名`dark`实现，通过 useDark()实现模式切换

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

  #### 1. 自动导入

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
  - 其他 Icon 集，以 ant-design 为例：
    `yarn add @iconify-json/ant-design`
    在`vite.config.ts`文件里加上安装的图标集
    `IconsResolver({ enabledCollections: ['ep, ant-design']})`

  #### 2. 手动导入

  - 安装  
    `yarn add @element-plus/icons-vue`
  - 使用

  ```vue
  <script scoped>
  import { DocumentAdd } from '@element-plus/icons-vue';
  </script>

  <template>
    <el-icon>
      <DocumentAdd />
    </el-icon>
  </template>
  ```

### Pinia store 中变量持久化

可以使用`pinia-plugin-persistedstate`插件来实现持久化

使用方法：

- `yarn : yarn add pinia-plugin-persistedstate`
- 在`main.ts`中注册该插件

  ```typescript
  import { createPinia } from 'pinia';
  import piniaPluginPersistedstate from 'pinia-plugin-persistedstate';

  const pinia = createPinia();
  pinia.use(piniaPluginPersistedstate);
  ```

- 在 Pinia store 里配置`persist`参数
  ```typescript
  export const useStore = defineStore('Store', {
    state: () => ({
      state1: 'value1',
      state2: 'value2',
      // ....
    }),
    persist: {
      key: 'Store', // key in localStorage
      paths: ['state2'], // only persist the state1 in localStorage
    },
  });
  ```
- `piniaPluginPersistedstate`更详细用法见[官方文档](https://prazdevs.github.io/pinia-plugin-persistedstate/guide/)
