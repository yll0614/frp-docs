import { defineConfig } from 'vitepress';

// refer https://vitepress.vuejs.org/config/introduction for details
export default defineConfig({
  base: '/',
  lang: 'cn-ZH',
  title: 'LL Frp',
  description: '免费的 Frp 服务器',
 

  themeConfig: {
    logo: './icon.svg',
    nav: [
      { text: '介绍', link: './welcome' },
      { text: '下载', link: './download' },
      { text: '配置', link: './setting' },
      { text: '运行', link: './run' },

      // {
      //   text: 'Dropdown Menu',
      //   items: [
      //     { text: 'Item A', link: '/item-1' },
      //     { text: 'Item B', link: '/item-2' },
      //     { text: 'Item C', link: '/item-3' },
      //   ],
      // },

      // ...
    ],

    sidebar: [
      {
        // text: 'Guide',
        items: [
          { text: '介绍', link: './welcome' },
          { text: '下载', link: './download' },
          { text: '配置', link: './setting' },
          { text: '运行', link: './run' },
          // ...
        ],
      },
    ],
  },
});
