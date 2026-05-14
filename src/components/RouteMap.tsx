import { useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import {
  Map,
  Building2,
  MessagesSquare,
  Backpack,
  Sparkles,
} from 'lucide-react';
import { motion } from 'framer-motion';

interface RouteMapProps {
  countrySlug: string;
}

const routeItems = [
  {
    key: 'overview',
    icon: Map,
    pathSuffix: 'overview',
    position: 'lg:top-[42px] lg:left-[0%]',
  },
  {
    key: 'cities',
    icon: Building2,
    pathSuffix: 'cities',
    position: 'lg:top-[150px] lg:left-[28%]',
  },
  {
    key: 'thoughts',
    icon: MessagesSquare,
    pathSuffix: 'thoughts',
    position: 'lg:top-[28px] lg:left-[56%]',
  },
  {
    key: 'travelGuide',
    icon: Backpack,
    pathSuffix: 'travel-guide',
    position: 'lg:top-[155px] lg:left-[82%]',
  },
];

const RouteMap = ({ countrySlug }: RouteMapProps) => {
  const navigate = useNavigate();
  const { t } = useTranslation();

  return (
    <div className="relative mt-20 w-full max-w-7xl min-h-[560px] lg:min-h-[430px]">
      {/* 桌面端蜿蜒路线 */}
      <svg
        className="
          hidden lg:block
          absolute left-[110px] top-[80px]
          w-[calc(100%-220px)] h-[250px]
          pointer-events-none
          overflow-visible
        "
        viewBox="0 0 1000 260"
        preserveAspectRatio="none"
      >
        {/* 外层柔光 */}
        <motion.path
          d="M 20 55 C 150 5, 230 230, 365 165 S 565 -5, 700 70 S 850 270, 980 165"
          fill="none"
          stroke="rgba(243,238,215,0.18)"
          strokeWidth="18"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.4, ease: 'easeInOut' }}
        />

        {/* 主路径 */}
        <motion.path
          d="M 20 55 C 150 5, 230 230, 365 165 S 565 -5, 700 70 S 850 270, 980 165"
          fill="none"
          stroke="rgba(243,238,215,0.78)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="10 14"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.5, ease: 'easeInOut' }}
        />

        {/* 路线上的小光点 */}
        <motion.circle
          r="7"
          fill="rgba(243,238,215,0.95)"
          filter="drop-shadow(0 0 12px rgba(243,238,215,0.9))"
          initial={{ offsetDistance: '0%' }}
          animate={{ offsetDistance: '100%' }}
          transition={{
            duration: 6,
            repeat: Infinity,
            ease: 'linear',
          }}
          style={{
            offsetPath:
              "path('M 20 55 C 150 5, 230 230, 365 165 S 565 -5, 700 70 S 850 270, 980 165')",
          }}
        />
      </svg>

      {/* 移动端竖向蜿蜒路线 */}
      <svg
        className="
          lg:hidden
          absolute left-1/2 top-[70px]
          -translate-x-1/2
          w-[120px] h-[760px]
          pointer-events-none
          overflow-visible
        "
        viewBox="0 0 120 760"
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 60 0 C 10 120, 110 210, 60 330 S 10 520, 60 760"
          fill="none"
          stroke="rgba(243,238,215,0.16)"
          strokeWidth="16"
          strokeLinecap="round"
          initial={{ pathLength: 0, opacity: 0 }}
          animate={{ pathLength: 1, opacity: 1 }}
          transition={{ duration: 1.3 }}
        />

        <motion.path
          d="M 60 0 C 10 120, 110 210, 60 330 S 10 520, 60 760"
          fill="none"
          stroke="rgba(243,238,215,0.7)"
          strokeWidth="3"
          strokeLinecap="round"
          strokeDasharray="9 13"
          initial={{ pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.3 }}
        />
      </svg>

      {/* 路线节点 */}
      <div className="relative z-10 flex flex-col lg:block items-center gap-10">
        {routeItems.map((item, index) => {
          const Icon = item.icon;

          const label = t(`routeMap.items.${item.key}.label`);
          const desc = t(`routeMap.items.${item.key}.desc`);
          const path = `/country/${countrySlug}/${item.pathSuffix}`;

          return (
            <motion.button
              key={item.key}
              type="button"
              initial={{ opacity: 0, y: 34, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{
                delay: index * 0.14,
                duration: 0.55,
                ease: 'easeOut',
              }}
              whileHover={{
                y: -12,
                scale: 1.035,
              }}
              whileTap={{ scale: 0.97 }}
              onClick={() => navigate(path)}
              aria-label={label}
              className={`
                group
                relative
                w-[260px] min-h-[220px]
                lg:absolute
                ${item.position}
                rounded-[2rem]
                bg-black/42
                backdrop-blur-xl
                border border-white/12
                hover:border-primary/50
                hover:bg-white/[0.08]
                transition-all duration-300
                px-7 py-8 text-left
                shadow-[0_28px_80px_rgba(0,0,0,0.36)]
              `}
            >
              {/* 节点序号 */}
              <div
                className="
                  absolute -top-4 -right-4
                  w-10 h-10 rounded-full
                  bg-primary text-black
                  flex items-center justify-center
                  text-sm font-bold
                  shadow-[0_0_30px_rgba(243,238,215,0.35)]
                "
              >
                {index + 1}
              </div>

              {/* 图标 */}
              <div
                className="
                  mb-8
                  w-20 h-20 rounded-3xl
                  bg-white/[0.07]
                  border border-white/[0.13]
                  flex items-center justify-center
                  group-hover:bg-primary/12
                  group-hover:border-primary/45
                  transition-all duration-300
                "
              >
                <Icon className="w-8 h-8 text-primary" strokeWidth={1.7} />
              </div>

              <h3 className="text-primary text-2xl font-semibold mb-4">
                {label}
              </h3>

              <p className="text-primary/50 text-sm leading-relaxed">
                {desc}
              </p>

              {/* hover 装饰 */}
              <div
                className="
                  absolute bottom-6 right-6
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-300
                "
              >
                <Sparkles className="w-5 h-5 text-primary/60" />
              </div>

              {/* 卡片内部微光 */}
              <div
                className="
                  pointer-events-none
                  absolute inset-0 rounded-[2rem]
                  opacity-0 group-hover:opacity-100
                  transition-opacity duration-500
                  bg-gradient-to-br
                  from-primary/[0.08]
                  via-transparent
                  to-transparent
                "
              />
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};

export default RouteMap;