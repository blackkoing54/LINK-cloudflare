// ============================================
// 🌏 印度尼西亚国家专题总数据
// ============================================

export const indonesiaOverview = {
  // ----------------------------------------
  // 1. 基础概览数据 (Overview Page)
  // ----------------------------------------
  name: '印度尼西亚',
  englishName: 'Indonesia',

  hero: {
    image: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1800',
    eyebrow: 'Country Overview',
    title: '国家印象',
    subtitle: '在火山、海岛、庙宇与市井烟火之间，阅读一个由千岛组成的文化世界。',
  },

  location: {
    short: '东南亚 · 赤道群岛国家',
    detail: '位于东南亚与大洋洲之间，由 17000 多个岛屿组成，横跨赤道，西邻印度洋，东接太平洋。',
    coordinates: [118.0, -2.5],
    zoom: 3.8,
  },

  visa: {
    short: '落地签 / 电子落地签（B1）',
    badge: '中国护照',
    points: [
      { label: '适用', value: '旅游、探亲、短期访问' },
      { label: '停留', value: '单次最多 30 天，可延期一次 30 天' },
      { label: '费用', value: '约 500,000 印尼盾（以口岸公布为准）' },
      { label: '口岸', value: '雅加达、巴厘岛等主要国际口岸' },
      { label: '护照', value: '有效期不少于 6 个月，至少一页空白页' },
      { label: '建议', value: '提前办理电子落地签（e-VOA）可节省入境排队时间' },
    ],
    note: '签证政策可能随时调整，出行前请以印度尼西亚驻华使领馆或官方移民局最新公告为准。',
  },

  language: {
    short: '印度尼西亚语 / Bahasa Indonesia',
    speechLang: 'id-ID',
    phrases: [
      { zh: '你好', local: 'Halo' },
      { zh: '早上好', local: 'Selamat pagi' },
      { zh: '谢谢', local: 'Terima kasih' },
      { zh: '不客气', local: 'Sama-sama' },
      { zh: '再见', local: 'Sampai jumpa' },
      { zh: '请问多少钱？', local: 'Berapa harganya?' },
      { zh: '太贵了', local: 'Terlalu mahal' },
      { zh: '我听不懂', local: 'Saya tidak mengerti' },
      { zh: '厕所在哪里？', local: 'Di mana toilet?' },
      { zh: '很好吃', local: 'Enak sekali' },
    ],
  },

  intro: '印度尼西亚不是一块单一的陆地，而是一片由海洋连接的群岛。从城市港口到火山村落，从清真寺到印度教庙宇，它的文化在迁徙、贸易、殖民历史和现代城市化中不断生成。不同岛屿拥有差异明显的语言、宗教和生活方式，使这个国家呈现出强烈的文化层次感。',

  video: {
    cover: 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1600',
    src: '/videos/indonesia-intro.mp4',
    duration: '约 4 分 30 秒',
  },

  gallery: [
    {
      key: 'culture',
      label: '人文',
      images: [
        'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1200',
        'https://images.unsplash.com/photo-1604999333679-b86d54738315?w=1200',
        'https://images.unsplash.com/photo-1596402184320-417e7178b2cd?w=1200',
      ],
    },
    {
      key: 'landscape',
      label: '地理',
      images: [
        'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1200',
        'https://images.unsplash.com/photo-1552733407-5d5c46c3bb3b?w=1200',
        'https://images.unsplash.com/photo-1570789210967-2cac24afeb00?w=1200',
      ],
    },
    {
      key: 'food',
      label: '美食',
      images: [
        'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1200',
        'https://images.unsplash.com/photo-1562967914-608f82629710?w=1200',
        'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1200',
      ],
    },
    {
      key: 'festival',
      label: '节日',
      images: [
        'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1200',
        'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=1200',
        'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=1200',
      ],
    },
  ],

  // ----------------------------------------
  // 2. 城市页面数据 (Cities Page)
  // ----------------------------------------
  cities: [
    {
      id: 'bali',
      slug: 'bali',
      image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900',
    },
    {
      id: 'jakarta',
      slug: 'jakarta',
      image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=900',
    },
    {
      id: 'yogyakarta',
      slug: 'yogyakarta',
      image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=900',
    },
  ],

  // ----------------------------------------
  // 3. 思想碰撞页面数据 (Thoughts Page)
  // ----------------------------------------
  thoughts: {
    featured: {
      tag: '深度探讨',
      title: '千岛之国的文化边界在哪里？',
      text: '在一个由17000多个岛屿组成的国家里，是什么将几百个不同的民族维系在一起？是语言、信仰，还是共同的海洋记忆？',
    },
    topics: [
      { id: 'cultural-boundary' },
      { id: 'travel-gaze' },
      { id: 'urban-life' },
      { id: 'media-impact' },
    ],
  },

  // ----------------------------------------
  // 4. 旅行攻略页面数据 (Travel Guide Page)
  // ----------------------------------------
  travelGuide: {
    heroImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1800',
    cityGuides: [
      {
        id: 'bali',
        image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=900',
      },
      {
        id: 'jakarta',
        image: 'https://images.unsplash.com/photo-1555899434-94d1368aa7af?w=900',
      },
      {
        id: 'yogyakarta',
        image: 'https://images.unsplash.com/photo-1584810359583-96fc3448beaa?w=900',
      },
    ],
    packingList: [
      'passportCopies',
      'adapterPowerBank',
      'lightClothes',
      'sunProtection',
      'mosquitoRepellent',
      'medicine',
      'rainGear',
      'templeClothes',
    ],
    routeIdeas: [
      { id: 'islandRelax' },
      { id: 'cultureObservation' },
      { id: 'islandHopping' },
    ],
  },
};