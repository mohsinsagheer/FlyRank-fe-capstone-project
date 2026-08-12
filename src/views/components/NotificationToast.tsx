import React, { useEffect } from 'react';
import { CheckCircle } from 'lucide-react';

interface NotificationToastProps {
  message: string | null;
  onClear: () => void;
}

export const NotificationToast: React.FC<NotificationToastProps> = ({ message, onClear }) => {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClear();
    }, 3500);
    return () => clearTimeout(timer);
  }, [message, onClear]);

  if (!message) return null;

  return (
    <div
      className="glass-panel animate-fade-in"
      style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 2000,
        background: 'var(--bg-secondary)',
        border: '1px solid var(--brand-primary)',
        boxShadow: 'var(--shadow-lg), var(--shadow-glow)',
        borderRadius: 'var(--radius-md)',
        padding: '0.85rem 1.25rem',
        display: 'flex',
        alignItems: 'center',
        gap: '0.75rem',
        color: 'var(--text-primary)',
        fontSize: '0.9rem',
        fontWeight: 600
      }}
    >
      <CheckCircle size={20} color="var(--success)" />
      <span>{message}</span>
    </div>
  );
};
