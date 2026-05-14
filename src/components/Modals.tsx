import './Modals.css';
import DomeGallery from './DomeGallery';

export function GalleryModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content gallery-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>

        <div className="gallery-modal-body">
          <DomeGallery />
        </div>
      </div>
    </div>
  );
}

export function TeamModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content team-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>团队介绍</h2>
        <div className="team-board">
          <p>这里是团队介绍内容...</p>
        </div>
      </div>
    </div>
  );
}

export function DonateModal({ onClose }: { onClose: () => void }) {
  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content donate-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>✕</button>
        <h2>打赏支持</h2>
        <p>感谢您的支持！</p>
      </div>
    </div>
  );
}