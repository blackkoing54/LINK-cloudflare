import { Search } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { WordsPullUp } from './WordsPullUp';


export const HeroSection = () => {
  const { t, i18n } = useTranslation();

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* ---------- 1. 背景视频层 ---------- */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="metadata"
        className="absolute top-0 left-0 w-full h-full object-cover z-0"
      >
        <source src="/hero1.mp4"></source>
      </video>

      {/* ---------- 2. 半透明黑色遮罩层 ---------- */}
      <div className="absolute inset-0 bg-black/15 z-10" />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/40 z-10" />

      {/* ---------- 3. 主要文字内容区 ---------- */}
      <div className="relative z-30 h-full flex flex-col justify-end p-8 md:p-16">
        <div className="max-w-7xl mx-auto w-full">
          <div className="flex items-start">
            <WordsPullUp
              key={i18n.language}
              text={t('hero.title', 'Culture Bistro')}
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-primary leading-tight"
            />
          </div>

          <motion.div
            key={`subtitle-${i18n.language}`}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex justify-end my-8"
          >
            <p className="text-gray-300 text-lg md:text-xl font-light tracking-wide">
              {t('hero.subtitle', '文化 · 美食 · 活动 · 攻略')}
            </p>
          </motion.div>

          <motion.div
            key={`search-${i18n.language}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1.2, duration: 0.8 }}
            className="flex items-center gap-4 max-w-2xl"
          >
            <div className="flex-1 bg-white/10 backdrop-blur-md rounded-full px-6 py-4 flex items-center gap-3 border border-white/20">
              <Search className="w-5 h-5 text-gray-300" />
              <input
                type="text"
                placeholder={t('hero.searchPlaceholder', '搜索国家...')}
                aria-label={t('hero.searchAriaLabel', '搜索国家')}
                className="flex-1 bg-transparent outline-none text-primary placeholder:text-gray-400"
              />
            </div>

            <button
              type="button"
              className="bg-primary text-black rounded-full px-8 py-4 font-medium hover:bg-primary/90 transition-colors whitespace-nowrap"
              aria-label={t('hero.join', 'Join')}
            >
              {t('hero.join', 'Join')}
            </button>
          </motion.div>

          <div className="h-128 md:h-32 w-full" />
        </div>
      </div>
    </section>
  );
};