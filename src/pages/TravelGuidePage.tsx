import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  ArrowLeft,
  Globe2,
  MapPinned,
  CalendarDays,
  Plane,
  Train,
  Wallet,
  ShieldCheck,
  Languages,
  HeartHandshake,
  Backpack,
  Camera,
  Utensils,
  Landmark,
  Download,
  Bookmark,
} from 'lucide-react';
import { motion } from 'framer-motion';

const overviewCards = [
  {
    id: 'destinationType',
    icon: Globe2,
  },
  {
    id: 'languages',
    icon: Languages,
  },
  {
    id: 'themes',
    icon: MapPinned,
  },
  {
    id: 'travelStyle',
    icon: Backpack,
  },
];

const nationalGuides = [
  {
    id: 'entryPreparation',
    icon: Plane,
  },
  {
    id: 'bestSeason',
    icon: CalendarDays,
  },
  {
    id: 'transportation',
    icon: Train,
  },
  {
    id: 'budget',
    icon: Wallet,
  },
  {
    id: 'safetyHealth',
    icon: ShieldCheck,
  },
  {
    id: 'etiquette',
    icon: HeartHandshake,
  },
];

const cityGuides = [
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
];

const packingList = [
  'passportCopies',
  'adapterPowerBank',
  'lightClothes',
  'sunProtection',
  'mosquitoRepellent',
  'medicine',
  'rainGear',
  'templeClothes',
];

const routeIdeas = [
  {
    id: 'islandRelax',
  },
  {
    id: 'cultureObservation',
  },
  {
    id: 'islandHopping',
  },
];

const toolButtons = [
  {
    id: 'photoSpots',
    icon: Camera,
  },
  {
    id: 'foodMap',
    icon: Utensils,
  },
  {
    id: 'culturalEtiquette',
    icon: Landmark,
  },
  {
    id: 'downloadGuide',
    icon: Download,
  },
];

const TravelGuidePage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-black text-primary overflow-hidden">
      {/* 返回按钮 */}
      <button
        type="button"
        onClick={() => navigate('/country/indonesia')}
        className="
          fixed top-8 left-8 z-50
          w-12 h-12 rounded-full
          bg-black/45 backdrop-blur-xl
          border border-white/10
          flex items-center justify-center
          hover:bg-white/[0.08]
          transition-colors
        "
        aria-label={t('common.back', '返回')}
      >
        <ArrowLeft className="w-5 h-5 text-primary" />
      </button>

      {/* Hero 区域 */}
      <section className="relative min-h-[78vh] flex items-end px-8 md:px-16 pb-20">
        <img
          src="https://images.unsplash.com/photo-1518548419970-58e3b4079ab2?w=1800"
          alt={t('travelGuide.heroImageAlt')}
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
            {t('travelGuide.heroEyebrow')}
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-8">
            {t('travelGuide.heroTitleLine1')}
            <br />
            {t('travelGuide.heroTitleLine2')}
          </h1>

          <p className="max-w-3xl text-primary/60 text-lg md:text-xl leading-loose">
            {t('travelGuide.heroSubtitle')}
          </p>

          <div className="flex flex-wrap gap-4 mt-10">
            <button
              type="button"
              className="px-6 py-3 rounded-full bg-primary text-black text-sm font-medium hover:opacity-90 transition-opacity"
            >
              {t('travelGuide.actions.startPlanning')}
            </button>

            <button
              type="button"
              className="px-6 py-3 rounded-full bg-white/[0.06] border border-white/10 text-primary/70 text-sm hover:bg-white/[0.1] transition-colors"
            >
              {t('travelGuide.actions.saveGuide')}
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
              icon={card.icon}
              label={t(`travelGuide.overview.${card.id}.label`)}
              value={t(`travelGuide.overview.${card.id}.value`)}
            />
          ))}
        </div>
      </section>

      {/* 国家攻略 */}
      <section className="px-8 md:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6 mb-10">
            <div>
              <p className="text-primary/40 text-sm tracking-[0.25em] uppercase mb-4">
                {t('travelGuide.nationalGuide.eyebrow')}
              </p>

              <h2 className="text-3xl md:text-5xl font-bold">
                {t('travelGuide.nationalGuide.title')}
              </h2>
            </div>

            <p className="max-w-2xl text-primary/50 leading-loose">
              {t('travelGuide.nationalGuide.description')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {nationalGuides.map((item, index) => {
              const Icon = item.icon;

              return (
                <motion.article
                  key={item.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.06 }}
                  className="
                    rounded-[2rem]
                    border border-white/10
                    bg-white/[0.04]
                    backdrop-blur-xl
                    p-7
                    hover:bg-white/[0.07]
                    hover:border-primary/30
                    transition-all duration-300
                  "
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-6">
                    <Icon className="w-6 h-6 text-primary/80" strokeWidth={1.7} />
                  </div>

                  <h3 className="text-2xl font-bold mb-4">
                    {t(`travelGuide.nationalGuide.items.${item.id}.title`)}
                  </h3>

                  <p className="text-primary/50 leading-relaxed">
                    {t(`travelGuide.nationalGuide.items.${item.id}.text`)}
                  </p>
                </motion.article>
              );
            })}
          </div>
        </div>
      </section>

      {/* 城市攻略 */}
      <section className="px-8 md:px-16 pb-24">
        <div className="max-w-7xl mx-auto">
          <div className="mb-10">
            <p className="text-primary/40 text-sm tracking-[0.25em] uppercase mb-4">
              {t('travelGuide.cityGuide.eyebrow')}
            </p>

            <h2 className="text-3xl md:text-5xl font-bold">
              {t('travelGuide.cityGuide.title')}
            </h2>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-7">
            {cityGuides.map((city, index) => {
              const cityName = t(`travelGuide.cityGuide.items.${city.id}.city`);
              const tags = t(`travelGuide.cityGuide.items.${city.id}.tags`, {
                returnObjects: true,
                defaultValue: [],
              }) as string[];

              return (
                <motion.article
                  key={city.id}
                  initial={{ opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.45, delay: index * 0.08 }}
                  className="
                    group overflow-hidden rounded-[2rem]
                    border border-white/10
                    bg-white/[0.04]
                    hover:bg-white/[0.07]
                    transition-all duration-300
                  "
                >
                  <div className="relative h-72 overflow-hidden">
                    <img
                      src={city.image}
                      alt={cityName}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-black/10 to-transparent" />

                    <h3 className="absolute left-7 bottom-6 text-3xl font-bold">
                      {cityName}
                    </h3>
                  </div>

                  <div className="p-7">
                    <div className="flex flex-wrap gap-2 mb-5">
                      {tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 rounded-full bg-white/[0.06] text-primary/50 text-xs"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>

                    <p className="text-primary/50 leading-relaxed mb-7">
                      {t(`travelGuide.cityGuide.items.${city.id}.text`)}
                    </p>

                    <button
                      type="button"
                      className="text-primary/70 text-sm hover:text-primary transition-colors"
                    >
                      {t('travelGuide.cityGuide.viewCityGuide')}
                    </button>
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
            <p className="text-primary/40 text-sm tracking-[0.25em] uppercase mb-4">
              {t('travelGuide.routeIdeas.eyebrow')}
            </p>

            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              {t('travelGuide.routeIdeas.title')}
            </h2>

            <div className="space-y-5">
              {routeIdeas.map((route) => (
                <article
                  key={route.id}
                  className="rounded-3xl bg-white/[0.04] border border-white/10 p-6"
                >
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 mb-3">
                    <h3 className="text-2xl font-bold">
                      {t(`travelGuide.routeIdeas.items.${route.id}.title`)}
                    </h3>

                    <span className="text-primary/45 text-sm">
                      {t(`travelGuide.routeIdeas.items.${route.id}.duration`)}
                    </span>
                  </div>

                  <p className="text-primary/50 leading-relaxed">
                    {t(`travelGuide.routeIdeas.items.${route.id}.text`)}
                  </p>
                </article>
              ))}
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-10">
            <p className="text-primary/40 text-sm tracking-[0.25em] uppercase mb-4">
              {t('travelGuide.packingList.eyebrow')}
            </p>

            <h2 className="text-3xl md:text-5xl font-bold mb-8">
              {t('travelGuide.packingList.title')}
            </h2>

            <div className="grid grid-cols-1 gap-4">
              {packingList.map((item) => (
                <div
                  key={item}
                  className="flex items-center gap-4 rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4"
                >
                  <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                    <Bookmark className="w-4 h-4 text-primary/70" />
                  </div>

                  <span className="text-primary/60">
                    {t(`travelGuide.packingList.items.${item}`)}
                  </span>
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
                <p className="text-primary/40 text-sm tracking-[0.25em] uppercase mb-4">
                  {t('travelGuide.toolkit.eyebrow')}
                </p>

                <h2 className="text-3xl md:text-5xl font-bold mb-6">
                  {t('travelGuide.toolkit.title')}
                </h2>

                <p className="max-w-3xl text-primary/50 leading-loose">
                  {t('travelGuide.toolkit.description')}
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4 min-w-full lg:min-w-[360px]">
                {toolButtons.map((tool) => (
                  <ToolButton
                    key={tool.id}
                    icon={tool.icon}
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

interface OverviewCardProps {
  icon: React.ElementType;
  label: string;
  value: string;
}

const OverviewCard = ({ icon: Icon, label, value }: OverviewCardProps) => {
  return (
    <article className="rounded-[1.7rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-6">
      <div className="w-12 h-12 rounded-2xl bg-white/[0.06] border border-white/10 flex items-center justify-center mb-5">
        <Icon className="w-5 h-5 text-primary/75" strokeWidth={1.7} />
      </div>

      <p className="text-primary/40 text-sm mb-2">
        {label}
      </p>

      <h3 className="text-xl font-semibold text-primary/85">
        {value}
      </h3>
    </article>
  );
};

interface ToolButtonProps {
  icon: React.ElementType;
  text: string;
}

const ToolButton = ({ icon: Icon, text }: ToolButtonProps) => {
  return (
    <button
      type="button"
      className="rounded-2xl border border-white/10 bg-white/[0.04] hover:bg-white/[0.08] transition-colors p-5 text-left"
    >
      <Icon className="w-6 h-6 text-primary/75 mb-4" strokeWidth={1.7} />

      <span className="text-primary/65 text-sm">
        {text}
      </span>
    </button>
  );
};

export default TravelGuidePage;