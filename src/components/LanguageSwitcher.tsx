import { useTranslation } from 'react-i18next';

const LanguageSwitcher = () => {
  const { i18n } = useTranslation();

  const currentLanguage = i18n.language || 'zh';
  const isZh = currentLanguage.startsWith('zh');

  const toggleLanguage = async () => {
    const nextLanguage = isZh ? 'en' : 'zh';

    console.log('当前语言:', currentLanguage);
    console.log('准备切换到:', nextLanguage);

    await i18n.changeLanguage(nextLanguage);

    console.log('切换完成，现在语言是:', i18n.language);
  };

  return (
    <button
      type="button"
      onClick={toggleLanguage}
      className="
        fixed top-8 right-8 z-50
        h-10 px-4 rounded-full
        bg-black/45 backdrop-blur-xl
        border border-white/10
        flex items-center gap-2
        text-primary text-sm
        hover:bg-white/[0.08]
        transition-colors
      "
      aria-label="Switch language"
    >
      <span className={isZh ? 'text-primary' : 'text-primary/40'}>中</span>
      <span className="text-primary/30">/</span>
      <span className={!isZh ? 'text-primary' : 'text-primary/40'}>EN</span>
    </button>
  );
};

export default LanguageSwitcher;