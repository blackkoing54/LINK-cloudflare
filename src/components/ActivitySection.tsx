import { useState, useRef } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowRight,
  X,
  Quote,
  ChevronLeft,
  ChevronRight,
  Calendar,
  MapPin,
} from 'lucide-react';

// 路径工具：自动处理 GitHub Pages 的 base 路径

// ============================================
// 📸 活动结构数据
// 这里只保留：id、状态、图片路径
// 文案全部放到 zh.json / en.json
// ============================================

type ActivityStatus = 'upcoming' | 'past';

type Activity = {
  id: string;
  status: ActivityStatus;
  coverImage: string;
  photos: string[];
};

type Testimonial = {
  id: string;
  avatar: string;
};

type ArticleBlock =
  | {
      type: 'paragraph';
      content: string;
    }
  | {
      type: 'image';
      src: string;
      caption?: string;
    };

const activities: Activity[] = [
  {
    id: 'monsoon-desert',
    status: 'upcoming',
    coverImage: '/pictures/coming-soon.jpg',
    photos: [],
  },
  {
    id: 'campus-cultural-exchange',
    status: 'past',
    coverImage: '/pictures/activity1.jpg',
    photos: [
      '/pictures/activity1-1.jpg',
      '/pictures/activity1-2.jpg',
      '/pictures/activity1-3.jpg',
      '/pictures/activity1-4.jpg',
      '/pictures/activity1-5.jpg',
    ],
  },
  {
    id: 'indoor-english-corner',
    status: 'past',
    coverImage: '/pictures/activity2.jpg',
    photos: [
      '/pictures/activity2-1.jpg',
      '/pictures/activity2-2.jpg',
      '/pictures/activity2-3.jpg',
    ],
  },
  {
    id: 'outdoor-group-games',
    status: 'past',
    coverImage: '/pictures/activity3.jpg',
    photos: [
      '/pictures/activity3-1.jpg',
      '/pictures/activity3-2.jpg',
      '/pictures/activity3-3.jpg',
      '/pictures/activity3-4.jpg',
    ],
  },
];

const testimonials: Testimonial[] = [
  {
    id: 'zhang-ming',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200',
  },
  {
    id: 'li-yutong',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200',
  },
];

export const ActivitySection = () => {
  const { t } = useTranslation();

  const [selectedActivity, setSelectedActivity] = useState<string | null>(null);
  const scrollContainerRef = useRef<HTMLDivElement>(null);

  const upcomingActivity = activities.find((a) => a.status === 'upcoming');
  const pastActivities = activities.filter((a) => a.status === 'past');

  const displayList = [...pastActivities];
  if (upcomingActivity) {
    displayList.unshift(upcomingActivity);
  }

  const currentActivity = activities.find((a) => a.id === selectedActivity);

  const currentArticle =
    currentActivity
      ? (t(`activity.articles.${currentActivity.id}`, {
          returnObjects: true,
          defaultValue: [],
        }) as ArticleBlock[])
      : [];

  const getActivityText = (id: string, field: string, fallback = '') => {
    return t(`activity.items.${id}.${field}`, fallback);
  };

  const getHighlights = (id: string) => {
    return t(`activity.items.${id}.highlights`, {
      returnObjects: true,
      defaultValue: [],
    }) as string[];
  };

  const scroll = (direction: 'left' | 'right') => {
    if (scrollContainerRef.current) {
      const { clientWidth } = scrollContainerRef.current;
      const scrollAmount =
        direction === 'left' ? -(clientWidth * 0.7) : clientWidth * 0.7;

      scrollContainerRef.current.scrollBy({
        left: scrollAmount,
        behavior: 'smooth',
      });
    }
  };

  return (
    <section className="relative py-24 md:py-32 bg-[#050505] overflow-x-clip">
      <div className="absolute left-0 right-0 -top-10 h-10 bg-gradient-to-b from-transparent via-[#050505]/70 to-[#050505] pointer-events-none z-30" />
      <div className="absolute left-0 right-0 -bottom-40 h-40 bg-gradient-to-t from-transparent via-[#050505]/70 to-[#050505] pointer-events-none z-30" />
      <div className="noise-overlay absolute inset-0 z-0 opacity-20 pointer-events-none" />

      <div className="relative z-20 max-w-7xl mx-auto px-8 md:px-16">
        {/* 头部 */}
        <div className="mb-16 md:mb-24 max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6 md:mb-8"
          >
            <span className="text-primary/60 text-sm tracking-widest uppercase font-medium">
              {t('activity.sectionEyebrow')}
            </span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl font-bold text-primary leading-[1.1] mb-8"
          >
            {t('activity.titleLine1')}
            <br />
            <span className="font-serif italic text-primary/90 font-medium">
              {t('activity.titleLine2')}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="text-primary/60 text-base md:text-lg lg:text-xl leading-relaxed md:leading-loose font-light"
          >
            {t('activity.description.line1')}
            <br className="hidden md:block" />
            {t('activity.description.line2')}
            <br className="hidden md:block" />
            {t('activity.description.line3')}
            <br className="hidden md:block" />
            {t('activity.description.line4')}
          </motion.p>
        </div>

        {/* 活动横向列表 */}
        <div className="relative w-full group/nav">
          <button
            type="button"
            onClick={() => scroll('left')}
            aria-label={t('common.prev', '上一张')}
            className="absolute -left-5 md:-left-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 hidden md:flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-primary hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover/nav:opacity-100"
          >
            <ChevronLeft className="w-6 h-6 mr-1" />
          </button>

          <button
            type="button"
            onClick={() => scroll('right')}
            aria-label={t('common.next', '下一张')}
            className="absolute -right-5 md:-right-8 top-1/2 -translate-y-1/2 z-30 w-12 h-12 md:w-14 md:h-14 hidden md:flex items-center justify-center rounded-full bg-black/60 backdrop-blur-md border border-white/10 text-primary hover:bg-white hover:text-black transition-all duration-300 opacity-0 group-hover/nav:opacity-100"
          >
            <ChevronRight className="w-6 h-6 ml-1" />
          </button>

          <div
            ref={scrollContainerRef}
            className="flex flex-nowrap gap-6 overflow-x-auto snap-x snap-mandatory pb-8 pt-4 [&::-webkit-scrollbar]:hidden"
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          >
            {displayList.map((activity, index) => {
              const name = getActivityText(activity.id, 'name');
              const date = getActivityText(activity.id, 'date');
              const location = getActivityText(activity.id, 'location');
              const description = getActivityText(activity.id, 'description');

              return (
                <motion.div
                  key={activity.id}
                  initial={{ opacity: 0, x: 50 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative flex-none snap-start overflow-hidden rounded-3xl group/card cursor-pointer
                    ${
                      activity.status === 'upcoming'
                        ? 'w-[320px] md:w-[480px] border border-primary/20'
                        : 'w-[280px] md:w-[350px] border border-white/[0.05]'
                    } aspect-[3/4.2]`}
                  onClick={() => setSelectedActivity(activity.id)}
                >
                  <img
                    src={activity.coverImage}
                    alt={name}
                    className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover/card:scale-105"
                  />

                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${
                      activity.status === 'upcoming'
                        ? 'from-[#050505] via-[#050505]/60 to-transparent'
                        : 'from-[#050505] via-[#050505]/40 to-transparent'
                    }`}
                  />

                  {activity.status === 'upcoming' && (
                    <div className="absolute top-6 left-6 bg-primary text-black px-4 py-1.5 rounded-full text-xs font-bold tracking-wider z-10">
                      {t('activity.status.upcomingNew')}
                    </div>
                  )}

                  <div className="absolute bottom-0 left-0 right-0 p-6 md:p-8 z-10">
                    {activity.status === 'upcoming' ? (
                      <div className="space-y-4">
                        <h3 className="text-primary text-2xl md:text-3xl font-bold leading-tight">
                          {name}
                        </h3>

                        <p className="text-primary/70 text-sm line-clamp-2 leading-relaxed">
                          {description}
                        </p>

                        <div className="space-y-2.5 pt-2">
                          <p className="flex items-center gap-3 text-primary/80 text-sm font-medium">
                            <Calendar className="w-4 h-4 text-primary/50" />
                            {date}
                          </p>

                          <p className="flex items-center gap-3 text-primary/80 text-sm font-medium">
                            <MapPin className="w-4 h-4 text-primary/50" />
                            {location}
                          </p>
                        </div>

                        <div className="h-[1px] bg-primary/20 w-full my-5" />

                        <button
                          type="button"
                          className="w-full py-3.5 bg-primary text-black font-bold rounded-xl hover:bg-white transition-colors text-sm flex justify-center items-center gap-2"
                        >
                          {t('activity.actions.detailsAndReserve')}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </div>
                    ) : (
                      <>
                        <p className="text-primary/60 text-xs mb-3 font-medium tracking-wide">
                          {date} · {location}
                        </p>

                        <h3 className="text-primary text-xl md:text-2xl font-medium mb-4">
                          {name}
                        </h3>

                        <button
                          type="button"
                          className="flex items-center gap-2 text-primary/50 text-sm group-hover/card:text-primary transition-colors"
                        >
                          {t('activity.actions.review')}
                          <ArrowRight className="w-4 h-4" />
                        </button>
                      </>
                    )}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* 参与者说 */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-10 mt-16"
        >
          <span className="text-primary/60 text-sm tracking-widest uppercase">
            {t('activity.testimonialsEyebrow')}
          </span>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {testimonials.map((testimonial, index) => {
            const name = t(`activity.testimonials.${testimonial.id}.name`);
            const role = t(`activity.testimonials.${testimonial.id}.role`);
            const text = t(`activity.testimonials.${testimonial.id}.text`);

            return (
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="relative p-8 rounded-2xl bg-white/[0.02] border border-white/[0.05] hover:bg-white/[0.04] transition-colors"
              >
                <Quote className="w-8 h-8 text-primary/20 mb-4" />

                <p className="text-primary/70 leading-relaxed mb-6 text-sm md:text-base">
                  {text}
                </p>

                <div className="flex items-center gap-4">
                  <img
                    src={testimonial.avatar}
                    alt={name}
                    className="w-12 h-12 rounded-full object-cover grayscale hover:grayscale-0 transition-all duration-500"
                  />

                  <div>
                    <p className="text-primary font-medium text-sm">{name}</p>
                    <p className="text-primary/40 text-xs mt-1">{role}</p>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>

      {/* 活动弹窗 */}
      <AnimatePresence>
        {selectedActivity !== null && currentActivity && (
          <ActivityModal
            activity={currentActivity}
            name={getActivityText(currentActivity.id, 'name')}
            date={getActivityText(currentActivity.id, 'date')}
            location={getActivityText(currentActivity.id, 'location')}
            description={getActivityText(currentActivity.id, 'description')}
            highlights={getHighlights(currentActivity.id)}
            article={currentArticle}
            closeLabel={t('common.close', '关闭')}
            upcomingLabel={t('activity.status.upcoming')}
            highlightsTitle={t('activity.highlightsTitle')}
            onClose={() => setSelectedActivity(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

interface ActivityModalProps {
  activity: Activity;
  name: string;
  date: string;
  location: string;
  description: string;
  highlights: string[];
  article: ArticleBlock[];
  closeLabel: string;
  upcomingLabel: string;
  highlightsTitle: string;
  onClose: () => void;
}

const ActivityModal = ({
  activity,
  name,
  date,
  location,
  description,
  highlights,
  article,
  closeLabel,
  upcomingLabel,
  highlightsTitle,
  onClose,
}: ActivityModalProps) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/90 backdrop-blur-sm" />

      <motion.div
        initial={{ opacity: 0, y: 40, scale: 0.95 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 40, scale: 0.95 }}
        transition={{ duration: 0.3 }}
        onClick={(event) => event.stopPropagation()}
        className="relative z-10 w-full max-w-3xl max-h-[88vh] overflow-y-auto scrollbar-hide rounded-3xl bg-[#0a0a0a] border border-white/[0.08] p-6 md:p-12"
      >
        <button
          type="button"
          onClick={onClose}
          aria-label={closeLabel}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/[0.05] border border-white/[0.1] flex items-center justify-center hover:bg-white text-white hover:text-black transition-all"
        >
          <X className="w-4 h-4" />
        </button>

        <img
          src={activity.coverImage}
          alt={name}
          className="w-full aspect-[16/9] object-cover rounded-2xl mb-8"
        />

        <div className="flex items-center gap-4 mb-4">
          {activity.status === 'upcoming' && (
            <span className="bg-primary text-black px-3 py-1 rounded-full text-xs font-bold">
              {upcomingLabel}
            </span>
          )}

          <p className="text-primary/50 text-sm">
            {date} · {location}
          </p>
        </div>

        <h3 className="text-primary text-3xl md:text-4xl font-bold mb-4">
          {name}
        </h3>

        {description && (
          <p className="text-primary/70 text-lg mb-8 leading-relaxed">
            {description}
          </p>
        )}

        {highlights.length > 0 && (
          <div className="mb-10">
            <h4 className="text-primary/80 font-medium mb-4">{highlightsTitle}</h4>

            <div className="flex flex-wrap gap-2">
              {highlights.map((item) => (
                <span
                  key={item}
                  className="px-3 py-1.5 rounded-full bg-white/[0.05] border border-white/10 text-primary/60 text-sm"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        )}

        {article.length > 0 && (
          <div className="space-y-8">
            {article.map((block, index) => {
              if (block.type === 'paragraph') {
                return (
                  <p
                    key={index}
                    className="text-primary/60 leading-8 text-base md:text-lg"
                  >
                    {block.content}
                  </p>
                );
              }

              if (block.type === 'image') {
                return (
                  <figure key={index} className="space-y-3">
                    <img
                      src={block.src}
                      alt={block.caption || name}
                      className="w-full rounded-2xl object-cover"
                    />

                    {block.caption && (
                      <figcaption className="text-center text-primary/30 text-sm">
                        {block.caption}
                      </figcaption>
                    )}
                  </figure>
                );
              }

              return null;
            })}
          </div>
        )}
      </motion.div>
    </motion.div>
  );
};