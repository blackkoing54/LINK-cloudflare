export const azerbaijanOverview = {
  name: '阿塞拜疆',
  englishName: 'Azerbaijan',
  hero: {
    image: 'https://images.unsplash.com/photo-1627318712361-9c6bc76db7db?w=1800',
    eyebrow: 'Country Overview',
    title: '国家印象',
    // 默认占位文案，你后续可以自由修改
    subtitle: '在这个被称为“火之国度”的交汇之地，找一个晴天漫步在巴库老城区，用快门捕捉岁月留下的斑驳光影。',
  },
  location: {
    short: '高加索地区',
    detail: '位于外高加索东部，东濒里海，连接东欧与西亚的十字路口。',
    coordinates: [49.8822, 40.4093], // 巴库经纬度
    zoom: 5.5,
  },
  visa: {
    short: '电子签证 (ASAN Visa) 或落地签',
    badge: '中国护照',
    points: [
      { label: '适用', value: '旅游、短期访问' },
      { label: '停留', value: '单次最多 30 天' },
      { label: '费用', value: '标准电子签约 26 美元' },
      { label: '口岸', value: '巴库盖达尔·阿利耶夫国际机场等' },
      { label: '护照', value: '有效期不少于 6 个月' },
      { label: '建议', value: '提前 3 个工作日申请电子签最为稳妥' },
    ],
    note: '签证政策以阿塞拜疆官方最新公告为准。',
  },
  language: {
    short: '阿塞拜疆语',
    speechLang: 'az-AZ',
    phrases: [
      { zh: '你好', local: 'Salam' },
      { zh: '谢谢', local: 'Çox sağ ol' },
      // ...你可以继续补充
    ],
  },
  intro: '阿塞拜疆是一片古老与现代激烈碰撞的土地。火焰塔的霓虹闪烁着石油财富的光芒，而在它脚下的巴库老城，则保留着丝绸之路的石板路、宣礼塔与古老商队驿站的宁静。',
  video: {
    cover: 'https://images.unsplash.com/photo-1627318712361-9c6bc76db7db?w=1600',
    duration: '约 3 分钟',
  },
  gallery: [
    {
      key: 'culture',
      label: '人文',
      images: [
        'https://images.unsplash.com/photo-1627318712361-9c6bc76db7db?w=1200',
      ],
    },
  ],
  cities: [
    { id: 'baku', slug: 'baku', image: 'https://images.unsplash.com/photo-1627318712361-9c6bc76db7db?w=900' },
    { id: 'sheki', slug: 'sheki', image: 'https://images.unsplash.com/photo-1596395804351-1e96e7fc239c?w=900' },
  ],

  // 👇 新增：思想碰撞页面数据
  thoughts: {
    featured: { tag: '深度思考', title: '石油财富与古老信仰的交织', text: '...' },
    topics: [
      { id: 'cultural-boundary' },
      { id: 'urban-life' },
    ]
  },

  // 👇 新增：旅行攻略页面数据
  travelGuide: {
    heroImage: 'https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1800',
    cityGuides: [
      { id: 'baku', image: 'https://images.unsplash.com/photo-1627318712361-9c6bc76db7db?w=900' }
    ],
    packingList: ['passportCopies', 'adapterPowerBank', 'sunProtection'],
    routeIdeas: [{ id: 'classic' }, { id: 'depth' }],
  },

};