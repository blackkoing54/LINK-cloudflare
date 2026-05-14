import Dock from './Dock';
import { Camera, Users, Heart } from 'lucide-react';

type NavigationProps = {
  onNavigate: (section: string) => void;
};
export default function Navigation({ onNavigate }: NavigationProps){
  const items = [
    {
      icon: <Camera size={24} />,
      label: '照片集',
      onClick: () => onNavigate('gallery-modal')  // 弹出照片集模态框
    },
    {
      icon: <Users size={24} />,
      label: '关于我们',
      onClick: () => onNavigate('team')  // 弹出团队介绍模态框
    },
    {
      icon: <Heart size={24} />,
      label: '打赏',
      onClick: () => onNavigate('donate') // 弹出打赏模态框
    }, 
];

     return (
    <Dock
      items={items}
      panelHeight={68}
      baseItemSize={56}
      magnification={80}
      distance={150}
    />
  );
}
