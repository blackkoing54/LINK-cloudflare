import { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, X, ChevronLeft, ChevronRight } from 'lucide-react';

// ============================================
// 🌍 主要国家结构数据
// ============================================

type MainCountry = {
  id: string;
  slug: string;
  image: string;
};

type OtherCountry = {
  id: string;
  image: string;
};

const mainCountries: MainCountry[] = [
  {
    id: 'morocco',
    slug: 'morocco',
    image: 'https://images.unsplash.com/photo-1489749798305-4fea3ae63d43?w=800',
  },
  {
    id: 'azerbaijan', // 👈 替换了埃及
    slug: 'azerbaijan',
    image: 'https://images.unsplash.com/photo-1627318712361-9c6bc76db7db?w=800', // 暂时的阿塞拜疆占位图
  },
  {
    id: 'indonesia',
    slug: 'indonesia',
    image: 'https://images.unsplash.com/photo-1537996194471-e657df975ab4?w=800',
  },
  {
    id: 'germany',
    slug: 'germany',
    image: 'https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800',
  },
  {
    id: 'georgia', // 👈 替换了也门
    slug: 'georgia',
    image: 'https://images.unsplash.com/photo-1565019013583-058b29df99da?w=800', // 暂时的格鲁吉亚占位图
  },
];

// ============================================
// 🌐 其它国家结构数据
// ============================================

const otherCountries: OtherCountry[] = [
  {
    id: 'greece',
    image: 'https://images.unsplash.com/photo-1533105079780-92b9be482077?w=800',
  },
  {
    id: 'italy',
    image: 'https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=800',
  },
  {
    id: 'spain',
    image: 'https://images.unsplash.com/photo-1509845350793-96d9dcfa3673?w=800',
  },
  {
    id: 'turkey',
    image: 'https://images.unsplash.com/photo-1541432901042-2d8bd64b4a9b?w=800',
  },
  {
    id: 'japan',
    image: 'https://images.unsplash.com/photo-1493976040374-85c8e12f0c0e?w=800',
  },
  {
    id: 'thailand',
    image: 'https://images.unsplash.com/photo-1528181304800-259b08848526?w=800',
  },
];

export const CountriesSection = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();

  const [showOthers, setShowOthers] = useState(false);
  const [otherPage, setOtherPage] = useState(0);

  const perPage = 3;
  const totalPages = Math.ceil(otherCountries.length / perPage);

  const currentOthers = otherCountries.slice(
    otherPage * perPage,
    otherPage * perPage + perPage,
  );

  // 这里增加了回退文本，防止你还没配好多语言JSON时页面显示成尴尬的英文 key
  const getCountryName = (id: string) => {
    const fallbackName = id === 'azerbaijan' ? '阿塞拜疆' : id === 'georgia' ? '格鲁吉亚' : id;
    return t(`countries.items.${id}.name`, fallbackName);
  };

  const getCountryDescription = (id: string) => {
    const fallbackDesc = id === 'azerbaijan' ? '火之国度的光影交错' : id === 'georgia' ? '高加索秘境的雪山与红酒' : '';
    return t(`countries.items.${id}.description`, fallbackDesc);
  };

  const handleMainCountryClick = (country: MainCountry) => {
    // 👈 关键修改：不再写死判断 indonesia，而是让所有卡片都能被点击，由路由统一拦截
    navigate(`/country/${country.slug}`);
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* 背景图 */}
      <img
        src="/hero2.jpg"
        alt=""
        className="absolute inset-0 w-full h-full object-cover z-0"
      />

      <div className="absolute inset-0 bg-black/50 z-10" />

      <div className="relative z-30 max-w-7xl mx-auto px-8 md:px-16">
        {/* 标题 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <span className="text-primary/60 text-sm tracking-widest uppercase">
            {t('countries.sectionEyebrow')}
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary mb-16 leading-tight"
        >
          {t('countries.titleLine1')}
          <br />
          {t('countries.titleLine2')}
        </motion.h2>

        {/* ========== 卡片网格：主要国家 + 其它 ========== */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {mainCountries.map((country, index) => {
            const name = getCountryName(country.id);
            const description = getCountryDescription(country.id);

            return (
              <motion.div
                key={country.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onClick={() => handleMainCountryClick(country)}
                className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer"
                role="button"
                tabIndex={0}
                aria-label={name}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    handleMainCountryClick(country);
                  }
                }}
              >
                <img
                  src={country.image}
                  alt={name}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <h3 className="text-primary text-2xl md:text-3xl font-semibold mb-2">
                    {name}
                  </h3>

                  <p className="text-primary/60 text-sm leading-relaxed opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    {description}
                  </p>
                </div>

                <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-black/30 backdrop-blur-md border border-white/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight className="w-4 h-4 text-primary" />
                </div>
              </motion.div>
            );
          })}

          {/* 其它国家卡片 */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            onClick={() => {
              setShowOthers(true);
              setOtherPage(0);
            }}
            className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer bg-white/[0.03] border border-white/[0.08] hover:bg-white/[0.06] transition-colors flex flex-col items-center justify-center"
            role="button"
            tabIndex={0}
            aria-label={t('countries.otherCard.title')}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                setShowOthers(true);
                setOtherPage(0);
              }
            }}
          >
            <div className="w-20 h-20 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <span className="text-primary text-3xl font-light">+</span>
            </div>

            <h3 className="text-primary text-2xl md:text-3xl font-semibold mb-2">
              {t('countries.otherCard.title')}
            </h3>

            <p className="text-primary/40 text-sm">
              {t('countries.otherCard.subtitle')}
            </p>
          </motion.div>
        </div>
      </div>

      {/* ========== 其它国家弹窗 ========== */}
      <AnimatePresence>
        {showOthers && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
            onClick={() => setShowOthers(false)}
          >
            <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />

            <motion.div
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 40, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              onClick={(e) => e.stopPropagation()}
              className="relative z-10 w-full max-w-5xl max-h-[85vh] overflow-y-auto rounded-3xl bg-[#0a0a0a] border border-white/[0.08] p-8 md:p-12"
            >
              {/* 关闭按钮 */}
              <button
                type="button"
                onClick={() => setShowOthers(false)}
                aria-label={t('common.close', '关闭')}
                className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors"
              >
                <X className="w-4 h-4 text-primary" />
              </button>

              <h3 className="text-primary text-3xl md:text-4xl font-bold mb-2">
                {t('countries.modalTitle')}
              </h3>

              <p className="text-primary/40 text-sm mb-10">
                {t('countries.pagination', {
                  current: otherPage + 1,
                  total: totalPages,
                })}
              </p>

              {/* 其它国家卡片 */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <AnimatePresence mode="wait">
                  {currentOthers.map((country) => {
                    const name = getCountryName(country.id);
                    const description = getCountryDescription(country.id);

                    return (
                      <motion.div
                        key={country.id}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -20 }}
                        transition={{ duration: 0.3 }}
                        className="group relative aspect-[4/5] overflow-hidden rounded-2xl cursor-pointer"
                      >
                        <img
                          src={country.image}
                          alt={name}
                          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        />

                        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                        <div className="absolute bottom-0 left-0 right-0 p-6">
                          <h4 className="text-primary text-xl font-semibold mb-1">
                            {name}
                          </h4>

                          <p className="text-primary/60 text-sm">
                            {description}
                          </p>
                        </div>
                      </motion.div>
                    );
                  })}
                </AnimatePresence>
              </div>

              {/* 翻页按钮 */}
              {totalPages > 1 && (
                <div className="flex items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => setOtherPage((p) => Math.max(0, p - 1))}
                    disabled={otherPage === 0}
                    aria-label={t('common.prev', '上一页')}
                    className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronLeft className="w-5 h-5 text-primary" />
                  </button>

                  {Array.from({ length: totalPages }).map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setOtherPage(i)}
                      aria-label={t('countries.goToPage', { page: i + 1 })}
                      className={`w-3 h-3 rounded-full transition-all ${
                        i === otherPage
                          ? 'bg-primary w-8'
                          : 'bg-primary/20 hover:bg-primary/40'
                      }`}
                    />
                  ))}

                  <button
                    type="button"
                    onClick={() =>
                      setOtherPage((p) => Math.min(totalPages - 1, p + 1))
                    }
                    disabled={otherPage === totalPages - 1}
                    aria-label={t('common.next', '下一页')}
                    className="w-12 h-12 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center hover:bg-white/[0.1] transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                  >
                    <ChevronRight className="w-5 h-5 text-primary" />
                  </button>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};