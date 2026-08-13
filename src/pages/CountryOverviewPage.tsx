import { useEffect, useMemo, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useParams, useNavigate } from 'react-router-dom';
import {
  ArrowLeft,
  MapPin,
  FileCheck2,
  Languages,
  Play,
  X,
  Volume2,
  ChevronLeft,
  ChevronRight,
  ChevronRight as ArrowIcon,
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

import AmapView from '../components/AmapView';
import NotAvailable from '../components/NotAvailable';

// 导入所有国家数据
import { indonesiaOverview } from '../data/indonesia';
import { azerbaijanOverview } from '../data/azerbaijan';
import { georgiaOverview } from '../data/georgia';

// ============================================
// 恢复原本完整的类型定义
// ============================================
type ModalKey = 'location' | 'visa' | 'language' | null;

type GalleryCategory = {
  key: string;
  label: string;
  images: string[];
};

type VisaPoint = {
  label: string;
  value: string;
};

type Phrase = {
  key?: string;
  zh: string;
  local: string;
};

type CountryOverviewData = {
  name: string;
  englishName: string;
  hero?: {
    image: string;
    eyebrow?: string;
    title?: string;
    subtitle?: string;
  };
  location: {
    short: string;
    detail: string;
    coordinates: [number, number];
    zoom: number;
  };
  visa: {
    short: string;
    badge: string;
    points: VisaPoint[];
    note: string;
  };
  language: {
    short: string;
    speechLang?: string;
    phrases: Phrase[];
  };
  intro: string;
  video: {
    cover: string;
    duration: string;
    src?: string;
    embed?: string;
  };
  gallery: GalleryCategory[];
};

// 数据字典映射
const countryDataMap: Record<string, any> = {
  indonesia: indonesiaOverview,
  azerbaijan: azerbaijanOverview,
  georgia: georgiaOverview,
};

const visaPointKeyOrder = ['scope', 'duration', 'fee', 'port', 'passport', 'tip'];

const phraseKeyOrder = [
  'hello',
  'morning',
  'thanks',
  'youAreWelcome',
  'bye',
  'howMuch',
  'tooExpensive',
  'dontUnderstand',
  'toilet',
  'delicious',
];

const CountryOverviewPage = () => {
  const { countrySlug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();
  
  const currentSlug = countrySlug || 'indonesia';
  // 在这里统一转换为完整的类型，完美避开 ts 推导错误
  const data = countryDataMap[currentSlug] as unknown as CountryOverviewData;

  const tt = (key: string, fallback?: string) => (fallback ? t(key, { defaultValue: fallback }) : t(key)) as string;

  const [activeModal, setActiveModal] = useState<ModalKey>(null);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);

  const [activeCategory, setActiveCategory] = useState<string>('culture');

  useEffect(() => {
    if (data?.gallery?.[0]?.key) {
      setActiveCategory(data.gallery[0].key);
    }
  }, [data]);

  const currentCategory = useMemo(() => {
    if (!data) return null;
    const found = data.gallery?.find((c) => c.key === activeCategory);
    return found ?? data.gallery?.[0];
  }, [activeCategory, data]);

  const translatedVisaPoints = useMemo(() => {
    if (!data) return [];
    return data.visa.points.map((point, index) => {
      const key = visaPointKeyOrder[index];
      if (!key) return point;
      return {
        label: tt(`${currentSlug}.visaPoints.${key}Label`, point.label),
        value: tt(`${currentSlug}.visaPoints.${key}Value`, point.value),
      };
    });
  }, [data, currentSlug]);

  const translatedPhrases = useMemo(() => {
    if (!data) return [];
    return data.language.phrases.map((phrase, index) => {
      const key = phrase.key ?? phraseKeyOrder[index];
      return {
        ...phrase,
        zh: key ? tt(`${currentSlug}.phrases.${key}`, phrase.zh) : phrase.zh,
      };
    });
  }, [data, currentSlug]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveModal(null);
        setLightboxImage(null);
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, []);

  if (!data) {
    return <NotAvailable />;
  }

  const heroImage = data.hero?.image ?? 'https://images.unsplash.com/photo-1555400038-63f5ba517a47?w=1800';
  const heroEyebrow = tt(`overview-${currentSlug}.heroEyebrow`, data.hero?.eyebrow ?? 'Country Overview');
  const heroTitle = tt(`overview-${currentSlug}.title`, data.hero?.title ?? '国家印象');
  const heroSubtitle = tt(`overview-${currentSlug}.subtitle`, data.hero?.subtitle ?? data.intro);

  const countryName = tt(`${currentSlug}.name`, data.name);
  const countryEnglishName = tt(`${currentSlug}.englishName`, data.englishName);
  const locationShort = tt(`${currentSlug}.locationShort`, data.location.short);
  const locationDetail = tt(`${currentSlug}.locationDetail`, data.location.detail);
  const visaBadge = tt(`${currentSlug}.visaBadge`, data.visa.badge);
  const visaShort = tt(`${currentSlug}.visaShort`, data.visa.short);
  const visaNote = tt(`${currentSlug}.visaNote`, data.visa.note);
  const languageShort = tt(`${currentSlug}.languageShort`, data.language.short);
  const intro = tt(`${currentSlug}.intro`, data.intro);
  const videoDuration = tt(`${currentSlug}.videoDuration`, data.video.duration);

  return (
    <main className="min-h-screen bg-black text-primary">
      <button
        onClick={() => navigate(`/country/${currentSlug}`)}
        className="fixed top-8 left-8 z-40 w-12 h-12 rounded-full bg-black/45 backdrop-blur-xl border border-white/10 flex items-center justify-center hover:bg-white/[0.08] transition-colors"
        aria-label={`${tt('common.back', '返回')} ${countryName}`}
      >
        <ArrowLeft className="w-5 h-5 text-primary" />
      </button>

      {/* Hero */}
      <section className="relative min-h-[72vh] overflow-hidden flex items-end px-8 md:px-16 pb-20">
        <img
          src={heroImage}
          alt={countryEnglishName}
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-black/55" />
        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/30 to-black" />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 max-w-5xl"
        >
          <p className="text-primary/50 text-sm tracking-[0.35em] uppercase mb-6">
            {heroEyebrow}
          </p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold leading-none mb-6">
            {heroTitle}
          </h1>

          <p className="max-w-3xl text-primary/60 text-lg md:text-xl leading-loose">
            {heroSubtitle}
          </p>
        </motion.div>
      </section>

      {/* 基本信息 + 简介 */}
      <section className="px-8 md:px-16 py-24 max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-[0.95fr_1.05fr] gap-8">
        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-10">
          <p className="text-primary/40 text-sm tracking-[0.25em] uppercase mb-3">
            {tt(`overview-${currentSlug}.basicInfoEyebrow`, 'Basic Info')}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {tt(`overview-${currentSlug}.basicInfo`, '国家基本信息')}
          </h2>

          <div className="space-y-2">
            <StaticRow
              label={tt(`overview-${currentSlug}.labels.name`, '国家名称')}
              value={countryName}
              hint={countryEnglishName}
            />

            <InteractiveRow
              icon={MapPin}
              label={tt(`overview-${currentSlug}.labels.location`, '地理位置')}
              value={locationShort}
              action={tt('common.viewMap', '查看地图')}
              onClick={() => setActiveModal('location')}
            />

            <InteractiveRow
              icon={FileCheck2}
              label={tt(`overview-${currentSlug}.labels.visa`, '签证要求')}
              badge={visaBadge}
              value={visaShort}
              action={tt('common.viewVisa', '查看签证说明')}
              onClick={() => setActiveModal('visa')}
            />

            <InteractiveRow
              icon={Languages}
              label={tt(`overview-${currentSlug}.labels.language`, '官方语言')}
              value={languageShort}
              action={tt('common.listenPhrases', '听听常用语')}
              onClick={() => setActiveModal('language')}
            />
          </div>
        </div>

        <div className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-10 flex flex-col">
          <p className="text-primary/40 text-sm tracking-[0.25em] uppercase mb-3">
            {tt(`overview-${currentSlug}.aboutEyebrow`, 'About')}
          </p>

          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            {tt(`overview-${currentSlug}.about`, '国家简介')}
          </h2>

          <p className="text-primary/60 leading-loose text-lg">{intro}</p>
        </div>
      </section>

      {/* 视频 */}
      <section className="px-8 md:px-16 pb-24 max-w-7xl mx-auto">
        <div className="flex items-end justify-between flex-wrap gap-4 mb-8">
          <div>
            <p className="text-primary/40 text-sm tracking-[0.25em] uppercase mb-3">
              {tt(`overview-${currentSlug}.videoEyebrow`, 'Video')}
            </p>

            <h2 className="text-3xl md:text-5xl font-bold">
              {tt(`overview-${currentSlug}.video`, '视频介绍')}
            </h2>
          </div>

          <span className="text-primary/45 text-sm">{videoDuration}</span>
        </div>

        <div className="relative aspect-video rounded-[2rem] overflow-hidden border border-white/10 bg-white/[0.03]">
          {videoPlaying ? (
            data.video.src ? (
              <video
                src={data.video.src}
                poster={data.video.cover}
                controls
                autoPlay
                playsInline
                preload="metadata"
                className="w-full h-full object-cover"
              >
                {tt(`common-${currentSlug}.unsupportedVideo`, '您的浏览器不支持视频播放。')}
              </video>
            ) : data.video.embed ? (
              <iframe
                src={data.video.embed}
                title={`${countryEnglishName} Introduction Video`}
                allow="autoplay; encrypted-media; fullscreen"
                allowFullScreen
                className="w-full h-full border-0"
              />
            ) : (
              <div className="w-full h-full flex items-center justify-center text-primary/60">
                {tt('common.videoNotConfigured', '未配置视频地址')}
              </div>
            )
          ) : (
            <button
              onClick={() => setVideoPlaying(true)}
              className="group relative w-full h-full"
              aria-label={tt('common.playVideo', '播放视频')}
            >
              <img
                src={data.video.cover}
                alt={tt('common.videoCover', 'Video cover')}
                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
              />

              <div className="absolute inset-0 bg-black/40 group-hover:bg-black/30 transition-colors" />

              <span className="absolute inset-0 flex items-center justify-center">
                <span className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-primary/90 flex items-center justify-center shadow-2xl group-hover:scale-110 transition-transform">
                  <Play
                    className="w-8 h-8 md:w-10 md:h-10 text-black ml-1"
                    fill="currentColor"
                  />
                </span>
              </span>
            </button>
          )}
        </div>
      </section>

      {/* 图片展示 */}
      <section className="px-8 md:px-16 pb-28 max-w-7xl mx-auto">
        <div className="mb-8">
          <p className="text-primary/40 text-sm tracking-[0.25em] uppercase mb-3">
            {tt(`overview-${currentSlug}.galleryEyebrow`, 'Gallery')}
          </p>

          <h2 className="text-3xl md:text-5xl font-bold">
            {tt(`overview-${currentSlug}.gallery`, '图片展示')}
          </h2>
        </div>

        <div className="flex flex-wrap gap-3 mb-8">
          {data.gallery.map((c) => {
            const isActive = c.key === activeCategory;
            return (
              <button
                key={c.key}
                onClick={() => setActiveCategory(c.key)}
                className={`px-5 py-2.5 rounded-full text-sm transition-all border ${
                  isActive
                    ? 'bg-primary text-black border-primary'
                    : 'bg-white/[0.04] text-primary/65 border-white/10 hover:bg-white/[0.08]'
                }`}
              >
                {tt(`overview-${currentSlug}.categories-${currentSlug}.${c.key}`, c.label)}
              </button>
            );
          })}
        </div>

        {currentCategory ? (
          <motion.div
            key={activeCategory}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.35 }}
            className="grid grid-cols-1 md:grid-cols-3 gap-6"
          >
            {currentCategory.images.map((src, i) => (
              <button
                key={src}
                onClick={() => setLightboxImage(src)}
                className="group relative h-[420px] overflow-hidden rounded-[2rem] border border-white/10"
              >
                <img
                  src={src}
                  alt={`${tt(`overview-${currentSlug}.categories.${currentCategory.key}`, currentCategory.label)} ${i + 1}`}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-black/0 transition-colors" />
              </button>
            ))}
          </motion.div>
        ) : (
          <div className="text-primary/60">
            {tt(`overview-${currentSlug}.empty.gallery`, '未配置 gallery 分类数据')}
          </div>
        )}
      </section>

      <AnimatePresence>
        {activeModal === 'location' && (
          <LocationModal
            eyebrow={tt(`overview-${currentSlug}.locationEyebrow`, 'Location')}
            title={countryName}
            titleSuffix={tt(`overview-${currentSlug}.labels.location`, '地理位置')}
            detail={locationDetail}
            coordinates={data.location.coordinates}
            zoom={data.location.zoom}
            markerText={countryEnglishName}
            closeLabel={tt('common.close', '关闭')}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'visa' && (
          <VisaModal
            eyebrow={tt(`overview-${currentSlug}.visaEyebrow`, 'Visa')}
            title={tt(`overview-${currentSlug}.labels.visa`, '签证要求')}
            badge={visaBadge}
            shortText={visaShort}
            points={translatedVisaPoints}
            note={visaNote}
            closeLabel={tt('common.close', '关闭')}
            onClose={() => setActiveModal(null)}
          />
        )}

        {activeModal === 'language' && (
          <LanguageModal
            eyebrow={tt(`overview-${currentSlug}.languageEyebrow`, 'Language')}
            title={languageShort}
            phrases={translatedPhrases}
            speechLang={data.language.speechLang ?? 'en-US'}
            hint={tt(
              'languageModal.hint',
              '点击右侧喇叭图标，即可听到发音。发音由浏览器内置语音合成提供，仅供参考。'
            )}
            unsupportedSpeechText={tt(
              'languageModal.unsupportedSpeech',
              '当前浏览器不支持语音播放'
            )}
            playLabel={tt('common.play', '播放')}
            closeLabel={tt('common.close', '关闭')}
            onClose={() => setActiveModal(null)}
          />
        )}

        {lightboxImage && currentCategory && (
          <Lightbox
            image={lightboxImage}
            images={currentCategory.images}
            closeLabel={tt('common.close', '关闭')}
            prevLabel={tt('common.prev', '上一张')}
            nextLabel={tt('common.next', '下一张')}
            previewLabel={tt('common.preview', '预览')}
            onClose={() => setLightboxImage(null)}
            onChange={(img) => setLightboxImage(img)}
          />
        )}
      </AnimatePresence>
    </main>
  );
};

interface StaticRowProps {
  label: string;
  value: string;
  hint?: string;
}

const StaticRow = ({ label, value, hint }: StaticRowProps) => {
  return (
    <div className="flex items-center justify-between gap-6 py-4 border-b border-white/10">
      <span className="text-primary/40">{label}</span>
      <div className="text-right">
        <strong className="block text-primary/85 font-medium">{value}</strong>
        {hint && <span className="text-primary/35 text-xs mt-1 block">{hint}</span>}
      </div>
    </div>
  );
};

interface InteractiveRowProps {
  icon: React.ElementType;
  label: string;
  value: string;
  action: string;
  badge?: string;
  onClick: () => void;
}

const InteractiveRow = ({
  icon: Icon,
  label,
  value,
  action,
  badge,
  onClick,
}: InteractiveRowProps) => {
  return (
    <button
      onClick={onClick}
      className="group w-full py-4 border-b border-white/10 flex items-center gap-5 text-left hover:bg-white/[0.03] transition-colors rounded-xl px-2 -mx-2"
    >
      <span className="w-10 h-10 shrink-0 rounded-xl bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:bg-primary/10 group-hover:border-primary/30 transition-colors">
        <Icon className="w-4 h-4 text-primary/70" strokeWidth={1.8} />
      </span>
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <span className="text-primary/40 text-sm">{label}</span>
          {badge && (
            <span className="px-2 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary/70 text-[11px]">
              {badge}
            </span>
          )}
        </div>
        <strong className="block text-primary/85 font-medium truncate">{value}</strong>
      </div>
      <span className="shrink-0 flex items-center gap-1 text-primary/45 text-sm group-hover:text-primary/80 transition-colors">
        {action}
        <ArrowIcon className="w-4 h-4" />
      </span>
    </button>
  );
};

interface ModalShellProps {
  onClose: () => void;
  children: React.ReactNode;
  maxWidth?: string;
  closeLabel: string;
}

const ModalShell = ({
  onClose,
  children,
  maxWidth = 'max-w-3xl',
  closeLabel,
}: ModalShellProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.25 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/80 backdrop-blur-md" />
      <motion.div
        initial={{ opacity: 0, y: 30, scale: 0.96 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.96 }}
        transition={{ duration: 0.3 }}
        onClick={(e) => e.stopPropagation()}
        className={`relative z-10 w-full ${maxWidth} max-h-[88vh] overflow-y-auto rounded-[2rem] bg-[#0a0a0a] border border-white/10 p-8 md:p-10`}
      >
        <button
          onClick={onClose}
          className="absolute top-5 right-5 w-10 h-10 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center hover:bg-white/[0.1] transition-colors"
          aria-label={closeLabel}
        >
          <X className="w-4 h-4 text-primary" />
        </button>
        {children}
      </motion.div>
    </motion.div>
  );
};

interface LocationModalProps {
  eyebrow: string;
  title: string;
  titleSuffix: string;
  detail: string;
  coordinates: [number, number];
  zoom: number;
  markerText: string;
  closeLabel: string;
  onClose: () => void;
}

const LocationModal = ({
  eyebrow,
  title,
  titleSuffix,
  detail,
  coordinates,
  zoom,
  markerText,
  closeLabel,
  onClose,
}: LocationModalProps) => {
  return (
    <ModalShell onClose={onClose} maxWidth="max-w-4xl" closeLabel={closeLabel}>
      <p className="text-primary/40 text-sm tracking-[0.25em] uppercase mb-3">
        {eyebrow}
      </p>
      <h3 className="text-3xl md:text-4xl font-bold mb-4">
        {title} {titleSuffix}
      </h3>
      <p className="text-primary/55 leading-relaxed mb-8 max-w-3xl">{detail}</p>
      <div className="aspect-[16/10] min-h-[400px] rounded-2xl overflow-hidden border border-white/10 bg-white/[0.03]">
        <AmapView
          center={coordinates}
          zoom={zoom}
          markerText={markerText}
          height="100%"
        />
      </div>
    </ModalShell>
  );
};

interface VisaModalProps {
  eyebrow: string;
  title: string;
  badge: string;
  shortText: string;
  points: VisaPoint[];
  note: string;
  closeLabel: string;
  onClose: () => void;
}

const VisaModal = ({
  eyebrow,
  title,
  badge,
  shortText,
  points,
  note,
  closeLabel,
  onClose,
}: VisaModalProps) => {
  return (
    <ModalShell onClose={onClose} closeLabel={closeLabel}>
      <div className="flex items-center gap-3 mb-3">
        <p className="text-primary/40 text-sm tracking-[0.25em] uppercase">
          {eyebrow}
        </p>
        <span className="px-2.5 py-0.5 rounded-full bg-primary/10 border border-primary/20 text-primary/70 text-xs">
          {badge}
        </span>
      </div>
      <h3 className="text-3xl md:text-4xl font-bold mb-3">{title}</h3>
      <p className="text-primary/70 text-lg mb-8">{shortText}</p>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-8">
        {points.map((p) => (
          <div
            key={`${p.label}-${p.value}`}
            className="rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4"
          >
            <p className="text-primary/40 text-xs mb-1.5">{p.label}</p>
            <p className="text-primary/80 leading-relaxed">{p.value}</p>
          </div>
        ))}
      </div>
      <p className="text-primary/35 text-xs leading-relaxed">{note}</p>
    </ModalShell>
  );
};

interface LanguageModalProps {
  eyebrow: string;
  title: string;
  phrases: Phrase[];
  speechLang: string;
  hint: string;
  unsupportedSpeechText: string;
  playLabel: string;
  closeLabel: string;
  onClose: () => void;
}

const LanguageModal = ({
  eyebrow,
  title,
  phrases,
  speechLang,
  hint,
  unsupportedSpeechText,
  playLabel,
  closeLabel,
  onClose,
}: LanguageModalProps) => {
  const [playingIndex, setPlayingIndex] = useState<number | null>(null);

  const speak = (text: string, index: number) => {
    if (!('speechSynthesis' in window)) {
      alert(unsupportedSpeechText);
      return;
    }
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = speechLang;
    utterance.rate = 0.9;
    utterance.onend = () => setPlayingIndex(null);
    utterance.onerror = () => setPlayingIndex(null);
    setPlayingIndex(index);
    window.speechSynthesis.speak(utterance);
  };

  useEffect(() => {
    return () => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return (
    <ModalShell onClose={onClose} closeLabel={closeLabel}>
      <p className="text-primary/40 text-sm tracking-[0.25em] uppercase mb-3">
        {eyebrow}
      </p>
      <h3 className="text-3xl md:text-4xl font-bold mb-3">{title}</h3>
      <p className="text-primary/50 leading-relaxed mb-8">{hint}</p>
      <div className="space-y-3">
        {phrases.map((item, index) => {
          const isPlaying = playingIndex === index;
          return (
            <div
              key={`${item.zh}-${item.local}`}
              className="flex items-center gap-4 rounded-2xl bg-white/[0.04] border border-white/10 px-5 py-4"
            >
              <div className="flex-1 min-w-0">
                <p className="text-primary/40 text-xs mb-1">{item.zh}</p>
                <p className="text-primary/85 text-lg">{item.local}</p>
              </div>
              <button
                onClick={() => speak(item.local, index)}
                className={`shrink-0 w-11 h-11 rounded-full flex items-center justify-center border transition-colors ${
                  isPlaying
                    ? 'bg-primary/20 border-primary/40 text-primary'
                    : 'bg-white/[0.05] border-white/10 text-primary/70 hover:bg-white/[0.1]'
                }`}
                aria-label={`${playLabel}: ${item.local}`}
              >
                <Volume2 className={`w-4 h-4 ${isPlaying ? 'animate-pulse' : ''}`} />
              </button>
            </div>
          );
        })}
      </div>
    </ModalShell>
  );
};

interface LightboxProps {
  image: string;
  images: string[];
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  previewLabel: string;
  onClose: () => void;
  onChange: (img: string) => void;
}

const Lightbox = ({
  image,
  images,
  closeLabel,
  prevLabel,
  nextLabel,
  previewLabel,
  onClose,
  onChange,
}: LightboxProps) => {
  const currentIndex = images.indexOf(image);

  const goPrev = (e: React.MouseEvent) => {
    e.stopPropagation();
    const i = (currentIndex - 1 + images.length) % images.length;
    onChange(images[i]);
  };

  const goNext = (e: React.MouseEvent) => {
    e.stopPropagation();
    const i = (currentIndex + 1) % images.length;
    onChange(images[i]);
  };

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') {
        const i = (currentIndex - 1 + images.length) % images.length;
        onChange(images[i]);
      }
      if (e.key === 'ArrowRight') {
        const i = (currentIndex + 1) % images.length;
        onChange(images[i]);
      }
      if (e.key === 'Escape') {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [currentIndex, images, onChange, onClose]);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] flex items-center justify-center p-4 md:p-10"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/92 backdrop-blur-xl" />
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-20 w-11 h-11 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-white/[0.12] transition-colors"
        aria-label={closeLabel}
      >
        <X className="w-5 h-5 text-primary" />
      </button>
      {images.length > 1 && (
        <>
          <button
            onClick={goPrev}
            className="absolute left-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-white/[0.12] transition-colors"
            aria-label={prevLabel}
          >
            <ChevronLeft className="w-5 h-5 text-primary" />
          </button>
          <button
            onClick={goNext}
            className="absolute right-6 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full bg-white/[0.06] border border-white/10 flex items-center justify-center hover:bg-white/[0.12] transition-colors"
            aria-label={nextLabel}
          >
            <ChevronRight className="w-5 h-5 text-primary" />
          </button>
        </>
      )}
      <motion.img
        key={image}
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        src={image}
        alt={previewLabel}
        onClick={(e) => e.stopPropagation()}
        className="relative z-10 max-w-[92vw] max-h-[88vh] object-contain rounded-2xl shadow-2xl"
      />
      {images.length > 1 && (
        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 text-primary/50 text-sm">
          {currentIndex + 1} / {images.length}
        </div>
      )}
    </motion.div>
  );
};

export default CountryOverviewPage;