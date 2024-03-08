/**
 * 项目默认配置项
 * primaryColor - 默认主题色, 如果修改颜色不生效，请清理 localStorage
 * navTheme - sidebar theme ['dark', 'light'] 两种主题
 * colorWeak - 色盲模式
 * layout - 整体布局方式 ['sidemenu', 'topmenu'] 两种布局
 * fixedHeader - 固定 Header : boolean
 * fixSiderbar - 固定左侧菜单栏 ： boolean
 * contentWidth - 内容区布局： 流式 |  固定
 */

export default {
    // #region 以下内容暂时没用 目前在reactiveState的systemConfig中写死即可,也可以在setupDefaultSetting中siteSettings变量为空(else的情况)时将以下内容systemConfig.commit()进去
    navTheme: 'light', // theme for nav menu
    layout: 'sidemenu', // nav menu position: `sidemenu` or `topmenu`
    contentWidth: 'Fluid', // layout of content: `Fluid` or `Fixed`, only works when layout is topmenu
    fixedHeader: true, // sticky header
    fixSiderbar: true, // sticky siderbar
    colorWeak: false,
    grayMode: false,
    darkMode: false,
    // #endregion

    primaryColor: '#0052cc', // ant design 默认主颜色(在node_modules/ant-design-vue/style/color/colors.less中@blue-base变量定义,实际上@primary-color = @blue-6 = @blue-base,禁止套娃,手动狗头)
    title: 'Hello Admin',
    // pwa: false,
    // iconfontUrl: '',
    storage: {
        namespace: 'PRO_'
    },
    // 动态改变浏览器标签文字
    dynamicBrowserTab: true,
    // 服务端获取菜单 缺点是每次刷新页面都要重新去后端获取菜单或者重新渲染一次,因为路由的component是个方法,ls没办法存储
    useAsyncRouter: false
}
