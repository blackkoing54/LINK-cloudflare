// src/data/index.ts
import { indonesiaOverview } from './indonesia';
import { azerbaijanOverview } from './azerbaijan';
import { georgiaOverview } from './georgia';
// 以后添加马来西亚： import { malaysiaOverview } from './malaysia';

// 统一导出所有国家数据，页面只认这个总库
export const allCountryData: Record<string, any> = {
  indonesia: indonesiaOverview,
  azerbaijan: azerbaijanOverview,
  georgia: georgiaOverview,
  // malaysia: malaysiaOverview,
};