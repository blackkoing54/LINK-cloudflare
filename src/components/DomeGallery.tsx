import { useMemo, useRef, useEffect, useState } from 'react';
import './DomeGallery.css';

// 1. 引入缩略图（用于3D球体，自动转换为 300px 宽度的 WebP，极快！）
const thumbImages = import.meta.glob('/src/assets/gallery/*.jpg', {
  eager: true,
  query: { w: '200', format: 'webp' ,quality: '70' }, // 触发 vite-imagetools 插件进行压缩
  import: 'default',
});

// 2. 引入原图（用于点击放大预览，保持高清）
const originalImages = import.meta.glob('/src/assets/gallery/*.jpg', {
  eager: true,
  import: 'default',
});

const thumbValues = Object.values(thumbImages) as string[];
const originalValues = Object.values(originalImages) as string[];

// 3. 将缩略图和原图组合
const DEFAULT_IMAGES = thumbValues.map((thumbSrc, i) => ({
  src: thumbSrc,                  // 缩略图路径
  originalSrc: originalValues[i], // 原图路径
  alt: `照片 ${i + 1}`,
}));

type ImageItem = { src: string; originalSrc: string; alt?: string };

function buildItems(pool: ImageItem[], seg: number) {
  const xCols = Array.from({ length: seg }, (_, i) => -37 + i * 2);
  const evenYs = [-14, -12, -10, -8, -6, -4, -2, 0, 2, 4, 6, 8, 10, 12, 14];
  const oddYs = [-13, -11, -9, -7, -5, -3, -1, 1, 3, 5, 7, 9, 11, 13];

  const coords = xCols.flatMap((x, c) => {
    const ys = c % 2 === 0 ? evenYs : oddYs;
    return ys.map((y) => ({ x, y, sizeX: 2, sizeY: 2 }));
  });

  return coords.map((c, i) => {
    const image = pool[i % pool.length];
    return { 
      ...c, 
      src: image.src, 
      originalSrc: image.originalSrc, 
      alt: image.alt || '' 
    };
  });
}

export default function DomeGallery() {
  const rootRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);
  const [selectedImage, setSelectedImage] = useState<{ src: string; alt: string } | null>(null);

  const segments = 20; // 降低渲染节点数量，提升性能
  const items = useMemo(() => buildItems(DEFAULT_IMAGES, segments), []);

  // ✅ 拖拽 + 惯性
  useEffect(() => {
    const root = rootRef.current;
    const sphere = sphereRef.current;
    if (!root || !sphere) return;

    let isDown = false;
    let lastX = 0;
    let lastY = 0;

    let rotX = 0;
    let rotY = 0;

    let velocityX = 0;
    let velocityY = 0;

    let rafId: number;

    const friction = 0.95; // 惯性衰减
    const speed = 0.2; // 灵敏度

    const update = () => {
      if (!isDown) {
        // 性能优化：只有在还有速度时才更新 DOM
        if (Math.abs(velocityX) > 0.01 || Math.abs(velocityY) > 0.01) {
          velocityX *= friction;
          velocityY *= friction;

          rotY += velocityX;
          rotX -= velocityY;

          rotX = Math.max(-55, Math.min(55, rotX));

          sphere.style.setProperty('--sphere-rot-x', `${rotX}deg`);
          sphere.style.setProperty('--sphere-rot-y', `${rotY}deg`);
        }
      }

      rafId = requestAnimationFrame(update);
    };

    const onDown = (e: PointerEvent) => {
      isDown = true;
      lastX = e.clientX;
      lastY = e.clientY;
    };

    const onMove = (e: PointerEvent) => {
      if (!isDown) return;

      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;

      lastX = e.clientX;
      lastY = e.clientY;

      velocityX = dx * speed;
      velocityY = dy * speed;

      rotY += velocityX;
      rotX -= velocityY;

      rotX = Math.max(-80, Math.min(80, rotX));

      sphere.style.setProperty('--sphere-rot-x', `${rotX}deg`);
      sphere.style.setProperty('--sphere-rot-y', `${rotY}deg`);
    };

    const onUp = () => {
      isDown = false;
    };

    root.addEventListener('pointerdown', onDown);
    window.addEventListener('pointermove', onMove);
    window.addEventListener('pointerup', onUp);

    update();

    return () => {
      root.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      cancelAnimationFrame(rafId);
    };
  }, []);

  useEffect(() => {
    if (!selectedImage) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedImage(null);
      }
    };

    window.addEventListener('keydown', onKeyDown);

    return () => {
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [selectedImage]);

  return (
    <div
      ref={rootRef}
      className="sphere-root"
      style={
        {
          '--segments-x': segments,
          '--segments-y': segments,
          '--radius': '600px',
          '--viewer-pad': '72px',
          '--overlay-blur-color': '#120F17',
          '--tile-radius': '30px',
          '--enlarge-radius': '30px',
          '--image-filter': 'grayscale(1)',
        } as React.CSSProperties
      }
    >
      <main className="sphere-main">
        <div className="stage">
          <div ref={sphereRef} className="sphere">
            {items.map((it, i) => (
              <div
                key={`${it.x},${it.y},${i}`}
                className="item"
                style={
                  {
                    '--offset-x': it.x,
                    '--offset-y': it.y,
                    '--item-size-x': it.sizeX,
                    '--item-size-y': it.sizeY,
                  } as React.CSSProperties
                }
              >
                <div
                  className="item__image"
                  onClick={(e) => {
                    e.stopPropagation();
                    // ✅ 关键改动：点击时，存入 originalSrc (高清原图) 进行放大预览
                    setSelectedImage({ src: it.originalSrc, alt: it.alt });
                  }}
                >
                  {/* ✅ 关键改动：球体上渲染 src (轻量缩略图)，并加上 loading="lazy" */}
                  <img src={it.src} draggable={false} alt={it.alt} loading="lazy" />
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="overlay" />
        <div className="overlay overlay--blur" />
        <div className="edge-fade edge-fade--top" />
        <div className="edge-fade edge-fade--bottom" />

        <div className="viewer">
          <div className="scrim" />
          <div className="frame" />
        </div>
        
        {selectedImage && (
          <div className="image-preview" onClick={() => setSelectedImage(null)}>
            <img
              src={selectedImage.src}
              alt={selectedImage.alt}
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        )}
      </main>
    </div>
  );
}