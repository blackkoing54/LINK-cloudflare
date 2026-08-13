// src/components/NotAvailable.tsx
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Compass } from 'lucide-react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';

const NotAvailable = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-black text-primary flex flex-col items-center justify-center relative overflow-hidden px-8">
      {/* 背景光影效果，契合你网站的深色毛玻璃风格 */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.03)_0,transparent_100%)]" />
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative z-10 flex flex-col items-center text-center max-w-lg"
      >
        <div className="w-24 h-24 mb-8 rounded-full bg-white/[0.03] border border-white/10 flex items-center justify-center backdrop-blur-xl">
          <Compass className="w-10 h-10 text-primary/50" />
        </div>
        
        <h1 className="text-4xl md:text-5xl font-bold mb-6 tracking-wide">
          {t('common.comingSoon', '该国家暂未开放')}
        </h1>
        
        <p className="text-primary/50 text-lg leading-relaxed mb-12">
          {t('common.comingSoonDesc', '这片大陆的故事还在紧锣密鼓地筹备中。请保持期待，我们即将启程。')}
        </p>

        <button
          // 👇 这里的 -1 代表返回历史记录的上一层
          onClick={() => navigate(-1)} 
          className="group flex items-center gap-3 px-8 py-4 rounded-full bg-white/[0.05] border border-white/10 hover:bg-white/[0.1] transition-all duration-300"
        >
          <ArrowLeft className="w-5 h-5 text-primary/70 group-hover:-translate-x-1 transition-transform" />
          <span className="text-primary/90 font-medium tracking-wider">
            {t('common.backToPrevious', '返回上一页')}
          </span>
        </button>
      </motion.div>
    </main>
  );
};

export default NotAvailable;