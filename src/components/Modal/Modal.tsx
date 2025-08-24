import { useEffect, useRef } from 'react';
import type { ReactNode } from 'react';
import type { KeyboardEvent as ReactKeyboardEvent } from 'react';

interface ModalProps {
  children: ReactNode;
  onClose: () => void;
}

export default function Modal({ onClose, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    modalRef.current?.focus();
  }, []);

  const handleKeyDown = (e: ReactKeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'Escape') onClose();
  };

  return (
    <div
      className="modal-overlay"
      ref={modalRef}
      tabIndex={-1}
      onKeyDown={handleKeyDown}
      onClick={onClose}
    >
      <div className="modal-inside" onClick={(e) => e.stopPropagation()}>
        {children}
      </div>
    </div>
  );
}
