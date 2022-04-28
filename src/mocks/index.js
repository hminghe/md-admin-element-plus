import Mock from 'mockjs';

function createMenu(name, icon, path, children) {
  return {
    name,
    icon,
    path,
    children,
  };
}

const userMap = {
  admin: {
    username: 'admin',
    nickname: 'Admin',
    token: 'admin-token',
    avatar: 'https://iph.href.lu/100x100?text=MD&fg=FFFFFF&bg=000000',
    permission: {
      identifyList: ['*'],
      menuList: [
        createMenu('仪表盘', 'i-ep-odometer', '/dashboard', [
          createMenu('工作台', '', '/dashboard/workplace'),
          createMenu('分析页', '', '/dashboard/analysis'),
          createMenu('监控页', '', '/dashboard/monitor'),
        ]),
        createMenu('表单页', 'i-ep-edit', '/form', [
          createMenu('基础表单', '', '/form/basic-form'),
          createMenu('分步表单', '', '/form/step-form'),
          createMenu('高级表单', '', '/form/advanced-form'),
        ]),
        createMenu('列表页', 'i-ep-grid', '/list', [
          createMenu('查询列表', '', '/list/table'),
        ]),
        createMenu('详情页', 'i-ep-document', '/profile', [
          createMenu('基础详情页', '', '/profile/basic'),
          createMenu('高级详情页', '', '/profile/advanced'),
        ]),
        createMenu('结果页', 'i-ep-reading', '/result', [
          createMenu('成功页', '', '/result/success'),
          createMenu('失败页', '', '/result/fail'),
        ]),
        createMenu('异常页', 'i-ep-data-board', '/exception', [
          createMenu('403', '', '/exception/403'),
          createMenu('404', '', '/exception/404'),
          createMenu('500', '', '/exception/500'),
        ]),
        createMenu('图标集', 'i-ep-brush', '/icons', [
          createMenu('Element Plus', '', '/icons/element-plus'),
          createMenu('Ant Design', '', '/icons/ant-design'),
          createMenu('更多图标', '', 'https://icones.netlify.app/'),
        ]),
        createMenu('多窗口演示', 'i-ep-refresh-right', '/multi-window', [
          createMenu('演示', '', '/multi-window'),
          createMenu('详细页面演示', '', '/multi-window/page2'),
        ]),
        createMenu('权限演示', 'i-ep-flag', '/permission'),
      ],
    },
  },
  test: {
    username: 'test',
    nickname: '测试人员',
    token: 'test-token',
    avatar: 'https://iph.href.lu/100x100?text=MD&fg=FFFFFF&bg=000000',
    permission: {
      identifyList: ['test'],
      menuList: [
        createMenu('仪表盘', 'i-ep-odometer', '/dashboard', [
          createMenu('工作台', '', '/dashboard/workplace'),
          createMenu('分析页', '', '/dashboard/analysis'),
          createMenu('监控页', '', '/dashboard/monitor'),
        ]),
        createMenu('表单页', 'i-ep-edit', '/form', [
          createMenu('基础表单', '', '/form/basic-form'),
          createMenu('分步表单', '', '/form/step-form'),
          createMenu('高级表单', '', '/form/advanced-form'),
        ]),
        createMenu('列表页', 'i-ep-grid', '/list', [
          createMenu('查询列表', '', '/list/table'),
        ]),
        createMenu('详情页', 'i-ep-document', '/profile', [
          createMenu('基础详情页', '', '/profile/basic'),
          createMenu('高级详情页', '', '/profile/advanced'),
        ]),
        createMenu('权限演示', 'i-ep-flag', '/permission'),
      ],
    },
  },

  dev: {
    username: 'dev',
    nickname: '开发人员',
    token: 'dev-token',
    avatar: 'https://iph.href.lu/100x100?text=MD&fg=FFFFFF&bg=000000',
    permission: {
      identifyList: ['dev'],
      menuList: [
        createMenu('权限演示', 'i-ep-flag', '/permission'),
      ],
    },
  },
};
function getUser(username) {
  if (userMap[username]) {
    return {
      ...userMap[username],
      errCode: 0,
      errMsg: 'success',
    };
  } else {
    return {
      errCode: 'no-login',
      errMsg: '请先登录',
    };
  }
}

Mock.mock(new RegExp('/user/login'), (request) => {
  const data = JSON.parse(request.body);
  return getUser(data.username);

  // return {
  //   errCode: '01',
  //   errMsg: '账号或者密码出错',
  // };
});

Mock.mock(new RegExp('/user/info'), function (request) {
  const user = localStorage.getItem('MDAdminToken')?.split('-')[0]

  return getUser(user);
});

Mock.mock(new RegExp('/tableList'), {
  errCode: 0,
  errMsg: 'success',
  total: 100,
  ['list|15']: [
    {
      'id|+1': 1,
      'name|1-10': '★',
      'desc|5-10': '★',
      'count|100-1000': 10,
      'status|1-4': 1,
      'lastTime': () => Mock.mock('@datetime'),
    },
  ],
});

function getUserName() {
  
}
