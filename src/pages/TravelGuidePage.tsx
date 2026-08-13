// src/pages/TravelGuidePage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft, Globe2, MapPinned, CalendarDays, Plane, Train, Wallet,
  ShieldCheck, Languages, HeartHandshake, Backpack, Camera, Utensils,
  Landmark, Download, Bookmark,
} from 'lucide-react';
import { motion } from 'framer-motion';
import NotAvailable from '../components/NotAvailable';
import { allCountryData } from '../data';

// 图标映射器，保证无论加什么国家，都能复用这些基础组件图标
const ICON_MAP: Record<string, React.ElementType> = {
  destinationType: Globe2, languages: Languages, themes: MapPinned, travelStyle: Backpack,
  entryPreparation: Plane, bestSeason: CalendarDays, transportation: Train,
  budget: Wallet, safetyHealth: ShieldCheck, etiquette: HeartHandshake,
  photoSpots: Camera, foodMap: Utensils, culturalEtiquette: Landmark, downloadGuide: Download
};

const toolButtons = [
  { id: 'photoSpots' }, { id: 'foodMap' }, { id: 'culturalEtiquette' }, { id: 'downloadGuide' },
];
const overviewCards = [
  { id: 'destinationType' }, { id: 'languages' }, { id: 'themes' }, { id: 'travelStyle' },
];
const nationalGuides = [
  { id: 'entryPreparation' }, { id: 'bestSeason' }, { id: 'transportation' },
  { id: 'budget' }, { id: 'safetyHealth' }, { id: 'etiquette' },
];

const TravelGuidePage = () => {
  const { countrySlug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentSlug = countrySlug || 'indonesia';
  const data = allCountryData[currentSlug];

  if (!data || !data.travelGuide) return <NotAvailable />;

  return (
    <main className="min-h-screen bg-black text-primary overflow-hidden">
      <button
        type="button"
        onClick={() => navigate(`/country/${currentSlug}`)} // 👈 动态返回
        className="fixed top-8 left-8 z-50 w-12 h-12 rounded-full bg-black/45 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/[0.08] transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-primary" />
      </button>

      {/* Hero 区域 */}
      <section className="relative min-h-[78vh] flex items-end px-8 md:px-16 pb-20">
        <img
          src={data.travelGuide.heroImage} // 👈 动态图片
          alt={t(`${currentSlug}.travelGuide.heroImageAlt`)}
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black" />

        <motion.div
          initial={{ opacity: 0, y: 36 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative z-10 max-w-7xl w-full mx-auto"
        >
          <p className="text-primary/50 text-sm tracking-[0.35em] uppercase mb-6">
            {t(`${currentSlug}.travelGuide.heroEyebrow`, '旅行攻略')}
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-8">
            {t(`${currentSlug}.travelGuide.heroTitleLine1`, '行前准备')}<br />
            {t(`${currentSlug}.travelGuide.heroTitleLine2`, '与实用指南')}
          </h1>

          <div className="flex flex-wrap gap-4 mt-10">
            <button className="px-6 py-3 rounded-full bg-primary text-black text-sm font-medium hover:opacity-90 transition-opacity">
              {t('travelGuide.actions.startPlanning', '开始计划')}
            </button>
            <button className="px-6 py-3 rounded-full bg-white/[0.06] border border-white/10 text-primary/70 text-sm hover:bg-white/[0.1] transition-colors">
              {t('travelGuide.actions.saveGuide', '保存攻略')}
            </button>
          </div>
        </motion.div>
      </section>

      {/* 总览信息 */}
      <section className="px-8 md:px-16 py-20">
        <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-5">
          {overviewCards.map((card) => (
            <OverviewCard
              key={card.id}
              icon={ICON_MAP[card.id]}
              label={t(`${currentSlug}.travelGuide.overview.${card.id}.label`)}
              value={t(`${currentSlug}.travelGuide.overview.${card.id}.value`)}
            />
          ))}
        </div>
      </section>

      {/* 国家攻略 */}
      <section className="px-8 md:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <h2 className="text-3xl md:text-5xl font-bold">{t('travelGuide.nationalGuide.title', '国家级指南')}</h2>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nationalGuides.map((item, index) => {
              const Icon = ICON_MAP[item.id];
              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-7 hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary/80" strokeWidth={1.7} />
                  </div>
                  <h3 className="text-2xl font-bold mb-4">{t(`${currentSlug}.travelGuide.nationalGuide.items.${item.id}.title`)}</h3>
                  <p className="text-primary/50 leading-relaxed">{t(`${currentSlug}.travelGuide.nationalGuide.items.${item.id}.text`)}</p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 城市攻略 */}
      <section className="px-8 md:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl md:text-5xl font-bold mb-10">{t('travelGuide.cityGuide.title', '城市重点攻略')}</h2>
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {data.travelGuide.cityGuides.map((city: any, index: number) => {
              const cityName = t(`${currentSlug}.travelGuide.cityGuide.items.${city.id}.city`);
              const tags = t(`${currentSlug}.travelGuide.cityGuide.items.${city.id}.tags`, { returnObjects: true, defaultValue: [] }) as string[];

              return (
                <motion.article
                  key={city.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="group overflow-hidden rounded-[2rem] border border-white/10 bg-white/[0.04] hover:bg-white/[0.07] transition-all duration-300"
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={city.image} // 👈 动态图片
                      alt={cityName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />
                    <h3 className="absolute left-7 bottom-6 text-3xl font-bold">{cityName}</h3>
                  </div>
                  <div className="p-7">
                    <div className="flex flex-wrap gap-2 mb-5">
                      {tags.map((tag) => (
                        <span key={tag} className="px-3 py-1 rounded-full bg-white/[0.06] text-primary/50 text-xs">{tag}</span>
                      ))}
                    </div>
                    <p className="text-primary/50 leading-relaxed mb-7">{t(`${currentSlug}.travelGuide.cityGuide.items.${city.id}.text`)}</p>
                  </div>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 路线建议 + 打包清单 */}
      <section className="px-8 md:px-16 pb-24">
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[1.1fr_0.9fr] gap-8">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">{t('travelGuide.routeIdeas.title', '路线建议')}</h2>
            <div className="space-y-5">
              {data.travelGuide.routeIdeas.map((route: any) => (
                <article key={route.id} className="rounded-3xl bg-white/[0.04] border border-white/10 p-6">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                    <h3 className="text-2xl font-bold">{t(`${currentSlug}.travelGuide.routeIdeas.items.${route.id}.title`)}</h3>
                    <span className="text-primary/45 text-sm">{t(`${currentSlug}.travelGuide.routeIdeas.items.${route.id}.duration`)}</span>
                  </div>
                  <p className="text-primary/50 leading-relaxed">{t(`${currentSlug}.travelGuide.routeIdeas.items.${route.id}.text`)}</p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-10">
            <h2 className="text-3xl md:text-5xl font-bold mb-8">{t('travelGuide.packingList.title', '打包清单')}</h2>
            <div className="grid grid-cols-1 gap-4">
              {data.travelGuide.packingList.map((item: string) => (
                <div key={item} className="flex items-center gap-4 rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4">
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Bookmark className="w-4 h-4 text-primary/70" />
                  </div>
                  <span className="text-primary/60">{t(`${currentSlug}.travelGuide.packingList.items.${item}`)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 主题入口 */}
      <section className="px-8 md:px-16 pb-28">
        <div className="max-w-7xl mx-auto">
          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-12">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-10">
              <div>
                <h2 className="text-3xl md:text-5xl font-bold mb-6">{t('travelGuide.toolkit.title', '工具箱')}</h2>
              </div>
              <div className="grid grid-cols-2 gap-4 min-w-full lg:min-w-[360px]">
                {toolButtons.map((tool) => (
                  <ToolButton
                    key={tool.id}
                    icon={ICON_MAP[tool.id]}
                    text={t(`travelGuide.toolkit.tools.${tool.id}`)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

// ... 原本底部的 OverviewCard 和 ToolButton 组件保持不变 ...
interface OverviewCardProps { icon: React.ElementType; label: string; value: string; }
const OverviewCard = ({ icon: Icon, label, value }: OverviewCardProps) => (
  <article className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
    <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5">
      <Icon className="w-5 h-5 text-primary/75" strokeWidth={1.7} />
    </div>
    <p className="text-primary/40 text-sm mb-2">{label}</p>
    <h3 className="text-xl font-semibold text-primary/85">{value}</h3>
  </article>
);

interface ToolButtonProps { icon: React.ElementType; text: string; }
const ToolButton = ({ icon: Icon, text }: ToolButtonProps) => (
  <button type="button" className="rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors p-5 text-left">
    <Icon className="w-6 h-6 text-primary/75 mb-4" strokeWidth={1.7} />
    <span className="text-primary/65 text-sm">{text}</span>
  </button>
);

export default TravelGuidePage;