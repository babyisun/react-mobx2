/**
 * 全局路由配置
 *
 * name - 导航展示名称
 * path - 页面 url路由，区分大小写，与你的文件夹命名大小写保持一致
 * folder - 文件目录，区分大小写，与你的文件夹命名大小写保持一致
 * file - 页面文件所在路径，
 * store - 页面对应的store文件，可接收多个，数组形式，同文件夹直接写名称，不同文件夹请写src下的全路径
 * icon - 图标名
 * code - 权限码
 * showChildren - 是否显示展现子菜单，默认不展示，如需展示请设为true
 *
 * children - 配置项递归同上
 */
const router = [
/*   {
  name: '项目管理',
  path: '/Project',
  icon: 'appstore',
  code: 1,
  children: [{
    name: '列表一',
    path: '/One/TwoA',
    folder: '/One/TwoA', // 所在文件夹
    file: 'Index', // 有file属性的会加入路由
    store: ['store'], // 有store属性的会注入store实例到props，与path在同一目录直接写文件名即可
    icon: 'appstore-o',
    code: 1,
  }],
}, */
  {
    name: '项目管理',
    path: '/Project',
    folder: '/Project',
    file: 'Index',
    store: ['store'],
    icon: 'project',
    code: 1,
  },
  {
    name: '词表管理',
    path: '/Words',
    folder: '/Words',
    file: 'Index',
    store: ['store'],
    icon: 'word',
    code: 1,
  },
  {
    name: '用例管理',
    path: '/Case',
    folder: '/Case',
    file: 'Index',
    store: ['store'],
    icon: 'case',
    code: 1,
    // showChildren: true,
    children: [{
      name: '查看用例',
      path: '/Case/Detail/:id',
      folder: '/Case',
      store: ['store'],
      file: 'Detail',
      code: 1,
    }, {
      name: '新增用例',
      path: '/Case/Add',
      folder: '/Case',
      store: ['store'],
      file: 'Add',
      code: 1,
    }, {
      name: '编辑用例',
      path: '/Case/Edit/:id',
      folder: '/Case',
      store: ['store'],
      file: 'Edit',
      code: 1,
    }],
  },
  {
    name: '任务管理',
    path: '/Task',
    folder: '/Task',
    file: 'Index',
    store: ['store'],
    icon: 'task',
    code: 1,
    children: [{
      name: '查看',
      path: '/Task/Detail/:id',
      folder: '/Task',
      store: ['store'],
      file: 'Detail',
      code: 1,
    }, {
      name: '新建',
      path: '/Task/Add',
      folder: '/Task',
      store: ['store'],
      file: 'Add',
      code: 1,
    }, {
      name: '编辑',
      path: '/Task/Edit/:id',
      folder: '/Task',
      store: ['store'],
      file: 'Edit',
      code: 1,
    }, {
      name: '实时监控详情 ',
      path: '/Task/WatchDetail/:id/:res/:index',
      folder: '/Task',
      store: ['storeChart'],
      file: 'WatchDetail',
      code: 1,
    }],
  },
];

export default router;
