module.exports = {

//针对不同项目，需要修改的参数有：base,title,description,repo以及nav,sidebar 文件夹下的导航js文件

base: '/learn/',
dest: 'public',

head: [
  ['link', { rel: 'icon', href: '/favcon.ico' }]
],

//vuepress多语言，区别于主题多语言
locales: {
    '/': {
      lang: 'zh-CN',
      title: '学习笔记',
      description: '学习笔记 Learn Forever'
    }
},

themeConfig: {
	 
	//Basic configuration
	displayAllHeaders: false, // 默认值：false
  activeHeaderLinks: true, // 默认值：true
  displayAllHeaders: false, // 默认值：false
  sidebar: 'auto', // 默认值：false

  //Markdown configuration
  includeLevel: [1, 2], //默认值：[2, 3]

  //Github 
  repo: 'belm/learn',
  editLinks: true,
  docsDir: 'docs',
  docsBranch: 'master',

  //主题多语言
  locales: {  
  '/': {
    label: '中文',
    selectText: '语言',
    editLinkText: '在Github上编辑',
    lastUpdated: 'Last Updated',
    serviceWorker: {
      updatePopup: {
        message: "此文档有可用的更新",
        buttonText: "刷新"
      }
    },
  
    //页眉
    nav: require('./nav/zh'),
    //侧边栏导航
    sidebar: require('./sidebar/zh'),
  
  },
  
},   
}
}