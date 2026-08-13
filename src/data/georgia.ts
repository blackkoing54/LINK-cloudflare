

export const georgiaOverview = {
  name: '格鲁吉亚',
  englishName: 'Georgia',

  hero: {
    image: 'https://images.unsplash.com/photo-1565019013583-058b29df99da?w=1800',
    eyebrow: 'Country Overview',
    title: '国家印象',
    subtitle: '在欧亚大陆的十字路口，雪山、修道院与流传千年的红酒，共同酿造了这片高加索秘境。',
  },

  location: {
    short: '高加索地区',
    detail: '位于高加索中西部，北接俄罗斯，南邻土耳其和亚美尼亚，西濒黑海。',
    coordinates: [44.8271, 41.7151], // 第比利斯经纬度
    zoom: 6.5,
  },

  visa: {
    short: '免签',
    badge: '中国护照',
    points: [
      { label: '适用', value: '旅游、商务、探亲' },
      { label: '停留', value: '单次最多停留 30 天' },
      { label: '费用', value: '免费' },
      { label: '口岸', value: '第比利斯国际机场、巴统国际机场等' },
      { label: '护照', value: '有效期需在 6 个月以上' },
      { label: '建议', value: '准备好返程机票和酒店预订单以备海关查验' },
    ],
    note: '自2023年9月起，格鲁吉亚对中国公民实行单方面免签政策，具体以官方最新政策为准。',
  },

  language: {
    short: '格鲁吉亚语 / ქართული ენა',
    speechLang: 'ka-GE',
    phrases: [
      { zh: '你好', local: 'Gamarjoba (გამარჯობა)' },
      { zh: '谢谢', local: 'Madloba (მადლობა)' },
      { zh: '再见', local: 'Nakhvamdis (ნახვამდის)' },
      { zh: '是的', local: 'Ki (კი)' },
      { zh: '不是', local: 'Ara (არა)' },
      { zh: '请问多少钱？', local: 'Ra girs? (რა ღირს?)' },
      { zh: '很好吃', local: 'Gemo aris (გემრიელია)' },
    ],
  },

  intro: '格鲁吉亚是一个被群山环抱的国家。从第比利斯老城蜿蜒的鹅卵石街道，到卡兹别克山巅孤傲的圣三一教堂，这里充满了原始而纯粹的美。作为世界葡萄酒的发源地之一，当地人的热情与随处可见的葡萄藤一样根深蒂固。',

  video: {
    cover: 'https://images.unsplash.com/photo-1565019013583-058b29df99da?w=1600',
    src: '', 
    duration: '约 3 分钟',
  },

  gallery: [
    {
      key: 'culture',
      label: '人文',
      images: [
        'https://images.unsplash.com/photo-1596395804351-1e96e7fc239c?w=1200',
        'https://images.unsplash.com/photo-1582236316886-4fb980757755?w=1200',
      ],
    },
    {
      key: 'landscape',
      label: '地理',
      images: [
        'https://images.unsplash.com/photo-1565019013583-058b29df99da?w=1200',
        'https://images.unsplash.com/photo-1579808670868-245ed786eec0?w=1200',
      ],
    },
  ],
};