import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';

const topics = [
  {
    id: 'cultural-boundary',
  },
  {
    id: 'travel-gaze',
  },
  {
    id: 'urban-life',
  },
  {
    id: 'media-impact',
  },
];

const ThoughtsPage = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-black text-primary px-8 md:px-16 py-28">
      <button
        type="button"
        onClick={() => navigate('/country/indonesia')}
        aria-label={t('common.back', '返回')}
        className="fixed top-8 left-8 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-primary" />
      </button>

      <section className="mb-16">
        <p className="text-primary/50 text-sm tracking-[0.35em] uppercase mb-6">
          {t('thoughts.eyebrow')}
        </p>

        <h1 className="text-5xl md:text-8xl font-bold leading-none mb-6">
          {t('thoughts.title')}
        </h1>

        <p className="max-w-3xl text-primary/60 text-lg leading-loose">
          {t('thoughts.subtitle')}
        </p>
      </section>

      <section className="mb-20">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-12 max-w-5xl">
          <span className="inline-block mb-5 px-4 py-1 rounded-full bg-white/[0.07] text-primary/70 text-xs">
            {t('thoughts.featured.tag')}
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {t('thoughts.featured.title')}
          </h2>

          <p className="text-primary/60 leading-loose text-lg">
            {t('thoughts.featured.text')}
          </p>
        </article>
      </section>

      <section>
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          {t('thoughts.discussionTitle')}
        </h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {topics.map((topic, index) => {
            const tag = t(`thoughts.topics.${topic.id}.tag`);
            const title = t(`thoughts.topics.${topic.id}.title`);
            const text = t(`thoughts.topics.${topic.id}.text`);

            return (
              <article
                key={topic.id}
                className={`
                  break-inside-avoid mb-6 rounded-[2rem]
                  border border-white/10 bg-white/[0.04]
                  p-7 hover:bg-white/[0.07] transition-colors
                  ${index % 2 === 0 ? 'min-h-[260px]' : 'min-h-[340px]'}
                `}
              >
                <span className="inline-block mb-5 px-4 py-1 rounded-full bg-white/[0.07] text-primary/70 text-xs">
                  {tag}
                </span>

                <h3 className="text-2xl font-semibold mb-4">
                  {title}
                </h3>

                <p className="text-primary/55 leading-relaxed">
                  {text}
                </p>

                <button
                  type="button"
                  className="mt-8 text-primary/70 text-sm hover:text-primary transition-colors"
                >
                  {t('thoughts.enterDiscussion')}
                </button>
              </article>
            );
          })}
        </div>
      </section>
    </main>
  );
};

export default ThoughtsPage;