export type ArticleBlock =
  | {
      type: 'paragraph';
      content: string;
    }
  | {
      type: 'image';
      src: string;
      caption?: string;
    };

export const activityArticles: Record<number, ArticleBlock[]> = {
  1: [
    {
      type: 'paragraph',
      content:
        '这次校内文化交流活动围绕德国与摩洛哥两个国家展开，同学们在轻松的氛围中了解不同文化的历史、语言与生活方式。',
    },
    {
      type: 'image',
      src: '/pictures/activity1-1.jpg',
      caption: '活动现场',
    },
    {
      type: 'paragraph',
      content:
        '通过德语学习、摩洛哥海娜体验、薄荷茶小游戏和音乐互动，大家在轻松氛围中完成了一次跨文化交流。',
    },
  ],

  2: [
    {
      type: 'paragraph',
      content:
        '这次室内英语角以电影分享为主题，大家围坐在一起，用英语介绍自己喜欢的电影与角色。',
    },
    {
      type: 'image',
      src: '/pictures/activity2-1.jpg',
      caption: '电影分享环节',
    },
  ],

  3: [
    {
      type: 'paragraph',
      content:
        '户外团体游戏活动在南京钟山体育公园举行，大家通过轻松运动和互动游戏认识彼此。',
    },
    {
      type: 'image',
      src: '/pictures/activity3-1.jpg',
      caption: '户外活动现场',
    },
  ],
};