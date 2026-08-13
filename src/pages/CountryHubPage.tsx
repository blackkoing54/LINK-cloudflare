import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import RouteMap from '../components/RouteMap';
import NotAvailable from '../components/NotAvailable';

// 导入数据
import { indonesiaOverview } from '../data/indonesia';
import { azerbaijanOverview } from '../data/azerbaijan';
import { georgiaOverview } from '../data/georgia';

const OPEN_COUNTRIES = ['indonesia', 'azerbaijan', 'georgia'];

const countryDataMap: Record<string, any> = {
  indonesia: indonesiaOverview,
  azerbaijan: azerbaijanOverview,
  georgia: georgiaOverview,
};

const CountryHubPage = () => {
  const { countrySlug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  const currentSlug = countrySlug || 'indonesia';

  if (!OPEN_COUNTRIES.includes(currentSlug)) {
    return <NotAvailable />;
  }

  const countryData = countryDataMap[currentSlug];

  return (
    <main className="relative min-h-screen overflow-hidden bg-black text-primary">
      {/* 背景图 */}
      <img
        src={countryData?.hero?.image || "https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=1800"}
        alt={countryData?.englishName || currentSlug}
        className="absolute inset-0 w-full h-full object-cover"
      />

      {/* 遮罩 */}
      <div className="absolute inset-0 bg-black/25" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/10 via-black/15 to-black/70" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-black/10 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

      {/* 返回按钮 */}
      <button
        onClick={() => navigate('/')}
        className="fixed top-8 left-8 z-30 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-primary" />
      </button>

      {/* 页面主体 */}
      <section className="relative z-10 min-h-screen px-8 md:px-16 py-28 flex flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="max-w-5xl"
        >
          <p className="text-primary/50 text-sm tracking-[0.35em] uppercase mb-6">
            Culture Journey
          </p>

          <p className="text-6xl md:text-8xl lg:text-9xl font-bold leading-none mb-8">
            {t(`countryHub-${currentSlug}.name`, (countryData?.name || '') as string) as string}
          </p>

          <p className="max-w-3xl text-primary/65 text-lg md:text-xl leading-loose">
            {t(`countryHub-${currentSlug}.intro`, (countryData?.intro || '') as string) as string}
          </p>
        </motion.div>

        <RouteMap countrySlug={currentSlug} />
      </section>
    </main>
  );
};

export default CountryHubPage;