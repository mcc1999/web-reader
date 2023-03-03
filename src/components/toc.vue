<template>
  <div :class="['toc-container', {'toc-visible': visible}]">
    <div>
      <el-scrollbar height="100vh">
        <el-tree 
          :data="tocData"
          :props="defaultProps"
          :expand-on-click-node="false"
          :indent="0"
          accordion
          highlight-current
          @node-click="handleNodeClick"
          class="toc-tree"
        />
      </el-scrollbar>
    </div>
  </div>
</template>

<script setup lang='ts'>
import { useEpubStore, useBookStore } from '@/store';
import { NavItem } from 'epubjs/types/navigation';
import { storeToRefs } from 'pinia';
import { useRoute } from 'vue-router';

const { visible } = defineProps({
  visible: {
    type: Boolean,
    require: true,
  }
}) 
const {query: {uuid}} = useRoute()
const epubStore = useEpubStore()
const bookStore = useBookStore()
const { currentBook: book, rendition } = storeToRefs(epubStore)
const tocData = ref()
// const tocData = ref([
//     {
//         "id": "num_1",
//         "href": "text/part0002.html",
//         "label": "\n        The Missing Credits\n      ",
//         "subitems": [
//             {
//                 "id": "num_2",
//                 "href": "text/part0002.html#heading_id_3",
//                 "label": "\n          作者简介\n        ",
//                 "subitems": [],
//                 "parent": "num_1"
//             },
//             {
//                 "id": "num_3",
//                 "href": "text/part0003.html",
//                 "label": "\n          制作团队简介\n        ",
//                 "subitems": [],
//                 "parent": "num_1"
//             },
//             {
//                 "id": "num_4",
//                 "href": "text/part0004.html",
//                 "label": "\n          致谢\n        ",
//                 "subitems": [],
//                 "parent": "num_1"
//             },
//             {
//                 "id": "num_5",
//                 "href": "text/part0005.html",
//                 "label": "\n          “The Missing Manual”系列\n        ",
//                 "subitems": [],
//                 "parent": "num_1"
//             }
//         ]
//     },
//     {
//         "id": "num_6",
//         "href": "text/part0006_split_000.html",
//         "label": "\n        前言\n      ",
//         "subitems": [
//             {
//                 "id": "num_7",
//                 "href": "text/part0006_split_001.html",
//                 "label": "\n          JavaScript\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_8",
//                         "href": "text/part0006_split_001.html#heading_id_4",
//                         "label": "\n            JavaScript简史\n          ",
//                         "subitems": [],
//                         "parent": "num_7"
//                     },
//                     {
//                         "id": "num_9",
//                         "href": "text/part0006_split_001.html#heading_id_5",
//                         "label": "\n            JavaScript随处可见\n          ",
//                         "subitems": [],
//                         "parent": "num_7"
//                     }
//                 ],
//                 "parent": "num_6"
//             },
//             {
//                 "id": "num_10",
//                 "href": "text/part0007.html",
//                 "label": "\n          jQuery\n        ",
//                 "subitems": [],
//                 "parent": "num_6"
//             },
//             {
//                 "id": "num_11",
//                 "href": "text/part0008.html",
//                 "label": "\n          HTML：主题结构\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_12",
//                         "href": "text/part0008.html#heading_id_3",
//                         "label": "\n            HTML标签如何工作\n          ",
//                         "subitems": [],
//                         "parent": "num_11"
//                     }
//                 ],
//                 "parent": "num_6"
//             },
//             {
//                 "id": "num_13",
//                 "href": "text/part0009.html",
//                 "label": "\n          CSS：为页面添加样式\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_14",
//                         "href": "text/part0009.html#heading_id_3",
//                         "label": "\n            样式剖析\n          ",
//                         "subitems": [],
//                         "parent": "num_13"
//                     }
//                 ],
//                 "parent": "num_6"
//             },
//             {
//                 "id": "num_15",
//                 "href": "text/part0010.html",
//                 "label": "\n          用于JavaScript编程的软件\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_16",
//                         "href": "text/part0010.html#heading_id_3",
//                         "label": "\n            免费程序\n          ",
//                         "subitems": [],
//                         "parent": "num_15"
//                     },
//                     {
//                         "id": "num_17",
//                         "href": "text/part0010.html#heading_id_4",
//                         "label": "\n            商业软件\n          ",
//                         "subitems": [],
//                         "parent": "num_15"
//                     }
//                 ],
//                 "parent": "num_6"
//             },
//             {
//                 "id": "num_18",
//                 "href": "text/part0011.html",
//                 "label": "\n          关于本书\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_19",
//                         "href": "text/part0011.html#heading_id_3",
//                         "label": "\n            本书介绍JavaScript的方法\n          ",
//                         "subitems": [],
//                         "parent": "num_18"
//                     },
//                     {
//                         "id": "num_20",
//                         "href": "text/part0012.html",
//                         "label": "\n            内容梗概\n          ",
//                         "subitems": [],
//                         "parent": "num_18"
//                     }
//                 ],
//                 "parent": "num_6"
//             },
//             {
//                 "id": "num_21",
//                 "href": "text/part0013.html",
//                 "label": "\n          基础知识\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_22",
//                         "href": "text/part0013.html#heading_id_3",
//                         "label": "\n            关于这些箭头\n          ",
//                         "subitems": [],
//                         "parent": "num_21"
//                     }
//                 ],
//                 "parent": "num_6"
//             },
//             {
//                 "id": "num_23",
//                 "href": "text/part0014.html",
//                 "label": "\n          在线资源\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_24",
//                         "href": "text/part0014.html#heading_id_3",
//                         "label": "\n            生动示例\n          ",
//                         "subitems": [],
//                         "parent": "num_23"
//                     },
//                     {
//                         "id": "num_25",
//                         "href": "text/part0015.html",
//                         "label": "\n            注册\n          ",
//                         "subitems": [],
//                         "parent": "num_23"
//                     },
//                     {
//                         "id": "num_26",
//                         "href": "text/part0016.html",
//                         "label": "\n            反馈\n          ",
//                         "subitems": [],
//                         "parent": "num_23"
//                     },
//                     {
//                         "id": "num_27",
//                         "href": "text/part0017.html",
//                         "label": "\n            勘误\n          ",
//                         "subitems": [],
//                         "parent": "num_23"
//                     }
//                 ],
//                 "parent": "num_6"
//             }
//         ]
//     },
//     {
//         "id": "num_28",
//         "href": "text/part0018.html",
//         "label": "\n        第一部分：JavaScript入门\n      ",
//         "subitems": [
//             {
//                 "id": "num_29",
//                 "href": "text/part0018.html#heading_id_3",
//                 "label": "\n          第1章 编写第一个JavaScript程序\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_30",
//                         "href": "text/part0018.html#heading_id_4",
//                         "label": "\n            1.1 编程简介\n          ",
//                         "subitems": [],
//                         "parent": "num_29"
//                     },
//                     {
//                         "id": "num_31",
//                         "href": "text/part0019.html",
//                         "label": "\n            1.2 如何把JavaScript添加到页面\n          ",
//                         "subitems": [],
//                         "parent": "num_29"
//                     },
//                     {
//                         "id": "num_32",
//                         "href": "text/part0020.html",
//                         "label": "\n            1.3 第一个JavaScript程序\n          ",
//                         "subitems": [],
//                         "parent": "num_29"
//                     },
//                     {
//                         "id": "num_33",
//                         "href": "text/part0021.html",
//                         "label": "\n            1.4 把文本写到Web页面上\n          ",
//                         "subitems": [],
//                         "parent": "num_29"
//                     },
//                     {
//                         "id": "num_34",
//                         "href": "text/part0022.html",
//                         "label": "\n            1.5 附加外部JavaScript文件\n          ",
//                         "subitems": [],
//                         "parent": "num_29"
//                     },
//                     {
//                         "id": "num_35",
//                         "href": "text/part0023.html",
//                         "label": "\n            1.6 追踪错误\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_36",
//                                 "href": "text/part0023.html#heading_id_3",
//                                 "label": "\n              1.6.1 Firefox JavaScript控制台\n            ",
//                                 "subitems": [],
//                                 "parent": "num_35"
//                             },
//                             {
//                                 "id": "num_37",
//                                 "href": "text/part0024.html",
//                                 "label": "\n              1.6.2 显示InternetExplorer9控制台\n            ",
//                                 "subitems": [],
//                                 "parent": "num_35"
//                             },
//                             {
//                                 "id": "num_38",
//                                 "href": "text/part0025.html",
//                                 "label": "\n              1.6.3 打开ChromeJavaScript控制台\n            ",
//                                 "subitems": [],
//                                 "parent": "num_35"
//                             },
//                             {
//                                 "id": "num_39",
//                                 "href": "text/part0026.html",
//                                 "label": "\n              1.6.4 访问Safari错误控制台\n            ",
//                                 "subitems": [],
//                                 "parent": "num_35"
//                             }
//                         ],
//                         "parent": "num_29"
//                     }
//                 ],
//                 "parent": "num_28"
//             },
//             {
//                 "id": "num_40",
//                 "href": "text/part0027.html",
//                 "label": "\n          第2章 JavaScript的语法\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_41",
//                         "href": "text/part0027.html#heading_id_3",
//                         "label": "\n            2.1 语句\n          ",
//                         "subitems": [],
//                         "parent": "num_40"
//                     },
//                     {
//                         "id": "num_42",
//                         "href": "text/part0028.html",
//                         "label": "\n            2.2 内置函数\n          ",
//                         "subitems": [],
//                         "parent": "num_40"
//                     },
//                     {
//                         "id": "num_43",
//                         "href": "text/part0029.html",
//                         "label": "\n            2.3 数据类型\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_44",
//                                 "href": "text/part0029.html#heading_id_3",
//                                 "label": "\n              2.3.1 数值\n            ",
//                                 "subitems": [],
//                                 "parent": "num_43"
//                             },
//                             {
//                                 "id": "num_45",
//                                 "href": "text/part0030.html",
//                                 "label": "\n              2.3.2 字符串\n            ",
//                                 "subitems": [],
//                                 "parent": "num_43"
//                             },
//                             {
//                                 "id": "num_46",
//                                 "href": "text/part0031.html",
//                                 "label": "\n              2.3.3 布尔值\n            ",
//                                 "subitems": [],
//                                 "parent": "num_43"
//                             }
//                         ],
//                         "parent": "num_40"
//                     },
//                     {
//                         "id": "num_47",
//                         "href": "text/part0032.html",
//                         "label": "\n            2.4 变量\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_48",
//                                 "href": "text/part0032.html#heading_id_3",
//                                 "label": "\n              2.4.1 创建变量\n            ",
//                                 "subitems": [],
//                                 "parent": "num_47"
//                             },
//                             {
//                                 "id": "num_49",
//                                 "href": "text/part0033.html",
//                                 "label": "\n              2.4.2 使用变量\n            ",
//                                 "subitems": [],
//                                 "parent": "num_47"
//                             }
//                         ],
//                         "parent": "num_40"
//                     },
//                     {
//                         "id": "num_50",
//                         "href": "text/part0034.html",
//                         "label": "\n            2.5 操作数据类型和变量\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_51",
//                                 "href": "text/part0034.html#heading_id_3",
//                                 "label": "\n              2.5.1 基本算术\n            ",
//                                 "subitems": [],
//                                 "parent": "num_50"
//                             },
//                             {
//                                 "id": "num_52",
//                                 "href": "text/part0035.html",
//                                 "label": "\n              2.5.2 操作的顺序\n            ",
//                                 "subitems": [],
//                                 "parent": "num_50"
//                             },
//                             {
//                                 "id": "num_53",
//                                 "href": "text/part0036.html",
//                                 "label": "\n              2.5.3 组合字符串\n            ",
//                                 "subitems": [],
//                                 "parent": "num_50"
//                             },
//                             {
//                                 "id": "num_54",
//                                 "href": "text/part0037.html",
//                                 "label": "\n              2.5.4 组合数值和字符串\n            ",
//                                 "subitems": [],
//                                 "parent": "num_50"
//                             },
//                             {
//                                 "id": "num_55",
//                                 "href": "text/part0038.html",
//                                 "label": "\n              2.5.5 修改变量中的值\n            ",
//                                 "subitems": [],
//                                 "parent": "num_50"
//                             }
//                         ],
//                         "parent": "num_40"
//                     },
//                     {
//                         "id": "num_56",
//                         "href": "text/part0039.html",
//                         "label": "\n            2.6 教程：使用变量创建消息\n          ",
//                         "subitems": [],
//                         "parent": "num_40"
//                     },
//                     {
//                         "id": "num_57",
//                         "href": "text/part0040.html",
//                         "label": "\n            2.7 教程：请求信息\n          ",
//                         "subitems": [],
//                         "parent": "num_40"
//                     },
//                     {
//                         "id": "num_58",
//                         "href": "text/part0041.html",
//                         "label": "\n            2.8 数组\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_59",
//                                 "href": "text/part0041.html#heading_id_3",
//                                 "label": "\n              2.8.1 创建数组\n            ",
//                                 "subitems": [],
//                                 "parent": "num_58"
//                             },
//                             {
//                                 "id": "num_60",
//                                 "href": "text/part0042.html",
//                                 "label": "\n              2.8.2 访问数组中的项目\n            ",
//                                 "subitems": [],
//                                 "parent": "num_58"
//                             },
//                             {
//                                 "id": "num_61",
//                                 "href": "text/part0043.html",
//                                 "label": "\n              2.8.3 向数组添加项目\n            ",
//                                 "subitems": [],
//                                 "parent": "num_58"
//                             },
//                             {
//                                 "id": "num_62",
//                                 "href": "text/part0044.html",
//                                 "label": "\n              2.8.4 从数组删除项目\n            ",
//                                 "subitems": [],
//                                 "parent": "num_58"
//                             }
//                         ],
//                         "parent": "num_40"
//                     },
//                     {
//                         "id": "num_63",
//                         "href": "text/part0045.html",
//                         "label": "\n            2.9 教程：编写使用数组的页面\n          ",
//                         "subitems": [],
//                         "parent": "num_40"
//                     },
//                     {
//                         "id": "num_64",
//                         "href": "text/part0046.html",
//                         "label": "\n            2.10 对象的简单介绍\n          ",
//                         "subitems": [],
//                         "parent": "num_40"
//                     },
//                     {
//                         "id": "num_65",
//                         "href": "text/part0047.html",
//                         "label": "\n            2.11 注释\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_66",
//                                 "href": "text/part0047.html#heading_id_3",
//                                 "label": "\n              2.11.1 何时使用注释\n            ",
//                                 "subitems": [],
//                                 "parent": "num_65"
//                             },
//                             {
//                                 "id": "num_67",
//                                 "href": "text/part0048.html",
//                                 "label": "\n              2.11.2 本书中的注释\n            ",
//                                 "subitems": [],
//                                 "parent": "num_65"
//                             }
//                         ],
//                         "parent": "num_40"
//                     }
//                 ],
//                 "parent": "num_28"
//             },
//             {
//                 "id": "num_68",
//                 "href": "text/part0049.html",
//                 "label": "\n          第3章 为程序添加逻辑和控制\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_69",
//                         "href": "text/part0049.html#heading_id_3",
//                         "label": "\n            3.1 使程序智能地响应\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_70",
//                                 "href": "text/part0049.html#heading_id_4",
//                                 "label": "\n              3.1.1 条件语句基础\n            ",
//                                 "subitems": [],
//                                 "parent": "num_69"
//                             },
//                             {
//                                 "id": "num_71",
//                                 "href": "text/part0050.html",
//                                 "label": "\n              3.1.2 添加备用计划\n            ",
//                                 "subitems": [],
//                                 "parent": "num_69"
//                             },
//                             {
//                                 "id": "num_72",
//                                 "href": "text/part0051.html",
//                                 "label": "\n              3.1.3 测试多个条件\n            ",
//                                 "subitems": [],
//                                 "parent": "num_69"
//                             },
//                             {
//                                 "id": "num_73",
//                                 "href": "text/part0052.html",
//                                 "label": "\n              3.1.4 更复杂的条件\n            ",
//                                 "subitems": [],
//                                 "parent": "num_69"
//                             },
//                             {
//                                 "id": "num_74",
//                                 "href": "text/part0053.html",
//                                 "label": "\n              3.1.5 嵌套条件语句\n            ",
//                                 "subitems": [],
//                                 "parent": "num_69"
//                             },
//                             {
//                                 "id": "num_75",
//                                 "href": "text/part0054.html",
//                                 "label": "\n              3.1.6 编写条件语句的技巧\n            ",
//                                 "subitems": [],
//                                 "parent": "num_69"
//                             }
//                         ],
//                         "parent": "num_68"
//                     },
//                     {
//                         "id": "num_76",
//                         "href": "text/part0055.html",
//                         "label": "\n            3.2 教程：使用条件语句\n          ",
//                         "subitems": [],
//                         "parent": "num_68"
//                     },
//                     {
//                         "id": "num_77",
//                         "href": "text/part0056.html",
//                         "label": "\n            3.3 使用循环处理重复性任务\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_78",
//                                 "href": "text/part0056.html#heading_id_3",
//                                 "label": "\n              3.3.1 while循环\n            ",
//                                 "subitems": [],
//                                 "parent": "num_77"
//                             },
//                             {
//                                 "id": "num_79",
//                                 "href": "text/part0057.html",
//                                 "label": "\n              3.3.2 循环和数组\n            ",
//                                 "subitems": [],
//                                 "parent": "num_77"
//                             },
//                             {
//                                 "id": "num_80",
//                                 "href": "text/part0058.html",
//                                 "label": "\n              3.3.3 for循环\n            ",
//                                 "subitems": [],
//                                 "parent": "num_77"
//                             },
//                             {
//                                 "id": "num_81",
//                                 "href": "text/part0059.html",
//                                 "label": "\n              3.3.4 do/while循环\n            ",
//                                 "subitems": [],
//                                 "parent": "num_77"
//                             }
//                         ],
//                         "parent": "num_68"
//                     },
//                     {
//                         "id": "num_82",
//                         "href": "text/part0060.html",
//                         "label": "\n            3.4 函数：把有用的代码转换为可复用的命令\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_83",
//                                 "href": "text/part0060.html#heading_id_3",
//                                 "label": "\n              3.4.1 小教程\n            ",
//                                 "subitems": [],
//                                 "parent": "num_82"
//                             },
//                             {
//                                 "id": "num_84",
//                                 "href": "text/part0061.html",
//                                 "label": "\n              3.4.2 给函数提供信息\n            ",
//                                 "subitems": [],
//                                 "parent": "num_82"
//                             },
//                             {
//                                 "id": "num_85",
//                                 "href": "text/part0062.html",
//                                 "label": "\n              3.4.3 从函数获取信息\n            ",
//                                 "subitems": [],
//                                 "parent": "num_82"
//                             },
//                             {
//                                 "id": "num_86",
//                                 "href": "text/part0063.html",
//                                 "label": "\n              3.4.4 防止变量冲突\n            ",
//                                 "subitems": [],
//                                 "parent": "num_82"
//                             }
//                         ],
//                         "parent": "num_68"
//                     },
//                     {
//                         "id": "num_87",
//                         "href": "text/part0064.html",
//                         "label": "\n            3.5 教程：一个简单测验\n          ",
//                         "subitems": [],
//                         "parent": "num_68"
//                     }
//                 ],
//                 "parent": "num_28"
//             }
//         ]
//     },
//     {
//         "id": "num_88",
//         "href": "text/part0065.html",
//         "label": "\n        第二部分：jQuery入门\n      ",
//         "subitems": [
//             {
//                 "id": "num_89",
//                 "href": "text/part0065.html#heading_id_3",
//                 "label": "\n          第4章 jQuery简介\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_90",
//                         "href": "text/part0065.html#heading_id_4",
//                         "label": "\n            4.1 JavaScript库简介\n          ",
//                         "subitems": [],
//                         "parent": "num_89"
//                     },
//                     {
//                         "id": "num_91",
//                         "href": "text/part0066.html",
//                         "label": "\n            4.2 获取jQuery\n          ",
//                         "subitems": [],
//                         "parent": "num_89"
//                     },
//                     {
//                         "id": "num_92",
//                         "href": "text/part0067.html",
//                         "label": "\n            4.3 把jQuery添加到页面\n          ",
//                         "subitems": [],
//                         "parent": "num_89"
//                     },
//                     {
//                         "id": "num_93",
//                         "href": "text/part0068.html",
//                         "label": "\n            4.4 修改Web页面：概览\n          ",
//                         "subitems": [],
//                         "parent": "num_89"
//                     },
//                     {
//                         "id": "num_94",
//                         "href": "text/part0069.html",
//                         "label": "\n            4.5 理解文档对象模型\n          ",
//                         "subitems": [],
//                         "parent": "num_89"
//                     },
//                     {
//                         "id": "num_95",
//                         "href": "text/part0070.html",
//                         "label": "\n            4.6 再谈选择页面元素\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_96",
//                                 "href": "text/part0070.html#heading_id_3",
//                                 "label": "\n              4.6.1 基本选择器\n            ",
//                                 "subitems": [],
//                                 "parent": "num_95"
//                             },
//                             {
//                                 "id": "num_97",
//                                 "href": "text/part0071.html",
//                                 "label": "\n              4.6.2 高级选择器\n            ",
//                                 "subitems": [],
//                                 "parent": "num_95"
//                             },
//                             {
//                                 "id": "num_98",
//                                 "href": "text/part0072.html",
//                                 "label": "\n              4.6.3 jQuery过滤器\n            ",
//                                 "subitems": [],
//                                 "parent": "num_95"
//                             },
//                             {
//                                 "id": "num_99",
//                                 "href": "text/part0073.html",
//                                 "label": "\n              4.6.4 理解jQuery选择\n            ",
//                                 "subitems": [],
//                                 "parent": "num_95"
//                             }
//                         ],
//                         "parent": "num_89"
//                     },
//                     {
//                         "id": "num_100",
//                         "href": "text/part0074.html",
//                         "label": "\n            4.7 向页面添加内容\n          ",
//                         "subitems": [],
//                         "parent": "num_89"
//                     },
//                     {
//                         "id": "num_101",
//                         "href": "text/part0075.html",
//                         "label": "\n            4.8 设置和读取标签属性\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_102",
//                                 "href": "text/part0075.html#heading_id_3",
//                                 "label": "\n              4.8.1 类\n            ",
//                                 "subitems": [],
//                                 "parent": "num_101"
//                             },
//                             {
//                                 "id": "num_103",
//                                 "href": "text/part0076.html",
//                                 "label": "\n              4.8.2 读取和改变CSS属性\n            ",
//                                 "subitems": [],
//                                 "parent": "num_101"
//                             },
//                             {
//                                 "id": "num_104",
//                                 "href": "text/part0077.html",
//                                 "label": "\n              4.8.3 一次改变多个CSS属性\n            ",
//                                 "subitems": [],
//                                 "parent": "num_101"
//                             }
//                         ],
//                         "parent": "num_89"
//                     },
//                     {
//                         "id": "num_105",
//                         "href": "text/part0078.html",
//                         "label": "\n            4.9 读取、设置和删除HTML属性\n          ",
//                         "subitems": [],
//                         "parent": "num_89"
//                     },
//                     {
//                         "id": "num_106",
//                         "href": "text/part0079.html",
//                         "label": "\n            4.10 操作选择中的每个元素\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_107",
//                                 "href": "text/part0079.html#heading_id_3",
//                                 "label": "\n              4.10.1 匿名函数\n            ",
//                                 "subitems": [],
//                                 "parent": "num_106"
//                             },
//                             {
//                                 "id": "num_108",
//                                 "href": "text/part0080.html",
//                                 "label": "\n              4.10.2 this和$（this）\n            ",
//                                 "subitems": [],
//                                 "parent": "num_106"
//                             }
//                         ],
//                         "parent": "num_89"
//                     },
//                     {
//                         "id": "num_109",
//                         "href": "text/part0081.html",
//                         "label": "\n            4.11 自动提取引用\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_110",
//                                 "href": "text/part0081.html#heading_id_3",
//                                 "label": "\n              4.11.1 概览\n            ",
//                                 "subitems": [],
//                                 "parent": "num_109"
//                             },
//                             {
//                                 "id": "num_111",
//                                 "href": "text/part0082.html",
//                                 "label": "\n              4.11.2 编程\n            ",
//                                 "subitems": [],
//                                 "parent": "num_109"
//                             }
//                         ],
//                         "parent": "num_89"
//                     }
//                 ],
//                 "parent": "num_88"
//             },
//             {
//                 "id": "num_112",
//                 "href": "text/part0083.html",
//                 "label": "\n          第5章 动作/响应：让页面通过事件动起来\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_113",
//                         "href": "text/part0083.html#heading_id_3",
//                         "label": "\n            5.1 事件\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_114",
//                                 "href": "text/part0083.html#heading_id_4",
//                                 "label": "\n              5.1.1 鼠标事件\n            ",
//                                 "subitems": [],
//                                 "parent": "num_113"
//                             },
//                             {
//                                 "id": "num_115",
//                                 "href": "text/part0084.html",
//                                 "label": "\n              5.1.2 文档事件和窗口事件\n            ",
//                                 "subitems": [],
//                                 "parent": "num_113"
//                             },
//                             {
//                                 "id": "num_116",
//                                 "href": "text/part0085.html",
//                                 "label": "\n              5.1.3 表单事件\n            ",
//                                 "subitems": [],
//                                 "parent": "num_113"
//                             },
//                             {
//                                 "id": "num_117",
//                                 "href": "text/part0086.html",
//                                 "label": "\n              5.1.4 键盘事件\n            ",
//                                 "subitems": [],
//                                 "parent": "num_113"
//                             }
//                         ],
//                         "parent": "num_112"
//                     },
//                     {
//                         "id": "num_118",
//                         "href": "text/part0087.html",
//                         "label": "\n            5.2 以jQuery的方式使用事件\n          ",
//                         "subitems": [],
//                         "parent": "num_112"
//                     },
//                     {
//                         "id": "num_119",
//                         "href": "text/part0088.html",
//                         "label": "\n            5.3 教程：事件简介\n          ",
//                         "subitems": [],
//                         "parent": "num_112"
//                     },
//                     {
//                         "id": "num_120",
//                         "href": "text/part0089.html",
//                         "label": "\n            5.4 更多的jQuery事件概念\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_121",
//                                 "href": "text/part0089.html#heading_id_3",
//                                 "label": "\n              5.4.1 等待HTML载入\n            ",
//                                 "subitems": [],
//                                 "parent": "num_120"
//                             },
//                             {
//                                 "id": "num_122",
//                                 "href": "text/part0090.html",
//                                 "label": "\n              5.4.2 jQuery事件\n            ",
//                                 "subitems": [],
//                                 "parent": "num_120"
//                             },
//                             {
//                                 "id": "num_123",
//                                 "href": "text/part0091.html",
//                                 "label": "\n              5.4.3 事件对象\n            ",
//                                 "subitems": [],
//                                 "parent": "num_120"
//                             },
//                             {
//                                 "id": "num_124",
//                                 "href": "text/part0092.html",
//                                 "label": "\n              5.4.4 阻止事件的常规行为\n            ",
//                                 "subitems": [],
//                                 "parent": "num_120"
//                             },
//                             {
//                                 "id": "num_125",
//                                 "href": "text/part0093.html",
//                                 "label": "\n              5.4.5 删除事件\n            ",
//                                 "subitems": [],
//                                 "parent": "num_120"
//                             }
//                         ],
//                         "parent": "num_112"
//                     },
//                     {
//                         "id": "num_126",
//                         "href": "text/part0094.html",
//                         "label": "\n            5.5 高级事件管理\n          ",
//                         "subitems": [],
//                         "parent": "num_112"
//                     },
//                     {
//                         "id": "num_127",
//                         "href": "text/part0095.html",
//                         "label": "\n            5.6 教程：一页的FAQ\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_128",
//                                 "href": "text/part0095.html#heading_id_3",
//                                 "label": "\n              5.6.1 任务概览\n            ",
//                                 "subitems": [],
//                                 "parent": "num_127"
//                             },
//                             {
//                                 "id": "num_129",
//                                 "href": "text/part0096.html",
//                                 "label": "\n              5.6.2 编程\n            ",
//                                 "subitems": [],
//                                 "parent": "num_127"
//                             }
//                         ],
//                         "parent": "num_112"
//                     }
//                 ],
//                 "parent": "num_88"
//             },
//             {
//                 "id": "num_130",
//                 "href": "text/part0097.html",
//                 "label": "\n          第6章 动画和效果\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_131",
//                         "href": "text/part0097.html#heading_id_3",
//                         "label": "\n            6.1 jQuery效果\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_132",
//                                 "href": "text/part0097.html#heading_id_4",
//                                 "label": "\n              6.1.1 基本显示和隐藏\n            ",
//                                 "subitems": [],
//                                 "parent": "num_131"
//                             },
//                             {
//                                 "id": "num_133",
//                                 "href": "text/part0098.html",
//                                 "label": "\n              6.1.2 淡入淡出元素\n            ",
//                                 "subitems": [],
//                                 "parent": "num_131"
//                             },
//                             {
//                                 "id": "num_134",
//                                 "href": "text/part0099.html",
//                                 "label": "\n              6.1.3 滑动元素\n            ",
//                                 "subitems": [],
//                                 "parent": "num_131"
//                             }
//                         ],
//                         "parent": "num_130"
//                     },
//                     {
//                         "id": "num_135",
//                         "href": "text/part0100.html",
//                         "label": "\n            6.2 教程：登录滑块\n          ",
//                         "subitems": [],
//                         "parent": "num_130"
//                     },
//                     {
//                         "id": "num_136",
//                         "href": "text/part0101.html",
//                         "label": "\n            6.3 动画\n          ",
//                         "subitems": [],
//                         "parent": "num_130"
//                     },
//                     {
//                         "id": "num_137",
//                         "href": "text/part0102.html",
//                         "label": "\n            6.4 在效果完成后执行一个操作\n          ",
//                         "subitems": [],
//                         "parent": "num_130"
//                     },
//                     {
//                         "id": "num_138",
//                         "href": "text/part0103.html",
//                         "label": "\n            6.5 教程：动画的仪表盘\n          ",
//                         "subitems": [],
//                         "parent": "num_130"
//                     }
//                 ],
//                 "parent": "num_88"
//             }
//         ]
//     },
//     {
//         "id": "num_139",
//         "href": "text/part0104.html",
//         "label": "\n        第三部分：构建网页功能\n      ",
//         "subitems": [
//             {
//                 "id": "num_140",
//                 "href": "text/part0104.html#heading_id_3",
//                 "label": "\n          第7章 改进图像\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_141",
//                         "href": "text/part0104.html#heading_id_4",
//                         "label": "\n            7.1 交换图像\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_142",
//                                 "href": "text/part0104.html#heading_id_5",
//                                 "label": "\n              7.1.1 改变图像的src属性\n            ",
//                                 "subitems": [],
//                                 "parent": "num_141"
//                             },
//                             {
//                                 "id": "num_143",
//                                 "href": "text/part0105.html",
//                                 "label": "\n              7.1.2 预载入图像\n            ",
//                                 "subitems": [],
//                                 "parent": "num_141"
//                             },
//                             {
//                                 "id": "num_144",
//                                 "href": "text/part0106.html",
//                                 "label": "\n              7.1.3 翻滚图像\n            ",
//                                 "subitems": [],
//                                 "parent": "num_141"
//                             }
//                         ],
//                         "parent": "num_140"
//                     },
//                     {
//                         "id": "num_145",
//                         "href": "text/part0107.html",
//                         "label": "\n            7.2 教程：添加翻滚图像\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_146",
//                                 "href": "text/part0107.html#heading_id_3",
//                                 "label": "\n              7.2.1 任务概览\n            ",
//                                 "subitems": [],
//                                 "parent": "num_145"
//                             },
//                             {
//                                 "id": "num_147",
//                                 "href": "text/part0108.html",
//                                 "label": "\n              7.2.2 编程\n            ",
//                                 "subitems": [],
//                                 "parent": "num_145"
//                             }
//                         ],
//                         "parent": "num_140"
//                     },
//                     {
//                         "id": "num_148",
//                         "href": "text/part0109.html",
//                         "label": "\n            7.3 教程：带有效果的照片集\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_149",
//                                 "href": "text/part0109.html#heading_id_3",
//                                 "label": "\n              7.3.1 任务概览\n            ",
//                                 "subitems": [],
//                                 "parent": "num_148"
//                             },
//                             {
//                                 "id": "num_150",
//                                 "href": "text/part0110.html",
//                                 "label": "\n              7.3.2 编程\n            ",
//                                 "subitems": [],
//                                 "parent": "num_148"
//                             }
//                         ],
//                         "parent": "num_140"
//                     },
//                     {
//                         "id": "num_151",
//                         "href": "text/part0111.html",
//                         "label": "\n            7.4 使用jQuery lightBox的高级照片集\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_152",
//                                 "href": "text/part0111.html#heading_id_3",
//                                 "label": "\n              7.4.1 基础\n            ",
//                                 "subitems": [],
//                                 "parent": "num_151"
//                             },
//                             {
//                                 "id": "num_153",
//                                 "href": "text/part0112.html",
//                                 "label": "\n              7.4.2 创建一个图像集\n            ",
//                                 "subitems": [],
//                                 "parent": "num_151"
//                             },
//                             {
//                                 "id": "num_154",
//                                 "href": "text/part0113.html",
//                                 "label": "\n              7.4.3 定制FancyBox\n            ",
//                                 "subitems": [],
//                                 "parent": "num_151"
//                             }
//                         ],
//                         "parent": "num_140"
//                     },
//                     {
//                         "id": "num_155",
//                         "href": "text/part0114.html",
//                         "label": "\n            7.5 教程：FancyBox照片集\n          ",
//                         "subitems": [],
//                         "parent": "num_140"
//                     }
//                 ],
//                 "parent": "num_139"
//             },
//             {
//                 "id": "num_156",
//                 "href": "text/part0115.html",
//                 "label": "\n          第8章 改进导航\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_157",
//                         "href": "text/part0115.html#heading_id_3",
//                         "label": "\n            8.1 一些链接基础知识\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_158",
//                                 "href": "text/part0115.html#heading_id_4",
//                                 "label": "\n              8.1.1 用JavaScript选择链接\n            ",
//                                 "subitems": [],
//                                 "parent": "num_157"
//                             },
//                             {
//                                 "id": "num_159",
//                                 "href": "text/part0116.html",
//                                 "label": "\n              8.1.2 确定链接的目标\n            ",
//                                 "subitems": [],
//                                 "parent": "num_157"
//                             },
//                             {
//                                 "id": "num_160",
//                                 "href": "text/part0117.html",
//                                 "label": "\n              8.1.3 不要打开链接\n            ",
//                                 "subitems": [],
//                                 "parent": "num_157"
//                             }
//                         ],
//                         "parent": "num_156"
//                     },
//                     {
//                         "id": "num_161",
//                         "href": "text/part0118.html",
//                         "label": "\n            8.2 在新窗口中打开外部链接\n          ",
//                         "subitems": [],
//                         "parent": "num_156"
//                     },
//                     {
//                         "id": "num_162",
//                         "href": "text/part0119.html",
//                         "label": "\n            8.3 创建新窗口\n          ",
//                         "subitems": [],
//                         "parent": "num_156"
//                     },
//                     {
//                         "id": "num_163",
//                         "href": "text/part0120.html",
//                         "label": "\n            8.4 在页面上的一个窗口中打开页面\n          ",
//                         "subitems": [],
//                         "parent": "num_156"
//                     },
//                     {
//                         "id": "num_164",
//                         "href": "text/part0121.html",
//                         "label": "\n            8.5 基本的动画的导航栏\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_165",
//                                 "href": "text/part0121.html#heading_id_3",
//                                 "label": "\n              8.5.1 HTML\n            ",
//                                 "subitems": [],
//                                 "parent": "num_164"
//                             },
//                             {
//                                 "id": "num_166",
//                                 "href": "text/part0122.html",
//                                 "label": "\n              8.5.2 CSS\n            ",
//                                 "subitems": [],
//                                 "parent": "num_164"
//                             },
//                             {
//                                 "id": "num_167",
//                                 "href": "text/part0123.html",
//                                 "label": "\n              8.5.3 JavaScript\n            ",
//                                 "subitems": [],
//                                 "parent": "num_164"
//                             },
//                             {
//                                 "id": "num_168",
//                                 "href": "text/part0124.html",
//                                 "label": "\n              8.5.4 教程\n            ",
//                                 "subitems": [],
//                                 "parent": "num_164"
//                             }
//                         ],
//                         "parent": "num_156"
//                     }
//                 ],
//                 "parent": "num_139"
//             },
//             {
//                 "id": "num_169",
//                 "href": "text/part0125.html",
//                 "label": "\n          第9章 扩展Web表单\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_170",
//                         "href": "text/part0125.html#heading_id_3",
//                         "label": "\n            9.1 理解表单\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_171",
//                                 "href": "text/part0125.html#heading_id_4",
//                                 "label": "\n              9.1.1 选择表单元素\n            ",
//                                 "subitems": [],
//                                 "parent": "num_170"
//                             },
//                             {
//                                 "id": "num_172",
//                                 "href": "text/part0126.html",
//                                 "label": "\n              9.1.2 获取和设置表单元素的值\n            ",
//                                 "subitems": [],
//                                 "parent": "num_170"
//                             },
//                             {
//                                 "id": "num_173",
//                                 "href": "text/part0127.html",
//                                 "label": "\n              9.1.3 确定按钮和选框是否选中\n            ",
//                                 "subitems": [],
//                                 "parent": "num_170"
//                             },
//                             {
//                                 "id": "num_174",
//                                 "href": "text/part0128.html",
//                                 "label": "\n              9.1.4 表单事件\n            ",
//                                 "subitems": [],
//                                 "parent": "num_170"
//                             }
//                         ],
//                         "parent": "num_169"
//                     },
//                     {
//                         "id": "num_175",
//                         "href": "text/part0129.html",
//                         "label": "\n            9.2 为表单添加智能\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_176",
//                                 "href": "text/part0129.html#heading_id_3",
//                                 "label": "\n              9.2.1 聚焦表单的第一个字段\n            ",
//                                 "subitems": [],
//                                 "parent": "num_175"
//                             },
//                             {
//                                 "id": "num_177",
//                                 "href": "text/part0130.html",
//                                 "label": "\n              9.2.2 关闭或打开字段\n            ",
//                                 "subitems": [],
//                                 "parent": "num_175"
//                             },
//                             {
//                                 "id": "num_178",
//                                 "href": "text/part0131.html",
//                                 "label": "\n              9.2.3 隐藏和显示表单选项\n            ",
//                                 "subitems": [],
//                                 "parent": "num_175"
//                             }
//                         ],
//                         "parent": "num_169"
//                     },
//                     {
//                         "id": "num_179",
//                         "href": "text/part0132.html",
//                         "label": "\n            9.3 教程：基本表单扩展\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_180",
//                                 "href": "text/part0132.html#heading_id_3",
//                                 "label": "\n              9.3.1 聚焦到一个字段\n            ",
//                                 "subitems": [],
//                                 "parent": "num_179"
//                             },
//                             {
//                                 "id": "num_181",
//                                 "href": "text/part0133.html",
//                                 "label": "\n              9.3.2 关闭表单字段\n            ",
//                                 "subitems": [],
//                                 "parent": "num_179"
//                             },
//                             {
//                                 "id": "num_182",
//                                 "href": "text/part0134.html",
//                                 "label": "\n              9.3.3 隐藏表单字段\n            ",
//                                 "subitems": [],
//                                 "parent": "num_179"
//                             }
//                         ],
//                         "parent": "num_169"
//                     },
//                     {
//                         "id": "num_183",
//                         "href": "text/part0135.html",
//                         "label": "\n            9.4 表单验证\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_184",
//                                 "href": "text/part0135.html#heading_id_3",
//                                 "label": "\n              9.4.1 jQuery Validation插件\n            ",
//                                 "subitems": [],
//                                 "parent": "num_183"
//                             },
//                             {
//                                 "id": "num_185",
//                                 "href": "text/part0136.html",
//                                 "label": "\n              9.4.2 基本验证\n            ",
//                                 "subitems": [],
//                                 "parent": "num_183"
//                             },
//                             {
//                                 "id": "num_186",
//                                 "href": "text/part0137.html",
//                                 "label": "\n              9.4.3 高级验证\n            ",
//                                 "subitems": [],
//                                 "parent": "num_183"
//                             },
//                             {
//                                 "id": "num_187",
//                                 "href": "text/part0138.html",
//                                 "label": "\n              9.4.4 样式化错误消息\n            ",
//                                 "subitems": [],
//                                 "parent": "num_183"
//                             }
//                         ],
//                         "parent": "num_169"
//                     },
//                     {
//                         "id": "num_188",
//                         "href": "text/part0139.html",
//                         "label": "\n            9.5 验证教程\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_189",
//                                 "href": "text/part0139.html#heading_id_3",
//                                 "label": "\n              9.5.1 基本验证\n            ",
//                                 "subitems": [],
//                                 "parent": "num_188"
//                             },
//                             {
//                                 "id": "num_190",
//                                 "href": "text/part0140.html",
//                                 "label": "\n              9.5.2 高级验证\n            ",
//                                 "subitems": [],
//                                 "parent": "num_188"
//                             },
//                             {
//                                 "id": "num_191",
//                                 "href": "text/part0141.html",
//                                 "label": "\n              9.5.3 验证复选框和单选按钮\n            ",
//                                 "subitems": [],
//                                 "parent": "num_188"
//                             },
//                             {
//                                 "id": "num_192",
//                                 "href": "text/part0142.html",
//                                 "label": "\n              9.5.4 格式化错误消息\n            ",
//                                 "subitems": [],
//                                 "parent": "num_188"
//                             }
//                         ],
//                         "parent": "num_169"
//                     }
//                 ],
//                 "parent": "num_139"
//             },
//             {
//                 "id": "num_193",
//                 "href": "text/part0143.html",
//                 "label": "\n          第10章 扩展界面\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_194",
//                         "href": "text/part0143.html#heading_id_3",
//                         "label": "\n            10.1 把信息组织到标签页面板\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_195",
//                                 "href": "text/part0143.html#heading_id_4",
//                                 "label": "\n              10.1.1 HTML\n            ",
//                                 "subitems": [],
//                                 "parent": "num_194"
//                             },
//                             {
//                                 "id": "num_196",
//                                 "href": "text/part0144.html",
//                                 "label": "\n              10.1.2 CSS\n            ",
//                                 "subitems": [],
//                                 "parent": "num_194"
//                             },
//                             {
//                                 "id": "num_197",
//                                 "href": "text/part0145.html",
//                                 "label": "\n              10.1.3 JavaScript\n            ",
//                                 "subitems": [],
//                                 "parent": "num_194"
//                             },
//                             {
//                                 "id": "num_198",
//                                 "href": "text/part0146.html",
//                                 "label": "\n              10.1.4 标签页面板教程\n            ",
//                                 "subitems": [],
//                                 "parent": "num_194"
//                             }
//                         ],
//                         "parent": "num_193"
//                     },
//                     {
//                         "id": "num_199",
//                         "href": "text/part0147.html",
//                         "label": "\n            10.2 为站点添加一个内容幻灯片\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_200",
//                                 "href": "text/part0147.html#heading_id_3",
//                                 "label": "\n              10.2.1 使用AnythingSlider\n            ",
//                                 "subitems": [],
//                                 "parent": "num_199"
//                             },
//                             {
//                                 "id": "num_201",
//                                 "href": "text/part0148.html",
//                                 "label": "\n              10.2.2 AnythingSlider教程\n            ",
//                                 "subitems": [],
//                                 "parent": "num_199"
//                             },
//                             {
//                                 "id": "num_202",
//                                 "href": "text/part0149.html",
//                                 "label": "\n              10.2.3 定制幻灯片外观\n            ",
//                                 "subitems": [],
//                                 "parent": "num_199"
//                             },
//                             {
//                                 "id": "num_203",
//                                 "href": "text/part0150.html",
//                                 "label": "\n              10.2.4 定制幻灯片行为\n            ",
//                                 "subitems": [],
//                                 "parent": "num_199"
//                             }
//                         ],
//                         "parent": "num_193"
//                     },
//                     {
//                         "id": "num_204",
//                         "href": "text/part0151.html",
//                         "label": "\n            10.3 确定页面元素的大小和位置\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_205",
//                                 "href": "text/part0151.html#heading_id_3",
//                                 "label": "\n              10.3.1 确定元素的高度和宽度\n            ",
//                                 "subitems": [],
//                                 "parent": "num_204"
//                             },
//                             {
//                                 "id": "num_206",
//                                 "href": "text/part0152.html",
//                                 "label": "\n              10.3.2 确定页面上的元素的位置\n            ",
//                                 "subitems": [],
//                                 "parent": "num_204"
//                             },
//                             {
//                                 "id": "num_207",
//                                 "href": "text/part0153.html",
//                                 "label": "\n              10.3.3 确定页面的滚动位置\n            ",
//                                 "subitems": [],
//                                 "parent": "num_204"
//                             }
//                         ],
//                         "parent": "num_193"
//                     },
//                     {
//                         "id": "num_208",
//                         "href": "text/part0154.html",
//                         "label": "\n            10.4 添加工具提示\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_209",
//                                 "href": "text/part0154.html#heading_id_3",
//                                 "label": "\n              10.4.1 HTML\n            ",
//                                 "subitems": [],
//                                 "parent": "num_208"
//                             },
//                             {
//                                 "id": "num_210",
//                                 "href": "text/part0155.html",
//                                 "label": "\n              10.4.2 CSS\n            ",
//                                 "subitems": [],
//                                 "parent": "num_208"
//                             },
//                             {
//                                 "id": "num_211",
//                                 "href": "text/part0156.html",
//                                 "label": "\n              10.4.3 JavaScript\n            ",
//                                 "subitems": [],
//                                 "parent": "num_208"
//                             },
//                             {
//                                 "id": "num_212",
//                                 "href": "text/part0157.html",
//                                 "label": "\n              10.4.4 工具提示教程\n            ",
//                                 "subitems": [],
//                                 "parent": "num_208"
//                             }
//                         ],
//                         "parent": "num_193"
//                     }
//                 ],
//                 "parent": "num_139"
//             }
//         ]
//     },
//     {
//         "id": "num_213",
//         "href": "text/part0158.html",
//         "label": "\n        第四部分：Ajax与Web服务器通信\n      ",
//         "subitems": [
//             {
//                 "id": "num_214",
//                 "href": "text/part0158.html#heading_id_3",
//                 "label": "\n          第11章 初识Ajax\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_215",
//                         "href": "text/part0158.html#heading_id_4",
//                         "label": "\n            11.1 Ajax\n          ",
//                         "subitems": [],
//                         "parent": "num_214"
//                     },
//                     {
//                         "id": "num_216",
//                         "href": "text/part0159.html",
//                         "label": "\n            11.2 Ajax基础知识\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_217",
//                                 "href": "text/part0159.html#heading_id_3",
//                                 "label": "\n              11.2.1 拼图块\n            ",
//                                 "subitems": [],
//                                 "parent": "num_216"
//                             },
//                             {
//                                 "id": "num_218",
//                                 "href": "text/part0160.html",
//                                 "label": "\n              11.2.2 和Web服务器通信\n            ",
//                                 "subitems": [],
//                                 "parent": "num_216"
//                             }
//                         ],
//                         "parent": "num_214"
//                     },
//                     {
//                         "id": "num_219",
//                         "href": "text/part0161.html",
//                         "label": "\n            11.3 Ajax的jQuery方式\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_220",
//                                 "href": "text/part0161.html#heading_id_3",
//                                 "label": "\n              11.3.1 使用load（）函数\n            ",
//                                 "subitems": [],
//                                 "parent": "num_219"
//                             },
//                             {
//                                 "id": "num_221",
//                                 "href": "text/part0162.html",
//                                 "label": "\n              11.3.2 教程：load（）函数\n            ",
//                                 "subitems": [],
//                                 "parent": "num_219"
//                             },
//                             {
//                                 "id": "num_222",
//                                 "href": "text/part0163.html",
//                                 "label": "\n              11.3.3 get（）和post（）函数\n            ",
//                                 "subitems": [],
//                                 "parent": "num_219"
//                             },
//                             {
//                                 "id": "num_223",
//                                 "href": "text/part0164.html",
//                                 "label": "\n              11.3.4 格式化发送给服务器的数据\n            ",
//                                 "subitems": [],
//                                 "parent": "num_219"
//                             },
//                             {
//                                 "id": "num_224",
//                                 "href": "text/part0165.html",
//                                 "label": "\n              11.3.5 处理来自服务器的数据\n            ",
//                                 "subitems": [],
//                                 "parent": "num_219"
//                             },
//                             {
//                                 "id": "num_225",
//                                 "href": "text/part0166.html",
//                                 "label": "\n              11.3.6 处理错误\n            ",
//                                 "subitems": [],
//                                 "parent": "num_219"
//                             },
//                             {
//                                 "id": "num_226",
//                                 "href": "text/part0167.html",
//                                 "label": "\n              11.3.7 教程：使用get（）函数\n            ",
//                                 "subitems": [],
//                                 "parent": "num_219"
//                             }
//                         ],
//                         "parent": "num_214"
//                     },
//                     {
//                         "id": "num_227",
//                         "href": "text/part0168.html",
//                         "label": "\n            11.4 JSON\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_228",
//                                 "href": "text/part0168.html#heading_id_3",
//                                 "label": "\n              11.4.1 访问JSON数据\n            ",
//                                 "subitems": [],
//                                 "parent": "num_227"
//                             },
//                             {
//                                 "id": "num_229",
//                                 "href": "text/part0169.html",
//                                 "label": "\n              11.4.2 复杂的JSON对象\n            ",
//                                 "subitems": [],
//                                 "parent": "num_227"
//                             }
//                         ],
//                         "parent": "num_214"
//                     }
//                 ],
//                 "parent": "num_213"
//             },
//             {
//                 "id": "num_230",
//                 "href": "text/part0170.html",
//                 "label": "\n          第12章 Flickr和Google Maps\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_231",
//                         "href": "text/part0170.html#heading_id_3",
//                         "label": "\n            12.1 JSONP简介\n          ",
//                         "subitems": [],
//                         "parent": "num_230"
//                     },
//                     {
//                         "id": "num_232",
//                         "href": "text/part0171.html",
//                         "label": "\n            12.2 给站点添加一个Flickr Feed\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_233",
//                                 "href": "text/part0171.html#heading_id_3",
//                                 "label": "\n              12.2.1 构建URL\n            ",
//                                 "subitems": [],
//                                 "parent": "num_232"
//                             },
//                             {
//                                 "id": "num_234",
//                                 "href": "text/part0172.html",
//                                 "label": "\n              12.2.2 使用$.getJSON（）函数\n            ",
//                                 "subitems": [],
//                                 "parent": "num_232"
//                             },
//                             {
//                                 "id": "num_235",
//                                 "href": "text/part0173.html",
//                                 "label": "\n              12.2.3 理解Flickr JSON Feed\n            ",
//                                 "subitems": [],
//                                 "parent": "num_232"
//                             }
//                         ],
//                         "parent": "num_230"
//                     },
//                     {
//                         "id": "num_236",
//                         "href": "text/part0174.html",
//                         "label": "\n            12.3 教程：给站点添加Flickr图像\n          ",
//                         "subitems": [],
//                         "parent": "num_230"
//                     },
//                     {
//                         "id": "num_237",
//                         "href": "text/part0175.html",
//                         "label": "\n            12.4 向站点添加Google地图\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_238",
//                                 "href": "text/part0175.html#heading_id_3",
//                                 "label": "\n              12.4.1 为地图设定位置\n            ",
//                                 "subitems": [],
//                                 "parent": "num_237"
//                             },
//                             {
//                                 "id": "num_239",
//                                 "href": "text/part0176.html",
//                                 "label": "\n              12.4.2 其他GoMap选项\n            ",
//                                 "subitems": [],
//                                 "parent": "num_237"
//                             },
//                             {
//                                 "id": "num_240",
//                                 "href": "text/part0177.html",
//                                 "label": "\n              12.4.3 添加标志\n            ",
//                                 "subitems": [],
//                                 "parent": "num_237"
//                             },
//                             {
//                                 "id": "num_241",
//                                 "href": "text/part0178.html",
//                                 "label": "\n              12.4.4 给标志添加信息窗口\n            ",
//                                 "subitems": [],
//                                 "parent": "num_237"
//                             },
//                             {
//                                 "id": "num_242",
//                                 "href": "text/part0179.html",
//                                 "label": "\n              12.4.5 GoMap教程\n            ",
//                                 "subitems": [],
//                                 "parent": "num_237"
//                             }
//                         ],
//                         "parent": "num_230"
//                     }
//                 ],
//                 "parent": "num_213"
//             }
//         ]
//     },
//     {
//         "id": "num_243",
//         "href": "text/part0180.html",
//         "label": "\n        第五部分：提示、技巧和除错\n      ",
//         "subitems": [
//             {
//                 "id": "num_244",
//                 "href": "text/part0180.html#heading_id_3",
//                 "label": "\n          第13章 让jQuery发挥最大的作用\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_245",
//                         "href": "text/part0180.html#heading_id_4",
//                         "label": "\n            13.1 有用的jQuery提示和信息\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_246",
//                                 "href": "text/part0180.html#heading_id_5",
//                                 "label": "\n              13.1.1 $（）等同于jQuery（）\n            ",
//                                 "subitems": [],
//                                 "parent": "num_245"
//                             },
//                             {
//                                 "id": "num_247",
//                                 "href": "text/part0181.html",
//                                 "label": "\n              13.1.2 将选择保存到变量中\n            ",
//                                 "subitems": [],
//                                 "parent": "num_245"
//                             },
//                             {
//                                 "id": "num_248",
//                                 "href": "text/part0182.html",
//                                 "label": "\n              13.1.3 尽可能少几次添加内容\n            ",
//                                 "subitems": [],
//                                 "parent": "num_245"
//                             },
//                             {
//                                 "id": "num_249",
//                                 "href": "text/part0183.html",
//                                 "label": "\n              13.1.4 优化选择器\n            ",
//                                 "subitems": [],
//                                 "parent": "num_245"
//                             }
//                         ],
//                         "parent": "num_244"
//                     },
//                     {
//                         "id": "num_250",
//                         "href": "text/part0184.html",
//                         "label": "\n            13.2 使用jQuery文档\n          ",
//                         "subitems": [],
//                         "parent": "num_244"
//                     },
//                     {
//                         "id": "num_251",
//                         "href": "text/part0185.html",
//                         "label": "\n            13.3 遍历DOM\n          ",
//                         "subitems": [],
//                         "parent": "num_244"
//                     },
//                     {
//                         "id": "num_252",
//                         "href": "text/part0186.html",
//                         "label": "\n            13.4 用于操作HTML的更多函数\n          ",
//                         "subitems": [],
//                         "parent": "num_244"
//                     },
//                     {
//                         "id": "num_253",
//                         "href": "text/part0187.html",
//                         "label": "\n            13.5 高级事件处理\n          ",
//                         "subitems": [],
//                         "parent": "num_244"
//                     }
//                 ],
//                 "parent": "num_243"
//             },
//             {
//                 "id": "num_254",
//                 "href": "text/part0188.html",
//                 "label": "\n          第14章 深入JavaScript\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_255",
//                         "href": "text/part0188.html#heading_id_3",
//                         "label": "\n            14.1 操作字符串\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_256",
//                                 "href": "text/part0188.html#heading_id_4",
//                                 "label": "\n              14.1.1 确定字符串的长度\n            ",
//                                 "subitems": [],
//                                 "parent": "num_255"
//                             },
//                             {
//                                 "id": "num_257",
//                                 "href": "text/part0189.html",
//                                 "label": "\n              14.1.2 更改字符串的大小写\n            ",
//                                 "subitems": [],
//                                 "parent": "num_255"
//                             },
//                             {
//                                 "id": "num_258",
//                                 "href": "text/part0190.html",
//                                 "label": "\n              14.1.3 搜索一个字符串：indexOf（）技术\n            ",
//                                 "subitems": [],
//                                 "parent": "num_255"
//                             },
//                             {
//                                 "id": "num_259",
//                                 "href": "text/part0191.html",
//                                 "label": "\n              14.1.4 使用slice（）提取一个字符串的部分\n            ",
//                                 "subitems": [],
//                                 "parent": "num_255"
//                             }
//                         ],
//                         "parent": "num_254"
//                     },
//                     {
//                         "id": "num_260",
//                         "href": "text/part0192.html",
//                         "label": "\n            14.2 在字符串中查找模式\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_261",
//                                 "href": "text/part0192.html#heading_id_3",
//                                 "label": "\n              14.2.1 创建和使用基本的正则表达式\n            ",
//                                 "subitems": [],
//                                 "parent": "num_260"
//                             },
//                             {
//                                 "id": "num_262",
//                                 "href": "text/part0193.html",
//                                 "label": "\n              14.2.2 构建一个正则表达式\n            ",
//                                 "subitems": [],
//                                 "parent": "num_260"
//                             },
//                             {
//                                 "id": "num_263",
//                                 "href": "text/part0194.html",
//                                 "label": "\n              14.2.3 模式的分组部分\n            ",
//                                 "subitems": [],
//                                 "parent": "num_260"
//                             },
//                             {
//                                 "id": "num_264",
//                                 "href": "text/part0195.html",
//                                 "label": "\n              14.4.4 有用的正则表达式\n            ",
//                                 "subitems": [],
//                                 "parent": "num_260"
//                             },
//                             {
//                                 "id": "num_265",
//                                 "href": "text/part0196.html",
//                                 "label": "\n              14.2.5 匹配一个模式\n            ",
//                                 "subitems": [],
//                                 "parent": "num_260"
//                             },
//                             {
//                                 "id": "num_266",
//                                 "href": "text/part0197.html",
//                                 "label": "\n              14.2.6 替换文本\n            ",
//                                 "subitems": [],
//                                 "parent": "num_260"
//                             },
//                             {
//                                 "id": "num_267",
//                                 "href": "text/part0198.html",
//                                 "label": "\n              14.2.7 尝试正则表达式\n            ",
//                                 "subitems": [],
//                                 "parent": "num_260"
//                             }
//                         ],
//                         "parent": "num_254"
//                     },
//                     {
//                         "id": "num_268",
//                         "href": "text/part0199.html",
//                         "label": "\n            14.3 操作数字\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_269",
//                                 "href": "text/part0199.html#heading_id_3",
//                                 "label": "\n              14.3.1 将字符串更改为数字\n            ",
//                                 "subitems": [],
//                                 "parent": "num_268"
//                             },
//                             {
//                                 "id": "num_270",
//                                 "href": "text/part0200.html",
//                                 "label": "\n              14.3.2 测试数字\n            ",
//                                 "subitems": [],
//                                 "parent": "num_268"
//                             },
//                             {
//                                 "id": "num_271",
//                                 "href": "text/part0201.html",
//                                 "label": "\n              14.3.3 对数字取整\n            ",
//                                 "subitems": [],
//                                 "parent": "num_268"
//                             },
//                             {
//                                 "id": "num_272",
//                                 "href": "text/part0202.html",
//                                 "label": "\n              14.3.4 格式化货币值\n            ",
//                                 "subitems": [],
//                                 "parent": "num_268"
//                             },
//                             {
//                                 "id": "num_273",
//                                 "href": "text/part0203.html",
//                                 "label": "\n              14.3.5 创建一个随机数\n            ",
//                                 "subitems": [],
//                                 "parent": "num_268"
//                             }
//                         ],
//                         "parent": "num_254"
//                     },
//                     {
//                         "id": "num_274",
//                         "href": "text/part0204.html",
//                         "label": "\n            14.4 日期和时间\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_275",
//                                 "href": "text/part0204.html#heading_id_3",
//                                 "label": "\n              14.4.1 获取月份\n            ",
//                                 "subitems": [],
//                                 "parent": "num_274"
//                             },
//                             {
//                                 "id": "num_276",
//                                 "href": "text/part0205.html",
//                                 "label": "\n              14.4.2 获取星期几\n            ",
//                                 "subitems": [],
//                                 "parent": "num_274"
//                             },
//                             {
//                                 "id": "num_277",
//                                 "href": "text/part0206.html",
//                                 "label": "\n              14.4.3 获取时间\n            ",
//                                 "subitems": [],
//                                 "parent": "num_274"
//                             },
//                             {
//                                 "id": "num_278",
//                                 "href": "text/part0207.html",
//                                 "label": "\n              14.4.4 创建今天以外的一个日期\n            ",
//                                 "subitems": [],
//                                 "parent": "num_274"
//                             }
//                         ],
//                         "parent": "num_254"
//                     },
//                     {
//                         "id": "num_279",
//                         "href": "text/part0208.html",
//                         "label": "\n            14.5 综合应用\n          ",
//                         "subitems": [],
//                         "parent": "num_254"
//                     },
//                     {
//                         "id": "num_280",
//                         "href": "text/part0209.html",
//                         "label": "\n            14.6 编写更高效的JavaScript\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_281",
//                                 "href": "text/part0209.html#heading_id_3",
//                                 "label": "\n              14.6.1 优先使用变量\n            ",
//                                 "subitems": [],
//                                 "parent": "num_280"
//                             },
//                             {
//                                 "id": "num_282",
//                                 "href": "text/part0210.html",
//                                 "label": "\n              14.6.2 三元操作符\n            ",
//                                 "subitems": [],
//                                 "parent": "num_280"
//                             },
//                             {
//                                 "id": "num_283",
//                                 "href": "text/part0211.html",
//                                 "label": "\n              14.6.3 switch语句\n            ",
//                                 "subitems": [],
//                                 "parent": "num_280"
//                             }
//                         ],
//                         "parent": "num_254"
//                     },
//                     {
//                         "id": "num_284",
//                         "href": "text/part0212.html",
//                         "label": "\n            14.7 创建快速载入的JavaScript\n          ",
//                         "subitems": [],
//                         "parent": "num_254"
//                     }
//                 ],
//                 "parent": "num_243"
//             },
//             {
//                 "id": "num_285",
//                 "href": "text/part0213.html",
//                 "label": "\n          第15章 除错和调试\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_286",
//                         "href": "text/part0213.html#heading_id_3",
//                         "label": "\n            15.1 常见JavaScript编程错误\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_287",
//                                 "href": "text/part0213.html#heading_id_4",
//                                 "label": "\n              15.1.1 没有结束符号\n            ",
//                                 "subitems": [],
//                                 "parent": "num_286"
//                             },
//                             {
//                                 "id": "num_288",
//                                 "href": "text/part0214.html",
//                                 "label": "\n              15.1.2 引号\n            ",
//                                 "subitems": [],
//                                 "parent": "num_286"
//                             },
//                             {
//                                 "id": "num_289",
//                                 "href": "text/part0215.html",
//                                 "label": "\n              15.1.3 使用保留字\n            ",
//                                 "subitems": [],
//                                 "parent": "num_286"
//                             },
//                             {
//                                 "id": "num_290",
//                                 "href": "text/part0216.html",
//                                 "label": "\n              15.1.4 条件语句中的单个等号\n            ",
//                                 "subitems": [],
//                                 "parent": "num_286"
//                             },
//                             {
//                                 "id": "num_291",
//                                 "href": "text/part0217.html",
//                                 "label": "\n              15.1.5 区分大小写\n            ",
//                                 "subitems": [],
//                                 "parent": "num_286"
//                             },
//                             {
//                                 "id": "num_292",
//                                 "href": "text/part0218.html",
//                                 "label": "\n              15.1.6 外部JavaScript文件的路径不正确\n            ",
//                                 "subitems": [],
//                                 "parent": "num_286"
//                             },
//                             {
//                                 "id": "num_293",
//                                 "href": "text/part0219.html",
//                                 "label": "\n              15.1.7 外部JavaScript文件中的不正确路径\n            ",
//                                 "subitems": [],
//                                 "parent": "num_286"
//                             },
//                             {
//                                 "id": "num_294",
//                                 "href": "text/part0220.html",
//                                 "label": "\n              15.1.8 消失的变量和函数\n            ",
//                                 "subitems": [],
//                                 "parent": "num_286"
//                             }
//                         ],
//                         "parent": "num_285"
//                     },
//                     {
//                         "id": "num_295",
//                         "href": "text/part0221.html",
//                         "label": "\n            15.2 使用Firebug调试\n          ",
//                         "subitems": [
//                             {
//                                 "id": "num_296",
//                                 "href": "text/part0221.html#heading_id_3",
//                                 "label": "\n              15.2.1 安装并打开Firebug\n            ",
//                                 "subitems": [],
//                                 "parent": "num_295"
//                             },
//                             {
//                                 "id": "num_297",
//                                 "href": "text/part0222.html",
//                                 "label": "\n              15.2.2 用Firebug查看错误\n            ",
//                                 "subitems": [],
//                                 "parent": "num_295"
//                             },
//                             {
//                                 "id": "num_298",
//                                 "href": "text/part0223.html",
//                                 "label": "\n              15.2.3 使用console.log（）记录脚本过程\n            ",
//                                 "subitems": [],
//                                 "parent": "num_295"
//                             },
//                             {
//                                 "id": "num_299",
//                                 "href": "text/part0224.html",
//                                 "label": "\n              15.2.4 教程：使用Firebug控制台\n            ",
//                                 "subitems": [],
//                                 "parent": "num_295"
//                             },
//                             {
//                                 "id": "num_300",
//                                 "href": "text/part0225.html",
//                                 "label": "\n              15.2.5 更强大的调试\n            ",
//                                 "subitems": [],
//                                 "parent": "num_295"
//                             }
//                         ],
//                         "parent": "num_285"
//                     },
//                     {
//                         "id": "num_301",
//                         "href": "text/part0226.html",
//                         "label": "\n            15.3 调试教程\n          ",
//                         "subitems": [],
//                         "parent": "num_285"
//                     }
//                 ],
//                 "parent": "num_243"
//             }
//         ]
//     },
//     {
//         "id": "num_302",
//         "href": "text/part0227_split_000.html",
//         "label": "\n        附录A JavaScript资源\n      ",
//         "subitems": [
//             {
//                 "id": "num_303",
//                 "href": "text/part0227_split_001.html",
//                 "label": "\n          A.1参考\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_304",
//                         "href": "text/part0227_split_001.html#heading_id_4",
//                         "label": "\n            Web站点\n          ",
//                         "subitems": [],
//                         "parent": "num_303"
//                     },
//                     {
//                         "id": "num_305",
//                         "href": "text/part0227_split_001.html#heading_id_5",
//                         "label": "\n            图书\n          ",
//                         "subitems": [],
//                         "parent": "num_303"
//                     }
//                 ],
//                 "parent": "num_302"
//             },
//             {
//                 "id": "num_306",
//                 "href": "text/part0228.html",
//                 "label": "\n          A.2 JavaScript基础\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_307",
//                         "href": "text/part0228.html#heading_id_3",
//                         "label": "\n            Web站点\n          ",
//                         "subitems": [],
//                         "parent": "num_306"
//                     },
//                     {
//                         "id": "num_308",
//                         "href": "text/part0228.html#heading_id_4",
//                         "label": "\n            图书\n          ",
//                         "subitems": [],
//                         "parent": "num_306"
//                     }
//                 ],
//                 "parent": "num_302"
//             },
//             {
//                 "id": "num_309",
//                 "href": "text/part0229.html",
//                 "label": "\n          A.3 jQuery\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_310",
//                         "href": "text/part0229.html#heading_id_3",
//                         "label": "\n            Web站点\n          ",
//                         "subitems": [],
//                         "parent": "num_309"
//                     },
//                     {
//                         "id": "num_311",
//                         "href": "text/part0229.html#heading_id_4",
//                         "label": "\n            图书\n          ",
//                         "subitems": [],
//                         "parent": "num_309"
//                     }
//                 ],
//                 "parent": "num_302"
//             },
//             {
//                 "id": "num_312",
//                 "href": "text/part0230.html",
//                 "label": "\n          A.4 Ajax\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_313",
//                         "href": "text/part0230.html#heading_id_3",
//                         "label": "\n            Web站点\n          ",
//                         "subitems": [],
//                         "parent": "num_312"
//                     },
//                     {
//                         "id": "num_314",
//                         "href": "text/part0230.html#heading_id_4",
//                         "label": "\n            图书\n          ",
//                         "subitems": [],
//                         "parent": "num_312"
//                     }
//                 ],
//                 "parent": "num_302"
//             },
//             {
//                 "id": "num_315",
//                 "href": "text/part0231.html",
//                 "label": "\n          A.5高级JavaScript\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_316",
//                         "href": "text/part0231.html#heading_id_3",
//                         "label": "\n            Web站点\n          ",
//                         "subitems": [],
//                         "parent": "num_315"
//                     },
//                     {
//                         "id": "num_317",
//                         "href": "text/part0231.html#heading_id_4",
//                         "label": "\n            图书\n          ",
//                         "subitems": [],
//                         "parent": "num_315"
//                     }
//                 ],
//                 "parent": "num_302"
//             },
//             {
//                 "id": "num_318",
//                 "href": "text/part0232.html",
//                 "label": "\n          A.6 CSS\n        ",
//                 "subitems": [
//                     {
//                         "id": "num_319",
//                         "href": "text/part0232.html#heading_id_3",
//                         "label": "\n            Web站点\n          ",
//                         "subitems": [],
//                         "parent": "num_318"
//                     },
//                     {
//                         "id": "num_320",
//                         "href": "text/part0232.html#heading_id_4",
//                         "label": "\n            图书\n          ",
//                         "subitems": [],
//                         "parent": "num_318"
//                     }
//                 ],
//                 "parent": "num_302"
//             }
//         ]
//     }
// ])
// 当前章节和bookstore里数据双向绑定
const { books: booksInfo } = storeToRefs(bookStore)
const toc = ref(booksInfo.value.find(b => b.uuid === uuid)?.location)

const handleTocChange = () => {
  rendition.value.display(toc.value)
  bookStore.setBookLocation(uuid as string, toc.value!)
}

const handleNodeClick = (data: NavItem) => {
  console.log(data)
}

const defaultProps = {
  children: 'subitems',
  label: 'label',
}

watch(book, async () => {  
  if(book){
    const navigation = await book.value.loaded.navigation     
    console.log('目录', navigation.toc);
    function traverseToc(toc: NavItem[]) {
      for(let item of toc){
      }
    }
       
    tocData.value = navigation.toc
    // tocData.value = navigation.toc.map(navItem => {
    //   return {
    //     label: navItem.label.trim(),
    //     value: navItem.href,
    //     children: navItem?.subitems || []
    //   }
    // })
  }
})

watch(booksInfo, () => {
  toc.value = bookStore.getBookLocation(uuid as string)
}, {deep: true})

</script>

<style lang='scss'>
.toc-slide-enter-active,
.toc-slide-leave-active {
  transition: transform 0.5s;
}

.toc-slide-enter-from,
.toc-slide-leave-to {
  transform: translateX(-100%);
}
.toc-visible {
  width: 320px !important;
}
.toc-container {
  width: 0;
  height: 100vh;
  overflow-y: auto;
  flex-shrink: 0;
  border-right: 2px solid var(--el-border-color);
  transition: all 0.5s;

  .toc-tree {
    margin-top: 100px;
    .el-tree-node {
      border-bottom: 1px solid var(--el-border-color);
      padding: 8px 12px;

      .el-tree-node__children{
        .el-tree-node:last-of-type {
          border-bottom: none;
          padding-bottom: 0;
        }
      }
    }

  }
}
</style>