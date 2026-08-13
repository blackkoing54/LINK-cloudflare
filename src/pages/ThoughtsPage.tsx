// src/pages/ThoughtsPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { ArrowLeft } from 'lucide-react';
import NotAvailable from '../components/NotAvailable';
import { allCountryData } from '../data';

const ThoughtsPage = () => {
  const { countrySlug } = useParams();
  const navigate = useNavigate();
  const { t } = useTranslation();

  // 👇 定义辅助函数，强制断言返回值为 string
  // 替换为这行：
const tt = (key: string, fallback?: string) => (fallback ? t(key, { defaultValue: fallback }) : t(key)) as string;
  const currentSlug = countrySlug || 'indonesia';
  const data = allCountryData[currentSlug];

  if (!data || !data.thoughts) return <NotAvailable />;

  return (
    <main className="min-h-screen bg-black text-primary px-8 md:px-16 py-28">
      <button
        type="button"
        onClick={() => navigate(`/country/${currentSlug}`)}
        aria-label={tt('common.back', '返回')}
        className="fixed top-8 left-8 z-20 w-12 h-12 rounded-full bg-black/40 backdrop-blur-md border border-white/10 flex items-center justify-center hover:bg-white/10 transition-colors"
      >
        <ArrowLeft className="w-5 h-5 text-primary" />
      </button>

      <section className="mb-16">
        <p className="text-primary/50 text-sm tracking-[0.35em] uppercase mb-6">
          {tt(`${currentSlug}.thoughts.eyebrow`, '思想碰撞')}
        </p>

        <h1 className="text-5xl md:text-8xl font-bold leading-none mb-6">
          {tt(`${currentSlug}.thoughts.title`, '深度阅读')}
        </h1>

        <p className="max-w-3xl text-primary/60 text-lg leading-loose">
          {tt(`${currentSlug}.thoughts.subtitle`, '超越走马观花，探索深层逻辑。')}
        </p>
      </section>

      <section className="mb-20">
        <article className="rounded-[2rem] border border-white/10 bg-white/[0.04] backdrop-blur-xl p-8 md:p-12 max-w-5xl">
          <span className="inline-block mb-5 px-4 py-1 rounded-full bg-white/[0.07] text-primary/70 text-xs">
            {tt(`${currentSlug}.thoughts.featured.tag`, data.thoughts.featured.tag)}
          </span>

          <h2 className="text-3xl md:text-5xl font-bold mb-6">
            {tt(`${currentSlug}.thoughts.featured.title`, data.thoughts.featured.title)}
          </h2>

          <p className="text-primary/60 leading-loose text-lg">
            {tt(`${currentSlug}.thoughts.featured.text`, data.thoughts.featured.text)}
          </p>
        </article>
      </section>

      <section>
        <h2 className="text-3xl md:text-5xl font-bold mb-8">
          {tt(`${currentSlug}.thoughts.discussionTitle`, '议题探讨')}
        </h2>

        <div className="columns-1 md:columns-2 lg:columns-3 gap-6">
          {data.thoughts.topics.map((topic: any, index: number) => {
            const tag = tt(`${currentSlug}.thoughts.topics.${topic.id}.tag`);
            const title = tt(`${currentSlug}.thoughts.topics.${topic.id}.title`);
            const text = tt(`${currentSlug}.thoughts.topics.${topic.id}.text`);

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

                <h3 className="text-2xl font-semibold mb-4">{title}</h3>
                <p className="text-primary/55 leading-relaxed">{text}</p>

                <button
                  type="button"
                  className="mt-8 text-primary/70 text-sm hover:text-primary transition-colors"
                >
                  {tt('thoughts.enterDiscussion', '参与讨论')}
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