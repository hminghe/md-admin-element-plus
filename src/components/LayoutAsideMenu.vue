<script lang="tsx">
// import { ElMenu } from 'element-plus'
import { computed } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { type Menu, usePermissionStore } from '@/stores/permission'
export default {
  name: 'LayoutAsideMenu',
  setup() {
    const route = useRoute()
    const router = useRouter()
    const permissionStore = usePermissionStore()

    const defaultActive = computed(() => {
      let currentPath = route.path

      if (!permissionStore.hasMenu(currentPath)) {
        let max = 0
        for (const { path } of permissionStore.allMenu) {
          if (route.path.includes(path) && path.length > max) {
            max = path.length
            currentPath = path
          }
        }
      }

      return currentPath
    })

    function onClickMenu(menu: Menu) {
      const { path } = menu
      if (path.indexOf('http') === 0) {
        window.open(path)
      } else if (path !== route.fullPath) {
        router.push(path)
      }
    }

    function renderMenuItem(menu: Menu) {
      const {
        path,
        icon,
        name,
        children,
      } = menu
      const title = () => (
        <>
          {icon && <el-icon><i className={`${icon}`}></i></el-icon>}
          <span>{name}</span>
        </>
      )

      if (children && children.length) {
        return (
          <el-sub-menu
            index={path}
            key={path}
            v-slots={{ title }}
            background-color="red"
          >
            {renderMenuList(children)}
          </el-sub-menu>
        )
      } else {
        return (
          <el-menu-item
            key={path}
            index={path}
            router={path}
            v-slots={{ title }}
            onClick={() => onClickMenu(menu)}
          >
          </el-menu-item>
        )
      }
    }

    function renderMenuList(list: Menu[]) {
      return list.map(renderMenuItem)
    }

    // eslint-disable-next-line react/display-name
    return () => (
      <el-menu class="pb-10" default-active={defaultActive.value}>
        {renderMenuList(permissionStore.menuList)}
      </el-menu>
    )
  },
}
</script>

<style lang="less" scoped>

.el-menu {
  > :deep(.el-sub-menu) {
    > .el-menu {
      background-color: #000c17;
    }
  }

  :deep(.el-menu-item.is-active) {
    background-color: #409eff;
  }
}
</style>
