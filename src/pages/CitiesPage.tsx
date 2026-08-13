// src/pages/CitiesPage.tsx
import { useNavigate, useParams } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import { useTranslation } from 'react-i18next';
import NotAvailable from '../components/NotAvailable';
import { allCountryData } from '../data';

const CitiesPage = () => {
  const { countrySlug } = useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();

  // 👇 定义辅助函数，强制断言返回值为 string
  const tt = (key: string, fallback?: string) => (fallback ? t(key, { defaultValue: fallback }) : t(key)) as string;
  const currentSlug = countrySlug || 'indonesia';
  const data = allCountryData[currentSlug];

  if (!data || !data.cities) return <NotAvailable />;

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
          {tt(`${currentSlug}.citiesPage.eyebrow`, '走进城市')}
        </p>

        <h1 className="text-5xl md:text-8xl font-bold leading-none mb-6">
          {tt(`${currentSlug}.citiesPage.title`, '探索版图')}
        </h1>

        <p className="max-w-3xl text-primary/60 text-lg leading-loose">
          {tt(`${currentSlug}.citiesPage.subtitle`, '每座城市都是一种生活方式。')}
        </p>
      </section>

      <section className="grid grid-cols-1 md:grid-cols-3 gap-7">
        {data.cities.map((city: any) => {
          const cityName = tt(`${currentSlug}.citiesPage.items.${city.id}.name`, city.id);
          const cityDescription = tt(`${currentSlug}.citiesPage.items.${city.id}.description`);

          return (
            <article
              key={city.id}
              onClick={() => navigate(`/country/${currentSlug}/cities/${city.slug}`)}
              className="group relative aspect-[4/5] rounded-[2rem] overflow-hidden cursor-pointer bg-white/[0.03] border border-white/10"
            >
              <img
                src={city.image}
                alt={cityName}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
              />

              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent" />

              <div className="absolute left-6 right-6 bottom-6">
                <h2 className="text-3xl font-bold mb-3">{cityName}</h2>
                <p className="text-primary/60 text-sm leading-relaxed">{cityDescription}</p>
              </div>
            </article>
          );
        })}
      </section>
    </main>
  );
};

export default CitiesPage;