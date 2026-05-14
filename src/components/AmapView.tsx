import { useEffect, useRef, useState } from 'react';
import AMapLoader from '@amap/amap-jsapi-loader';

declare global {
  interface Window {
    _AMapSecurityConfig?: {
      securityJsCode: string;
    };
  }
}

interface AmapViewProps {
  center: [number, number]; // 高德地图坐标顺序：[lng, lat]，即 [经度, 纬度]
  zoom?: number;
  markerText?: string;
  height?: string;
}

const AMAP_KEY = '976e246123e50a06a4df3a9004ed5cf7'; // TODO: 替换成你的 Web端(JS API) Key
const AMAP_SECURITY_CODE = '4851d0b3821b2f1d1cfd7dcf35fc4897'; // TODO: 替换成你的 securityJsCode

const AmapView = ({
  center,
  zoom = 10,
  markerText,
  height = '100%',
}: AmapViewProps) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<any>(null);

  const [loadError, setLoadError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;

    // 高德 JSAPI 2.0 安全密钥配置
    // 必须在 AMapLoader.load 之前设置
    window._AMapSecurityConfig = {
      securityJsCode: AMAP_SECURITY_CODE,
    };

    const initMap = async () => {
      try {
        setLoadError(null);

        const AMap = await AMapLoader.load({
          key: AMAP_KEY,
          version: '2.0',
          plugins: ['AMap.Scale', 'AMap.ToolBar'],
        });

        if (cancelled || !mapContainerRef.current) return;

        // 如果之前已经创建过地图，先销毁，避免重复初始化
        if (mapInstanceRef.current) {
          mapInstanceRef.current.destroy();
          mapInstanceRef.current = null;
        }

        const map = new AMap.Map(mapContainerRef.current, {
          center,
          zoom,
          viewMode: '2D',
          resizeEnable: true,
          dragEnable: true,
          zoomEnable: true,
          scrollWheel: true,
          doubleClickZoom: true,
          keyboardEnable: true,

          // 你可以改成其他高德内置样式：
          // 'amap://styles/normal'
          // 'amap://styles/light'
          // 'amap://styles/whitesmoke'
          // 'amap://styles/fresh'
          // 'amap://styles/dark'
          mapStyle: 'amap://styles/normal',
        });

        mapInstanceRef.current = map;

        // 添加标记
        if (markerText) {
          const marker = new AMap.Marker({
            position: center,
            title: markerText,
            anchor: 'bottom-center',
          });

          marker.setMap(map);

          const infoWindow = new AMap.InfoWindow({
            content: `<div style="padding: 6px 10px; font-size: 13px;">${markerText}</div>`,
            offset: new AMap.Pixel(0, -30),
          });

          marker.on('click', () => {
            infoWindow.open(map, center);
          });
        }

        // 添加比例尺和工具条
        map.addControl(new AMap.Scale());
        map.addControl(
          new AMap.ToolBar({
            position: {
              top: '16px',
              right: '16px',
            },
          }),
        );

        // 弹窗动画结束后，高德地图有时需要主动 resize
        // 否则可能出现地图空白或只显示一部分
        setTimeout(() => {
          map.resize();
          map.setCenter(center);
        }, 300);
      } catch (error) {
        console.error('高德地图加载失败:', error);

        if (!cancelled) {
          setLoadError(
            '地图加载失败：请检查高德 Key、安全密钥、域名白名单和网络连接。',
          );
        }
      }
    };

    initMap();

    return () => {
      cancelled = true;

      if (mapInstanceRef.current) {
        mapInstanceRef.current.destroy();
        mapInstanceRef.current = null;
      }
    };
  }, [center, zoom, markerText]);

  return (
    <div
      style={{
        width: '100%',
        height,
        minHeight: '420px',
        borderRadius: '2rem',
        overflow: 'hidden',
        position: 'relative',
        background: '#111',
      }}
    >
      <div
        ref={mapContainerRef}
        style={{
          width: '100%',
          height: '100%',
          minHeight: '420px',
        }}
      />

      {loadError && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 10,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '24px',
            background: 'rgba(0, 0, 0, 0.72)',
            color: 'rgba(243, 238, 215, 0.82)',
            textAlign: 'center',
            lineHeight: 1.7,
            fontSize: '14px',
          }}
        >
          {loadError}
        </div>
      )}
    </div>
  );
};

export default AmapView;