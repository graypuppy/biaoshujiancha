# Tailwind CSS 类名速查表

> 📖 官方文档：[tailwindcss.com/docs](https://tailwindcss.com/docs) 遇到陌生类名直接在官网搜索。

---

## 零、尺寸刻度词（通用后缀）

这些单词是 Tailwind 的**"T恤尺码系统"**，贯穿于字号、圆角、阴影、按钮大小等几乎所有地方。

| 后缀 | 全称 | 相对大小 | 常见使用场景 |
| :--- | :--- | :--- | :--- |
| `xs` | Extra Small | 极小 | `text-xs`（12px 字号）、`rounded-xs`（极小圆角） |
| `sm` | Small | 小 | `text-sm`（14px）、`rounded-sm`（小圆角 2px）、`shadow-sm`（轻投影）、`size="sm"`（小尺寸按钮） |
| `base` | Base | 默认（基准） | `text-base`（16px，正文默认字号） |
| `lg` | Large | 大 | `text-lg`（18px）、`rounded-lg`（8px 圆角） |
| `xl` | Extra Large | 更大 | `text-xl`（20px）、`rounded-xl`（12px 圆角） |
| `2xl` | 2×Extra Large | 特大 | `text-2xl`（24px）、`rounded-2xl`（16px 圆角，气泡常用） |
| `3xl` ～ `9xl` | 以此类推 | 越来越大 | 通常仅用于标题类的超大字号 |

### `mono` 是什么？
`mono` 是 **Monospace（等宽字体）** 的缩写，不属于大小，而是**字体风格**：
- `font-mono`：让文字用等宽字体渲染（每个字母宽度一致，像代码编辑器里的字体）。
- **常见用途**：显示代码片段、数字对齐、例题内容（你的 `KnowledgeCard.tsx` 第 29 行就用了它）。

---

## 一、间距系统（核心规律）

Tailwind 使用 4px 为基础单位：`1 = 4px`，`2 = 8px`，`3 = 12px`，`4 = 16px` ……

### 方向缩写
| 缩写 | 含义 |
| :--- | :--- |
| `t` | top（上） |
| `b` | bottom（下） |
| `l` | left（左） |
| `r` | right（右） |
| `x` | 左 + 右（水平） |
| `y` | 上 + 下（垂直） |
| 不写 | 上下左右全加 |

### Padding（内边距）
| 类名 | Figma 对应 | 含义 |
| :--- | :--- | :--- |
| `p-4` | Padding: 16px（全部） | 内部四边留白 16px |
| `px-4` | Padding Left/Right: 16px | 左右留白 |
| `py-3` | Padding Top/Bottom: 12px | 上下留白 |
| `pt-2` | Padding Top: 8px | 只加上边留白 |

### Margin（外边距）
| 类名 | Figma 对应 | 含义 |
| :--- | :--- | :--- |
| `mt-3` | — | 上方外部留白 12px |
| `mb-4` | — | 下方外部留白 16px |
| `mx-auto` | 水平居中 | 左右 margin 自动分配，实现水平居中 |

---

## 二、尺寸（Size）

| 类名 | 含义 |
| :--- | :--- |
| `w-8` | 宽度 32px（8 × 4px） |
| `h-8` | 高度 32px |
| `w-full` | 宽度 100%（Fill 父容器） |
| `h-screen` | 高度等于整个屏幕可视区域 |
| `max-w-[75%]` | 最大宽度 75%（自定义数值用方括号）|
| `min-h-0` | 最小高度为 0（防止撑破父容器） |

---

## 三、布局（Layout）

### Flexbox（最常用）
| 类名 | Figma 对应 | 含义 |
| :--- | :--- | :--- |
| `flex` | Auto Layout（横向） | 开启弹性布局，子元素默认横向排队 |
| `flex-col` | Auto Layout（纵向） | 子元素纵向排列 |
| `flex-1` | Fill Container | 撑满父容器剩余空间 |
| `shrink-0` | Fixed / Hug | 禁止被父容器压缩 |
| `items-center` | 纵轴居中对齐 | 子元素在侧轴方向（垂直于排列方向）居中 |
| `justify-center` | 主轴居中 | 子元素在排列方向上居中 |
| `justify-between` | 两端对齐 | 子元素两端对齐，中间空白均分 |
| `justify-end` | 靠右/靠底对齐 | 子元素推到末端 |
| `justify-start` | 靠左/靠顶对齐 | 子元素推到起始端 |
| `gap-3` | Spacing: 12px | 子元素之间的间距 |

### 其他布局
| 类名 | 含义 |
| :--- | :--- |
| `overflow-y-auto` | 纵向内容溢出时显示滚动条 |
| `overflow-hidden` | 超出边界的内容直接裁剪 |
| `scroll-smooth` | 开启平滑滚动（跳锚点、回到底部等操作时包含平缓的动画过渡） |

---

## 四、颜色系统

Tailwind 颜色格式：`{属性}-{色系}-{深浅}`，深浅从 `50`（最浅）到 `950`（最深）。

| 类名 | 含义 |
| :--- | :--- |
| `bg-white` | 背景色：纯白 |
| `bg-slate-50` | 背景色：最浅的灰蓝色 |
| `bg-emerald-500` | 背景色：中等深度绿色 |
| `bg-blue-50/50` | 背景色：浅蓝色，50% 透明度（`/数字` 是透明度） |
| `text-white` | 文字颜色：白色 |
| `text-slate-500` | 文字颜色：中灰色 |
| `text-slate-900` | 文字颜色：接近黑色 |
| `border-blue-100` | 边框颜色：极浅蓝色 |

---

## 五、边框与圆角

| 类名 | Figma 对应 | 含义 |
| :--- | :--- | :--- |
| `border` | Stroke（全部） | 加一圈边框 |
| `border-b` | Stroke Bottom only | 只加底部边框 |
| `border-t` | Stroke Top only | 只加顶部边框 |
| `rounded-md` | Corner Radius: 6px | 中等圆角 |
| `rounded-xl` | Corner Radius: 12px | 较大圆角 |
| `rounded-2xl` | Corner Radius: 16px | 大圆角（气泡样式常用） |
| `rounded-full` | Corner Radius: 50% | 完全圆形 |
| `rounded-br-sm` | 右下角单独 2px 圆角 | 对话气泡底部尖角效果 |
| `rounded-bl-sm` | 左下角单独 2px 圆角 | 同上，AI 侧气泡 |

---

## 六、文字（Typography）

| 类名 | Figma 对应 | 含义 |
| :--- | :--- | :--- |
| `text-xs` | Font Size: 12px | 极小字 |
| `text-sm` | Font Size: 14px | 小字（正文常用） |
| `text-base` | Font Size: 16px | 默认字号 |
| `text-lg` | Font Size: 18px | 较大字 |
| `font-bold` | Font Weight: Bold | 粗体 |
| `font-semibold` | Font Weight: SemiBold | 半粗体 |
| `font-mono` | Font Family: Monospace | 等宽字体（代码常用） |
| `leading-relaxed` | Line Height: 1.625 | 放宽行高，便于阅读 |

---

## 七、阴影与特效

| 类名 | Figma 对应 | 含义 |
| :--- | :--- | :--- |
| `shadow-sm` | Drop Shadow（轻微） | 轻投影 |
| `shadow` | Drop Shadow（中等） | 中等投影 |

---

## 八、交互状态（伪类）

| 类名 | Figma 对应 | 含义 |
| :--- | :--- | :--- |
| `hover:bg-emerald-600` | Hover 变体 | 鼠标悬停时背景色变深 |
| `focus:outline-none` | — | 获取焦点时取消默认轮廓线 |
| `active:scale-95` | Pressed 变体 | 点击时略微缩小（按钮触感） |

---

## 九、响应式系统（断点修饰符）

Tailwind 遵循**移动端优先（Mobile First）**的规则，通过添加带有 `:` 前缀的类名实现设备尺寸适配。基础的无前缀类名会应用在最小的手机设备上。

| 前缀 | 屏幕宽度界限 | 常见对应设备 | 示例用法 |
| :--- | :--- | :--- | :--- |
| `sm:` | `≥ 640px` | 平板竖屏/大屏手机 | `sm:p-6`（超过640px时 padding 变为 24px） |
| `md:` | `≥ 768px` | 平板 | `md:flex-row`（平板设备变为水平排列） |
| `lg:` | `≥ 1024px` | 笔记本/桌面显示器 | `lg:p-8`（桌面设备 padding 变为 32px） |
| `xl:` | `≥ 1280px` | 大尺寸桌面显示器 | `xl:max-w-7xl`（大屏幕下限制居中最大宽度） |
| `2xl:` | `≥ 1536px` | 超大宽屏 | `2xl:text-lg`（巨屏下基础字号增加） |

**经典组合进阶用法：**
- **内边距渐进适配**：`p-4 sm:p-6 lg:p-8` 
  （手机间距 16px，平板变 24px，大屏变 32px，仅用这三个词就完美实现了跨端的响应式内间距）
- **流式卡片网格响应**：`w-full md:w-1/2 lg:w-1/3`
  （列表设计卡片网格系统：手机横屏占比100%，平板并排显示2项，桌面电脑显示3项）
- **排版堆叠方向切换**：`flex flex-col md:flex-row`
  （手机窄屏模式下从上到下垂直堆叠展示，而在大于平板等特定宽度屏幕下，可自动转化为从左到右的水平布局）
