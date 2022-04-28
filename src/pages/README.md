## File-based Routing

Routes will be auto-generated for Vue files in this dir with the same file structure.
Check out [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages) for more details.

这个目录的文件会自动生成为路由配置。详情 [`vite-plugin-pages`](https://github.com/hannoeru/vite-plugin-pages)

### Path Aliasing

`@/` is aliased to `./src/` folder.

`@/` 是 `./src/` 的别名.

For example, instead of having

```ts
import { isDark } from '../../../../composables'
```

now, you can use

```ts
import { isDark } from '@/composables'
```
